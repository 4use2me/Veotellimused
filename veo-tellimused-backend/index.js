const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const API_KEY = '5151a18b04a80f82c01cd1c13a1b7bcc';

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
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const request = new sql.Request();
        request.input('Username', sql.NVarChar(50), username);
        request.input('Password', sql.NVarChar(sql.MAX), password);

        const result = await request.execute('dbo.AuthenticateUser');
        const userId = result.returnValue;

        console.log(`Result: ${JSON.stringify(result)}`);  // Logimiseks
        console.log(`UserId: ${userId}`);  // Logimiseks

        if (userId > 0) {
            res.status(200).json({ userId });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Server error');
    }
});

app.post('/api/tellimused', async (req, res) => {
    const {
        Klient,
        KlientII,
        PealelaadimiseEttevõte,
        PealelaadimiseEttevõte2,
        PealelaadimiseAadress,
        PealelaadimiseAadress2,
        Laadung,
        Laadung2,
        PealelaadimiseKuupäev,
        PealelaadimiseKuupäev2,
        MahalaadimiseEttevõte,
        MahalaadimiseEttevõte2,
        MahalaadimiseAadress,
        MahalaadimiseAadress2,
        MahalaadimiseKuupäev,
        MahalaadimiseKuupäev2,
        Eritingimus,
        Eritingimus2,
        Müügihind,
        Müügihind2,
        VälineTellimusnumber,
        VälineTellimusnumber2,
        Vedaja,
        AutoNumbrimärk,
        Kontakt,
        Hind
    } = req.body;

    const newOrder = {
        Klient,
        KlientII,
        PealelaadimiseEttevõte,
        PealelaadimiseEttevõte2,
        PealelaadimiseAadress,
        PealelaadimiseAadress2,
        Laadung,
        Laadung2,
        PealelaadimiseKuupäev,
        PealelaadimiseKuupäev2,
        MahalaadimiseEttevõte,
        MahalaadimiseEttevõte2,
        MahalaadimiseAadress,
        MahalaadimiseAadress2,
        MahalaadimiseKuupäev,
        MahalaadimiseKuupäev2,
        Eritingimus,
        Eritingimus2,
        Müügihind,
        Müügihind2,
        VälineTellimusnumber,
        VälineTellimusnumber2,
        Vedaja,
        AutoNumbrimärk,
        Kontakt,
        Hind,
        Staatus: 'Töös'
    };

    try {
        const tellimuseNumber = await generateOrderNumber();
        const request = new sql.Request();
        const result = await request
            .input('TellimuseNumber', sql.NVarChar, tellimuseNumber)
            .input('Klient', sql.NVarChar, Klient)
            .input('KlientII', sql.NVarChar, KlientII)
            .input('PealelaadimiseEttevõte', sql.NVarChar, PealelaadimiseEttevõte)
            .input('PealelaadimiseEttevõte2', sql.NVarChar, PealelaadimiseEttevõte2)
            .input('PealelaadimiseAadress', sql.NVarChar, PealelaadimiseAadress)
            .input('PealelaadimiseAadress2', sql.NVarChar, PealelaadimiseAadress2)
            .input('Laadung', sql.NVarChar, Laadung)
            .input('Laadung2', sql.NVarChar, Laadung2)
            .input('PealelaadimiseKuupäev', sql.Date, PealelaadimiseKuupäev)
            .input('PealelaadimiseKuupäev2', sql.Date, PealelaadimiseKuupäev2)
            .input('MahalaadimiseEttevõte', sql.NVarChar, MahalaadimiseEttevõte)
            .input('MahalaadimiseEttevõte2', sql.NVarChar, MahalaadimiseEttevõte2)
            .input('MahalaadimiseAadress', sql.NVarChar, MahalaadimiseAadress)
            .input('MahalaadimiseAadress2', sql.NVarChar, MahalaadimiseAadress2)
            .input('MahalaadimiseKuupäev', sql.Date, MahalaadimiseKuupäev)
            .input('MahalaadimiseKuupäev2', sql.Date, MahalaadimiseKuupäev2)
            .input('Eritingimus', sql.NVarChar, Eritingimus)
            .input('Eritingimus2', sql.NVarChar, Eritingimus2)
            .input('Müügihind', sql.Decimal(10, 2), Müügihind)
            .input('Müügihind2', sql.Decimal(10, 2), Müügihind2)
            .input('VälineTellimusnumber', sql.NVarChar, VälineTellimusnumber)
            .input('VälineTellimusnumber2', sql.NVarChar, VälineTellimusnumber2)
            .input('Vedaja', sql.NVarChar, Vedaja)
            .input('AutoNumbrimärk', sql.NVarChar, AutoNumbrimärk)
            .input('Kontakt', sql.NVarChar, Kontakt)
            .input('Hind', sql.Decimal(10, 2), Hind)
            .input('Staatus', sql.NVarChar, newOrder.Staatus)
            .query(
                `INSERT INTO Tellimused (TellimuseNumber, Klient, KlientII, PealelaadimiseEttevõte, 
                    PealelaadimiseEttevõte2, PealelaadimiseAadress, PealeLaadimiseAadress2, Laadung, Laadung2, 
                    PealelaadimiseKuupäev, PealelaadimiseKuupäev2, MahalaadimiseEttevõte, MahalaadimiseEttevõte2, 
                    MahalaadimiseAadress, MahalaadimiseAadress2, MahalaadimiseKuupäev, MahalaadimiseKuupäev2, 
                    Eritingimus, Eritingimus2, Müügihind, Müügihind2, VälineTellimusnumber, VälineTellimusnumber2, 
                    Vedaja, AutoNumbrimärk, Kontakt, Hind, Staatus, createdAt) 
                VALUES (@TellimuseNumber, @Klient, @KlientII, @PealelaadimiseEttevõte, @PealelaadimiseEttevõte2, 
                    @PealelaadimiseAadress, @PealelaadimiseAadress2, @Laadung, @Laadung2, @PealelaadimiseKuupäev, 
                    @PealelaadimiseKuupäev2, @MahalaadimiseEttevõte, @MahalaadimiseEttevõte2, 
                    @MahalaadimiseAadress, @MahalaadimiseAadress2, @MahalaadimiseKuupäev, @MahalaadimiseKuupäev2, 
                    @Eritingimus, @Eritingimus2, @Müügihind, @Müügihind2, @VälineTellimusnumber, 
                    @VälineTellimusnumber2, @Vedaja, @AutoNumbrimärk, @Kontakt, @Hind, @Staatus, GETDATE());
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

app.post('/api/users', async (req, res) => {
    const {
        Forename,
        Surname,
        EMail,
        Phone,
        Username,
        Password
    } = req.body;

    try {
        const request = new sql.Request();
        const result = await request
            .input('Forename', sql.NVarChar, Forename)
            .input('Surname', sql.NVarChar, Surname)
            .input('EMail', sql.NVarChar, EMail)
            .input('Phone', sql.NVarChar, Phone)
            .input('Username', sql.NVarChar, Username)
            .input('Password', sql.NVarChar, Password)
            .query(
                `INSERT INTO Users (Forename, Surname, EMail, Phone, Username, Password, 
                    createdAt) 
                VALUES (@Forename, @Surname, @EMail, @Phone, @Username, @Password, GETDATE());
                 SELECT SCOPE_IDENTITY() AS id;`
            );

        const userId = result.recordset[0].id;
        res.status(201).json({ id: userId });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Server error');
    }
});

app.put('/api/tellimused/:id', async (req, res) => {
    const { id } = req.params;
    const {
        Klient,
        KlientII,
        PealelaadimiseEttevõte,
        PealelaadimiseEttevõte2,
        PealelaadimiseAadress,
        PealelaadimiseAadress2,
        Laadung,
        Laadung2,
        PealelaadimiseKuupäev,
        PealelaadimiseKuupäev2,
        MahalaadimiseEttevõte,
        MahalaadimiseEttevõte2,
        MahalaadimiseAadress,
        MahalaadimiseAadress2,
        MahalaadimiseKuupäev,
        MahalaadimiseKuupäev2,
        Eritingimus,
        Eritingimus2,
        Müügihind,
        Müügihind2,
        VälineTellimusnumber,
        VälineTellimusnumber2,
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
            .input('KlientII', sql.NVarChar, KlientII)
            .input('PealelaadimiseEttevõte', sql.NVarChar, PealelaadimiseEttevõte)
            .input('PealelaadimiseEttevõte2', sql.NVarChar, PealelaadimiseEttevõte2)
            .input('PealelaadimiseAadress', sql.NVarChar, PealelaadimiseAadress)
            .input('PealelaadimiseAadress2', sql.NVarChar, PealelaadimiseAadress2)
            .input('Laadung', sql.NVarChar, Laadung)
            .input('Laadung2', sql.NVarChar, Laadung2)
            .input('PealelaadimiseKuupäev', sql.Date, PealelaadimiseKuupäev)
            .input('PealelaadimiseKuupäev2', sql.Date, PealelaadimiseKuupäev2)
            .input('MahalaadimiseEttevõte', sql.NVarChar, MahalaadimiseEttevõte)
            .input('MahalaadimiseEttevõte2', sql.NVarChar, MahalaadimiseEttevõte2)
            .input('MahalaadimiseAadress', sql.NVarChar, MahalaadimiseAadress)
            .input('MahalaadimiseAadress2', sql.NVarChar, MahalaadimiseAadress2)
            .input('MahalaadimiseKuupäev', sql.Date, MahalaadimiseKuupäev)
            .input('MahalaadimiseKuupäev2', sql.Date, MahalaadimiseKuupäev2)
            .input('Eritingimus', sql.NVarChar, Eritingimus)
            .input('Eritingimus2', sql.NVarChar, Eritingimus2)
            .input('Müügihind', sql.Decimal(10, 2), Müügihind)
            .input('Müügihind2', sql.Decimal(10, 2), Müügihind2)
            .input('VälineTellimusnumber', sql.NVarChar, VälineTellimusnumber)
            .input('VälineTellimusnumber2', sql.NVarChar, VälineTellimusnumber2)
            .input('Vedaja', sql.NVarChar, Vedaja)
            .input('AutoNumbrimärk', sql.NVarChar, AutoNumbrimärk)
            .input('Kontakt', sql.NVarChar, Kontakt)
            .input('Hind', sql.Decimal(10, 2), Hind)
            .input('Id', sql.Int, numericId) // Kasuta numericId
            .query(
                `UPDATE Tellimused SET 
                    Klient = @Klient,
                    KlientII = @KlientII,
                    PealelaadimiseEttevõte = @PealelaadimiseEttevõte,
                    PealelaadimiseEttevõte2 = @PealelaadimiseEttevõte2,
                    PealelaadimiseAadress = @PealelaadimiseAadress,
                    PealelaadimiseAadress2 = @PealelaadimiseAadress2,
                    Laadung = @Laadung,
                    Laadung2 = @Laadung2,
                    PealelaadimiseKuupäev = @PealelaadimiseKuupäev,
                    PealelaadimiseKuupäev2 = @PealelaadimiseKuupäev2,
                    MahalaadimiseEttevõte = @MahalaadimiseEttevõte,
                    MahalaadimiseEttevõte2 = @MahalaadimiseEttevõte2,
                    MahalaadimiseAadress = @MahalaadimiseAadress,
                    MahalaadimiseAadress2 = @MahalaadimiseAadress2,
                    MahalaadimiseKuupäev = @MahalaadimiseKuupäev,
                    MahalaadimiseKuupäev2 = @MahalaadimiseKuupäev2,
                    Eritingimus = @Eritingimus,
                    Eritingimus2 = @Eritingimus2,
                    Müügihind = @Müügihind,
                    Müügihind2 = @Müügihind2,
                    VälineTellimusnumber = @VälineTellimusnumber,
                    VälineTellimusnumber2 = @VälineTellimusnumber2,
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

// Ainult staatuse uuendamine
app.put('/api/tellimused/:id/status', async (req, res) => {
    const { id } = req.params;
    const { Staatus } = req.body;

    console.log('Uuendamine ID-ga:', id, 'Staatus:', Staatus);

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
        res.status(400).send('Invalid ID');
        return;
    }

    try {
        const request = new sql.Request();
        await request
            .input('Staatus', sql.NVarChar, Staatus)
            .input('id', sql.Int, numericId)
            .query('UPDATE tellimused SET Staatus = @Staatus WHERE id = @id');

        res.status(200).send('Staatus edukalt uuendatud');
    } catch (error) {
        console.error('Viga staatuse uuendamisel:', error);
        res.status(500).send('Staatuse muutmise ebaõnnestumine');
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

app.put('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    const {
        Name,
        RegistryCode,
        VatNumber,
        Address,
        Phone,
        EMail,
        AccountantEMail,
        HomePage,
        Bank,
        Swift,
        Iban
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
            .input('Name', sql.NVarChar, Name)
            .input('RegistryCode', sql.NVarChar, RegistryCode)
            .input('VatNumber', sql.NVarChar, VatNumber)
            .input('Address', sql.NVarChar, Address)
            .input('Phone', sql.NVarChar, Phone)
            .input('EMail', sql.NVarChar, EMail)
            .input('AccountantEMail', sql.NVarChar, AccountantEMail)
            .input('HomePage', sql.NVarChar, HomePage)
            .input('Bank', sql.NVarChar, Bank)
            .input('Swift', sql.NVarChar, Swift)
            .input('Iban', sql.NVarChar, Iban)
            .input('Id', sql.Int, numericId) 
            .query(
                `UPDATE Data SET 
                    Name = @Name,
                    RegistryCode = @RegistryCode,
                    VatNumber = @VatNumber,
                    Address = @Address,
                    Phone = @Phone,
                    EMail = @EMail,
                    AccountantEMail = @AccountantEMail,
                    HomePage = @HomePage,
                    Bank = @Bank,
                    Swift = @Swift,
                    Iban = @Iban
                WHERE Id = @Id`
            );

        res.status(200).send('Data updated successfully');
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).send('Server error');
    }
});

app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const {
        Forename,
        Surname,
        EMail,
        Phone,
        Username,
        Password
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
            .input('Forename', sql.NVarChar, Forename)
            .input('Surname', sql.NVarChar, Surname)
            .input('EMail', sql.NVarChar, EMail)
            .input('Phone', sql.NVarChar, Phone)
            .input('Username', sql.NVarChar, Username)
            .input('Password', sql.NVarChar, Password)
            .input('Id', sql.Int, numericId) 
            .query(
                `UPDATE Users SET 
                    Forename = @Forename,
                    Surname = @Surname,
                    EMail = @EMail,
                    Phone = @Phone,
                    Username = @Username,
                    Password = @Password
                WHERE Id = @Id`
            );

        res.status(200).send('User updated successfully');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/tellimused', async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT id, TellimuseNumber, Klient, KlientII, Vedaja, Staatus FROM Tellimused');
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

// Backend: kontrollige, kas klient on olemas
app.get('/api/kliendid/check', async (req, res) => {
    const { äriregistrikood } = req.query;

    if (!äriregistrikood) {
        return res.status(400).json({ error: 'Registry code is required' });
    }

    try {
        const request = new sql.Request();
        const result = await request
            .input('Äriregistrikood', sql.NVarChar, äriregistrikood)
            .query('SELECT COUNT(*) AS count FROM Kliendid WHERE Äriregistrikood = @Äriregistrikood');

        const exists = result.recordset[0].count > 0;
        res.json({ exists });
    } catch (error) {
        console.error('Error checking client existence:', error.message);
        res.status(500).send('Internal Server Error');
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

app.get('/api/validate-vat', async (req, res) => {
    const vatNumber = req.query.vatNumber;
    try {
        const response = await axios.get(`http://apilayer.net/api/validate?access_key=${API_KEY}&vat_number=${vatNumber}`);
        if (response.data && response.data.valid) {
            res.json({
                valid: response.data.valid,
                company_name: response.data.company_name,
                company_address: response.data.company_address
            });
        } else {
            res.json({ valid: false });
        }
    } catch (error) {
        console.error('Error validating VAT number:', error.message);
        res.status(500).json({ error: 'Error validating VAT number' });
    }
});

// Backend: kontrollige, kas vedaja on olemas
app.get('/api/carriers/check', async (req, res) => {
    const { registryCode } = req.query;

    if (!registryCode) {
        return res.status(400).json({ error: 'Registry code is required' });
    }

    try {
        const request = new sql.Request();
        const result = await request
            .input('RegistryCode', sql.NVarChar, registryCode)
            .query('SELECT COUNT(*) AS count FROM Carriers WHERE RegistryCode = @RegistryCode');

        const exists = result.recordset[0].count > 0;
        res.json({ exists });
    } catch (error) {
        console.error('Error checking carrier existence:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/data', async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT * FROM Data');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT id, Forename, Surname, EMail, Phone FROM Users');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching users:', error);
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

app.get('/api/users/:id', async (req, res) => {
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
            .query('SELECT * FROM Users WHERE Id = @Id');

        if (result.recordset.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json(result.recordset[0]);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Server error');
    }
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
