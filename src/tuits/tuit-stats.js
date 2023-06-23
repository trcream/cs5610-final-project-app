import React from "react";
import { updateTuitThunk } from "../services/tuits-thunks";
import { FaHeart, FaThumbsDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

const TuitStats = ({ tuit }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const isCritic = currentUser?.userType === "critic";

  return (
    <div className="row">
      <div className="col-2 mt-2">
        <i className="fa-regular fa-comment mx-1"></i> {tuit.replies}
      </div>
      <div className="col-3 mt-2">
        <i className="fa-solid fa-retweet mx-1"></i>
        {tuit.retuits}
      </div>
      <div className="col-2 mt-2">
        <FaHeart
          className="text-danger"
          onClick={() => {
            if (currentUser && isCritic) {
              dispatch(updateTuitThunk({ ...tuit, likes: tuit.likes + 1 }));
            } else {
              alert("Must be a critic to like tuits!");
            }
          }}

          // onClick={
          //   () => dispatch(updateTuitThunk({ ...tuit, likes: tuit.likes + 1 }))
          //   // dispatch(updateTuitThunk({ ...tuit, likes: tuit.likes + 1 }))
          // }
        />
        <span className="ms-2">{tuit.likes}</span>
      </div>
      <div className="col-2 mt-2">
        <FaThumbsDown
          // className="text-danger"
          onClick={() => {
            if (currentUser && isCritic) {
              dispatch(
                updateTuitThunk({ ...tuit, dislikes: tuit.dislikes + 1 })
              );
            } else {
              alert("Must be a critic to dislike tuits!");
            }
          }}
          // onClick={() =>
          //   dispatch(updateTuitThunk({ ...tuit, dislikes: tuit.dislikes + 1 }))
          // }
        />
        <span className="ms-2">{tuit.dislikes}</span>
      </div>
      <div className="col-2 mt-2">
        {currentUser ? (
          <Link
            to={`/Profile/${currentUser._id}`}
            className="btn btn-primary btn-sm btn-dark"
          >
            Profile
          </Link>
        ) : (
          <button
            className="btn btn-primary btn-sm btn-dark"
            onClick={() => alert("Please log in or register to view profile.")}
          >
            Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default TuitStats;
