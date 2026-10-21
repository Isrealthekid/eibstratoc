import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Strategic Partners | EIB STRATOC",
  description: "Our strategic network connects technology providers, government agencies and regional expertise for shared situational awareness.",
};

// Partner names, roles and testimonials from https://www.eibstratoc.com/partners.
const partners = [
  { name: "NNPC", image: "NNPC-Logo.png", role: "Surveillance Partner", quote: "Working together has been an incredible experience. Their dedication to innovation is unmatched." },
  { name: "Nigerian Army", image: "nigerian_army.png", role: "Mapping Partner", quote: "The high-resolution GIS data provided has transform our terrain analysis capability." },
  { name: "Nigerian Airforce", image: "nigerian_air_force_emblem.png", role: "Security Intelligence Partner", quote: "Their advanced intelligence frameworks sets a new benchmark for national security." },
  { name: "Nigerian Presidency", image: "presidency.png", role: "Security Partner", quote: "Their security solutions have significantly improved our operations and efficiency." },
  { name: "Nigerian Police", image: "police_logo.png", role: "Security Partner", quote: "A powerful force multiplier in our effort to maintain public safety across the federation." },
  { name: "Nigerian Defence", image: "defence_logo.png", role: "", quote: "" },
  { name: "DSS", image: "dss.png", role: "Surveillance Partner", quote: "Their 24/7 surveillance and monitoring services have been exceptional and faultless." },
];

export default function PartnersPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Collaborative Ecosystem</p>
        <h1>Strategic<br />Network.</h1>
        <p className={styles.introduction}>Merging global technology leaders with regional expertise to forge an impenetrable security corridor.</p>
        <dl className={styles.metrics}>
          {[['PAN-AFRICA', 'Regions'], ['50+ AGENCIES', 'Entity Network'], ['ISO-CERTIFIED', 'Compliance'], ['SECURE UPLINK', 'Protocol']].map(([value, label]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </header>

      <section className={styles.alliance} data-navigation-surface="light" aria-labelledby="alliance-heading">
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>The Alliance</p><h2 id="alliance-heading">Operational Allies</h2></div>
          <p>We integrate with top-tier technology providers and government agencies to deliver seamless situational awareness.</p>
        </div>
        <ul className={styles.partners}>
          {partners.map((partner) => (
            <li key={partner.name}>
              <div className={styles.logo}><Image src={`/assets/partners/${partner.image}`} alt="" fill sizes="(max-width: 600px) 35vw, 15vw" /></div>
              <h3>{partner.name}</h3>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.testimonials} data-navigation-surface="light" aria-labelledby="testimonials-heading">
        <p className={styles.eyebrow}>Intelligence Feed</p>
        <h2 id="testimonials-heading">What Our Partners Say</h2>
        <div className={styles.quotes}>
          {partners.filter((partner) => partner.quote).map((partner) => (
            <figure key={partner.name}>
              <blockquote><p>“{partner.quote}”</p></blockquote>
              <figcaption><strong>{partner.name}</strong><span>{partner.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="partners-contact">
        <h2 id="partners-contact">Work with us.</h2>
        <p>Interested in partnering with EIB STRATOC? Get in touch to discuss how we can work together.</p>
        <Link href="/contact" className={styles.cta}>Contact us<ArrowUpRight aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
