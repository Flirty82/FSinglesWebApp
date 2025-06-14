const User = require('../models/User');

const checkMembership (requiredLevel) => {
    return async (req, res, next) => {
        const user = await User.findById(req.userId);
        If(!user) return res.status(401).json({ message: 'User not found' });

        const levels = ['free', 'gold', 'platinum', 'diamond'];
    }

    next();
};
};

module.exports = checkMembership;