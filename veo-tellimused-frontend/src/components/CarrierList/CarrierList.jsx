import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarrierList.css';

const CarrierList = ({ onSelectCarrier }) => {
    const [carriers, setCarriers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCarriers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/carriers');
                setCarriers(response.data);
            } catch (error) {
                console.error('Error fetching carriers:', error);
                setCarriers([]); // Set carriers to empty array on error to prevent null/undefined
            }
        };

        fetchCarriers();
    }, []);

    const filteredCarriers = carriers.filter(carrier => {
        if (!carrier || !carrier.Company || !carrier.RegistryCode) {
            return false; // Handle case where carrier or its properties are null/undefined
        }

        const term = searchTerm.toLowerCase();

        // Check if searchTerm is empty, return true to include all carriers
        if (!term.trim()) {
            return true;
        }

        return (
            carrier.Company.toLowerCase().includes(term) ||
            carrier.RegistryCode.toLowerCase().includes(term) 
        );
    });

    return (
        <div className="carrier-list">
            <h2>Vedajate nimekiri</h2>
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
                        <th>Äriregistrikood</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCarriers.length > 0 ? (
                        filteredCarriers.map(carrier => (
                            <tr key={carrier.id} onClick={() => onSelectCarrier(carrier.id)}>
                                <td>{carrier.Company}</td>
                                <td>{carrier.RegistryCode}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Sobivaid vedajaid ei leitud.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CarrierList;
