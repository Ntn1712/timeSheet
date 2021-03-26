const express = require("express");

const { Task } = require("../models/task");
const { User } = require("../models/user");
const taskController = require("../controllers/taskController");
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

router.post("/add", checkAuth, async (req, res) => {
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

router.post("/update/:id", checkAuth, async (req, res) => {
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

router.post("/delete/:id", checkAuth, async (req, res) => {
  const { id } = req.params.id;
  if (id.length !== 24) return res.status(500).send("Invalid Task id");
  const task = await taskController.deleteTask(id);
  if (task == 0) return res.status(403).send("Error Deleting Task");
  res.status(200).send(task);
});

router.get("/date", checkAuth, async (req, res) => {
  let { date, sortingParameter, value } = req.body;
  if (date && sortingParameter && value) {
    date = date.trim();
    sortingParameter = sortingParameter.trim();
    value = value.trim();
  }
  if (!date || sortingParameter || !value)
    return res.status(403).send("All Details are required");
  const task = await taskController.fetchTaskDate(
    date,
    sortingParameter,
    value
  );
  if (!task) return res.status(200).send("No task Found");
  res.status(200).send(task);
});

router.get("/month", checkAuth, async (req, res) => {
  let { month, sortingParameter, value } = req.body;
  if (month && sortingParameter && value) {
    month = month.trim();
    sortingParameter = sortingParameter.trim();
    value = value.trim();
  }
  if (!month || !sortingParameter || !value)
    return res.status(403).send("All Details are required");
  month = parseInt(month);
  const task = await taskController.fetchTaskMonth(
    month,
    sortingParameter,
    value,
    req
  );
  if (!task) res.status(200).send("No task Found");
  res.status(200).send(task);
});

router.get("/week", checkAuth, async (req, res) => {
  let { startDate } = req.body;
  if (startDate) {
    startDate = startDate.trim();
  }
  if (!startDate) return res.status(403).send("Start Date is required");
  const task = await taskController.fetchTaskWeek(startDate);
  if (!task) return res.status(200).send("No task Found");
  res.status(200).send(task);
});

module.exports = router;
