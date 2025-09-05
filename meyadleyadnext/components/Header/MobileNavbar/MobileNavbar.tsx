"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";

import { useHeaderHooks } from "@/components/Header/Hooks/useHeaderHooks";
import { userStore } from "@/stores/User.store";
import { useMounted } from "@/app/_hooks/useMounted";
import styles from "./MobileNavbar.module.css";

interface MobileNavbarProps {
  toggleMobileMenu: () => void;
}

const NAV_ID = "basic-navbar-nav";

const MobileNavbar: React.FC<MobileNavbarProps> = observer(({ toggleMobileMenu }) => {
  const { handleStartAdPosting } = useHeaderHooks();
  const mounted = useMounted();

  // אל תסמוך על סטור בצד השרת – תחליף משמורתי רק אחרי mount
  const showLoggedInUI = mounted && userStore.isLoggedIn;

  // חשוב: אל תוסיף את מחלקת ה-CSS Module לפני mount
  const avatarClassName = `me-2 ${mounted ? styles.userAvatar : ""}`;

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="dark" 
      fixed="top"
      className={`d-flex d-lg-none ${styles.headerNavbar || ""}`}
    >
      <Container>
        <Navbar.Toggle aria-controls={NAV_ID} onClick={toggleMobileMenu} />

        <Link href="/" className={`navbar-brand mx-auto ${styles.brandLogo}`} aria-label="דף הבית">
          <Image
            src="/images/logo6.png"
            alt="Hand to Hand Logo"
            width={140}
            height={38}
            priority
          />
        </Link>

        <div className="d-flex align-items-center">
          <Button
            variant="outline-primary"
            className="btn-success p-2"
            onClick={handleStartAdPosting}
          >
            + פרסום מודעה
          </Button>
        </div>

        <div className="d-flex justify-content-center">
          <Link
            href={showLoggedInUI ? "/profile" : "/login"}
            className={avatarClassName}
            aria-label={showLoggedInUI ? "פרופיל" : "התחברות"}
            // סגנון בסיסי כדי שהמידות לא יקפצו לפני הוספת המחלקה (SSR ו-Client initial זהים)
            style={!mounted ? {
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            } : undefined}
          >
            {showLoggedInUI && userStore.user?.firstName ? (
              <div className={styles.avatarCircle}>{userStore.user.firstName.charAt(0)}</div>
            ) : (
              <FontAwesomeIcon icon={faUser} size="lg" />
            )}
          </Link>
        </div>
      </Container>
    </Navbar>
  );
});

export default MobileNavbar;
