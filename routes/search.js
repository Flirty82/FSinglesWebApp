const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/users/:query', authenticate, async (req, res) => {
    try {
        const results = await User.fuzzySearch(req.params.query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Search failed' });
    }
});

module.exports = router;