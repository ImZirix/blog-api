// routes/commentRoutes.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/:postId/comments", authMiddleware, commentController.addComment);
router.get("/:postId/comments", commentController.getCommentsByPost);

router.delete(
  "/admin/comments/:id",
  adminMiddleware,
  commentController.deleteComment
);
router.put(
  "/admin/comments/:id",
  adminMiddleware,
  commentController.updateComment
);

module.exports = router;
