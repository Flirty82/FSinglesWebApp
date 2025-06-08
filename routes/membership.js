const express = require('express');
const paypal = require('paypal')("MY_PAYPAL_SECRET");
const User = require('../models/User');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const membershipPlan = {
    gold: $25,
    platnium: $35,
    diamond: $55,
};

router.post("/upgrade', authenticate, async (req, res) => {
    try {
        const { membership } = req.body;
        if (!membershipPlans[membership]) return res.status(400).json({ error: "Invalid membership type" });

        const paymentIntent = await paypal.paymentIntents.create({
            amount: membershipPlans[membersip} * 100,
            currency: "usd",
            metadata: { userId: req.userId, membership },]
        });

       res.json({ clientSecret: paymentIntent.client_secret });
    } catch {
        res.status(500).json({ error: "Payment failed" });
};

router.post('/confirm', authenticate, async (req, res) => {
    try {
        const { membership } = req.body;
        const user = await User.findByIdAndUpdate(req.userId, {
            membership,
            membershipExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30-day membership
        }, { new: true });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to upgrade membership" });
    }
});

module.exports = router;