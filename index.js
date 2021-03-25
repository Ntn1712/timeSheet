require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
  "mongodb://localhost/timesheet",
  { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("database connection successfull");
  }
);

app.use(authRoutes);
app.use(userRoutes);
app.use(taskRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Listening on PORT: ${PORT}`);
});
