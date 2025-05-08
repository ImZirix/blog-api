import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get(`/posts?page=${currentPage}`);
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-grow">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {post.author.username}
                </p>
                <h2 className="text-xl font-semibold mt-2 mb-3 text-gray-900">
                  {post.title}
                </h2>
                <p className="text-gray-700 text-base line-clamp-3">
                  {post.body}
                </p>
                <p className="text-gray-400 text-base line-clamp-3">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No posts available
          </p>
        )}
      </div>

      <div className="flex justify-center items-center space-x-4 mt-8 mb-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition duration-200"
        >
          Prev
        </button>
        <span className="text-lg font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
