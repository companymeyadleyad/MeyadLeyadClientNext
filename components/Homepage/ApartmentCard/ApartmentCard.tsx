"use client";

import React from "react";
import Image from "next/image";
import styles from "./ApartmentCard.module.css";

interface ApartmentCardProps {
  apartment: {
    id: string;
    title: string;
    image: string;
    rooms: number;
    floor: number;
    meters: number;
    price: number;
    location: string;
  };
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={apartment.image}
          alt={apartment.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 280px, 320px"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          {formatPrice(apartment.price)}
        </div>
        <div className={styles.location}>
          {apartment.location}
        </div>
        <div className={styles.propertyDetails}>
          <div>{apartment.rooms} חדרים |&nbsp;</div>
          <div>{apartment.meters} מטר |&nbsp;</div>
          <div>{apartment.floor} קומה </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
