const validateArtist = (req, res, next) => {
    const { name, grammy, hidden } = req.body;

    // Check if name is provided
    if (!name) {
        return res.status(400).json({
            status: 400,
            message: "Bad Request: 'name' is required.",
        });
    }

    // Validate optional fields
    if (grammy !== undefined && typeof grammy !== 'boolean') {
        return res.status(400).json({
            status: 400,
            message: "Bad Request: 'grammy' must be a boolean.",
        });
    }

    if (hidden !== undefined && typeof hidden !== 'boolean') {
        return res.status(400).json({
            status: 400,
            message: "Bad Request: 'hidden' must be a boolean.",
        });
    }

    next(); // Proceed to the next middleware or route handler
};

module.exports = validateArtist;
