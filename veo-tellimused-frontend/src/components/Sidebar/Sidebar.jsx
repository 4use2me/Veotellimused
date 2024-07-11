import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onNewOrder, onSelectOrderList, onNewClient, onSelectClientList, onNewCarrier, onSelectCarrierList, onSettings, onSelectQueries }) => {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <aside className="sidebar">
            <h2>Navigatsioon</h2>
            <button
                className={`toggle-menu-button ${openMenu === 'company' ? 'open' : ''}`}
                onClick={() => toggleMenu('company')}
            >
                Ettevõte {openMenu === 'company'}
            </button>
            {openMenu === 'company' && (
                <ul className="menu-items">
                    <li onClick={onSettings}>Seaded</li>
                    <li onClick={onSelectQueries}>Päringud</li>
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
        </aside>
    );
}

export default Sidebar;
