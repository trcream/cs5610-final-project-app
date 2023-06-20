import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieSearchByYear = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setLoading(true);
    setError(null);

    // Searching by Move Title
    const apiUrl = `https://www.omdbapi.com/?apikey=4baef882&type=movie&s=${title}`;

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
  };

  return (
    <div>
      <h2>Movie Search</h2>
      <div>
        <label>Search Move by Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

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
                    <p>{movie.Year}</p>
                    <p>Imdb Id: {movie.imdbID}</p>
                    <Link to={`/details/${movie.imdbID}`}>View Details</Link>
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

export default MovieSearchByYear;
