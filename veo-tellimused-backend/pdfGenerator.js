const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generatePDF = (orderData, dataData) => {
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

        // Kontrolli, kas fontide failid eksisteerivad
        if (!fs.existsSync(regularFontPath) || !fs.existsSync(boldFontPath)) {
            console.error('Font file does not exist.');
            doc.font('Helvetica'); // Vaikimisi font kui kohandatud font puudub
        }

        // Salvestage PDF faili
        doc.pipe(writeStream);

        // Tabeli algus
        const tableTop = 300;
        const tableLeft = 50;
        const rowHeight = 24;
        const columnWidth = [170, 350];

        if (dataData && dataData.length > 0) {
            const company = dataData[0];
            doc.font(boldFontPath).fontSize(20).text(`${company.Name || 'N/A'}`, tableLeft);
            doc.font(regularFontPath).fontSize(10).text(`Registry code: ${company.RegistryCode || 'N/A'}`, tableLeft);
            doc.text(`VAT number: ${company.VatNumber || 'N/A'}`, tableLeft);
            doc.text(`Address: ${company.Address || 'N/A'}`, tableLeft);
            doc.text(`Phone: ${company.Phone || 'N/A'}`, tableLeft);
            const emailLink = `mailto:${company.EMail || 'N/A'}`;
            doc.fillColor('blue').text(`E-mail: ${company.EMail || 'N/A'}`, tableLeft, doc.y, { link: emailLink, underline: true });
            doc.fillColor('black').fontSize(12); // Taasta värv ja fontsize
            doc.moveDown();
            doc.moveDown();

        } else {
            console.log('No dataData available or empty array');
            doc.fontSize(12).text('No dataData available', 50);
            doc.moveDown();
        }

        // Aseta pealkiri
        doc.font(boldFontPath).fontSize(15).text(`Transport order no: ${orderData.tellimuseNumber}`, tableLeft);
        doc.moveDown();
        doc.font(regularFontPath).fontSize(12).text(`${orderData.vedaja}`, tableLeft);
        doc.fontSize(12).text(`Plate number: ${orderData.autoNumbrimärk}`, tableLeft);
        doc.moveDown(2);

        doc.fontSize(10).text('Hereby asks Ekspediitor OÜ to carry out the transport service as described below:');
        doc.fontSize(12);
        doc.moveDown(17)

        doc.fontSize(10).text('Transport price includes all costs. In case of violation of the terms stated in the order we reduce the agreement price by the amount of claims we receive. If unloading is delayed, we reduce the agreement price by 65 € / per day.');
        doc.text('Payment for the shipment will take place after receiving the original bill and the transport documents as agreed upon. The carrier is obligated to inform immediately when there is a change in the quantity of goods or other order conditions of the contract.');
        doc.text('All Operations are Performed by General Conditions of Estonian Logistics and Freight Forwarding Association (effective 01.01.2001) under INCOTERMS 2000 and CMR Convention. The carrier confirms the existence of a valid CMR insurance. In the absence of CMR insurance, the carrier is fully liable for the goods, when damaging the cargo then the carrier is required to pay in full extent of the goods.');
        doc.fontSize(12);
        doc.moveDown();

        doc.font(boldFontPath).fontSize(10).text('Please send the documents (CMR and invoice) to the e-mail on the order.');
        doc.font(regularFontPath);

        // Tabeli andmed
        const tableData = [
            ['Loading company / address', `${orderData.pealelaadimiseEttevõte} / ${orderData.pealelaadimiseAadress}`],
            ['Load', orderData.laadung],
            ['Load date', orderData.pealelaadimiseKuupäev],
            ['Unloading company / address', `${orderData.mahalaadimiseEttevõte} / ${orderData.mahalaadimiseAadress}`],
            ['Unload date', orderData.mahalaadimiseKuupäev],
            ['Special', orderData.eritingimus || 'N/A'],
            ['Price', orderData.hind],
            ['Payment term', orderData.paymentTerm || 'N/A'] // Kasutame edastatud maksetähtaega
        ];
 
        // Joonista tabeli read ja veerud
        tableData.forEach((row, rowIndex) => {
            const y = tableTop + rowIndex * rowHeight;

            // Joonista ridade jooned
            doc.moveTo(tableLeft, y)
                .lineTo(tableLeft + columnWidth.reduce((a, b) => a + b, 0), y)
                .stroke();

            // Joonista veergude jooned ja lahtri andmed
            let x = tableLeft;
            row.forEach((cell, colIndex) => {
                doc.moveTo(x, tableTop)
                    .lineTo(x, tableTop + tableData.length * rowHeight)
                    .stroke();

                // Lisa lahtri andmed
                doc.fontSize(10).text(cell, x + 5, y + 5);

                // Nihuta järgmise veeru alguspunkt
                x += columnWidth[colIndex];
            });

            // Joonista viimane vertikaaljoon
            doc.moveTo(x, tableTop)
                .lineTo(x, tableTop + tableData.length * rowHeight)
                .stroke();
        });

        // Joonista viimane horisontaaljoon tabeli lõpus
        doc.moveTo(tableLeft, tableTop + tableData.length * rowHeight)
            .lineTo(tableLeft + columnWidth.reduce((a, b) => a + b, 0), tableTop + tableData.length * rowHeight)
            .stroke();
        
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
