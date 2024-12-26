const  User  = require('../entities/user');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize'); // For advanced queries

// Add a new user (Admin only)
const addUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate input
        if (!email || !password || !role) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Bad Request, Reason: Missing fields",
                error: null,
            });
        }

        // Only allow 'editor' and 'viewer' roles
        if (!['editor', 'viewer'].includes(role.toLowerCase())) {
            return res.status(403).json({
                status: 403,
                data: null,
                message: "Forbidden Access: Invalid role assignment.",
                error: null,
            });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                status: 409,
                data: null,
                message: "Email already exists.",
                error: null,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role: role.toLowerCase(),
        });

        return res.status(201).json({
            status: 201,
            data: {
                user_id: newUser.user_id,
                email: newUser.email,
                role: newUser.role,
            },
            message: "User created successfully.",
            error: null,
        });
    } catch (error) {
        console.error("Error adding user:", error);
        return res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Retrieve all users (Admin only)
const getUsers = async (req, res) => {
    try {
        const { limit = 5, offset = 0, role } = req.query;

        // Filter users by role if provided
        const whereClause = role ? { role: role.toLowerCase() } : {};

        const users = await User.findAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            attributes: ['user_id', 'email', 'role'], // Limit fields in response
        });

        return res.status(200).json({
            status: 200,
            data: users,
            message: "Users retrieved successfully.",
            error: null,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Delete a user (Admin only)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user exists
        const user = await User.findOne({ where: { user_id: id } });
        if (!user) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: "User not found.",
                error: null,
            });
        }

        // Prevent deletion of other admins
        if (user.role === 'admin') {
            return res.status(403).json({
                status: 403,
                data: null,
                message: "Forbidden: Cannot delete an admin.",
                error: null,
            });
        }

        await user.destroy();

        return res.status(200).json({
            status: 200,
            data: { user_id: id },
            message: "User deleted successfully.",
            error: null,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Update a user's password (Self only)
const updatePassword = async (req, res) => {
    try {
        const { old_password, new_password } = req.body;
        const userId = req.user.userId; // Assuming middleware sets req.user

        // Validate input
        if (!old_password || !new_password) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Bad Request, Reason: Missing fields",
                error: null,
            });
        }

        // Find the user
        const user = await User.findOne({ where: { user_id: userId } });
        if (!user) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: "User not found.",
                error: null,
            });
        }

        // Verify old password
        const isPasswordValid = await bcrypt.compare(old_password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Old password is incorrect.",
                error: null,
            });
        }

        // Hash the new password and update
        const hashedPassword = await bcrypt.hash(new_password, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(204).send(); // No content
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

module.exports = {
    addUser,
    getUsers,
    deleteUser,
    updatePassword,
};
