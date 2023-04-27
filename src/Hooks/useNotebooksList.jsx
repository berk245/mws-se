import { useState, useEffect } from "react";
import {getUserNotebooksList} from '../utils'
function useNotebooksList(reloadList) {
  const [fetchingData, setFetchingData] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [userNotebooks, setUserNotebooks] = useState([]);

  const getUserNotebooks = async () => {
    try {

      let response = await getUserNotebooksList()
      if (response.ok) {
        response = await response.json();
        setUserNotebooks(response.notebooks);
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
    resetData()
    getUserNotebooks();
  }, [reloadList]);

  return { fetchingData, fetchError, userNotebooks };
}

export default useNotebooksList;
