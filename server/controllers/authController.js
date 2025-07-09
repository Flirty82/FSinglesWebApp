const User = require('..models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ mnessage: "User registered successfully!", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.json({ token, user });
};
