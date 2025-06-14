const express = require('express');
const router = express.Router();
const Flirt = require('.../models/Flirt');

// Send a flirt
router.post('/send', async (req, res) => {
    const { sender, receiver } = req.body;
    const exists = await Flirt.findOne({ sender, receiver, status: 'pending' });
    if (exists) return res.status(400).json({ message: "Flirt already sent" });

    const flirt = new Flirt({ sender, receiver });
    await flirt.save();
    res.json(flirt);
})