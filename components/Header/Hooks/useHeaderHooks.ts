"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { UserService } from "@/services/userService";

export const useHeaderHooks = () => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isAuthenticated = useCallback(async (): Promise<boolean> => {
    // localStorage קיים רק בצד לקוח
    if (typeof window === "undefined") return false;

    const token = localStorage.getItem("authToken");
    if (!token) return false;

    try {
      const userService = new UserService();
      const response = await userService.authenticate();
      // שמרתי את הבדיקה כפי שהייתה אצלך
      return response?.success === true;
    } catch (error) {
      console.error("Authentication validation failed:", error);
      return false;
    }
  }, []);

  const handleStartAdPosting = useCallback(async () => {
    // שומר על ההתנהגות המקורית (מעבר ישיר). אם תרצה לבדוק התחברות:
    // const ok = await isAuthenticated();
    // router.push(ok ? "/select-category" : "/login");
    router.push("/select-category");
  }, [router /* , isAuthenticated */]);

  const handleMouseEnter = useCallback((id: string) => {
    setOpenDropdown(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  const handleClick = useCallback((id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  }, []);

  return {
    openDropdown,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleStartAdPosting,
    isAuthenticated,
  };
};
