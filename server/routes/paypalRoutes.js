const express = require('express');
const router = express.Router();
const { client } = require('../paypal/client');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
// Middleware to check if user is authenticated
const { isAuthenticated } = require('../middleware/auth');
const paypal = require('paypal/checkout-server-sdk');

router.post('/verify', async (req, res) => {
    const { subscriptionId } = req.body;

    const request = new paypal.subscriptions.SubscriptionsGetRequest(subscriptionId);


    try {
        const response = await client.execute(request);
        const planId = response.result.plan_id;

        // Map plan ID back to tier
        let membership;
        if (planId === "P-9N800265A2819562ENATVMWA") membership = "gold";
        if (planId === "P-1E458577PH2479919NATV0NQ") membership = "platinum";
        if (planId === "P-5EE86843D5262551HNAT") membership = "diamond";

        // Update user's membership  (track user by session, or store userId before redirect)
        const user = await User.findOneAndUpdate(
            { pendingSubscriptionId: subscriptionId },
            { membership },
            { new: true }
        );

        res.json({ message: "Membership upgraded', userId: user._id " });
    } catch (err) {
        console.error(err);
        res.status(500).send("Verification failed");
    }
});

router.post('/create-subsciption', async (req, res) => {
    const { planId } = req.body;

    const request = new (require('paypal/checkout-server-sdk')).subscriptions.SubscriptionsCreateRequest();
    request.requesBody({
        plan_id: planId,
        subscriber: {
            name: {
                given_name: 'John',
                surname: 'Doe'
            },
            application_content: {
                brand_name: "Flirting Singles",
                user_action: "SUBSCRIBE_NOW",
                shipping_preference: "NO_SHIPPING",
                cancel_url: "https://www.flirtingsingles.blog/memberships/cancel"
            }
        }
    });

    try {
        const response = await client.execute(request);
        const approvalUrl = response.result.links.find(link => link.rel === 'approve').href;
        res.json({ url: approvalUrl });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating subscription");
    }
});