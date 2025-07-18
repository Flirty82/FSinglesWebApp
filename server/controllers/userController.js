const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
        const user = await user.findById(req.user.id).select('password');
        res.json(user);
    } catch {
        res.status(500).json({ message: "Profile error" });
    }
};

exports.updateProfile = async (req, res) => {
    const { bio, avatar, interests, datingPreferences } = req.body;
    try {
        const updated = await User.findByIdAndUpdate(
            req.user.id,
            { bio, avatar, interests, datingPreferences },
            { new: true }
        );
    }};
