import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { wishlist: [] },
  reducers: {
    addRestaurantToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    removeRestaurantFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(item => item.restaurant_id !== action.payload);
    },
  },
});

export const { addRestaurantToWishlist, removeRestaurantFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
