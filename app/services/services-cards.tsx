"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/services";
import { GlowingCard } from "@/components/ui/glowing-card";



function ServiceCard({ index }: { index: number }) {
  const service = services[index];
  const tilt = [0, 1.5, -1.8][index % 3];
  return (
    <article className="service-card-wrap" style={{ "--card-tilt": `${tilt}deg` } as CSSProperties}>
      <Link href={`/services/${service.slug}`} className="service-card" aria-label={service.linkLabel}>
        <GlowingCard className="service-card-surface">
        <div className="service-card-top"><span>Our services</span><span className="service-card-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span></div>
        <Image className="service-art service-blueprint" src={service.image} alt={service.imageAlt} width={768} height={768} sizes="(max-width: 767px) 86vw, 390px" loading={index < 2 ? "eager" : "lazy"} />
        <div className="service-card-copy"><h2>{service.title}</h2><p>{service.description}</p></div>
        <span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
        </GlowingCard>
      </Link>
    </article>
  );
}

export default function ServicesCards() {
  const section = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    const root = section.current!;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      root.classList.add("services-cinematic");
      const track = root.querySelector<HTMLElement>(".services-track")!;
      const stage = root.querySelector<HTMLElement>(".services-stage")!;
      const cards = Array.from(root.querySelectorAll<HTMLElement>(".service-card-wrap"));
      const progress = root.querySelector(".services-progress-fill");
      const nextSection = root.querySelector<HTMLElement>(".services-end")!;
      let snapTween: gsap.core.Tween | null = null;
      const width = () => stage.clientWidth;
      const cardWidth = () => cards[0].offsetWidth;
      const spacing = () => cardWidth() + width() * .065;
      const startX = (index: number) => width() * .37 + index * spacing();
      const centerX = () => (width() - cardWidth()) / 2;
      const centerY = () => (stage.clientHeight - cards[0].offsetHeight) / 2;
      const distance = () => startX(cards.length - 1) - centerX();
      const startY = (index: number) => centerY() + (startX(index) - centerX()) * .22;
      const updateAccess = () => cards.forEach((card) => {
        const x = Number(gsap.getProperty(card, "x"));
        card.inert = x + cardWidth() < 0 || x > width();
      });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: .85,
          invalidateOnRefresh: true,
        },
        onUpdate: updateAccess,
      });
      cards.forEach((card, index) => {
        timeline.fromTo(card,
          { x: () => startX(index), y: () => startY(index) },
          { x: () => startX(index) - distance(), y: () => startY(index) - distance() * .22, duration: 1, ease: "none" }, 0);
      });
      timeline.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none" }, 0);
      // The timeline ends exactly with the final card centered, with no exit leg.
      const snapForward = () => {
        const trigger = timeline.scrollTrigger;
        if (!trigger || trigger.progress < .999 || window.scrollY < trigger.start || window.scrollY > trigger.end + 2) return false;
        if (!snapTween?.isActive()) {
          timeline.progress(1);
          const previousScrollBehavior = document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = "auto";
          const restoreScrollBehavior = () => { document.documentElement.style.scrollBehavior = previousScrollBehavior; };
          snapTween = gsap.to(window, {
            scrollTo: { y: nextSection, autoKill: true },
            duration: 1.1,
            ease: "power2.inOut",
            onComplete: restoreScrollBehavior,
            onInterrupt: restoreScrollBehavior,
          });
        }
        return true;
      };
      const onWheel = (event: WheelEvent) => {
        if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
        if (event.deltaY < 0) { snapTween?.kill(); return; }
        if (event.deltaY > 0 && (snapTween?.isActive() || snapForward())) event.preventDefault();
        else if (event.deltaY > 0) {
          const trigger = timeline.scrollTrigger;
          const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
          // A large wheel gesture must stop at the centered card, not carry
          // the sticky stage offscreen before the next gesture can snap.
          if (trigger && window.scrollY >= trigger.start && window.scrollY < trigger.end && window.scrollY + delta >= trigger.end) {
            event.preventDefault();
            window.scrollTo({ top: trigger.end, behavior: "instant" });
          }
        }
      };
      const onKey = (event: KeyboardEvent) => {
        const target = event.target as HTMLElement;
        if (event.defaultPrevented || event.shiftKey || event.ctrlKey || event.metaKey || target.closest("input, textarea, select, button, a, [contenteditable]")) return;
        if (["ArrowDown", "PageDown", " "].includes(event.key) && snapForward()) event.preventDefault();
        if (["ArrowUp", "PageUp", "Home"].includes(event.key)) snapTween?.kill();
      };
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("keydown", onKey);
      updateAccess();
      ScrollTrigger.refresh();
      return () => {
        snapTween?.kill();
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("keydown", onKey);
        root.classList.remove("services-cinematic");
        cards.forEach((card) => { card.inert = false; });
      };
    }, root);
    return () => media.revert();
  }, []);
  return (
    <main className="services-page" ref={section}>
      <div className="services-track">
      <div className="services-stage">
      <div className="services-grid">
        <header className="services-intro"><p>OUR CAPABILITIES</p><h1>Intelligence <br />in action.</h1><span>Six capabilities.<br />One connected picture.</span><div className="services-scroll">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></div></header>
        {services.map((service, index) => <ServiceCard key={service.title} index={index} />)}
      </div>
      <div className="services-progress" aria-hidden="true"><span className="services-progress-fill" /></div>
      </div>
      </div>
      <section className="services-end" aria-labelledby="services-next-title">
        <span>FROM INFORMATION TO ACTION</span>
        <h2 id="services-next-title">Turn intelligence<br />into your next move.</h2>
        <Link href="/contact">Let’s connect <ArrowUpRight size={20} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}


