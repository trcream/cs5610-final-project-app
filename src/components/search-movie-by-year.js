import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const MovieSearchByYear = () => {
  // gettting the search criteria from the URL
  const location = useLocation();
  // Looking at the search params and getting the ones that match the criteria
  const searchCriteria =
    new URLSearchParams(location.search).get("criteria") || "";

  const [title, setTitle] = useState(searchCriteria);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setLoading(true);
    setError(null);

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

    const searchUrl = `/search?criteria=${encodeURIComponent(title)}`;
    window.history.pushState(null, "", searchUrl);
  };

  useEffect(() => {
    if (searchCriteria) {
      handleSearch();
    }
  }, []);

  return (
    <div>
      <h2>Movie Search</h2>
      <div>
        <label>Search Movie by Title: </label>
        <input
          for="search"
          className="mx-1"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={handleSearch}
          id="search"
          className="btn btn-primary btn-dark"
        >
          Search
        </button>
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

export default MovieSearchByYear;
