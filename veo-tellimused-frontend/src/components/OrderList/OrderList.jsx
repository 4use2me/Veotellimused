import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderList.css'; // assuming you have some basic styling

const OrderList = ({ onSelectOrder }) => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tellimused');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []); // Käivitatakse ainult esmakordselt

    return (
        <div className="order-list">
            <h2>Tellimuste nimekiri</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tellimuse number</th>
                        <th>Klient</th>
                        <th>Vedaja</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} onClick={() => onSelectOrder(order.id)}>
                            <td>{order.TellimuseNumber}</td>
                            <td>{order.Klient}</td>
                            <td>{order.Vedaja}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
