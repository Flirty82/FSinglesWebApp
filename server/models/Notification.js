const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: String,
    type: String,
    content: String,
    fromUserId: String,
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);