import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MoviesGeneralSearch = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Displaying a list of random movies for the users to see
    const apiUrl = `https://www.omdbapi.com/?apikey=4baef882&type=movie&s=random&page=1`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setError(data.Error);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Random Movie List</h2>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="container">
          <ul className="list-group">
            {movies.map((movie) => (
              <li key={movie.imdbID} className="list-group-item">
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
                    <p>Year: {movie.Year}</p>
                    <p>Imdb Id: {movie.imdbID}</p>
                    <Link
                      className="btn btn-primary btn-dark float-right"
                      to={`/details/${movie.imdbID}`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MoviesGeneralSearch;
