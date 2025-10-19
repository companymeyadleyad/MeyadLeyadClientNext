"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import styles from "./MapComponent.module.css";

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

interface MapComponentProps {
  properties: Property[];
  filters: Record<string, string>;
}

const MapComponent = ({ properties }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Mock coordinates for properties (in a real app, these would come from the API)
  const getPropertyCoordinates = (property: Property) => {
    // Generate mock coordinates based on property ID
    const baseLat = 31.7683; // Jerusalem coordinates
    const baseLng = 35.2137;
    
    const id = parseInt(property.id.replace('apt-', ''));
    const lat = baseLat + (id * 0.001);
    const lng = baseLng + (id * 0.001);
    
    return { lat, lng };
  };

  useEffect(() => {
    // Initialize map (mock implementation)
    const initializeMap = () => {
      if (mapRef.current) {
        // In a real implementation, you would initialize Google Maps or another map service here
        setIsMapLoaded(true);
      }
    };

    const timer = setTimeout(initializeMap, 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL').format(price);
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapHeader}>
        <h4>
          <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.mapIcon} />
          מפת נכסים
        </h4>
        <div className={styles.mapControls}>
          <button className={styles.controlButton}>
            <FontAwesomeIcon icon={faLocationArrow} />
          </button>
        </div>
      </div>

      <div className={styles.mapContent}>
        {/* Mock Map Area */}
        <div 
          ref={mapRef} 
          className={styles.mapArea}
          style={{ 
            background: isMapLoaded ? 'linear-gradient(45deg, #e8f5e8 25%, #f0f8f0 25%, #f0f8f0 50%, #e8f5e8 50%, #e8f5e8 75%, #f0f8f0 75%)' : '#f8f9fa',
            backgroundSize: '20px 20px'
          }}
        >
          {!isMapLoaded ? (
            <div className={styles.mapLoading}>
              <div className={styles.loadingSpinner}></div>
              <p>טוען מפה...</p>
            </div>
          ) : (
            <>
              {/* Mock Property Markers */}
              {properties.map((property, index) => {
                return (
                  <div
                    key={property.id}
                    className={`${styles.propertyMarker} ${selectedProperty?.id === property.id ? styles.selected : ''}`}
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 10)}%`,
                    }}
                    onClick={() => handlePropertyClick(property)}
                  >
                    <div className={styles.markerPin}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </div>
                    <div className={styles.markerPrice}>
                      ₪{formatPrice(property.price)}
                    </div>
                  </div>
                );
              })}

              {/* Mock Streets and Areas */}
              <div className={styles.mockStreet} style={{ top: '25%', left: '10%', width: '80%' }}></div>
              <div className={styles.mockStreet} style={{ top: '45%', left: '15%', width: '70%' }}></div>
              <div className={styles.mockStreet} style={{ top: '65%', left: '5%', width: '90%' }}></div>
              
              {/* Mock Neighborhood Labels */}
              <div className={styles.neighborhoodLabel} style={{ top: '20%', left: '20%' }}>
                יגאל אלון
              </div>
              <div className={styles.neighborhoodLabel} style={{ top: '40%', left: '60%' }}>
                אבא הלל סילבר
              </div>
              <div className={styles.neighborhoodLabel} style={{ top: '70%', left: '30%' }}>
                גולדה מאיר
              </div>
            </>
          )}
        </div>

        {/* Property Details Panel */}
        {selectedProperty && (
          <div className={styles.propertyDetailsPanel}>
            <div className={styles.propertyImage}>
              <img src={selectedProperty.image} alt={selectedProperty.title} />
            </div>
            <div className={styles.propertyInfo}>
              <h5>{selectedProperty.title}</h5>
              <p className={styles.propertyLocation}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {selectedProperty.location}
              </p>
              <div className={styles.propertyStats}>
                <span>{selectedProperty.rooms} חדרים</span>
                <span>{selectedProperty.meters} מ&quot;ר</span>
                <span>קומה {selectedProperty.floor}</span>
              </div>
              <div className={styles.propertyPrice}>
                ₪{formatPrice(selectedProperty.price)}
              </div>
            </div>
            <button 
              className={styles.closeButton}
              onClick={() => setSelectedProperty(null)}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
