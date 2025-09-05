// components/Fields/SystemFields/SystemField.tsx
"use client";

import React from "react";
import {
  AutocompleteField,
  CheckboxField,
  ListGroupField,
  NumberField,
  SelectField,
  TextareaField,
  TextField,
} from "@/components/Fields/FormFields";
import type { SelectOption } from "@/types/Categories/SelectOption";
import { FieldType } from "@/types/Fields/FieldType";
import styles from "./SystemField.module.css";

interface SystemFieldProps {
  fieldType: FieldType;
  label: string;
  name: string;
  value: string | boolean | number;
  onChange: (value: any) => void;
  placeHolder?: string;
  required?: boolean;
  options?: SelectOption[];
  onSearch?: (query: string) => Promise<SelectOption[]>;
  minChars?: number;
  debounceMs?: number;
  onItemClick?: (value: string | number) => void;
  error?: string;
  touched?: boolean;
}

const SystemField: React.FC<SystemFieldProps> = ({
  fieldType,
  label,
  name,
  value,
  onChange,
  placeHolder,
  required,
  options = [],
  onSearch,
  minChars = 3,
  debounceMs = 300,
  onItemClick,
  error,
  touched,
}) => {
  const showError = !!touched && !!error;

  const renderField = () => {
    switch (fieldType) {
      case FieldType.CheckboxField:
        return (
          <CheckboxField
            label={label}
            name={name}
            onChange={onChange}
            value={Boolean(value)}
            required={required}
            error={showError ? error : undefined}
          />
        );

      case FieldType.TextField:
        return (
          <TextField
            label={label}
            name={name}
            onChange={onChange}
            value={(value ?? "") as string}
            placeholder={placeHolder}
            required={required}
            error={showError ? error : undefined}
          />
        );

      case FieldType.InputNumberField:
        return (
          <NumberField
            label={label}
            name={name}
            onChange={onChange}
            value={String(value ?? "")}
            placeholder={placeHolder}
            required={required}
            error={showError ? error : undefined}
          />
        );

      case FieldType.SelectField:
        return (
          <SelectField
            label={label}
            name={name}
            onChange={onChange}
            value={String(value ?? "")}
            options={options}
            required={required}
            error={showError ? error : undefined}
          />
        );

      case FieldType.TextareaField:
        return (
          <TextareaField
            label={label}
            name={name}
            onChange={onChange}
            value={(value ?? "") as string}
            placeholder={placeHolder}
            required={required}
            error={showError ? error : undefined}
          />
        );

      case FieldType.AutocompleteField: {
        if (!onSearch) {
          console.error(`AutocompleteField ${name} requires an onSearch function`);
          return null;
        }
        const selectedOption = (options || []).find((opt) => opt.value === value);
        return (
          <AutocompleteField
            label={label}
            name={name}
            onChange={onChange}
            value={selectedOption?.label || (typeof value === "string" ? value : "")}
            onSearch={onSearch}
            minChars={minChars}
            debounceMs={debounceMs}
            required={required}
            placeholder={placeHolder}
            error={showError ? error : undefined}
          />
        );
      }

      case FieldType.ListGroupField:
        if (!onItemClick) {
          console.error(`ListGroupField ${name} requires an onItemClick function`);
          return null;
        }
        return (
          <ListGroupField
            label={label}
            name={name}
            value={String(value ?? "")}
            onChange={onChange}
            items={options}
            onItemClick={onItemClick}
            required={required}
            error={showError ? error : undefined}
          />
        );

      default:
        return null;
    }
  };

  return <div className={styles.systemField}>{renderField()}</div>;
};

export default SystemField;
