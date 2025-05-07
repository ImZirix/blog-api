import { Navigate } from "react-router-dom";

function GuestRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/" /> : children;
}

export default GuestRoute;
