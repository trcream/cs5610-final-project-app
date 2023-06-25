import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "./services/auth-thunks";

function Nav() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const firstName = currentUser ? currentUser.firstName : "";
  const userType = currentUser ? currentUser.userType : "";

  console.log(`current user is: ${userType}`);

  const handleLogout = () => {
    dispatch(logoutThunk());
    // Refresh the page to reset the state
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            )}
            {currentUser &&
              userType === "admin" && ( // Add userType check
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin Only Screen
                  </Link>
                </li>
              )}
            {currentUser &&
              userType === "critic" && ( // Add userType check
                <li className="nav-item">
                  <Link className="nav-link" to="/critic">
                    Update Critic Profile
                  </Link>
                </li>
              )}
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile: {currentUser.username ? currentUser.username : ""}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
