import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUpload = ({ setClients }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
    };

    const handleFileUpload = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                const clientsData = jsonData.slice(1).map(row => ({
                    Ettevõte: row[0],
                    Aadress: [
                        row[3], // Tänav
                        row[7],  // Sihtnumber
                        row[4], // Linn/asula
                        row[6], // Maakond
                        row[8] // Riik 
                    ].filter(Boolean).join(', '),
                    EPost: row[5],
                    Telefon: row[2],
                    Äriregistrikood: row[1],
                    KäibemaksukohustuslaseNumber: row[10],
                    Maksetähtaeg: row[9]
                }));
                
                setClients(clientsData);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
};

export default ExcelUpload;
