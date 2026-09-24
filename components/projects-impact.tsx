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
    const writers = cards.map((card) => {
      const node = card.querySelector<HTMLElement>(`.${styles.bodyText}`)!;
      const text = node.dataset.fullText ?? "";
      return { node, text, characters: Array.from(text), frame: 0, started: false };
    });
    let frame = 0;

    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const resetWriter = (index: number, showText: boolean) => {
      const writer = writers[index];
      cancelAnimationFrame(writer.frame);
      writer.frame = 0;
      writer.started = false;
      writer.node.textContent = showText ? writer.text : "";
      cards[index].removeAttribute("data-typing");
    };
    const startWriter = (index: number) => {
      const writer = writers[index];
      if (writer.started) return;
      writer.started = true;
      writer.node.textContent = "";
      cards[index].dataset.typing = "true";
      const start = performance.now();
      const type = (now: number) => {
        const progress = clamp((now - start) / 2000);
        writer.node.textContent = writer.characters.slice(0, Math.floor(writer.characters.length * progress)).join("");
        if (progress < 1) {
          writer.frame = requestAnimationFrame(type);
        } else {
          writer.node.textContent = writer.text;
          writer.frame = 0;
          cards[index].removeAttribute("data-typing");
        }
      };
      writer.frame = requestAnimationFrame(type);
    };
    const update = () => {
      frame = 0;
      cards.forEach((card, index) => {
        const inner = card.firstElementChild as HTMLElement;
        const title = card.querySelector("h3")!;

        if (fallback.matches) {
          card.style.removeProperty("clip-path");
          inner.style.removeProperty("transform");
          title.style.removeProperty("clip-path");
          title.style.removeProperty("filter");
          card.removeAttribute("data-revealed");
          resetWriter(index, true);
          return;
        }

        const bounds = card.getBoundingClientRect();
        const progress = clamp((window.innerHeight - 130 - bounds.top) / Math.max(240, bounds.height - 30));
        const inset = 94 * (1 - progress);
        const direction = index % 2 === 0 ? -1 : 1;
        const titleReveal = clamp((progress - .25) / .75);

        card.style.clipPath = index % 2 === 0
          ? `inset(0 ${inset}% ${inset}% 0)`
          : `inset(0 0 ${inset}% ${inset}%)`;
        inner.style.transform = `translate(${direction * 70 * (1 - progress)}px, ${-70 * (1 - progress)}px) scale(${1 + .2 * (1 - progress)})`;
        title.style.clipPath = `inset(0 ${(1 - titleReveal) * 100}% 0 0)`;
        title.style.removeProperty("filter");
        if (progress >= 1) {
          card.dataset.revealed = "true";
          startWriter(index);
        } else {
          card.dataset.revealed = "false";
          if (writers[index].started || writers[index].node.textContent) resetWriter(index, false);
        }
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    fallback.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      writers.forEach((writer) => cancelAnimationFrame(writer.frame));
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
                <p>
                  <span className={styles.measureText} aria-hidden="true">{project.description}</span>
                  <span className={styles.bodyText} data-full-text={project.description} aria-hidden="true">{project.description}</span>
                  <span className={styles.srOnly}>{project.description}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
