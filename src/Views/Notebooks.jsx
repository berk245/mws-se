import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useNotebooksList from "../Hooks/useNotebooksList";
import AddNewNotebook from "../Components/AddNewNotebook";
import NotebooksList from "../Components/NotebooksList";
import { isUserAuthenticated } from "../utils";
import "./Notebooks.css";

function Notebooks() {
  const [addNotebookForm, setAddnotebookForm] = useState(false);
  const [reloadList, setReloadList] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated()) navigate("/not-authorized");
    else {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      setUsername(userInfo.username);
    }
  }, []);

  const { userNotebooks, fetchingData, fetchError } = useNotebooksList(
    reloadList
  );
  if (!username) navigate("/not-authorized");

  const closeAddNewForm = () => {
    setAddnotebookForm(false);
    setReloadList(!reloadList);
  };
  return (
    <div className="exercise-view-main">
      <button className="btn go-back-button" onClick={() => navigate("/")}>
        {" "}
        Go back{" "}
      </button>
      <div className="section-title">
        <h1>Notebooks</h1>
        {!addNotebookForm && (
          <button
            className="btn section-title-button"
            onClick={() => setAddnotebookForm(true)}
          >
            Add Notebook
          </button>
        )}
      </div>
      {addNotebookForm && (
        <AddNewNotebook close={closeAddNewForm} />
      )}
      <div className="view-main-content">
        {fetchingData ? (
          <p>Loading</p>
        ) : (
          <div className="page-content">
            {fetchError ? (
              <h4>There was an error accessing your notebooks.</h4>
            ) : (
              <div className="items-list">
                <div className="section-title">
                  <h3>Your Notebooks</h3>
                </div>
                <NotebooksList
                  userNotebooks={userNotebooks}
                  reload={() => setReloadList(!reloadList)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notebooks;
