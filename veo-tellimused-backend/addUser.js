const bcrypt = require('bcrypt');
const sql = require('mssql');

const saltRounds = 10;
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

async function addUser(forename, surname, email, phone, username, password) {
    try {
        // Hashi parool
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Loo SQL Serveri ühendus
        await sql.connect(dbConfig);

        // Loo SQL päring kasutaja lisamiseks
        const request = new sql.Request();
        request.input('Forename', sql.NVarChar(50), forename);
        request.input('Surname', sql.NVarChar(50), surname);
        request.input('Email', sql.NVarChar(100), email);
        request.input('Phone', sql.NVarChar(15), phone);
        request.input('Username', sql.NVarChar(50), username);
        request.input('Password', sql.NVarChar(sql.MAX), hashedPassword);
        request.input('CreatedAt', sql.DateTime, new Date());

        // Täida stored procedure või päring
        await request.execute('dbo.AddUser'); // Muutke 'AddUser' sobiva stored procedure nimega

        console.log('User added successfully');
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// Näide kasutusest
addUser('Reena', 'Kuusil', 'reena@ekspediitor.ee', '7654321', 'Kaks2kolm', 'Kakskaks3');

//käsklus: node addUser.js