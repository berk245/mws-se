import { useState, useEffect } from "react";
import { getWordData } from "../utils";
function useWordData(wordId, refetchData) {
  const [fetchingData, setFetchingData] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [wordData, setWordData] = useState([]);

  const getData = async (wordId) => {
    try {
      let response = await getWordData(wordId);

      if (response.ok) {
        response = await response.json();
        setWordData(response);
      }
    } catch (err) {
      setFetchError(true);
    } finally {
      setFetchingData(false);
    }
  };

  const resetData = () => {
    setFetchError(false);
    setFetchingData(true);
  };
  useEffect(() => {
    if (!wordId) return;
    resetData();
    getData(wordId);
  }, [wordId, refetchData]);

  return { fetchingData, fetchError, wordData };
}

export default useWordData;
