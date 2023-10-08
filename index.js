const express = require("express");
const cors = require('cors');
const fs = require("fs");
const winston = require('winston');
const expressWinston = require('express-winston'); // Added missing const keyword
const os = require('os');
require("dotenv").config();

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { authenticate } = require("./middlewares/auth.middleware");
const { taskRouter } = require("./routes/task.route");
const { limiter } = require("./middlewares/rateLimiter.middleware");

const app = express();

// Handling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parsing request body as JSON
app.use(express.json());

// Logger middleware configuration
app.use(expressWinston.logger({
    statusLevels: true,
    transports: [
        // Console Transport for logging to console
        // new winston.transports.Console({
        //     level: "info",
        //     json: true
        // }),
        // File Transport for saving logs to a file
        new winston.transports.File({
            level: "info",
            json: true,
            filename: "logs.txt"
        })
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, meta }) => {
            const userAgent = meta.req.headers['user-agent'];
            const browser = userAgent ? userAgent.split(') ')[0].split(' ')[1] : undefined;
            const windowsInfo = os.type() === 'Windows_NT' ? os.release() : undefined;
            return `${level} ${meta.req.method} ${meta.req.url} ${meta.res.statusCode}, Browser: ${browser}, Windows Info: ${windowsInfo}`;
        })
    )
}));

// Rate limiter middleware
app.use(limiter);

// Default route
app.get("/", (req, res) => {
    res.status(200).send({ "msg": "Server up and running" });
});

// User routes
app.use("/user", userRouter);

// Authenticate middleware
app.use(authenticate);

// Task routes
app.use("/task", taskRouter);

// Error-handling middleware for non-existent routes
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

// Custom error-handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});




// Server startup and database connection
app.listen(process.env.PORT, async () => {
    try {
        // MongoDB connection
        await connection
            .then(() => {
                console.log("DB Connected");
            })
            .catch((err) => {
                console.log("Error", err);
            });
        console.log("Server port :", process.env.PORT);
    } catch (error) {
        console.log("Error :", error.message);
    }
});
