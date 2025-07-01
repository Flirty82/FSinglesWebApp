const User = require('../models/User');

const checkMembership = (requiredLevel) => {
    return async (req, res, next) => {
        const user = await User.findById(req.userId);
        if (!user) return res.status(401).json({ message: "User not found" });

        const levels = ["free", "gold", "platinum", "diamong"];
        const userLevel = levels.indexOf(user.membership);
        const required = levels.indexOf(requiredLevel);

        if (userLevel < required) {
            return res.status(403).json({ message: "Requires ${requiredLevel} membership."});
        }

        next();
    };
};

// Only Gold+ can access flirts
router.post('/send', checkMembership('gold'), async (req, res) => {
});

module.exports = checkMembership;