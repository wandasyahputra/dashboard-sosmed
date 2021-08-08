import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchRemoteComment,
  editRemoteComment,
  postRemoteComment,
  deleteRemoteComment,
} from "./fetchAPI";

const initialState = {
  post_id: 0,
  comment: [],
  validUntil: 0,
  status: "idle",
  deleteStatus: "idle",
  editorStatus: "idle",
};

export const fetchComment = createAsyncThunk(
  "comment/fetchComment",
  async (postId) => {
    const response = await fetchRemoteComment(postId);
    return response.data;
  }
);

export const editComment = createAsyncThunk(
  "comment/editComment",
  async ({ id, data }) => {
    const response = await editRemoteComment(id, data);
    return response.data;
  }
);

export const postComment = createAsyncThunk(
  "comment/postComment",
  async (data) => {
    const response = await postRemoteComment(data);
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id) => {
    const response = await deleteRemoteComment(id);
    return response.data;
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setDeleteStatus: (state) => {
      state.deleteStatus = "idle";
    },
    setEditorStatus: (state) => {
      state.editorStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.post_id = action.meta.arg;
        state.status = "idle";
        state.validUntil = Date.now() + 300000;
      })
      .addCase(fetchComment.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(postComment.pending, (state) => {
        state.editorStatus = "loading";
      })
      .addCase(postComment.fulfilled, (state) => {
        state.editorStatus = "success";
      })
      .addCase(editComment.pending, (state) => {
        state.editorStatus = "loading";
      })
      .addCase(editComment.fulfilled, (state) => {
        state.editorStatus = "success";
      })
      .addCase(editComment.rejected, (state) => {
        state.editorStatus = "error";
      })
      .addCase(deleteComment.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const newData = [];
        state.comment.map((item) => {
          if (item.id !== action.meta.arg) newData.push(item);
          return null;
        });
        state.comment = newData;
        state.deleteStatus = "success";
      });
  },
});

export const { setDeleteStatus, setEditorStatus } = commentSlice.actions;

export const selectComment = (state) => state.comment.comment;
export const selectStatus = (state) => state.comment.status;
export const selectValidUntil = (state) => state.comment.validUntil;
export const selectDeleteStatus = (state) => state.comment.deleteStatus;
export const selectEditorStatus = (state) => state.comment.editorStatus;
export const selectPostId = (state) => state.comment.post_id;

export default commentSlice.reducer;
