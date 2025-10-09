"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ApartmentCard from "../ApartmentCard/ApartmentCard";
import styles from "./CategorySlider.module.css";

interface CategorySliderProps {
  title: string;
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

const CategorySlider: React.FC<CategorySliderProps> = ({ title, apartments }) => {
  const swiperRef = useRef<{ slidePrev: () => void; slideNext: () => void } | null>(null);

  const goToPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const goToNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.navigation}>
          <button 
            className={styles.navButton}
            onClick={goToNext}
            aria-label="הבא"
          >
            <span className={styles.arrow}>&gt;</span>
          </button>
          <button 
            className={styles.navButton}
            onClick={goToPrev}
            aria-label="הקודם"
          >
            <span className={styles.arrow}>&lt;</span>
          </button>
        </div>
      </div>

      <div className={styles.sliderContainer}>
        <Swiper
          modules={[Navigation, Pagination]}
          // spaceBetween={16}
          slidesPerView="auto"
          // onSwiper={(swiper) => {
          //   swiperRef.current = swiper;
          // }}
          className={styles.swiper}
          dir="rtl"
        >
          {apartments.map((apartment) => (
            <SwiperSlide key={apartment.id} className={styles.slide}>
              <ApartmentCard apartment={apartment} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategorySlider;
