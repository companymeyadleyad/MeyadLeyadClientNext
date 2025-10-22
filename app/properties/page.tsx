"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { Container, Spinner } from "react-bootstrap";
import { categoriesStore } from "@/stores/Categories.store";
import CategoryPageContent from "@/components/CategoryPage/CategoryPageContent";
import { CategoriesService } from "@/services/categoriesService";
import type { PropertyListItem } from "@/types/Property/PropertiesListResponse";

const PropertiesPageContent = observer(function PropertiesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [allProperties, setAllProperties] = useState<{id: string; name: string; apartments: PropertyListItem[]} | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Load categories if not already loaded
        if (!categoriesStore.categoriesFetched) {
          await categoriesStore.fetchCategories();
        }

        // Get all properties from API (using 'forsale' as default category)
        const categoriesService = new CategoriesService();
        const properties = await categoriesService.getPropertiesListByCategory('forsale');
        
        if (properties && properties.length > 0) {
          // Convert PropertyListItem[] to the format expected by CategoryPageContent
          const apartments = properties.map(property => ({
            id: property.id,
            title: property.title,
            image: property.image,
            rooms: property.rooms,
            floor: property.floor,
            meters: property.meters,
            price: property.price,
            location: property.location,
            category: property.category
          }));

          // Create a virtual "all properties" category
          const allPropertiesCategory = {
            id: "all-properties",
            name: "כל הנכסים",
            apartments: apartments
          };

          setAllProperties(allPropertiesCategory);
        }
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
