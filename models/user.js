const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT = 12;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const hashingPass = (password) => {
  return bcrypt.hashSync(password, SALT);
};

const comparePass = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const User = mongoose.model("User", userSchema);

module.exports = { hashingPass, comparePass, User };
