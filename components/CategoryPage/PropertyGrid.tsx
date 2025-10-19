"use client";

import { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import ApartmentCard from "../Homepage/ApartmentCard/ApartmentCard";
import styles from "./PropertyGrid.module.css";

interface Property {
  id: string;
  title: string;
  image: string;
  rooms: number;
  floor: number;
  meters: number;
  price: number;
  location: string;
  category: string;
}

interface PropertyGridProps {
  properties: Property[];
  filters: Record<string, string>;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const PropertyGrid = ({ properties, filters, showFilters, setShowFilters }: PropertyGridProps) => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [isLoading, setIsLoading] = useState(false);

  // Filter properties based on search criteria
  useEffect(() => {
    setIsLoading(true);
    
    let filtered = [...properties];

    // Filter by city
    if (filters.city) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Filter by rooms
    if (filters.rooms) {
      const roomsFilter = parseInt(filters.rooms);
      filtered = filtered.filter(property => property.rooms === roomsFilter);
    }

    // Filter by price range
    if (filters.price) {
      const priceFilter = parseInt(filters.price);
      filtered = filtered.filter(property => {
        if (priceFilter <= 1000000) {
          return property.price <= 1000000;
        } else if (priceFilter <= 2000000) {
          return property.price > 1000000 && property.price <= 2000000;
        } else if (priceFilter <= 3000000) {
          return property.price > 2000000 && property.price <= 3000000;
        } else {
          return property.price > 3000000;
        }
      });
    }

    // Filter by area
    if (filters.area) {
      const areaFilter = parseInt(filters.area);
      filtered = filtered.filter(property => property.meters >= areaFilter);
    }

    if (filters.topArea) {
      const topAreaFilter = parseInt(filters.topArea);
      filtered = filtered.filter(property => property.meters <= topAreaFilter);
    }

    setFilteredProperties(filtered);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [properties, filters]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner animation="border" role="status" />
        <div className="mt-2">טוען נכסים...</div>
      </div>
    );
  }

  return (
    <div className={styles.propertyGrid}>
      <div className={styles.resultsHeader}>
        <h3>תוצאות חיפוש</h3>
        <span className={styles.resultsCount}>
          {filteredProperties.length} נכסים נמצאו
        </span>
      </div>

      {/* Filter Buttons */}
      <div className={styles.filterButtonsRow}>
        <button 
          className={`${styles.filterButton} ${filters.city ? styles.active : ''}`}
          onClick={() => {/* Handle city filter */}}
        >
          הכנס עיר
        </button>
        <button 
          className={`${styles.filterButton} ${filters.propertyType ? styles.active : ''}`}
          onClick={() => {/* Handle property type filter */}}
        >
          סוג הנכס
        </button>
        <button 
          className={`${styles.filterButton} ${filters.rooms ? styles.active : ''}`}
          onClick={() => {/* Handle rooms filter */}}
        >
          מספר חדרים
        </button>
        <button 
          className={`${styles.filterButton} ${filters.price ? styles.active : ''}`}
          onClick={() => {/* Handle price filter */}}
        >
          מחיר
        </button>
        <button 
          className={`${styles.filterButton} ${Object.values(filters).some(value => value && value !== '15') ? styles.active : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          פרטים נוספים
        </button>
      </div>

      <div className={styles.propertiesList}>
        {filteredProperties.length === 0 ? (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <h4>לא נמצאו נכסים</h4>
            <p>נסה לשנות את קריטריוני החיפוש</p>
          </div>
        ) : (
          <Row className="g-4">
            {filteredProperties.map((property) => (
              <Col key={property.id} xs={12} sm={6} md={4} className={styles.propertyCardWrapper}>
                <ApartmentCard apartment={property} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default PropertyGrid;
