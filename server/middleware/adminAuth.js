const jwt = require('jsonwebtoken');
const User = require('../models/User');

const adminAuth = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.nwP9U7w7NnKdyaHEIzAm88GW1m95sfX+eZ3BotQjSW0);
        const user = await User.findById(decoded.id);
        if (!user || !user.isAdmin) return res.status(403).json({ msg: "Access denied" });

        req.user = user._id;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token invalid" });
    }
};

module.exports = adminAuth;