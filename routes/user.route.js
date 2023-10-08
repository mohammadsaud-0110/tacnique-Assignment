const express = require("express");
const { validateRegistration } = require("../middlewares/registration.middleware");
const { UserRegistration, UserLogin, AllUsers } = require("../controller/user.controller");

const userRouter = express.Router()
userRouter.use(express.json());


// to register new user
userRouter.post("/register", validateRegistration, UserRegistration);

// user login in
userRouter.post("/login", UserLogin);

// to check all registration
userRouter.get("/allusers", AllUsers);



module.exports = {
    userRouter
}