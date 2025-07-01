const express = require('express');
const router = express.Router();

router.post('/record', async (req, res) => {
    const { userId, membership, subscriptionId } = req.body;
    // Update user membership and store subscription in Database
    await User.findByIdAndUpdate(userId, { membership, subscriptionId });
    res.status(200).json({ message: "Subscription save" });
});

module.exports = router;