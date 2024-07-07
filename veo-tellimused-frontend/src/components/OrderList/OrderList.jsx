import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderList.css';

const OrderList = ({ onSelectOrder }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tellimused');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="order-list">
            <h2>Tellimuste nimekiri</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id} onClick={() => onSelectOrder(order.id)}>
                        {order.klient}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
