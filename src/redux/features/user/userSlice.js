import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getUsers = createAsyncThunk('getUsers', async () => {
  const result = await userService.getUsers();
  return result;
});

export const deleteUser = createAsyncThunk('deleteUsers', async (data) => {
  const result = userService.deleteUser(data);
  return result;
});
export const editUserRole = createAsyncThunk('editUserRole', async (data) => {
  const result = userService.editUserRole(data);
  return result;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(editUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(editUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default usersSlice.reducer;
