"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { categoriesStore } from "@/stores/Categories.store";
import { userStore } from "@/stores/User.store";
import { useHeaderHooks } from "@/components/Header/Hooks/useHeaderHooks";
import UserMenuPopup from "@/components/Header/DesktopNavbar/UserMenuPopup";
import AuthModal from "@/components/Header/DesktopNavbar/AuthModal";
import { useMounted } from "@/app/_hooks/useMounted"; // ← ה־hook החדש
import styles from "./DesktopNavbar.module.css";
import { Category } from "@/types/Categories/Category";
import { City } from "@/types/Cities/City";

const DesktopNavbar = observer(function DesktopNavbar() {
  const router = useRouter();
  const mounted = useMounted();               // ← ממתינים ל־mount
  const [showAuthModal, setShowAuthModal] = useState(false);

  const {
    handleStartAdPosting,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    openDropdown,
  } = useHeaderHooks();

  const handleLogout = () => {
    userStore.clearUser();
    router.push("/");
  };

  const handleProfileClick = () => router.push("/profile");
  const handleLogin = () => router.push("/login");
  const handleRegister = () => router.push("/register");

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      fixed="top"
      className={`shadow-sm d-none d-lg-flex ${styles.headerNavbar}`}
    >
      <div className="container-fluid px-4">
        <Link href="/" className={`navbar-brand ${styles.brandLogo}`}>
          <Image src="/images/logo6.png" alt="Hand to Hand Logo" width={140} height={50} priority />
        </Link>

        {/* ... הקטגוריות ... */}
<Nav className={`mx-auto ${styles.categoryNav}`}>
          {categoriesStore.categories?.map((category: Category) => (
            <div
              key={category.categoryNumber}
              onMouseEnter={() =>
                handleMouseEnter(`nav-dropdown-${category.categoryNumber}`)
              }
              onMouseLeave={handleMouseLeave}
            >
              <NavDropdown
                title={category.categoryName}
                id={`nav-dropdown-${category.categoryNumber}`}
                className={`mx-2 ${styles.customDropdown}`}
                show={openDropdown === `nav-dropdown-${category.categoryNumber}`}
                onClick={() =>
                  handleClick(`nav-dropdown-${category.categoryNumber}`)
                }
              >
                {(category?.cities ?? []).map((city: City) => (
                  <NavDropdown.Item
                    key={city.cityId}
                    as={Link}
                    href={`#`} // ← עדכני לנתיב האמיתי אם יש, למשל: `/rent/${city.slug}`
                  >
                    {city.cityName}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </div>
          ))}
        </Nav>
        <div className="align-items-center d-flex m-0 me-1">
          <AuthModal
            show={showAuthModal}
            onHide={() => setShowAuthModal(false)}
            onLogin={handleLogin}
            onRegister={handleRegister}
          />

          <Button variant="outline-primary" className="btn-success" onClick={handleStartAdPosting}>
            + פרסום מודעה
          </Button>

          <div className="me-2">
            {/* בזמן SSR/לפני mount – נציג placeholder יציב כדי למנוע mismatch */}
            {!mounted ? (
              <div style={{ width: 40, height: 40 }} />
            ) : userStore.isLoggedIn ? (
              <UserMenuPopup
                onProfile={handleProfileClick}
                onLogout={handleLogout}
                onLogin={handleLogin}
                onRegister={handleRegister}
              />
            ) : (
              <Button variant="primary" className="me-2" onClick={() => setShowAuthModal(true)}>
                התחברות / הרשמה
              </Button>
            )}
          </div>
        </div>
      </div>
    </Navbar>
  );
});

export default DesktopNavbar;
