const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware for user authentication using JWT
const authenticate = (req, res, next) => {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (token) {
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
    } else {
        // If no token is provided, respond with a 401 Unauthorized status
        res.status(401).send("Not logged in!");
    }
}

// Export the authenticate middleware for use in other parts of the application
module.exports = {
    authenticate
}
