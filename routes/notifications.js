const express = require('express');
const admin = require('../config/firebase');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/send', authenticate, async (req, res) => {
    try {
        const { token, title, body } = req.body;
        await admin.messaging().send({
            token,
            notification: { title, body },
        });
        res.json({ message: "Notification sent!" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send notification' })
    }
});

module.exports - router;