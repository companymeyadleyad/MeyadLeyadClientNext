"use client";

import React, { useEffect, useCallback } from "react";
import styles from "./Popup.module.css";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  type: "success" | "error";
  title?: string;
  message: string;
  actionText?: string;
  actionHandler?: () => void;
}

const Popup: React.FC<PopupProps> = ({
  open,
  onClose,
  type,
  title,
  message,
  actionText = "OK",
  actionHandler,
}) => {
  const onEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onEsc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prev;
    };
  }, [open, onEsc]);

  if (!open) return null;

  return (
    <div className={styles["popup-overlay"]} role="presentation" onClick={onClose}>
      <div
        className={`${styles["popup-modal"]} ${
          type === "success" ? styles["popup-success"] : styles["popup-error"]
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "popup-title" : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles["popup-close"]}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <div className={styles["popup-icon"]} aria-hidden="true">
          {type === "success" ? "✔️" : "❌"}
        </div>

        {title && (
          <div id="popup-title" className={styles["popup-title"]}>
            {title}
          </div>
        )}

        <div className={styles["popup-message"]}>{message}</div>

        <button
          type="button"
          className={styles["popup-action"]}
          onClick={actionHandler || onClose}
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};

export default Popup;
