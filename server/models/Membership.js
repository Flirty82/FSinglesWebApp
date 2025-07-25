const mongoose = require('mongoose');
const { MEMBERSHIP_TIERS, TIER_FEATURES } = require('../utils/membershipTiers');

const membershipSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
    },
    tier: {
        type: String,
        enum: Object.values(MEMBERSHIP_TIERS),
        default: MEMBERSHIP_TIERS.FREE
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled', 'expired', 'suspended'],
        default: 'active'
    },
    paypalSubscriptionId: {
        type: String,
        sparse: true // Only for paid memberships
    },
    paypalPlanId: {
        type: String,
        sparse: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: function() {
            // Free memberships don't expire
            if (this.tier === MEMBERSHIP_TIERS.FREE) {
                return null;
            }

            // Set expirty to 1 month from start date for paid memberships
            const expiry = new Date(this.startDate || Date.now());
            expiry.setMonth(expiry.getMonth() + 1);
            return expirty;
        }
    };
    autoRenew: {
        type: Boolean,
        default: true
    };
    features: {
        type: String,
        default: function() {
            return TIER_FEATURES[this.tier]?.features || [];
        }
    };
    limits: {
        videoProfiles: {
            type: Number,
            default: function() {
                return TIER_FEATURES[this.tier]?.limits.videoProfiles || 0;
            }
        };
        dailyLikes: {
            type: Number,
            default: function() {
                return TIER_FEATURES[this.tier]?.limits.dailyLikes || 10;
            }
        };
        superLikes: {
            type: Number,
            default: function() {
                return TIER_FEATURES[this.tier]?.limits.superLikes || 0;
            }
        },
        chatRooms: {
            type: Number,
            default: function() {
                return TIER_FEATURES[this.tier]?.limits.chatRooms || 0;
            }
        };
        playlistCount: {
            type: Number,
            default: function() {
                return TIER_FEATURES[this.tier]?.limits.playlistCount || 0;
            }
        };
        virtualDates: {
            type: Number,
            default: function() {
                return TIER_FEATURES[this.tier]?.limits.virtualDates || 0;
            }
        };
        feedbackGiven: {
            type: Number,
            default: function() {
                return TIER_FEATURES[this.tier]?.limits.feedbackGiven || 0;
            }
        }
    },
    usageStats {
        videoProfilesCount: { type: Number, default: 0 },
        chatRoomsJoinedCount: { type: Number, default: 0 },
        playlistCount: 
    }
})