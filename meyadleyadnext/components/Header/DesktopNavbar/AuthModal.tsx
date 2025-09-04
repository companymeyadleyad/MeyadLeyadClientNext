"use client";

import { useRef, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";

interface AuthModalProps {
  show: boolean;
  onHide: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const buttonStyle: React.CSSProperties = {
  width: "80%",
  borderRadius: "2rem",
  fontSize: "1.3rem",
  fontWeight: 600,
  marginBottom: "2rem",
  height: 56,
  minHeight: 56,
  background: "var(--site-primary)",
  color: "#fff",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px rgba(80,80,160,0.08)",
  transition: "background 0.2s, color 0.2s",
};

const AuthModal: React.FC<AuthModalProps> = ({
  show,
  onHide,
  onLogin,
  onRegister,
}) => {
  const socialAreaRef = useRef<HTMLDivElement>(null);
  const [socialAreaHeight, setSocialAreaHeight] = useState<number>(0);

  // מודדים גובה אחרי שהמודאל מוצג
  useEffect(() => {
    if (!show) return;
    const id = requestAnimationFrame(() => {
      if (socialAreaRef.current) {
        setSocialAreaHeight(socialAreaRef.current.offsetHeight);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      backdrop="static"
      keyboard
      contentClassName="auth-modal-content" /* ראה הערה למטה */
    >
      <Modal.Body style={{ padding: 0, position: "relative" }}>
        {/* Close X button */}
        <button
          onClick={onHide}
          style={{
            position: "absolute",
            top: 18,
            left: 24,
            zIndex: 10,
            background: "none",
            border: "none",
            fontSize: 32,
            color: "#b57bb3",
            cursor: "pointer",
            fontWeight: 700,
            lineHeight: 1,
          }}
          aria-label="סגור"
        >
          ×
        </button>

        <div style={{ display: "flex", flexDirection: "row-reverse", minHeight: 400 }}>
          {/* Right Side - Login */}
          <div
            style={{
              flex: 1,
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 400,
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "1.5rem" }}>
              כבר יש לי חשבון
            </div>

            <div
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                style={buttonStyle}
                onClick={() => {
                  onHide();
                  onLogin();
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "var(--site-primary-dark)")}
                onMouseOut={(e) => (e.currentTarget.style.background = "var(--site-primary)")}
              >
                התחברות
              </button>
            </div>

            {/* Social */}
            <div
              className="auth-modal-social-area"
              ref={socialAreaRef}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                  display: "flex",
                  alignItems: "center",
                  margin: "2rem 0 1rem 0",
                }}
              >
                <div style={{ flex: 1, height: 1, background: "#ddd" }} />
                <span style={{ margin: "0 1rem", color: "#888", fontSize: "1rem" }}>
                  להמשיך עם
                </span>
                <div style={{ flex: 1, height: 1, background: "#ddd" }} />
              </div>

              <div style={{ display: "flex", gap: "1.5rem", width: "80%", justifyContent: "center" }}>
                <Button
                  variant="outline-secondary"
                  style={{
                    borderRadius: "50%",
                    width: 56,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                  }}
                  onClick={() => alert("Google login not implemented")}
                >
                  <FontAwesomeIcon icon={faGoogle} color="#ea4335" />
                </Button>

                <Button
                  variant="outline-secondary"
                  style={{
                    borderRadius: "50%",
                    width: 56,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                  }}
                  onClick={() => alert("Facebook login not implemented")}
                >
                  <FontAwesomeIcon icon={faFacebookF} color="#1877f3" />
                </Button>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "2.5rem",
                  width: "80%",
                  justifyContent: "center",
                  marginTop: 8,
                }}
              >
                <span style={{ fontSize: 14, color: "#888" }}>גוגל</span>
                <span style={{ fontSize: 14, color: "#888" }}>פייסבוק</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 1, background: "#b57bb3", margin: "2.5rem 0" }} />

          {/* Left Side - Register */}
          <div
            style={{
              flex: 1,
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 400,
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "1.5rem" }}>
              עוד אין לי חשבון
            </div>

            <div
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                style={buttonStyle}
                onClick={() => {
                  onHide();
                  onRegister();
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "var(--site-primary-dark)")}
                onMouseOut={(e) => (e.currentTarget.style.background = "var(--site-primary)")}
              >
                הרשמה לאתר
              </button>

              {/* שמירת גובה זהה לאזור הסושיאל בצד ימין */}
              <div
                className="auth-modal-social-area"
                style={{ width: "100%", height: socialAreaHeight || undefined }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
