// app/mediation/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { faHandshake, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import SystemSelection, { type SystemOption } from "@/components/Common/SystemSelection/SystemSelection";
import { propertyStore } from "@/stores/Property.store";
import { categoriesStore } from "@/stores/Categories.store";

export default function MediationPage() {
  const router = useRouter();

  const brokerOptions: SystemOption[] = [
    { id: "broker", name: "תיווך", icon: faHandshake },
    { id: "no-broker", name: "ללא תיווך", icon: faUserCheck },
  ];

  const handleOptionSelect = (optionId: number | string) => {
    const isBroker = optionId === "broker";

    propertyStore.setPropertyToAdd({
      ...propertyStore.propertyToAdd,
      isMediation: isBroker,
    });

    // אם העמוד הבא צריך לדעת את הקטגוריה, נעביר בפרמטר שאילתה
    const category = categoriesStore.categoryNumberSelected;
    router.push(`/post-ad?category=${category}`);
  };

  return (
    <SystemSelection
      options={brokerOptions}
      onOptionSelect={handleOptionSelect}
      title="אנא בחר"
    />
  );
}
