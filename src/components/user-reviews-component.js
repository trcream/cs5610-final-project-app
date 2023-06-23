import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../services/tuits-service";
import TuitItem from "../tuits/tuit-item";
import { deleteTuitThunk } from "../services/tuits-thunks";
import { BiX } from "react-icons/bi";
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

  const deleteTuitHandler = (id) => {
    dispatch(deleteTuitThunk(id));
  };

  return (
    <>
      {currentUser && (
        <>
          <h4>Your Reviews for Username: {currentUser.username}</h4>
          <ul className="list-group">
            {tuits.map(
              (tuit) =>
                currentUser._id === tuit.userId && (
                  <TuitItem
                    key={tuit._id}
                    tuit={tuit}
                    deleteTuitHandler={deleteTuitHandler}
                  />
                )
            )}
          </ul>
        </>
      )}
    </>
  );
};

export default UserReviews;
