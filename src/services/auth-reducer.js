import { createSlice } from "@reduxjs/toolkit";
import { findAllUsersThunk, loginThunk } from "../services/auth-thunks";
import { logoutThunk } from "../services/auth-thunks";
import { profileThunk } from "../services/auth-thunks";
import { updateUserThunk } from "../services/auth-thunks";
import { registerThunk } from "../services/auth-thunks";
import { getUserByIdThunk } from "../services/auth-thunks";
import { followUserThunk } from "../services/auth-thunks";
import { unfollowUserThunk } from "../services/auth-thunks";

// thunk posts the tuit data to the server the with corresponding service
// The reducer is listening to the action and updates the state,
// which updates the store and the UI

const authSlice = createSlice({
  name: "auth",
  initialState: { currentUser: null, users: [] },
  reducers: {},
  extraReducers: {
    [logoutThunk.fulfilled]: (state) => {
      state.currentUser = null;
    },
    [profileThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },
    [updateUserThunk.fulfilled]: (state, { payload }) => {
      // alert("state.currentUser is: " + state.currentUser);
      // alert("payload is: " + payload);
      return { ...state, currentUser: payload };
    },
    [registerThunk.fulfilled]: (state, { payload }) => {
      console.log("register thunk payload is: " + JSON.stringify(payload));
      state.currentUser = payload;
    },
    [loginThunk.fulfilled]: (state, { payload }) => {
      console.log("login thunk payload is: " + JSON.stringify(payload));
      state.currentUser = payload;
    },
    [findAllUsersThunk.fulfilled]: (state, { payload }) => {
      console.log("findAllUsersThunk payload is: " + JSON.stringify(payload));
      state.users = payload;
    },
    [getUserByIdThunk.fulfilled]: (state, { payload }) => {
      console.log("getUserByIdThunk payload is: " + JSON.stringify(payload));
      state.currentUser = payload;
    },
    // [followUserThunk.fulfilled]: (state, { payload }) => {
    //   console.log("followUserThunk payload is: " + JSON.stringify(payload));
    //   state.currentUser = payload;
    // },
    // [unfollowUserThunk.fulfilled]: (state, { payload }) => {
    //   console.log("unfollowUserThunk payload is: " + JSON.stringify(payload));
    //   state.currentUser = payload;
    // },
  },
});
export default authSlice.reducer;
