import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CheckoutProvider } from './context/CheckoutContext.jsx';
import { AddressesProvider } from './context/AddressesContext.jsx';
import { OrdersProvider } from './context/OrdersContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        {/* <AddressesProvider>
          <OrdersProvider> */}
            <CheckoutProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </CheckoutProvider>
          {/* </OrdersProvider>
        </AddressesProvider> */}
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
