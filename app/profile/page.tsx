// app/profile/page.tsx
"use client";

import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import Profile from "@/components/Profile/Profile";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
}
