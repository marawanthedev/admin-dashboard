import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initState = {
  userInAuth: JSON.parse(localStorage.getItem('user')) || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const loginUser = createAsyncThunk('loginUser', async (userCredentials) => {
  const result = await authService.loginUser(userCredentials);
  return result;
});
export const logoutUser = createAsyncThunk('logoutUser', async (userCredentials) => {
  const result = await authService.logoutUser(userCredentials);
  return result;
});

export const registerUser = createAsyncThunk('registerUser', async (userInfo) => {
  const registeredUser = await authService.registerUser(userInfo);
  return registeredUser;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    resetAuth: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
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
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInAuth = action.payload;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// exporting a singular function
export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
