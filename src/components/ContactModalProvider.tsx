"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import ContactModal from "./ContactModal";

const ContactModalContext = createContext<(() => void) | null>(null);

export function useContactModal() {
  const openContact = useContext(ContactModalContext);
  if (!openContact) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return openContact;
}

export default function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ContactModalContext.Provider value={() => setOpen(true)}>
      {children}
      {open && <ContactModal onClose={() => setOpen(false)} />}
    </ContactModalContext.Provider>
  );
}
