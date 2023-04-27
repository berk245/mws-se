import { useState, useEffect } from "react";
import {getNotebookData} from '../utils'

function useNotebookInfo(notebookId, reloadList) {
  const [fetchingData, setFetchingData] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [notebookInfo, setNotebookInfo] = useState('')
  const [notebookWords, setNotebookWords] = useState('')

  const getData = async (notebookId) => {
    try {

      let response = await getNotebookData(notebookId)
      
      if (response.ok) {
        response = await response.json();
        setNotebookInfo(response.notebookInfo)
        setNotebookWords(response.notebookWords)
      }
    } catch (err) {
      setFetchError(true);
    } finally {
      setFetchingData(false);
    }
  };

  const resetData = () => {
    setFetchError(false)
    setFetchingData(true)
  }
  useEffect(() => {
    if(!notebookId) return
    resetData()
    getData(notebookId);
  }, [notebookId, reloadList]);

  return { fetchingData, fetchError, notebookInfo, notebookWords };
}

export default useNotebookInfo;
