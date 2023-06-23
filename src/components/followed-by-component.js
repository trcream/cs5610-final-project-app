import React, { useEffect, useState } from "react";
import { findAllUsers } from "../services/auth-service.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FollowedByList = () => {
  const [users, setUsers] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await findAllUsers();
        const filteredUsers = allUsers.filter((user) =>
          user.following.includes(currentUser._id)
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>You are followed by</h1>
      <ul className="list-group flex-wrap">
        {users.map((user) => (
          <li
            key={user._id}
            className="list-group-item d-flex align-items-start"
          >
            <div style={{ flex: "1" }}>
              <p>
                <b>Username: </b>
                {user.username}
              </p>
              <p>
                <b>First Name:</b> {user.firstName}
              </p>
              <p>
                <b>Last Name:</b> {user.lastName}
              </p>
            </div>
            <div>
              <Link
                to={`/Profile/${user._id}`}
                className="btn btn-primary btn-dark"
              >
                View Profile
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowedByList;
