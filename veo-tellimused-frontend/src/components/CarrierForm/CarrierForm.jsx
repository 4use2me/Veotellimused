import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarrierForm.css';

const CarrierForm = ({ initialData, onCarrierDataChange, onCarrierAdded }) => {
    const [carrierId, setCarrierId] = useState(initialData ? initialData.id : null);
    const [company, setCompany] = useState(initialData ? initialData.Company : '');
    const [address, setAddress] = useState(initialData ? initialData.Address : '');
    const [eMail, setEMail] = useState(initialData ? initialData.EMail : '');
    const [phone, setPhone] = useState(initialData ? initialData.Phone : '');
    const [registryCode, setRegistryCode] = useState(initialData ? initialData.RegistryCode : '');
    const [vatNumber, setVatNumber] = useState(initialData ? initialData.VatNumber : '');
    const [paymentTerm, setPaymentTerm] = useState(initialData ? initialData.PaymentTerm : '');

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
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            console.error('Error adding / updating the carrier:', error);
            alert('Vedaja lisamine / uuendamine ebaõnnestus');
        }
    };

    return (
        <div className="carrier-form">
            <h2>Lisa vedaja</h2>
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
                    <input type="text" value={eMail} onChange={(e) => setEMail(e.target.value)} required />
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
                </div>
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
