"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { Container, Spinner } from "react-bootstrap";
import { categoriesStore } from "@/stores/Categories.store";
import CategoryPageContent from "@/components/CategoryPage/CategoryPageContent";
import { CategoriesService } from "@/services/categoriesService";
import type { PropertyListItem } from "@/types/Property/PropertiesListResponse";

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

const CategoryPageInner = observer(function CategoryPageInner({ params }: CategoryPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<{id: string; name: string; apartments: PropertyListItem[]} | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Await params before using them
        const resolvedParams = await params;
        
        // Load categories if not already loaded
        if (!categoriesStore.categoriesFetched) {
          await categoriesStore.fetchCategories();
        }

        // Get properties list from API
        const categoriesService = new CategoriesService();
        const properties = await categoriesService.getPropertiesListByCategory(resolvedParams.categorySlug);
        
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

          setCategoryData({
            id: resolvedParams.categorySlug,
            name: properties[0].category, // Use the category from the first property
            apartments: apartments
          });
        }
      } catch (error) {
        console.error("Error loading category page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [params]);

  if (isLoading) {
    return (
      <Container className="py-5 text-center" style={{ direction: "rtl" }}>
        <Spinner animation="border" role="status" />
        <div className="mt-2">טוען דף קטגוריה...</div>
      </Container>
    );
  }

  if (!categoryData) {
    return (
      <Container className="py-5 text-center" style={{ direction: "rtl" }}>
        <h2>קטגוריה לא נמצאה</h2>
        <p>הקטגוריה המבוקשת לא קיימת במערכת.</p>
        <button 
          className="btn btn-primary"
          onClick={() => router.push('/properties')}
        >
          חזור לכל הנכסים
        </button>
      </Container>
    );
  }

  return (
    <CategoryPageContent 
      category={categoryData}
      searchParams={searchParams}
      router={router}
    />
  );
});

const CategoryPage = function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={
      <Container className="py-5 text-center" style={{ direction: "rtl" }}>
        <Spinner animation="border" role="status" />
        <div className="mt-2">טוען דף קטגוריה...</div>
      </Container>
    }>
      <CategoryPageInner params={params} />
    </Suspense>
  );
};

export default CategoryPage;
