const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDate: {
    type: Date,
    required: true,
  },
  taskHour: {
    type: Number,
    required: true,
  },
  taskAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
