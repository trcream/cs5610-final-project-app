import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { findAllCritics } from "../services/critics-service";

const CriticsScreen = () => {
  const [critics, setCritics] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCritics = async () => {
      try {
        const allCritics = await findAllCritics();
        setCritics(allCritics);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCritics();
  }, []);

  return (
    <div>
      <h2>All Critics</h2>
      <ul className="list-group">
        {critics.map((critic) => (
          <li key={critic._id} className="list-group-item">
            <div className="row">
              <div className="col-sm-2 col-md-2">
                <img width={75} src={critic.profilePic} alt="Critic Profile" />
              </div>
              <div className="col-sm-10 col-md-10">
                Username: {critic.username}
                <br></br>
                Bio: {critic.bio}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CriticsScreen;
