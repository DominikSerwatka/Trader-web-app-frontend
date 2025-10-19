import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';

const AddressesContext = createContext();

function AddressesProvider({ children }) {
  const { user, isLoggedIn, refreshToken } = useAuth();

  const getAddresses = async (retry = true) => {
    const response = await fetch('/api/addresses/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    console.log('Access token from addresses:', localStorage.getItem('accessToken'));
    if (!response.ok) {
      if (response.status === 401 && retry) {
        console.log('Access token invalid, trying refresh...');
        const refreshed = await refreshToken();
        if (refreshed) {
          return await getAddresses(false);
        }
        throw new Error('Failed to fetch addresses');
      }
      const refreshed = await refreshToken();
      if (refreshed) {
        return getAddresses(false);
      }
      throw new Error('Failed to fetch addresses');
    }
    const data = await response.json();
    console.log('Addresses fetched:', data);
    return data;
  };

  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchAddresses();
  }, [user, isLoggedIn]);

  const fetchAddresses = async () => {
    if (isLoggedIn) {
      try {
        const addressData = await getAddresses();
        setAddresses(addressData);
      } catch (error) {
        console.error('Failed to load addresses:', error);
        setAddresses([]);
      }
    }
  };

  const addAddress = async (address, retry = true) => {
    console.log('Adding address:', addAddress);
    const response = await fetch('/api/addresses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(address),
    });
    if (!response.ok) {
      if (response.status == 401 && retry) {
        console.log('Access token invalid, trying refresh...');
        const refreshed = await refreshToken();
        if (refreshed) {
          return await addAddress(address, false);
        }
        throw new Error('Failed to add new address');
      }
      throw new Error('Failed to add new address');
    }
    await fetchAddresses();
    return true;
  };

  const deleteAddress = async (id, retry = true) => {
    const response = await fetch(`/api/addresses/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (!response.ok) {
      if (response.status === 401 && retry) {
        console.log('Access token invalid, trying refresh...');
        const refreshed = await refreshToken();
        if (refreshed) {
          return await deleteAddress(id, false);
        }
        throw new Error('Failed to delete address');
      }
      throw new Error('Failed to delete address');
    }
    await fetchAddresses();
    return true;
  };

  const updateAddress = async (id, address, retry = true) => {
    console.log('Updating address:', id);
    console.log('Updating address access token', localStorage.getItem('accessToken'));
    const response = await fetch(`/api/addresses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(address),
    });

    if (!response.ok) {
      if (response.status === 401 && retry) {
        console.log('Access token invalid, trying refresh...');
        const refreshed = await refreshToken();
        if (refreshed) {
          return await updateAddress(id, address, false);
        }
        throw new Error('Failed to update address');
      }
      throw new Error('Failed to update address');
    }
    await fetchAddresses();
    return true;
  };

  return (
    <AddressesContext.Provider value={{ addresses, getAddresses, addAddress, deleteAddress, updateAddress }}>
      {children}
    </AddressesContext.Provider>
  );
}

const useAddresses = () => useContext(AddressesContext);

export { useAddresses, AddressesProvider };

AddressesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
