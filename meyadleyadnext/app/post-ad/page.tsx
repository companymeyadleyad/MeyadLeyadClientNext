'use client';
import ProtectedClient from "../../components/Auth/ProtectedClientRoute"; // לפי מה שכבר יישמת
import dynamic from "next/dynamic";

const AdPostingForm = dynamic(
  () => import("@/components/AdPostingForm/AdPostingForm"),
  { ssr: false } // הטופס הוא Client + MobX, עדיף בלי SSR
);

export default function PostAdPage() {
  return (
    <ProtectedClient>
      <AdPostingForm />
    </ProtectedClient>
  );
}
