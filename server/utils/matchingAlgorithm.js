const User = require('../models/User');

// Find compatiable matches based on preferences
const findMatches = async (userId) => {
    const user = await User.findById(userId);
    if (!user) return [];

    const matches = await User.find({
        _id: { $ne: userId }, // Exclude current user
        "datingPreferences.gender": { $lte: user.datingPreferences.gender, "any" },
        "datingPreferences.ageRange": { $lte: user.datingPreferences.ageRange}
    })
}