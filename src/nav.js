import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Nav() {
  // const { currentUser } = useSelector((state) => state.user);
  // alert(`current user is: ${currentUser}`);

  return (
    <nav className="nav nav-tabs mb-2">
      <Link className="nav-link" to="/login">
        Login
      </Link>
      <Link className="nav-link" to="/register">
        Register
      </Link>
    </nav>
  );
}

export default Nav;
