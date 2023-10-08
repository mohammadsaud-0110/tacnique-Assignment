const rateLimit = require("express-rate-limit");

// Create a rate limiter middleware with specific configuration
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 15, // Allow 15 requests per windowMs
    handler: (req, res) => {
        // Handler function for when rate limit is exceeded
        res.status(429).json({ message: "Too many requests, please try again later." });
    }
});

// Export the limiter middleware for use in other parts of the application
module.exports = {
    limiter
}
