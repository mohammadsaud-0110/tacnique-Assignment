const validateRegistration = (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if name is provided and is at least 3 characters long
    if (!name || name.length < 3) {
        return res.status(400).send({ message: "Name must be at least 3 characters long" });
    }

    // Check if a valid email is provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).send({ message: "Invalid email address" });
    }

    // Check if password is provided and is at least 8 characters long
    if (!password || password.length < 3) {
        return res.status(400).send({ message: "Password must be at least 8 characters long" });
    }

    // If all validations pass, move to the next middleware/route handler
    next();
}

module.exports = { validateRegistration };
