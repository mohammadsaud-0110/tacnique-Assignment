const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { versionKey: false });

const UserModel = new mongoose.model("user", userSchema);

const blackListSchema = mongoose.Schema({
    token: { type: String, required: true },
}, { versionKey: false });

const BlackList = new mongoose.model("blacklist", blackListSchema);

module.exports = {
    UserModel,
    BlackList
}