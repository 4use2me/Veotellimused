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


// API endpoints
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
        Vedaja,
        AutoNumbrimärk,
        Kontakt,
        Hind
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
            .input('AutoNumbrimärk', sql.NVarChar, AutoNumbrimärk)
            .input('Kontakt', sql.NVarChar, Kontakt)
            .input('Hind', sql.Decimal(10, 2), Hind)
            .query(
                `INSERT INTO Tellimused (TellimuseNumber, Klient, PealelaadimiseEttevõte, PealelaadimiseAadress, Laadung, PealelaadimiseKuupäev, 
                    MahalaadimiseEttevõte, MahalaadimiseAadress, MahalaadimiseKuupäev, Eritingimus, Müügihind, 
                    VälineTellimusnumber, Vedaja, AutoNumbrimärk, Kontakt, Hind, createdAt) 
                VALUES (@TellimuseNumber, @Klient, @PealelaadimiseEttevõte, @PealelaadimiseAadress, @Laadung, @PealelaadimiseKuupäev, 
                    @MahalaadimiseEttevõte, @MahalaadimiseAadress, @MahalaadimiseKuupäev, @Eritingimus, @Müügihind, 
                    @VälineTellimusnumber, @Vedaja, @AutoNumbrimärk, @Kontakt, @Hind, GETDATE());
                 SELECT SCOPE_IDENTITY() AS id;`
            );

        const orderId = result.recordset[0].id;
        res.status(201).json({ id: orderId, tellimuseNumber });
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(500).send('Server error');
    }
});

app.post('/api/kliendid', async (req, res) => {
    const {
        Ettevõte,
        Aadress,
        EPost,
        Telefon,
        Äriregistrikood,
        KäibemaksukohustuslaseNumber,
        Maksetähtaeg
    } = req.body;

    try {
        const request = new sql.Request();
        const result = await request
            .input('Ettevõte', sql.NVarChar, Ettevõte)
            .input('Aadress', sql.NVarChar, Aadress)
            .input('EPost', sql.NVarChar, EPost)
            .input('Telefon', sql.NVarChar, Telefon)
            .input('Äriregistrikood', sql.NVarChar, Äriregistrikood)
            .input('KäibemaksukohustuslaseNumber', sql.NVarChar, KäibemaksukohustuslaseNumber)
            .input('Maksetähtaeg', sql.Int, Maksetähtaeg)
            .query(
                `INSERT INTO Kliendid (Ettevõte, Aadress, EPost, Telefon, Äriregistrikood, 
                    KäibemaksukohustuslaseNumber, Maksetähtaeg, createdAt) 
                VALUES (@Ettevõte, @Aadress, @EPost, @Telefon, @Äriregistrikood, @KäibemaksukohustuslaseNumber, 
                    @Maksetähtaeg, GETDATE());
                 SELECT SCOPE_IDENTITY() AS id;`
            );

        const clientId = result.recordset[0].id;
        res.status(201).json({ id: clientId });
    } catch (error) {
        console.error('Error adding client:', error);
        res.status(500).send('Server error');
    }
});

