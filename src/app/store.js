import { configureStore } from "@reduxjs/toolkit";
import postSlice from "modules/post/reducer";
import usersSlice from "modules/users/reducer";
import postDetailSlice from "modules/post-detail/reducer";
import commentSlice from "modules/comment/reducer";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    post: postSlice,
    postDetail: postDetailSlice,
    comment: commentSlice,
  },
});
