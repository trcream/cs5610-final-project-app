import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../services/tuits-service";
import TuitStats from "../tuits/tuit-stats";

export const findTuitsThunk = createAsyncThunk("tuits/findTuits", async () => {
  const tuits = await service.findTuits();
  return tuits;
});

const ReviewsByMovieId = ({ movieData }) => {
  //   alert(`ReviewsByMovieId: ${movieData.imdbID}`);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { tuits, loading } = useSelector((state) => state.tuits);

  useEffect(() => {
    dispatch(findTuitsThunk());
  }, [dispatch]);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  // Filtering out the tuits to only show the ones that match the movieId
  //   const userReviews = tuits.filter((tuit) => tuit.userId === currentUser?._id);
  const userReviews = tuits.filter((tuit) => tuit.imdbID === movieData.imdbID);

  return (
    <>
      {/* Conditionally render based on if a user is logged in */}
      <h4>Users that have reviewed: {movieData.Title}</h4>
      <p>Must be logged in to see:</p>

      {currentUser && (
        <>
          <ul className="list-group">
            {userReviews.map((tuit) => (
              <li className="list-group-item" key={tuit._id}>
                <div className="row">
                  <div className="col-1">
                    <img
                      width={50}
                      className="img-fluid"
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
export default ReviewsByMovieId;
