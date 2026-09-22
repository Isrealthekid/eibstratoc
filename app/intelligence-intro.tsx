"use client";

import { useEffect, useRef } from "react";

const copy = "Nigeria's premier Intelligence, Surveillance and Strategic Operations Company. We deliver advanced intelligence and surveillance services tailored to government, defence, security, and private sector clients combining real time intelligence, geospatial technologies, satellite communications, cybersecurity, and mission support into one integrated capability. Our platforms are engineered to ensure safety, enhance operational efficiency, and support national security efforts across Nigeria and beyond.";
const words = copy.split(" ");

export default function IntelligenceIntro() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const spans = Array.from(element.querySelectorAll<HTMLElement>(".intelligence-word"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      spans.forEach((span, index) => {
        const reveal = window.innerHeight <= 700
          ? (window.innerHeight * 0.85 - span.getBoundingClientRect().top) / (window.innerHeight * 0.3)
          : (progress * 1.18 + 0.16 - index / words.length) / 0.16;
        const amount = motion.matches ? 1 : Math.max(0, Math.min(1, reveal));
        span.style.opacity = String(0.16 + amount * 0.84);
        span.style.filter = `blur(${(1 - amount) * 7}px)`;
      });
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <section ref={section} className="intelligence-intro" aria-label="About Stratoc">
      <div className="intelligence-stage">
        <p className="intelligence-copy">
          <span className="sr-only">{copy}</span>
          <span aria-hidden="true">
            {words.map((word, index) => (
              <span key={index}><span className="intelligence-word">{word}</span>{index < words.length - 1 ? " " : ""}</span>
            ))}
          </span>
        </p>
      </div>
    </section>
  );
}
