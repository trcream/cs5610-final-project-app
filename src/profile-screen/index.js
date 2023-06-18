import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  profileThunk,
  logoutThunk,
  updateUserThunk,
} from "../services/auth-thunks";

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
    if (!currentUser) {
      // Redirect user to the login screen if user is not logged in
      navigate("/login");
    } else {
      const fetchData = async () => {
        const { payload } = await dispatch(profileThunk());
        setProfile(payload);
      };
      fetchData();
    }
  }, [currentUser, dispatch, navigate]);

  // useEffect(async () => {
  //   const { payload } = await dispatch(profileThunk());
  //   setProfile(payload);
  // }, []);
  // console.log(profile);
  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <div>
          <h1>Personal Information</h1>
          {profile && (
            <div>
              <div>
                <h4> Current User: {profile.username || ""}</h4>
                <h1> profile.userTypee: {profile.userType} </h1>
                <label>First Name</label>
                <input
                  type="text"
                  value={profile.firstName}
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
                <label>Last Name</label>
                <input
                  type="text"
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
      <div className="container mb-4">
        <div className="col-12">People they are following</div>
      </div>
      <div className="container mb-4">
        <div className="col-12">People that are following them</div>
      </div>
    </div>
  );
}
export default ProfileScreen;
