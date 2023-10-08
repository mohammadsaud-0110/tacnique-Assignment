const mongoose = require("mongoose");

// Disable strict mode for queries (optional)
mongoose.set('strictQuery', false);

// Load environment variables
require("dotenv").config();

// Establish connection to the MongoDB database using the provided URL from environment variables
const connection = mongoose.connect(process.env.mognoURL);

module.exports = {
    connection
};
