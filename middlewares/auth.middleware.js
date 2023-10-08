const jwt = require("jsonwebtoken");
const { BlackList } = require("../models/user.model")
require("dotenv").config();

// Middleware for user authentication using JWT
const authenticate = async (req, res, next) => {

    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).send({ "message": "Token Not Found", success: false });
    }

    const isPresent = await BlackList.exists({ token });
    if (isPresent) {
        res.status(401).send("Login again.");
    }
    // Verify the token using the accessToken and secret key
    jwt.verify(token, process.env.accessToken, (err, decoded) => {
        if (decoded) {
            // If token is valid, attach the user's ID to the request body
            req.body.userId = decoded.userId;
            next(); // Continue with the next middleware or route handler
        } else {
            // If token is not valid, respond with a 401 Unauthorized status
            res.status(401).send("Login again.");
        }
    });
}

// Export the authenticate middleware for use in other parts of the application
module.exports = {
    authenticate
}
