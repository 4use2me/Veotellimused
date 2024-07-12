import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setUsers([]); // Set users to empty array on error to prevent null/undefined
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        if (!user || !user.Forename || !user.Surename || !user.Email || !user.Phone) {
            return false; // Handle case where user or its properties are null/undefined
        }

        const term = searchTerm.toLowerCase();

        // Check if searchTerm is empty, return true to include all users
        if (!term.trim()) {
            return true;
        }

        return (
            user.Forename.toLowerCase().includes(term) ||
            user.Surename.toLowerCase().includes(term) 
        );
    });

    return (
        <div className="user-list">
            <h2>Kasutajate nimekiri</h2>
            <input
                type="text"
                placeholder="Otsi nime järgi"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Eesnimi</th>
                        <th>Perenimi</th>
                        <th>E-post</th>
                        <th>Telefon</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <tr key={user.id} onClick={() => onSelectUser(user.id)}>
                                <td>{user.Forename}</td>
                                <td>{user.Surname}</td>
                                <td>{user.EMail}</td>
                                <td>{user.Phone}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Sobivaid kasutajaid ei leitud.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
