const prisma = require("../lib/prisma");

exports.addComment = async (req, res) => {
  const { postId } = req.params;
  const { body } = req.body;
  const userId = req.user.id;

  if (!body || body.trim() === "") {
    return res.status(400).json({ error: "Comment body cannot be empty" });
  }

  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const postExists = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });

    if (!postExists) {
      return res.status(404).json({ error: "Post not found" });
    }
    const newComment = await prisma.comment.create({
      data: {
        body,
        postId: parseInt(postId),
        userId,
      },
    });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.comment.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;

  try {
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { body },
    });
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: "Failed to update comment" });
  }
};
