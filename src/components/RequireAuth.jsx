import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const role = auth?.role;
  const check = role?.some((e) => allowedRoles.includes(e.authority));
  console.log(role);
  console.log(check);
  return check ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
