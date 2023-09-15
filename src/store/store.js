import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "./restaurantSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    restaurant: restaurantSlice,
    auth: authSlice,
  },
});
