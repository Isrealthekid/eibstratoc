"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(1);
  const [previousProgress, setPreviousProgress] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current!;
    const content = document.getElementById("site-content")!;
    const wasInert = content.inert;
    content.inert = true;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controller = new AbortController();
    let cancelled = false;
    let frame = 0;
    let loaded = 0;
    let failed = false;
    const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const milestones = [1, randomBetween(8, 18), randomBetween(30, 44), randomBetween(57, 72), randomBetween(85, 95), 100];
    let milestoneIndex = 0;
    let lastUpdate = performance.now();
    const animations: Animation[] = [];
    const guard = (promise: Promise<unknown>) => new Promise<void>((resolve) => {
      let settled = false;
      const done = (error = false) => {
        if (settled) return;
        settled = true;
        controller.signal.removeEventListener("abort", abort);
        failed ||= error;
        loaded++;
        resolve();
      };
      const abort = () => done(true);
      controller.signal.addEventListener("abort", abort, { once: true });
      promise.then(() => done(), () => done(true));
    });
    // Track the browser-selected images in the actual initial viewport.
    const images = Array.from(document.querySelectorAll<HTMLImageElement>("[data-critical-viewport] img, [data-preloader-logo]"));
    const tasks = [...images.map((img) => guard(img.decode())), guard(document.fonts.ready), guard(new Promise<void>((resolve) => requestAnimationFrame(() => resolve())))];
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    const animate = (target: Element, keyframes: Keyframe[], duration: number, easing = "cubic-bezier(.76,0,.24,1)") => {
      const animation = target.animate(keyframes, { duration, fill: "forwards", easing });
      animations.push(animation);
      return animation.finished;
    };
    async function reveal() {
      clearTimeout(timeout);
      const counter = element.querySelector(".loading-counter")!;
      const logo = element.querySelector(".loading-logo")!;
      try {
        element.dataset.phase = "complete";
        await animate(counter, [{ opacity: 1 }, { opacity: 1 }], reduced ? 50 : 650);
        if (cancelled) return;
        element.dataset.phase = "number-exit";
        await animate(counter, [{ opacity: 1, transform: "translateX(0)" }, { opacity: 0, transform: reduced ? "none" : "translateX(.55em)" }], reduced ? 80 : 420, "ease-in-out");
        if (cancelled) return;
        element.dataset.phase = "logo";
        await animate(logo, [{ opacity: 0, offset: 0, easing: "ease" }, { opacity: 1, offset: .3 }, { opacity: 1, offset: .7, easing: "ease" }, { opacity: 0, offset: 1 }], reduced ? 200 : 2000, "linear");
        if (cancelled) return;
        element.dataset.phase = "opening";
        if (reduced) await animate(element, [{ opacity: 1 }, { opacity: 0 }], 120);
        else await Promise.all(Array.from(element.querySelectorAll(".loading-panel")).map((panel, index) => animate(panel, [{ transform: "translateY(0)" }, { transform: `translateY(${index ? "" : "-"}101%)` }], 2000)));
        if (!cancelled) { content.inert = wasInert; setFinished(true); }
      } catch {
        if (!cancelled) { content.inert = wasInert; setFinished(true); }
      }
    }
    const tick = (now: number) => {
      const ready = loaded === tasks.length;
      const ceiling = Math.min(failed ? 99 : 100, loaded / tasks.length * 100);
      const next = milestones[milestoneIndex + 1];
      // Keep each value readable; milestones only advance when actual asset
      // readiness permits them. No catch-up burst after returning to the tab.
      if (next !== undefined && next <= ceiling && now - lastUpdate >= (reduced ? 80 : 650)) {
        setPreviousProgress(milestones[milestoneIndex]);
        milestoneIndex++;
        lastUpdate = now;
        setProgress(next);
      }
      if (ready && (milestones[milestoneIndex] === 100 || (failed && milestoneIndex === milestones.length - 2))) {
        // Failed assets release the page without claiming 100% readiness.
        void reveal();
      } else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      controller.abort();
      animations.forEach((animation) => animation.cancel());
      content.inert = wasInert;
    };
  }, []);

  if (finished) return null;
  return (
    <div className="preloader" ref={root} data-phase="loading" aria-busy="true" aria-label="Preparing website">
      <div className="loading-panel panel-top" />
      <div className="loading-panel panel-bottom" />
      <div className="loading-content">
        <div className="loading-counter" role="progressbar" aria-label="Loading website" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          {previousProgress !== null && <span className="loading-number loading-number-out" key={`out-${progress}`} aria-hidden="true">{previousProgress}</span>}
          <span className={`loading-number${previousProgress !== null ? " loading-number-in" : ""}`} key={progress} aria-hidden="true">{progress}</span>
        </div>
        <Image data-preloader-logo className="loading-logo" src="/assets/logo.png" width={460} height={225} alt="" aria-hidden="true" priority unoptimized />
      </div>
    </div>
  );
}
