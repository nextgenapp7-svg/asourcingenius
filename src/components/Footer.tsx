"use client";

import Image from "next/image";
import styles from "./Footer.module.css";
import { useContactModal } from "./ContactModalProvider";

const LINKS = [
  { label: "About us", href: "#about" },
  { label: "Our offerings", href: "#offerings" },
  { label: "Industries & Products", href: "#industries" },
  { label: "How we work", href: "#how-we-work" },
];

export default function Footer() {
  const openContact = useContactModal();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.primary}>
          <div className={styles.brandGroup}>
            <Image
              src="/logo-white.png"
              alt="Asourcingenius logo"
              width={255}
              height={232}
              className={styles.logo}
            />
            <span className={styles.brand}>ASourcinGenius</span>
          </div>

          <h2 className={styles.title}>Your India operations, run by our engineers</h2>
          <p className={styles.body}>
            Asourcingenius is an India based supply chain consulting firm,
            helping medium to large scale clients abroad to find, setup and
            run their onground supply chain operations in India.
          </p>
        </div>

        <nav className={styles.linkList}>
          <span className={styles.linkListLabel}>Sitemap</span>
          <button type="button" className={`${styles.link} ${styles.linkButton}`} onClick={scrollToTop}>
            Home
          </button>
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
          <button type="button" className={`${styles.link} ${styles.linkButton}`} onClick={openContact}>
            Contact us
          </button>

          <div className={styles.contact}>
            <span className={styles.linkListLabel}>Contact</span>
            <a
              href="https://www.linkedin.com/company/asourcingenius"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              LinkedIn
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
