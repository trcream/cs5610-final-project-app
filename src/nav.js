import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Nav() {
  const { currentUser } = useSelector((state) => state.user);

  const firstName = currentUser ? currentUser.firstName : "";
  const userType = currentUser ? currentUser.userType : "";

  console.log(`current user is: ${userType}`);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/tuiter/login">
                  Logged In: {firstName}
                </Link>
              </li>
            )}
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/tuiter/login">
                  Not Logged In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
