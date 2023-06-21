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
      </div>
    </div>
  );
}

export default MovieDetails;
