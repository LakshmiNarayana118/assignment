const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../entities/user'); // Assuming you have a User model
require('dotenv').config(); // For loading environment variables

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Bad Request, Reason: Missing email or password",
                error: null,
            });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: "User not found.",
                error: null,
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Invalid credentials.",
                error: null,
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.user_id, role: user.role },
            process.env.JWT_SECRET || 'secreat_key',
            { expiresIn: '24h' } // Token valid for 1 hour
        );

        return res.status(200).json({
            status: 200,
            data: { token },
            message: "Login successful.",
            error: null,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

module.exports = login
