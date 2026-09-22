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
  const previousBackground = useRef<string | null>(null);

  useLayoutEffect(() => {
    const element = page.current;
    if (!element) return;
    const viewport = element.parentElement!;
    const background = getComputedStyle(document.body).backgroundColor;
    const outgoingBackground = previousBackground.current ?? background;
    previousBackground.current = background;
    element.style.backgroundColor = background;
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    viewport.style.backgroundColor = outgoingBackground;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    // Use viewport coordinates, not the midpoint of a potentially long page.
    const rect = element.getBoundingClientRect();
    const centerX = window.innerWidth / 2 - rect.left;
    const centerY = window.innerHeight / 2 - rect.top;
    const radius = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 4;
    const center = `${centerX}px ${centerY}px`;
    const animation = element.animate(
      reduced.matches
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [{ clipPath: `circle(12px at ${center})` }, { clipPath: `circle(${radius}px at ${center})` }],
      { duration: reduced.matches ? 120 : 2500, easing: "cubic-bezier(.76, 0, .24, 1)" },
    );
    const keepCentered = () => {
      if (reduced.matches || animation.playState !== "running") return;
      const current = element.getBoundingClientRect();
      const position = `${window.innerWidth / 2 - current.left}px ${window.innerHeight / 2 - current.top}px`;
      (animation.effect as KeyframeEffect).setKeyframes([
        { clipPath: `circle(12px at ${position})` },
        { clipPath: `circle(${radius}px at ${position})` },
      ]);
    };
    const finishOnResize = () => animation.finish();
    const removeListeners = () => {
      window.removeEventListener("resize", finishOnResize);
      window.removeEventListener("scroll", keepCentered);
    };
    window.addEventListener("resize", finishOnResize);
    window.addEventListener("scroll", keepCentered, { passive: true });
    animation.finished.then(removeListeners, removeListeners);
    // No fill mode: the clip disappears on completion, exposing the entire
    // document and keeping the Services sticky scroll sequence functional.
    return () => {
      removeListeners();
      animation.cancel();
      viewport.style.removeProperty("background-color");
    };
  }, [pathname]);

  return (
    <>
      {initialPath === "/" && <Preloader />}
      <div id="site-content">
        <Navigation />
        <div className="page-transition-viewport">
          <div ref={page} className="page-transition-content">{children}</div>
        </div>
        <SiteFooter />
      </div>
    </>
  );
}
