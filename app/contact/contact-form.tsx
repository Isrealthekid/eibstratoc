"use client";

import type { FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./page.module.css";

export default function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fields = new FormData(event.currentTarget);
    const value = (name: string) => String(fields.get(name) ?? "").trim();
    const service = new URLSearchParams(window.location.search).get("service");
    const subject = service ? `EIB STRATOC enquiry: ${service}` : "EIB STRATOC enquiry";
    const body = [
      `Name: ${value("firstName")} ${value("lastName")}`,
      `Email: ${value("email")}`,
      `Phone: ${value("phone")}`,
      `Organisation: ${value("company")}`,
      ...(service ? [`Service: ${service}`] : []),
      "",
      value("message"),
    ].join("\n");

    window.location.href = `mailto:info@eibstratoc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.visuallyHidden}>First name *</span>
          <input name="firstName" type="text" autoComplete="given-name" placeholder="First name*" required />
        </label>
        <label className={styles.field}>
          <span className={styles.visuallyHidden}>Last name *</span>
          <input name="lastName" type="text" autoComplete="family-name" placeholder="Last name*" required />
        </label>
        <label className={styles.field}>
          <span className={styles.visuallyHidden}>Email address *</span>
          <input name="email" type="email" autoComplete="email" placeholder="E-mail address*" required />
        </label>
        <label className={styles.field}>
          <span className={styles.visuallyHidden}>Phone number *</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="Phone number*" required />
        </label>
        <label className={`${styles.field} ${styles.fullWidth}`}>
          <span className={styles.visuallyHidden}>Company name *</span>
          <input name="company" type="text" autoComplete="organization" placeholder="Company name*" required />
        </label>
        <label className={`${styles.field} ${styles.fullWidth}`}>
          <span className={styles.visuallyHidden}>Message *</span>
          <textarea name="message" placeholder="Message*" rows={8} required />
        </label>
      </div>
      <div className={styles.formFooter}>
        <button type="submit" className={`${styles.submit} nav-item nav-contact`}>
          Send message
          <span className="nav-arrow" aria-hidden="true"><ArrowUpRight strokeWidth={1.8} /></span>
        </button>
        <p>Opens your email app with your message ready to send.</p>
      </div>
    </form>
  );
}
