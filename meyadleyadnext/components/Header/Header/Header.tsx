"use client";

import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import MobileNavbar from "@/components/Header/MobileNavbar/MobileNavbar";
import MobileMenuOverlay from "@/components/Header/MobileMenuOverlay/MobileMenuOverlay";
import { categoriesStore } from "../../../stores/Categories.store";

import styles from "./Header.module.css";

const Header = observer(function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    // נטען קטגוריות פעם אחת בצד לקוח
    categoriesStore.fetchCategories();
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);
  const handleCategoryClick = (category: string) =>
    setOpenCategory((prev) => (prev === category ? null : category));

  return (
    <header className={styles.header}>
      <Container>
        {/* Desktop */}
        <DesktopNavbar />

        {/* Mobile */}
        <MobileNavbar toggleMobileMenu={toggleMobileMenu} />

        {/* Overlay למובייל */}
        <MobileMenuOverlay
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          openCategory={openCategory}
          handleCategoryClick={handleCategoryClick}
        />
      </Container>
    </header>
  );
});

export default Header;
