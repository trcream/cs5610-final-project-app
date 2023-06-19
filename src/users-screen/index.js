import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findAllUsersThunk, followUserThunk } from "../services/auth-thunks";
import { Link } from "react-router-dom";

const UserList = () => {
  // Use Redux hooks
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.currentUser);

  // Fetch users when component mounts
  useEffect(() => {
    dispatch(findAllUsersThunk());
  }, [dispatch]);

  const handleFollow = (otherUserId) => {
    if (currentUser) {
      alert("You are following this user.");
      dispatch(followUserThunk({ uid: currentUser._id, otherUserId })).then(
        () => {}
      );
    } else {
      alert("You must be logged in to follow users.");
    }
  };

  // Handle loading and error states
  if (!users) {
    return <h1>No Users Found</h1>;
  }

  // Render the users
  return (
    <div className="container mt-5">
      <h1 className="text-center">Users</h1>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div>
              UserName: {user.username} <br />
              First Name: {user.firstName} <br />
              Last Name: {user.lastName} <br />
            </div>
            <div>
              <button
                onClick={() => handleFollow(user._id)}
                className="btn btn-success"
              >
                Follow
              </button>
              <Link
                to={`/Profile/${user._id}`}
                className="btn btn-primary ml-2"
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

export default UserList;
