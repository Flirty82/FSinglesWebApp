const User = required('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const emailService = require('../utils/emailService');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret', {
        expiresIn: '7d'
    });
};

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }

        const {
            email,
            password,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            interestedIn,
            location
        } = req.body;

        const existingUser = await User.findOn({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists."
            });
        }

        const birthDate = new Date(datOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        let actualAge = age;
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            actualAge--;
        }

        if (actualAge < 18) {
            return res.status(400).json({
                success: false,
                message: "You must be at least 18 years of age to register"
            });
        }

        const emailVerificationToken = crypto.randomBytes(32).toString('hex');

        // Create new user
        const user = new User({
            email: email.toLowerCase(),
            password,
            firstName,
            lastName,
            dateOfBirth: birthDate,
            gender,
            interestedIn: Array.isArray(interestedIn) ? interestedIn : [interestedIn],
            location: {
                type: 'Point',
                coordinates: [location.longitude, location.latitude],
                city: location.city,
                state: location.state,
                country: location.country,
            },
            emailVerificationToken
        });

        await user.save();

        // Send verification email
        try {
            await emailService.sendVerificationEmail(user.email, emailVerificationToken);
        } catch (emailError) {
            console.error("Failed to send verification email:", emailError);
            // Don't fail registration if email fails
        }

        // Generate JWT Token
        const token = generateToken(user._);

        res.status(201).json({
            success: true,
            message: "User registered successfully.  Please verify your email.",
            token,
            user: user.toPublicJSON()
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: errors.array()
            });
        }

        const { email, password, rememberMe } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Check password
        const isPasswordValid = await User.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Update user's online status and last seen
        user.isOnline = true;
        user.lastSeen = new Date();
        await user.save();

        // Generate JWT token with longer expiry if remember me is checked
        const tokenExpirty = rememberMe ? '30d' : '7d';
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: tokenExpiry }
        );

       res.json({
        success: true,
        message: "Login successful",
        token,
        user: user.toPublicJSON(),
        rememberMe: rememberMe || false
       });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
};

// Logout user
exports.logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            user.isOnline = false;
            user.lastSeen = new Date();
            await user.save();
        }

        res.json({
            success: true,
            message: "Logout successful"
        });

    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: "Server error during logout"
        });
    }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        
    }
}

