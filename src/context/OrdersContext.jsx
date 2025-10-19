import React, { useContext, useEffect } from "react";
import { createContext } from "react"
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import { useState } from "react";


const OrdersContext = createContext();

function OrdersProvider({ children }) {

    const { user, isLoggedIn, refreshToken } = useAuth();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, [user, isLoggedIn]);


    const fetchOrders = async () => {
        if (isLoggedIn) {
            try {
                const ordersData = await getOrders();
                setOrders(ordersData);
            } catch (error) {
                console.error('Failed to load orders:', error);
                setOrders([]);
            }
        }
    }

    const getOrders = async (retry = true) => {
        const respone = await fetch('/api/orders/', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            }
        });
        if (!respone.ok) {
            if (respone.status === 401 && retry) {
                console.log("Access token invalid, trying refresh...");
                const refreshed = await refreshToken();
                if (refreshed) {
                    return await getOrders(false);
                }
                throw new Error('Failed to fetch orders');
            }
            throw new Error('Failed to fetch addresses');
        }
        const data = await respone.json();
        console.log('Orders fetched:', data);
        return data;
    }

    const addOrder = async (order, retry = true) => {
        console.log("Adding order:", order);
        const response = await fetch('/api/orders/', {
           method: 'POST',
           headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
           },
           body: JSON.stringify(order),
        });
        if (!response.ok) {
            if (response.status === 401 && retry) {
                console.log("Access token invalid, trying refresh...");
                const refreshed = await refreshToken();
                if (refreshed) {
                    return await addOrder(order, false);
                }
                throw new Error('Failed to add order');
            }
            throw new Error('Failed to add order');
        }
        fetchOrders();
        return true;
    }


    return (
        <OrdersContext.Provider value={{ orders, getOrders, addOrder }}>
            {children}
        </OrdersContext.Provider>
    )
}

const useOrders = () => useContext(OrdersContext)

export { useOrders, OrdersProvider };

OrdersProvider.propTypes = {
    children: PropTypes.node.isRequired,
}