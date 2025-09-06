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
        <h3 className={styles.title}>{apartment.title}</h3>
        
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <Image
              src="/icons/home.svg"
              alt="חדרים"
              width={16}
              height={16}
              className={styles.icon}
            />
            <span>{apartment.rooms} חדרים</span>
          </div>
          
          <div className={styles.detailItem}>
            <Image
              src="/icons/stairs.svg"
              alt="קומה"
              width={16}
              height={16}
              className={styles.icon}
            />
            <span>קומה {apartment.floor}</span>
          </div>
          
          <div className={styles.detailItem}>
            <Image
              src="/icons/area.svg"
              alt="מטרים"
              width={16}
              height={16}
              className={styles.icon}
            />
            <span>{apartment.meters} מ&quot;ר</span>
          </div>
        </div>
        
        <div className={styles.price}>
          {formatPrice(apartment.price)}
        </div>
        
        <div className={styles.location}>
          {apartment.location}
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
