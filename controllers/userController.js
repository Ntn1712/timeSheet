const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { User, hashingPass, comparePass } = require("../models/user");
const { Task } = require("../models/task");

class authController {
  constructor(userDetails) {
    this.username = userDetails.username;
    this.password = userDetails.password;
  }

  async updateUser(req) {
    try {
      const user = await User.updateOne(
        { _id: req.user.id },
        {
          $set: {
            username: this.username,
            password: hashingPass(this.password),
          },
        }
      );
      const newUser = await User.findOne({ _id: req.user.id });
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteUser(req) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      const response = await User.deleteOne({ _id: req.user.id });
      req.user = undefined;
      if (response.deletedCount == 0) return response.deletedCount;
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  static async findUserTask(req) {
    try {
      const task = await Task.aggregate([
        {
          $match: { taskAuthor: ObjectId(req.user._id) },
        },
      ]);
      if (!task) return;
      return task;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = authController;
