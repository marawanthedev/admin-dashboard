import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ReduxPaginationHandler from '../../../utils/reduxPaginationHandler';
import shopService from './shopService';

const initState = {
  shops: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const addShop = createAsyncThunk('addShop', async (newShop) => {
  const result = shopService.addShop(newShop);
  return result;
});

export const getShops = createAsyncThunk('getShops', async (startingOffset) => {
  const result = await shopService.getShops(startingOffset);
  return result;
});

export const deleteShop = createAsyncThunk('deleteShops', async (data) => {
  const result = shopService.deleteShop(data);
  return result;
});

export const editShopInfo = createAsyncThunk('editUserRole', async (data) => {
  const result = shopService.editShopInfo(data);
  return result;
});

export const filterByDate = createAsyncThunk('filterByDate', async (date) => {
  const filteredUsers = await shopService.filterByDate(date);
  return filteredUsers;
});

export const shopsSlice = createSlice({
  name: 'shops',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShops.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShops.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shops = ReduxPaginationHandler({ statePropTarget: state.shops, action });
      })
      .addCase(getShops.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shops = action.payload;
      })
      .addCase(deleteShop.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(editShopInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editShopInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shops = action.payload;
      })
      .addCase(editShopInfo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shops = action.payload;
      })
      .addCase(addShop.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(filterByDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shops = action.payload;
      })
      .addCase(filterByDate.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default shopsSlice.reducer;
