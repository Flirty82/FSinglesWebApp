const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('username profilePicture bio interests location');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Cannot fetch users" });
    }
});

module.exports = router;