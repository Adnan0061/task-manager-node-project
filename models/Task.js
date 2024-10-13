// const mongoose = require("mongoose");
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "must include name"],
    trim: true,
    minlength: [3, "name cannot be less than 3 character"],
    maxlength: [20, "name cannot be less than 20 character"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9\s\-_]+$/.test(v);
      },
      message: (props) =>
        `${props.value} contains invalid characters. Use only alphanumeric characters, spaces, hyphens, and underscores.`,
    },
  },
  description: {
    type: String,
    maxlength: [200, "name cannot be less than 20 character"],
    // validate: {
    //   validator: function (v) {
    //     return /^[a-zA-Z0-9\s\-_]+$/.test(v);
    //   },
    //   message: (props) =>
    //     `${props.value} contains invalid characters. Use only alphanumeric characters, spaces, hyphens, and underscores.`,
    // },
  },
  // isProtected: { type: Boolean, required: true, default: false },
  priority: {
    type: String,
    enum: {
      values: ["low", "medium", "high"],
      message: "priority validator failed",
    },
    required: true,
  },
  estimatedTime: { type: Number, required: true, default: 5 },
  completed: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
