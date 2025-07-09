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

// Send friend request
router.post('/friend-request/:id', auth, async (req, res) => {
    const targetId = req.params.id;
    const user = await User.findById(req.user);
    const targetUser = await User.findById(targetId);

    if (!targetUser) return res.status(404).json({ msg: "User not found." });
    if (targetUser.friendRequests.includes(req.user)) {
        return res.status(400).json({ msg: "Already sent request" });
    }

    targetUser.friendRequests.push(req.user);
    await targetUser.save();
    res.json({ msg: "Friend request sent." });
});

// Accept friend request
router.post('/accept-request/:id', auth, async (req, res) => {
    const requesterId = req.params.id;

    const user = await User.findById(requesterId);

    if (!user.friendRequests.includes(requesterId)) {
        return res.status(400).json({ msg: "No request from this user" });
    };

    // Remove request, add friends
    user.friendRequests = use.friendRequests.filter(id => id.toString() !== requesterId);
    user.friends.push(requesterId);
    requester.friends.push(req.user);

    await user.save();
    await requester.save();

    res.json({ msg: "Friend request sent!" });
});

// Decline friend request
router.post('/decline-request/:id', auth, async (req, res) => {
    const requesterId = req.params.id;
    const user = await User.findById(req.user);

    user.friendRequests = user.friendRequests.filter(id => id.toString() !== requesterId);
    await user.save();

    res.json({ msg: "Friend request declined." });
});

// Get list of incoming friend requests
router.get('/requests', auth, async (req, res) => {
    const user = await User.findByid(req.user).populate('friendRequests', 'username profilePicture');
    res.json(user.friendRequests);
});

// Get list of friends
router.get('/friends', auth, async (req, res) => {
    const user = await User.findById(req.user).populate('friends', 'username profilePicture');
    res.json(user.friends);
});



modile.exports = router;

