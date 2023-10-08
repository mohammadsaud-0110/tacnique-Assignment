const express = require("express");
const { validateTask } = require("../middlewares/task.middleware");
const { addTask, getAllTasks, getTaskById, getTasksByUserId, updateTaskById, deleteTaskById } = require("../controller/task.controller");


const taskRouter = express.Router();
taskRouter.use(express.json());


// to add new task
taskRouter.post("/tasks", validateTask, addTask);

// get all tasks
taskRouter.get("/tasks", getAllTasks);

// get task by taskId
taskRouter.get("/tasks/:id", getTaskById);

// get task by userId
taskRouter.get("/tasks/user/:id", getTasksByUserId);

// update task details by taskId
taskRouter.put("/tasks/:id", updateTaskById);

// delete task details by taskId
taskRouter.delete("/tasks/:id", deleteTaskById);



module.exports = {
    taskRouter
}