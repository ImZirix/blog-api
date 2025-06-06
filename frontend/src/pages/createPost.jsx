import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await API.post("/posts", { title, body });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Post creation failed");
    }
  };

  return (
    <div className="max-w-3xl mt-20 mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
        Create a New Post
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>
        <div>
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-40 text-lg"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-3 px-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit Post
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
}

export default CreatePost;
