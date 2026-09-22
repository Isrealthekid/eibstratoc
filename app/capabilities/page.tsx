import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StackingCards from "@/components/ui/stacking-card";
import TimelineBlock01 from "@/components/ui/timeline-01";
import { services } from "@/lib/services";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Integrated Capabilities | EIB STRATOC",
  description: "EIB STRATOC combines surveillance, analysis, communications and operational support to help teams understand threats, protect assets and act on reliable information.",
};

export default function CapabilitiesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Integrated Capabilities</p>
        <h1>From intelligence collection to coordinated response.</h1>
        <p className={styles.introduction}>{metadata.description}</p>
      </header>
      <div className={styles.content} data-navigation-surface="light">
        <section className={styles.cards} aria-labelledby="explore-capabilities">
          <h2 id="explore-capabilities">Explore Our Capabilities</h2>
          <StackingCards services={services} basePath="/capabilities" />
        </section>
        <section className={styles.stages} aria-labelledby="capability-stages">
          <h2 id="capability-stages">How Our Capabilities Work Together</h2>
          <TimelineBlock01 />
        </section>
      </div>
      <section data-navigation-surface="light" className={styles.closing} aria-labelledby="capabilities-closing">
        <h2 id="capabilities-closing">Connect the capabilities your mission requires.</h2>
        <Link className={styles.cta} href="/contact">Discuss Your Requirements<ArrowUpRight size={22} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
