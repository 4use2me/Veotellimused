import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientForm.css';

const ClientForm = ({ initialData, onClientDataChange, onClientAdded }) => {
    const [clientId, setClientId] = useState(initialData ? initialData.id : null);
    const [ettevõte, setEttevõte] = useState(initialData ? initialData.Ettevõte : '');
    const [aadress, setAadress] = useState(initialData ? initialData.Aadress : '');
    const [ePost, setEPost] = useState(initialData ? initialData.EPost : '');
    const [telefon, setTelefon] = useState(initialData ? initialData.Telefon : '');
    const [äriregistrikood, setÄriregistrikood] = useState(initialData ? initialData.Äriregistrikood : '');
    const [käibemaksukohustuslaseNumber, setKäibemaksukohustuslaseNumber] = useState(initialData ? initialData.KäibemaksukohustuslaseNumber : '');
    const [maksetähtaeg, setMaksetähtaeg] = useState(initialData ? initialData.Maksetähtaeg : '');
    const [duplicateError, setDuplicateError] = useState('');

    useEffect(() => {
        if (initialData) {
            setClientId(initialData.id);
            setEttevõte(initialData.Ettevõte);
            setAadress(initialData.Aadress);
            setEPost(initialData.EPost);
            setTelefon(initialData.Telefon);
            setÄriregistrikood(initialData.Äriregistrikood);
            setKäibemaksukohustuslaseNumber(initialData.KäibemaksukohustuslaseNumber);
            setMaksetähtaeg(initialData.Maksetähtaeg);
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDuplicateError('');

        if (!clientId) {
            try {
                const response = await axios.get('http://localhost:5000/api/kliendid/check', {
                    params: { äriregistrikood }
                });

                if (response.data.exists) {
                    setDuplicateError('Selline klient on juba olemas.');
                    return;
                }
            } catch (error) {
                console.error('Error checking client existence:', error.message);
                alert('Kliendi olemasolu kontrollimine ebaõnnestus');
                return;
            }
        }

        const clientData = {
            Ettevõte: ettevõte,
            Aadress: aadress,
            EPost: ePost,
            Telefon: telefon,
            Äriregistrikood: äriregistrikood,
            KäibemaksukohustuslaseNumber: käibemaksukohustuslaseNumber,
            Maksetähtaeg: maksetähtaeg
        };

        try {
            if (clientId) {
                await axios.put(`http://localhost:5000/api/kliendid/${clientId}`, clientData);
                alert('Klient edukalt uuendatud');
                onClientDataChange({ ...clientData, id: clientId });
            } else {
                const response = await axios.post('http://localhost:5000/api/kliendid', clientData);
                setClientId(response.data.id);
                alert('Klient edukalt lisatud');
                onClientAdded(response.data);
            }
        } catch (error) {
            console.error('Viga kliendi lisamisel / uuendamisel:', error);
            alert('Kliendi lisamine / uuendamine ebaõnnestus');
        }
    };

    return (
        <div className="client-form">
            <h2>{clientId ? 'Uuenda kliendi andmeid' : 'Lisa klient'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Ettevõte</label>
                    <input type="text" value={ettevõte} onChange={(e) => setEttevõte(e.target.value)} required />
                </div>
                <div>
                    <label>Aadress</label>
                    <input type="text" value={aadress} onChange={(e) => setAadress(e.target.value)} required />
                </div>
                <div>
                    <label>E-post</label>
                    <input type="text" value={ePost} onChange={(e) => setEPost(e.target.value)} required />
                </div>
                <div>
                    <label>Telefon</label>
                    <input type="text" value={telefon} onChange={(e) => setTelefon(e.target.value)} required />
                </div>
                <div>
                    <label>Äriregistrikood</label>
                    <input type="text" value={äriregistrikood} onChange={(e) => setÄriregistrikood(e.target.value)} required />
                </div>
                {duplicateError && <div className="error">{duplicateError}</div>}
                <div>
                    <label>Käibemaksukohustuslase number</label>
                    <input type="text" value={käibemaksukohustuslaseNumber} onChange={(e) => setKäibemaksukohustuslaseNumber(e.target.value)} />
                </div>
                <div>
                    <label>Maksetähtaeg</label>
                    <input type="number" value={maksetähtaeg} onChange={(e) => setMaksetähtaeg(e.target.value)} required />
                </div>
                <button type="submit">Salvesta</button>
            </form>
        </div>
    );
};

export default ClientForm;
