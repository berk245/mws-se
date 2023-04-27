// const baseUrl = "https://api.berkozzambak.online";
const baseUrl = "http://localhost:5000";

function getRequestBody(requestType, data) {
  return {
    method: requestType,
    headers: {
      "Content-Type": "application/json",
      token: parseAuthCookie("auth_token"),
    },
    body: JSON.stringify(data),
  };
}

const loginUser = async (userData) => {
  try {
    let response = await fetch(
      baseUrl + "/login",
      getRequestBody("POST", userData)
    );
    if (response.ok) {
      response = await response.json();
      saveUserData(response);
      return true;
    }
  } catch {
    return false;
  }
};

const logoutUser = () => {
  if (document.cookie.match("auth_token")) document.cookie = `auth_token=n/a`;
  if (localStorage.getItem("user")) localStorage.removeItem("user");
  window.location = "/";
};

const handle403Response = (response) => {
  alert("Authentication problem. Please login again");
  logoutUser();
  return;
};

const isUserAuthenticated = () => {
  let user = localStorage.getItem("user");
  if (user) return true;
  else return false;
};

const signupUser = async (userData) => {
  let response = await fetch(
    baseUrl + "/signup",
    getRequestBody("POST", userData)
  );
  response = await response.json();
  return response;
};

const createNotebook = async ({ newNotebookName }) => {
  let response = await fetch(
    baseUrl + "/notebook/add",
    getRequestBody("POST", { notebookName: newNotebookName })
  );
  return response.ok || false;
};

const editNotebookName = async (params) => {
  let response = await fetch(
    baseUrl + "/notebook/edit",
    getRequestBody("POST", params)
  );
  if(response.status === 403) return handle403Response()
  return response.ok || false;
};

const getNotebookData = async (notebookId) => {
  const url = `${baseUrl}/notebook/get-data/${notebookId}`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: parseAuthCookie("auth_token"),
    },
  });
  if(response.status === 403) return handle403Response()
  return response;
};

const getUserNotebooksList = async () => {
  const url = `${baseUrl}/notebook/get-all`;

  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: parseAuthCookie("auth_token"),
    },
  });
  if(response.status === 403) return handle403Response()
  return response;
};

const saveUserData = ({ token, username }) => {
    document.cookie = `auth_token=${token}`;

    localStorage.setItem(
      "user",
      JSON.stringify({
        username: username,
      })
    );
    return;
};

const parseIdFromURL = (url) => {
  return url.pathname.split("/").reverse()[0];
};

const deleteNotebook = async (params) => {
  let response = await fetch(
    baseUrl + "/notebook/delete",
    getRequestBody("DELETE", params)
  );
  if(response.status === 403) return handle403Response()
  return response.ok;
};

const createWord = async (newWord) => {
  let response = await fetch(
    baseUrl + "/word/add",
    getRequestBody("POST", newWord)
  );
  if(response.status === 403) return handle403Response()
  return response.ok;
};

const editWord = async (newWord) => {
  let response = await fetch(
    baseUrl + "/word/edit",
    getRequestBody("POST", newWord)
  );
  if(response.status === 403) return handle403Response()
  return response.ok;
};

const deleteWord = async (params) => {
  let response = await fetch(
    baseUrl + "/word/delete",
    getRequestBody("DELETE", params)
  );
  if(response.status === 403) return handle403Response()
  return response.ok;
};

const parseAuthCookie = (cookieName) => {
  let cookies = document.cookie.split(";");
  let result;
  cookies.map((cookie) => {
    let split = cookie.split("=");
    if (split[0] === cookieName) result = split[1];
  });
  return result;
};

const getWordData = async (wordId) => {
  const url = `${baseUrl}/word/${wordId}`;

  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: parseAuthCookie("auth_token"),
    },
  });
  if(response.status === 403) return handle403Response()
  return response;
};

const getUserWords = async () => {
  let response = await fetch(baseUrl + `/word/get-all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: parseAuthCookie("auth_token"),
    },
  });
  if(response.status === 403) return handle403Response()
  if (response.ok) {
    response = await response.json();
    return response.words;
  } else {
    return false;
  }
};

const formatNotebooksArray = (userNotebooks) => {
  let result = [];
  userNotebooks.map((nb) => {
    result.push({
      label: nb.NotebookName,
      key: nb.NotebookID,
      value: nb.NotebookID,
    });
  });

  return result;
};

const getExerciseQuestions = async (exerciseParameters) => {
  
  const response = await fetch(
    baseUrl + "/exercise/begin",
    getRequestBody("POST", {exerciseParameters: exerciseParameters})
  );

  if(response.status === 403) return handle403Response()

  const exerciseQuestions = await response.json();
  return exerciseQuestions;
};

const completeExercise = async (params) => {
  const response = await fetch(
    baseUrl + "/exercise/complete",
    getRequestBody("POST", params)
  );
  if(response.status === 403) return handle403Response()

  const exerciseResults = await response.json();
  return exerciseResults;
};

export {
  loginUser,
  signupUser,
  logoutUser,
  formatNotebooksArray,
  createWord,
  getWordData,
  getUserNotebooksList,
  createNotebook,
  getNotebookData,
  editNotebookName,
  parseIdFromURL,
  deleteNotebook,
  editWord,
  deleteWord,
  getUserWords,
  getExerciseQuestions,
  completeExercise,
  isUserAuthenticated,
};
