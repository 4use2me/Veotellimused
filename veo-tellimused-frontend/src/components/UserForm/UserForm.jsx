import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserForm.css';

const UserForm = ({ onUserDataChange }) => {
    const [userId, setUserId] = useState(null);
    const [forename, setForename] = useState('');
    const [surname, setSurname] = useState('');
    const [eMail, setEMail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/me');
                const userData = response.data;
                setUserId(userData.Id);
                setForename(userData.Forename);
                setSurname(userData.Surname);
                setEMail(userData.EMail);
                setPhone(userData.Phone);
                setUsername(userData.Username);
                onUserDataChange(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [onUserDataChange]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordAgain) {
            alert('Passwords do not match');
            return;
        }

        const userData = {
            Forename: forename,
            Surname: surname,
            EMail: eMail,
            Phone: phone,
            Username: username,
            Password: password ? password : undefined // Kui parooli pole uuendatud, siis ärge seda saatke
        };

        try {
            if (userId) {
                await axios.put(`http://localhost:5000/api/users/${userId}`, userData);
                alert('Kasutaja edukalt uuendatud');
                onUserDataChange({ ...userData, id: userId });
            } else {
                alert('Kasutajat ei saa lisada, ainult uuendada');
            }
        } catch (error) {
            console.error('Error updating the user:', error);
            alert('Kasutaja uuendamine ebaõnnestus');
        }
    };

    return (
        <div className="user-form">
            <h2>Kasutaja profiili muutmine</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Eesnimi</label>
                    <input type="text" value={forename} onChange={(e) => setForename(e.target.value)} required />
                </div>
                <div>
                    <label>Perenimi</label>
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                </div>
                <div>
                    <label>E-post</label>
                    <input type="text" value={eMail} onChange={(e) => setEMail(e.target.value)} required />
                </div>
                <div>
                    <label>Telefon</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div>
                    <label>Kasutajanimi</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <button type="submit">Salvesta</button>
            </form>
            <h2>Kasutaja parooli muutmine</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Parool</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Parool uuesti</label>
                    <input type="password" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
                </div>
                <button type="submit">Salvesta</button>
            </form>
        </div>
    );
};

export default UserForm;
