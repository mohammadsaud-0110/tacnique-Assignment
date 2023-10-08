const validateTask = (req, res, next) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).send({ message: "Missing required fields" });
    }

    if (typeof title !== 'string' || typeof description !== 'string') {
        return res.status(400).send({ message: "Invalid data type for fields" });
    }

    next();
};

module.exports = { validateTask };
