const { TaskModel } = require('../models/task.model');

const addTask = async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    const task = new TaskModel({ title, description, userId });
    await task.save();
    res.status(201).send({ message: 'Task added successfully', task });
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong', error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find().populate('userId', '_id name email');
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong', error: error.message });
  }
};

const getTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await TaskModel.findById(taskId);
    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong', error: error.message });
  }
};

const getTasksByUserId = async (req, res) => {
  const userId = req.params.id;

  try {
    const tasks = await TaskModel.find({ userId });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong', error: error.message });
  }
};

const updateTaskById = async (req, res) => {
  const taskId = req.params.id;
  const updates = req.body;

  try {
    const task = await TaskModel.findByIdAndUpdate(taskId, updates, { new: true });
    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.status(200).send({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong', error: error.message });
  }
};

const deleteTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await TaskModel.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.status(200).send({ message: 'Task deleted successfully', task });
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong', error: error.message });
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
