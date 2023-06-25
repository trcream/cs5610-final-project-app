import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../services/tuits-service";
import TuitItem from "../tuits/tuit-item";
import { deleteTuitThunk } from "../services/tuits-thunks";
import { BiX } from "react-icons/bi";
import TuitStats from "../tuits/tuit-stats";

export const findTuitsThunk = createAsyncThunk(
  "tuits/findTuits",
  async (uid) => {
    const tuits = await service.findTuits(uid);
    return tuits;
  }
);

const ReviewsByProfile = () => {
  const dispatch = useDispatch();
  const { uid } = useParams();
  // alert("uid: " + uid + " - ReviewsByProfile.js");
  const { tuits, loading, error } = useSelector((state) => state.tuits);

  useEffect(() => {
    dispatch(findTuitsThunk(uid));
  }, [dispatch, uid]);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  const deleteTuitHandler = (id) => {
    dispatch(deleteTuitThunk(id));
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h4>Reviews for User ID: {uid}</h4>
          <ul className="list-group">
            {tuits.map(
              (tuit) =>
                tuit.userId === uid && (
                  <li className="list-group-item" key={tuit._id}>
                    <div className="row">
                      <div className="col-sm-2 col-md-2">
                        <img
                          width={75}
                          src={tuit.image}
                          className="img-fluid"
                          alt="Tuit Item"
                        />
                      </div>
                      <div className="col-sm-10 col-md-10 d-flex flex-column">
                        <div>
                          <span className="fw-bold">{tuit.username}</span>{" "}
                          <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                          @{tuit.userName} - {tuit.time}
                        </div>
                        <div className="mt-auto">
                          {tuit.title}
                          <TuitStats tuit={tuit} />
                        </div>
                      </div>
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ReviewsByProfile;
