"use client";

import React, { useState } from "react";
import styles from "./PropertyTypeModal.module.css";

interface PropertyType {
  id: string;
  name: string;
  category: string;
}

interface PropertyTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedTypes: string[]) => void;
  selectedTypes?: string[];
}

const PropertyTypeModal: React.FC<PropertyTypeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedTypes = []
}) => {
  const [localSelectedTypes, setLocalSelectedTypes] = useState<string[]>(selectedTypes);

  // MOCK data - סוגי נכסים כמו בתמונה
  const propertyTypes: PropertyType[] = [
    // דירות
    { id: "all-apartments", name: "הכל", category: "apartments" },
    { id: "apartment", name: "דירה", category: "apartments" },
    { id: "garden-apartment", name: "דירת גן", category: "apartments" },
    { id: "penthouse", name: "גג/פנטהאוז", category: "apartments" },
    { id: "duplex", name: "דופלקס", category: "apartments" },
    { id: "vacation", name: "תיירות ונופש", category: "apartments" },
    { id: "basement", name: "מרתף/פרטר", category: "apartments" },
    { id: "triplex", name: "טריפלקס", category: "apartments" },
    { id: "housing-unit", name: "יחידת דיור", category: "apartments" },
    { id: "studio", name: "סטודיו/לופט", category: "apartments" },
    
    // בתים
    { id: "all-houses", name: "הכל", category: "houses" },
    { id: "private-house", name: "בית פרטי/קוטג'", category: "houses" },
    { id: "semi-detached", name: "דו משפחתי", category: "houses" },
    { id: "farm", name: "משק חקלאי/נחלה", category: "houses" },
    { id: "auxiliary-farm", name: "משק עזר", category: "houses" },
    
    // אחר
    { id: "plots", name: "מגרשים", category: "other" },
    { id: "protected-housing", name: "דיור מוגן", category: "other" },
    { id: "residential-building", name: "בניין מגורים", category: "other" },
    { id: "storage", name: "מחסן", category: "other" },
    { id: "parking", name: "חניה", category: "other" },
    { id: "purchase-group", name: "קב' רכישה/זכות לנכס", category: "other" },
    { id: "general", name: "כללי", category: "other" }
  ];

  const handleTypeToggle = (typeId: string) => {
    setLocalSelectedTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  const handleReset = () => {
    setLocalSelectedTypes([]);
  };

  const handleConfirm = () => {
    onConfirm(localSelectedTypes);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const apartments = propertyTypes.filter(type => type.category === "apartments");
  const houses = propertyTypes.filter(type => type.category === "houses");
  const other = propertyTypes.filter(type => type.category === "other");

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>ניתן לבחור מספר סוגים</h3>
        </div>

        <div className={styles.content}>
          {/* דירות */}
          <div className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>🏢</div>
              <h4>דירות</h4>
            </div>
            <div className={styles.buttonsGrid}>
              {apartments.map((type) => (
                <button
                  key={type.id}
                  className={`${styles.typeButton} ${
                    localSelectedTypes.includes(type.id) ? styles.selected : ""
                  }`}
                  onClick={() => handleTypeToggle(type.id)}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* בתים */}
          <div className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>🏠</div>
              <h4>בתים</h4>
            </div>
            <div className={styles.buttonsGrid}>
              {houses.map((type) => (
                <button
                  key={type.id}
                  className={`${styles.typeButton} ${
                    localSelectedTypes.includes(type.id) ? styles.selected : ""
                  }`}
                  onClick={() => handleTypeToggle(type.id)}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* אחר */}
          <div className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>📋</div>
              <h4>אחר</h4>
            </div>
            <div className={styles.buttonsGrid}>
              {other.map((type) => (
                <button
                  key={type.id}
                  className={`${styles.typeButton} ${
                    localSelectedTypes.includes(type.id) ? styles.selected : ""
                  }`}
                  onClick={() => handleTypeToggle(type.id)}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.resetButton} onClick={handleReset}>
            איפוס
          </button>
          <button className={styles.confirmButton} onClick={handleConfirm}>
            אישור
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyTypeModal;
