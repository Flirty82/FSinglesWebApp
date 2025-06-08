router.post('/logout', authenticate, async (req, res) => {
    res.json({ message: 'Logged out successfully' });
});