import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initState = {
  userInAuth: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const loginUser = createAsyncThunk('loginUser', async (userCredentials) => {
  const result = await authService.loginUser(userCredentials);
  return result;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInAuth = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default authSlice.reducer;
