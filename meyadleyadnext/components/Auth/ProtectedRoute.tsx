// components/auth/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { UserService } from "@/services/userService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = observer(({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const validateAuth = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

      if (!token) {
        setIsAuthenticated(false);
        router.replace(`/login?from=${encodeURIComponent(pathname || "/")}`);
        return;
      }

      try {
        const userService = new UserService();
        const response = await userService.authenticate();
        const ok = response?.success === true;
        setIsAuthenticated(ok);

        if (!ok) {
          router.replace(`/login?from=${encodeURIComponent(pathname || "/")}`);
        }
      } catch (err) {
        console.error("Authentication validation failed:", err);
        setIsAuthenticated(false);
        router.replace(`/login?from=${encodeURIComponent(pathname || "/")}`);
      }
    };

    validateAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (isAuthenticated === null) {
    return <div style={{ padding: 24 }}>Loading...</div>;
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
});

export default ProtectedRoute;
