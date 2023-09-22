import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import restaurantSlice from "./restaurantSlice";
import authSlice from "./authSlice";
import wishlistSlice from "./wishlistSlice";

const rootReducer = combineReducers({
  restaurant: restaurantSlice,
  auth: authSlice,
  wishlist: wishlistSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default { store, persistor };
