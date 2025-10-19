"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Container, Spinner } from "react-bootstrap";
import { categoriesStore } from "@/stores/Categories.store";
import CategoriesOverview from "@/components/CategoryPage/CategoriesOverview";

const CategoriesPage = observer(function CategoriesPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        if (!categoriesStore.categoriesFetched) {
          await categoriesStore.fetchCategories();
        }
      } catch (error) {
        console.error("Error loading categories:", error);
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
        <div className="mt-2">טוען קטגוריות...</div>
      </Container>
    );
  }

  return <CategoriesOverview />;
});

export default CategoriesPage;