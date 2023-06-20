import UserReviews from "../components/user-reviews-component";
import MostRecentReviews from "../components/most-recent-reviews";

function HomeScreen() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2>Welcome to The Movie Review Network!</h2>
          <p>
            We are a social media platform where you can review movies, see
            others' reviews, and create your own. Please sign up or log in to
            get started!
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <UserReviews />
        </div>
        <div className="col-12">
          <MostRecentReviews />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
