import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "modules/users/reducer";

export const store = configureStore({
  reducer: {
    users: usersSlice,
  },
});
