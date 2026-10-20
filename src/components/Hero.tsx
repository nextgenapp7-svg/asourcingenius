import styles from "./Hero.module.css";
import OrbitScene from "./OrbitScene";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            Your Indian operations, <span className={styles.titleAccent}>led by manufacturing veterans</span>
          </h1>
          <p className={styles.subtitle}>
            Supply chain and engineering consulting. From a single supplier
            audit to your entire supply chain, every project is led by an
            industry veteran, with our team working at your suppliers&apos;
            plants.
          </p>
        </div>

        <div className={styles.visual}>
          <OrbitScene />
        </div>
      </div>
    </section>
  );
}
