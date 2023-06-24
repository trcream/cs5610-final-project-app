import { createSlice } from "@reduxjs/toolkit";
import { createCriticThunk } from "../services/critic-thunk";
import { updateCriticThunk } from "../services/critic-thunk";
import { deleteCriticThunk } from "../services/critic-thunk";
import { findAllCriticsThunk } from "../services/critic-thunk";

const criticSlice = createSlice({
  name: "critic",
  initialState: { currentCritic: null, critics: [] },
  reducers: {},
  extraReducers: {
    [createCriticThunk.fulfilled]: (state, { payload }) => {
      console.log("create critic thunk payload is: " + JSON.stringify(payload));
      state.currentCritic = payload;
    },
    [updateCriticThunk.fulfilled]: (state, { payload }) => {
      state.currentCritic = payload;
    },
    [deleteCriticThunk.fulfilled]: (state, { payload }) => {
      state.currentCritic = payload;
    },
    [findAllCriticsThunk.fulfilled]: (state, { payload }) => {
      state.critics = payload;
    },
  },
});

export default criticSlice.reducer;
