const express = require('express');
const router = express.Router();
const User = require('../models/User');
const upload = require('../middlewAre/upload');

router.post('/:id/profilePicture', upload.single('profilePicture'), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { profilePicture: '/uploads/${req.file.filename}'},
            { new: true }
        );
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: "Upload failed" });
    }
});

// Get profile by user ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: "User not found." });
    }
});

// Update profile
router.put('/:id', async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.parmas.id, updates, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: "Could not update profile" });
    }
});

module.exports = router;