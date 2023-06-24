import authReducer from "../services/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";
import whoReducer from "../reducers/who-reducer";
import tuitsReducer from "../services/tuits-reducer.js";
import criticReducer from "../services/critic-reducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
    who: whoReducer,
    tuits: tuitsReducer,
    critic: criticReducer,
  },
});

export default store;
