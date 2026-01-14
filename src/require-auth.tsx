import useAuth from "@/hooks/use-auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  // const isAuthenticated = true;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/account/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export const RedirectAuthUserGuard = () => {
  const { isAuthenticated } = useAuth();
  // const isAuthenticated = true;

  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  if (isAuthenticated) {
    return <Navigate to={from} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
