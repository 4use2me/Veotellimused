import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const ClientList = ({ onSelectClient }) => {
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });


    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/kliendid');
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                setClients([]); // Set clients to empty array on error to prevent null/undefined
            }
        };

        fetchClients();
    }, []);

    const filteredClients = clients.filter(client => {
        if (!client || !client.Ettevõte || !client.Äriregistrikood) {
            return false; // Handle case where client or its properties are null/undefined
        }

        const term = searchTerm.toLowerCase();

        // Check if searchTerm is empty, return true to include all clients
        if (!term.trim()) {
            return true;
        }

        return (
            client.Ettevõte.toLowerCase().includes(term) ||
            client.Äriregistrikood.toLowerCase().includes(term) 
        );
    });

    const sortedFilteredClients = React.useMemo(() => {
        let sortableClients = [...filteredClients];
        if (sortConfig.key !== null) {
            sortableClients.sort((a, b) => {
                const aValue = typeof a[sortConfig.key] === 'string' ? a[sortConfig.key].toLowerCase() : a[sortConfig.key];
                const bValue = typeof b[sortConfig.key] === 'string' ? b[sortConfig.key].toLowerCase() : b[sortConfig.key];
                
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableClients;
    }, [filteredClients, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
        }
        return faSort;
    };

    return (
        <div className="client-list">
            <h2>Klientide nimekiri</h2>
            <input
                type="text"
                placeholder="Otsi ettevõtte või äriregistrikoodi järgi"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('Ettevõte')}>Ettevõte
                        <FontAwesomeIcon icon={getSortIcon('Ettevõte')} className="sort-icon" />
                        </th>
                        <th>E-post</th>
                        <th>Telefon</th>
                        <th onClick={() => requestSort('Äriregistrikood')}>Äriregistrikood
                        <FontAwesomeIcon icon={getSortIcon('Äriregistrikood')} className="sort-icon" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedFilteredClients.length > 0 ? (
                        sortedFilteredClients.map(client => (
                            <tr key={client.id}>
                                <td onClick={() => onSelectClient(client.id)} style={{ cursor: 'pointer' }}>
                                    {client.Ettevõte}
                                </td>
                                <td>
                                    <a href={`mailto:${client.EPost}`} title={client.EPost}>
                                        {client.EPost}
                                    </a>
                                </td>
                                <td>{client.Telefon}</td>
                                <td>{client.Äriregistrikood}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Sobivaid kliente ei leitud.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
