const router = require("express").Router();

router.post("/", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
  res.status(200).json({ message: "logged out successfully" });
});

module.exports = router;
