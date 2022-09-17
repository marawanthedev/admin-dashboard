import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import User from './pages/User/User';
import Shop from './pages/Shop';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import ShopForm from './pages/shopForm';
import Orders from './pages/Order';
import ProductForm from './pages/productForm';
import CategoryForm from './pages/categoryForm';
import Category from './pages/Category';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'shop', element: <Shop /> },
        { path: 'orders', element: <Orders /> },
        { path: 'category', element: <Category /> },
        { path: 'products', element: <Products /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'manage-shop',
      element: <ShopForm />,
    },
    {
      path: 'manage-product',
      element: <ProductForm />,
    },
    {
      path: 'manage-category',
      element: <CategoryForm />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
