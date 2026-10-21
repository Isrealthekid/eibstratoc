import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects | EIB STRATOC",
  description: "Explore EIB STRATOC projects in surveillance, satellite imagery, fusion centers and critical infrastructure protection.",
};

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Our projects</p>
        <h1>Intelligence<br />in action.</h1>
        <p className={styles.introduction}>From continuous monitoring to dedicated fusion centers, explore our work in critical infrastructure protection and national security.</p>
        <a className={styles.heroLink} href="#mission-log">Explore our projects <span aria-hidden="true">↓</span></a>
      </header>

      <section id="mission-log" className={styles.catalogue} data-navigation-surface="light" aria-labelledby="mission-log-heading">
        <div className={styles.heading}>
          <div><p className={styles.eyebrow}>Selected projects</p><h2 id="mission-log-heading">Mission Log</h2></div>
          <p>Surveillance, satellite imagery and facilities that support security operations.</p>
        </div>
        <div className={styles.grid}>
          {projects.map((project) => {
            const service = services.find((service) => service.slug === project.service);
            return (
              <article className={styles.card} id={project.slug} key={project.slug} aria-labelledby={`${project.slug}-title`}>
                <div className={styles.image}>
                  <Image src={project.image} alt={`${project.title} — project image`} fill sizes="(max-width: 767px) 100vw, 50vw" />
                </div>
                <div className={styles.copy}>
                  <p className={styles.category}>{project.category}</p>
                  <h3 id={`${project.slug}-title`}>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                  <Link className={styles.link} href={service ? `/services/${service.slug}` : "/contact"}>
                    {service ? `Explore ${service.title}` : "Discuss a similar project"}<ArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="project-contact">
        <h2 id="project-contact">Have a project in mind?</h2>
        <p>Tell us what you need to protect or monitor. We can discuss the right support for your team.</p>
        <Link className={styles.button} href="/contact">Contact us<ArrowUpRight aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
