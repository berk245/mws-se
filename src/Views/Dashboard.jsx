import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isUserAuthenticated, logoutUser } from "../utils";
import "./Dashboard.css";
function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!isUserAuthenticated()) navigate("/not-authorized");
    else {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      setUsername(userInfo.username);
    }
  }, []);
 

  return (
    <div className="dashboard-main">
      <button
        className="btn signout-button"
        onClick={() => logoutUser(navigate)}
      >
        Sign out
      </button>
      <h3>Welcome {username}</h3>
      <div className="dashboard-links">
        <Link className="btn dashboard-button" to={"/exercise"}>
          Exercise
        </Link>
        <Link className="btn dashboard-button" to={"/words"}>
          Words
        </Link>
        <Link className="btn dashboard-button" to={"/notebooks"}>
          Notebooks
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
