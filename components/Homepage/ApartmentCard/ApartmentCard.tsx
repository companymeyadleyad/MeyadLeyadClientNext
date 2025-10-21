"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { SliderApartment } from "@/types/Homepage/SliderApartment";
import styles from "./ApartmentCard.module.css";

interface ApartmentCardProps {
  apartment: SliderApartment;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCardClick = () => {
    router.push(`/property-details/${apartment.id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
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
