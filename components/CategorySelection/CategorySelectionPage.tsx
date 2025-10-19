"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { Container, Spinner } from "react-bootstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import { categoriesStore } from "@/stores/Categories.store";
import SystemSelection, {
  type SystemOption,
} from "@/components/Common/SystemSelection/SystemSelection";
import { createSlug } from "@/utils/categoryUtils";

const CategorySelectionPage = observer(function CategorySelectionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        if (!categoriesStore.categoriesFetched) {
          await categoriesStore.fetchCategories();
        }
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    init();
    return () => {
      mounted = false;
    };
  }, []);

  const handleOptionSelect = async (optionId: number | string) => {
    try {
      // keep the selected category in the store (so we don't need location state)
      categoriesStore.setCategoryNumberSelected(Number(optionId));

      await categoriesStore.fetchCategoryLevels(Number(optionId));

      // Get the category slug from the store or use a fallback
      const selectedCategory = categoriesStore.categories.find(cat => cat.categoryNumber === Number(optionId));
      const slug = selectedCategory?.categoryName ? createSlug(selectedCategory.categoryName) : `category-${optionId}`;
      
      // Navigate to the new properties structure
      router.push(`/properties/${slug}`);
    } catch (error) {
      console.error("Error fetching category levels:", error);
    }
  };

  // Map category numbers to icons (adjust as you wish)
  const getCategoryIcon = (categoryNumber: number) => {
    const iconMap: Record<number, typeof faHome> = {
      1: faHome,
      2: faHome,
      3: faHome,
      4: faHome,
    };
    return iconMap[categoryNumber] || faHome;
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center" style={{ direction: "rtl" }}>
        <Spinner animation="border" role="status" />
        <div className="mt-2">טוען קטגוריות...</div>
      </Container>
    );
  }

  const systemOptions: SystemOption[] = categoriesStore.categories.map((c) => ({
    id: c.categoryNumber,
    name: c.categoryName,
    // SystemSelection can render FontAwesomeIcon or you can pass the specific icon ref
    icon: getCategoryIcon(c.categoryNumber),
  }));

  return (
    <SystemSelection
      options={systemOptions}
      onOptionSelect={handleOptionSelect}
      title="בחר קטגוריה"
    />
  );
});

export default CategorySelectionPage;
