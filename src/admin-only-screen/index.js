import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  findAllUsersThunk,
  followUserThunk,
  deleteUserThunk,
} from "../services/auth-thunks";
import { Link } from "react-router-dom";

const AdminUserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.currentUser);

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

  const handleDelete = (userId) => {
    alert("User deleted.");
    dispatch(deleteUserThunk(userId)).then(() => {
      //   window.location.reload(); // Refresh the page
    });
  };

  if (!users) {
    return <h1>No Users Found</h1>;
  }

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
              User Type: {user.userType} <br />
            </div>
            <div>
              <button
                onClick={() => handleFollow(user._id)}
                className="btn btn-success"
              >
                Follow
              </button>
              {currentUser ? (
                <Link to={`/Profile/${user._id}`} className="btn btn-primary">
                  Profile
                </Link>
              ) : (
                <button
                  className="btn btn-primary btn-dark"
                  onClick={() =>
                    alert("Please log in or register to view profile.")
                  }
                >
                  Profile
                </button>
              )}
              {currentUser && (
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserList;
