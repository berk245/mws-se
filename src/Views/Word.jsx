import React, { useState, useEffect } from "react";
import { parseIdFromURL } from "../utils";
import useWordData from "../Hooks/useWordData";
import { deleteWord, isUserAuthenticated } from "../utils";
import WordForm from "../Components/WordForm";
import { useNavigate } from "react-router-dom";
function Word() {
  const wordId = parseIdFromURL(window.location);
  const [showEditWordForm, setShowEditWordForm] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [refetchData, setRefetchData] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated()) navigate("/not-authorized");
    
  }, []);

  const { fetchingData, fetchError, wordData } = useWordData(
    wordId,
    refetchData
  );

  const handleDelete = async () => {
    let confirmed = window.confirm(
      "Are you sure you want to delete this word?"
    );
    if (!confirmed) return;
    let deleteSuccess = await deleteWord({
      wordId,
      notebookId: wordData.NotebookID,
    });
    if (!deleteSuccess) {
      alert("Something went wrong. Please try again");
    } else {
      setServerMessage(
        "Word succesfully deleted. You are being redirected to the previous page."
      );
      setTimeout(() => {
        window.history.back();
      }, 1500);
    }
  };

  if (serverMessage) return <p>{serverMessage}</p>;
  if (fetchingData) return <p>Loading</p>;
  return (
    <div className="exercise-view-main">
      <button
        className="btn go-back-button"
        onClick={() => window.history.back()}
      >
        Go back
      </button>
      <div className="section-title">
        <h1>Word Info</h1>
        <div className="section-title-buttons">
          <button
            className="btn section-title-button"
            onClick={() => setShowEditWordForm(true)}
          >
            Edit Word
          </button>
          <button
            className="btn section-title-button danger-button"
            onClick={handleDelete}
          >
            Delete Word
          </button>
        </div>
      </div>
      {showEditWordForm ? (
        <WordForm
          type="edit"
          wordId={wordId}
          notebookId={wordData.NotebookID}
          wordOriginal={wordData.WordOriginal}
          wordTranslation={wordData.WordTranslation}
          wordType={wordData.WordType}
          close={() => setShowEditWordForm(false)}
          reload={() => setRefetchData(!refetchData)}
        />
      ) : (
        <div className="questions-box">
          <div className="word-info-line">
            <span className="line-label">Original:</span>
            <span className="line-content"> {wordData.WordOriginal}</span>
          </div>
          <div className="word-info-line">
            <span className="line-label">Translation:</span>
            <span className="line-content"> {wordData.WordTranslation}</span>
          </div>
          <div className="word-info-line">
            <span className="line-label">Notebook ID:</span>
            <span className="line-content"> {wordData.NotebookID}</span>
          </div>
          <div className="word-info-line">
            <span className="line-label">Times Exercised:</span>
            <span className="line-content"> {wordData.TimesSeen}</span>
          </div>
          <div className="word-info-line">
            <span className="line-label">Correct Answers:</span>
            <span className="line-content"> {wordData.CorrectAnswers}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Word;
