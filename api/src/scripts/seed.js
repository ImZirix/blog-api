const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("test123", 10);

  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      username: "testuser",
      email: "test@example.com",
      passwordHash: hashedPassword,
      posts: {
        create: [
          {
            title: "First Published Post",
            body: "This is the body of the first published post.",
            published: true,
          },
          {
            title: "Unpublished Draft",
            body: "This is a draft and not published.",
            published: false,
          },
        ],
      },
    },
  });

  console.log("✅ Seed complete:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
