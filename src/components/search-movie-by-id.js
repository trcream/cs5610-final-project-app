import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WhatsHappening from "./whats-happening";

const MovieSearchById = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = `https://www.omdbapi.com/?apikey=4baef882&i=${imdbID}`;
    console.log(apiUrl);

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

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : movie ? (
        <div className="container">
          <div className="row">
            <div className="col-3">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="img-thumbnail"
              />
            </div>
            <div className="col-9">
              <h4>{movie.Title}</h4>

              <ul>
                <li>Release Year: {movie.Year}</li>
                <li>Rated: {movie.Rated}</li>
                <li>Runtime: {movie.Runtime}</li>
                <li>Genre: {movie.Genre}</li>
                <li>Director: {movie.Director}</li>
                <li>Writer: {movie.Writer}</li>
                <li>Actors: {movie.Actors}</li>
                <li>Plot: {movie.Plot}</li>
                <li>Language: {movie.Language}</li>
                <li>Metascore: {movie.Metascore}</li>
                <li>IMDb Rating: {movie.imdbRating}</li>
                <li>IMDb ID: {movie.imdbID}</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h3> Review the Movie</h3>
              <WhatsHappening movieData={movie} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MovieSearchById;
