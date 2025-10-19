"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import PropertyGrid from "./PropertyGrid";
import MapComponent from "./MapComponent";
import FilterPanel from "./FilterPanel";
import styles from "./CategoryPageContent.module.css";

interface CategoryPageContentProps {
  category: {id: string; name: string; apartments: Array<{id: string; title: string; image: string; rooms: number; floor: number; meters: number; price: number; location: string; category: string}>};
  searchParams: URLSearchParams;
  router: {push: (url: string) => void};
}

const CategoryPageContent = ({ category, searchParams, router }: CategoryPageContentProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    propertyType: searchParams.get('propertyType') || '',
    rooms: searchParams.get('rooms') || '',
    price: searchParams.get('price') || '',
    area: searchParams.get('area') || '',
    topArea: searchParams.get('topArea') || '',
    street: searchParams.get('street') || '',
    zoom: searchParams.get('zoom') || '15'
  });

  // Update URL when filters change
  const updateURL = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value as string);
      }
    });
    
    // Determine the correct URL based on category
    const basePath = category.id === 'all-properties' ? '/properties' : `/properties/${category.id}`;
    const newURL = `${basePath}?${params.toString()}`;
    router.push(newURL);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      city: '',
      propertyType: '',
      rooms: '',
      price: '',
      area: '',
      topArea: '',
      street: '',
      zoom: '15'
    };
    setFilters(clearedFilters);
    updateURL(clearedFilters);
  };

  return (
    <div className={styles.categoryPage}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <Container>
          <div className={styles.pageTitle}>
            <h1>{category.name}</h1>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className={styles.mainContent}>
        <Row>
          {/* Properties Grid - Left Side */}
          <Col xs={12} md={9} lg={8} xl={8} xxl={7} className={styles.propertiesSection}>
            <PropertyGrid 
              properties={category.apartments}
              filters={filters}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
          </Col>

          {/* Map Section - Right Side */}
          <Col xs={12} md={3} lg={4} xl={4} xxl={5} className={styles.mapSection}>
            <div className={styles.mapContainer}>
              <MapComponent 
                properties={category.apartments}
                filters={filters}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryPageContent;
