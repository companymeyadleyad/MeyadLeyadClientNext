"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./StepIndicator.module.css";

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
  stepTitles: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
  stepTitles,
}) => {
  return (
    <Container className={styles.container}>
      <Row className={styles.indicator}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <Col
            key={index}
            className={[
              styles.step,
              index <= currentStep ? styles.active : "",
              index === currentStep ? styles.current : "",
            ].join(" ")}
          >
            <div className={styles.stepTitle}>{stepTitles[index]}</div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StepIndicator;
