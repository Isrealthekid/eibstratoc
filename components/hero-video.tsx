"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      if (reduced.matches) element.pause();
      else void element.play().catch(() => {});
    };
    syncMotion();
    reduced.addEventListener("change", syncMotion);
    return () => {
      reduced.removeEventListener("change", syncMotion);
      element.pause();
    };
  }, []);

  return (
    <>
      <video
        ref={video}
        className="hero-video"
        src="https://bucket.eibstratoc.com/eib-storage/EibWebsitesMedia/%28E%20I%20B%29.mp4"
        poster="/assets/video/hero-poster.jpg"
        muted loop playsInline preload="metadata"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="hero-video-overlay" aria-hidden="true" />
      <button
        className="hero-video-toggle"
        type="button"
        aria-label={playing ? "Pause background video" : "Play background video"}
        onClick={() => {
          const element = video.current;
          if (!element) return;
          if (element.paused) void element.play().catch(() => {});
          else element.pause();
        }}
      >
        {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
      </button>
    </>
  );
}
