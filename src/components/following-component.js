import { useSelector } from "react-redux";
import { getUserById } from "../services/auth-service.js";
import React, { useEffect, useState } from "react";

const FollowedUsersList = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      if (currentUser) {
        const user = await getUserById(currentUser._id);
        const followedUserIds = user.following;

        const followedUsers = await Promise.all(
          followedUserIds.map((userId) => getUserById(userId))
        );

        setFollowedUsers(followedUsers);
      }
    };

    fetchFollowedUsers();
  }, [currentUser]);

  return (
    <div>
      <h1>You are following the current Users</h1>
      <ul>
        {followedUsers.map((user) => (
          <li key={user._id}>
            username: {user.username} <br></br>
            First Name: {user.firstName} <br></br>
            Last Name: {user.lastName} <br></br>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowedUsersList;
