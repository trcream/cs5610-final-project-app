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
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            Username: {user.username} <br />
            First Name: {user.firstName} <br />
            Last Name: {user.lastName} <br />
            <Link
              to={`/Profile/${user._id}`}
              className="btn btn-primary btn-dark float-right"
            >
              View Profile
            </Link>
            {/* <ul>
              {user.following.map((followingUserId) => (
                <li key={followingUserId}>
                  id: {followingUserId} <br />
                </li>
              ))}

            </ul> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowedByList;
