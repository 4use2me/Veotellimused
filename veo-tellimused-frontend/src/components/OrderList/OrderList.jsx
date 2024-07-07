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
            <table>
                <thead>
                    <tr>
                        <th>Tellimuse number</th>
                        <th>Klient</th>
                        <th>Loomise kuupäev</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} onClick={() => onSelectOrder(order.id)}>
                            <td>{order.id}</td>
                            <td>{order.Klient}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
