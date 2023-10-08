const express = require("express");
const { validateRegistration } = require("../middlewares/registration.middleware");
const { UserRegistration, UserLogin, AllUsers, LogOut } = require("../controller/user.controller");

const userRouter = express.Router()
userRouter.use(express.json());


// to register new user
userRouter.post("/register", validateRegistration, UserRegistration);

// user login in
userRouter.post("/login", UserLogin);

// to check all registration
userRouter.get("/allusers", AllUsers);

// to logout
userRouter.post("/logout", LogOut);

// Error-handling middleware for non-existent routes
userRouter.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

// Custom error-handling middleware
userRouter.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});


module.exports = {
    userRouter
}