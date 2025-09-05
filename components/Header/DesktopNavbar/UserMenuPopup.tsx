"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faUserCircle,
  faSignInAlt,
  faUserPlus,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { userStore } from "@/stores/User.store";
import styles from "./DesktopNavbar.module.css";

interface UserMenuPopupProps {
  onProfile: () => void;
  onLogout: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const UserMenuPopup: React.FC<UserMenuPopupProps> = observer(
  ({ onProfile, onLogout, onLogin, onRegister }) => {
    const router = useRouter();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setShowUserMenu(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className={styles.userMenuContainer} ref={menuRef}>
        <div
          className={styles.userAvatar}
          onClick={() => setShowUserMenu((prev) => !prev)}
          role="button"
          aria-label="תפריט משתמש"
        >
          {userStore.isLoggedIn ? (
            userStore.user?.firstName ? (
              <div className={styles.avatarCircle}>
                {userStore.user.firstName.charAt(0)}
              </div>
            ) : (
              <FontAwesomeIcon icon={faUser} size="lg" />
            )
          ) : (
            <FontAwesomeIcon icon={faUser} size="lg" />
          )}
        </div>

        {showUserMenu && (
          <div className={styles.userMenu}>
            {userStore.isLoggedIn ? (
              <>
                <Button
                  variant="link"
                  className={styles.menuItem}
                  onClick={() => {
                    setShowUserMenu(false);
                    onProfile(); // אפשר גם: router.push("/profile")
                  }}
                >
                  <FontAwesomeIcon icon={faUserCircle} className={styles.menuIcon} />
                  פרופיל
                </Button>

                <Button
                  variant="link"
                  className={styles.menuItem}
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className={styles.menuIcon} />
                  התנתק
                </Button>

                {userStore.user?.isAdmin && (
                  <Button
                    variant="link"
                    className={styles.menuItem}
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push("/business-post");
                    }}
                  >
                    <FontAwesomeIcon icon={faFileAlt} className={styles.menuIcon} />
                    פרסום עסקים
                  </Button>
                )}

                {userStore.user?.isAdmin && (
                  <Button
                    variant="link"
                    className={styles.menuItem}
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push("/upload-excel");
                    }}
                  >
                    <FontAwesomeIcon icon={faFileAlt} className={styles.menuIcon} />
                    העלאת קובץ
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  variant="link"
                  className={styles.menuItem}
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogin();
                  }}
                >
                  <FontAwesomeIcon icon={faSignInAlt} className={styles.menuIcon} />
                  התחברות
                </Button>

                <Button
                  variant="link"
                  className={styles.menuItem}
                  onClick={() => {
                    setShowUserMenu(false);
                    onRegister();
                  }}
                >
                  <FontAwesomeIcon icon={faUserPlus} className={styles.menuIcon} />
                  הרשמה
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default UserMenuPopup;
