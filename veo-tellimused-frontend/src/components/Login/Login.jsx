import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username: username.trim(),
                password: password.trim()
            });

            // Logi kogu vastus ja selle andmed detailselt
            console.log('Login response:', response);
            console.log('Login response data:', response.data);

            if (response.status === 200 && response.data.userId) {
                console.log('Login successful, userId:', response.data.userId);
                onLoginSuccess(response.data); // Tagasta kogu kasutaja andmed
                console.log('Login successful, onLoginSuccess called with user:');
            } else {
                console.log('Login failed, message:', response.data.message);
                onLoginSuccess(false); // Näitab, et login ebaõnnestus
                console.log('Login failed, onLoginSuccess called with null');
                setError(response.data.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred during login.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin}>
                <label>
                    Kasutajanimi:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Parool:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Logi sisse</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default Login;
