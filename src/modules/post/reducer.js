import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRemoteUser, fetchRemotePost } from "./fetchAPI";

const initialState = {
  data: [],
  user: {},
  validUntil: 0,
  status: "idle",
};

export const fetchUser = createAsyncThunk("post/fetchUser", async (id) => {
  const response = await fetchRemoteUser(id);
  return response.data;
});

export const fetchPost = createAsyncThunk("post/fetchPost", async (id) => {
  const response = await fetchRemotePost(id);
  return response.data;
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchPost.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { setPostUser } = postSlice.actions;

export const selectPostUser = (state) => state.post.user;
export const selectData = (state) => state.post.data;
export const selectStatus = (state) => state.post.status;
export const selectValidUntil = (state) => state.post.validUntil;

export default postSlice.reducer;
