import { useSelector } from "react-redux";
import { getUserById } from "../services/auth-service.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FollowedUsersList = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      if (currentUser) {
        const user = await getUserById(currentUser._id);
        const followedUserIds = user.following;

        const fetchedUsers = await Promise.all(
          // Getting array of users from array of user ids
          followedUserIds.map((userId) => getUserById(userId))
        );

        const validUsers = fetchedUsers.filter((user) => user !== null);

        setFollowedUsers(validUsers);
      }
    };

    fetchFollowedUsers();
  }, [currentUser]);

  return (
    <div>
      <h1>You are following the current Users</h1>
      <ul className="list-group flex-wrap">
        {followedUsers.map((user) => (
          <li
            key={user._id}
            className="list-group-item d-flex align-items-start"
            style={{ marginBottom: "10px", width: "100%" }}
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

export default FollowedUsersList;
