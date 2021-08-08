import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRemoteUser, fetchRemoteAlbumPhoto } from "./fetchAPI";

const initialState = {
  data: [],
  albumId: 0,
  user: null,
  validUntil: 0,
  status: "idle",
};

export const fetchUser = createAsyncThunk("photo/fetchUser", async (id) => {
  const response = await fetchRemoteUser(id);
  return response.data;
});

export const fetchPhoto = createAsyncThunk("photo/fetchPhoto", async (id) => {
  const response = await fetchRemoteAlbumPhoto(id);
  return response.data;
});

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    setPhotoUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchPhoto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPhoto.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
        state.validUntil = Date.now() + 300000;
        state.albumId = action.meta.arg;
      })
      .addCase(fetchPhoto.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { setPhotoUser } = photoSlice.actions;

export const selectPhotoUser = (state) => state.photo.user;
export const selectData = (state) => state.photo.data;
export const selectStatus = (state) => state.photo.status;
export const selectValidUntil = (state) => state.photo.validUntil;
export const selectAlbumId = (state) => state.photo.albumId;

export default photoSlice.reducer;
