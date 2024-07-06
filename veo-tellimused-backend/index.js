const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// SQL Serveri konfiguratsioon
const dbConfig = {
    user: 'sqluser',
    password: 'Jallekool1',
    server: 'WINDOWS-1DCGN01',
    database: 'Veotellimused',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Loo SQL Serveri ühendus
sql.connect(dbConfig, err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected');
    }
});

// API lõpp-punktid
app.post('/api/tellimused', async (req, res) => {
    const {
        Klient,
        PealelaadimiseEttevõte,
        PealelaadimiseAadress,
        Laadung,
        PealelaadimiseKuupäev,
        MahalaadimiseEttevõte,
        MahalaadimiseAadress,
        MahalaadimiseKuupäev,
        Eritingimus,
        Müügihind,
        VälineTellimusnumber
    } = req.body;

    try {
        const request = new sql.Request();
        const result = await request
            .input('Klient', sql.NVarChar, Klient)
            .input('PealelaadimiseEttevõte', sql.NVarChar, PealelaadimiseEttevõte)
            .input('PealelaadimiseAadress', sql.NVarChar, PealelaadimiseAadress)
            .input('Laadung', sql.NVarChar, Laadung)
            .input('PealelaadimiseKuupäev', sql.Date, PealelaadimiseKuupäev)
            .input('MahalaadimiseEttevõte', sql.NVarChar, MahalaadimiseEttevõte)
            .input('MahalaadimiseAadress', sql.NVarChar, MahalaadimiseAadress)
            .input('MahalaadimiseKuupäev', sql.Date, MahalaadimiseKuupäev)
            .input('Eritingimus', sql.NVarChar, Eritingimus)
            .input('Müügihind', sql.Decimal(10, 2), Müügihind)
            .input('VälineTellimusnumber', sql.NVarChar, VälineTellimusnumber)
            .query(
                `INSERT INTO Tellimused (Klient, PealelaadimiseEttevõte, PealelaadimiseAadress, Laadung, PealelaadimiseKuupäev, 
                    MahalaadimiseEttevõte, MahalaadimiseAadress, MahalaadimiseKuupäev, Eritingimus, Müügihind, 
                    VälineTellimusnumber) 
                VALUES (@Klient, @PealelaadimiseEttevõte, @PealelaadimiseAadress, @Laadung, @PealelaadimiseKuupäev, 
                    @MahalaadimiseEttevõte, @MahalaadimiseAadress, @MahalaadimiseKuupäev, @Eritingimus, @Müügihind, 
                    @VälineTellimusnumber);
                 SELECT SCOPE_IDENTITY() AS id;`
            );

        const orderId = result.recordset[0].id;
        res.status(201).json({ id: orderId });
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(500).send('Server error');
    }
});

app.put('/api/tellimused/:id', async (req, res) => {
    const { id } = req.params;
    const {
        Klient,
        PealelaadimiseEttevõte,
        PealelaadimiseAadress,
        Laadung,
        PealelaadimiseKuupäev,
        MahalaadimiseEttevõte,
        MahalaadimiseAadress,
        MahalaadimiseKuupäev,
        Eritingimus,
        Müügihind,
        VälineTellimusnumber
    } = req.body;

    // Kontrollime, kas ID on number
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
        res.status(400).send('Invalid ID');
        return;
    }

    try {
        const request = new sql.Request();
        await request
            .input('Klient', sql.NVarChar, Klient)
            .input('PealelaadimiseEttevõte', sql.NVarChar, PealelaadimiseEttevõte)
            .input('PealelaadimiseAadress', sql.NVarChar, PealelaadimiseAadress)
            .input('Laadung', sql.NVarChar, Laadung)
            .input('PealelaadimiseKuupäev', sql.Date, PealelaadimiseKuupäev)
            .input('MahalaadimiseEttevõte', sql.NVarChar, MahalaadimiseEttevõte)
            .input('MahalaadimiseAadress', sql.NVarChar, MahalaadimiseAadress)
            .input('MahalaadimiseKuupäev', sql.Date, MahalaadimiseKuupäev)
            .input('Eritingimus', sql.NVarChar, Eritingimus)
            .input('Müügihind', sql.Decimal(10, 2), Müügihind)
            .input('VälineTellimusnumber', sql.NVarChar, VälineTellimusnumber)
            .input('Id', sql.Int, numericId) // Kasuta numericId
            .query(
                `UPDATE Tellimused SET 
                    Klient = @Klient,
                    PealelaadimiseEttevõte = @PealelaadimiseEttevõte,
                    PealelaadimiseAadress = @PealelaadimiseAadress,
                    Laadung = @Laadung,
                    PealelaadimiseKuupäev = @PealelaadimiseKuupäev,
                    MahalaadimiseEttevõte = @MahalaadimiseEttevõte,
                    MahalaadimiseAadress = @MahalaadimiseAadress,
                    MahalaadimiseKuupäev = @MahalaadimiseKuupäev,
                    Eritingimus = @Eritingimus,
                    Müügihind = @Müügihind,
                    VälineTellimusnumber = @VälineTellimusnumber
                WHERE Id = @Id`
            );

        res.status(200).send('Order updated successfully');
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send('Server error');
    }
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
