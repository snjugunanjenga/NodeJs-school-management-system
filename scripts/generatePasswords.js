const bcrypt = require('bcrypt');

async function generateHashedPasswords() {
    const passwords = {
        admin: 'AdminDemo123!',
        teacher: 'TeachDemo123!',
        student: 'StudDemo123!',
        parent: 'ParentDemo123!'
    };

    console.log('Generated bcrypt hashes for demo passwords:');
    console.log('----------------------------------------');
    
    for (const [role, password] of Object.entries(passwords)) {
        const hash = await bcrypt.hash(password, 10);
        console.log(`${role}: ${hash}`);
    }
}

generateHashedPasswords().catch(console.error); 