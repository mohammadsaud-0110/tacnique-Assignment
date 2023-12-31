const { UserModel, BlackList } = require("../models/user.model")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// new user registration
const UserRegistration = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            res.status(409).send({ "message": "Email already present!" })
        }
        else {
            // hashing password before saving
            bcrypt.hash(password, 6, async (err, hash) => {
                if (err) {
                    res.status(500).send({ "message": "Something went wrong", "Error": err.message })
                }
                else {
                    const user = new UserModel({ name, email, password: hash })
                    await user.save();
                    res.status(201).send({ "message": "User Registered Successfully" })
                }
            });
        }
    }
    catch (error) {
        res.status(500).send({ "message": "Something went wrong", "Error": error.message })
    }
}


// user login
const UserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            // Compare the provided password with the hashed password
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    // generating and sending access token upon successful login
                    let token = jwt.sign({ userId: user._id }, process.env.accessToken);
                    res.status(200).send({ "message": "Login Successfully", "access Token": token, userId: user._id })
                }
                else if (!result) {
                    res.status(401).send({ "message": "Wrong Password" });
                }
                else {
                    res.status(500).send({ "message": "Something went wrong", "Error": err.message });
                }
            })
        }
        else {
            res.status(404).send({ "message": "Email not registered" });
        }
    }
    catch (error) {
        res.status(500).send({ "message": "Unable to login", "error": error.message });
    }
}


// to get all registrations
const AllUsers = async (req, res) => {
    try {
        const user = await UserModel.find()
        res.status(200).send({ "message": "All registered Users", "data": user });
    }
    catch (error) {
        res.status(500).send({ "message": "Something went wrong!", "error": error.message });
    }
}

const LogOut = async (req, res) => {
    try {
        // Extract the token from the request headers
        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).send({ "message": "Token Not Found", success: false });
        }

        const isPresent = await BlackList.exists({ token });

        if (!isPresent) {
            // Add Token To blacklist Model for Security
            const blacklistToken = new BlackList({ token });

            // Save The Token
            await blacklistToken.save();

            // Return Success Response
            return res.status(200).send({ "message": "Logout Succesfully", success: true });
        } else {
            return res.status(200).send({ "message": "Already Logged Out", success: false });
        }
    }
    catch (error) {
        res.status(500).send({ "message": "Something went wrong!", "error": error.message, success: false });
    }
}



module.exports = {
    UserRegistration,
    UserLogin,
    AllUsers,
    LogOut
}