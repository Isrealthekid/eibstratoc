"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import styles from "./projects-impact.module.css";

const projects = [
  {
    title: "AKK Pipeline & Hydro Test Operations",
    description: "Continuous day and night aerial surveillance, proactive monitoring and real-time intelligence support have contributed to the protection of the AKK Gas Pipeline corridor and hydro test pipeline activities.",
  },
  {
    title: "Mining & Economic Asset Protection",
    description: "Aerial intelligence and concession monitoring have supported the detection of illegal mining and law enforcement clearance operations, including arrests and the recovery of illegally mined materials.",
  },
  {
    title: "Security Agency & Field Support",
    description: "Live operational monitoring and intelligence sharing have supported early threat detection, the defence of operational camps and coordination between UAV operators, analysts and ground forces.",
  },
  {
    title: "Community Safety & Stability",
    description: "Intelligence-led surveillance has contributed to safer commuter movement, local community protection, increased farming activities and secure trading routes across multiple areas of responsibility.",
  },
];

export default function ProjectsImpact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLLIElement>("li"));
    const fallback = window.matchMedia("(max-width: 1023px), (max-height: 480px), (prefers-reduced-motion: reduce)");
    let frame = 0;

    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const update = () => {
      frame = 0;
      cards.forEach((card, index) => {
        const inner = card.firstElementChild as HTMLElement;
        const title = card.querySelector("h3")!;
        const description = card.querySelector("p")!;

        if (fallback.matches) {
          card.style.removeProperty("clip-path");
          inner.style.removeProperty("transform");
          title.style.removeProperty("clip-path");
          title.style.removeProperty("filter");
          description.style.removeProperty("clip-path");
          return;
        }

        const bounds = card.getBoundingClientRect();
        const progress = clamp((window.innerHeight - 130 - bounds.top) / Math.max(240, bounds.height - 30));
        const inset = 94 * (1 - progress);
        const direction = index % 2 === 0 ? -1 : 1;
        const titleReveal = clamp((progress - .25) / .75);
        const copyReveal = clamp((progress - .4) / .6);
        const exit = clamp((450 - bounds.bottom) / 300);

        card.style.clipPath = index % 2 === 0
          ? `inset(0 ${inset}% ${inset}% 0)`
          : `inset(0 0 ${inset}% ${inset}%)`;
        inner.style.transform = `translate(${direction * 70 * (1 - progress)}px, ${-70 * (1 - progress)}px) scale(${1 + .2 * (1 - progress)})`;
        title.style.clipPath = `inset(0 ${(1 - titleReveal) * 100}% 0 0)`;
        title.style.filter = `blur(${exit * 7}px)`;
        description.style.clipPath = `inset(0 ${(1 - copyReveal) * 100}% 0 0)`;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    fallback.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      fallback.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="projects-impact" data-navigation-surface="light" aria-labelledby="projects-impact-heading">
      <div className={styles.layout}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Intelligence in action</p>
          <h2 id="projects-impact-heading">Supporting the missions that protect national assets.</h2>
          <p className={styles.description}>Our operational work combines aerial surveillance, intelligence analysis and command support across strategic infrastructure and security environments.</p>
          <Link className={styles.cta} href="/projects">
            Explore projects &amp; impact
            <span className={styles.ctaIcon}><ArrowUpRight size={19} aria-hidden="true" /></span>
          </Link>
        </div>
        <ol className={styles.cards} aria-label="Projects and operational impact">
          {projects.map((project, index) => (
            <li className={styles.card} key={project.title}>
              <div className={styles.cardInner}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
