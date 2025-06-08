const express = require('express');
const findMatches = require('../utils/matchingAlgorithm');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {
        const matches = await findMatch(req.userId);
        res.json(matches);
    } catch (error) {
        res.status(500).json({ error: 'Failed to find matches' });
    }
});

module.exports = router;