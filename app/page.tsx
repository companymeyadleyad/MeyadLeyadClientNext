"use client";

import React from "react";
import Image from "next/image";
import CategorySlider from "@/components/Homepage/CategorySlider/CategorySlider";
import StructuredData from "@/components/SEO/StructuredData";
import { mockCategories } from "@/data/mockApartments";
import styles from "./page.module.css";

export default function Home() {
  // Flatten all apartments for structured data
  const allApartments = mockCategories.flatMap(category => category.apartments);

  return (
    <div className={styles.container}>
      {/* Structured Data for SEO */}
      <StructuredData apartments={allApartments} />
      {/* Hero Section with Background Image */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          {/* <Image
            src="/images/hero-building.jpg"
            alt="Modern apartment building background"
            fill
            className={styles.heroImage}
            priority
          /> */}
          <div className={styles.heroOverlay} />
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroMain}>
            {/* Large Logo on the right */}
            <div className={styles.logoOverlay}>
              <Image
                src="/images/logo6.png"
                alt="Mid Leyad Logo"
                width={400}
                height={170}
                priority
                className={styles.logoImage}
              />
            </div>
             {/* Search Bar on the left */}
             <div className={styles.searchContainer}>
              <div className={styles.searchBar}>
                <input 
                  type="text" 
                  placeholder="מצא את הנדל״ן שלך"
                  className={styles.searchInput}
                />
                <div className={styles.searchLeft}>
                  <Image
                    src="/icons/search.svg"
                    alt="Search"
                    width={20}
                    height={20}
                    className={styles.searchIcon}
                  />
                  <span className={styles.searchText}>חיפוש</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      {/* <section className={styles.featuredProperties}>
        <div className={styles.featuredContent}>
          <h2 className={styles.featuredTitle}>נכסים מומלצים</h2>
          <div className={styles.propertiesGrid}>
            {allApartments.slice(0, 4).map((apartment) => (
              <div key={apartment.id} className={styles.propertyCard}>
                <div className={styles.propertyImage}>
                  <Image
                    src={apartment.image}
                    alt={apartment.title}
                    fill
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.propertyDetails}>
                  <div className={styles.propertyPrice}>
                    {new Intl.NumberFormat('he-IL', {
                      style: 'currency',
                      currency: 'ILS',
                      minimumFractionDigits: 0,
                    }).format(apartment.price)}
                  </div>
                  <div className={styles.propertyAddress}>
                    {apartment.location}
                  </div>
                  <div className={styles.propertySpecs}>
                    {apartment.rooms} חדרים | {apartment.meters} מ״ר | קומה {apartment.floor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Categories Section */}
      <section className={styles.categories}>
        <div className={styles.categoriesContent}>
          {mockCategories.map((category) => (
            <CategorySlider
              key={category.id}
              title={category.name}
              apartments={category.apartments}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
