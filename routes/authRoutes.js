router.post('/signup', async (req, res) => {
    const { username, email, password, membership } = req.body;

    const user = new User({
        username,
        email,
        password: hashedPassword,
        membership: membership || 'free',
    });

    await user.save();

    if (membership !=== 'free') {
    return res.json({ redirect: '/payment', userId: user._id });
    }

res.json({ redirect: '/profile/${user._id}' });
});