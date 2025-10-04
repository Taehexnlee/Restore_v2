import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserInfoQuery } from "../../features/account/accountApi";

export default function RequireAuth() {
  const { data: user, isLoading } = useUserInfoQuery();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    // redirect to login and remember where we came from
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // authenticated → render the protected child route
  return <Outlet />;
}