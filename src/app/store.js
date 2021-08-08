import { configureStore } from "@reduxjs/toolkit";
import postSlice from "modules/post/reducer";
import usersSlice from "modules/users/reducer";
import postDetailSlice from "modules/post-detail/reducer";
import commentSlice from "modules/comment/reducer";
import albumSlice from "modules/album/reducer";
import photoSlice from "modules/photo/reducer";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    post: postSlice,
    postDetail: postDetailSlice,
    comment: commentSlice,
    album: albumSlice,
    photo: photoSlice,
  },
});
