const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, { versionKey: false });


const TaskModel = new mongoose.model("task", taskSchema);

module.exports = {
    TaskModel
}