// Import configureStore from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "./restaurantSlice";
import authSlice from "./authSlice";
import wishlistSlice from "./wishlistSlice"; // Import your wishlistSlice

export const store = configureStore({
  reducer: {
    restaurant: restaurantSlice,
    auth: authSlice,
    wishlist: wishlistSlice, // Add wishlistSlice to your reducers
  },
});
