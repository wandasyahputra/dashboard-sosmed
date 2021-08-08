import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchRemoteUser,
  fetchRemotePost,
  deleteRemotePost,
  editRemotePost,
  postRemotePost,
} from "./fetchAPI";

const initialState = {
  data: [],
  user: null,
  deleteStatus: "idle",
  editorStatus: "idle",
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

export const editPost = createAsyncThunk(
  "post/editPost",
  async ({ id, data }) => {
    const response = await editRemotePost(id, data);
    return response.data;
  }
);

export const postPost = createAsyncThunk("post/postPost", async (data) => {
  const response = await postRemotePost(data);
  return response.data;
});

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  const response = await deleteRemotePost(id);
  return response.data;
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostUser: (state, action) => {
      state.user = action.payload;
    },
    setDeleteStatus: (state) => {
      state.deleteStatus = "idle";
    },
    setEditorStatus: (state) => {
      state.editorStatus = "idle";
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
        state.validUntil = Date.now() + 300000;
      })
      .addCase(fetchPost.rejected, (state) => {
        state.status = "error";
      })
      .addCase(postPost.pending, (state) => {
        state.editorStatus = "loading";
      })
      .addCase(postPost.fulfilled, (state) => {
        state.editorStatus = "success";
      })
      .addCase(editPost.pending, (state) => {
        state.editorStatus = "loading";
      })
      .addCase(editPost.fulfilled, (state) => {
        state.editorStatus = "success";
      })
      .addCase(editPost.rejected, (state) => {
        state.editorStatus = "error";
      })
      .addCase(deletePost.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const newData = [];
        state.data.map((item) => {
          if (item.id !== action.meta.arg) newData.push(item);
          return null;
        });
        state.data = newData;
        state.deleteStatus = "success";
      });
  },
});

export const { setPostUser, setDeleteStatus, setEditorStatus } =
  postSlice.actions;

export const selectPostUser = (state) => state.post.user;
export const selectData = (state) => state.post.data;
export const selectStatus = (state) => state.post.status;
export const selectValidUntil = (state) => state.post.validUntil;
export const selectDeleteStatus = (state) => state.post.deleteStatus;
export const selectEditorStatus = (state) => state.post.editorStatus;

export default postSlice.reducer;
