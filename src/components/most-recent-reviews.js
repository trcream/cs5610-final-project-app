import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../services/tuits-service";
import TuitStats from "../tuits/tuit-stats";

export const findTuitsThunk = createAsyncThunk("tuits/findTuits", async () => {
  const tuits = await service.findTuits();
  return tuits;
});

const MostRecentReviews = () => {
  const dispatch = useDispatch();
  const { tuits, loading } = useSelector((state) => state.tuits);

  useEffect(() => {
    dispatch(findTuitsThunk());
  }, [dispatch]);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  // Get the 5 most recent tuits
  const recentReviews = tuits.slice(0, 5);

  return (
    <>
      {/* Conditionally render based on if a user is logged in */}
      <>
        <h2>The 5 Most Recent Reviews: </h2>
        <ul className="list-group">
          {recentReviews.map((tuit) => (
            <li className="list-group-item" key={tuit._id}>
              <div className="row">
                <div className="col-1">
                  <img
                    width={50}
                    className="rounded-circle ratio"
                    src={`/images/${tuit.image}`}
                    alt="Tuit Item"
                  />
                </div>
                <div className="col-11">
                  <div>
                    {/* <BiX
                      className="float-end"
                      onClick={() => deleteTuitHandler(tuit._id)}
                    /> */}
                    <span className="fw-bold">{tuit.username}</span>{" "}
                    <i className="fa-solid fa-circle-check text-primary"></i> @
                    {tuit.userName} - {tuit.time}
                  </div>
                  <div>{tuit.title}</div>
                  <TuitStats tuit={tuit} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    </>
  );
};

export default MostRecentReviews;
