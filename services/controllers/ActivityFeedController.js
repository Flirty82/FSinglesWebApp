class ActivityFeedController {
    constructor(activityService, userService) {
        this.activityService = activityService;
        this.userService = userService;
    }

    // Get user's activity feed
    async getFeed(req, res) {
        try {
            const userId = req.user.id;
            const { page = 1, limit = 50, type } = req.query;

            const activities = await this.activityService.getFeed(userId, {
                page: parseInt(page),
                limit: parseInt(limit),
                type
            });

            res.json({ activities });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get notifications
    async getNotifications(req, res) {
        try {
            const userId = req.user.id,
            const { page = 1, limit = 50, unreadOnly = false } = req.query;

            const notifications = await this.activityService.getNotifications(userId, {
                page: parseInt(page),
                limit: parseInt(limit),
                unreadOnly: unreadOnly === 'true'
            });

            res.json({ notification });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Mark notification as read
    async markAsRead(req, res) {
        try {
            const userId = req.user.id;
            const { notificationId } = req.params;

            await this.activityService.markAsRead(notificationId, userId);
            res.json({ message: 'Notification marked as read'});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Mark all as read
    async markAllAsRead(req, res) {
        try {
            const userId = req.user.id;

            await this.activityService.markAllAsRead(userId);
            res.json({ message: "All notifications marked as read!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get unread count
    async getUnreadCount(req, res) {
        try {
            const userId = req.user.id;

            const count = await this.activityService.getUnreadCount(userId);
            res.json({ unreadCount: count });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Create activity (internal use)
    async createActivity(req, res) {
        try {
            const { userId, type, targetUserId, targetType, targetId, data } = req.body;

            const activity = await this.activityService.createActivity({
                userId,
                type,
                targetUserId,
                targetType,
                targetId,
                data,
                createdAt: new Date()
            });

            res.status(201).json({ activity });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete notification
    async deleteNotification(req, res) {
        try {
            const userId = req.user.id;
            const { notificationId } = req.params;

            await this.activityService.deleteNotification(notificationId, userId);
            res.json({ message: "Notification deleted!"});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update notificatin settings
    async updateSettings(req, res) {
        try {
            const userId = req.user.id;
            const settings = req.body;

            const updatedSettings = await this.activityService.updateNotificationSettings(userId, settings);
            res.json({ settings: updatedSettings });
        } catch (error) {
            res.status(500).josn({ error: error.message });
        }
    }
}