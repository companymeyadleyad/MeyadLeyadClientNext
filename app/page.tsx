"use client";

import React from "react";
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
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            מצא את הדירה המושלמת שלך
          </h1>
          <p className={styles.heroSubtitle}>
            אלפי דירות ממתינות לך - מחפש, מוצא, קונה
          </p>
        </div>
      </section>

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

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            לא מצאת את מה שחיפשת?
          </h2>
          <p className={styles.ctaSubtitle}>
            השתמש בחיפוש המתקדם שלנו כדי למצוא בדיוק את מה שאתה מחפש
          </p>
          <button className={styles.ctaButton}>
            התחל חיפוש
          </button>
        </div>
      </section>
    </div>
  );
}
