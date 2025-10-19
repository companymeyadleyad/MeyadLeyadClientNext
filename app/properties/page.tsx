"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { Container, Spinner } from "react-bootstrap";
import { categoriesStore } from "@/stores/Categories.store";
import CategoryPageContent from "@/components/CategoryPage/CategoryPageContent";
import { mockCategories } from "@/data/mockApartments";

const PropertiesPageContent = observer(function PropertiesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [allProperties, setAllProperties] = useState<{id: string; name: string; apartments: Array<{id: string; title: string; image: string; rooms: number; floor: number; meters: number; price: number; location: string; category: string}>} | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Load categories if not already loaded
        if (!categoriesStore.categoriesFetched) {
          await categoriesStore.fetchCategories();
        }

        // Combine all properties from all categories
        const combinedProperties = mockCategories.reduce((acc: Array<{id: string; title: string; image: string; rooms: number; floor: number; meters: number; price: number; location: string; category: string}>, category) => {
          return [...acc, ...category.apartments];
        }, [] as Array<{id: string; title: string; image: string; rooms: number; floor: number; meters: number; price: number; location: string; category: string}>);

        // Create a virtual "all properties" category
        const allPropertiesCategory = {
          id: "all-properties",
          name: "כל הנכסים",
          apartments: combinedProperties
        };

        setAllProperties(allPropertiesCategory);
      } catch (error) {
        console.error("Error loading all properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  if (isLoading) {
    return (
      <Container className="py-5 text-center" style={{ direction: "rtl" }}>
        <Spinner animation="border" role="status" />
        <div className="mt-2">טוען כל הנכסים...</div>
      </Container>
    );
  }

  if (!allProperties) {
    return (
      <Container className="py-5 text-center" style={{ direction: "rtl" }}>
        <h2>שגיאה בטעינת הנתונים</h2>
        <p>לא ניתן לטעון את הנכסים כרגע.</p>
      </Container>
    );
  }

  return (
    <CategoryPageContent 
      category={allProperties}
      searchParams={searchParams}
      router={router}
    />
  );
});

const PropertiesPage = function PropertiesPage() {
  return (
    <Suspense fallback={
      <Container className="py-5 text-center" style={{ direction: "rtl" }}>
        <Spinner animation="border" role="status" />
        <div className="mt-2">טוען כל הנכסים...</div>
      </Container>
    }>
      <PropertiesPageContent />
    </Suspense>
  );
};

export default PropertiesPage;
