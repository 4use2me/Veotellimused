// Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            if (response.status === 200) {
                setIsLoggedIn(true); // Veendu, et setIsLoggedIn kutsutakse ainult juhul, kui vastus on edukas
            } else {
                setError('Sisselogimine ebaõnnestus');
            }
        } catch (error) {
            setError('Sisselogimine ebaõnnestus');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Logi sisse</h2>
                {error && <p>{error}</p>}
                <input
                    type="text"
                    placeholder="Kasutajanimi"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Parool"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Logi sisse</button>
            </form>
        </div>
    );
}

export default Login;
