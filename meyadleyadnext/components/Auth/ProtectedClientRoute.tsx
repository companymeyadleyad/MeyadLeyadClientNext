"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserService } from "@/services/userService";

export default function ProtectedClientRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      if (!token) {
        setOk(false);
        router.replace(`/login?from=${encodeURIComponent(pathname || "/")}`);
        return;
      }
      try {
        const svc = new UserService();
        const res = await svc.authenticate();
        if (res?.success) setOk(true);
        else {
          setOk(false);
          router.replace(`/login?from=${encodeURIComponent(pathname || "/")}`);
        }
      } catch {
        setOk(false);
        router.replace(`/login?from=${encodeURIComponent(pathname || "/")}`);
      }
    })();
  }, [pathname, router]);

  if (ok === null) return <div style={{ padding: 24 }}>Loading…</div>;
  if (!ok) return null;
  return <>{children}</>;
}
