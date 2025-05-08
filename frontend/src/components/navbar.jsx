import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <nav className="px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-gray-900"
        >
          Bonjour 🥐
        </Link>
        <div className="flex gap-4 mt-2 sm:mt-0 text-lg font-medium text-gray-700">
          {token ? (
            <>
              <Link to="/" className="hover:text-gray-900">
                Home
              </Link>
              <Link to="/create-post" className="hover:text-gray-900">
                Create
              </Link>
              <Link
                to="/"
                onClick={handleLogout}
                className="hover:text-gray-900"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-900">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-900">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
