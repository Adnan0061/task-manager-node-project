// const mongoose = require("mongoose");
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must include name"],
    trim: true,
    minlength: [3, "name cannot be less than 3 character"],
    maxlength: [20, "name cannot be less than 20 character"],
  },
  completed: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
