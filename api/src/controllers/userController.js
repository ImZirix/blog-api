const prisma = require("../lib/prisma");

exports.viewUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        username: true,
        bio: true,
        avatarUrl: true,
      },
    });
    if (!user) {
      return res.status(404).json({ erorr: "user not found" });
    }
    res.json({ info: user });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving user data" });
  }
};
