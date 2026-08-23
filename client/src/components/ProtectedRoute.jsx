import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorState from "./ui/ErrorState";

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/authentication" replace state={{ from: location.pathname }} />;
  }

  if (roles?.length && !roles.includes(role)) {
    return <ErrorState message={`This page calls endpoints restricted to ${roles.join(" or ")} accounts.`} />;
  }

  return children;
}
