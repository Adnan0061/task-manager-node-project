const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createPost,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/Task");

router.route("/").get(getAllTasks).post(createPost);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
