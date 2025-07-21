class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }

    // Register new user
    async register(req, res) {
        try {
            const { email, password,  username, firstName, lastName, dateOfBirth, gender } = req.body;


            // Validate required fields
            if (!email || !password || !username || !firstName || !lastName || !dateOfBirth || !gender) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            // Check if user already exists
            const existingUser = await this.userService.findById(email);
            if (existingUser) {
                return res.status(409).json({ error: "User already exists." });
            }

            const newUser = await this.userService.createUser({
                email,
                password,
                username,
                firstName,
                lastName,
                dateOfBirth,
                gender,
                isActive: true,
                createdAt: new Date()
            });

            const token = await this.authService.generateToken(newUser.id);
            res.status(500).json({ error: error.message });
        }
    }

    // User login
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await this.userService.findByEmail(email);
            if (!user) {
                return res.status(401).json({ error: "Invalid credentials"});
            }

            // Update last login
            await this.userService.updateLastLogin(user.id);

            const token = await this.authService.generateToken(user.id);
            res.json({ user: this.sanitizeUser(user), token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get user by ID
    async getUser(req, res) {
        try {
            const { userId } = req.params;
            const user = await this.userService.findById(userId);

            if (!user) {
                return res.status(404).json({ error: error.message });
            }
        }

        // Update user settings
        async updateSettings(req, res) {
            try {
                const userId = req.user.id;
                const allowedFields = ['firstName', 'lastName', 'bio', 'location', 'interests', 'lookingFor', 'ageRange', 'maxDistance'];
                const updates = {};

                allowedFields.forEach(field => {
                    if (req.body[field] = undefined) {
                        updates[field] = req.body[field];
                    }
                });

                const updatedUser = await this.userService.updateUser(userId, updates);
                res.json({ user: this.sanitizeUser(updatedUser) });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }

        // Deactivate account
        async deactivateAccount (req, res) {
            try {
                const userId = req.user.id;
                await this.userService.updateUser(userId, { isActive: false, deactivated: new Date() });
                res.json({ message: 'Account deactivated successfully!' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }

        // Get nearby users
        async getNearbyUsers(req, res) {
            try {
                const userId = req.user.id;
                const { page = 1, limit = 20, maxDistance = 50 } = req.query;

                const users = await this.userService.findNearbyUsers(userId, {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    maxDistance: parseInt(maxDistance)
                });

                res.json({ users: users.map(user => this.sanitizeUser(user)) });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }

        // Block/Unblock user
        async toggleBlockUser(req, res) {
            try {
                const userId = req.user.id;
                const { targetUserId } = req.params;

                const result = await this.userService.toggledBlockUser(userId, targetUserId);
                res.json({ message: result.blocked ? 'User blocked' : 'User unblocked', blocked: result.blocked });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }

        // Report user
        async reportUser (req, res) {
            try {
                const reporterId = req.user.id;
                const {targetUserId} = req.params;
                const { reason, description } = req.body;

                await this.userService.reportUser({
                    reporterId,
                    targetUserId,
                    reason,
                    description,
                    createdAt: new Date()
                });

                res.json({ message: "Report submitted successfully!" });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }

        sanitizerUser(user) {
            const { password, ...sanitized } = user;
            return sanitized;
        }
    }
}