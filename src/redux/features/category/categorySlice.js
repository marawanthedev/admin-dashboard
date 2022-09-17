import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService';

const initState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getCategories = createAsyncThunk('getCategories', async () => {
  const result = await categoryService.getCategories();
  return result;
});
export const addCategory = createAsyncThunk('addCategory', async (newCategory) => {
  const result = await categoryService.addCategory(newCategory);
  return result;
});
export const editCategory = createAsyncThunk('editCategory', async (categoryId, updatedCategoryData) => {
  const result = await categoryService.editCategory(categoryId, updatedCategoryData);
  return result;
});

export const deleteCategory = createAsyncThunk('deleteCategory', async (categoryId) => {
  const result = await categoryService.deleteCategory(categoryId);
  return result;
});

export const categorySlice = createSlice({
  name: 'orders',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(addCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(editCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(editCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default categorySlice.reducer;
