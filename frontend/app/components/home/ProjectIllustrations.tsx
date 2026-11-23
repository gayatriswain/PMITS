function Scene({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      {children}
    </svg>
  );
}

/**
 * All scene artwork is kept within y = 0-118 (above where the heading/sub
 * text always sits, since the card content uses flex justify-between) so it
 * never competes with the text regardless of card width at any breakpoint.
 */

export function VitalcareIllustration() {
  return (
    <Scene>
      <defs>
        <linearGradient id="vital-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c4a6e" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#vital-sky)" />
      {/* faint pulse line across the middle band */}
      <path
        d="M0 78 H150 l10 -16 10 24 8 -36 8 28 H400"
        fill="none"
        stroke="#7dd3fc"
        strokeOpacity="0.3"
        strokeWidth="2.5"
      />
      {/* doctor + patient, confined to the top band, centered */}
      <circle cx="235" cy="45" r="16" fill="#f1f5f9" />
      <path d="M204 112 q0-38 31-38 q31 0 31 38 Z" fill="#ffffff" />
      <path d="M219 82 q16 9 31 0 l4 10 q-19 11 -39 0 Z" fill="#0ea5e9" />
      <path d="M242 66 q10 4 10 15" fill="none" stroke="#0c4a6e" strokeWidth="3" strokeLinecap="round" />
      <circle cx="252" cy="82" r="4" fill="#0c4a6e" />

      <circle cx="185" cy="50" r="14" fill="#fde9d0" />
      <path d="M162 112 q0-32 23-32 q23 0 23 32 Z" fill="#e2e8f0" />
    </Scene>
  );
}

export function SkylineIllustration() {
  return (
    <Scene>
      <defs>
        <linearGradient id="skyline-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c1917" />
          <stop offset="100%" stopColor="#44403c" />
        </linearGradient>
        <radialGradient id="skyline-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="url(#skyline-sky)" />
      <circle cx="235" cy="45" r="55" fill="url(#skyline-sun)" />
      {/* skyline hanging in the top band only */}
      <rect x="140" y="0" width="24" height="95" fill="#292524" />
      <rect x="168" y="0" width="20" height="118" fill="#38342f" />
      <rect x="192" y="0" width="18" height="80" fill="#292524" />
      <rect x="214" y="0" width="24" height="118" fill="#4b4540" />
      <rect x="242" y="0" width="20" height="90" fill="#292524" />
      <rect x="266" y="0" width="18" height="70" fill="#38342f" />
      {/* lit windows on the tallest tower */}
      {Array.from({ length: 3 }).map((_, r) =>
        Array.from({ length: 2 }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={219 + c * 11}
            y={16 + r * 20}
            width="6"
            height="8"
            fill="#fb923c"
            opacity="0.6"
          />
        ))
      )}
      {/* crane */}
      <rect x="230" y="0" width="3" height="20" fill="#d6d3d1" />
      <rect x="210" y="0" width="45" height="3" fill="#d6d3d1" />
    </Scene>
  );
}

export function HavenlyIllustration() {
  return (
    <Scene>
      <defs>
        <linearGradient id="haven-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#451a03" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#haven-sky)" />
      {/* window with light, confined to the top band */}
      <rect x="150" y="10" width="100" height="95" rx="4" fill="#fed7aa" opacity="0.18" />
      <rect x="150" y="10" width="100" height="95" rx="4" fill="none" stroke="#fed7aa" strokeOpacity="0.4" strokeWidth="3" />
      <line x1="200" y1="10" x2="200" y2="105" stroke="#fed7aa" strokeOpacity="0.4" strokeWidth="3" />
      <line x1="150" y1="57" x2="250" y2="57" stroke="#fed7aa" strokeOpacity="0.4" strokeWidth="3" />
      {/* small potted plant beside the window, still within the top band */}
      <rect x="270" y="88" width="20" height="20" rx="3" fill="#c2410c" />
      <ellipse cx="280" cy="66" rx="7" ry="20" fill="#166534" opacity="0.85" />
      <ellipse cx="271" cy="76" rx="6" ry="16" fill="#15803d" opacity="0.85" />
      <ellipse cx="289" cy="76" rx="6" ry="16" fill="#15803d" opacity="0.85" />
    </Scene>
  );
}
