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
} from "@fortawesome/free-solid-svg-icons";

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
  ];

  return (
    <div className="list-group">
      {links.map((link) => (
        <Link
          key={link.label}
          to={`/${link.label}`}
          className={`list-group-item text-capitalize ${
            active === link.label ? "active bg-dark" : ""
          }`}
        >
          <FontAwesomeIcon
            icon={link.icon}
            style={{ marginRight: "0.75rem" }}
            // className="d-sm-none"
          />
          <span className="d-none d-md-inline">{link.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavigationSidebar;
