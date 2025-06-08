const express = require('express');
const Analytics = require('../models/Analytics');
const authenticate = require('authenticate');
const router = express.Router();

router.get('/me', authenticate, async (req, res) => {
    try {
        const analytics = await Analytics.findOne({ user: req.userId });
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve anaylytics ' });
    }
});

module.exports = router;