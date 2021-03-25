const express = require("express");

const { Task } = require("../models/task");
const { User } = require("../models/user");
const taskController = require("../controllers/taskController");
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

router.post("/task/add", checkAuth, async (req, res) => {
  let { taskName, taskDate, taskHour } = req.body;
  if (taskName && taskDate && taskHour) {
    taskName = taskName.trim();
    taskDate = taskDate.trim();
    taskHour = taskHour.trim();
  }
  if (!taskName || !taskDate || !taskHour)
    return res.status(403).send("All Details are required");
  const details = new taskController({ taskName, taskDate, taskHour });
  const task = await details.addTask(req);
  if (!task) return res.status(500).send("Task Already Exist");
  res.status(200).send(task);
});

router.post("/task/update/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  let { taskName, taskDate, taskHour } = req.body;
  if (id.length !== 24) return res.status(500).send("Invalid Task id");
  if (taskName && taskDate && taskHour) {
    taskName = taskName.trim();
    taskDate = taskDate.trim();
    taskHour = taskHour.trim();
  }
  if (!taskName || !taskDate || !taskHour)
    return res.status(403).send("All Details are required");
  const details = new taskController({ taskName, taskDate, taskHour });
  const task = await details.updateTask(id);
  if (!task) return res.status(500).send("Error Updating Task");
  res.status(200).send(task);
});

router.post("/task/delete/:id", checkAuth, async (req, res) => {
  const { id } = req.params.id;
  if (id.length !== 24) return res.status(500).send("Invalid Task id");
  const task = await taskController.deleteTask(id);
  if (task == 0) return res.status(403).send("Error Deleting Task");
  res.status(200).send(task);
});

router.get("/task/date", checkAuth, async (req, res) => {
  const { date } = req.body;
  const task = await taskController.fetchTaskDate(date);
  res.status(200).send(task);
});

router.get("/task/month", checkAuth, async (req, res) => {
  let { month, filterParameter, value } = req.body;
  month = parseInt(month);
  const task = await taskController.fetchTaskMonth(
    month,
    filterParameter,
    value,
    req
  );
  res.status(200).send(task);
});

module.exports = router;
