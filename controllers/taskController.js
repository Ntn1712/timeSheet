const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { Task } = require("../models/task");
const { User } = require("../models/user");

class taskController {
  constructor(taskDetails) {
    this.taskName = taskDetails.taskName;
    this.taskDate = taskDetails.taskDate;
    this.taskHour = taskDetails.taskHour;
  }

  async addTask(req) {
    const task = await Task.findOne({ taskName: this.taskName });
    if (task) return;
    const newTask = await Task.create({
      taskName: this.taskName,
      taskDate: this.taskDate,
      taskHour: this.taskHour,
      taskAuthor: req.user,
    });
    return newTask;
  }

  async updateTask(id) {
    await Task.updateOne(
      { _id: id },
      {
        $set: {
          taskName: this.taskName,
          taskDate: this.taskDate,
          taskHour: this.taskHour,
        },
      }
    );
    const task = await Task.findOne({ _id: id });
    return task;
  }

  static async deleteTask(id) {
    const task = await Task.findOne({ _id: id });
    const response = await Task.deleteOne({ _id: id });
    if (response.deletedCount == 0) return response.deletedCount;
    return task;
  }

  static async fetchTaskDate(date) {
    let da = new Date(date);
    const task = await Task.aggregate([
      {
        $match: { taskDate: da },
      },
      {
        $sort: { taskHour: 1 },
      },
    ]);
    if (!task) return;
    return task;
  }

  static async fetchTaskMonth(month, para, value, req) {
    var query = {};
    query[para] = parseInt(value);
    const task = await Task.aggregate([
      {
        $project: {
          taskName: 1,
          taskDate: 1,
          taskAuthor: 1,
          taskHour: 1,
          taskMonth: { $month: "$taskDate" },
        },
      },
      {
        $match: {
          $and: [{ taskMonth: month }, { taskAuthor: ObjectId(req.user._id) }],
        },
      },
      {
        $sort: query,
      },
      {
        $group: {
          _id: {
            taskAuthor: "$taskAuthor",
          },
          avgHours: {
            $avg: "$taskHour",
          },
        },
      },
    ]);
    return task;
  }
}

module.exports = taskController;
