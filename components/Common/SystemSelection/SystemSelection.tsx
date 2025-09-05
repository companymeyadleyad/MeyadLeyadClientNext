"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./SystemSelection.module.css";

export interface SystemOption {
  id: number | string;
  name: string;
  icon: IconDefinition; // מעבירים faHome / fa... ולא JSX
}

interface SystemSelectionProps {
  options: SystemOption[];
  onOptionSelect: (optionId: number | string) => void;
  title?: string;
  className?: string;
}

const SystemSelection: React.FC<SystemSelectionProps> = ({
  options,
  onOptionSelect,
  title,
  className = "",
}) => {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ direction: "rtl" }}
    >
      {title && <h1 className={styles.title}>{title}</h1>}

      <div className={styles.grid}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={styles.item}
            onClick={() => onOptionSelect(option.id)}
          >
            <div className={styles.content}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={option.icon} />
              </div>
              <div className={styles.text}>{option.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SystemSelection;
