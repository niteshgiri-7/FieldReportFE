import { Navigate, Outlet } from 'react-router-dom';

const ProtectedUserRoute = () => {


  const finalRole =  localStorage.getItem("role");
  const finalUserId =  localStorage.getItem("userId");

  if (!finalRole || !finalUserId) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedUserRoute;

