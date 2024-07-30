import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarrierForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const CarrierForm = ({ initialData, onCarrierDataChange, onCarrierAdded }) => {
    const [carrierId, setCarrierId] = useState(initialData ? initialData.id : null);
    const [company, setCompany] = useState(initialData ? initialData.Company : '');
    const [address, setAddress] = useState(initialData ? initialData.Address : '');
    const [eMail, setEMail] = useState(initialData ? initialData.EMail : '');
    const [phone, setPhone] = useState(initialData ? initialData.Phone : '');
    const [registryCode, setRegistryCode] = useState(initialData ? initialData.RegistryCode : '');
    const [vatNumber, setVatNumber] = useState(initialData ? initialData.VatNumber : '');
    const [paymentTerm, setPaymentTerm] = useState(initialData ? initialData.PaymentTerm : '');
    const [error, setError] = useState('');
    const [duplicateError, setDuplicateError] = useState('');
    const [vatValidated, setVatValidated] = useState(false);

    useEffect(() => {
        if (initialData) {
            setCarrierId(initialData.id);
            setCompany(initialData.Company);
            setAddress(initialData.Address);
            setEMail(initialData.EMail);
            setPhone(initialData.Phone);
            setRegistryCode(initialData.RegistryCode);
            setVatNumber(initialData.VatNumber);
            setPaymentTerm(initialData.PaymentTerm);
            setVatValidated(true); // Kui andmed on algselt olemas, eeldame, et VAT on valideeritud
        }
    }, [initialData]);

    const handleVatValidation = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/validate-vat', {
                params: { vatNumber }
            });

            if (response.data.valid) {
                setCompany(response.data.company_name);
                setAddress(response.data.company_address);
                setVatValidated(true);
                setError('');
            } else {
                setError('Kehtetu käibemaksukohustuslase number.');
                setVatValidated(false);
            }
        } catch (error) {
            console.error('Error validating VAT number:', error.message);
            setError('Käibemaksukohustuslase numbri valideerimine ebaõnnestus.');
            setVatValidated(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setDuplicateError('');

        // Kontrollid ainult uue vedaja lisamisel
        if (!carrierId) {
            if (!vatNumber.startsWith('EE')) {
                if (!vatValidated) {
                    setError('Käibemaksukohustuslase number ei ole valideeritud.');
                    return;
                }
            }    

            if (!company || !address) {
                setError('Ettevõtte nimi ja aadress peavad olema täidetud.');
                return;
            }

            // Kontrolli, kas vedaja juba eksisteerib ainult uue vedaja lisamisel
            try {
                const response = await axios.get('http://localhost:5000/api/carriers/check', {
                    params: { vatNumber }
                });

                if (response.data.exists) {
                    setDuplicateError('Selline vedaja on juba olemas.');
                    return;
                }
            } catch (error) {
                console.error('Error checking carrier existence:', error.message);
                alert('Vedaja olemasolu kontrollimine ebaõnnestus');
                return;
            }
        }

        // Kui kõik kontrollid on läbitud, salvesta andmed
        const carrierData = {
            Company: company,
            Address: address,
            EMail: eMail,
            Phone: phone,
            RegistryCode: registryCode,
            VatNumber: vatNumber,
            PaymentTerm: paymentTerm
        };

        try {
            if (carrierId) {
                await axios.put(`http://localhost:5000/api/carriers/${carrierId}`, carrierData);
                alert('Vedaja edukalt uuendatud');
                onCarrierDataChange({ ...carrierData, id: carrierId });
            } else {
                const response = await axios.post('http://localhost:5000/api/carriers', carrierData);
                setCarrierId(response.data.id);
                alert('Vedaja edukalt lisatud');
                onCarrierAdded(response.data);
            }
        } catch (error) {
            console.error('Error adding / updating the carrier:', error.message);
            alert('Vedaja lisamine / uuendamine ebaõnnestus');
        }
    };

    return (
        <div className="carrier-form">
            <h2>{carrierId ? 'Uuenda vedaja andmeid' : 'Lisa vedaja'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Ettevõte</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
                </div>
                <div>
                    <label>Aadress</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label>E-post</label>
                    <div className="input-with-icon">
                        <input
                            type="email"
                            value={eMail}
                            onChange={(e) => setEMail(e.target.value)}
                            className="email-input"
                            required
                        />
                        {eMail && (
                            <a href={`mailto:${eMail}`} className="email-icon" title="Send email">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </a>
                        )}
                    </div>
                </div>
                <div>
                    <label>Telefon</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div>
                    <label>Äriregistrikood</label>
                    <input type="text" value={registryCode} onChange={(e) => setRegistryCode(e.target.value)} required />
                </div>
                <div>
                    <label>Käibemaksukohustuslase number</label>
                    <input type="text" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} />
                    <button type="button" onClick={handleVatValidation}>Valideeri VAT number</button>
                </div>
                {error && <div className="error">{error}</div>}
                {duplicateError && <div className="error">{duplicateError}</div>}
                <div>
                    <label>Maksetähtaeg</label>
                    <input type="number" value={paymentTerm} onChange={(e) => setPaymentTerm(e.target.value)} required />
                </div>
                <button type="submit">Salvesta</button>
            </form>
        </div>
    );
};

export default CarrierForm;
