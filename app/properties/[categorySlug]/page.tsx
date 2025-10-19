"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { Container, Spinner } from "react-bootstrap";
import { categoriesStore } from "@/stores/Categories.store";
import CategoryPageContent from "@/components/CategoryPage/CategoryPageContent";
import { mockCategories } from "@/data/mockApartments";
import { getCategoryBySlug } from "@/utils/categoryUtils";

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
}

const CategoryPageInner = observer(function CategoryPageInner({ params }: CategoryPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<{id: string; name: string; apartments: Array<{id: string; title: string; image: string; rooms: number; floor: number; meters: number; price: number; location: string; category: string}>} | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Load categories if not already loaded
        if (!categoriesStore.categoriesFetched) {
          await categoriesStore.fetchCategories();
        }

        // Get category data based on slug
        const category = getCategoryBySlug(params.categorySlug, mockCategories);
        if (category) {
          setCategoryData(category);
        }
      } catch (error) {
        console.error("Error loading category page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [params.categorySlug]);

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
