import styles from "./OurExperts.module.css";

const EXPERTS = [
  { name: "R. D. Jadhav", background: "Formerly Tata Motors" },
  { name: "Shirish Deshpande", background: "Formerly Kalyani Steels" },
  { name: "Abhijit Waichal", background: "Formerly Menon Bearings" },
  { name: "Avinash Deomore", background: "Industrialist" },
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
          industry veteran leads it. Our experts all have 20+ years of
          experience at top-tier industrial companies such as Tata Motors,
          Kalyani Steels and Menon Bearings, now working with us as project
          leads. Your project lead is your single point of contact and stays
          involved at every step.
        </p>

        <div className={styles.cards}>
          {EXPERTS.map((expert) => (
            <div key={expert.name} className={styles.card}>
              <span className={styles.cardYears}>{expert.name}</span>
              <span className={styles.cardCompany}>{expert.background}</span>
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
