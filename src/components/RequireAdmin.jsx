import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdminSession } from "../utils/authStorage";
import { APP_ROUTES } from "../utils/legacyRoutes";

export default function RequireAdmin() {
  const location = useLocation();

  if (!isAdminSession()) {
    return (
      <Navigate
        replace
        state={{ from: location.pathname }}
        to={APP_ROUTES.dashboard}
      />
    );
  }

  return <Outlet />;
}
