const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.put('/theme', authenticate, async (req, res) => {
    const { theme } = req.body;
    const user = await User.findByIdAndUpdate(req.userId, { theme }, { new: true });
    res.json(user);
});

router.put('/visibility', authenticate, async (req, res) => {
    const { visibility } = req.body;
    const user = await User.findByIdAndUpdate(req.userId, { visibility }, { new: true });
    res.json(user);
});

module.exports = router;