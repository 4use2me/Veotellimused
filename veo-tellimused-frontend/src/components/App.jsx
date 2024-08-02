import React, { useState, useEffect } from 'react';
import './App.css';
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
import Login from './Login/Login';
import axios from 'axios';

function App() {
    const [activeUserView, setActiveUserView] = useState('');
    const [activeOrderView, setActiveOrderView] = useState('');
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
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        console.log('User logged in, isLoggedIn set to true');
    };

    const handleUser = () => {
        console.log('User clicked');
        setActiveUserView('form');
        setActiveOrderView('');
        setActiveClientView('');
        setActiveCarrierView('');
        setActiveSettingView('');
        console.log('activeUserView set to form');
    };

    const handleLogOut = () => {
        console.log('Logging out');
        setIsLoggedIn(false);
        setActiveUserView('');
        setActiveOrderView('');
        setActiveClientView('');
        setActiveCarrierView('');
        setActiveSettingView('');
    };

    const handleNewOrder = () => {
        console.log('New Order clicked');
        setOrderData(null);
        setOrderFormKey(prevKey => prevKey + 1);
        setActiveOrderView('form');
        setActiveClientView('');
        setActiveCarrierView('');
        setActiveSettingView('');
        setActiveUserView('');
        console.log('activeOrderView set to form');
    };

    const handleNewClient = () => {
        console.log('New Client clicked');
        setClientData(null);
        setClientFormKey(prevKey => prevKey + 1);
        setActiveClientView('form');
        setActiveOrderView('');
        setActiveCarrierView('');
        setActiveSettingView('');
        setActiveUserView('');
        console.log('activeClientView set to form');
    };

    const handleNewCarrier = () => {
        console.log('New Carrier clicked');
        setCarrierData(null);
        setCarrierFormKey(prevKey => prevKey + 1);
        setActiveCarrierView('form');
        setActiveOrderView('');
        setActiveClientView('');
        setActiveSettingView('');
        setActiveUserView('');
        console.log('activeCarrierView set to form');
    };

    const handleData = () => {
        console.log('Data clicked');
        setActiveSettingView('form');
        setActiveOrderView('');
        setActiveClientView('');
        setActiveCarrierView('');
        setActiveUserView('');
        console.log('activeSettingView set to form');
    };

    const handleSelectOrderList = () => {
        console.log('Select Order List clicked');
        setActiveOrderView('list');
        setActiveClientView('');
        setActiveCarrierView('');
        setActiveSettingView('');
        setActiveUserView('');
        console.log('activeOrderView set to list');
    };

    const handleSelectClientList = () => {
        console.log('Select Client List clicked');
        setActiveClientView('list');
        setActiveOrderView('');
        setActiveCarrierView('');
        setActiveSettingView('');
        setActiveUserView('');
        console.log('activeClientView set to list');
    };

    const handleSelectCarrierList = () => {
        console.log('Select Carrier List clicked');
        setActiveCarrierView('list');
        setActiveOrderView('');
        setActiveClientView('');
        setActiveSettingView('');
        setActiveUserView('');
        console.log('activeCarrierView set to list');
    };

    const handleSelectUserList = () => {
        console.log('Select User List clicked');
        setActiveSettingView('list');
        setActiveOrderView('');
        setActiveClientView('');
        setActiveCarrierView('');
        setActiveUserView('');
        console.log('activeSettingView set to list');
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
            console.log('Order selected and activeOrderView set to form');
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
            console.log('Client selected and activeClientView set to form');
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
            console.log('Carrier selected and activeCarrierView set to form');
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
            console.log('User selected and activeUserView set to form');
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleCloseOrderForm = () => {
        setActiveOrderView('');
        console.log('Order form closed and activeOrderView set to empty');
    };

    const handleCloseClientForm = () => {
        setActiveClientView('');
        console.log('Client form closed and activeClientView set to empty');
    };

    const handleCloseCarrierForm = () => {
        setActiveCarrierView('');
        console.log('Carrier form closed and activeCarrierView set to empty');
    };

    const handleUserDataChange = (data) => {
        setUserData([data]);
        console.log('User data changed');
    };

    const handleOrderDataChange = (data) => {
        setOrderData(data);
        console.log('Order data changed');
    };

    const handleClientDataChange = (data) => {
        setClientData(data);
        console.log('Client data changed');
    };

    const handleCarrierDataChange = (data) => {
        setCarrierData(data);
        console.log('Carrier data changed');
    };

    const handleDataDataChange = (data) => {
        setDataData(data);
        console.log('Data data changed');
    };

    const handleOrderAdded = () => {
        setActiveOrderView('');
        console.log('Order added and activeOrderView set to empty');
    };

    const handleClientAdded = () => {
        setActiveClientView('');
        console.log('Client added and activeClientView set to empty');
    };

    const handleCarrierAdded = () => {
        setActiveCarrierView('');
        console.log('Carrier added and activeCarrierView set to empty');
    };

    console.log('Rendering App with activeSettingView:', activeSettingView);

    return (
        <div className="app">
            {console.log('Rendering App with isLoggedIn:', isLoggedIn, 'activeSettingView:', activeSettingView)}
            {isLoggedIn ? (
                <div className="main-content">
                    <Sidebar
                        onUser={handleUser}
                        onLogOut={handleLogOut}
                        onNewOrder={handleNewOrder}
                        onSelectOrderList={handleSelectOrderList}
                        onNewClient={handleNewClient}
                        onSelectClientList={handleSelectClientList}
                        onNewCarrier={handleNewCarrier}
                        onSelectCarrierList={handleSelectCarrierList}
                        onData={handleData}
                        onSelectUserList={handleSelectUserList}
                    />
                    <div className="content">
                        {activeUserView === 'form' && (
                            <UserForm
                                key={orderFormKey}
                                onClose={handleCloseOrderForm}
                                initialData={userData}
                                onUserDataChange={handleUserDataChange}
                            />
                        )}
                        {activeOrderView === 'form' && (
                            <OrderForm
                                key={orderFormKey}
                                onClose={handleCloseOrderForm}
                                initialData={orderData}
                                onOrderDataChange={handleOrderDataChange}
                                onOrderAdded={handleOrderAdded}
                            />
                        )}
                        {activeOrderView === 'list' && (
                            <OrderList onSelectOrder={handleSelectOrder} />
                        )}
                        {activeClientView === 'form' && (
                            <ClientForm
                                key={clientFormKey}
                                onClose={handleCloseClientForm}
                                initialData={clientData}
                                onClientDataChange={handleClientDataChange}
                                onClientAdded={handleClientAdded}
                            />
                        )}
                        {activeClientView === 'list' && (
                            <ClientList onSelectClient={handleSelectClient} />
                        )}
                        {activeCarrierView === 'form' && (
                            <CarrierForm
                                key={carrierFormKey}
                                onClose={handleCloseCarrierForm}
                                initialData={carrierData}
                                onCarrierDataChange={handleCarrierDataChange}
                                onCarrierAdded={handleCarrierAdded}
                            />
                        )}
                        {activeCarrierView === 'list' && (
                            <CarrierList onSelectCarrier={handleSelectCarrier} />
                        )}
                        {activeSettingView === 'form' && (
                            <Data
                                initialData={dataData[0]}
                                onDataDataChange={handleDataDataChange}
                            />
                        )}
                        {activeSettingView === 'list' && (
                            <UserList onSelectUser={handleSelectUser} />
                        )}
                    </div>
                </div>
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;
