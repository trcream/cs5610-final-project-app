import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Nav() {
  const { currentUser } = useSelector((state) => state.user);

  const firstName = currentUser ? currentUser.firstName : "";
  alert(`current user is: ${currentUser.userType}`);

  return (
    <nav className="nav nav-tabs mb-2">
      <Link className="nav-link" to="/login">
        Login
      </Link>
      <Link className="nav-link" to="/register">
        Register
      </Link>
      {currentUser && (
        <Link className="nav-link" to="/tuiter/login">
          {" "}
          Logged In{" "}
        </Link>
      )}
      {!currentUser && (
        <Link className="nav-link" to="/tuiter/login">
          {" "}
          Not Logged In{" "}
        </Link>
      )}
    </nav>
  );
}

export default Nav;
