import React, { useState } from 'react';
import './App.css';
import OrderForm from './OrderForm/OrderForm';
import Sidebar from './Sidebar/Sidebar';

function App() {
    const [showOrderForm, setShowOrderForm] = useState(false);

    const handleNewOrder = () => {
        setShowOrderForm(true);
    };

    const handleCloseOrderForm = () => {
        setShowOrderForm(false);
    };

    return (
        <div className="App">
            <div className="content">
                <Sidebar onNewOrder={handleNewOrder} />
                {showOrderForm && <OrderForm onClose={handleCloseOrderForm} />}
            </div>
        </div>
    );
}

export default App;
