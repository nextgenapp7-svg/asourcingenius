"use client";

import styles from "./WhatWeDo.module.css";
import { useContactModal } from "./ContactModalProvider";

function MicroscopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="19" width="19" height="2.6" rx="0.8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M17.5 19v-5.5c0-2.8-2-5-4.5-5.3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M19.6 19v-6c0-3.6-2.9-6.6-6.4-7.1" stroke="currentColor" strokeWidth="1.6" />
      <g transform="rotate(-20 11 9)">
        <rect x="5.8" y="6.2" width="10.4" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="9.8" cy="9.2" r="2.1" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="9.8" cy="9.2" r="0.4" fill="currentColor" />
        <rect x="9.9" y="1.8" width="1.7" height="3.2" rx="0.3" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3.2" y="7.6" width="2.2" height="3.4" rx="0.4" stroke="currentColor" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

function BarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14H11V16H8.5V19H11V21H3V19H5.5V16H3Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 14L12 5H20V7H17.5V10H20V12L11 21" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 14L20 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function EngineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinejoin="round" strokeLinecap="round">
      <rect x="5.5" y="12" width="15" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="7" y="6.5" width="3.2" height="5.5" rx="0.6" stroke="currentColor" strokeWidth="1.6" />
      <rect x="11.4" y="6.5" width="3.2" height="5.5" rx="0.6" stroke="currentColor" strokeWidth="1.6" />
      <rect x="15.8" y="6.5" width="3.2" height="5.5" rx="0.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="4" cy="16.5" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 14.5v-4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7.5" y1="2" x2="7.5" y2="7" stroke="currentColor" strokeWidth="1.6" />
      <line x1="12.5" y1="2" x2="12.5" y2="7" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.5 7h11v3.5c0 3-2.5 5.5-5.5 5.5s-5.5-2.5-5.5-5.5V7z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M10 16v2c0 2 1.5 3.5 3.5 3.5S17 20 17 18c0-2.5 2-4.5 4.5-4.5H22"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function PlasticIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinejoin="round" strokeLinecap="round">
      <rect x="6.3" y="3.2" width="1.6" height="1.3" rx="0.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.3 4.5v1.2c-1 .6-1.7 1.6-1.7 3v8.8c0 .8.7 1.5 1.5 1.5h2.2c.8 0 1.5-.7 1.5-1.5V8.7c0-1.4-.7-2.4-1.7-3V4.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M4.6 11.5h3.4M4.6 14h3.4M4.6 16.5h3.4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12.5 8.2V6.5a1.8 1.8 0 013.6 0v1.7M17.1 8.2V6.5a1.8 1.8 0 013.6 0v1.7" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M11.6 8.2h10.5L21.3 18a1.6 1.6 0 01-1.6 1.4h-6.4a1.6 1.6 0 01-1.6-1.4l-.1-9.8z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 2h6M10 2v6l-5.2 9a2 2 0 001.73 3h11l-5.2-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 7v10l9 4 9-4V7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 11v10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function QuestionMarkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9.3 9.5a2.7 2.7 0 115.2 1c-.5 1.2-2.5 1.3-2.5 3.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" />
    </svg>
  );
}

const CATEGORIES = [
  {
    title: "Castings and machining",
    items: ["Grey and SG iron castings from our own shell moulding foundry", "Sand, steel, aluminium and bronze castings", "CNC-machined parts"],
    badge: "Core strength",
    icon: MicroscopeIcon,
    largeIcon: true,
  },
  {
    title: "Forgings and metal parts",
    items: ["Forged components", "Steel and alloy parts", "Strips and wire"],
    icon: BarIcon,
    largeIcon: true,
  },
  {
    title: "Mechanical components",
    items: ["Gears", "Bearings", "Fasteners", "Springs", "Fabrications"],
    icon: GearIcon,
    largeIcon: true,
  },
  {
    title: "Machinery and spares",
    items: ["Pumps", "Engines", "Machine parts", "Sub-assemblies"],
    icon: EngineIcon,
    largeIcon: true,
  },
  {
    title: "Electrical and electronics",
    items: ["Motors", "Control panels", "Cables", "Wiring harnesses"],
    icon: PlugIcon,
    largeIcon: true,
  },
  {
    title: "Plastic and rubber",
    items: ["Moulded parts", "Pipes", "Seals", "Gaskets", "Hoses"],
    icon: PlasticIcon,
    largeIcon: true,
  },
  {
    title: "Chemicals",
    items: ["Industrial chemicals", "Specialty chemicals"],
    icon: FlaskIcon,
    largeIcon: true,
  },
  {
    title: "Industrial packaging",
    items: ["Export crates", "Corrugated boxes", "Anti-rust packaging"],
    icon: BoxIcon,
    largeIcon: true,
  },
];

export default function WhatWeDo() {
  const openContact = useContactModal();

  return (
    <section id="industries" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Industries and products</h2>
        <p className={styles.subtitle}>
          Industrial products from manufacturers across India. Every supplier
          is assessed by our engineers before we recommend them.
        </p>

        <div className={styles.cards}>
          {CATEGORIES.map((category) => (
            <div
              key={category.title}
              className={`${styles.card} ${category.badge ? styles.cardHighlight : ""}`}
            >
              {category.badge && <span className={styles.cardBadge}>{category.badge}</span>}
              <div className={`${styles.cardIcon} ${category.largeIcon ? styles.cardIconLarge : ""}`}>
                <category.icon />
              </div>
              <h3 className={styles.cardTitle}>{category.title}</h3>
              <p className={styles.cardDescription}>{category.items.join(" · ")}</p>
            </div>
          ))}

          <button type="button" className={styles.cardMore} onClick={openContact}>
            <div className={`${styles.cardIcon} ${styles.cardIconLarge}`}>
              <QuestionMarkIcon />
            </div>
            <h3 className={styles.cardTitle}>Anything else?</h3>
            <span className={styles.cardEnquiry}>
              Send us an enquiry
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
