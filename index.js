const express = require("express");
const cors = require('cors');
const fs = require("fs");
const winston = require('winston');
expressWinston = require('express-winston');
const os = require('os');
require("dotenv").config();

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { authenticate } = require("./middlewares/auth.middleware");
const { taskRouter } = require("./routes/task.route");

const app = express();

// handling cors
app.use(cors());
// handling data format (parse - stringify)
app.use(express.json());

// logger middleware
app.use(expressWinston.logger({
    statusLevels : true,
    transports: [
      new winston.transports.Console({
        level : "info",
        json : true
      }),
      new winston.transports.File({
        level : "info",
        json : true,
        filename : "logs.txt"
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

// default route
app.get("/", (req, res) => {
    res.status(200).send({ "msg": "Server up and running" });
})

// user routes
app.use("/user", userRouter);

// authenticate  middleware
app.use(authenticate)

// task routes
app.use("/task", taskRouter);



// server start up, db connection
app.listen(process.env.PORT, async () => {
    try {
        // mongoDB connection
        await connection
            .then(() => {
                console.log("DB Connected");
            })
            .catch((err) => {
                console.log("Error", err);
            })
            ;
        console.log("Server port :", process.env.PORT);
    } catch (error) {
        console.log("Error :", error.message);
    }
})