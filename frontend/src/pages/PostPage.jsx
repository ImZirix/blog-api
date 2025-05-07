import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!newComment) return;

    try {
      const res = await API.post(`/posts/${postId}/comments`, {
        body: newComment,
      });
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, res.data],
      }));
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
  <div>
    <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
    <p className="text-gray-700">{post.body}</p>
  </div>

  <form onSubmit={handleCommentSubmit} className="space-y-4">
    <textarea
      value={newComment}
      onChange={handleCommentChange}
      placeholder="Add a comment..."
      rows="4"
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
    >
      Submit Comment
    </button>
  </form>

  <div className="space-y-4">
    {post.comments.length > 0 ? (
      post.comments.map((comment, index) => (
        <div
          key={index}
          className="p-4 border border-gray-200 rounded-md bg-gray-50"
        >
          <p className="text-sm text-gray-500 mb-1">
            {post.author?.username ?? "Unknown user"}
          </p>
          <p className="text-gray-800">{comment.body}</p>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No comments yet.</p>
    )}
  </div>
</div>

  );
}

export default PostPage;
