import React, { useState } from 'react';
import './App.css';
import OrderForm from './OrderForm/OrderForm';
import Sidebar from './Sidebar/Sidebar';

function App() {
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [orderFormKey, setOrderFormKey] = useState(0);
    const [orderData, setOrderData] = useState(null);

    const handleNewOrder = () => {
        setOrderData(null);
        setOrderFormKey(prevKey => prevKey + 1);
        setShowOrderForm(true);
    };

    const handleCloseOrderForm = () => {
        setShowOrderForm(false);
    };

    const handleOrderDataChange = (data) => {
        setOrderData(data);
    };

    return (
        <div className="App">
            <div className="content">
                <Sidebar onNewOrder={handleNewOrder} />
                {showOrderForm && 
                    <OrderForm 
                        key={orderFormKey} 
                        onClose={handleCloseOrderForm} 
                        initialData={orderData} 
                        onOrderDataChange={handleOrderDataChange} 
                    />
                }
            </div>
        </div>
    );
}

export default App;
