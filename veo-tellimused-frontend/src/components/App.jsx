import React, { useState } from 'react';
import './App.css';
import OrderForm from './OrderForm/OrderForm';
import OrderList from './OrderList/OrderList';
import Sidebar from './Sidebar/Sidebar';
import ClientForm from './ClientForm/ClientForm';
import ClientList from './ClientList/ClientList';
import CarrierForm from './CarrierForm/CarrierForm';
import CarrierList from './CarrierList/CarrierList';
import axios from 'axios';

function App() {
    const [activeOrderView, setActiveOrderView] = useState(''); // '' | 'form' | 'list'
    const [activeClientView, setActiveClientView] = useState('');
    const [activeCarrierView, setActiveCarrierView] = useState('');
    const [orderFormKey, setOrderFormKey] = useState(0);
    const [clientFormKey, setClientFormKey] = useState(0);
    const [carrierFormKey, setCarrierFormKey] = useState(0);
    const [orderData, setOrderData] = useState(null);
    const [clientData, setClientData] = useState(null);
    const [carrierData, setCarrierData] = useState(null);

    const handleNewOrder = () => {
        setOrderData(null);
        setOrderFormKey(prevKey => prevKey + 1);
        setActiveOrderView('form');
        setActiveClientView(''); // Closes the active order view
        setActiveCarrierView('');
    };

    const handleNewClient = () => {
        setClientData(null);
        setClientFormKey(prevKey => prevKey + 1);
        setActiveClientView('form');
        setActiveOrderView(''); 
        setActiveCarrierView('');
    };

    const handleNewCarrier = () => {
        setCarrierData(null);
        setCarrierFormKey(prevKey => prevKey + 1);
        setActiveCarrierView('form');
        setActiveOrderView(''); 
        setActiveClientView('');
    };

    const handleSelectOrderList = () => {
        setActiveOrderView('list');
        setActiveClientView('');
        setActiveCarrierView('');
    };

    const handleSelectClientList = () => {
        setActiveClientView('list');
        setActiveOrderView('');
        setActiveCarrierView('');
    };

    const handleSelectCarrierList = () => {
        setActiveCarrierView('list');
        setActiveOrderView('');
        setActiveClientView('');
    };

    const handleSelectOrder = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/tellimused/${orderId}`);
            setOrderData(response.data);
            setOrderFormKey(prevKey => prevKey + 1);
            setActiveOrderView('form');
            setActiveClientView('');
            setActiveCarrierView('');
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
            setActiveCarrierView('');
        } catch (error) {
            console.error('Error fetching client:', error);
        }
    };

    const handleSelectCarrier = async (carrierId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/carriers/${carrierId}`);
            setCarrierData(response.data);
            setCarrierFormKey(prevKey => prevKey + 1);
            setActiveCarrierView('form');
            setActiveOrderView('');
            setActiveClientView('');
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

    const handleCloseCarrierForm = () => {
        setActiveCarrierView('');
    };

    const handleOrderDataChange = (data) => {
        setOrderData(data);
    };

    const handleClientDataChange = (data) => {
        setClientData(data);
    };

    const handleCarrierDataChange = (data) => {
        setCarrierData(data);
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

    const handleCarrierAdded = (newCarrier) => {
        setCarrierData(newCarrier);
        setCarrierFormKey(prevKey => prevKey + 1);
        setActiveCarrierView('form');
    };

    return (
        <div className="App">
            <div className="sidebar">
                <Sidebar onNewOrder={handleNewOrder} onSelectOrderList={handleSelectOrderList} 
                    onNewClient={handleNewClient} onSelectClientList={handleSelectClientList}
                    onNewCarrier={handleNewCarrier} onSelectCarrierList={handleSelectCarrierList} />
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

                {activeCarrierView === 'form' && (
                    <CarrierForm
                    key={carrierFormKey}
                        onClose={handleCloseCarrierForm}
                        initialData={carrierData}
                        onCarrierDataChange={handleCarrierDataChange}
                        onCarrierAdded={handleCarrierAdded}
                    />
                )}
                {activeCarrierView === 'list' && <CarrierList onSelectCarrier={handleSelectCarrier} />}
            </div>
        </div>
    );
}

export default App;
