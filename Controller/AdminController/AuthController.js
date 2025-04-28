const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthModal = require('../../Models/AdminModels/AuthModal');
const AuthorizationModal = require('../../Models/AdminModels/AuthorizationModal');
const ResetTokenModal = require('../../Models/AdminModels/ResetTokenModal');
const crypto = require('crypto');

module.exports.Signup = async (req, res) => {

    if (!req.body) {
        return res.status(400).json({ message: "Name, email, password, and confirmPassword are required" });
    }

    const { name, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        // Check if a user already exists
        const existingUser = await AuthModal.findOne({});
        if (existingUser) {
            return res.status(403).json({ message: "Signup is restricted. Only one user is allowed." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const newUser = new AuthModal({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({
            message: 'Something Went wrong',
            finalresult: false,
        });
    }
};

module.exports.Login = async (req, res) => {

    console.log(req.body, 'body')
    if (!req.body) return res.status(400).json({
        message: 'email, password is required',
        finalresult: false,
    })

    try {
        const { email, password } = req.body;
        const user = await AuthModal.findOne({ email });
        if (!user) return res.status(400).json({
            message: 'InValid Email',
            finalresult: false,
        });
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Save token in Auth collection
            await new AuthorizationModal({ userId: user._id, token }).save();

            res.json({
                message: 'Login Successfully',
                token,
                user,
                finalresult: true,
            });
        }
        else {
            res.status(400).json({
                message: 'InValid Password',
                finalresult: false,
            })
        }


    } catch (err) {
        res.status(500).json({
            message: 'Something Went wrong',
            finalresult: false,
        });
    }
};

module.exports.ForgotPassword = async (req, res) => {

    if (!req.body) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const { email } = req.body;
        const user = await AuthModal.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        // Generate a reset token using bcrypt
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 10);


        // Save token in the database with expiry time
        const resetTokenDoc = await ResetTokenModal.create({
            userId: user._id,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 1800000 // 30 minutes expiry
        });

        if (!resetTokenDoc) {
            return res.status(500).json({ message: "Failed to save the reset token" });
        }

        // Construct reset link (this can be sent via email in production)
        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&id=${user._id}`;

        res.status(200).json({ message: "Reset password link sent!" });

    } catch (err) {
        res.status(500).json({ message: err.message || 'Something went wrong' });

    }
};
module.exports.ResetPassword = async (req, res) => {
    const { token, userId, newPassword, confirmPassword } = req.body;

    if (!token || !userId || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const resetToken = await ResetTokenModal.findOne({ userId });

        if (!resetToken) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        // Verify token
        const isValid = await bcrypt.compare(token, resetToken.token);
        if (!isValid) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await AuthModal.findByIdAndUpdate(userId, { password: hashedPassword });

        // Remove token from database after successful reset
        await ResetTokenModal.findByIdAndDelete(resetToken._id);

        res.status(200).json({ message: "Password has been reset successfully!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
