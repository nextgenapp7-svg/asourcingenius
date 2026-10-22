"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./ContactModal.module.css";

const REQUEST_TYPES = [
  "Supplier Sourcing",
  "Quality Audit & Inspection",
  "Compliance & Certification",
  "General Inquiry",
  "Other",
];

const FIELD_NAMES = ["name", "company", "email", "requestType", "message"] as const;

export default function ContactModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const invalid = new Set<string>();
    for (const name of FIELD_NAMES) {
      if (!String(data.get(name) ?? "").trim()) {
        invalid.add(name);
      }
    }

    if (invalid.size > 0) {
      setErrors(invalid);
      return;
    }

    setErrors(new Set());
    setSendError(false);
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });

      if (!response.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  function clearError(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name } = event.target;
    if (errors.has(name)) {
      setErrors((prev) => {
        const next = new Set(prev);
        next.delete(name);
        return next;
      });
    }
  }

  function fieldClass(name: string) {
    return `${styles.input} ${errors.has(name) ? styles.inputError : ""}`;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        {submitted ? (
          <div className={styles.confirmation}>
            <div className={styles.successIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className={styles.confirmationText}>
              Message sent, our representative will contact you soon over email
            </p>
            <button type="button" className={styles.sendButton} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className={styles.title}>Contact Us</h3>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <label className={styles.honeypot} aria-hidden="true">
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>

              {errors.size > 0 && (
                <p className={styles.formError}>Please fill in all required fields.</p>
              )}
              {sendError && (
                <p className={styles.formError}>
                  Something went wrong sending your message. Please try again.
                </p>
              )}

              <label className={styles.field}>
                <span>Name</span>
                <input
                  className={fieldClass("name")}
                  type="text"
                  name="name"
                  onChange={clearError}
                />
              </label>

              <label className={styles.field}>
                <span>Company Name</span>
                <input
                  className={fieldClass("company")}
                  type="text"
                  name="company"
                  onChange={clearError}
                />
              </label>

              <label className={styles.field}>
                <span>Email</span>
                <input
                  className={fieldClass("email")}
                  type="email"
                  name="email"
                  onChange={clearError}
                />
              </label>

              <label className={styles.field}>
                <span>Type of Request</span>
                <select
                  className={fieldClass("requestType")}
                  name="requestType"
                  defaultValue=""
                  onChange={clearError}
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {REQUEST_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.field}>
                <span>Message</span>
                <textarea
                  className={fieldClass("message")}
                  name="message"
                  rows={4}
                  onChange={clearError}
                />
              </label>

              <div className={styles.actions}>
                <button type="button" className={styles.cancelButton} onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className={styles.sendButton} disabled={sending}>
                  {sending ? "Sending…" : "Send"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
