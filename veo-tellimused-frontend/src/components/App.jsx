import React, { useState } from 'react';
import './App.css';
import OrderForm from './OrderForm/OrderForm';
import OrderList from './OrderList/OrderList';
import Sidebar from './Sidebar/Sidebar';
import ClientForm from './ClientForm/ClientForm';
import ClientList from './ClientList/ClientList';
import axios from 'axios';

function App() {
    const [activeOrderView, setActiveOrderView] = useState('');
    const [activeClientView, setActiveClientView] = useState(''); // '' | 'form' | 'list'
    const [orderFormKey, setOrderFormKey] = useState(0);
    const [clientFormKey, setClientFormKey] = useState(0);
    const [orderData, setOrderData] = useState(null);
    const [clientData, setClientData] = useState(null);

    const handleNewOrder = () => {
        setOrderData(null);
        setOrderFormKey(prevKey => prevKey + 1);
        setActiveOrderView('form');
        setActiveClientView(''); // Sulgeb aktiivse kliendi vaate
    };

    const handleNewClient = () => {
        setClientData(null);
        setClientFormKey(prevKey => prevKey + 1);
        setActiveClientView('form');
        setActiveOrderView(''); // Sulgeb aktiivse tellimuse vaate
    };

    const handleSelectOrderList = () => {
        setActiveOrderView('list');
        setActiveClientView('');
    };

    const handleSelectClientList = () => {
        setActiveClientView('list');
        setActiveOrderView('');
    };

    const handleSelectOrder = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/tellimused/${orderId}`);
            setOrderData(response.data);
            setOrderFormKey(prevKey => prevKey + 1);
            setActiveOrderView('form');
            setActiveClientView('');
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    };

    const handleSelectClient = async (clientId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/kliendid/${clientId}`);
            setClientData(response.data);
            setClientFormKey(prevKey => prevKey + 1);
            setActiveClientView('form');
            setActiveOrderView('');
        } catch (error) {
            console.error('Error fetching client:', error);
        }
    };

    const handleCloseOrderForm = () => {
        setActiveOrderView('');
    };

    const handleCloseClientForm = () => {
        setActiveClientView('');
    };

    const handleOrderDataChange = (data) => {
        setOrderData(data);
    };

    const handleClientDataChange = (data) => {
        setClientData(data);
    };

    const handleOrderAdded = (newOrder) => {
        setOrderData(newOrder);
        setOrderFormKey(prevKey => prevKey + 1);
        setActiveOrderView('form');
    };

    const handleClientAdded = (newClient) => {
        setClientData(newClient);
        setClientFormKey(prevKey => prevKey + 1);
        setActiveClientView('form');
    };

    return (
        <div className="App">
            <div className="sidebar">
                <Sidebar onNewOrder={handleNewOrder} onSelectOrderList={handleSelectOrderList} onNewClient={handleNewClient} onSelectClientList={handleSelectClientList} />
            </div>
            <div className="content">
                {activeOrderView === 'form' && (
                    <OrderForm
                        key={orderFormKey}
                        onClose={handleCloseOrderForm}
                        initialData={orderData}
                        onOrderDataChange={handleOrderDataChange}
                        onOrderAdded={handleOrderAdded}
                    />
                )}
                {activeOrderView === 'list' && <OrderList onSelectOrder={handleSelectOrder} />}

                {activeClientView === 'form' && (
                    <ClientForm
                    key={clientFormKey}
                        onClose={handleCloseClientForm}
                        initialData={clientData}
                        onClientDataChange={handleClientDataChange}
                        onClientAdded={handleClientAdded}
                    />
                )}
                {activeClientView === 'list' && <ClientList onSelectClient={handleSelectClient} />}
            </div>
        </div>
    );
}

export default App;
