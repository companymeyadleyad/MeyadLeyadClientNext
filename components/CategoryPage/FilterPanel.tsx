"use client";

import { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./FilterPanel.module.css";

interface FilterPanelProps {
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onClose: () => void;
}

const FilterPanel = ({ filters, onFilterChange, onClose }: FilterPanelProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    Object.entries(localFilters).forEach(([key, value]) => {
      onFilterChange(key, value as string);
    });
    onClose();
  };

  const clearFilters = () => {
    const clearedFilters = {
      city: '',
      propertyType: '',
      rooms: '',
      price: '',
      area: '',
      topArea: '',
      street: '',
      zoom: '15'
    };
    setLocalFilters(clearedFilters);
    Object.entries(clearedFilters).forEach(([key, value]) => {
      onFilterChange(key, value);
    });
  };

  const roomOptions = [
    { value: '', label: 'כל החדרים' },
    { value: '1', label: '1 חדר' },
    { value: '2', label: '2 חדרים' },
    { value: '3', label: '3 חדרים' },
    { value: '4', label: '4 חדרים' },
    { value: '5', label: '5+ חדרים' }
  ];

  const priceRanges = [
    { value: '', label: 'כל המחירים' },
    { value: '1000000', label: 'עד 1,000,000 ₪' },
    { value: '2000000', label: 'עד 2,000,000 ₪' },
    { value: '3000000', label: 'עד 3,000,000 ₪' },
    { value: '4000000', label: 'מעל 3,000,000 ₪' }
  ];

  const areaRanges = [
    { value: '', label: 'כל השטחים' },
    { value: '50', label: 'מעל 50 מ"ר' },
    { value: '80', label: 'מעל 80 מ"ר' },
    { value: '100', label: 'מעל 100 מ"ר' },
    { value: '120', label: 'מעל 120 מ"ר' },
    { value: '150', label: 'מעל 150 מ"ר' }
  ];

  const topAreaRanges = [
    { value: '', label: 'כל השטחים' },
    { value: '80', label: 'עד 80 מ"ר' },
    { value: '100', label: 'עד 100 מ"ר' },
    { value: '120', label: 'עד 120 מ"ר' },
    { value: '150', label: 'עד 150 מ"ר' },
    { value: '200', label: 'עד 200 מ"ר' }
  ];

  return (
    <Card className={styles.filterPanel}>
      <Card.Header className={styles.filterHeader}>
        <h5 className="mb-0">סינון מתקדם</h5>
        <Button
          variant="link"
          onClick={onClose}
          className={styles.closeButton}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Card.Header>
      
      <Card.Body className={styles.filterBody}>
        <Row>
          {/* Property Type */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>סוג הנכס</Form.Label>
              <Form.Select
                value={localFilters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">כל סוגי הנכסים</option>
                <option value="apartment">דירה</option>
                <option value="house">בית</option>
                <option value="penthouse">פנטהאוז</option>
                <option value="villa">וילה</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Number of Rooms */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>מספר חדרים</Form.Label>
              <Form.Select
                value={localFilters.rooms}
                onChange={(e) => handleFilterChange('rooms', e.target.value)}
                className={styles.filterSelect}
              >
                {roomOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Price Range */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>מחיר</Form.Label>
              <Form.Select
                value={localFilters.price}
                onChange={(e) => handleFilterChange('price', e.target.value)}
                className={styles.filterSelect}
              >
                {priceRanges.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Street */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>רחוב</Form.Label>
              <Form.Control
                type="text"
                placeholder="הכנס שם רחוב"
                value={localFilters.street}
                onChange={(e) => handleFilterChange('street', e.target.value)}
                className={styles.filterInput}
              />
            </Form.Group>
          </Col>

          {/* Area Range */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>שטח מינימלי</Form.Label>
              <Form.Select
                value={localFilters.area}
                onChange={(e) => handleFilterChange('area', e.target.value)}
                className={styles.filterSelect}
              >
                {areaRanges.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Top Area Range */}
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>שטח מקסימלי</Form.Label>
              <Form.Select
                value={localFilters.topArea}
                onChange={(e) => handleFilterChange('topArea', e.target.value)}
                className={styles.filterSelect}
              >
                {topAreaRanges.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Action Buttons */}
        <div className={styles.filterActions}>
          <Button
            variant="outline-secondary"
            onClick={clearFilters}
            className={styles.clearButton}
          >
            נקה הכל
          </Button>
          <Button
            variant="primary"
            onClick={applyFilters}
            className={styles.applyButton}
          >
            החל סינון
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FilterPanel;
