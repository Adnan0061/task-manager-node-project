// const mongoose = require("mongoose");
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "must include name"],
    trim: true,
    minlength: [3, "title cannot be less than 3 character"],
    maxlength: [60, "title cannot be more than 60 character"],
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
    maxlength: [600, "description cannot be more than 600 character"],
    default: "",
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
      values: ["low", "medium", "urgent"],
      message: "priority validator failed",
    },
    required: true,
    default: "low",
  },
  estimatedTime: { type: Number, required: true, default: 5 },
  completed: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
