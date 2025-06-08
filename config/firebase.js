const admin = require('firebase0admin');
const serviceAccount - require('../path-to-your-serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;