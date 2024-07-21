import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './OrderForm.css';

const OrderForm = ({ initialData, onOrderDataChange, onOrderAdded, onConfirmed, onCancelled }) => {
    const [orderId, setOrderId] = useState(initialData ? initialData.id : null);
    const [klient, setKlient] = useState(initialData ? initialData.Klient : '');
    const [klient2, setKlient2] = useState(initialData ? initialData.Klient2 : '');
    const [pealelaadimiseEttevõte, setPealelaadimiseEttevõte] = useState(initialData ? initialData.PealelaadimiseEttevõte : '');
    const [pealelaadimiseEttevõte2, setPealelaadimiseEttevõte2] = useState(initialData ? initialData.PealelaadimiseEttevõte2 : '');
    const [pealelaadimiseAadress, setPealelaadimiseAadress] = useState(initialData ? initialData.PealelaadimiseAadress : '');
    const [pealelaadimiseAadress2, setPealelaadimiseAadress2] = useState(initialData ? initialData.PealelaadimiseAadress2 : '');
    const [laadung, setLaadung] = useState(initialData ? initialData.Laadung : '');
    const [laadung2, setLaadung2] = useState(initialData ? initialData.Laadung2 : '');
    const [pealelaadimiseKuupäev, setPealelaadimiseKuupäev] = useState('');
    const [pealelaadimiseKuupäev2, setPealelaadimiseKuupäev2] = useState('');
    const [mahalaadimiseEttevõte, setMahalaadimiseEttevõte] = useState(initialData ? initialData.MahalaadimiseEttevõte : '');
    const [mahalaadimiseEttevõte2, setMahalaadimiseEttevõte2] = useState(initialData ? initialData.MahalaadimiseEttevõte2 : '');
    const [mahalaadimiseAadress, setMahalaadimiseAadress] = useState(initialData ? initialData.MahalaadimiseAadress : '');
    const [mahalaadimiseAadress2, setMahalaadimiseAadress2] = useState(initialData ? initialData.MahalaadimiseAadress2 : '');
    const [mahalaadimiseKuupäev, setMahalaadimiseKuupäev] = useState('');
    const [mahalaadimiseKuupäev2, setMahalaadimiseKuupäev2] = useState('');
    const [eritingimus, setEritingimus] = useState(initialData ? initialData.Eritingimus : '');
    const [eritingimus2, setEritingimus2] = useState(initialData ? initialData.Eritingimus2 : '');
    const [müügihind, setMüügihind] = useState(initialData ? initialData.Müügihind : '');
    const [müügihind2, setMüügihind2] = useState(initialData ? initialData.Müügihind2 : '');
    const [välineTellimusnumber, setVälineTellimusnumber] = useState(initialData ? initialData.VälineTellimusnumber : '');
    const [välineTellimusnumber2, setVälineTellimusnumber2] = useState(initialData ? initialData.VälineTellimusnumber2 : '');
    const [vedaja, setVedaja] = useState(initialData ? initialData.Vedaja : '');
    const [autoNumbrimärk, setAutoNumbrimärk] = useState(initialData ? initialData.AutoNumbrimärk : '');
    const [kontakt, setKontakt] = useState(initialData ? initialData.Kontakt : '');
    const [hind, setHind] = useState(initialData ? initialData.Hind : '');
    const [tellimuseNumber, setTellimuseNumber] = useState(initialData ? initialData.TellimuseNumber : '');
    const [staatus] = useState(initialData ? initialData.Staatus : 'Töös'); // Lisa olek
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);
    
    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    useEffect(() => {
        if (initialData) {
            setOrderId(initialData.id);
            setKlient(initialData.Klient);
            setKlient2(initialData.Klient2);
            setPealelaadimiseEttevõte(initialData.PealelaadimiseEttevõte);
            setPealelaadimiseEttevõte2(initialData.PealelaadimiseEttevõte2);
            setPealelaadimiseAadress(initialData.PealelaadimiseAadress);
            setPealelaadimiseAadress2(initialData.PealelaadimiseAadress2);
            setLaadung(initialData.Laadung);
            setLaadung2(initialData.Laadung2);
            if (initialData.PealelaadimiseKuupäev) {
                const datePart = initialData.PealelaadimiseKuupäev.split("T")[0];
                setPealelaadimiseKuupäev(datePart);
            }
            if (initialData.PealelaadimiseKuupäev2) {
                const datePart = initialData.PealelaadimiseKuupäev2.split("T")[0];
                setPealelaadimiseKuupäev2(datePart);
            }
            setMahalaadimiseEttevõte(initialData.MahalaadimiseEttevõte);
            setMahalaadimiseEttevõte2(initialData.MahalaadimiseEttevõte2);
            setMahalaadimiseAadress(initialData.MahalaadimiseAadress);
            setMahalaadimiseAadress2(initialData.MahalaadimiseAadress2);
            if (initialData.MahalaadimiseKuupäev) {
                const datePart = initialData.MahalaadimiseKuupäev.split("T")[0];
                setMahalaadimiseKuupäev(datePart);
            }
            if (initialData.MahalaadimiseKuupäev2) {
                const datePart = initialData.MahalaadimiseKuupäev2.split("T")[0];
                setMahalaadimiseKuupäev2(datePart);
            }
            setEritingimus(initialData.Eritingimus);
            setEritingimus2(initialData.Eritingimus2);
            setMüügihind(initialData.Müügihind);
            setMüügihind2(initialData.Müügihind2);
            setVälineTellimusnumber(initialData.VälineTellimusnumber);
            setVälineTellimusnumber2(initialData.VälineTellimusnumber2);
            setVedaja(initialData.Vedaja);
            setAutoNumbrimärk(initialData.AutoNumbrimärk);
            setKontakt(initialData.Kontakt);
            setHind(initialData.Hind);
            setTellimuseNumber(initialData.TellimuseNumber);
        }
    }, [initialData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            Klient: klient,
            Klient2: klient2,
            PealelaadimiseEttevõte: pealelaadimiseEttevõte,
            PealelaadimiseEttevõte2: pealelaadimiseEttevõte2,
            PealelaadimiseAadress: pealelaadimiseAadress,
            PealelaadimiseAadress2: pealelaadimiseAadress2,
            Laadung: laadung,
            Laadung2: laadung2,
            PealelaadimiseKuupäev: pealelaadimiseKuupäev,
            PealelaadimiseKuupäev2: pealelaadimiseKuupäev2,
            MahalaadimiseEttevõte: mahalaadimiseEttevõte,
            MahalaadimiseEttevõte2: mahalaadimiseEttevõte2,
            MahalaadimiseAadress: mahalaadimiseAadress,
            MahalaadimiseAadress2: mahalaadimiseAadress2,
            MahalaadimiseKuupäev: mahalaadimiseKuupäev,
            MahalaadimiseKuupäev2: mahalaadimiseKuupäev2,
            Eritingimus: eritingimus,
            Eritingimus2: eritingimus2,
            Müügihind: parseFloat(müügihind),
            Müügihind2: parseFloat(müügihind2),
            VälineTellimusnumber: välineTellimusnumber,
            VälineTellimusnumber2: välineTellimusnumber2,
            Vedaja: vedaja,
            AutoNumbrimärk: autoNumbrimärk,
            Kontakt: kontakt,
            Hind: hind,
            TellimuseNumber: tellimuseNumber,
            Staatus: staatus
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
                    <label className='bold-label'>Klient *</label>
                    <input type="text" value={klient} onChange={(e) => setKlient(e.target.value)} required />
                </div>
                <div>
                    <label>Klient *</label>
                    <input type="text" value={klient2} onChange={(e) => setKlient2(e.target.value)} />
                </div>
                <div>
                    <label>Pealelaadimise ettevõte, kontakt</label>
                    <input type="text" value={pealelaadimiseEttevõte} onChange={(e) => setPealelaadimiseEttevõte(e.target.value)} required />
                </div>
                <div>
                    <label>Pealelaadimise ettevõte, kontakt</label>
                    <input type="text" value={pealelaadimiseEttevõte2} onChange={(e) => setPealelaadimiseEttevõte2(e.target.value)} />
                </div>
                <div>
                    <label>Pealelaadimise aadress</label>
                    <input type="text" value={pealelaadimiseAadress} onChange={(e) => setPealelaadimiseAadress(e.target.value)} required />
                </div>
                <div>
                    <label>Pealelaadimise aadress</label>
                    <input type="text" value={pealelaadimiseAadress2} onChange={(e) => setPealelaadimiseAadress2(e.target.value)} />
                </div>
                <div>
                    <label>Laadung</label>
                    <input type="text" value={laadung} onChange={(e) => setLaadung(e.target.value)} required />
                </div>
                <div>
                    <label>Laadung</label>
                    <input type="text" value={laadung2} onChange={(e) => setLaadung2(e.target.value)} />
                </div>
                <div>
                    <label>Pealelaadimise kuupäev</label>
                    <input type="date" value={pealelaadimiseKuupäev} onChange={(e) => setPealelaadimiseKuupäev(e.target.value)} required />
                </div>
                <div>
                    <label>Pealelaadimise kuupäev</label>
                    <input type="date" value={pealelaadimiseKuupäev2} onChange={(e) => setPealelaadimiseKuupäev2(e.target.value)} />
                </div>
                <div>
                    <label>Mahalaadimise ettevõte, kontakt</label>
                    <input type="text" value={mahalaadimiseEttevõte} onChange={(e) => setMahalaadimiseEttevõte(e.target.value)} required />
                </div>
                <div>
                    <label>Mahalaadimise ettevõte, kontakt</label>
                    <input type="text" value={mahalaadimiseEttevõte2} onChange={(e) => setMahalaadimiseEttevõte2(e.target.value)} />
                </div>
                <div>
                    <label>Mahalaadimise aadress</label>
                    <input type="text" value={mahalaadimiseAadress} onChange={(e) => setMahalaadimiseAadress(e.target.value)} required />
                </div>
                <div>
                    <label>Mahalaadimise aadress</label>
                    <input type="text" value={mahalaadimiseAadress2} onChange={(e) => setMahalaadimiseAadress2(e.target.value)} />
                </div>
                <div>
                    <label>Mahalaadimise kuupäev</label>
                    <input type="date" value={mahalaadimiseKuupäev} onChange={(e) => setMahalaadimiseKuupäev(e.target.value)} required />
                </div>
                <div>
                    <label>Mahalaadimise kuupäev</label>
                    <input type="date" value={mahalaadimiseKuupäev2} onChange={(e) => setMahalaadimiseKuupäev2(e.target.value)} />
                </div>
                <div>
                    <label>Eritingimus</label>
                    <input type="text" value={eritingimus} onChange={(e) => setEritingimus(e.target.value)} />
                </div>
                <div>
                    <label>Eritingimus</label>
                    <input type="text" value={eritingimus2} onChange={(e) => setEritingimus2(e.target.value)} />
                </div>
                <div>
                    <label>Väline tellimusnumber *</label>
                    <input type="text" value={välineTellimusnumber} onChange={(e) => setVälineTellimusnumber(e.target.value)} />
                </div>
                <div>
                    <label>Väline tellimusnumber *</label>
                    <input type="text" value={välineTellimusnumber2} onChange={(e) => setVälineTellimusnumber2(e.target.value)} />
                </div>
                <div>
                    <label>Müügihind *</label>
                    <input type="text" value={müügihind} onChange={(e) => setMüügihind(e.target.value)} pattern="\d+(\.\d{1,2})?" required />
                </div>
                <div>
                    <label>Müügihind *</label>
                    <input type="text" value={müügihind2} onChange={(e) => setMüügihind2(e.target.value)} pattern="\d+(\.\d{1,2})?" />
                </div>     
                <div>
                    <label className='bold-label'>Vedaja *</label>
                    <input type="text" value={vedaja} onChange={(e) => setVedaja(e.target.value)} required />
                </div>
                <div>
                    <button type="submit">Salvesta</button>
                </div>
                <div>
                    <label>Auto numbrimärk *</label>
                    <input type="text" value={autoNumbrimärk} onChange={(e) => setAutoNumbrimärk(e.target.value)} required />
                </div>
                <div>
                <button type="button" className="generate-purchase-button">Genereeri ostutellimus</button>
                </div>
                <div>
                    <label>Kontakt</label>
                    <input type="text" value={kontakt} onChange={(e) => setKontakt(e.target.value)} />
                </div>
                <div ref={menuRef}>
                    <button
                        className={`toggle-menu-button ${openMenu === 'status' ? 'open' : ''}`}
                        onClick={() => toggleMenu('status')}
                    >
                        Muuda tellimuse staatust {openMenu === 'status'}
                    </button>
                    {openMenu === 'status' && (
                        <ul className="menu-items">
                            <li onClick={onConfirmed}>Veos kinnitatud</li>
                            <li onClick={onCancelled}>Tühistatud</li>
                        </ul>
                    )}
                </div> 
                <div>
                    <label>Hind *</label>
                    <input type="text" value={hind} onChange={(e) => setHind(e.target.value)} pattern="\d+(\.\d{1,2})?" required />
                </div>
                <div>
                <button type="button" className="generate-sale-button">Genereeri müügitellimus</button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;
