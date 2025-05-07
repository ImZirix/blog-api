const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", authMiddleware, postController.createPost);
//admin
router.post("/admin", authMiddleware, postController.createPost);
router.put("/admin/:id", authMiddleware, postController.updatePost);
router.patch(
  "/admin/:id/publish",
  authMiddleware,
  postController.togglePublish
);
router.delete("/admin/:id", authMiddleware, postController.deletePost);

module.exports = router;
