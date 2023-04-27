import React, { useEffect, useState } from "react";
import { getUserWords } from "../utils";

function useAllUserWords(refetch) {
  const [userWords, setUserWords] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [fetchingData, setFetchingData] = useState(true);

  const getWords = async () => {
    try {
      let words = await getUserWords();
      if (!words) throw new Error();

      setUserWords(words);
    } catch (err) {
      setFetchError(true);
    } finally {
      setFetchingData(false);
    }
  };

  useEffect(() => {
    getWords();
  }, [refetch]);

  return { userWords, fetchError, fetchingData };
}

export default useAllUserWords;
