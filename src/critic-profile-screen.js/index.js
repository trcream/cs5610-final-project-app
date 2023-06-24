import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  profileThunk,
  logoutThunk,
  updateUserThunk,
} from "../services/auth-thunks";
import { findCriticbyUsername } from "../services/critics-service";

import { updateCriticThunk } from "../services/critic-thunk";

function CriticProfileScreen() {
  const { currentUser } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(currentUser);
  const [critic, setCritic] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const save = async () => {
    try {
      await dispatch(updateUserThunk(profile));

      if (critic) {
        const updatedCritic = {
          ...critic,
          bio: critic.bio,
          profilePic: critic.profilePic,
          _id: critic._id,
        };
        await dispatch(updateCriticThunk(updatedCritic));
      }

      // navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!currentUser && !profile) {
      // navigate("/login");
    } else if (currentUser && !profile) {
      const fetchData = async () => {
        const { payload } = await dispatch(profileThunk());
        setProfile(payload);
      };
      fetchData();
    }

    const fetchCriticData = async () => {
      try {
        const criticByUsername = await findCriticbyUsername(
          currentUser.username
        );
        setCritic(criticByUsername);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCriticData();
  }, [currentUser, profile, dispatch, navigate]);

  return (
    <div className="row">
      <div className="col-md-12">
        <div>
          <h1>Update Critic Profile</h1>
          {profile && (
            <div>
              <div>
                <h4> Current User: {profile.username || ""}</h4>
                User Id: {profile._id}
                <br />
                User Type: {profile.userType}
                <br />
                <br></br>
                <b>Update Personal Information:</b>
                <br></br>
                <label htmlFor="first">First Name</label>
                <input
                  id="first"
                  type="text"
                  value={profile.firstName}
                  className="mx-2"
                  onChange={(event) => {
                    const newProfile = {
                      ...profile,
                      firstName: event.target.value,
                    };
                    setProfile(newProfile);
                  }}
                />
              </div>
              <div>
                <label htmlFor="last">Last Name</label>
                <input
                  id="last"
                  type="text"
                  className="mx-2"
                  value={profile.lastName || ""}
                  onChange={(event) => {
                    const newProfile = {
                      ...profile,
                      lastName: event.target.value,
                    };
                    setProfile(newProfile);
                  }}
                />
              </div>
              <div>
                <label htmlFor="bio">Bio:</label>
                <input
                  id="bio"
                  type="text"
                  className="mx-2"
                  value={critic ? critic.bio : ""}
                  onChange={(event) => {
                    const newCritic = {
                      ...critic,
                      bio: event.target.value,
                    };
                    setCritic(newCritic);
                  }}
                />
              </div>
              <div>
                <label htmlFor="profilePic">Profile Pic</label>
                <input
                  id="profilePic"
                  type="text"
                  className="mx-2"
                  value={critic ? critic.profilePic : ""}
                  onChange={(event) => {
                    const newCritic = {
                      ...critic,
                      profilePic: event.target.value,
                    };
                    setCritic(newCritic);
                  }}
                />
              </div>
            </div>
          )}
          <button
            onClick={() => {
              dispatch(logoutThunk());
              navigate("/login");
            }}
          >
            Logout
          </button>
          <button onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default CriticProfileScreen;
