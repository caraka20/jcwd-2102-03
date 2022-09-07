import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import renderReducer from "./reducer/renderReducer";
import addressReducer from "./reducer/addressReducer";
import newPostReducer from "./reducer/newPostReducer";
import filterReducer from "./reducer/filterReducer";

const rootReducer = combineReducers({
  authReducer,
  renderReducer,
  addressReducer,
  filterReducer,
  // newPostReducer,
});

export default rootReducer;
