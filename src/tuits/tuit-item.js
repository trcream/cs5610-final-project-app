import React from "react";
import TuitStats from "./tuit-stats";
import { useDispatch } from "react-redux";
import { BiX } from "react-icons/bi";
// import { deleteTuit } from "../reducers/tuits-reducer";
import { deleteTuitThunk } from "../services/tuits-thunks";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

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

  const dispatch = useDispatch();
  const deleteTuitHandler = (id) => {
    dispatch(deleteTuitThunk(id));
    // dispatch(deleteTuit(id));
  };

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-1">
          <img
            width={50}
            className="ratio"
            // src={`/images/${tuit.image}`}
            src={tuit.image}
            alt="Tuit Item"
          />
        </div>
        <div className="col-11">
          <div>
            {/* Only showing delete if the user is an admin */}
            {userType === "admin" && (
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
            <span className="fw-bold">{tuit.username}</span>{" "}
            <i className="fa-solid fa-circle-check text-primary"></i> @
            {tuit.userName} - {tuit.time} - IMDB Movie - {tuit.imdbID}
          </div>

          <div>{tuit.title}</div>
          <TuitStats tuit={tuit} />
        </div>
      </div>
    </li>
  );
};

export default TuitItem;
