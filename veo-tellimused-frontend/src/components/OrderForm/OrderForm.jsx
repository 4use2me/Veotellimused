import React, { useState } from 'react';
import axios from 'axios';
import './OrderForm.css';

const OrderForm = ({ onClose }) => {
    const [orderId, setOrderId] = useState(null);
    const [klient, setKlient] = useState('');
    const [pealelaadimiseEttevõte, setPealelaadimiseEttevõte] = useState('');
    const [pealelaadimiseAadress, setPealelaadimiseAadress] = useState('');
    const [laadung, setLaadung] = useState('');
    const [pealelaadimiseKuupäev, setPealelaadimiseKuupäev] = useState('');
    const [mahalaadimiseEttevõte, setMahalaadimiseEttevõte] = useState('');
    const [mahalaadimiseAadress, setMahalaadimiseAadress] = useState('');
    const [mahalaadimiseKuupäev, setMahalaadimiseKuupäev] = useState('');
    const [eritingimus, setEritingimus] = useState('');
    const [müügihind, setMüügihind] = useState('');
    const [välineTellimusnumber, setVälineTellimusnumber] = useState('');

    const clearFormFields = () => {
        setKlient('');
        setPealelaadimiseEttevõte('');
        setPealelaadimiseAadress('');
        setLaadung('');
        setPealelaadimiseKuupäev('');
        setMahalaadimiseEttevõte('');
        setMahalaadimiseAadress('');
        setMahalaadimiseKuupäev('');
        setEritingimus('');
        setMüügihind('');
        setVälineTellimusnumber('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            Klient: klient,
            PealelaadimiseEttevõte: pealelaadimiseEttevõte,
            PealelaadimiseAadress: pealelaadimiseAadress,
            Laadung: laadung,
            PealelaadimiseKuupäev: pealelaadimiseKuupäev,
            MahalaadimiseEttevõte: mahalaadimiseEttevõte,
            MahalaadimiseAadress: mahalaadimiseAadress,
            MahalaadimiseKuupäev: mahalaadimiseKuupäev,
            Eritingimus: eritingimus,
            Müügihind: parseFloat(müügihind),
            VälineTellimusnumber: välineTellimusnumber
        };

        try {
            if (orderId) {
                // Uuenda olemasolevat tellimust
                await axios.put(`http://localhost:5000/api/tellimused/${orderId}`, orderData);
                alert('Order updated successfully');
            } else {
                const response = await axios.post('http://localhost:5000/api/tellimused', orderData);
                setOrderId(response.data.id); // Salvesta uus orderId
                alert('Order added successfully');
            }
            
            clearFormFields(); // Tühjenda sisestusväljad pärast salvestamist
            onClose(); // Sule vorm pärast edukat lisamist

        } catch (error) {
            console.error('Error adding order:', error);
            alert('Failed to add order');
        }
    };

    return (
        <div className="order-form">
            <h2>Sisesta tellimus</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Klient</label>
                    <input type="text" value={klient} onChange={(e) => setKlient(e.target.value)} required />
                </div>
                <div>
                    <label>Pealelaadimise ettevõte</label>
                    <input type="text" value={pealelaadimiseEttevõte} onChange={(e) => setPealelaadimiseEttevõte(e.target.value)} required />
                </div>
                <div>
                    <label>Pealelaadimise aadress</label>
                    <input type="text" value={pealelaadimiseAadress} onChange={(e) => setPealelaadimiseAadress(e.target.value)} required />
                </div>
                <div>
                    <label>Laadung</label>
                    <input type="text" value={laadung} onChange={(e) => setLaadung(e.target.value)} required />
                </div>
                <div>
                    <label>Pealelaadimise kuupäev</label>
                    <input type="date" value={pealelaadimiseKuupäev} onChange={(e) => setPealelaadimiseKuupäev(e.target.value)} required />
                </div>
                <div>
                    <label>Mahalaadimise ettevõte</label>
                    <input type="text" value={mahalaadimiseEttevõte} onChange={(e) => setMahalaadimiseEttevõte(e.target.value)} required />
                </div>
                <div>
                    <label>Mahalaadimise aadress</label>
                    <input type="text" value={mahalaadimiseAadress} onChange={(e) => setMahalaadimiseAadress(e.target.value)} required />
                </div>
                <div>
                    <label>Mahalaadimise kuupäev</label>
                    <input type="date" value={mahalaadimiseKuupäev} onChange={(e) => setMahalaadimiseKuupäev(e.target.value)} required />
                </div>
                <div>
                    <label>Eritingimus</label>
                    <input type="text" value={eritingimus} onChange={(e) => setEritingimus(e.target.value)} />
                </div>
                <div>
                    <label>Müügihind</label>
                    <input type="number" value={müügihind} onChange={(e) => setMüügihind(e.target.value)} step="0.01" required />
                </div>
                <div>
                    <label>Väline tellimusnumber</label>
                    <input type="text" value={välineTellimusnumber} onChange={(e) => setVälineTellimusnumber(e.target.value)} />
                </div>
                <button type="submit">Salvesta</button>
            </form>
        </div>
    );
};

export default OrderForm;
