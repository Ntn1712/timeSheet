const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        res.sendStatus(401);
      } else {
        req.user = result;
        next();
      }
    });
  } catch (err) {
    res.send(err.message);
  }
};
