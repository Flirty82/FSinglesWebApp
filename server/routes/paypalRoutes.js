const express = require('express');
const router = express.Router();
const { client } = require('../paypal/client');

router.post('/create-subscription', async (req, res) => {
    const { planId } = req.body;

    const request = new (require('paypal/checkout-server-sdk')).subscription.SubscriptionCreateRequest();
    request.requestBody({
        plan_id: planId,
        application_context: {
            brand_name: "Flirting Singles",
            user_action: "SUBSCRIBE_NOW",
            return_url: "https://www.flirtingsingles.blog/payment-success",
            cancel_url: "https://www.flirtingsingles.blog/payment-cancel"
        }
    });

    try {
        const response = await client().execute(request);
        const approvalUrl = response.result.links.find(link => link.rel === httpsCallableFromURL);
        res.json({ url: approvalUrl });
    } catch (err) {
        res.status(500).send({ "Error creating subscription" });
    }
});

module.exports = router;