import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faGlobe,
  faSearch,
  faFilm,
  faUser,
  faUsers,
  faStar,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const NavigationSidebar = () => {
  const { pathname } = useLocation();
  const [, active] = pathname.split("/");
  const links = [
    { label: "Home", icon: faHome },
    // { label: "Explore", icon: faGlobe },
    { label: "Search", icon: faSearch },
    { label: "Movies", icon: faFilm },
    { label: "Profile", icon: faUser },
    { label: "Users", icon: faUsers },
    { label: "Reviews", icon: faStar },
    { label: "Critics", icon: faPen },
  ];

  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="list-group">
      <Link
        to="/Home"
        className={`list-group-item text-capitalize ${
          active === "Home" ? "active bg-dark" : ""
        }`}
      >
        <FontAwesomeIcon icon={faHome} style={{ marginRight: "0.75rem" }} />
        <span className="d-none d-md-inline">Home</span>
      </Link>
      {/* <Link
        to="/Explore"
        className={`list-group-item text-capitalize ${
          active === "Explore" ? "active bg-dark" : ""
        }`}
      >
        <FontAwesomeIcon
          icon={faGlobe}
          style={{ marginRight: "0.75rem" }}
        />
        <span className="d-none d-md-inline">Explore</span>
      </Link> */}
      <Link
        to="/Search"
        className={`list-group-item text-capitalize ${
          active === "Search" ? "active bg-dark" : ""
        }`}
      >
        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "0.75rem" }} />
        <span className="d-none d-md-inline">Search</span>
      </Link>
      <Link
        to="/Movies"
        className={`list-group-item text-capitalize ${
          active === "Movies" ? "active bg-dark" : ""
        }`}
      >
        <FontAwesomeIcon icon={faFilm} style={{ marginRight: "0.75rem" }} />
        <span className="d-none d-md-inline">Movies</span>
      </Link>
      <Link
        to="/Profile"
        className={`list-group-item text-capitalize ${
          active === "Profile" ? "active bg-dark" : ""
        }`}
      >
        <FontAwesomeIcon icon={faUser} style={{ marginRight: "0.75rem" }} />
        <span className="d-none d-md-inline">Profile</span>
      </Link>
      <Link
        to="/Users"
        className={`list-group-item text-capitalize ${
          active === "Users" ? "active bg-dark" : ""
        }`}
      >
        <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.75rem" }} />
        <span className="d-none d-md-inline">Users</span>
      </Link>
      {!currentUser ? (
        <Link
          to="/login"
          className={`list-group-item text-capitalize ${
            active === "Reviews" ? "active bg-dark" : ""
          }`}
        >
          <FontAwesomeIcon icon={faStar} style={{ marginRight: "0.75rem" }} />
          <span className="d-none d-md-inline">Reviews</span>
        </Link>
      ) : (
        <Link
          to="/Reviews"
          className={`list-group-item text-capitalize ${
            active === "Reviews" ? "active bg-dark" : ""
          }`}
        >
          <FontAwesomeIcon icon={faStar} style={{ marginRight: "0.75rem" }} />
          <span className="d-none d-md-inline">Reviews</span>
        </Link>
      )}
      <Link
        to="/Critics"
        className={`list-group-item text-capitalize ${
          active === "Users" ? "active bg-dark" : ""
        }`}
      >
        <FontAwesomeIcon icon={faPen} style={{ marginRight: "0.75rem" }} />
        <span className="d-none d-md-inline">Critics</span>
      </Link>
    </div>
  );
};

//   return (
//     <div className="list-group">
//       {links.map((link) => (
//         <Link
//           key={link.label}
//           to={`/${link.label}`}
//           className={`list-group-item text-capitalize ${
//             active === link.label ? "active bg-dark" : ""
//           }`}
//         >
//           <FontAwesomeIcon
//             icon={link.icon}
//             style={{ marginRight: "0.75rem" }}
//             // className="d-sm-none"
//           />
//           <span className="d-none d-md-inline">{link.label}</span>
//         </Link>
//       ))}
//     </div>
//   );
// };

export default NavigationSidebar;
