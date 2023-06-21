import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findAllUsersThunk, followUserThunk } from "../services/auth-thunks";
import { Link } from "react-router-dom";

const NewUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users.slice(0, 5)); // Limiting to 5 users
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

  if (!users || users.length === 0) {
    return <h1>No Users Found</h1>;
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="container mt-5">
          <h4> New Users </h4>
          <ul className="list-group flex-wrap">
            {users.map((user) => (
              <li
                key={user._id}
                className="list-group-item d-flex align-items-start"
              >
                <div>
                  <p>UserName: {user.username}</p>
                  <div>
                    <button
                      onClick={() => handleFollow(user._id)}
                      className="btn btn-success"
                    >
                      Follow
                    </button>
                    {currentUser ? (
                      <Link
                        to={`/Profile/${user._id}`}
                        className="btn btn-primary"
                      >
                        Profile
                      </Link>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          alert("Please log in or register to view profile.")
                        }
                      >
                        Profile
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewUsers;
