import { configureStore } from "@reduxjs/toolkit";
import postSlice from "modules/post/reducer";
import usersSlice from "modules/users/reducer";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    post: postSlice,
  },
});
