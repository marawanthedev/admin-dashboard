import { configureStore } from '@reduxjs/toolkit';
import user from './features/user/userSlice';
import shop from './features/shops/shopSlice';
import auth from './features/auth/authSlice';
import order from './features/order/orderSlice';
import product from './features/product/productSlice';
import category from './features/category/categorySlice';

export const store = configureStore({
  reducer: {
    user,
    shop,
    auth,
    order,
    product,
    category,
  },
});
