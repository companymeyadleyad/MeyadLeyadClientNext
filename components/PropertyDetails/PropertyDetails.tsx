"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './PropertyDetails.module.css';
import StructuredData from '@/components/SEO/StructuredData';

interface PropertyDetailsProps {
  property: {
    cityName: string;
    streetName: string;
    numberOfRoomsName: string;
    floor: number;
    propertySizeInMeters: number;
    isThereOptions: boolean;
    isThereParcking: boolean;
    price: number;
    fullName: string;
    phone: string;
    isMediation: boolean;
    imageColumnSpan: number;
    imageUrl: string | null;
    additionalImages?: string[];
  };
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeImageModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const features = [];
  if (property.isThereParcking) features.push('חניה');
  features.push('מעלית'); // Always show elevator
  features.push('ממ"ד'); // Always show Mamad
  features.push('יחידת דיור'); // Always show dwelling unit
  features.push('גינה'); // Always show garden
  features.push('מחסן'); // Always show storage
  
  const featuresIcons = {
    'חניה': '🚗',
    'מעלית': '🛗',
    'ממ"ד': '🏠',
    'יחידת דיור': '🏢',
    'גינה': '🌳',
    'מחסן': '📦',
    'אפשרויות נוספות': '✨',
  };

  return (
    <>
      <StructuredData property={property} />
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Side - Property Details */}
          <div className={styles.detailsSection}>
            {/* Logo */}
          <div className={styles.part1}>

          <div className={styles.logoContainer}>
              <Image
                src="/images/logo3.png"
                alt="מיד ליד"
                width={200}
                height={100}
              />
              {/* <span className={styles.logoText}>מיד ליד</span> */}
            </div>

            {/* Price */}
            <div className={styles.priceContainer}>
              <div className={styles.price}>{formatPrice(property.price)}</div>
            </div>

            {/* Address */}
            <div className={styles.addressContainer}>
              <h1 className={styles.address}>{property.streetName} {property.cityName}</h1>
            </div>

            {/* Property Stats */}
            <div className={styles.propertyStatsContainer}>
              <div className={styles.propertyStats}>
                <span>{property.numberOfRoomsName} חדרים</span>
                <span>|</span>
                <span>{property.propertySizeInMeters} מ&quot;ר</span>
                <span>|</span>
                <span>קומה {property.floor}</span>
              </div>
            </div>          </div>

            {/* Description */}
            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>תיאור הנכס:</h2>
              <p className={styles.description}>
                נכס יפה ומושלם ב{property.streetName} {property.cityName}. 
                {property.numberOfRoomsName} חדרים, {property.propertySizeInMeters} מ&quot;ר, קומה {property.floor}.
                {property.isThereParcking && ' כולל חניה.'}
                {property.isThereOptions && ' עם אפשרויות נוספות.'}
              </p>
            </div>

            {/* Features */}
            <div className={styles.featuresSection}>
              <h2 className={styles.sectionTitle}>מה כולל הנכס:</h2>
              <div className={styles.featuresSeparator}></div>
              <div className={styles.featuresGrid}>
                {features.map((feature, index) => (
                  <div key={index} className={styles.featureItem}>
                    <div className={styles.featureIconContainer}>
                      <span className={styles.featureIcon}>
                        {featuresIcons[feature as keyof typeof featuresIcons] || '✓'}
                      </span>
                    </div>
                    <span className={styles.featureText}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className={styles.contactSection}>
              <div className={styles.contactBar}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIconWrapper}>
                    <span className={styles.contactIcon}>📷</span>
                  </div>
                  <span className={styles.contactText}>@reallygreatsite</span>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIconWrapper}>
                    <span className={styles.contactIcon}>📞</span>
                  </div>
                  <span className={styles.contactText}>{property.phone}</span>
                </div>
              </div>
              <div className={styles.brokerInfo}>
                {property.isMediation ? 'תיווך' : 'ללא תיווך'} - {property.fullName}
              </div>
            </div>
          </div>

          {/* Middle Section - Images */}
          <div className={styles.imagesSection}>
            {property.imageUrl && (
              <div className={styles.mainImage} onClick={() => openImageModal(property.imageUrl!)}>
                <Image
                  src={property.imageUrl}
                  alt={`${property.streetName} ${property.cityName}`}
                  fill
                  className={styles.image}
                  priority
                />
                <button className={styles.zoomButton} aria-label="הגדל תמונה">
                  <span className={styles.zoomIcon}>🔍</span>
                </button>
              </div>
            )}
            
            {/* Additional Images Grid */}
            {property.additionalImages && property.additionalImages.length > 0 && (
              <div className={styles.thumbnailGrid}>
                {property.additionalImages.slice(0, 4).map((imageUrl, index) => (
                  <div key={index} className={styles.thumbnail} onClick={() => openImageModal(imageUrl)}>
                    <Image
                      src={imageUrl}
                      alt={`${property.streetName} ${property.cityName} - תמונה ${index + 1}`}
                      fill
                      className={styles.image}
                    />
                    <button className={styles.zoomButton} aria-label="הגדל תמונה">
                      <span className={styles.zoomIcon}>🔍</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Map */}
          <div className={styles.mapSection}>
            <div className={styles.mapContainer}>
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapMarker}>
                  <span className={styles.markerText}>מיקום הנכס</span>
                </div>
                <div className={styles.mapAttribution}>
                  OpenStreetMap contributors
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div className={styles.imageModal} onClick={closeImageModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeImageModal}>
              ✕
            </button>
            <Image
              src={selectedImage}
              alt={`${property.streetName} ${property.cityName} - תמונה מוגדלת`}
              width={1200}
              height={800}
              className={styles.modalImage}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetails;
