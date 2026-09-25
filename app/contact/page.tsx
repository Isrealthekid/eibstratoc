import type { Metadata } from "next";
import ContactForm from "./contact-form";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact EIB STRATOC",
  description: "Discuss intelligence, surveillance and operational support requirements with EIB STRATOC.",
};

export default function ContactPage() {
  return (
    <main className={styles.page} data-critical-viewport>
      <div className={styles.layout}>
        <div className={styles.introduction}>
          <div>
            <h1>Get in touch</h1>
            <p>Tell us what you need to protect, and we’ll help you find the right intelligence, surveillance or operational support.</p>
          </div>
          <div className={styles.directContact}>
            <h2>General &amp; partnerships</h2>
            <a href="mailto:info@eibstratoc.com">info@eibstratoc.com</a>
            <p>Our satellite teleport is located at our Idu, Abuja facility, Nigeria.</p>
          </div>
        </div>

        <section className={styles.enquiry} aria-labelledby="contact-details-heading">
          <h2 id="contact-details-heading">Contact details</h2>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
