const express = require("express");
const userController = require("../controllers/userController");
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

router.post("/user/update", checkAuth, async (req, res) => {
  let { username, password } = req.body;
  if (username && password) {
    username = username.trim();
    password = password.trim();
  }
  if (!username || !password)
    return res.status(403).send("Username/password cant be empty");
  const details = new userController({ username, password });
  const user = await details.updateUser(req);
  if (user == 0) return res.status(403).send("Error Updating User");
  res.status(200).send(user);
});

router.get("/user/delete", checkAuth, async (req, res) => {
  const user = await userController.deleteUser(req);
  if (user == 0) return res.status(403).send("Error Deleting User");
  res.status(200).send(user);
});

router.get("/user/task", checkAuth, async (req, res) => {
  const tasks = await userController.findUserTask(req);
  if (!tasks) return res.status(200).send("cannot found any task");
  res.status(200).send(tasks);
});

module.exports = router;
