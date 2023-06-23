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
                <div className="col-sm-2 col-md-2">
                  <img
                    width={75}
                    // className="rounded-circle ratio"
                    // src={`/images/${tuit.image}`}
                    // className="ratio img-fluid"
                    src={tuit.image}
                    alt="Tuit Item"
                  />
                </div>
                <div className="col-sm-10 col-md-10 d-flex flex-column">
                  <div>
                    {/* <BiX
                      className="float-end"
                      onClick={() => deleteTuitHandler(tuit._id)}
                    /> */}
                    <span className="fw-bold">{tuit.username}</span>{" "}
                    <i className="fa-solid fa-circle-check text-primary"></i> @
                    {tuit.userName} - {tuit.time}
                  </div>
                  <div className="mt-auto">
                    {tuit.title}
                    <TuitStats tuit={tuit} />
                  </div>
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
