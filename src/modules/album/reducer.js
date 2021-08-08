import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRemoteUser, fetchRemoteAlbum } from "./fetchAPI";

const initialState = {
  data: [],
  user: null,
  validUntil: 0,
  status: "idle",
};

export const fetchUser = createAsyncThunk("album/fetchUser", async (id) => {
  const response = await fetchRemoteUser(id);
  return response.data;
});

export const fetchAlbum = createAsyncThunk("album/fetchAlbum", async (id) => {
  console.log(id);
  const response = await fetchRemoteAlbum(id);
  return response.data;
});

export const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    setAlbumUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchAlbum.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAlbum.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
        state.validUntil = Date.now() + 300000;
      })
      .addCase(fetchAlbum.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { setAlbumUser } = albumSlice.actions;

export const selectAlbumUser = (state) => state.album.user;
export const selectData = (state) => state.album.data;
export const selectStatus = (state) => state.album.status;
export const selectValidUntil = (state) => state.album.validUntil;

export default albumSlice.reducer;
