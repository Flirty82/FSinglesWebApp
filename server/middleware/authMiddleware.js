const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'nwP947w7NnKdyaHEFzAm88GW1m95sfXeZ3BotQjSW0';

module.exports = function (req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ error: "No token" });

    try (
     decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
       (err) => {
        return res.status(401).json({ error: "Invalid token" });
    }
};