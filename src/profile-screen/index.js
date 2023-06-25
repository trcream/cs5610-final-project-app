import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import UserReviews from "../components/user-reviews-component";
import {
  profileThunk,
  logoutThunk,
  updateUserThunk,
} from "../services/auth-thunks";

import FollowedUsersList from "../components/following-component";
import FollowedByList from "../components/followed-by-component";

function ProfileScreen() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log("current user with state is: ", currentUser);

  const [profile, setProfile] = useState(currentUser);
  console.log("current profile is: ", profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const save = async () => {
    // Sending the updated profile to thunk which wraps the service call to the server
    dispatch(updateUserThunk(profile));
    // Updating the profile state with the updated profile
    console.log(profile);
    setProfile(profile);
  };

  useEffect(() => {
    if (!currentUser && !profile) {
      // Redirect user to the login screen if user is not logged in
      navigate("/login");
    } else if (currentUser && !profile) {
      const fetchData = async () => {
        const { payload } = await dispatch(profileThunk());
        setProfile(payload);
      };
      fetchData();
    }
  }, [currentUser, profile, dispatch, navigate]);
  // }, [currentUser, dispatch, navigate]);

  // useEffect(async () => {
  //   const { payload } = await dispatch(profileThunk());
  //   setProfile(payload);
  // }, []);
  // console.log(profile);
  return (
    <div className="row">
      <div className="col-md-12">
        <div>
          <h1>Personal Information</h1>
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
                <label for="first">First Name</label>
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
                <label for="last">Last Name</label>
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
                <label for="password">Password: </label>
                <input
                  id="password"
                  type="text"
                  className="mx-2"
                  value={profile.password || ""}
                  onChange={(event) => {
                    const newProfile = {
                      ...profile,
                      password: event.target.value,
                    };
                    setProfile(newProfile);
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
            {" "}
            Logout
          </button>
          <button onClick={save}>Save </button>
        </div>
      </div>
      <div className="container p -3">
        <div className="col-12 mb-2">
          {" "}
          <FollowedUsersList />
        </div>
      </div>
      <div className="container">
        <div className="col-12 mb-2">
          {" "}
          <FollowedByList />
        </div>
      </div>
      <div className="container">
        <div className="col-12 mb-2">
          {" "}
          <UserReviews />
        </div>
      </div>
    </div>
  );
}
export default ProfileScreen;
