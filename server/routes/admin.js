const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/User');

// Get all users
router.get('/users', adminAuth, async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});

// Delete user
router.delete('/user/:id', adminAuth, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
});

module.exports = router;