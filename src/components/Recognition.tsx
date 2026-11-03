import Image from "next/image";
import styles from "./Recognition.module.css";

export default function Recognition() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.title}>
            Recognised by the <span className={styles.titleAccent}>Government of India</span>
          </h2>
          <p className={styles.subtitle}>
            Asourcingenius is officially recognised by the Department for
            Promotion of Industry and Internal Trade (DPIIT), part of the
            Ministry of Commerce &amp; Industry, under the national Startup
            India programme.
          </p>
        </div>

        <div className={styles.visual}>
          <Image
            src="/dpiit-certificate.jpg"
            alt="DPIIT Certificate of Recognition for Asourcingenius Private Limited under the Startup India initiative"
            width={800}
            height={565}
            className={styles.certificate}
          />
        </div>
      </div>
    </section>
  );
}
