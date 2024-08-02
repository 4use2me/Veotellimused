import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Data.css';

const Data = ({ initialData, onDataDataChange }) => {
    const [dataId, setDataId] = useState(initialData ? initialData.id : null);
    const [name, setName] = useState(initialData ? initialData.Name : '');
    const [registryCode, setRegistryCode] = useState(initialData ? initialData.RegistryCode : '');
    const [vatNumber, setVatNumber] = useState(initialData ? initialData.VatNumber : '');
    const [address, setAddress] = useState(initialData ? initialData.Address : '');
    const [phone, setPhone] = useState(initialData ? initialData.Phone : '');
    const [eMail, setEMail] = useState(initialData ? initialData.EMail : '');
    const [accountantEMail, setAccountantEMail] = useState(initialData ? initialData.AccountantEMail : '');
    const [homePage, setHomePage] = useState(initialData ? initialData.HomePage : '');
    const [bank, setBank] = useState(initialData ? initialData.Bank : '');
    const [swift, setSwift] = useState(initialData ? initialData.Swift : '');
    const [iban, setIban] = useState(initialData ? initialData.Iban : '');

    useEffect(() => {
        console.log('Initial data received:', initialData);
        if (initialData) {
            setDataId(initialData.id);
            setName(initialData.Name);
            setRegistryCode(initialData.RegistryCode);
            setVatNumber(initialData.VatNumber);
            setAddress(initialData.Address);
            setPhone(initialData.Phone);
            setEMail(initialData.EMail);
            setAccountantEMail(initialData.AccountantEMail);
            setHomePage(initialData.HomePage);
            setBank(initialData.Bank);
            setSwift(initialData.Swift);
            setIban(initialData.Iban);
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataData = {
            Name: name,
            RegistryCode: registryCode,
            VatNumber: vatNumber,
            Address: address,
            Phone: phone,
            EMail: eMail,
            AccountantEMail: accountantEMail,
            HomePage: homePage,
            Bank: bank,
            Swift: swift,
            Iban: iban
        };

        try {
            if (dataId) {
                await axios.put(`http://localhost:5000/api/data/${dataId}`, dataData);
                alert('Andmed edukalt uuendatud');
                // Uuenda vormiväljad pärast andmete salvestamist
                onDataDataChange({ ...dataData, id: dataId });
            } else {
                alert('Andmete lisamine ei ole lubatud');
            }
        } catch (error) {
            console.error('Error updating the data:', error);
            alert('Andmete uuendamine ebaõnnestus');
        }
    };

    return (
        <div className="data-form">
            <h2>Andmed</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nimi</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Äriregistrikood</label>
                    <input type="text" value={registryCode} onChange={(e) => setRegistryCode(e.target.value)} required />
                </div>
                <div>
                    <label>Käibemaksukohustuslase number</label>
                    <input type="text" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} />
                </div>
                <div>
                    <label>Aadress</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label>Telefon</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div>
                    <label>E-post</label>
                    <input type="text" value={eMail} onChange={(e) => setEMail(e.target.value)} required />
                </div>
                <div>
                    <label>Raamatupidaja e-post</label>
                    <input type="text" value={accountantEMail} onChange={(e) => setAccountantEMail(e.target.value)} required />
                </div>
                <div>
                    <label>Kodulehekülg</label>
                    <input type="text" value={homePage} onChange={(e) => setHomePage(e.target.value)} required />
                </div>
                <div>
                    <label>Pank</label>
                    <input type="text" value={bank} onChange={(e) => setBank(e.target.value)} required />
                </div>
                <div>
                    <label>SWIFT</label>
                    <input type="text" value={swift} onChange={(e) => setSwift(e.target.value)} required />
                </div>
                <div>
                    <label>IBAN</label>
                    <input type="text" value={iban} onChange={(e) => setIban(e.target.value)} required />
                </div>
                <button type="submit">Salvesta</button>
            </form>
        </div>
    );
};

export default Data;
