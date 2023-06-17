import authReducer from "../services/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";
import whoReducer from "../reducers/who-reducer";
// import tuitsReducer from "../reducers/tuits-reducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
    who: whoReducer,
    // tuits: tuitsReducer,
  },
});

export default store;
