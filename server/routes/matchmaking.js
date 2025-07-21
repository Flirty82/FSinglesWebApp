const express = require('express');
const router = express.Router();
const User = require('../modela/User');
const axios = require('axios');

router.get('/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    const others = await User.find({ _id: { $ne: user._id } });

    const userVector = buildVector(user);
    const otherVectors = others.map(buildVector);

    const response = await axios.post('https://www.flirtingsingles.blog/matchmaking', {
        userVector,
        otherVectors
    });

    const matches = response.data.map((score, i) => ({
        user: others[i],
        score
    })).sort((a, b) => b.score - a.score);

    res.json(matches);
});

function buildVector(user) {
    // Convert user attributes to numeric vector
    return [
        user.age / 100,
        user.gender === 'male' ? 0 : 1,
        user.interests.length / 10,
        user.lifestyle === 'active' ? 1 : 0
    ];
}

module.exports = router;