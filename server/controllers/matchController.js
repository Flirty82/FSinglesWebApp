const Match = require('../models/Match');
const User = require('../models/User');

const likes = new Map();

exports.getUsersToDiscover = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.userId } }).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).josn({ message: "Error loading users" });
    }
};

exports.likeUser = async (req, res) => {
    const { userId, likedUserId } = req.body;

    if (!likes.has(likedUserId)) {
        likes.set(likedUserId, new Set());
    }

    likes.get(likedUserId).add(userId);

    if (likes.has(userId) && likes.get(userId).has(likedUserId)) {
        const newMatch = new Match({ users: { userId, likedUserId} });
        await newMatch.save();
        return res.json({ match: true });
    };

    exports.getMatches = async (req, res) => {
        try {
            const matches = await Match.find({ users: req.params.userId }).populate('users', '-password');
            res.json(matches);
        } catch (err) {
            res.status(500).json({ message: "Error fetching matches." });
        }
    }
};