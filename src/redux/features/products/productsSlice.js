import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import productsService from "./productsService.js";
import smartTryCatch from "../../../util/smartTryCatch.js";
const initState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getProducts = createAsyncThunk(
  "acceptBooking",
  async (data, thunkAPI) => {
    return await smartTryCatch(productsService.doSmth, data, thunkAPI);
  }
);

export const sampleSlice = createSlice({
  name: "dailyPopUp",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default sampleSlice.reducer;
