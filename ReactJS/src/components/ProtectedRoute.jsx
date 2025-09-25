import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  // return user ? <Outlet /> : <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
