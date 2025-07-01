const express = require('express');
const User = require('.models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to authenticate user requests
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], "nwP9U7w7NnKdyaHEIzAm88GW1m95sfX+eZ3BotQjSW0=");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
};

// Get user profile
router.get('/me', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
});

// Update Profile
router.put('/update', authenticate, async (req, res) => {
    try {
        const { bio, profilePicture, interests, datingPreferences } = req.body;
        const user = await User.findByIdAndUpdate(
            req.userId,
            { bio, profilePicture, interests, datingPreferences },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to updat profile." });
    }
});

module.exports = router;
