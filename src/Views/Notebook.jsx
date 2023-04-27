import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useNotebookInfo from "../Hooks/useNotebookInfo";
import { parseIdFromURL, deleteNotebook, isUserAuthenticated } from "../utils";
import EditNotebookForm from "../Components/EditNotebookForm";
import WordsList from "../Components/WordsList";
import WordForm from "../Components/WordForm";

function Notebook() {
  const notebookId = parseIdFromURL(window.location);
  const [reloadList, setReloadList] = useState(false);
  const [showEditNotebookForm, setShowEditNotebookForm] = useState(false);
  const [serverMessage, setServerMessage] = useState(false);
  const [showAddNewWordForm, setShowAddNewWordForm] = useState(false);

  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated()) navigate("/not-authorized");
    else {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      setUsername(userInfo.username);
    }
  }, []);
  const { notebookInfo, notebookWords, fetchingData, fetchError } =
    useNotebookInfo(notebookId, reloadList);

  const handleDelete = async () => {
    try {
      let deleteConfirmed = window.confirm(
        "This will delete the notebook and all the words within. Are you sure?"
      );
      if (!deleteConfirmed) return;
      let deleteSuccess = await deleteNotebook({ notebookId });
      if (deleteSuccess) {
        setServerMessage(
          "Delete successful. Redirecting you back to notebooks page."
        );
        setTimeout(() => {
          setServerMessage("");
          navigate("/notebooks");
        }, 1500);
      } else throw new Error();
    } catch (err) {
      alert("Something went wrong. Please try again later.");
    }
  };
  if (fetchingData) return <p>Loading</p>;
  if (serverMessage) return <p>{serverMessage}</p>;

  return (
    <div className="exercise-view-main">
      <button
        className="btn go-back-button"
        onClick={() => navigate("/notebooks")}
      >
        Go back
      </button>
      <div className="section-title">
        <h1>{notebookInfo.NotebookName}</h1>
        <div className="section-title-buttons">
          <button
            className="btn section-title-button"
            onClick={() => setShowEditNotebookForm(true)}
          >
            Edit Notebook
          </button>
          <button
            className="btn section-title-button danger-button"
            onClick={handleDelete}
          >
            Delete Notebook
          </button>
        </div>
      </div>

      {showEditNotebookForm && (
        <EditNotebookForm
          content={notebookInfo}
          close={() => setShowEditNotebookForm(false)}
          reload={() => setReloadList(!reloadList)}
        />
      )}
      <div>
        <div className="section-title">
          <h4>Words in this notebook</h4>
          {!showAddNewWordForm && (
            <button
              className="btn section-title-button"
              onClick={() => setShowAddNewWordForm(true)}
            >
              Add Word
            </button>
          )}
        </div>
      </div>

      {showAddNewWordForm && (
        <WordForm
          type="addNew"
          notebookId={notebookId}
          reload={() => setReloadList(!reloadList)}
          close={() => setShowAddNewWordForm(false)}
        />
      )}
      <WordsList
        wordList={notebookWords}
        notebookId={notebookId}
        reload={() => {
          setReloadList(!reloadList);
        }}
      />
    </div>
  );
}

export default Notebook;
