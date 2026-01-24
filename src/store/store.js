import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import moviesReducer from "../store/moviesSlice";
import uiReducer from "../store/uiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    ui: uiReducer,
  },
});

export default store;
