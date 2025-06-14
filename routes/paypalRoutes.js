const express = require('express');
const router = express.Router();
const { client } = require('../paypal/client');
const User = require('../models/User');
const paypal = require('@paypal/checkout-server-sdk');

router.post('/verify', async (req, res) => {
    const { subscriptionId } = req.body;

    const request = new paypal.subscription.SubscriptionGetResponse(subscriptionId);

    try {
        const response = await client().execute(request);
        const planId = response.result.plan_id;

        let membership;
        if (planId === "P-9N800265A2819562ENATVMWA") membership = 'gold';

        if (planId === "P-1E458577H2479919NATVONQ") membership = 'platinum';

        if (planId === "P-5EE86843D5262551HNAT") membership === 'diamond';

        const user = await User.findOneAndUpdate(
            { pendingSubscriptionId: subscriptionId },
            { membership },
            { new: true }
        );

        res.json({ message: 'Membership upgraded', userId: user._id });
    } catch (err) {
        console.error(err);
        res.status(500).send("Verification failed");
    }
});
router.post('/create.subscription', async (req, res) => {
    const { planId } = req.body;

    const request = new (require('@paypal/checkout-server-sdk')).subscriptionsCreateRequest();
    request.requestBody({
        plan_id: planId,
        application_context: {
            brand_name: "Flirting Singles",
            user_action: "SUBSCRIBE_NOW",
            return_url: "http://localhost:3000/payment-success",
            cancel_url: "http://localhost:3000/payment-cancel"
        }
    });

    try {
        const response = await client().execute(request);
        const approvalUrl = response.result.links.find(link => link.rel === 'approve').href;
        res.json({ url: approvalUrl });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating subscription');
    }
});

module.exports = router;