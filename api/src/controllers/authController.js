const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, passwordHash: hashed },
    });
    const token = createToken(user);
    res.status(201).json({ message: "User created", userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Username may already be taken" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = createToken(user);
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};
