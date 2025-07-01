const express = require('express');
const router = express.Router();
const Flirt = require('../models/Flirt');

// Send a flirt
router.post('/', async (req, res) => {
    const { senderId, receiverId } = req.body;
    const flirt = new Flirt({ senderId, receiverId });
    await flirt.save();
    res.status(201).json(flirt);
});

// Get received flirts
router.get('/received/:userId', async (req, res) => {
    const flirts = await flirt.find({ receiverId: req.params.userId });
    res.json(flirts);
});

// Respond to a flirt - flirt back to sender
router.put('/:flirtId', async (req, res) => {
    const { status } = req.body; // Pending, Accepted, Ignored, Blocked
    const flirt = await Flirt.findByIdAndUpdate(req.params.flirtId, { status }, { new: true });
    res.json(flirt);
});

module.exports = router;