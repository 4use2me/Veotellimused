import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderForm.css';

const OrderForm = ({ initialData, onOrderDataChange, onOrderAdded }) => {
    const [orderId, setOrderId] = useState(initialData ? initialData.id : null);
    const [klient, setKlient] = useState(initialData ? initialData.Klient : '');
    const [pealelaadimiseEttevõte, setPealelaadimiseEttevõte] = useState(initialData ? initialData.PealelaadimiseEttevõte : '');
    const [pealelaadimiseAadress, setPealelaadimiseAadress] = useState(initialData ? initialData.PealelaadimiseAadress : '');
    const [laadung, setLaadung] = useState(initialData ? initialData.Laadung : '');
    const [pealelaadimiseKuupäev, setPealelaadimiseKuupäev] = useState('');
    const [mahalaadimiseEttevõte, setMahalaadimiseEttevõte] = useState(initialData ? initialData.MahalaadimiseEttevõte : '');
    const [mahalaadimiseAadress, setMahalaadimiseAadress] = useState(initialData ? initialData.MahalaadimiseAadress : '');
    const [mahalaadimiseKuupäev, setMahalaadimiseKuupäev] = useState('');
    const [eritingimus, setEritingimus] = useState(initialData ? initialData.Eritingimus : '');
    const [müügihind, setMüügihind] = useState(initialData ? initialData.Müügihind : '');
    const [välineTellimusnumber, setVälineTellimusnumber] = useState(initialData ? initialData.VälineTellimusnumber : '');
    const [vedaja, setVedaja] = useState(initialData ? initialData.Vedaja : '');
    const [autoNumbrimärk, setAutoNumbrimärk] = useState(initialData ? initialData.AutoNumbrimärk : '');
    const [kontakt, setKontakt] = useState(initialData ? initialData.Kontakt : '');
    const [hind, setHind] = useState(initialData ? initialData.Hind : '');
    const [tellimuseNumber, setTellimuseNumber] = useState(initialData ? initialData.TellimuseNumber : '');

    useEffect(() => {
        if (initialData) {
            setOrderId(initialData.id);
            setKlient(initialData.Klient);
            setPealelaadimiseEttevõte(initialData.PealelaadimiseEttevõte);
            setPealelaadimiseAadress(initialData.PealelaadimiseAadress);
            setLaadung(initialData.Laadung);
            if (initialData.PealelaadimiseKuupäev) {
                const datePart = initialData.PealelaadimiseKuupäev.split("T")[0];
                setPealelaadimiseKuupäev(datePart);
            }
            setMahalaadimiseEttevõte(initialData.MahalaadimiseEttevõte);
            setMahalaadimiseAadress(initialData.MahalaadimiseAadress);
            if (initialData.MahalaadimiseKuupäev) {
                const datePart = initialData.MahalaadimiseKuupäev.split("T")[0];
                setMahalaadimiseKuupäev(datePart);
            }
            setEritingimus(initialData.Eritingimus);
            setMüügihind(initialData.Müügihind);
            setVälineTellimusnumber(initialData.VälineTellimusnumber);
            setVedaja(initialData.Vedaja);
            setAutoNumbrimärk(initialData.AutoNumbrimärk);
            setKontakt(initialData.Kontakt);
            setHind(initialData.Hind);
            setTellimuseNumber(initialData.TellimuseNumber);
        }
    }, [initialData]);

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
            VälineTellimusnumber: välineTellimusnumber,
            Vedaja: vedaja,
            AutoNumbrimärk: autoNumbrimärk,
            Kontakt: kontakt,
            Hind: hind,
            TellimuseNumber: tellimuseNumber
        };

        try {
            if (orderId) {
                await axios.put(`http://localhost:5000/api/tellimused/${orderId}`, orderData);
                alert('Tellimus edukalt uuendatud');
                onOrderDataChange({ ...orderData, id: orderId });
            } else {
                const response = await axios.post('http://localhost:5000/api/tellimused', orderData);
                setOrderId(response.data.id);
                alert('Tellimus edukalt lisatud');
                onOrderAdded(response.data);
            }
        } catch (error) {
            console.error('Viga tellimuse lisamisel / uuendamisel:', error);
            alert('Tellimuse lisamine / uuendamine ebaõnnestus');
        }
    };

    return (
        <div className="order-form">
            <h2>{tellimuseNumber ? `Veotellimus: ${tellimuseNumber}` : 'Sisesta tellimus'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Klient *</label>
                    <input type="text" value={klient} onChange={(e) => setKlient(e.target.value)} required />
                </div>
                <div>
                    <label>Vedaja *</label>
                    <input type="text" value={vedaja} onChange={(e) => setVedaja(e.target.value)} required />
                </div>
                <div>
                    <label>Pealelaadimise ettevõte, kontakt</label>
                    <input type="text" value={pealelaadimiseEttevõte} onChange={(e) => setPealelaadimiseEttevõte(e.target.value)} required />
                </div>
                <div>
                    <label>Auto numbrimärk *</label>
                    <input type="text" value={autoNumbrimärk} onChange={(e) => setAutoNumbrimärk(e.target.value)} required />
                </div>
                <div>
                    <label>Pealelaadimise aadress</label>
                    <input type="text" value={pealelaadimiseAadress} onChange={(e) => setPealelaadimiseAadress(e.target.value)} required />
                </div>
                <div>
                    <label>Kontakt</label>
                    <input type="text" value={kontakt} onChange={(e) => setKontakt(e.target.value)} />
                </div>
                <div>
                    <label>Laadung</label>
                    <input type="text" value={laadung} onChange={(e) => setLaadung(e.target.value)} required />
                </div>
                <div>
                    <label>Hind *</label>
                    <input type="text" value={hind} onChange={(e) => setHind(e.target.value)} pattern="\d+(\.\d{1,2})?" required />
                </div>
                <div>
                    <label>Pealelaadimise kuupäev</label>
                    <input type="date" value={pealelaadimiseKuupäev} onChange={(e) => setPealelaadimiseKuupäev(e.target.value)} required />
                </div>
                <div>
                    <label>Müügihind *</label>
                    <input type="text" value={müügihind} onChange={(e) => setMüügihind(e.target.value)} pattern="\d+(\.\d{1,2})?" required />
                </div>
                <div>
                    <label>Mahalaadimise ettevõte, kontakt</label>
                    <input type="text" value={mahalaadimiseEttevõte} onChange={(e) => setMahalaadimiseEttevõte(e.target.value)} required />
                </div>
                <div>
                    <label>Eritingimus</label>
                    <input type="text" value={eritingimus} onChange={(e) => setEritingimus(e.target.value)} />
                </div>
                <div>
                    <label>Mahalaadimise aadress</label>
                    <input type="text" value={mahalaadimiseAadress} onChange={(e) => setMahalaadimiseAadress(e.target.value)} required />
                </div>
                <div>
                    <label>Väline tellimusnumber *</label>
                    <input type="text" value={välineTellimusnumber} onChange={(e) => setVälineTellimusnumber(e.target.value)} />
                </div>
                <div>
                    <label>Mahalaadimise kuupäev</label>
                    <input type="date" value={mahalaadimiseKuupäev} onChange={(e) => setMahalaadimiseKuupäev(e.target.value)} required />
                </div>
                <button type="submit">Salvesta</button>
                <button type="generate">Genereeri tellimus</button>
            </form>
        </div>
    );
};

export default OrderForm;
