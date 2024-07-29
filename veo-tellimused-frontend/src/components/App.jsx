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
import axios from 'axios';
import ExcelUpload from './ClientForm/ExcelUpload'; // Impordi uus komponent

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/data');
                setDataData(response.data);

                const carriersResponse = await axios.get('http://localhost:5000/api/carriers');
                setCarrierData(carriersResponse.data);

                const clientsResponse = await axios.get('http://localhost:5000/api/kliendid');
                setCarrierData(clientsResponse.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

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
        setActiveClientView(''); // Closes the active order view
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
        //setOrderFormKey(prevKey => prevKey + 1);
        setActiveOrderView('form');
    };

    const handleClientAdded = (newClient) => {
        setClientData(newClient);
        //setClientFormKey(prevKey => prevKey + 1);
        setActiveClientView('form');
    };

    const handleCarrierAdded = (newCarrier) => {
        setCarrierData(newCarrier);
        // setCarrierFormKey(prevKey => prevKey + 1);
        setActiveCarrierView('form');
    };

    const handleClientsImported = (importedClients) => {
        setClientData(prevClients => [...prevClients, ...importedClients]);
    };

    console.log('Rendering App with activeSettingView:', activeSettingView);

    return (
        <div className="App">
            <div className="sidebar">
                <Sidebar onUser={handleUser} onNewOrder={handleNewOrder} onSelectOrderList={handleSelectOrderList} 
                    onNewClient={handleNewClient} onSelectClientList={handleSelectClientList}
                    onNewCarrier={handleNewCarrier} onSelectCarrierList={handleSelectCarrierList}
                    onData={handleData} onSelectUserList={handleSelectUserList} />
            </div>
            <div className="content">
            {activeUserView === 'form' && (
                    <UserForm
                        initialData={userData && userData.length > 0 ? userData[0] : null}
                        onUserDataChange={handleUserDataChange}
                    />
                )}

                {activeOrderView === 'form' && (
                    <OrderForm
                        key={orderFormKey}
                        onClose={handleCloseOrderForm}
                        initialData={orderData}
                        dataData={dataData}
                        carriers={carrierData}
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
                {activeClientView === 'list' && (
                    <>
                        <ClientList onSelectClient={handleSelectClient} />
                        {/*<ExcelUpload onClientsImported={handleClientsImported} /> {/* Lisa ExcelUpload */}
                    </>
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
                {activeCarrierView === 'list' && <CarrierList onSelectCarrier={handleSelectCarrier} />}

                {activeSettingView === 'form' && (
                    <Data
                        initialData={dataData && dataData.length > 0 ? dataData[0] : null}
                        onDataDataChange={handleDataDataChange}
                    />
                )}
                {activeSettingView === 'list' && <UserList onSelectUser={handleSelectUser} />}
            </div>
        </div>
    );
}

export default App;
