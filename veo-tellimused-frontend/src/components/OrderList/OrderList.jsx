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
        if (!order) {
            return false; // Jäta välja, kui tellimus on null/undefined
        }
    
        const term = searchTerm.toLowerCase().trim();
    
        // Kontrolli omadusi ja määra vaikimisi väärtused, kui need on null/undefined
        const tellimuseNumber = order.TellimuseNumber ? order.TellimuseNumber.toLowerCase() : '';
        const klient = order.Klient ? order.Klient.toLowerCase() : '';
        const klientII = order.KlientII ? order.KlientII.toLowerCase() : '';
        const vedaja = order.Vedaja ? order.Vedaja.toLowerCase() : '';
        const staatus = order.Staatus ? order.Staatus.toLowerCase() : '';
    
        // Kui otsingusõna on tühi, tagasta kõik tellimused
        if (!term) {
            return true;
        }
    
        // Tagasta true, kui vähemalt üks omadus sisaldab otsingusõna
        return (
            tellimuseNumber.includes(term) ||
            klient.includes(term) ||
            klientII.includes(term) ||
            vedaja.includes(term) ||
            staatus.includes(term)
        );
    });    

    return (
        <div className="order-list">
            <h2>Tellimuste nimekiri</h2>
            <input
                type="text"
                placeholder="Otsi tellimuse numbri, kliendi, vedaja või staatuse järgi"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Tellimuse number</th>
                        <th>Klient</th>
                        <th>Klient2</th>
                        <th>Vedaja</th>
                        <th>Staatus</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                            <tr key={order.id} onClick={() => onSelectOrder(order.id)}>
                                <td>{order.TellimuseNumber}</td>
                                <td>{order.Klient}</td>
                                <td>{order.KlientII}</td>
                                <td>{order.Vedaja}</td>
                                <td>{order.Staatus}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Sobivaid tellimusi ei leitud.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
