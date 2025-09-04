"use client";

import { useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import styles from "./MobileMenuOverlay.module.css";

interface MobileAuthModalProps {
  show: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const MobileAuthModal: React.FC<MobileAuthModalProps> = ({
  show,
  onClose,
  onLogin,
  onRegister,
}) => {
  // סגירה עם ESC + נעילת גלילה מאחורי המודאל
  const onEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!show) return;
    document.addEventListener("keydown", onEsc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prev;
    };
  }, [show, onEsc]);

  if (!show) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onClose();
  };

  return (
    <div
      className={styles["mobile-auth-modal-overlay"]}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        className={styles["mobile-auth-modal"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-auth-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* כותרת */}
        <div className={styles["mobile-auth-modal-header"]}>
          <span id="mobile-auth-title">התחברות / הרשמה</span>
          <button
            className={styles["mobile-auth-modal-close"]}
            onClick={onClose}
            aria-label="סגור"
            type="button"
          >
            ×
          </button>
        </div>

        {/* גוף */}
        <div className={styles["mobile-auth-modal-body"]}>
          {/* הרשמה */}
          <div className={styles["mobile-auth-section"]}>
            <div className={styles["mobile-auth-title"]}>עוד אין לי חשבון</div>
            <button
              className={styles["mobile-auth-btn"]}
              onClick={onRegister}
              type="button"
            >
              הרשמה לאתר
            </button>
          </div>

          <hr className={styles["mobile-auth-divider"]} />

          {/* התחברות */}
          <div className={styles["mobile-auth-section"]}>
            <div className={styles["mobile-auth-title"]}>כבר יש לי חשבון</div>
            <button
              className={styles["mobile-auth-btn"]}
              onClick={onLogin}
              type="button"
            >
              התחברות
            </button>

            <div className={styles["mobile-auth-social"]}>
              <span className={styles["mobile-auth-social-label"]}>
                להמשיך עם
              </span>
              <div className={styles["mobile-auth-social-icons"]}>
                <button
                  className={styles["mobile-auth-social-btn"]}
                  onClick={() => alert("Google login not implemented")}
                  aria-label="התחברות עם גוגל"
                  type="button"
                >
                  <FontAwesomeIcon icon={faGoogle} color="#ea4335" />
                </button>
                <button
                  className={styles["mobile-auth-social-btn"]}
                  onClick={() => alert("Facebook login not implemented")}
                  aria-label="התחברות עם פייסבוק"
                  type="button"
                >
                  <FontAwesomeIcon icon={faFacebookF} color="#1877f3" />
                </button>
              </div>
              <div className={styles["mobile-auth-social-labels"]}>
                <span>גוגל</span>
                <span>פייסבוק</span>
              </div>
            </div>
          </div>
        </div>
        {/* /גוף */}
      </div>
    </div>
  );
};

export default MobileAuthModal;
