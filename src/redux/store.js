import { configureStore } from '@reduxjs/toolkit';
import users from './features/user/userSlice';
import shops from './features/shops/shopSlice';
import auth from './features/auth/authSlice';
import order from './features/order/orderSlice';

export const store = configureStore({
  reducer: {
    user: users,
    shop: shops,
    auth,
    order,
  },
});
