const { TaskModel } = require('../models/task.model');

// Add new task
const addTask = async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    // Create a new task using TaskModel
    const task = new TaskModel({ title, description, userId });
    await task.save(); // Save the task to the database
    res.status(201).send({ message: 'Task added successfully', task }); // Send success response
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong', error: error.message }); // Send error response
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    // Retrieve all tasks and populate the 'userId' field with user details
    const tasks = await TaskModel.find().populate('userId', '_id name email');
    res.status(200).send(tasks); // Send tasks as response
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong', error: error.message }); // Send error response
  }
};

// Get task by taskId
const getTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
    // Find a task by its ID
    const task = await TaskModel.findById(taskId);
    if (!task) {
      return res.status(404).send({ message: 'Task not found' }); // If task not found, send 404 response
    }
    res.status(200).send(task); // Send task as response
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong', error: error.message }); // Send error response
  }
};

// Get tasks by userId
const getTasksByUserId = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find tasks associated with a specific user
    const tasks = await TaskModel.find({ userId });
    res.status(200).send(tasks); // Send tasks as response
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong', error: error.message }); // Send error response
  }
};

// Update task details by taskId
const updateTaskById = async (req, res) => {
  const taskId = req.params.id;
  const updates = req.body;

  try {
    // Find and update a task by its ID
    const task = await TaskModel.findByIdAndUpdate(taskId, updates, { new: true });
    if (!task) {
      return res.status(404).send({ message: 'Task not found' }); // If task not found, send 404 response
    }
    res.status(200).send({ message: 'Task updated successfully', task }); // Send success response
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong', error: error.message }); // Send error response
  }
};

// Delete task details by taskId
const deleteTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
    // Find and delete a task by its ID
    const task = await TaskModel.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).send({ message: 'Task not found' }); // If task not found, send 404 response
    }
    res.status(200).send({ message: 'Task deleted successfully', task }); // Send success response
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong', error: error.message }); // Send error response
  }
};

module.exports = {
  addTask,
  getAllTasks,
  getTaskById,
  getTasksByUserId,
  updateTaskById,
  deleteTaskById
};
