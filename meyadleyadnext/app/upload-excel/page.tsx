'use client';

import ProtectedClientRoute from "@/components/Auth/ProtectedClientRoute";
import dynamic from "next/dynamic";

// Avoid SSR for this screen because it handles file inputs and browser-only APIs
const UploadExcelForm = dynamic(
  () => import("@/components/UploadExcel/UploadExcelForm"),
  { ssr: false }
);

export default function UploadExcelPage() {
  return (
    <ProtectedClientRoute>
      <UploadExcelForm />
    </ProtectedClientRoute>
  );
}
