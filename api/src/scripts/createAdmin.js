const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdmin() {
  const username = "admin";
  const password = "admin";
  const email = "admin@example.com";
  const role = "ADMIN";

  const userExists = await prisma.user.findUnique({
    where: { username },
  });

  if (userExists) {
    console.log("Admin user already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      email,
      passwordHash: hashedPassword,
      role,
    },
  });

  console.log("Admin user created successfully");
  prisma.$disconnect();
}

createAdmin();
