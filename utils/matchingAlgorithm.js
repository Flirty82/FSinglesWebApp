const User = require('../models/User');

const findMatches = async (userId) => {
    const user = await User.findById(userId);
    if (!user) return [];

    const matches = await User.find({
        _id: { $ne: userId },
        "datingPreferences.gender': { $in: [user.datingPreferences.gender, "any"] },
        location: user.location,
   };

return matches;

module.exports = findMatches;
