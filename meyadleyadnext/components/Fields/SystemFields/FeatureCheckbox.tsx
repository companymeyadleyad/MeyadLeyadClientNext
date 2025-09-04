"use client";

import { Form } from "react-bootstrap";
import React from "react";

interface FeatureCheckboxProps {
  name: string;
  label: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
  required?: boolean;
  error?: string | null;
  disabled?: boolean;
  customControlStyles?: React.CSSProperties;
  t?: (key: string) => string;
}

const FeatureCheckbox: React.FC<FeatureCheckboxProps> = ({
  name,
  label,
  value,
  onChange,
  required = false,
  error = null,
  disabled = false,
  customControlStyles = {},
  t = (s) => s,
}) => {
  return (
    <div
      className={`feature-item ${value ? "selected" : ""}`}
      onClick={() => !disabled && onChange(!value)}
    >
      <Form.Check
        type="checkbox"
        id={name}
        label={
          <>
            {t(label)}
            {required && <span className="text-danger">*</span>}
          </>
        }
        checked={value}
        onChange={() => {}} // השליטה באינפוט דרך onClick של ה־div
        isInvalid={!!error}
        disabled={disabled}
        style={customControlStyles}
      />
      {error && <div className="invalid-feedback d-block">{t(error)}</div>}
    </div>
  );
};

export default FeatureCheckbox;
