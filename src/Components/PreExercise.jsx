import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  formatNotebooksArray,
  getExerciseQuestions,
  isUserAuthenticated,
} from "../utils";
function PreExercise({
  userNotebooks,
  setExerciseData,
  setCurrentView,
}) {
  const [exerciseParameters, setExerciseParameters] = useState({
    amount: "",
    notebooks: [],
    wordTypes: [],
  });
  const [requestError, setRequestError] = useState(false);
  const navigate = useNavigate();
  if (!isUserAuthenticated()) {
    navigate("/not-authorized");
  }

  const formattedNotebooks = formatNotebooksArray(userNotebooks);
  const wordTypes = [
    {
      label: "Adjective",
      key: "adjective",
      value: "adjective",
    },
    {
      label: "Noun",
      key: "Noun",
      value: "noun",
    },
    {
      label: "Verb",
      key: "Verb",
      value: "verb",
    },
    {
      label: "Other",
      key: "Other",
      value: "other",
    },
  ];
  const onSelectChange = (type, e) => {
    if (type === "notebooks") {
      let notebooks = [];
      e.map((nb) => {
        notebooks.push(nb.value);
      });
      setExerciseParameters({ ...exerciseParameters, notebooks: notebooks });
    } else {
      let types = [];
      e.map((type) => {
        types.push(type.value);
      });

      setExerciseParameters({ ...exerciseParameters, wordTypes: types });
    }
  };

  const onSubmit = async () => {
    setRequestError("");
    if (
      !exerciseParameters.amount ||
      !exerciseParameters.notebooks.length ||
      !exerciseParameters.wordTypes.length
    ) {
      setRequestError("Please fill all the fields");
      return;
    }
    let exerciseData = await getExerciseQuestions(exerciseParameters);

    if (exerciseData.error) {
      setRequestError(exerciseData.error);
      return;
    }
    setExerciseData(exerciseData);
    setCurrentView("exercise");
  };
  if (!userNotebooks.length)
    return (
      <>
        <button className="btn go-back-button" onClick={() => navigate("/")}>
          Go back
        </button>
        <p>
          You do not have any notebooks yet. To exercise, please{" "}
          <a className="auth-link" onClick={() => navigate("/notebooks")}>
            {" "}
            create a notebook{" "}
          </a>
          .
        </p>
      </>
    );
  return (
    <div>
      <button className="btn go-back-button" onClick={() => navigate("/")}>
        Go back
      </button>
      <h2>Setup exercise</h2>
      {requestError && <p className="error-text">{requestError}</p>}
      <div className="parameter-selector amount-picker">
        <span>Word Amount</span>
        <input
          className="number-input"
          onChange={(e) =>
            setExerciseParameters({
              ...exerciseParameters,
              amount: e.target.value,
            })
          }
          type="number"
          id="amount"
          name="amount"
        />
      </div>
      <div className="parameter-selector">
        <span>Choose Notebooks</span>
        <Select
          isMulti
          options={formattedNotebooks}
          onChange={(e) => onSelectChange("notebooks", e)}
        />
      </div>

      <div className="parameter-selector">
        <span>Choose Word Types</span>
        <Select
          isMulti
          options={wordTypes}
          onChange={(e) => onSelectChange("wordTypes", e)}
        />
      </div>
      <br />
      <button className="btn big-blue-button" onClick={onSubmit}>
        Begin exercise
      </button>
    </div>
  );
}

export default PreExercise;
