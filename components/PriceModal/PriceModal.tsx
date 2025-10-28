"use client";

import React, { useState, useRef, useCallback } from "react";
import styles from "./PriceModal.module.css";

interface PriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (minPrice: number, maxPrice: number) => void;
  minPrice?: number;
  maxPrice?: number;
}

const PriceModal: React.FC<PriceModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  minPrice = 0,
  maxPrice = 25000000
}) => {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const minSliderValue = 0;
  const maxSliderValue = 25000000;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPercentage = (value: number) => {
    return ((value - minSliderValue) / (maxSliderValue - minSliderValue)) * 100;
  };

  const getValueFromPercentage = (percentage: number) => {
    return minSliderValue + (percentage / 100) * (maxSliderValue - minSliderValue);
  };

  // Reverse percentage for RTL display (slider goes from right to left)
  const getReversedPercentage = (percentage: number) => {
    return 100 - percentage;
  };

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    setIsDragging(type);
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    // Reverse the calculation for RTL (right to left)
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const reversedPercentage = 100 - percentage;
    const value = Math.round(getValueFromPercentage(reversedPercentage));

    if (isDragging === 'min') {
      const newMinPrice = Math.min(value, localMaxPrice - 100000);
      setLocalMinPrice(newMinPrice);
    } else {
      const newMaxPrice = Math.max(value, localMinPrice + 100000);
      setLocalMaxPrice(newMaxPrice);
    }
  }, [isDragging, localMinPrice, localMaxPrice]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleInputChange = (type: 'min' | 'max', value: string) => {
    const numericValue = parseInt(value.replace(/[^\d]/g, ''));
    if (isNaN(numericValue)) return;

    if (type === 'min') {
      const newMinPrice = Math.min(numericValue, localMaxPrice - 100000);
      setLocalMinPrice(Math.max(newMinPrice, minSliderValue));
    } else {
      const newMaxPrice = Math.max(numericValue, localMinPrice + 100000);
      setLocalMaxPrice(Math.min(newMaxPrice, maxSliderValue));
    }
  };

  const handleConfirm = () => {
    onConfirm(localMinPrice, localMaxPrice);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const minPercentage = getPercentage(localMinPrice);
  const maxPercentage = getPercentage(localMaxPrice);
  
  // Reverse for RTL display (min stays min, max stays max, just visually flipped)
  const reversedMinPercentage = 100 - minPercentage;
  const reversedMaxPercentage = 100 - maxPercentage;

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>טווח מחירים</h3>
        </div>
        
        <div className={styles.sliderContainer}>
          <div className={styles.slider} ref={sliderRef}>
            <div className={styles.sliderTrack} />
            <div
              className={styles.sliderRange}
              style={{
                left: `${reversedMaxPercentage}%`,
                width: `${reversedMinPercentage - reversedMaxPercentage}%`
              }}
            />
            <div
              className={`${styles.sliderThumb} ${styles.maxThumb}`}
              style={{ left: `${reversedMaxPercentage}%` }}
              onMouseDown={handleMouseDown('max')}
            />
            <div
              className={`${styles.sliderThumb} ${styles.minThumb}`}
              style={{ left: `${reversedMinPercentage}%` }}
              onMouseDown={handleMouseDown('min')}
            />
          </div>
        </div>

        <div className={styles.inputsContainer}>
          <div className={styles.inputGroup}>
            <label>ממחיר</label>
            <input
              type="text"
              value={formatPrice(localMinPrice)}
              onChange={(e) => handleInputChange('min', e.target.value)}
              className={styles.priceInput}
            />
          </div>
          <div className={styles.dash}>-</div>
          <div className={styles.inputGroup}>
            <label>עד מחיר</label>
            <input
              type="text"
              value={formatPrice(localMaxPrice)}
              onChange={(e) => handleInputChange('max', e.target.value)}
              className={styles.priceInput}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.resetButton} onClick={onClose}>
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

export default PriceModal;
