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

const generateOrderNumber = async () => {
    try {
        const today = new Date();
        const year = today.getFullYear().toString().slice(-2); // Võtab aasta kahetäheliseks
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Kuu arv kahetäheliseks
        const day = today.getDate().toString().padStart(2, '0'); // Päeva number kahetäheliseks
        const formattedDate = `${year}${month}${day}`;

        const request = new sql.Request();
        const result = await request.query(`
            SELECT COUNT(*) AS count FROM Tellimused WHERE CONVERT(date, createdAt) = '${formattedDate}'
        `);
        const count = result.recordset[0].count + 1;
        return `${formattedDate}${count.toString().padStart(2, '0')}`;
    } catch (error) {
        console.error('Error generating order number:', error);
        throw error;
    }
};


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
        VälineTellimusnumber,
        Vedaja
    } = req.body;

    try {
        const tellimuseNumber = await generateOrderNumber();
        const request = new sql.Request();
        const result = await request
            .input('TellimuseNumber', sql.NVarChar, tellimuseNumber)
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
            .input('Vedaja', sql.NVarChar, Vedaja)
            .query(
                `INSERT INTO Tellimused (TellimuseNumber, Klient, PealelaadimiseEttevõte, PealelaadimiseAadress, Laadung, PealelaadimiseKuupäev, 
                    MahalaadimiseEttevõte, MahalaadimiseAadress, MahalaadimiseKuupäev, Eritingimus, Müügihind, 
                    VälineTellimusnumber, Vedaja, createdAt) 
                VALUES (@TellimuseNumber, @Klient, @PealelaadimiseEttevõte, @PealelaadimiseAadress, @Laadung, @PealelaadimiseKuupäev, 
                    @MahalaadimiseEttevõte, @MahalaadimiseAadress, @MahalaadimiseKuupäev, @Eritingimus, @Müügihind, 
                    @VälineTellimusnumber, @Vedaja, GETDATE());
                 SELECT SCOPE_IDENTITY() AS id;`
            );

        const orderId = result.recordset[0].id;
        res.status(201).json({ id: orderId, tellimuseNumber });
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
        VälineTellimusnumber,
        Vedaja
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
            .input('Vedaja', sql.NVarChar, Vedaja)
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
                    VälineTellimusnumber = @VälineTellimusnumber,
                    Vedaja = @Vedaja
                WHERE Id = @Id`
            );

        res.status(200).send('Order updated successfully');
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/tellimused', async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT id, TellimuseNumber, Klient, Vedaja FROM Tellimused');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/tellimused/:id', async (req, res) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
        res.status(400).send('Invalid ID');
        return;
    }

    try {
        const request = new sql.Request();
        const result = await request
            .input('Id', sql.Int, numericId)
            .query('SELECT * FROM Tellimused WHERE Id = @Id');

        if (result.recordset.length === 0) {
            res.status(404).send('Order not found');
        } else {
            res.status(200).json(result.recordset[0]);
        }
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).send('Server error');
    }
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
