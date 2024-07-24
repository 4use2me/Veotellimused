import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarrierList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const CarrierList = ({ onSelectCarrier }) => {
    const [carriers, setCarriers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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

    const sortedFilteredCarriers = React.useMemo(() => {
        let sortableCarriers = [...filteredCarriers];
        if (sortConfig.key !== null) {
            sortableCarriers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableCarriers;
    }, [filteredCarriers, sortConfig]);

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
                        <th onClick={() => requestSort('Company')}>Ettevõte
                        <FontAwesomeIcon icon={getSortIcon('Company')} className="sort-icon" />
                        </th>
                        <th onClick={() => requestSort('RegistryCode')}>Äriregistrikood
                        <FontAwesomeIcon icon={getSortIcon('RegistryCode')} className="sort-icon" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedFilteredCarriers.length > 0 ? (
                        sortedFilteredCarriers.map(carrier => (
                            <tr key={carrier.id} onClick={() => onSelectCarrier(carrier.id)}>
                                <td>{carrier.Company}</td>
                                <td>{carrier.RegistryCode}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">Sobivaid vedajaid ei leitud.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CarrierList;
