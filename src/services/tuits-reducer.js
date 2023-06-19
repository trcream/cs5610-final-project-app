// Create a slice of state for tuits
import { createSlice } from "@reduxjs/toolkit";
// import tuits from "./tuits.json";

import {
  updateTuitThunk,
  createTuitThunk,
  deleteTuitThunk,
  findTuitsThunk,
} from "../services/tuits-thunks.js";

// const currentUser = {
//   userName: "NASA",
//   handle: "@nasa",
//   image: "nasa.png",
// };

// const templateTuit = {
//   ...currentUser,
//   title: "this should work",
//   topic: "Space",
//   time: "2h",
//   liked: false,
//   replies: 0,
//   retuits: 0,
//   likes: 0,
// };

const initialState = {
  tuits: [],
  loading: false,
};

const tuitsSlice = createSlice({
  name: "tuits",
  initialState,
  extraReducers: {
    [updateTuitThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const tuitNdx = state.tuits.findIndex((t) => t._id === payload._id);
      state.tuits[tuitNdx] = { ...state.tuits[tuitNdx], ...payload };
    },
    [createTuitThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tuits.push(payload);
    },

    [deleteTuitThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tuits = state.tuits.filter((t) => t._id !== payload);
    },
    [findTuitsThunk.pending]: (state) => {
      state.loading = true;
      state.tuits = [];
    },
    [findTuitsThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tuits = payload;
    },
    [findTuitsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },

  // initial state from tuits.json
  // initialState: { tuits: tuits },
  // reducers to alter state, we have create state here
  reducers: {
    // deleteTuit(state, action) {
    //   const index = state.tuits.findIndex(
    //     (tuit) => tuit._id === action.payload
    //   );
    //   state.tuits.splice(index, 1);
    // },
    // createTuit(state, action) {
    //   console.log("TESTING action.payload", action.payload);
    //   state.tuits.unshift({
    //     ...action.payload,
    //     ...templateTuit,
    //     // Updated to reflect what the user is inputing
    //     // This is really title data although we ar just calling it tuit data
    //     title: action.payload.tuit,
    //     // Generate a unique id for the tuit
    //     _id: new Date().getTime(),
    //   });
    // },
  },
});

export const { createTuit, deleteTuit } = tuitsSlice.actions;
export default tuitsSlice.reducer;
