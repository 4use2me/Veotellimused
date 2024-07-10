import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderList.css';

const OrderList = ({ onSelectOrder }) => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tellimused');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setOrders([]); // Set orders to empty array on error to prevent null/undefined
            }
        };

        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order => {
        if (!order || !order.TellimuseNumber || !order.Klient || !order.Vedaja) {
            return false; // Handle case where order or its properties are null/undefined
        }

        const term = searchTerm.toLowerCase();

        // Check if searchTerm is empty, return true to include all orders
        if (!term.trim()) {
            return true;
        }

        return (
            order.TellimuseNumber.toLowerCase().includes(term) ||
            order.Klient.toLowerCase().includes(term) ||
            order.Vedaja.toLowerCase().includes(term)
        );
    });

    return (
        <div className="order-list">
            <h2>Tellimuste nimekiri</h2>
            <input
                type="text"
                placeholder="Otsi tellimuse numbri, kliendi või vedaja järgi"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Tellimuse number</th>
                        <th>Klient</th>
                        <th>Vedaja</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                            <tr key={order.id} onClick={() => onSelectOrder(order.id)}>
                                <td>{order.TellimuseNumber}</td>
                                <td>{order.Klient}</td>
                                <td>{order.Vedaja}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No matching orders found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
