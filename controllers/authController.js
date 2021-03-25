const { User, hashingPass, comparePass } = require("../models/user");
const jwtSign = require("../utils/jwtSign");

class authController {
  constructor(userDetails) {
    this.username = userDetails.username;
    this.password = userDetails.password;
  }

  async signUp() {
    try {
      const user = await User.findOne({ username: this.username });
      if (user) return;
      const newUser = await User.create({
        username: this.username,
        password: hashingPass(this.password),
      });
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }

  async login() {
    try {
      const user = await User.findOne({ username: this.username });
      if (!user) return;
      const checkPass = comparePass(this.password, user.password);
      if (!checkPass) return;
      const token = jwtSign(user._id, this.username, this.password);
      return token;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = authController;
