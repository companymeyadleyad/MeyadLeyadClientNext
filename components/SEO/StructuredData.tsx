"use client";

import React from "react";

interface StructuredDataProps {
  apartments: Array<{
    id: string;
    title: string;
    image: string;
    rooms: number;
    floor: number;
    meters: number;
    price: number;
    location: string;
  }>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ apartments }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "מצאדליאד",
    "description": "מצא דירות למכירה ולהשכרה בישראל",
    "url": "https://meyadleyad.com",
    "logo": "https://meyadleyad.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IL"
    },
    "offers": apartments.map(apartment => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "RealEstateListing",
        "name": apartment.title,
        "description": `דירה עם ${apartment.rooms} חדרים, קומה ${apartment.floor}, ${apartment.meters} מ"ר`,
        "image": apartment.image,
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": apartment.meters,
          "unitCode": "MTK"
        },
        "numberOfRooms": apartment.rooms,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": apartment.location,
          "addressCountry": "IL"
        }
      },
      "price": apartment.price,
      "priceCurrency": "ILS"
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;
