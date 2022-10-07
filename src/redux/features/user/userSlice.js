import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchAllUtil } from '../../../utils/searchAll';
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

export const searchAll = createAsyncThunk('searchAll', async (data) => {
  const result = searchAllUtil()
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
export const addUsersCSV = createAsyncThunk('addUsersCSV', async (data) => {
  const result = await userService.addUsersCSV(data);
  return result;
});

export const registerUser = createAsyncThunk('registerUser', async (userInfo) => {
  const registeredUser = await userService.registerUser(userInfo);
  return registeredUser;
});

export const filterByRole = createAsyncThunk('filterByRole', async (role) => {
  const filteredUsers = await userService.filterByRole(role);
  console.log(filteredUsers);
  return filteredUsers;
});

export const filterByDate = createAsyncThunk('filterByDate', async (date) => {
  const filteredUsers = await userService.filterByDate(date);
  return filteredUsers;
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
      .addCase(editUserRole.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addUsersCSV.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUsersCSV.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(addUsersCSV.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(filterByRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterByRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(filterByRole.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(filterByDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterByDate.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // todo to be updated with api result
        // state.users = action.payload;
      })
      .addCase(filterByDate.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default usersSlice.reducer;
