import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientList.css';

const ClientList = ({ onSelectClient }) => {
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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
                        <th>Ettevõte</th>
                        <th>E-post</th>
                        <th>Telefon</th>
                        <th>Äriregistrikood</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.length > 0 ? (
                        filteredClients.map(client => (
                            <tr key={client.id} onClick={() => onSelectClient(client.id)}>
                                <td>{client.Ettevõte}</td>
                                <td>{client.EPost}</td>
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
