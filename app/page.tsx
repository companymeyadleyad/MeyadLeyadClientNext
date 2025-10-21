"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CategorySlider from "@/components/Homepage/CategorySlider/CategorySlider";
import StructuredData from "@/components/SEO/StructuredData";
import { CategoriesService } from "@/services/categoriesService";
import type { SliderCategory } from "@/types/Homepage/SliderApartment";
import styles from "./page.module.css";

export default function Home() {
  const [categories, setCategories] = useState<SliderCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesService = new CategoriesService();
        const data = await categoriesService.getSlidersHomepage();
        
        if (data) {
          setCategories(data);
        } else {
          setError("Failed to load categories");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Error loading categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Flatten all apartments for structured data
  const allApartments = categories.flatMap(category => category.apartments);

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
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            categories.map((category) => (
              <CategorySlider
                key={category.id}
                title={category.name}
                slug={category.slug}
                apartments={category.apartments}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
