"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import PropertyGrid from "./PropertyGrid";
import MapComponent from "./MapComponent";
import FilterPanel from "./FilterPanel";
import PropertyTypeModal from "../PropertyTypeModal/PropertyTypeModal";
import RoomsModal from "../RoomsModal/RoomsModal";
import PriceModal from "../PriceModal/PriceModal";
import { categoriesStore } from "@/stores/Categories.store";
import { createSlug } from "@/utils/categoryUtils";
import styles from "./CategoryPageContent.module.css";
import propertyGridStyles from "./PropertyGrid.module.css";

interface CategoryPageContentProps {
  category: {id: string; name: string; apartments: Array<{id: string; title: string; image: string; rooms: number; floor: number; meters: number; price: number; location: string; category: string}>};
  searchParams: URLSearchParams;
  router: {push: (url: string) => void};
}

const CategoryPageContent = observer(({ category, searchParams, router }: CategoryPageContentProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(category.id);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isPropertyTypeModalOpen, setIsPropertyTypeModalOpen] = useState(false);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [isRoomsModalOpen, setIsRoomsModalOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(25000000);
  
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

  useEffect(() => {
    // Load categories if not already loaded
    if (!categoriesStore.categoriesFetched) {
      categoriesStore.fetchCategories();
    }
  }, []);

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

  const handleCategoryChange = (slug: string) => {
    setSelectedCategorySlug(slug);
    setIsCategoryDropdownOpen(false);
    // Navigate to the new category - exactly like homepage slider links
    router.push(`/properties/${slug}`);
  };

  // Property Type handlers
  const handlePropertyTypeClick = () => {
    setIsPropertyTypeModalOpen(!isPropertyTypeModalOpen);
    setIsRoomsModalOpen(false);
    setIsPriceModalOpen(false);
  };

  const handlePropertyTypeConfirm = (types: string[]) => {
    setSelectedPropertyTypes(types);
  };

  const handlePropertyTypeClose = () => {
    setIsPropertyTypeModalOpen(false);
  };

  // Rooms handlers
  const handleRoomsClick = () => {
    setIsRoomsModalOpen(!isRoomsModalOpen);
    setIsPropertyTypeModalOpen(false);
    setIsPriceModalOpen(false);
  };

  const handleRoomsConfirm = (rooms: string[]) => {
    setSelectedRooms(rooms);
  };

  const handleRoomsClose = () => {
    setIsRoomsModalOpen(false);
  };

  // Price handlers
  const handlePriceClick = () => {
    setIsPriceModalOpen(!isPriceModalOpen);
    setIsPropertyTypeModalOpen(false);
    setIsRoomsModalOpen(false);
  };

  const handlePriceConfirm = (minPrice: number, maxPrice: number) => {
    setSelectedMinPrice(minPrice);
    setSelectedMaxPrice(maxPrice);
  };

  const handlePriceClose = () => {
    setIsPriceModalOpen(false);
  };

  // Helper functions for button text
  const getRoomsButtonText = () => {
    if (selectedRooms.length === 0) {
      return "מספר חדרים";
    }
    if (selectedRooms.length === 1) {
      return `${selectedRooms[0]} חדרים`;
    }
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

  const getPriceButtonText = () => {
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS',
        minimumFractionDigits: 0,
      }).format(price);
    };

    if (selectedMinPrice === 0 && selectedMaxPrice === 25000000) {
      return "מחיר";
    }
    return `${formatPrice(selectedMinPrice)} - ${formatPrice(selectedMaxPrice)}`;
  };

  return (
    <div className={styles.categoryPage}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <Container>
          {/* Filter Buttons Row */}
          <div className={styles.filterButtonsRow}>
        
            <button 
              className={propertyGridStyles.searchButton}
              onClick={() => {/* Handle search */}}
            >
              <FontAwesomeIcon icon={faSearch} style={{ marginLeft: 8 }} />
              חיפוש
            </button>
            <button 
              className={`${propertyGridStyles.filterButton} ${filters.city ? propertyGridStyles.active : ''}`}
              onClick={() => {/* Handle city filter */}}
            >
              הכנס עיר
            </button>
            <div className={propertyGridStyles.propertyTypeContainer}>
              <button 
                className={`${propertyGridStyles.filterButton} ${filters.propertyType ? propertyGridStyles.active : ''}`}
                onClick={handlePropertyTypeClick}
              >
                <span className={`${propertyGridStyles.arrow} ${isPropertyTypeModalOpen ? propertyGridStyles.arrowUp : ''}`}>▼</span>
                סוג הנכס
                {selectedPropertyTypes.length > 0 && (
                  <span className={propertyGridStyles.filterCount}>{selectedPropertyTypes.length}</span>
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
            <div className={propertyGridStyles.roomsContainer}>
              <button 
                className={`${propertyGridStyles.filterButton} ${filters.rooms ? propertyGridStyles.active : ''}`}
                onClick={handleRoomsClick}
              >
                <span className={`${propertyGridStyles.arrow} ${isRoomsModalOpen ? propertyGridStyles.arrowUp : ''}`}>▼</span>
                {getRoomsButtonText()}
                {selectedRooms.length > 0 && (
                  <span className={propertyGridStyles.filterCount}>{selectedRooms.length}</span>
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
            <div className={propertyGridStyles.priceContainer}>
              <button 
                className={`${propertyGridStyles.filterButton} ${filters.price ? propertyGridStyles.active : ''}`}
                onClick={handlePriceClick}
              >
                <span className={`${propertyGridStyles.arrow} ${isPriceModalOpen ? propertyGridStyles.arrowUp : ''}`}>▼</span>
                {getPriceButtonText()}
                {(selectedMinPrice !== 0 || selectedMaxPrice !== 25000000) && (
                  <span className={propertyGridStyles.filterCount}>1</span>
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
              className={`${propertyGridStyles.filterButton} ${Object.values(filters).some(value => value && value !== '15') ? propertyGridStyles.active : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              פרטים נוספים
            </button>
            <div className={propertyGridStyles.categoryDropdownContainer}>
              <button 
                className={propertyGridStyles.filterButton}
                onClick={() => {
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  setIsPropertyTypeModalOpen(false);
                  setIsRoomsModalOpen(false);
                  setIsPriceModalOpen(false);
                }}
              >
                קטגוריה
                <span className={`${propertyGridStyles.arrow} ${isCategoryDropdownOpen ? propertyGridStyles.arrowUp : ''}`}>▼</span>
              </button>
              
              {isCategoryDropdownOpen && (
                <>
                  <div 
                    className={propertyGridStyles.dropdownBackdrop}
                    onClick={() => setIsCategoryDropdownOpen(false)}
                  />
                  <div className={propertyGridStyles.customDropdown}>
                    {categoriesStore.categories.map((cat) => {
                      const slug = createSlug(cat.categoryName);
                      const isSelected = selectedCategorySlug === slug;
                      return (
                        <div 
                          key={cat.categoryNumber} 
                          className={propertyGridStyles.dropdownItem}
                          onClick={() => handleCategoryChange(slug)}
                        >
                          {isSelected && (
                            <span className={propertyGridStyles.checkmark}>✓</span>
                          )}
                          <span className={propertyGridStyles.dropdownText}>{cat.categoryName}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
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
});

export default CategoryPageContent;
