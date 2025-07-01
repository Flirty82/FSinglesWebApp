const express = require('express');
const bcrypt = requrie('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup Route
router.post('/signup', async (req,res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(400).json({ error: "Error creating new user" });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)  !(await bcrypt.compare(password, user.password)); {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, "YOUR_SECRET_KEY", { expiresIn: "7d" });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;