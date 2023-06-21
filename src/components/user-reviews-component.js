import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../services/tuits-service";
import TuitItem from "../tuits/tuit-item";
import { deleteTuitThunk } from "../services/tuits-thunks";
import { BiX } from "react-icons/bi";
import deleteTuitHandler from "../tuits/tuit-item";
import TuitStats from "../tuits/tuit-stats";

export const findTuitsThunk = createAsyncThunk("tuits/findTuits", async () => {
  const tuits = await service.findTuits();
  return tuits;
});

const UserReviews = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { tuits, loading, error } = useSelector((state) => state.tuits);

  useEffect(() => {
    dispatch(findTuitsThunk());
  }, [dispatch]);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  // Filtering out the tuits to only show the ones that belong to the current user
  const userReviews = tuits.filter((tuit) => tuit.userId === currentUser?._id);

  return (
    <>
      {/* Conditionally render based on if a user is logged in */}
      {currentUser && (
        <>
          <h4>Your Reviews for Username: {currentUser.username}</h4>
          <ul className="list-group">
            {userReviews.map((tuit) => (
              <li className="list-group-item" key={tuit._id}>
                <div className="row">
                  <div className="col-1">
                    <img
                      width={50}
                      // className="rounded-circle ratio"
                      // src={`/images/${tuit.image}`}
                      src={tuit.image}
                      alt="Tuit Item"
                    />
                  </div>
                  <div className="col-11">
                    <div>
                      <span className="fw-bold">{tuit.username}</span>{" "}
                      <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                      @{tuit.userName} - {tuit.time}
                    </div>
                    <div>{tuit.title}</div>
                    <TuitStats tuit={tuit} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default UserReviews;
