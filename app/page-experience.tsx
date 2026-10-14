"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navigation from "./navigation";
import Preloader from "./preloader";
import SiteFooter from "@/components/site-footer";

export default function PageExperience({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // This layout survives client navigation. Returning Home never restarts
  // the cinematic loader; a fresh document opened at Home does.
  const [initialPath] = useState(pathname);
  const previousPath = useRef(pathname);
  const page = useRef<HTMLDivElement>(null);
  const transition = useRef<HTMLDivElement>(null);
  const leadingWhiteCircle = useRef<HTMLDivElement>(null);
  const blueCircle = useRef<HTMLDivElement>(null);
  const previousBackground = useRef<string | null>(null);

  useLayoutEffect(() => {
    const element = page.current;
    if (!element) return;
    const background = getComputedStyle(document.body).backgroundColor;
    const outgoingBackground = previousBackground.current ?? background;
    previousBackground.current = background;
    element.style.backgroundColor = background;
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      const fade = element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 120 });
      return () => fade.cancel();
    }

    const overlay = transition.current!;
    const radius = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 4;
    // All ripple layers share a viewport center that stays fixed while scrolling.
    const circles = [
      { clipPath: "circle(0px at 50% 50%)" },
      { clipPath: `circle(${radius}px at 50% 50%)` },
    ];
    const duration = 2500;
    const waveDelay = 500;
    const timing = { duration, easing: "cubic-bezier(.45, 0, .2, 1)", fill: "both" as const };
    overlay.style.backgroundColor = outgoingBackground;
    overlay.dataset.active = "true";
    const rippleAnimations = [leadingWhiteCircle, blueCircle].map((layer, index) =>
      layer.current!.animate(circles, { ...timing, delay: index * waveDelay }),
    );
    // The final ripple opens a hole through both color layers directly onto the page.
    const reveal = overlay.animate([
      { "--page-reveal-radius": "0px" },
      { "--page-reveal-radius": `${radius}px` },
    ], { ...timing, delay: 2 * waveDelay });
    const animations = [...rippleAnimations, reveal];
    const finishOnResize = () => animations.forEach((animation) => animation.finish());
    const reset = () => {
      window.removeEventListener("resize", finishOnResize);
      delete overlay.dataset.active;
      overlay.style.removeProperty("background-color");
      animations.forEach((animation) => animation.cancel());
    };
    window.addEventListener("resize", finishOnResize);
    reveal.finished.then(reset, () => {});
    // Always clear the layers, including when another navigation interrupts them.
    return reset;
  }, [pathname]);

  return (
    <>
      {initialPath === "/" && <Preloader />}
      <div id="site-content">
        <Navigation />
        <div className="page-transition-viewport">
          <div ref={page} className="page-transition-content">{children}</div>
        </div>
        <div ref={transition} className="page-transition-overlay" aria-hidden="true">
          <div ref={leadingWhiteCircle} className="page-transition-circle page-transition-circle-white" />
          <div ref={blueCircle} className="page-transition-circle page-transition-circle-blue" />
        </div>
        <SiteFooter />
      </div>
    </>
  );
}
