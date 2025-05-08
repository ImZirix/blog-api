import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState("");
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
  const fetchComments = async () => {
    try {
      const comm = await API.get(`/posts/${postId}/comments`);
      setComments(comm.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
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
      await fetchComments();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6 mt-8">
      <div className="space-y-4">
        <p className="text-gray-700 font-medium">{post.author.username}</p>
        <h1 className="text-3xl font-extrabold text-gray-900">{post.title}</h1>
        <p className="text-gray-700 text-lg">{post.body}</p>
      </div>

      <form onSubmit={handleCommentSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          rows="4"
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          Submit Comment
        </button>
      </form>

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <strong className="text-gray-800 text-lg">
                  {comment.user?.username ?? "Unknown user"}
                </strong>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700 mt-2">{comment.body}</p>
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
