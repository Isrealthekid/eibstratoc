import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import type { CSSProperties } from "react";
import styles from "./overview.module.css";

export const metadata: Metadata = {
  title: "Integrated Intelligence Services | EIB STRATOC",
  description: "Explore intelligence fusion, surveillance, GIS, satellite infrastructure, cybersecurity and operational support from EIB STRATOC.",
};

export default function ServicesPage() {
  const summaries = [
    "Many sources. One clear picture of what matters.",
    "Continuous visibility. Connected teams. Coordinated response.",
    "Connect location, activity and operational context.",
    "Satellite reach, connected to decisions on the ground.",
    "Secure infrastructure for sensitive intelligence.",
    "Intelligence that supports the people in the field.",
  ];
  const stages = [
    { title: "Collect", copy: "Bring together information from UAV surveillance, satellite imagery, video systems, field reports, intelligence sources and sensor networks." },
    { title: "Validate & Analyse", copy: "Correlate information, identify anomalies and assess threats, risks and operational conditions within the Intelligence Fusion Centre." },
    { title: "Build Situational Awareness", copy: "Present intelligence through GIS mapping, live dashboards and a shared command environment so teams can understand the operating picture." },
    { title: "Inform & Coordinate", copy: "Deliver intelligence reports and operational updates, share alerts and support coordination between decision makers and personnel in the field." },
  ];
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <Image src="/assets/services/intelligence-fusion.jpg" alt="" fill priority sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroLines} aria-hidden="true" />
        <div className={styles.heroContent}>
          <h1>Intelligence.<br />Built for action.</h1>
          <p className={styles.heroIntroduction}>EIB STRATOC combines surveillance, analysis, communications and operational support to help teams understand threats, protect assets and act on reliable information.</p>
          <Link href="/contact" className={styles.button}>Discuss your requirements<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </header>

      <div className={styles.light} data-navigation-surface="light">
        <section className={styles.approach} aria-labelledby="services-approach">
          <div className={styles.approachImage}><Image src="/assets/services/operational-support.jpg" alt="Team reviewing information and coordinating work" fill sizes="(max-width: 767px) 100vw, 35vw" /></div>
          <div className={styles.approachCopy}>
            <p className={styles.eyebrow}>Our approach</p>
            <h2 id="services-approach">Your mission.<br />One connected picture.</h2>
            <div className={styles.approachColumns}>
              <p>A pipeline corridor, a school network and an operational team face different security challenges. Understanding the people, assets and environment is the starting point for choosing the right intelligence support.</p>
              <p>We connect collection, analysis and communications around that operational need. Our services bring information into a shared picture, helping decision makers anticipate threats and coordinate action on the ground.</p>
            </div>
          </div>
        </section>

        <section id="our-services" className={styles.catalogue} aria-label="Our services">
          {services.map((service, index) => (
            <article className={styles.panel} style={{ "--panel-index": index } as CSSProperties} key={service.slug} aria-labelledby={`overview-${service.slug}`}>
              <div className={styles.panelBar}>
                {index === 0 && <span>Our services</span>}
                <span className={styles.rule} />
                <a href={`/services/${service.slug}`} aria-label={`Explore ${service.title}`}>{String(index + 1).padStart(2, "0")}</a>
              </div>
              <div className={styles.panelBody}>
                <div className={styles.panelCopy}>
                  <h2 id={`overview-${service.slug}`}><Link href={`/services/${service.slug}`}>{service.title}</Link></h2>
                  <Link href={`/services/${service.slug}`} className={styles.button}>Explore service<ArrowUpRight size={17} aria-hidden="true" /></Link>
                  <p>{summaries[index]}</p>
                </div>
                <Link href={`/services/${service.slug}`} className={styles.panelImage} aria-label={service.linkLabel} tabIndex={-1}>
                  <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 767px) 100vw, 45vw" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.process} aria-labelledby="services-process">
          <p className={styles.eyebrow}>Connected operations</p>
          <h2 id="services-process">How our services<br />work together.</h2>
          <ol>{stages.map((stage, index) => <li key={stage.title}><span className={styles.stageNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{stage.title}</h3><p>{stage.copy}</p></li>)}</ol>
        </section>
      </div>

      <section data-navigation-surface="light" className={styles.closing} aria-labelledby="services-closing">
        <p className={styles.eyebrow}>From information to action</p>
        <h2 id="services-closing">Connect the services<br />your mission requires.</h2>
        <Link href="/contact" className={styles.button}>Discuss your requirements<ArrowUpRight size={18} aria-hidden="true" /></Link>
        <a className={styles.email} href="mailto:info@eibstratoc.com">info@eibstratoc.com</a>
      </section>
    </main>
  );
}
