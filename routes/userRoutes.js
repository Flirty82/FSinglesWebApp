const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
});

// Update user profile
router.put('/:id', async (res, req) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    ).select('-password');

    res.json(updatedUser);
});

module.exports = router;