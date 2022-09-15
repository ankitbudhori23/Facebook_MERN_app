import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/Userslice";
import postReducer from "../Features/Postslice";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer
  }
});
