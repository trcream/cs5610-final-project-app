import authReducer from "../services/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";
import whoReducer from "../reducers/who-reducer";
import tuitsReducer from "../services/tuits-reducer.js";

export const store = configureStore({
  reducer: {
    user: authReducer,
    who: whoReducer,
    tuits: tuitsReducer,
  },
});

export default store;
