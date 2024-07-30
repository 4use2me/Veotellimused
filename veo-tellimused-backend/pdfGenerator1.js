const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Kuupäeva vormindamise funktsioon
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Kuud on nullipõhised
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const generatePDF1 = (orderData) => {
    return new Promise((resolve, reject) => {
        // Looge PDF dokument
        const doc = new PDFDocument();
        // Määrake tee, kuhu PDF salvestatakse
        const filePath = path.join(__dirname, `order_${orderData.tellimuseNumber}.pdf`);
        // Looge kirjutamistreem
        const writeStream = fs.createWriteStream(filePath);

        // Kui fontide fail on olemas, asenda tee ja kasutage fonti
        const regularFontPath = path.join(__dirname, 'fonts', 'DejaVuSans.ttf');
        const boldFontPath = path.join(__dirname, 'fonts', 'DejaVuSans-Bold.ttf');

        // Salvestage PDF faili
        doc.pipe(writeStream);

        doc.font(boldFontPath).fontSize(12).text(`${orderData.tellimuseNumber}`);
        doc.moveDown();
        doc.text(`ARVE 1`)
        doc.moveDown();
        doc.font(regularFontPath).text(`${orderData.klient}`);
        doc.moveDown();
        const pealelaadimiseKuup = formatDate(orderData.pealelaadimiseKuupäev);
        const mahalaadimiseKuup = formatDate(orderData.mahalaadimiseKuupäev);
        const vatNumber = orderData.vatNumber;
        if (vatNumber.startsWith('EE')) {
            doc.text(`Transport suunal ${orderData.pealelaadimiseAadress} - ${orderData.mahalaadimiseAadress};`);
            doc.text(`Auto nr ${orderData.autoNumbrimärk}; ${pealelaadimiseKuup} - ${mahalaadimiseKuup}`);
            doc.moveDown();
        } else {
            doc.text(`Transport ${orderData.pealelaadimiseAadress} - ${orderData.mahalaadimiseAadress}`);
            doc.text(`Vehicle no ${orderData.autoNumbrimärk}; ${pealelaadimiseKuup} - ${mahalaadimiseKuup}`);
            doc.moveDown();
        }
        doc.text(`Müügihind: ${orderData.müügihind}`);
        doc.moveDown();
        doc.text(`${orderData.välineTellimusnumber || 'N/A'}`);
        doc.moveDown();
        doc.text(`${orderData.lisainfo || 'N/A'}`);
        doc.moveDown(2);

        doc.font(boldFontPath).text(`ARVE 2`)
        doc.moveDown();
        doc.font(regularFontPath).text(`${orderData.klientII || 'N/A'}`);
        doc.moveDown();
        const pealelaadimiseKuup2 = formatDate(orderData.pealelaadimiseKuupäev2);
        const mahalaadimiseKuup2 = formatDate(orderData.mahalaadimiseKuupäev2);
        const vatNumber2 = orderData.vatNumber2;
        if (vatNumber2.startsWith('EE')) {
            doc.text(`Transport suunal ${orderData.pealelaadimiseAadress2 || 'N/A'} - ${orderData.mahalaadimiseAadress2 || 'N/A'}`); 
            doc.text(`Auto nr ${orderData.autoNumbrimärk || 'N/A'}; ${pealelaadimiseKuup2 || 'N/A'} - ${mahalaadimiseKuup2 || 'N/A'}`);
            doc.moveDown();
        } else {
            doc.text(`Transport ${orderData.pealelaadimiseAadress2 || 'N/A'} - ${orderData.mahalaadimiseAadress2 || 'N/A'}`);
            doc.text(`Vehicle no ${orderData.autoNumbrimärk || 'N/A'}; ${pealelaadimiseKuup2 || 'N/A'} - ${mahalaadimiseKuup2 || 'N/A'}`);
            doc.moveDown();
        }
        doc.text(`Müügihind: ${orderData.müügihind2 || 'N/A'}`);
        doc.moveDown();
        doc.text(`${orderData.välineTellimusnumber2 || 'N/A'}`);
        doc.moveDown();
        doc.text(`${orderData.lisainfo2 || 'N/A'}`);
        
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

module.exports = { generatePDF1 };
