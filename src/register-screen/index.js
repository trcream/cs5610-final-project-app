import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerThunk } from "../services/auth-thunks";

function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("user"); // Default value set to "user"
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      await dispatch(
        registerThunk({ username, password, firstName, lastName, userType })
      );
      navigate("/login");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <h1>Register Screen</h1>
      <div className="mt-2">
        <label>Username</label>
        <input
          className="form-control"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="mt-2">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="mt-2">
        <label>First Name</label>
        <input
          className="form-control"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>
      <div className="mt-2">
        <label>Last Name</label>
        <input
          className="form-control"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <div className="mt-2">
        <label>User Type</label>
        <div>
          <label>
            <input
              type="radio"
              value="admin"
              checked={userType === "admin"}
              onChange={() => setUserType("admin")}
            />
            Admin
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="user"
              checked={userType === "user"}
              onChange={() => setUserType("user")}
            />
            User
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="critic"
              checked={userType === "critic"}
              onChange={() => setUserType("critic")}
            />
            Critic
          </label>
        </div>
      </div>
      <button
        className="btn btn-primary btn-dark mt-2"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
}

export default RegisterScreen;
