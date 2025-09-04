"use client";

import React, { useState, useEffect, useRef } from "react";
import { Form, InputGroup, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FeatureCheckbox from "../Fields/SystemFields/FeatureCheckbox";

// Custom styles
const fieldStyles: React.CSSProperties = {
  border: "0px",
  borderBottom: "3px solid var(--site-primary)",
  borderRadius: "0px",
  transition: "all 0.3s ease",
  backgroundColor: "#c2b6b640",
  outline: "none",
  boxShadow: "none",
};

// Custom styles for checkbox and radio
const customControlStyles: React.CSSProperties = {
  borderColor: "var(--site-primary)",
};

// Custom styles for list group
const listGroupStyles: React.CSSProperties = {
  border: "1px solid var(--site-primary)",
  borderRadius: "4px",
};

// Focus styles (אם תרצי להשתמש)
const focusStyles: React.CSSProperties = {
  borderBottom: "3px solid var(--site-primary-light)",
};

interface BaseFieldProps {
  label: string;
  name: string;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

// Text Input Field
export const TextField: React.FC<BaseFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Control
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ? t(placeholder) : ""}
        isInvalid={!!error}
        disabled={disabled}
        style={!error ? fieldStyles : undefined}
        className="custom-form-control"
      />
      {error && (
        <Form.Control.Feedback type="invalid">{t(error)}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

// Number Input Field
export const NumberField: React.FC<
  BaseFieldProps & { min?: number; max?: number }
> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
  min,
  max,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Control
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        name={name}
        value={value}
        onChange={(e) => {
          // שומר רק ספרות
          const numericValue = e.target.value.replace(/[^0-9]/g, "");
          onChange(numericValue);
        }}
        placeholder={placeholder ? t(placeholder) : ""}
        isInvalid={!!error}
        disabled={disabled}
        min={min}
        max={max}
        style={!error ? fieldStyles : undefined}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{t(error)}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

// Select Field
export interface SelectOption {
  value: string | number;
  label: string;
}

export const SelectField: React.FC<
  BaseFieldProps & { options: SelectOption[] }
> = ({ label, name, value, onChange, error, required, disabled, options }) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        isInvalid={!!error}
        disabled={disabled}
        style={!error ? fieldStyles : undefined}
      >
        <option value="">{t("select.placeholder")}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </Form.Select>
      {error && (
        <Form.Control.Feedback type="invalid">{t(error)}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

// Checkbox Field
export const CheckboxField: React.FC<Omit<BaseFieldProps, "placeholder">> = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <FeatureCheckbox
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      required={required}
      error={error}
      disabled={disabled ?? false}
      customControlStyles={{ marginLeft: "10px" }}
      t={t}
    />
  );
};

// Radio Group Field
export const RadioGroupField: React.FC<
  BaseFieldProps & { options: SelectOption[] }
> = ({ label, name, value, onChange, error, required, disabled, options }) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      {options?.map((option) => (
        <Form.Check
          key={option.value}
          type="radio"
          id={`${name}-${option.value}`}
          name={name}
          label={t(option.label)}
          value={String(option.value)}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          style={customControlStyles}
        />
      ))}
      {error && (
        <Form.Control.Feedback type="invalid">{t(error)}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

// Textarea Field
export const TextareaField: React.FC<BaseFieldProps & { rows?: number }> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
  rows = 3,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Control
        as="textarea"
        rows={rows}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ? t(placeholder) : ""}
        isInvalid={!!error}
        disabled={disabled}
        style={!error ? fieldStyles : undefined}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{t(error)}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

// Price Field with Currency
export const PriceField: React.FC<BaseFieldProps & { currency?: string }> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
  currency = "₪",
}) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <InputGroup>
        <Form.Control
          type="number"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ? t(placeholder) : ""}
          isInvalid={!!error}
          disabled={disabled}
          style={!error ? fieldStyles : undefined}
        />
        <InputGroup.Text style={fieldStyles}>{currency}</InputGroup.Text>
        {error && (
          <Form.Control.Feedback type="invalid">
            {t(error)}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
};

// Phone Number Field
export const PhoneField: React.FC<BaseFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <InputGroup>
        <Form.Control
          type="tel"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ? t(placeholder) : ""}
          isInvalid={!!error}
          disabled={disabled}
          style={!error ? fieldStyles : undefined}
        />
        {error && (
          <Form.Control.Feedback type="invalid">
            {t(error)}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
};

// Autocomplete Field
interface AutocompleteFieldProps extends BaseFieldProps {
  minChars?: number;
  debounceMs?: number;
  onSearch: (query: string) => Promise<SelectOption[]>;
}

export const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
  minChars = 3,
  debounceMs = 300,
  onSearch,
}) => {
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  // בטוח לדפדפן/Node טיפוסית בסביבת TS של Next
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update input value when external value changes
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Only search if we have enough characters
    if (newValue.length >= minChars) {
      setIsLoading(true);

      // Debounce the search
      debounceTimer.current = setTimeout(async () => {
        try {
          const results = await onSearch(newValue);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }, debounceMs);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: SelectOption) => {
    setInputValue(suggestion.label);
    onChange(suggestion.value);
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <Form.Group className="mb-3 position-relative">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <div className="position-relative">
        <Form.Control
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={placeholder ? t(placeholder) : ""}
          isInvalid={!!error}
          disabled={disabled}
          style={!error ? fieldStyles : undefined}
        />
        {isLoading && (
          <div
            className="position-absolute"
            style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }}
          >
            <div
              className="spinner-border spinner-border-sm text-primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {showSuggestions && suggestions.length > 0 && (
          <div
            className="position-absolute w-100"
            style={{
              zIndex: 1000,
              maxHeight: "200px",
              overflowY: "auto",
              backgroundColor: "white",
              border: "1px solid #ced4da",
              borderRadius: "0.25rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.value}
                className="p-2 cursor-pointer hover-bg-light"
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ cursor: "pointer" }}
              >
                {suggestion.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <Form.Control.Feedback type="invalid">{t(error)}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

// List Group Field
interface ListGroupFieldProps extends BaseFieldProps {
  items: { value: string | number; label: string }[];
  onItemClick: (value: string | number) => void;
}

export const ListGroupField: React.FC<ListGroupFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
  disabled,
  items,
  onItemClick,
}) => {
  const { t } = useTranslation();

  const handleItemClick = (itemValue: string | number) => {
    onChange(itemValue);
    onItemClick(itemValue);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <ListGroup style={!error ? listGroupStyles : undefined}>
        {items.map((item) => (
          <ListGroup.Item
            key={item.value}
            action
            onClick={() => handleItemClick(item.value)}
            active={value === item.value}
            disabled={disabled}
            className="text-end"
          >
            {t(item.label)}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {error && (
        <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
          {t(error)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="2" stroke="#222" strokeWidth="2" />
      <path
        d="M1 12C3.5 7 8 4 12 4C16 4 20.5 7 23 12C20.5 17 16 20 12 20C8 20 3.5 17 1 12Z"
        stroke="#222"
        strokeWidth="2"
      />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="2" stroke="#222" strokeWidth="2" />
      <path
        d="M1 12C3.5 7 8 4 12 4C16 4 20.5 7 23 12C20.5 17 16 20 12 20C8 20 3.5 17 1 12Z"
        stroke="#222"
        strokeWidth="2"
      />
      <line x1="4" y1="20" x2="20" y2="4" stroke="#222" strokeWidth="2" />
    </svg>
  );

// Password Input Field
export const PasswordField: React.FC<BaseFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form.Group className="mb-3 position-relative">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <div style={{ position: "relative" }}>
        <Form.Control
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ? t(placeholder) : ""}
          isInvalid={!!error}
          disabled={disabled}
          style={{
            ...(!error ? fieldStyles : {}),
            paddingLeft: "40px",
            direction: "rtl",
          }}
          className="custom-form-control"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            zIndex: 2,
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EyeIcon open={showPassword} />
        </span>
      </div>
      {error && (
        <Form.Control.Feedback type="invalid">{t(error)}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};
