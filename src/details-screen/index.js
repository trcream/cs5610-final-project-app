import MovieSearchById from "../components/search-movie-by-id";
import WhatsHappening from "../components/whats-happening";

function MovieDetails() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Movie Details</h1>
          <MovieSearchById />
        </div>

        <div className="col-12">
          <h1>Users who like this move</h1>
        </div>
        <div className="col-12">
          <h1>Users who reviewed this move</h1>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
