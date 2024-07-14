import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onProfil, onLogOut, onNewOrder, onSelectOrderList, onNewClient, onSelectClientList, onNewCarrier, onSelectCarrierList, onData, onUsers }) => {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <aside className="sidebar">
            <button
                className={`toggle-menu-button ${openMenu === 'user' ? 'open' : ''}`}
                onClick={() => toggleMenu('user')}
            >
                Tere kasutaja {openMenu === 'user'}
            </button>
            {openMenu === 'user' && (
                <ul className="menu-items">
                    <li onClick={onProfil}>Profiil</li>
                    <li onClick={onLogOut}>Logi välja</li>
                </ul>
            )}
            <br /><br /><br /><br />
            <h2>Navigatsioon</h2>
            <button
                className={`toggle-menu-button ${openMenu === 'settings' ? 'open' : ''}`}
                onClick={() => toggleMenu('settings')}
            >
                Seaded {openMenu === 'settings'}
            </button>
            {openMenu === 'settings' && (
                <ul className="menu-items">
                    <li onClick={onData}>Andmed</li>
                    <li onClick={onUsers}>Kasutajad</li>
                </ul>
            )}
            <button
                className={`toggle-menu-button ${openMenu === 'clients' ? 'open' : ''}`}
                onClick={() => toggleMenu('clients')}
            >
                Kliendid {openMenu === 'clients'}
            </button>
            {openMenu === 'clients' && (
                <ul className="menu-items">
                    <li onClick={onNewClient}>Uus klient</li>
                    <li onClick={onSelectClientList}>Klientide nimekiri</li>
                </ul>
            )}
            <button
                className={`toggle-menu-button ${openMenu === 'carriers' ? 'open' : ''}`}
                onClick={() => toggleMenu('carriers')}
            >
                Vedajad {openMenu === 'carriers'}
            </button>
            {openMenu === 'carriers' && (
                <ul className="menu-items">
                    <li onClick={onNewCarrier}>Uus vedaja</li>
                    <li onClick={onSelectCarrierList}>Vedajate nimekiri</li>
                </ul>
            )}
            <button
                className={`toggle-menu-button ${openMenu === 'orders' ? 'open' : ''}`}
                onClick={() => toggleMenu('orders')}
            >
                Tellimused {openMenu === 'orders'}
            </button>
            {openMenu === 'orders' && (
                <ul className="menu-items">
                    <li onClick={onNewOrder}>Uus tellimus</li>
                    <li onClick={onSelectOrderList}>Tellimuste nimekiri</li>
                </ul>
            )}
            <button
                className={`sidebar-button`}
                onClick={() => toggleMenu('queries')}
            >
                Päringud {openMenu === 'queries'}
            </button>
        </aside>
    );
}

export default Sidebar;
