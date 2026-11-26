/* Brand-style marks used across the ASP.NET page (pure SVG, no CMS text). */
import type { ReactElement } from "react";

type P = { className?: string };

export function CSharpLogo({ className = "h-9 w-9" }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="tlCs" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9b6cf5" />
          <stop offset="1" stopColor="#5a2fc2" />
        </linearGradient>
      </defs>
      <path d="M24 3l18 10.4v21.2L24 45 6 34.6V13.4z" fill="url(#tlCs)" />
      <path d="M24 3l18 10.4L24 24 6 13.4z" fill="#fff" opacity="0.16" />
      <text x="22" y="31" textAnchor="middle" fontSize="17" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">C</text>
      <text x="32.5" y="24" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">#</text>
    </svg>
  );
}

export function AzureLogo({ className = "h-9 w-9" }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="tlAz1" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#5ec4ff" />
          <stop offset="1" stopColor="#1462d6" />
        </linearGradient>
        <linearGradient id="tlAz2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f8cf0" />
          <stop offset="1" stopColor="#0f4fb8" />
        </linearGradient>
      </defs>
      <path d="M18 5h11L12 43H2z" fill="url(#tlAz1)" />
      <path d="M29 5l17 38H18l7-12 9 6z" fill="url(#tlAz2)" />
    </svg>
  );
}

export function EfLogo({ className = "h-9 w-9" }: P) {
  // Entity Framework: stacked blue waves
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      {[14, 22, 30].map((y, i) => (
        <path key={y} d={`M4 ${y}c5-6 9-6 14 0s9 6 14 0 9-6 14 0`} stroke={["#2563eb", "#3b82f6", "#60a5fa"][i]} strokeWidth="4.2" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export function VisualStudioLogo({ className = "h-9 w-9" }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="tlVs" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b07cf7" />
          <stop offset="1" stopColor="#6227c8" />
        </linearGradient>
      </defs>
      <path d="M34 4l10 5v30l-10 5-18-16-8 6-4-2V16l4-2 8 6zM34 15l-10 9 10 9z M8 19v10l5-5z" fill="url(#tlVs)" fillRule="evenodd" />
    </svg>
  );
}

export function SqlServerLogo({ className = "h-9 w-9" }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <path d="M8 40C14 14 24 8 30 8c5 0 7 4 4 9-4 7-12 7-11 14 .6 4 6 4 11 0" stroke="#c9302c" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M12 36c5-13 12-20 26-22M16 41c6-11 12-16 24-18M10 30c6-8 14-12 24-12" stroke="#e05a4f" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
      <circle cx="36" cy="10" r="2.6" fill="#c9302c" />
    </svg>
  );
}

export function GitHubLogo({ className = "h-9 w-9" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#111"
        d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 007.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"
      />
    </svg>
  );
}

export function DotNetLogo({ className = "h-9 w-9" }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="tlNet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#4c1d95" />
        </linearGradient>
      </defs>
      <path d="M24 3l18 10.4v21.2L24 45 6 34.6V13.4z" fill="url(#tlNet)" />
      <text x="24" y="28.5" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">.NET</text>
    </svg>
  );
}

export function SqlDbLogo({ className = "h-9 w-9" }: P) {
  // database cylinder used next to the ".NET / SQL / Visual Studio" stack
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="tlDb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      {[30, 21, 12].map((y) => (
        <g key={y}>
          <path d={`M10 ${y}v6c0 3 6.3 5.5 14 5.5S38 ${y + 9} 38 ${y + 6}v-6`} fill="url(#tlDb)" />
          <ellipse cx="24" cy={y} rx="14" ry="5" fill="#7dd3fc" />
        </g>
      ))}
    </svg>
  );
}

/** Logo by technology name (falls back to a neutral badge with the initials). */
export function techLogo(name: string, className?: string): ReactElement {
  const n = name.toLowerCase();
  if (n.includes("visual studio")) return <VisualStudioLogo className={className} />;
  if (n.includes("github") || n.includes("git")) return <GitHubLogo className={className} />;
  if (n.includes("azure")) return <AzureLogo className={className} />;
  if (n.includes("entity") || n === "ef" || n.includes("ef core")) return <EfLogo className={className} />;
  if (n.includes("sql server")) return <SqlServerLogo className={className} />;
  if (n.includes("sql")) return <SqlDbLogo className={className} />;
  if (n.includes("c#")) return <CSharpLogo className={className} />;
  if (n.includes(".net") || n.includes("asp")) return <DotNetLogo className={className} />;
  const initials = name.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase() || "•";
  return (
    <span className={`${className ?? "h-9 w-9"} grid place-items-center rounded-lg bg-slate-800 text-[11px] font-bold text-white`} aria-hidden>
      {initials}
    </span>
  );
}
