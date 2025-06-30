var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const targetId = req.params.id;


function auth(req, res, next) {
    const token = req.header('Authorization');
    If(!token) return res.status(401).json({ msg: 'No token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch {
        res.status(400).json({ msg: 'Invalid token' });
    }
}

// Get current user's profile
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user).select('-password');
    res.json(user);
});

// Update profile
router.put('/me', auth, async (req, res) => {
    const { username, bio } = req.body;
    const user = await User.findByIdAndUpdate(
        req.user,
        { username, bio },
        { new: true }
    ).select('-password');
    res.json(user);
});

module.exports = router;

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
    } catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) || !(await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, "YOUR_SECRET_KEY", {
            expiresIn: "365d"
        });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

router.get('/search', async (req, res) => {
    const { gender, minAge, maxAge, location, interestedIn } = req.query;

    const query = {};

    if (gender) query.gender = gender;
    if (location) query.location = { $regex: new RegExp(location, 'i') };

    if (minAge || maxAge) {
        query.age = {};
        if (minAge) query.age.$gte = parseInt(minAge);
        if (maxAge) query.age.$lte = parseInt(maxAge);
    }

    if (interstedIn) {
        query['preferences.gender'] = { $in: [interestedIn] };
    }

    const users = await User.find(query).select('-password');
    res.json(users);
});


modile.exports = router;

