export default function ServiceIllustration({ slug }: { slug: string }) {
  const id = `halftone-${slug}`;
  const shapes: Record<string, React.ReactNode> = {
    "intelligent-surveillance": <><path d="M65 50h85l25 22-25 22H65z" /><circle cx="142" cy="72" r="15" /><path d="M106 94v22H75v14h45V94M180 52q24 20 0 40M194 40q38 32 0 64" fill="none" strokeWidth="5" /></>,
    "geospatial-intelligence": <><path d="m45 111 65-32 85 30-65 33zM45 91l65-32 85 30-65 33zM45 71l65-32 85 30-65 33z" /><path d="M141 43c0 15-21 33-21 33s-21-18-21-33a21 21 0 1 1 42 0Z" /><circle cx="120" cy="42" r="7" fill="#71849a" /></>,
    "cyber-defense-grid": <><path d="m120 22 48 19v37c0 29-25 49-48 62-23-13-48-33-48-62V41z" /><rect x="103" y="67" width="34" height="29" rx="5" /><path d="M109 67V55a11 11 0 0 1 22 0v12" fill="none" strokeWidth="5" /><circle cx="120" cy="80" r="3" fill="#52647c" /></>,
    "satellite-reconnaissance": <g transform="rotate(-25 120 80)"><path d="M96 55h48v50H96zM40 53h45v54H40zM155 53h45v54h-45z" /><path d="M62 53v54M40 80h45M177 53v54M155 80h45M85 80h11M144 80h11M120 55V39" fill="none" /><path d="M101 28q19 29 38 0Z" /><path d="M112 119q8 10 16 0M102 130q18 18 36 0" fill="none" strokeWidth="4" /></g>,
    "predictive-analytics": <><path d="M52 104h23v31H52zM91 80h23v55H91zM130 58h23v77h-23zM169 29h23v106h-23z" /><path d="m50 80 47-25 36 3 51-39" fill="none" strokeWidth="5" /><circle cx="50" cy="80" r="5" /><circle cx="97" cy="55" r="5" /><circle cx="133" cy="58" r="5" /></>,
    "command-control": <><path d="M65 41h110v67H65z" /><path d="M120 108v22M97 130h46M80 58h30v16H80zM124 58h35M124 70h35M80 89h79" fill="none" strokeWidth="4" /><path d="M65 75H41v40M175 75h24v40M120 41V23" fill="none" /><circle cx="41" cy="123" r="10" /><circle cx="199" cy="123" r="10" /><circle cx="120" cy="20" r="9" /></>,
  };
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-tone`} x1="0" y1="0" x2=".8" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#fff" /><stop offset=".45" stopColor="#ccc" /><stop offset="1" stopColor="#666" />
        </linearGradient>
        <mask id={`${id}-silhouette`} maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="160" style={{ maskType: "luminance" }}>
          <g fill={`url(#${id}-tone)`} stroke="#fff" strokeWidth="2" strokeLinejoin="round">{shapes[slug]}</g>
        </mask>
        <pattern id={`${id}-dots`} width="4" height="160" patternUnits="userSpaceOnUse">
          {Array.from({ length: 40 }, (_, row) => (
            <circle key={row} cx="2" cy={row * 4 + 2} r={1.7 - row / 40} fill="currentColor" />
          ))}
        </pattern>
      </defs>
      <rect width="240" height="160" fill={`url(#${id}-dots)`} mask={`url(#${id}-silhouette)`} />
    </svg>
  );
}
