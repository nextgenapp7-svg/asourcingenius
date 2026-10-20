"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useContactModal } from "./ContactModalProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const openContact = useContactModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.inner}>
        <div className={styles.brandGroup}>
          <Image
            src="/logo-white.png"
            alt="Asourcingenius logo"
            width={255}
            height={232}
            className={styles.logo}
            priority
          />
          <span className={styles.brand}>ASourcinGenius</span>
        </div>

        <nav className={styles.nav}>
          <button
            type="button"
            className={`${styles.navLink} ${styles.navLinkButton}`}
            onClick={scrollToTop}
          >
            Home
          </button>
          <span className={styles.navDivider} aria-hidden="true" />
          <button
            type="button"
            className={`${styles.navLink} ${styles.navLinkButton}`}
            onClick={openContact}
          >
            Contact Us
          </button>
        </nav>
      </div>
    </header>
  );
}
