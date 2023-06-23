import React from "react";
import TuitStats from "./tuit-stats";
import { useDispatch } from "react-redux";
import { BiX } from "react-icons/bi";
// import { deleteTuit } from "../reducers/tuits-reducer";
import { deleteTuitThunk } from "../services/tuits-thunks";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TuitItem = ({ tuit }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const imdbID = tuit.imdbID; // Define the imdbID variable here

  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = `https://www.omdbapi.com/?apikey=4baef882&i=${imdbID}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [imdbID]);

  const userType = currentUser ? currentUser.userType : "";
  const currentUserId = currentUser ? currentUser._id : "";

  const dispatch = useDispatch();
  const deleteTuitHandler = (id) => {
    dispatch(deleteTuitThunk(id));
    // dispatch(deleteTuit(id));
  };

  const canDelete = userType === "admin" || currentUserId === tuit.userId;
  // alert("tuit user id " + tuit.userId);
  // alert("current user id " + currentUserId);

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-sm-2 col-md-2">
          <img
            width={75}
            // className="ratio img-fluid"
            // src={`/images/${tuit.image}`}
            src={tuit.image}
            alt="Tuit Item"
          />
        </div>
        <div className="col-sm-10 col-md-10">
          <div>
            {/* Only showing delete if the user is an admin */}
            {canDelete && (
              <BiX
                className="float-end"
                onClick={() => deleteTuitHandler(tuit._id)}
              />
            )}
            {/* <span className="fw-bold">{tuit.userName}</span>{" "} */}
            {/* Updated to match server info */}
            <div>
              {movie && (
                <div>
                  <b>Movie: </b>
                  {movie.Title}
                </div>
              )}
            </div>
            <span className="fw-bold">Username: {tuit.username}</span>{" "}
            <i className="fa-solid fa-circle-check text-primary"></i> @
            {tuit.userName} - {tuit.time} - IMDB Movie Id - {tuit.imdbID}{" "}
            {/* <Link
              to={`/Profile/${currentUser._id}`}
              className="btn btn-primary ml-2"
            >
              View Profile
            </Link> */}
          </div>

          <div>{tuit.title}</div>
          <TuitStats tuit={tuit} />
        </div>
      </div>
    </li>
  );
};

export default TuitItem;
