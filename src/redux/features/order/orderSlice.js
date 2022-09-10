import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';

const initState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getOrders = createAsyncThunk('getOrders', async () => {
  const result = await orderService.getOrders();
  return result;
});

export const orderSlice = createSlice({
  name: 'orders',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default orderSlice.reducer;
