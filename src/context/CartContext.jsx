import React from 'react';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, isLoggedIn } = useAuth();

  const cartStorageKey = useMemo(
    () => (isLoggedIn ? `cart_${user.email}` : 'cart_guest'),
    [isLoggedIn, user?.email]
  );

  const loadCart = (key) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  };

  const [cart, setCart] = useState(() => {
    return loadCart(cartStorageKey);
  });

  useEffect(() => {
    setCart(loadCart(cartStorageKey));
  }, [cartStorageKey]);

  useEffect(() => {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  }, [cart, cartStorageKey]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find((p) => p.id === product.id);
      if (existingProduct) {
        return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    console.log('Product added to cart:', product);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const removeOneFromCart = (productId) => {
    setCart((prev) => {
      const existingProduct = prev.find((p) => p.id === productId);
      if (existingProduct && existingProduct.quantity > 1) {
        return prev.map((p) => (p.id === productId ? { ...p, quantity: p.quantity - 1 } : p));
      } else {
        return prev.filter((p) => p.id !== productId);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, removeOneFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
