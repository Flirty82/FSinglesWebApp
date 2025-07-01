const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// POST /api/rooms - CreateRoom
router.post('/', aysnc (req, res) => {
    const Room = new Room(req.body);
    await room.save();
    res.status(201).json(room),
})