import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import OrderForm from './OrderForm/OrderForm';
import OrderList from './OrderList/OrderList';
import Sidebar from './Sidebar/Sidebar';
import ClientForm from './ClientForm/ClientForm';
import ClientList from './ClientList/ClientList';
import CarrierForm from './CarrierForm/CarrierForm';
import CarrierList from './CarrierList/CarrierList';
import Data from './Data/Data';
import UserList from './UserList/UserList';
import UserForm from './UserForm/UserForm';
import Login from './Login/Login'; // Import Login komponent
import axios from 'axios';

function App() {
    const [activeUserView, setActiveUserView] = useState('');
    const [activeOrderView, setActiveOrderView] = useState(''); // '' | 'form' | 'list'
    const [activeClientView, setActiveClientView] = useState('');
    const [activeCarrierView, setActiveCarrierView] = useState('');
    const [activeSettingView, setActiveSettingView] = useState('');
    const [orderFormKey, setOrderFormKey] = useState(0);
    const [clientFormKey, setClientFormKey] = useState(0);
    const [carrierFormKey, setCarrierFormKey] = useState(0);
    const [orderData, setOrderData] = useState(null);
    const [clientData, setClientData] = useState(null);
    const [carrierData, setCarrierData] = useState(null);
    const [dataData, setDataData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/data');
                    setDataData(response.data);

                    const carriersResponse = await axios.get('http://localhost:5000/api/carriers');
                    setCarrierData(carriersResponse.data);

                    const clientsResponse = await axios.get('http://localhost:5000/api/kliendid');
                    setClientData(clientsResponse.data);

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [isLoggedIn]);

    const handleUser = () => {
        setActiveUserView('form');
        setActiveOrderView('');
        setActiveClientView('');
        setActiveCarrierView('');
        setActiveSettingView('');
    };

    const handleNewOrder = () => {
        setOrderData(null);
        setOrderFormKey(prevKey => prevKey + 1);
        setActiveOrderView('form');
        setActiveClientView('');
        setActiveCarrierView('');
        setActiveSettingView('');
        setActiveUserView('');
    };

    const handleNewClient = () => {
        setClientData(null);
        setClientFormKey(prevKey => prevKey + 1);
        setActiveClientView('form');
        setActiveOrderView('');
        setActiveCarrierView('');
        setActiveSettingView('');
        setActiveUserView('');
    };

    const handleNewCarrier = () => {
        setCarrierData(null);
        setCarrierFormKey(prevKey => prevKey + 1);
        setActiveCarrierView('form');
        setActiveOrderView('');
        setActiveClientView('');
        setActiveSettingView('');
        setActiveUserView('');
    };

    const handleData = () => {
        setActiveSettingView('form');
        setActiveOrderView('');
        setActiveClientView('');
        setActiveCarrierView('');
        setActiveUserView('');
    };

    const handleSelectOrderList = () => {
        setActiveOrderView('list');
        setActiveClientView('');
        setActiveCarrierView('');
        setActiveSettingView('');
        setActiveUserView('');
    };

    const handleSelectClientList = () => {
        setActiveClientView('list');
        setActiveOrderView('');
        setActiveCarrierView('');
        setActiveSettingView('');
        setActiveUserView('');
    };

    const handleSelectCarrierList = () => {
        setActiveCarrierView('list');
        setActiveOrderView('');
        setActiveClientView('');
        setActiveSettingView('');
        setActiveUserView('');
    };

    const handleSelectUserList = () => {
        setActiveSettingView('list');
        setActiveOrderView('');
        setActiveClientView('');
        setActiveCarrierView('');
        setActiveUserView('');
    };

    const handleSelectOrder = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/tellimused/${orderId}`);
            setOrderData(response.data);
            setOrderFormKey(prevKey => prevKey + 1);
            setActiveOrderView('form');
            setActiveClientView('');
            setActiveCarrierView('');
            setActiveSettingView('');
            setActiveUserView('');
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
            setActiveSettingView('');
            setActiveUserView('');
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
            setActiveSettingView('');
            setActiveUserView('');
        } catch (error) {
            console.error('Error fetching carrier:', error);
        }
    };

    const handleSelectUser = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
            setUserData(response.data);
            setActiveUserView('form');
            setActiveCarrierView('');
            setActiveOrderView('');
            setActiveClientView('');
            setActiveSettingView('');
        } catch (error) {
            console.error('Error fetching user:', error);
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

    const handleUserDataChange = (data) => {
        setUserData([data]);
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

    const handleDataDataChange = (data) => {
        setDataData([data]);
    };

    const handleOrderAdded = (newOrder) => {
        const orderWithDefaultStatus = {
            ...newOrder,
            Staatus: newOrder.Staatus || 'Töös' // Kui Staatus on puudu, määrame vaikimisi 'Töös'
        };
        setOrderData(orderWithDefaultStatus);
        setActiveOrderView('form');
    };

    const handleClientAdded = (newClient) => {
        setClientData(newClient);
        setActiveClientView('form');
    };

    const handleCarrierAdded = (newCarrier) => {
        setCarrierData(newCarrier);
        setActiveCarrierView('form');
    };

    console.log('Rendering App with activeSettingView:', activeSettingView);

    return (
        <Router>
            <div className="App">
                {isLoggedIn ? (
                    <div>
                        <Sidebar
                            onUserClick={handleUser}
                            onNewOrderClick={handleNewOrder}
                            onNewClientClick={handleNewClient}
                            onNewCarrierClick={handleNewCarrier}
                            onSelectOrderListClick={handleSelectOrderList}
                            onSelectClientListClick={handleSelectClientList}
                            onSelectCarrierListClick={handleSelectCarrierList}
                            onSelectUserListClick={handleSelectUserList}
                            onDataClick={handleData}
                        />
                        <Routes>
                            <Route
                                path="/orders"
                                element={<OrderForm key={orderFormKey} onClose={handleCloseOrderForm} data={orderData} />}
                            />
                            <Route
                                path="/clients"
                                element={<ClientForm key={clientFormKey} onClose={handleCloseClientForm} data={clientData} />}
                            />
                            <Route
                                path="/carriers"
                                element={<CarrierForm key={carrierFormKey} onClose={handleCloseCarrierForm} data={carrierData} />}
                            />
                            <Route path="/data" element={<Data data={dataData} />} />
                            <Route path="/users" element={<UserList onSelectUser={handleSelectUser} />} />
                            <Route
                                path="/user-form"
                                element={<UserForm data={userData} onClose={handleCloseClientForm} onChange={handleUserDataChange} />}
                            />
                            <Route path="*" element={<Navigate to="/orders" />} />
                        </Routes>
                    </div>
                ) : (
                    <Login setIsLoggedIn={setIsLoggedIn} />
                )}
            </div>
        </Router>
    );
}

export default App;
