"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import BottomNavBar from "@/components/BottomNavBar/BottomNavBar";
import { userStore } from "@/stores/User.store";

const BottomNavBarGate: React.FC = observer(() => {
  // Mount guard to avoid SSR/CSR mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (!userStore.isLoggedIn) return null;

  return <BottomNavBar />;
});

export default BottomNavBarGate;
