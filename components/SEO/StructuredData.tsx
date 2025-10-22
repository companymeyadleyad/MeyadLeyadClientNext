"use client";

import React from 'react';
import type { SliderApartment } from "@/types/Homepage/SliderApartment";

interface StructuredDataProps {
  apartments?: SliderApartment[];
  property?: {
    propertyId: number;
    price: number;
    address: string;
    numberOfRoomsName: string;
    propertySizeInMeters: number;
    floor: number;
    isThereParcking: boolean;
    isThereSafeRoom: boolean;
    isThereWarehouse: boolean;
    isMediation: boolean;
    isThereSukaPorch: boolean;
    isThereOptions: boolean;
    isThereLandscape: boolean;
    isTherElevator: boolean;
    isFurnished: boolean;
    isThereAirCondition: boolean;
    fullName: string;
    phone: string;
    // Legacy fields for backward compatibility
    cityName?: string;
    streetName?: string;
    imageColumnSpan?: number;
    imageUrl?: string | null;
    additionalImages?: string[];
  };
}

const StructuredData: React.FC<StructuredDataProps> = ({ apartments, property }) => {
  // If apartments array is provided (for homepage)
  if (apartments && apartments.length > 0) {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "נכסים למכירה",
      "description": "רשימת נכסים למכירה באתר מיד ליד",
      "numberOfItems": apartments.length,
      "itemListElement": apartments.map((apartment, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "RealEstateListing",
          "name": apartment.title,
          "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://meyadleyad.com'}/property-details/${apartment.id}`,
          "offers": {
            "@type": "Offer",
            "price": apartment.price,
            "priceCurrency": "ILS"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": apartment.location,
            "addressCountry": "IL"
          },
          "floorSize": {
            "@type": "QuantitativeValue",
            "value": apartment.meters,
            "unitCode": "MTK"
          },
          "numberOfRooms": apartment.rooms,
          "floorLevel": apartment.floor
        }
      }))
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    );
  }

  // If single property is provided (for property details page)
  if (property) {
    const features = [];
    if (property.isThereParcking) features.push('חניה');
    if (property.isTherElevator) features.push('מעלית');
    if (property.isThereSafeRoom) features.push('ממ"ד');
    if (property.isThereWarehouse) features.push('מחסן');
    if (property.isThereSukaPorch) features.push('מרפסת סוכה');
    if (property.isThereOptions) features.push('אפשרויות הרחבה');
    if (property.isThereLandscape) features.push('נוף');
    if (property.isFurnished) features.push('מרוהט');
    if (property.isThereAirCondition) features.push('מיזוג אוויר');
    if (property.isMediation) features.push('תיווך');
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": property.address,
      "description": `נכס למכירה ב${property.address} - ${property.numberOfRoomsName} חדרים, ${property.propertySizeInMeters} מ"ר, קומה ${property.floor}`,
      "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://meyadleyad.com'}/property-details/${property.propertyId}`,
      "image": property.imageUrl ? [property.imageUrl] : [],
      "offers": {
        "@type": "Offer",
        "price": property.price,
        "priceCurrency": "ILS",
        "availability": "https://schema.org/InStock"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": property.address,
        "addressCountry": "IL"
      },
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.propertySizeInMeters,
        "unitCode": "MTK"
      },
      "numberOfRooms": property.numberOfRoomsName,
      "floorLevel": property.floor,
      "amenityFeature": features.map(feature => ({
        "@type": "LocationFeatureSpecification",
        "name": feature
      })),
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": property.phone,
        "contactType": "sales"
      },
      "broker": {
        "@type": "RealEstateAgent",
        "name": property.fullName
      },
      "datePosted": new Date().toISOString(),
      "validFrom": new Date().toISOString()
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    );
  }

  return null;
};

export default StructuredData;