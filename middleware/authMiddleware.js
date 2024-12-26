const jwt = require('jsonwebtoken');
require('dotenv').config(); // For environment variables

const authMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1]; // Extract the token
            if (!token) {
                return res.status(401).json({
                    status: 401,
                    message: "Unauthorized: Token is missing.",
                });
            }

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach user details to the request

            // Check if user has the required role
            if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
                console.log(decoded.role);
                return res.status(403).json({
                    status: 403,
                    message: "Forbidden: Insufficient permissions.",
                });
            }

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error("Authentication error:", error.message);
            return res.status(401).json({
                status: 401,
                message: "Unauthorized: Invalid or expired token.",
            });
        }
    };
};

module.exports = authMiddleware;
