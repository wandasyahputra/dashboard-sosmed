import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRemoteUser, fetchRemotePostDetail } from "./fetchAPI";

const initialState = {
  user: null,
  post: [],
  validUntil: 0,
  postId: 0,
  status: "loading",
};

export const fetchUser = createAsyncThunk(
  "postdetail/fetchUser",
  async (userId) => {
    const response = await fetchRemoteUser(userId);
    return response.data;
  }
);

export const fetchPostDetail = createAsyncThunk(
  "postdetail/fetchPostDetail",
  async (postId) => {
    const response = await fetchRemotePostDetail(postId);
    return response.data;
  }
);

export const postDetailSlice = createSlice({
  name: "postdetail",
  initialState,
  reducers: {
    setPostDetailUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchPostDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        state.post = action.payload;
        state.postId = action.payload.postId;
        state.validUntil = Date.now() + 300000;
        state.status = "idle";
      })
      .addCase(fetchPostDetail.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { setPostDetailUser } = postDetailSlice.actions;

export const selectPostUser = (state) => state.postDetail.user;
export const selectData = (state) => state.postDetail.post[0];
export const selectStatus = (state) => state.postDetail.status;
export const selectValidUntil = (state) => state.postDetail.validUntil;

export default postDetailSlice.reducer;
