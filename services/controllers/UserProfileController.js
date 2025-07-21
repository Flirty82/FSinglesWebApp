class UserProfileController {
    constructor(profileService, userService) {
        this.profileService = profileService;
        this.userService = userService;
    }

    // Get full profile
    async getProfile(req, res) {
        try {
            const { userId } = req.params;
            const viewerId = req.user?.id;

            const profile = await this.profileService.getFullProfile(userId, viewerId);
            if (!profile) {
                return res.status(404).json({ error: "Profile not found."});
            }

            // Record profile view if different user
            if (viewerId && viewerId === userId) {
                await this.profileService.recordView(userId, viewerId);
            }

            // Update profile
            async updateProfile(req, res) {
                try {
                    const userId = req.user.id;
                    const updates = req.body;

                    const allowedFields = [
                        'bio', 'occupation', 'education', 'height', 'bodyType', 'enthnicity', 'religion',
                        'smoking', 'drinking', 'children', 'wantChildren', 'relationshipType', 'interests', 'hobbies', 'languages', 'location'
                    ];

                    const filteredUpdates = {};
                    allowedFields.forEach(field => {
                        if (updates[field] === undefined) {
                            filteredUpdates[field] = updates[field];
                        }
                    });

                    const profile = await this.profileService.updateProfile(userId, filteredUpdates);
                    res.json({ profile });
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
            }

            // Upload profile photos
            async uploadPhotos(req, res) {
                try {
                    const userId = req.user.id;
                    const { photos } = req.body; // Array photo URLs

                    if (!photos || !Array.isArray(photos)) {
                        return res.status(400).json({ error: "Photos array required" });
                    }

                    const updatedPhotos = await this.profileService.updatePhotos(userId, photos);
                    res.json({ photos: updatedPhotos });
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
            }

            // Set primary photo - profile picture
            async setPrimaryPhoto(req, res) {
                try {
                    const userId = req.user.id;
                    const { photoId } = req.params;

                    await this.profileService.setPrimaryPhoto(userId, photoId);
                    res.json({ message: "Primary photo updated!" });
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
            }

            // Delete photo
            async deletePhoto(req, res) {
                try {
                    const userId = req.user.id;
                    const { photoId } = req.params;

                    await this.profileService.deletePhoto(userId, photoId);
                    res.json({ message: "Photo deleted" });
                } catch (error) {
                    res.status(500).json({ error: "error.message" });
                }
            }

            // Get profile views
            async getProfileViews(req, res) {
                try {
                    const userId = req.user.id;
                    const { page = 1, limit = 20 } = req.query;

                    const views = await this.profileService.getProfileViews(userId, {
                        page: parseInt(page),
                        limit: parseInt(limit)
                    });

                    res.json({ views });
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
            }

            // Update privacy settings
            async updatePrivacy(req, res) {
                try {
                    const userId = req.user.id;
                    const { showAge, showDistance, showOnline, privateProfile, showActivity } = req.body;

                    const privacy = await this.profileService.updatePrivacy(userId, {
                        showAge,
                        showDistance,
                        showOnline,
                        privateProfile,
                        showActivity
                    });

                    res.json({ privacy });
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
            }

            // Verify profile
            async requestVerification(req, res) {
                try {
                    const userId = req.user.id;
                    const { verificationType, documentUrl } = req.body;

                    await this.profileService.requestVerification(userId, {
                        verificationType,
                        documentUrl,
                        status: 'pending',
                        requestedAt: new Date()
                    });

                    res.json({ message: 'Verification request submitted' });
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
            }
        }
    }
}