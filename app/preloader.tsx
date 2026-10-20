"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const content = document.getElementById("site-content");
    if (!content) return;
    const wasInert = content.inert;
    content.inert = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A brief entrance animation: slow network assets never hold the page closed.
    const timeout = window.setTimeout(() => {
      content.inert = wasInert;
      setFinished(true);
    }, reduced ? 150 : 800);
    return () => {
      window.clearTimeout(timeout);
      content.inert = wasInert;
    };
  }, []);

  if (finished) return null;
  return (
    <div className="preloader" role="status" aria-label="Preparing website">
      <svg className="loading-ring" viewBox="0 0 64 64" aria-hidden="true">
        <circle className="loading-ring-track" cx="32" cy="32" r="27" />
        <circle className="loading-ring-progress" cx="32" cy="32" r="27" pathLength="100" />
      </svg>
    </div>
  );
}
