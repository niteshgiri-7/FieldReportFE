import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/getContext";

const ProtectedUserRoute = () => {
  const { userId, accessToken, role } = useUser();

  const finalRole = role || localStorage.getItem("role");
  const finalUserId = userId || localStorage.getItem("userId");

  if (!finalRole || !finalUserId || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedUserRoute;