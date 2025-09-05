"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./BottomNavBar.module.css";

const BottomNavBar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.bottomNavBar} dir="rtl" role="navigation" aria-label="תפריט תחתון">
      <button
        type="button"
        className={styles.navItem}
        onClick={() => router.push("/profile")}
        aria-label="פרופיל"
      >
        <Image
          src="/icons/user.svg"
          alt=""
          width={22}
          height={22}
          className={styles.navIcon}
        />
        <span>פרופיל</span>
      </button>

      <button
        type="button"
        className={styles.navItem}
        onClick={() => router.push("/ad-history")}
        aria-label="היסטוריית מודעות"
      >
        <Image
          src="/icons/history.svg"
          alt=""
          width={22}
          height={22}
          className={styles.navIcon}
        />
        <span>היסטוריית מודעות</span>
      </button>

      <button
        type="button"
        className={styles.navItem}
        onClick={() => router.push("/")}
        aria-label="עמוד הבית"
      >
        <Image
          src="/icons/home.svg"
          alt=""
          width={22}
          height={22}
          className={styles.navIcon}
        />
        <span>עמוד הבית</span>
      </button>
    </nav>
  );
};

export default BottomNavBar;
