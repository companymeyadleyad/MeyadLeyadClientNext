// app/_providers/AuthHydrator.tsx
"use client";

import { useEffect } from "react";
import { userStore } from "@/stores/User.store";
import { UserService } from "@/services/userService";

export default function AuthHydrator() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
        if (!token) {
          if (!cancelled) userStore.setAuthHydrated(true);
          return;
        }

        const svc = new UserService();
        const auth = await svc.authenticate();
        if (cancelled) return;

        if (auth?.success) {
          const me = await svc.getCurrentUser();
          if (!cancelled) {
            if (me?.success) userStore.setUser(me.data);
            else userStore.isLoggedIn = true; // fallback
          }
        } else {
          userStore.clearUser();
        }
      } catch {
        userStore.clearUser();
      } finally {
        if (!cancelled) userStore.setAuthHydrated(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
