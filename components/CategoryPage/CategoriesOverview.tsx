"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBuilding, faKey, faStar, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { categoriesStore } from "@/stores/Categories.store";
import { createSlug } from "@/utils/categoryUtils";
import styles from "./CategoriesOverview.module.css";

const CategoriesOverview = observer(function CategoriesOverview() {
  const router = useRouter();
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

  const handleCategoryClick = (category: {categoryNumber: number; categoryName: string}) => {
    const slug = createSlug(category.categoryName);
    router.push(`/properties/${slug}`);
  };

  const getCategoryIcon = (categoryNumber: number) => {
    const iconMap: Record<number, typeof faHome> = {
      1: faHome,
      2: faBuilding,
      3: faKey,
      4: faStar,
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

  return (
    <div className={styles.categoriesOverview}>
      <Container>
        <div className={styles.header}>
          <button 
            className={styles.backButton}
            onClick={() => router.push('/')}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            חזור לדף הבית
          </button>
          <h2>בחר קטגוריה</h2>
        </div>

        <Row className="g-4">
          {/* כל הנכסים */}
          <Col md={6} lg={3}>
            <Card 
              className={styles.categoryCard}
              onClick={() => router.push('/properties')}
            >
              <Card.Body className="text-center">
                <div className={styles.iconContainer}>
                  <FontAwesomeIcon icon={faHome} className={styles.categoryIcon} />
                </div>
                <Card.Title className={styles.categoryTitle}>
                  כל הנכסים
                </Card.Title>
                <Card.Text className={styles.categoryDescription}>
                  חפש בכל הנכסים הזמינים
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* קטגוריות מהשרת */}
          {categoriesStore.categories.map((category) => (
            <Col key={category.categoryNumber} md={6} lg={3}>
              <Card 
                className={styles.categoryCard}
                onClick={() => handleCategoryClick(category)}
              >
                <Card.Body className="text-center">
                  <div className={styles.iconContainer}>
                    <FontAwesomeIcon 
                      icon={getCategoryIcon(category.categoryNumber)} 
                      className={styles.categoryIcon} 
                    />
                  </div>
                  <Card.Title className={styles.categoryTitle}>
                    {category.categoryName}
                  </Card.Title>
                  <Card.Text className={styles.categoryDescription}>
                    {category.cities?.length || 0} ערים זמינות
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
});

export default CategoriesOverview;