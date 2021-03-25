const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_SECRET;

module.exports = (_id, username, password) => {
  try {
    return jwt.sign({ _id, username, password }, privateKey, {
      expiresIn: "10h",
    });
  } catch (err) {
    console.log(err);
  }
};
