const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generatePDF = (orderData) => {
    return new Promise((resolve, reject) => {
        // Looge PDF dokument
        const doc = new PDFDocument();
        // Määrake tee, kuhu PDF salvestatakse
        const filePath = path.join(__dirname, `order_${orderData.tellimuseNumber}.pdf`);
        // Looge kirjutamistreem
        const writeStream = fs.createWriteStream(filePath);

        // Kui fontide fail on olemas, asenda tee ja kasutage fonti
        const fontPath = path.join(__dirname, 'fonts', 'DejaVuSans.ttf');
        if (fs.existsSync(fontPath)) {
            doc.font(fontPath);
        } else {
            console.warn('Font file does not exist:', fontPath);
            // Kui fonti ei leita, kasuta vaikimisi fonti
            doc.font('Helvetica');
        }

        // Salvestage PDF faili
        doc.pipe(writeStream);

        // Lisa tekst PDF-i
        doc.fontSize(25).text('Veotellimus', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Tellimuse number: ${orderData.tellimuseNumber}`);
        doc.text(`Ettevõte: ${orderData.vedaja}`);
        doc.text(`Pealelaadimise ettevõte / aadress: ${orderData.pealelaadimiseEttevõte} / ${orderData.pealelaadimiseAadress}`);
        doc.text(`Laadung: ${orderData.laadung}`);
        doc.text(`Pealelaadimise kuupäev: ${orderData.pealelaadimiseKuupäev}`);
        doc.text(`Mahalaadimise ettevõte / aadress: ${orderData.mahalaadimiseEttevõte} / ${orderData.mahalaadimiseAadress}`);
        doc.text(`Mahalaadimise kuupäev: ${orderData.mahalaadimiseKuupäev}`);
        doc.text(`Eritingimus: ${orderData.eritingimus || 'Ei ole määratud'}`); // Kui eritingimus puudub, kuva 'Ei ole määratud'
        doc.moveDown();
        doc.text(`Hind: ${orderData.hind}`);

        // Lõpeta PDF dokument
        doc.end();

        // Jälgi faili kirjutamise lõppu ja edasta faili tee
        writeStream.on('finish', () => {
            resolve(filePath);
        });

        // Jälgi kirjutamisviga
        writeStream.on('error', (error) => {
            reject(error);
        });
    });
};

module.exports = { generatePDF };
