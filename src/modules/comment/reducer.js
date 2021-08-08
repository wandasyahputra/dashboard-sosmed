import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRemoteUser } from "./fetchAPI";

const initialState = {
  post_id: 0,
  comment: [],
  validUntil: 0,
  status: "idle",
};

export const fetchComment = createAsyncThunk(
  "comment/fetchComment",
  async (postId) => {
    const response = await fetchRemoteUser(postId);
    return response.data;
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.status = "idle";
      });
  },
});

export const selectComment = (state) => state.comment.value;
export const selectStatus = (state) => state.users.status;
export const selectValidUntil = (state) => state.users.validUntil;

export default commentSlice.reducer;
