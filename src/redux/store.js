import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/products/productsSlice";

export const store = configureStore({
  // adding reducer
  reducer: {
    products: productsSlice,
  },
});
