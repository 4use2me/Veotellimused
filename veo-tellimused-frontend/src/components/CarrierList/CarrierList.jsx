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
                if (response.data && Array.isArray(response.data)) {
                    console.log('Fetched Carriers:', response.data); // Debugging
                    setCarriers(response.data);
                } else {
                    console.error('Unexpected response data:', response.data);
                    setCarriers([]);
                }
            } catch (error) {
                console.error('Error fetching carriers:', error);
                setCarriers([]); // Set carriers to empty array on error to prevent null/undefined
            }
        };

        fetchCarriers();
    }, []);

    // Filtreerime vedajad otsingusõna põhjal
    const filteredCarriers = carriers.filter(carrier => {
        console.log('Carrier:', carrier); // Log every carrier to debug

        if (!carrier || !carrier.Company || !carrier.VatNumber) {
            return false; // Handle case where carrier or its properties are null/undefined
        }

        const term = searchTerm.toLowerCase();

        // Check if searchTerm is empty, return true to include all carriers
        if (!term.trim()) {
            return true;
        }

        return (
            carrier.Company.toLowerCase().includes(term) ||
            carrier.VatNumber.toLowerCase().includes(term) 
        );
    });

    // Sorteerime filtreeritud vedajad
    const sortedFilteredCarriers = React.useMemo(() => {
        let sortableCarriers = [...filteredCarriers];
        if (sortConfig.key !== null) {
            sortableCarriers.sort((a, b) => {
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
        return sortableCarriers;
    }, [filteredCarriers, sortConfig]);

    // Sorteerimiskonfiguratsiooni uuendamine
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Sorteerimisikooni määramine
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
                placeholder="Otsi ettevõtte või käibemaksukohustuslase numbri järgi"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('Company')}>
                            Ettevõte
                            <FontAwesomeIcon icon={getSortIcon('Company')} className="sort-icon" />
                        </th>
                        <th>E-post</th>
                        <th>Telefon</th>
                        <th onClick={() => requestSort('VatNumber')}>
                            KMKR number
                            <FontAwesomeIcon icon={getSortIcon('VatNumber')} className="sort-icon" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedFilteredCarriers.length > 0 ? (
                        sortedFilteredCarriers.map(carrier => (
                            <tr key={carrier.id}>
                                <td onClick={() => onSelectCarrier(carrier.id)} style={{ cursor: 'pointer' }}>
                                    {carrier.Company}
                                </td>
                                <td>
                                    <a href={`mailto:${carrier.EMail}`} title={carrier.EMail}>
                                        {carrier.EMail}
                                    </a>
                                </td>
                                <td>{carrier.Phone}</td>
                                <td>{carrier.VatNumber}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Sobivaid vedajaid ei leitud.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CarrierList;
