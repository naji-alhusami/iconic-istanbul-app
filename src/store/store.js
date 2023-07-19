import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/users/usersSlice";
import iconicPlacesSlice from "../features/iconicPlaces/iconicPlacesSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    place: iconicPlacesSlice,
  },
});
