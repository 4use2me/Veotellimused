import React, { useState } from 'react';
import './App.css';
import OrderForm from './OrderForm/OrderForm';
import OrderList from './OrderList/OrderList';
import Sidebar from './Sidebar/Sidebar';
import axios from 'axios';

function App() {
    const [activeView, setActiveView] = useState(''); // '' | 'form' | 'list'
    const [orderFormKey, setOrderFormKey] = useState(0);
    const [orderData, setOrderData] = useState(null);

    const handleNewOrder = () => {
        setOrderData(null);
        setOrderFormKey(prevKey => prevKey + 1);
        setActiveView('form');
    };

    const handleSelectOrderList = () => {
        setActiveView('list');
    };

    const handleSelectOrder = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/tellimused/${orderId}`);
            setOrderData(response.data);
            setOrderFormKey(prevKey => prevKey + 1);
            setActiveView('form');
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    };

    const handleCloseOrderForm = () => {
        setActiveView('');
    };

    const handleOrderDataChange = (data) => {
        setOrderData(data);
    };

    return (
        <div className="App">
            <div className="content">
                <Sidebar onNewOrder={handleNewOrder} onSelectOrderList={handleSelectOrderList} />
                {activeView === 'form' && (
                    <OrderForm
                        key={orderFormKey}
                        onClose={handleCloseOrderForm}
                        initialData={orderData}
                        onOrderDataChange={handleOrderDataChange}
                    />
                )}
                {activeView === 'list' && <OrderList onSelectOrder={handleSelectOrder} />}
            </div>
        </div>
    );
}

export default App;
