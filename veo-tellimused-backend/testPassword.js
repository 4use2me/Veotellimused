const bcrypt = require('bcrypt');

// Testimise funktsioon
async function testPassword() {
    const testPassword = 'Kakskaks3'; // Testimiseks kasutage parooli, mida ootate
    const hashedPasswordFromDB = '$2b$10$MQnGRhdq4Al2fhOu8P1iVO5wQETVkhpPtV9fukkMWsVon/EvdHRt2'; // Krüpteeritud väärtus andmebaasist

    try {
        // Kontrollige, kas parool sobib
        const isMatch = await bcrypt.compare(testPassword, hashedPasswordFromDB);
        console.log('Password Match:', isMatch); // Peaks olema true
    } catch (error) {
        console.error('Error comparing password:', error);
    }
}

// Käivita funktsioon
testPassword();
