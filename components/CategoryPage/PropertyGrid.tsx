"use client";

import { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import ApartmentCard from "../Homepage/ApartmentCard/ApartmentCard";
import PropertyTypeModal from "../PropertyTypeModal/PropertyTypeModal";
import RoomsModal from "../RoomsModal/RoomsModal";
import PriceModal from "../PriceModal/PriceModal";
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
  const [isPropertyTypeModalOpen, setIsPropertyTypeModalOpen] = useState(false);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [isRoomsModalOpen, setIsRoomsModalOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(1000000);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(25000000);

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

  const handlePropertyTypeClick = () => {
    setIsPropertyTypeModalOpen(!isPropertyTypeModalOpen);
    // Close other modals
    setIsRoomsModalOpen(false);
    setIsPriceModalOpen(false);
  };

  const handlePropertyTypeConfirm = (types: string[]) => {
    setSelectedPropertyTypes(types);
    console.log("Selected property types:", types);
    // כאן תוכל להוסיף לוגיקה נוספת כמו עדכון הפילטרים
  };

  const handlePropertyTypeClose = () => {
    setIsPropertyTypeModalOpen(false);
  };

  const handleRoomsClick = () => {
    setIsRoomsModalOpen(!isRoomsModalOpen);
    // Close other modals
    setIsPropertyTypeModalOpen(false);
    setIsPriceModalOpen(false);
  };

  const handleRoomsConfirm = (rooms: string[]) => {
    setSelectedRooms(rooms);
    console.log("Selected rooms:", rooms);
    // כאן תוכל להוסיף לוגיקה נוספת כמו עדכון הפילטרים
  };

  const handleRoomsClose = () => {
    setIsRoomsModalOpen(false);
  };

  const handlePriceClick = () => {
    setIsPriceModalOpen(!isPriceModalOpen);
    // Close other modals
    setIsPropertyTypeModalOpen(false);
    setIsRoomsModalOpen(false);
  };

  const handlePriceConfirm = (minPrice: number, maxPrice: number) => {
    setSelectedMinPrice(minPrice);
    setSelectedMaxPrice(maxPrice);
    console.log("Selected price range:", minPrice, "-", maxPrice);
    // כאן תוכל להוסיף לוגיקה נוספת כמו עדכון הפילטרים
  };

  const handlePriceClose = () => {
    setIsPriceModalOpen(false);
  };

  // פונקציה ליצירת טקסט הכפתור לפי הבחירות
  const getRoomsButtonText = () => {
    if (selectedRooms.length === 0) {
      return "מספר חדרים";
    }
    
    if (selectedRooms.length === 1) {
      return `${selectedRooms[0]} חדרים`;
    }
    
    // מיון החדרים לפי מספר
    const sortedRooms = [...selectedRooms].sort((a, b) => {
      const numA = parseFloat(a.replace('+', ''));
      const numB = parseFloat(b.replace('+', ''));
      return numA - numB;
    });
    
    const min = sortedRooms[0];
    const max = sortedRooms[sortedRooms.length - 1];
    
    if (min === max) {
      return `${min} חדרים`;
    }
    
    return `${min} - ${max} חדרים`;
  };

  // פונקציה ליצירת טקסט הכפתור למחיר
  const getPriceButtonText = () => {
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS',
        minimumFractionDigits: 0,
      }).format(price);
    };

    if (selectedMinPrice === 1000000 && selectedMaxPrice === 25000000) {
      return "מחיר";
    }

    return `${formatPrice(selectedMinPrice)} - ${formatPrice(selectedMaxPrice)}`;
  };

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
        <div className={styles.propertyTypeContainer}>
          <button 
            className={`${styles.filterButton} ${filters.propertyType ? styles.active : ''}`}
            onClick={handlePropertyTypeClick}
          >
            <span className={`${styles.arrow} ${isPropertyTypeModalOpen ? styles.arrowUp : ''}`}>▼</span>
            סוג הנכס
            {selectedPropertyTypes.length > 0 && (
              <span className={styles.filterCount}>{selectedPropertyTypes.length}</span>
            )}
          </button>
          
          {/* Property Type Modal */}
          <PropertyTypeModal
            isOpen={isPropertyTypeModalOpen}
            onClose={handlePropertyTypeClose}
            onConfirm={handlePropertyTypeConfirm}
            selectedTypes={selectedPropertyTypes}
          />
        </div>
        <div className={styles.roomsContainer}>
          <button 
            className={`${styles.filterButton} ${filters.rooms ? styles.active : ''}`}
            onClick={handleRoomsClick}
          >
            <span className={`${styles.arrow} ${isRoomsModalOpen ? styles.arrowUp : ''}`}>▼</span>
            {getRoomsButtonText()}
            {selectedRooms.length > 0 && (
              <span className={styles.filterCount}>{selectedRooms.length}</span>
            )}
          </button>
          
          {/* Rooms Modal */}
          <RoomsModal
            isOpen={isRoomsModalOpen}
            onClose={handleRoomsClose}
            onConfirm={handleRoomsConfirm}
            selectedRooms={selectedRooms}
          />
        </div>
        <div className={styles.priceContainer}>
          <button 
            className={`${styles.filterButton} ${filters.price ? styles.active : ''}`}
            onClick={handlePriceClick}
          >
            <span className={`${styles.arrow} ${isPriceModalOpen ? styles.arrowUp : ''}`}>▼</span>
            {getPriceButtonText()}
            {(selectedMinPrice !== 1000000 || selectedMaxPrice !== 25000000) && (
              <span className={styles.filterCount}>1</span>
            )}
          </button>
          
          {/* Price Modal */}
          <PriceModal
            isOpen={isPriceModalOpen}
            onClose={handlePriceClose}
            onConfirm={handlePriceConfirm}
            minPrice={selectedMinPrice}
            maxPrice={selectedMaxPrice}
          />
        </div>
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
