const validateTask = (req, res, next) => {
    // Extracting title and description from the request body
    const { title, description } = req.body;

    // Checking if title or description are missing
    if (!title || !description) {
        return res.status(400).send({ message: "Missing required fields" });
    }

    // Checking if title and description are of string type
    if (typeof title !== 'string' || typeof description !== 'string') {
        return res.status(400).send({ message: "Invalid data type for fields" });
    }

    // If all validations pass, proceed to the next middleware or route handler
    next();
};

// Exporting the validateTask middleware for use in other parts of the application
module.exports = { validateTask };
