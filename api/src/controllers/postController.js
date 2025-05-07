const prisma = require("../lib/prisma");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { comments: true, author: true },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
};

exports.getPostById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        comments: true,
        author: true,
      },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post." });
  }
};

exports.createPost = async (req, res) => {
  const { title, body, published } = req.body;
  const userId = req.user?.id; //this
  try {
    const post = await prisma.post.create({
      data: {
        title,
        body,
        published,
        authorId: userId || 1,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post." });
  }
};
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, body },
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

exports.togglePublish = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { published: !post.published },
    });

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to toggle publish status" });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
