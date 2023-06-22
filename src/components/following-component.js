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

        const fetchedUsers = await Promise.all(
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
      <ul>
        {followedUsers.map((user) => (
          <li key={user._id}>
            username: {user.username} <br />
            First Name: {user.firstName} <br />
            Last Name: {user.lastName} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowedUsersList;
