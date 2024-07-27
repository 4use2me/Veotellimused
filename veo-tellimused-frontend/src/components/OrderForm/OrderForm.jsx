import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './OrderForm.css';

const OrderForm = ({ initialData, onOrderDataChange, onOrderAdded }) => {
    const [orderId, setOrderId] = useState(initialData ? initialData.id : null);
    const [klient, setKlient] = useState(initialData ? { value: initialData.KlientID, label: initialData.Klient } : null);
    const [klientII, setKlientII] = useState(initialData ? { value: initialData.KlientIIID, label: initialData.KlientII } : null);
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
    const [vedaja, setVedaja] = useState(initialData ? { value: initialData.VedajaID, label: initialData.Vedaja } : null);
    const [autoNumbrimärk, setAutoNumbrimärk] = useState(initialData ? initialData.AutoNumbrimärk : '');
    const [kontakt, setKontakt] = useState(initialData ? initialData.Kontakt : '');
    const [hind, setHind] = useState(initialData ? initialData.Hind : '');
    const [tellimuseNumber, setTellimuseNumber] = useState(initialData ? initialData.TellimuseNumber : '');
    const [staatus] = useState(initialData ? initialData.Staatus : 'Töös'); // Lisa olek
    const [openMenu, setOpenMenu] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const [errors, setErrors] = useState({});
    const [clients, setClients] = useState([]);
    const [carriers, setCarriers] = useState([]);
    const menuRef = useRef(null);
    
    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    useEffect(() => {
        if (initialData) {
            setOrderId(initialData.id);
            setKlient({ value: initialData.KlientID, label: initialData.Klient });
            setKlientII(initialData.KlientIIID ? { value: initialData.KlientIIID, label: initialData.KlientII } : null);
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
            setVedaja({ value: initialData.VedajaID, label: initialData.Vedaja });
            setAutoNumbrimärk(initialData.AutoNumbrimärk);
            setKontakt(initialData.Kontakt);
            setHind(initialData.Hind);
            setTellimuseNumber(initialData.TellimuseNumber);
        }
    }, [initialData]);

    useEffect(() => {
        if (orderId) {
            // Lae tellimuse andmed serverist
            axios.get(`http://localhost:5000/api/tellimused/${orderId}`)
                .then(response => {
                    const order = response.data;
                    setKlient({ label: order.Klient });
                    setKlientII( order.KlientIIID ? {label: order.KlientII } : null);
                    setPealelaadimiseEttevõte(order.PealelaadimiseEttevõte);
                    setMahalaadimiseEttevõte2(order.MahalaadimiseEttevõte2);
                    setPealelaadimiseAadress(order.PealelaadimiseAadress);
                    setPealelaadimiseAadress2(order.PealelaadimiseAadress2);
                    setLaadung(order.Laadung);
                    setLaadung2(order.Laadung2);
                    setMahalaadimiseEttevõte(order.MahalaadimiseEttevõte);
                    setMahalaadimiseEttevõte2(order.MahalaadimiseEttevõte2);
                    setMahalaadimiseAadress(order.MahalaadimiseAadress);
                    setMahalaadimiseAadress2(order.MahalaadimiseAadress2);
                    setEritingimus(order.Eritingimus);
                    setEritingimus2(order.Eritingimus2);
                    setMüügihind(order.Müügihind);
                    setMüügihind2(order.Müügihind2);
                    setVälineTellimusnumber(order.VälineTellimusnumber);
                    setVälineTellimusnumber2(order.VälineTellimusnumber2);
                    setVedaja({label: order.Vedaja});
                    setAutoNumbrimärk(order.AutoNumbrimärk);
                    setKontakt(order.Kontakt);
                    setHind(order.Hind);
                    setTellimuseNumber(order.TellimuseNumber);
                    // ... määrake kõik muud väljad
                })
                .catch(error => console.error('Tellimuse andmete laadimine ebaõnnestus:', error));
        }
    }, [orderId]);

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

    useEffect(() => {
        const fetchOrderStatus = async () => {
            if (orderId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/tellimused/${orderId}`);
                    const { Staatus } = response.data;
                    if (Staatus === 'Kinnitatud' || Staatus === 'Tühistatud') {
                        setIsLocked(true);
                    }
                } catch (error) {
                    console.error('Viga staatuse pärimisel:', error.response ? error.response.data : error.message);
                }
            }
        };
        fetchOrderStatus();
    }, [orderId]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/kliendid');
                const clientOptions = response.data.map(client => ({
                    value: client.id,
                    label: client.Ettevõte,
                }));
                setClients(clientOptions);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    const handleClientChange = (selectedOption) => {
        setKlient(selectedOption);
        console.log('Selected client:', selectedOption); // Debug line
    };
    
    const handleClientIIChange = (selectedOption) => {
        setKlientII(selectedOption);
        console.log('Selected client:', selectedOption); // Debug line
    };    

    useEffect(() => {
        const fetchCarriers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/carriers');
                const carrierOptions = response.data.map(carrier => ({
                    value: carrier.id,
                    label: carrier.Company,
                }));
                setCarriers(carrierOptions);
            } catch (error) {
                console.error('Error fetching carriers:', error);
            }
        };

        fetchCarriers();
    }, []);

    const handleCarrierChange = (selectedOption) => {
        setVedaja(selectedOption);
    };

    const validate = () => {
        const newErrors = {};
        if (!klient) newErrors.klient = 'Klient on kohustuslik';
        if (!vedaja) newErrors.vedaja = 'Vedaja on kohustuslik';

        const fields = {
            PealelaadimiseEttevõte2: pealelaadimiseEttevõte2,
            PealelaadimiseAadress2: pealelaadimiseAadress2,
            Laadung2: laadung2,
            PealelaadimiseKuupäev2: pealelaadimiseKuupäev2,
            MahalaadimiseEttevõte2: mahalaadimiseEttevõte2,
            MahalaadimiseAadress2: mahalaadimiseAadress2,
            MahalaadimiseKuupäev2: mahalaadimiseKuupäev2,
            Müügihind2: müügihind2,
        };
    
        if (klientII) {
            Object.entries(fields).forEach(([key, value]) => {
                if (!value) newErrors[key] = 'Please fill out this field.';
            });
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const orderData = {
            Klient: klient ? klient.label : '',
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
            Vedaja: vedaja ? vedaja.label : '',
            AutoNumbrimärk: autoNumbrimärk,
            Kontakt: kontakt,
            Hind: hind,
            TellimuseNumber: tellimuseNumber,
            Staatus: staatus
        };

        if (klientII) {
            orderData.KlientII = klientII ? klientII.label : '';
            orderData.PealelaadimiseEttevõte2 = pealelaadimiseEttevõte2;
            orderData.PealelaadimiseAadress2 = pealelaadimiseAadress2;
            orderData.Laadung2 = laadung2;
            orderData.PealelaadimiseKuupäev2 = pealelaadimiseKuupäev2;
            orderData.MahalaadimiseEttevõte2 = mahalaadimiseEttevõte2;
            orderData.MahalaadimiseAadress2 = mahalaadimiseAadress2;
            orderData.MahalaadimiseKuupäev2 = mahalaadimiseKuupäev2;
            orderData.Eritingimus2 = eritingimus2;
            orderData.Müügihind2 = parseFloat(müügihind2);
            orderData.VälineTellimusnumber2 = välineTellimusnumber2;
        }

        try {
            if (isLocked) {
                alert('Tellimust ei saa muuta, kuna see on juba kinnitatud või tühistatud.');
                return;
            }

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

    const handleGeneratePDF = async () => {
        if (!tellimuseNumber || !vedaja || !pealelaadimiseEttevõte || !pealelaadimiseAadress || 
            !laadung || !pealelaadimiseKuupäev || !mahalaadimiseEttevõte || !mahalaadimiseAadress || 
            !mahalaadimiseKuupäev || !hind) {
            console.error('Missing order data');
            return;
        }
    
        const orderData = {
            tellimuseNumber, // Siin on kasutatud tellimuseNumber, mitte orderNumber
            vedaja: vedaja.label,
            pealelaadimiseEttevõte,
            pealelaadimiseAadress,
            laadung,
            pealelaadimiseKuupäev,
            mahalaadimiseEttevõte,
            mahalaadimiseAadress,
            mahalaadimiseKuupäev,
            hind
        };
    
        // Lisame valikulised väljad ainult siis, kui need on täidetud
        if (eritingimus) {
            orderData.eritingimus = eritingimus;
        }
    
        console.log('Sending orderData:', orderData);
    
        try {
            const response = await axios.post('http://localhost:5000/api/generate-pdf', orderData, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `order_${orderData.tellimuseNumber}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };    

    const handleStatusChange = async (newStatus) => {
        if (!orderId) {
        alert('Tellimus pole salvestatud!');
        return;
        }

        if (isLocked) {
            alert('Tellimuse staatust ei saa muuta, kuna see on juba kinnitatud või tühistatud.');
            return;
        }
    
        try {
            console.log('Saadan staatust ID-ga:', orderId);
    
            await axios.put(`http://localhost:5000/api/tellimused/${orderId}/status`, {
                Staatus: newStatus
            });
            alert('Staatus edukalt uuendatud');
            if (newStatus === 'Kinnitatud' || newStatus === 'Tühistatud') {
                setIsLocked(true);
            }
            setOpenMenu(null); // Sulge menüü pärast muudatust
        } catch (error) {
            console.error('Viga staatuse uuendamisel:', error.response ? error.response.data : error.message);
            alert('Staatus muutmise ebaõnnestumine');
        }
    };    

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? 'black' : 'black',
            '&:hover': {
                borderColor: 'black'
            },
            boxShadow: state.isFocused ? '0 0 0 1px black' : 'none',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#f0f0f0' : state.isFocused ? '#f0f0f0' : 'white',
            color: state.isSelected ? 'black' : 'black',
            '&:hover': {
                backgroundColor: '#f0f0f0',
                color: 'black'
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#f0f0f0',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'black',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: 'black',
            '&:hover': {
                backgroundColor: '#f0f0f0',
                color: 'black'
            },
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: 'black',
        }),
        clearIndicator: (provided) => ({
            ...provided,
            color: 'black',
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            backgroundColor: 'black',
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'black',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black',
        }),
    };    

    return (
        <div className="order-form">
            <h2>{tellimuseNumber ? `Veotellimus: ${tellimuseNumber}` : 'Sisesta tellimus'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='bold-label'>Klient</label>
                    <Select 
                        className="select-container"
                        value={klient}
                        onChange={handleClientChange}
                        options={clients}
                        placeholder="Vali klient"
                        styles={customStyles}
                        isClearable={true}
                    />
                    {errors.klient && <div className="error">{errors.klient}</div>}
                </div>
                <div>
                    <label className='bold-label'>Klient</label>
                   <Select 
                        className="select-container"
                        value={klientII}
                        onChange={handleClientIIChange}
                        options={clients}
                        placeholder="Vali klient"
                        styles={customStyles}
                        isClearable={true}
                    />
                    {errors.klientII && <div className="error">{errors.klientII}</div>}
                </div>
                <div>
                    <label>Pealelaadimise ettevõte, kontakt</label>
                    <input type="text" value={pealelaadimiseEttevõte} onChange={(e) => setPealelaadimiseEttevõte(e.target.value)} required />
                </div>
                <div>
                    <label>Pealelaadimise ettevõte, kontakt</label>
                    <input type="text" value={pealelaadimiseEttevõte2} onChange={(e) => setPealelaadimiseEttevõte2(e.target.value)} />
                    {errors.PealelaadimiseEttevõte2 && <div className="error">{errors.PealelaadimiseEttevõte2}</div>}
                </div>
                <div>
                    <label className='bold-label'>Pealelaadimise aadress</label>
                    <input type="text" value={pealelaadimiseAadress} onChange={(e) => setPealelaadimiseAadress(e.target.value)} required />
                </div>
                <div>
                    <label className='bold-label'>Pealelaadimise aadress</label>
                    <input type="text" value={pealelaadimiseAadress2} onChange={(e) => setPealelaadimiseAadress2(e.target.value)} />
                    {errors.PealelaadimiseAadress2 && <div className="error">{errors.PealelaadimiseAadress2}</div>}
                </div>
                <div>
                    <label>Laadung</label>
                    <input type="text" value={laadung} onChange={(e) => setLaadung(e.target.value)} required />
                </div>
                <div>
                    <label>Laadung</label>
                    <input type="text" value={laadung2} onChange={(e) => setLaadung2(e.target.value)} />
                    {errors.Laadung2 && <div className="error">{errors.Laadung2}</div>}
                </div>
                <div>
                    <label>Pealelaadimise kuupäev</label>
                    <input type="date" value={pealelaadimiseKuupäev} onChange={(e) => setPealelaadimiseKuupäev(e.target.value)} required />
                </div>
                <div>
                    <label>Pealelaadimise kuupäev</label>
                    <input type="date" value={pealelaadimiseKuupäev2} onChange={(e) => setPealelaadimiseKuupäev2(e.target.value)} />
                    {errors.PealelaadimiseKuupäev2 && <div className="error">{errors.PealelaadimiseKuupäev2}</div>}
                </div>
                <div>
                    <label>Mahalaadimise ettevõte, kontakt</label>
                    <input type="text" value={mahalaadimiseEttevõte} onChange={(e) => setMahalaadimiseEttevõte(e.target.value)} required />
                </div>
                <div>
                    <label>Mahalaadimise ettevõte, kontakt</label>
                    <input type="text" value={mahalaadimiseEttevõte2} onChange={(e) => setMahalaadimiseEttevõte2(e.target.value)} />
                    {errors.MahalaadimiseEttevõte2 && <div className="error">{errors.MahalaadimiseEttevõte2}</div>}
                </div>
                <div>
                    <label className='bold-label'>Mahalaadimise aadress</label>
                    <input type="text" value={mahalaadimiseAadress} onChange={(e) => setMahalaadimiseAadress(e.target.value)} required />
                </div>
                <div>
                    <label className='bold-label'>Mahalaadimise aadress</label>
                    <input type="text" value={mahalaadimiseAadress2} onChange={(e) => setMahalaadimiseAadress2(e.target.value)} />
                    {errors.MahalaadimiseAadress2 && <div className="error">{errors.MahalaadimiseAadress2}</div>}
                </div>
                <div>
                    <label>Mahalaadimise kuupäev</label>
                    <input type="date" value={mahalaadimiseKuupäev} onChange={(e) => setMahalaadimiseKuupäev(e.target.value)} required />
                </div>
                <div>
                    <label>Mahalaadimise kuupäev</label>
                    <input type="date" value={mahalaadimiseKuupäev2} onChange={(e) => setMahalaadimiseKuupäev2(e.target.value)} />
                    {errors.MahalaadimiseKuupäev2 && <div className="error">{errors.MahalaadimiseKuupäev2}</div>}
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
                    <label className='bold-label'>Väline tellimusnumber</label>
                    <input type="text" value={välineTellimusnumber} onChange={(e) => setVälineTellimusnumber(e.target.value)} />
                </div>
                <div>
                    <label className='bold-label'>Väline tellimusnumber</label>
                    <input type="text" value={välineTellimusnumber2} onChange={(e) => setVälineTellimusnumber2(e.target.value)} />
                </div>
                <div>
                    <label className='bold-label'>Müügihind</label>
                    <input type="text" value={müügihind} onChange={(e) => setMüügihind(e.target.value)} pattern="\d+(\.\d{1,2})?" required />
                </div>
                <div>
                    <label className='bold-label'>Müügihind</label>
                    <input type="text" value={müügihind2} onChange={(e) => setMüügihind2(e.target.value)} pattern="\d+(\.\d{1,2})?" />
                    {errors.Müügihind2 && <div className="error">{errors.Müügihind2}</div>}
                </div>     
                <div>
                    <label className='bold-label'>Vedaja</label>
                    <Select 
                        className="select-container"
                        value={vedaja}
                        onChange={handleCarrierChange}
                        options={carriers}
                        placeholder="Vali vedaja"
                        styles={customStyles}
                        isClearable={true}
                    />
                    {errors.vedaja && <div className="error">{errors.vedaja}</div>}
                </div>
                <div>
                    <button type="submit">Salvesta</button>
                </div>
                <div>
                    <label className='bold-label'>Auto numbrimärk</label>
                    <input type="text" value={autoNumbrimärk} onChange={(e) => setAutoNumbrimärk(e.target.value)} required />
                </div>
                <div>
                <button type="button" className="generate-purchase-button" onClick={handleGeneratePDF}>Genereeri ostutellimus</button>
                </div>
                <div>
                    <label>Kontakt</label>
                    <input type="text" value={kontakt} onChange={(e) => setKontakt(e.target.value)} />
                </div>
                <div ref={menuRef}>
                    <button type='button'
                        className={`toggle-menu-button ${openMenu === 'status' ? 'open' : ''}`}
                        onClick={() => toggleMenu('status')}
                    >
                        Muuda tellimuse staatust {openMenu === 'status'}
                    </button>
                    {openMenu === 'status' && (
                        <ul className="menu-items">
                            <li onClick={() => handleStatusChange('Kinnitatud')}>Veos kinnitatud</li>
                            <li onClick={() => handleStatusChange('Tühistatud')}>Tühistatud</li>
                        </ul>
                    )}
                </div> 
                <div>
                    <label className='bold-label'>Hind</label>
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
