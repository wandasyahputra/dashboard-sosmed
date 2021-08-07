import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRemoteUser } from "./fetchAPI";

const initialState = {
  value: [],
  validUntil: 0,
  status: "idle",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetchRemoteUser();
  return response.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
        state.validUntil = Date.now() + 300000;
      });
  },
});

export const selectData = (state) => state.users.value;
export const selectStatus = (state) => state.users.status;
export const selectValidUntil = (state) => state.users.validUntil;

export default usersSlice.reducer;
