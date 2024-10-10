const mongoose = require("mongoose");
const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async-wrapper");
const { createCustomError } = require("../errors/custom-error");
const errorHandlerMiddleware = require("../middleware/custom-error-handlers");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  // res.status(201).json({ tasks });
  res.status(201).json({
    status: "success",
    message: `Got all recieved`,
    tasks,
  });
});
const createPost = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    status: "success",
    message: `Task created`,
    task,
  });
});
const getTask = asyncWrapper(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(createCustomError("Invalid ObjectId", 400));
  }
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    return next(createCustomError("Task Not Found", 404));
  }
  res.status(201).json({
    status: "success",
    message: `Got the task`,
    task,
  });
});
const updateTask = asyncWrapper(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(createCustomError("Invalid ObjectId", 400));
  }
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(
      createCustomError(`No task found with the id ${req.params.id}`, 404)
    );
  }
  res.status(201).json({
    status: "success",
    message: `task updated`,
    task,
  });
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(createCustomError("Invalid ObjectId", 400));
  }
  const task = await Task.findOneAndDelete({ _id: req.params.id });
  if (!task) {
    return next(
      createCustomError(`No task found with the id ${req.params.id}`, 404)
    );
  }
  res.status(201).json({
    status: "success",
    message: `task deleted`,
    task,
  });
});

module.exports = {
  getAllTasks,
  createPost,
  getTask,
  updateTask,
  deleteTask,
};
