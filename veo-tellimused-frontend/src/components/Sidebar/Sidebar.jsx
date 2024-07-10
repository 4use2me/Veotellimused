import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onNewOrder, onSelectOrderList, onNewClient, onSelectClientList, onNewVendor, onSelectVendorList }) => {
    const [clientsMenuOpen, setClientsMenuOpen] = useState(false);
    const [vendorsMenuOpen, setVendorsMenuOpen] = useState(false);
    const [ordersMenuOpen, setOrdersMenuOpen] = useState(false);

    const toggleClientsMenu = () => {
        setClientsMenuOpen(!clientsMenuOpen);
        setVendorsMenuOpen(false);
        setOrdersMenuOpen(false);
    };

    const toggleVendorsMenu = () => {
        setVendorsMenuOpen(!vendorsMenuOpen);
        setClientsMenuOpen(false);
        setOrdersMenuOpen(false);
    };

    const toggleOrdersMenu = () => {
        setOrdersMenuOpen(!ordersMenuOpen);
        setClientsMenuOpen(false);
        setVendorsMenuOpen(false);
    };

    return (
        <aside className="sidebar">
            <h2>Navigatsioon</h2>
            <button className="toggle-menu-button" onClick={toggleClientsMenu}>
                {clientsMenuOpen ? 'Kliendid' : 'Kliendid'}
            </button>
            {clientsMenuOpen && (
                <ul className="menu-items">
                    <li onClick={onNewClient}>Uus klient</li>
                    <li onClick={onSelectClientList}>Klientide nimekiri</li>
                    {/* Lisa siia teised alammenüü elemendid */}
                </ul>
            )}
            <button className="toggle-menu-button" onClick={toggleVendorsMenu}>
                {vendorsMenuOpen ? 'Vedajad' : 'Vedajad'}
            </button>
            {vendorsMenuOpen && (
                <ul className="menu-items">
                    <li onClick={onNewVendor}>Uus vedaja</li>
                    <li onClick={onSelectVendorList}>Vedajate nimekiri</li>
                    {/* Lisa siia teised alammenüü elemendid */}
                </ul>
            )}
            <button className="toggle-menu-button" onClick={toggleOrdersMenu}>
                {ordersMenuOpen ? 'Tellimused' : 'Tellimused'}
            </button>
            {ordersMenuOpen && (
                <ul className="menu-items">
                    <li onClick={onNewOrder}>Uus tellimus</li>
                    <li onClick={onSelectOrderList}>Tellimuste nimekiri</li>
                    {/* Lisa siia teised alammenüü elemendid */}
                </ul>
            )}
        </aside>
    );
}

export default Sidebar;
