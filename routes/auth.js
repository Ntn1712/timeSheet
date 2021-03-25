const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", async (req, res) => {
  let { username, password } = req.body;
  if (username && password) {
    username = username.trim();
    password = password.trim();
  }
  if (!username || !password)
    return res.status(403).send("Username/password cant be empty");
  const details = new authController({ username, password });
  const det = await details.signUp();
  if (!det) return res.status(500).send("User already exist");
  res.status(200).send(det);
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  if (username && password) {
    username = username.trim();
    password = password.trim();
  }
  if (!username || !password)
    return res.status(403).send("Username/Password cant be empty");
  const details = new authController({ username, password });
  const token = await details.login();
  if (!token) return res.status(500).send("Incorret Username/Password");
  res.status(200).send(token);
});

module.exports = router;
