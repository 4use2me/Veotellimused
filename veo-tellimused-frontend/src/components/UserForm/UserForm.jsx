import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserForm.css';

const UserForm = ({ initialData, onUserDataChange }) => {
    const [userId, setUserId] = useState(initialData ? initialData.id : null);
    const [forename, setForename] = useState(initialData ? initialData.Forename : '');
    const [surname, setSurname] = useState(initialData ? initialData.Surname : '');
    const [eMail, setEMail] = useState(initialData ? initialData.EMail : '');
    const [phone, setPhone] = useState(initialData ? initialData.Phone : '');
    const [password, setPassword] = useState(initialData ? initialData.Password : '');
    const [passwordAgain, setPasswordAgain] = useState(initialData ? initialData.PasswordAgain : '');

    useEffect(() => {
        if (initialData) {
            setUserId(initialData.id);
            setForename(initialData.Forename);
            setSurname(initialData.Surname);
            setEMail(initialData.EMail);
            setPhone(initialData.Phone);
            setPassword(initialData.Password);
            setPasswordAgain(initialData.PasswordAgain);
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            Forename: forename,
            Surname: surname,
            EMail: eMail,
            Phone: phone,
            Password: password,
            PasswordAgain: passwordAgain
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
            </form>   
            <h2>Kasutaja parooli muutmine</h2> 
            <form onSubmit={handleSubmit}>   
                <div>
                    <label>Parool</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Parool uuesti</label>
                    <input type="text" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
                </div>
                <button type="submit">Salvesta</button>
            </form>
        </div>
    );
};

export default UserForm;
