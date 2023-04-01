import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/users/usersSlice";
import healthCentersSlice from "../features/healthCenters/healthCentersSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    center: healthCentersSlice,
  },
});
