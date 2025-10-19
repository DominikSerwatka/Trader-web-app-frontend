import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import ProductsPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage';
import ShopCartPage from './pages/ShopCartPage';
import ProductPage, { productLoader } from './pages/ProductPage';
import FavoritesPage from './pages/FavoritesPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import Orders from './components/Orders';
import Returns from './components/Returns';
import Settings from './components/Settings';
import Payments from './components/Payments';
import Opinions from './components/Opinions';
import Profile from './components/Profile';
import CheckoutMainLayout from './layouts/CheckoutMainLayout';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSummaryPage from './pages/CheckoutSummaryPage';
import productsLoader from './loaders/productsLoader';
import StockPage from './pages/StockPage';
import UploadExcelPage from './pages/UploadExcelPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        {/* <Route path="/stock" element={<StockPage />} /> */}
        <Route index element={<StockPage />}/>
        <Route path="/upload-excel" element={<UploadExcelPage />}/>
        {/* <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} loader={productLoader} />
        <Route path="/shop-cart" element={<ShopCartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<ProfilePage />}>
          {/* <Route path="/orders" element={<Orders />} /> */}
          <Route path="/returns" element={<Returns />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/payments" element={<Payments />} /> */}
          <Route path="/opinions" element={<Opinions />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      {/* <Route element={<CheckoutMainLayout />}>
        <Route path="/checkout/orderring" element={<CheckoutPage />} />
        <Route path="/checkout/summary" element={<CheckoutSummaryPage />} />
      </Route> */}
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
