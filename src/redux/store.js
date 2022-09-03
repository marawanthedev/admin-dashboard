import { configureStore } from '@reduxjs/toolkit';
import users from './features/user/userSlice';
import shops from './features/shops/shopSlice';

export const store = configureStore({
  // adding reducer
  reducer: {
    user: users,
    shop: shops,
  },
});
