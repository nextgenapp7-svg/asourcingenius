import styles from "./OurExperts.module.css";

const EXPERTS = [
  { years: "30 years", company: "Tata Motors" },
  { years: "27 years", company: "Kalyani Steels" },
  { years: "25 years", company: "Menon Bearings" },
  { years: "30 years", company: "Industrialist" },
];

export default function OurExperts() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          <span className={styles.titleAccent}>Our experts:</span> Your project, led by an Indian industry veteran
        </h2>
        <p className={styles.body}>
          Whether you give us one task or your entire supply chain, an
          industry veteran with 25+ years at a leading Indian manufacturer
          leads it. They are your single point of contact and stay involved
          at every step.
        </p>

        <div className={styles.cards}>
          {EXPERTS.map((expert) => (
            <div key={expert.company} className={styles.card}>
              <span className={styles.cardYears}>{expert.years}</span>
              <span className={styles.cardCompany}>{expert.company}</span>
            </div>
          ))}
        </div>

        <p className={styles.note}>
          Our technical team does the field work at your suppliers&apos;
          plants every day, under your project lead&apos;s direction.
        </p>
      </div>
    </section>
  );
}
