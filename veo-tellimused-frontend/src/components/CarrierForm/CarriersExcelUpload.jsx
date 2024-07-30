import React, { useState } from 'react';
import axios from 'axios';

const CarriersExcelUpload = ({ onCarriersImported }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/carriers/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert(response.data.message);
            onCarriersImported(); // Call this to refresh carrier list or do other actions
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('File upload failed');
        }
    };

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Excel</button>
        </div>
    );
};

export default CarriersExcelUpload;
