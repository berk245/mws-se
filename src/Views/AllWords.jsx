import React, { useState, useEffect } from "react";
import useAllUserWords from "../Hooks/useAllUserWords";
import WordsList from "../Components/WordsList";
import { useNavigate } from "react-router-dom";
import { isUserAuthenticated } from "../utils";
import WordForm from "../Components/WordForm";

import "./AllWords.css";
function AllWords() {
  const [username, setUsername] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [showAddNewWordForm, setShowAddNewWordForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated()) navigate("/not-authorized");
    else {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      setUsername(userInfo.username);
    }
  }, []);

  const { userWords, fetchError, fetchingData } = useAllUserWords(
    refetch
  );

  if (fetchingData) return <p>Loading</p>;
  return (
    <div className="all-words-view-main">
      <button className="btn go-back-button" onClick={() => navigate("/")}>
        Go back
      </button>
      <div className="section-title">
        <h2>Words of {username}</h2>
        {!showAddNewWordForm && (
          <button className='btn section-title-button' onClick={() => setShowAddNewWordForm(true)}>Add Word</button>
        )}
        
      </div>
      {showAddNewWordForm && (
          <WordForm
            type="addNew"
            reload={() => setRefetch(!refetch)}
            close={() => setShowAddNewWordForm(false)}
          />
        )}
      <WordsList
        wordList={userWords}
        reload={() => setRefetch(!refetch)}
      />
    </div>
  );
}

export default AllWords;
