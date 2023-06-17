import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../services/auth-thunks";
import { logoutThunk } from "../services/auth-thunks";
import { profileThunk } from "../services/auth-thunks";
import { updateUserThunk } from "../services/auth-thunks";
import { registerThunk } from "../services/auth-thunks";

// thunk posts the tuit data to the server the with corresponding service
// The reducer is listening to the action and updates the state,
// which updates the store and the UI

const authSlice = createSlice({
  name: "auth",
  initialState: { currentUser: null },
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
      state.currentUser = payload;
    },
    [loginThunk.fulfilled]: (state, { payload }) => {
      // alert("login state.currentUser update getting called here");
      // console.log(payload);
      state.currentUser = payload;
    },
  },
});
export default authSlice.reducer;
