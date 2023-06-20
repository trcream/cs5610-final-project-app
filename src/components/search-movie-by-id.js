import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
              {movie.Year}
              <br></br>
              Imdb Id: {movie.imdbID}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MovieSearchById;
