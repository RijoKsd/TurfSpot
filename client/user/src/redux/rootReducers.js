// src/redux/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
});

export default rootReducer;
