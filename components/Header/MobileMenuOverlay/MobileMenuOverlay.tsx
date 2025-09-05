"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Nav, NavDropdown, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";

import { categoriesStore } from "@/stores/Categories.store";
import { userStore } from "@/stores/User.store";
import type { Category } from "@/types/Categories/Category";
import type { City } from "@/types/Cities/City";

import { useMounted } from "@/app/_hooks/useMounted";
import MobileAuthModal from "./MobileAuthModal";
import styles from "./MobileMenuOverlay.module.css";

interface MobileMenuOverlayProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  openCategory: string | null;
  handleCategoryClick: (category: string) => void;
}

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = observer(
  ({ isMobileMenuOpen, toggleMobileMenu, openCategory, handleCategoryClick }) => {
    const router = useRouter();
    const mounted = useMounted();
    const isLoggedIn = mounted ? userStore.isLoggedIn : false; // ← חשוב!

    const [showMobileAuth, setShowMobileAuth] = useState(false);

    const handleStartAdPosting = () => {
      router.push("/select-category");
      toggleMobileMenu();
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.currentTarget === e.target) toggleMobileMenu();
    };

    return (
      <>
        <MobileAuthModal
          show={showMobileAuth}
          onClose={() => setShowMobileAuth(false)}
          onLogin={() => {
            setShowMobileAuth(false);
            router.push("/login");
          }}
          onRegister={() => {
            setShowMobileAuth(false);
            router.push("/register");
          }}
        />

        <div
          className={`${styles["mobile-menu-overlay"]} ${isMobileMenuOpen ? styles.open : ""}`}
          onClick={handleOverlayClick}
          role="presentation"
        >
          <div className={styles["mobile-menu-content"]} onClick={(e) => e.stopPropagation()}>
            <span className={styles["close-icon"]} onClick={toggleMobileMenu} role="button" aria-label="סגור">
              ✖
            </span>

            <div className={styles["mobile-menu-inner-container"]}>
              {!isLoggedIn ? (
                <Button
                  className={styles["mobile-menu-top-btn"]}
                  onClick={() => {
                    setShowMobileAuth(true);
                    toggleMobileMenu();
                  }}
                >
                  כניסה / הרשמה
                </Button>
              ) : (
                <Button className={styles["mobile-menu-publish-btn"]} onClick={handleStartAdPosting}>
                  + פרסום מודעה
                </Button>
              )}

              <Nav className="flex-column text-center" style={{ marginTop: 40, direction: "ltr" }}>
                {categoriesStore.categories.map((category: Category) => (
                  <div key={category.categoryNumber} className={styles["category-item"]}>
                    <div
                      className={styles["category-content"]}
                      onClick={() => handleCategoryClick(category.categoryName)}
                    >
                      <div className={styles["category-title"]}>{category.categoryName}</div>
                      <FontAwesomeIcon icon={faHome} className={styles["category-icon"]} />
                    </div>

                    <div
                      className={`${styles.submenu} ${
                        openCategory === category.categoryName ? styles.open : ""
                      }`}
                    >
                      {(category?.cities ?? []).map((city: City) => (
                        <NavDropdown.Item
                          key={city.cityId}
                          as={Link}
                          href="#"
                          className={styles["submenu-item"]}
                          onClick={() => toggleMobileMenu()}
                        >
                          {city.cityName}
                        </NavDropdown.Item>
                      ))}
                    </div>
                  </div>
                ))}
              </Nav>

              {isLoggedIn && (
                <button
                  className={styles["mobile-menu-logout-btn"]}
                  onClick={() => {
                    userStore.clearUser();
                    toggleMobileMenu();
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className={styles["logout-icon"]} />
                  התנתק
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default MobileMenuOverlay;
