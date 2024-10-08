const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async-wrapper");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(201).json({ tasks });
});
const createPost = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const getTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    res.status(404).send(`No task found with the id ${req.params.id}`);
  }
  res.status(201).json(task);
});
const updateTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    res.status(404).send(`No task found with the id ${req.params.id}`);
  }
  res.status(201).json(task);
});
const deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });
  if (!task) {
    res.status(404).send(`No task found with the id ${req.params.id}`);
  }
  res.status(201).json(task);
});

module.exports = {
  getAllTasks,
  createPost,
  getTask,
  updateTask,
  deleteTask,
};
