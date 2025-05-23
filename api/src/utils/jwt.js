const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.createToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.name, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
