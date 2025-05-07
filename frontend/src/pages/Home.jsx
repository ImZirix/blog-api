import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <p className="text-sm text-gray-500 font-medium">
              {post.author.username}
            </p>
            <h2 className="text-xl font-semibold mt-2 mb-3 text-gray-900">
              <Link
                to={`/post/${post.id}`}
                className="hover:text-blue-500 hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-700 text-base">
              {post.body.slice(0, 100)}...
            </p>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No posts available
        </p>
      )}
    </div>
  );
}

export default Home;
