import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onNewOrder }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <aside className="sidebar">
            <h2>Navigatsioon</h2>
            <button className="toggle-menu-button" onClick={toggleMenu}>
                {menuOpen ? 'Tellimused ▲' : 'Tellimused ▼'}
            </button>
            {menuOpen && (
                <ul className="menu-items">
                    <li onClick={onNewOrder}>Uus tellimus</li>
                    <li>Tellimuste nimekiri</li>
                    {/* Lisa siia teised alammenüü elemendid */}
                </ul>
            )}
        </aside>
    );
}

export default Sidebar;
