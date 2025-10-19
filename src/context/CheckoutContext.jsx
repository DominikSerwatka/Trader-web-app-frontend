import React, { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
import propTypes from 'prop-types';
import { useRef } from 'react';

const CheckoutContext = createContext();

const STORAGE_KEY = 'checkout:data:v1';

const defaultData = {
  address: null,
  order_items: [],
  order: {
    delivery_address_snapshot: null,
  },
};

function readFromStorage() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== 'object') return defaultData;

    return {
      ...defaultData,
      ...parsed,
      order: { ...defaultData.order, ...(parsed.order || {}) },
    };
  } catch {
    return defaultData;
  }
}

export function CheckoutProvider({ children }) {

  const [checkoutData, setCheckoutData] = useState(() => readFromStorage());

  const hydratedRef = useRef(false);


  useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(checkoutData));
    } catch {
      // Handle errors
    }
  }, [checkoutData]);


  const setAndValidateCheckoutData = (address, order_items, order) => {
    // validation logic here not now
    console.log('Setting checkout data:', { address, order_items, order });
    var newData = {
      address: address,
      order_items: order_items,
      order: order,
    }
    console.log('New checkout data:', newData);
    setCheckoutData(newData);
  }

  const clearCheckoutData = () => {
    setCheckoutData(defaultData);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Handle errors  
    }
  }

  useEffect(() => {
    console.log('Checkout data updated:', checkoutData);
  } , [checkoutData]);


  return (
    <CheckoutContext.Provider value={{ checkoutData, setAndValidateCheckoutData, clearCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);

CheckoutProvider.propTypes = {
  children: propTypes.node.isRequired,
};
