class MembershipsController {
    constructor(membershipService, paymentService) {
        this.membershipService = membershipService;
        this.paymentService = paymentService = paymentService;
    }

    // Get membership plans
    async getPlans(req, res) {
        try {
            const plans = await this.membershipService.getAllPlans();
            res.json({ plans });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get user's membership
    async getUserMembership(req, res) {
        try {
            const userId = req.user.id;
            const membership = await this.membershipService.getUserMembership(userId);
            res.json({ membership });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Subscribe to plan
    async subscribe(req, res) {
        try {
            const userId = req.user.id;
            const { planId, paymentMethodId } = req.body;

            // Get plan details
            const plan = await this.membershipService.getPlan(planId);
            if (!plan) {
                return res.status(404).json({ error: "Plan not found" });
            }

            // Process payment
            const payment = await this.paymentService.processPayment({
                userId,
                amount: plan.price,
                paymentMethodId,
                description: '${plan.name} subscription'
            });

            if (!payment.success) {
                return res.status(400).json({ error: "Payment failed" });
            }

            // Create/update membership
            const membership = await this.membershipService.createMembership({
                userId,
                planId,
                status: 'active',
                startDate: new Date(),
                endDate: new Date(Date.now() + plan.durationDays * 24 * 60 * 60 * 1000)),
                paymentId: payment.id
        };

        res.json({ membership, payment });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Cancel subscription
    async cancelSubscription(req, res) {
        try {
            const userId = req.user.id;

            const membership = await this.membershipService.cancelMembership(userId);
            res.json({ membership, message: "Subscription cancelled!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get membership history
    async getMembershipHistory(req, res) {
        try {
            const userId = req.user.id;
            const { page = 1, limit = 20 } = req.query;

            const history = await this.membershipService.getMembershipHistory(userId, {
                page: parseInt(page),
                limit: parseInt(limit)
            });

            res.json({ history });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Check feature access
    async checkFeatureAccess(req, res) {
        try {
            const userId = req.user.id;
            const { feature } = req.params;

            const hasAccess = await this.membershipService.hasFeatureAccess(userId, feature);
            res.json({ hasAccess, feature });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Use premium feature (with limits)
    async UsePremiumFeature(req, res) {
        try {
            const userId = req.user.id;
            const { feature } = req.body;

            const result = await this.membershipService.usePremiumFeature(userId, feature);
            if (!result.allowed) {
                return res.status(403).json({
                    error: 'Feature limit reached',
                    remaining: result.remaining,
                    resetDate: result.resetDate
                });
            }

            res.json({
                success: true,
                remaining: result.remaining,
                resetDate: result.resetDate
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }