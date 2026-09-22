import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About EIB STRATOC",
  description: "We connect intelligence, surveillance and strategic operations to help protect people, critical infrastructure and national assets.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>About EIB STRATOC</p>
        <h1>Where intelligence meets action.</h1>
        <p className={styles.introduction}>We connect intelligence, surveillance and strategic operations to help protect people, critical infrastructure and national assets.</p>
      </header>

      <div className={styles.content} data-navigation-surface="light">
        <section className={styles.row} aria-labelledby="who-we-are">
          <h2 id="who-we-are">Who We Are</h2>
          <div>
            <p>EIB STRATOC is a Nigerian intelligence, surveillance and strategic operations company serving government, defence, security and private-sector clients. As owners of the Briech Intelligence Fusion Center and Briech Satellites, we bring real-time intelligence, geospatial technologies, satellite communications, cybersecurity and mission support into an integrated operational capability.</p>
            <p>Our platforms support safety, operational efficiency and national security efforts across Nigeria and beyond. We transform information from multiple sources into intelligence that helps decision makers anticipate threats and coordinate action.</p>
          </div>
        </section>

        <div className={styles.purpose}>
          <section aria-labelledby="our-vision">
            <h2 id="our-vision">Our Vision</h2>
            <p>To serve as Nigeria&apos;s premier 24/7 centralised intelligence-sharing hub, promoting collaboration across public safety, defence and law enforcement agencies in support of national security and crime prevention.</p>
          </section>
          <section aria-labelledby="our-mission">
            <h2 id="our-mission">Our Mission</h2>
            <p>To anticipate, identify and mitigate security threats by delivering actionable intelligence and situational awareness while upholding the civil rights and freedoms of every individual.</p>
          </section>
        </div>

        <section className={styles.row} aria-labelledby="operational-foundation">
          <h2 id="operational-foundation">Our Operational Foundation</h2>
          <div>
            <p>Our satellite teleport in Idu, Abuja, supports data distribution and satellite image acquisition across Nigeria and the African continent. The Strategic Operations Center combines satellite communication and geospatial intelligence tools to analyse security events and support operational response.</p>
            <p>The Intelligence Fusion Centre connects these capabilities with surveillance, human reporting, cyber monitoring and advanced analytics. A dedicated data centre supports the secure management of sensitive intelligence.</p>
          </div>
        </section>

        <section className={styles.row} aria-labelledby="working-together">
          <h2 id="working-together">Working Together for Stronger Security</h2>
          <p>We support shared intelligence and coordinated operations across government, defence and security institutions. Through operational demonstrations, knowledge exchange and training, we help strengthen the use of intelligence systems and collaboration in national and regional security.</p>
        </section>
      </div>

      <section data-navigation-surface="light" className={styles.closing} aria-labelledby="about-closing">
        <h2 id="about-closing">Turn information into operational understanding.</h2>
        <Link href="/capabilities" className={styles.cta}>Explore Our Capabilities<ArrowUpRight size={22} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
