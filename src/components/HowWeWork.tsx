import styles from "./HowWeWork.module.css";

const STEPS = [
  {
    number: "1",
    title: "Tell us what you need",
    text: "Send us your enquiry, whatever it involves.",
  },
  {
    number: "2",
    title: "Meet your project lead",
    text: "We match you with the industry veteran best suited to your need, who joins the first call.",
  },
  {
    number: "3",
    title: "Get a clear scope and fixed quote",
    text: "Within five working days of our call.",
  },
  {
    number: "4",
    title: "We get it done",
    text: "Your project lead keeps you updated at every step until the work is complete.",
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>How we work</h2>

        <ol className={styles.steps}>
          {STEPS.map((step) => (
            <li key={step.number} className={styles.step}>
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>

        <p className={styles.highlightText}>
          Paid by you, for the service. Never a commission on what you buy,
          never a payment from the supplier.
        </p>
      </div>
    </section>
  );
}
