import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

const initState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getProducts = createAsyncThunk('getProducts', async () => {
  const result = await productService.getProducts();
  return result;
});

export const addProduct = createAsyncThunk('addProduct', async (product) => {
  const result = await productService.addProduct(product);
  return result;
});

export const editProduct = createAsyncThunk('editProduct', async (updatedProduct) => {
  const result = await productService.editProduct(updatedProduct);
  return result;
});

export const deleteProduct = createAsyncThunk('deleteProduct', async (productId) => {
  const result = await productService.deleteProduct(productId);
  return result;
});

export const archiveProduct = createAsyncThunk('archiveProduct', async (productId) => {
  const result = await productService.archiveProduct(productId);
  return result;
});

export const filterByAvailability = createAsyncThunk('filterByAvailability', async (availability) => {
  const filteredUProducts = await productService.filterByAvailability(availability);
  return filteredUProducts;
});

export const productsSlice = createSlice({
  name: 'product',
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
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(addProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(editProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(archiveProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(archiveProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(archiveProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(filterByAvailability.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterByAvailability.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(filterByAvailability.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productsSlice.reducer;
