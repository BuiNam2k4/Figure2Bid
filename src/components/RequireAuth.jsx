import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ensureValidAccessToken } from "../services/authService";
import { hasValidAccessToken } from "../utils/authStorage";
import { APP_ROUTES } from "../utils/legacyRoutes";

export default function RequireAuth({ redirectTo = APP_ROUTES.login }) {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(!hasValidAccessToken());
  const [isAllowed, setIsAllowed] = useState(hasValidAccessToken());

  useEffect(() => {
    let isMounted = true;

    if (hasValidAccessToken()) {
      setIsAllowed(true);
      setIsChecking(false);
      return () => {
        isMounted = false;
      };
    }

    const verifySession = async () => {
      setIsChecking(true);
      try {
        await ensureValidAccessToken();
        if (isMounted) {
          setIsAllowed(true);
        }
      } catch {
        if (isMounted) {
          setIsAllowed(false);
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  if (isChecking) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center bg-surface">
        <p className="font-body text-on-surface-variant">Dang xac thuc phien dang nhap...</p>
      </main>
    );
  }

  if (!isAllowed) {
    return <Navigate replace state={{ from: location.pathname }} to={redirectTo} />;
  }

  return <Outlet />;
}

