require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ origin: "https://blog-api-one-delta.vercel.app" }));
app.use(express.json());

//Routes
const postRoutes = require("./src/routes/posts");
app.use("/posts", postRoutes);

const authRoutes = require("./src/routes/auth");
app.use("/auth", authRoutes);

const commentRoutes = require("./src/routes/comments");
app.use("/posts", commentRoutes);

const userRoutes = require("./src/routes/user");
app.use("/user", userRoutes);

const logoutRoutes = require("./src/routes/logout");
app.use("/logout", logoutRoutes);

app.listen(process.env.PORT || 3000, async () => {
  console.log(`Server is running on ${process.env.PORT || 3000}`);
});
