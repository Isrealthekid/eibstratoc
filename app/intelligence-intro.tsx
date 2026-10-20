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
    const animations: Animation[] = [];
    let started = false;
    const reveal = () => {
      if (started) return;
      started = true;
      observer.disconnect();
      spans.forEach((span, index) => {
        animations.push(span.animate(
          [
            { opacity: 0.16, filter: "blur(7px)" },
            { opacity: 1, filter: "blur(0px)" },
          ],
          {
            duration: 450,
            delay: index * (2500 - 450) / Math.max(1, spans.length - 1),
            easing: "ease-out",
            fill: "both",
          },
        ));
      });
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) reveal();
    }, { rootMargin: "0px 0px -15% 0px", threshold: 0 });
    const handleMotion = () => {
      if (!motion.matches) return;
      started = true;
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      spans.forEach((span) => {
        span.style.removeProperty("opacity");
        span.style.removeProperty("filter");
      });
    };
    if (motion.matches) {
      handleMotion();
    } else {
      spans.forEach((span) => {
        span.style.opacity = "0.16";
        span.style.filter = "blur(7px)";
      });
      observer.observe(element.querySelector(".intelligence-copy")!);
    }
    motion.addEventListener("change", handleMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      spans.forEach((span) => {
        span.style.removeProperty("opacity");
        span.style.removeProperty("filter");
      });
      motion.removeEventListener("change", handleMotion);
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