app.post('/api/carriers', async (req, res) => {
    const {
        Company,
        Address,
        EMail,
        Phone,
        RegistryCode,
        VatNumber,
        PaymentTerm
    } = req.body;

    try {
        const request = new sql.Request();
        const result = await request
            .input('Company', sql.NVarChar, Company)
            .input('Address', sql.NVarChar, Address)
            .input('EMail', sql.NVarChar, EMail)
            .input('Phone', sql.NVarChar, Phone)
            .input('RegistryCode', sql.NVarChar, RegistryCode)
            .input('VatNumber', sql.NVarChar, VatNumber)
            .input('PaymentTerm', sql.Int, PaymentTerm)
            .query(
                `INSERT INTO Carriers (Company, Address, EMail, Phone, RegistryCode, VatNumber, PaymentTerm, 
                    createdAt) 
                VALUES (@Company, @Address, @EMail, @Phone, @RegistryCode, @VatNumber, @PaymentTerm, GETDATE());
                 SELECT SCOPE_IDENTITY() AS id;`
            );

        const carrierId = result.recordset[0].id;
        res.status(201).json({ id: carrierId });
    } catch (error) {
        console.error('Error adding carrier:', error);
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
        Vedaja,
        AutoNumbrimärk,
        Kontakt,
        Hind
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
            .input('AutoNumbrimärk', sql.NVarChar, AutoNumbrimärk)
            .input('Kontakt', sql.NVarChar, Kontakt)
            .input('Hind', sql.Decimal(10, 2), Hind)
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
                    Vedaja = @Vedaja,
                    AutoNumbrimärk = @AutoNumbrimärk,
                    Kontakt = @Kontakt,
                    Hind = @Hind
                WHERE Id = @Id`
            );

        res.status(200).send('Order updated successfully');
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send('Server error');
    }
});

app.put('/api/kliendid/:id', async (req, res) => {
    const { id } = req.params;
    const {
        Ettevõte,
        Aadress,
        EPost,
        Telefon,
        Äriregistrikood,
        KäibemaksukohustuslaseNumber,
        Maksetähtaeg
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
            .input('Ettevõte', sql.NVarChar, Ettevõte)
            .input('Aadress', sql.NVarChar, Aadress)
            .input('EPost', sql.NVarChar, EPost)
            .input('Telefon', sql.NVarChar, Telefon)
            .input('Äriregistrikood', sql.NVarChar, Äriregistrikood)
            .input('KäibemaksukohustuslaseNumber', sql.NVarChar, KäibemaksukohustuslaseNumber)
            .input('Maksetähtaeg', sql.Int, Maksetähtaeg)
            .input('Id', sql.Int, numericId) // Kasuta numericId
            .query(
                `UPDATE Kliendid SET 
                    Ettevõte = @Ettevõte,
                    Aadress = @Aadress,
                    EPost = @EPost,
                    Telefon = @Telefon,
                    Äriregistrikood = @Äriregistrikood,
                    KäibemaksukohustuslaseNumber = @KäibemaksukohustuslaseNumber,
                    Maksetähtaeg = @Maksetähtaeg
                WHERE Id = @Id`
            );

        res.status(200).send('Client updated successfully');
    } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).send('Server error');
    }
});

app.put('/api/carriers/:id', async (req, res) => {
    const { id } = req.params;
    const {
        Company,
        Address,
        EMail,
        Phone,
        RegistryCode,
        VatNumber,
        PaymentTerm
    } = req.body;

    // We check if ID is a number
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
        res.status(400).send('Invalid ID');
        return;
    }

    try {
        const request = new sql.Request();
        await request
            .input('Company', sql.NVarChar, Company)
            .input('Address', sql.NVarChar, Address)
            .input('EMail', sql.NVarChar, EMail)
            .input('Phone', sql.NVarChar, Phone)
            .input('RegistryCode', sql.NVarChar, RegistryCode)
            .input('VatNumber', sql.NVarChar, VatNumber)
            .input('PaymentTerm', sql.Int, PaymentTerm)
            .input('Id', sql.Int, numericId) 
            .query(
                `UPDATE Carriers SET 
                    Company = @Company,
                    Address = @Address,
                    EMail = @EMail,
                    Phone = @Phone,
                    RegistryCode = @RegistryCode,
                    VatNumber = @VatNumber,
                    PaymentTerm = @PaymentTerm
                WHERE Id = @Id`
            );

        res.status(200).send('Carrier updated successfully');
    } catch (error) {
        console.error('Error updating carrier:', error);
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

app.get('/api/kliendid', async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT id, Ettevõte, EPost, Telefon, Äriregistrikood  FROM Kliendid');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/carriers', async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT id, Company, EMail, Phone, RegistryCode  FROM Carriers');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching carriers:', error);
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

app.get('/api/kliendid/:id', async (req, res) => {
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
            .query('SELECT * FROM Kliendid WHERE Id = @Id');

        if (result.recordset.length === 0) {
            res.status(404).send('Client not found');
        } else {
            res.status(200).json(result.recordset[0]);
        }
    } catch (error) {
        console.error('Error fetching client:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/carriers/:id', async (req, res) => {
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
            .query('SELECT * FROM Carriers WHERE Id = @Id');

        if (result.recordset.length === 0) {
            res.status(404).send('Carrier not found');
        } else {
            res.status(200).json(result.recordset[0]);
        }
    } catch (error) {
        console.error('Error fetching carrier:', error);
        res.status(500).send('Server error');
    }
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
