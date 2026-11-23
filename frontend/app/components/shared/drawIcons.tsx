/**
 * Self-drawing icon variants — each stroke path uses pathLength="1" so the
 * shared .draw-path keyframe (globals.css) can animate stroke-dashoffset
 * without needing each path's real pixel length. Continuous, decorative;
 * used wherever an icon should feel like it's being sketched in.
 */

export function DrawMonitorCodeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="4" width="19" height="13" rx="2" pathLength="1" className="draw-path" />
      <path
        d="M9 9.5 6.5 12l2.5 2.5M15 9.5 17.5 12l-2.5 2.5"
        pathLength="1"
        className="draw-path"
        style={{ animationDelay: "0.35s" }}
      />
      <path d="M8 21h8M12 17v4" pathLength="1" className="draw-path" style={{ animationDelay: "0.7s" }} />
    </svg>
  );
}

export function DrawSearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10.5" cy="10.5" r="7" pathLength="1" className="draw-path" />
      <path d="m20 20-4.3-4.3" pathLength="1" className="draw-path" style={{ animationDelay: "0.35s" }} />
    </svg>
  );
}

export function DrawCheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
      <path d="m20 6-11 11-5-5" pathLength="1" className="draw-path" />
    </svg>
  );
}

export function DrawBarChartUpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20V10M10 20V4M16 20v-7M22 4h-5v5" pathLength="1" className="draw-path" />
    </svg>
  );
}

export function DrawArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" pathLength="1" className="draw-path" />
    </svg>
  );
}

export function DrawUsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="8" r="3.5" pathLength="1" className="draw-path" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" pathLength="1" className="draw-path" style={{ animationDelay: "0.35s" }} />
      <path
        d="M16 7a3.5 3.5 0 0 1 0 7M20 20a6 6 0 0 0-4.2-5.7"
        pathLength="1"
        className="draw-path"
        style={{ animationDelay: "0.7s" }}
      />
    </svg>
  );
}

export function DrawBrowserCursorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="4" width="19" height="16" rx="2" pathLength="1" className="draw-path" />
      <path d="M2.5 8.5h19" pathLength="1" className="draw-path" style={{ animationDelay: "0.35s" }} />
      <path
        d="m12.5 11.5 5.5 2.2-2.1.8 2 2-1.1 1.1-2-2-.8 2.1Z"
        pathLength="1"
        className="draw-path"
        style={{ animationDelay: "0.7s" }}
      />
    </svg>
  );
}

export function DrawHeadsetIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" pathLength="1" className="draw-path" />
      <rect x="2" y="14" width="5" height="7" rx="1.5" pathLength="1" className="draw-path" style={{ animationDelay: "0.35s" }} />
      <rect x="17" y="14" width="5" height="7" rx="1.5" pathLength="1" className="draw-path" style={{ animationDelay: "0.55s" }} />
      <path d="M20 21a4 4 0 0 1-4 2h-2" pathLength="1" className="draw-path" style={{ animationDelay: "0.9s" }} />
    </svg>
  );
}

export function DrawChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
        pathLength="1"
        className="draw-path"
      />
    </svg>
  );
}

export function DrawTrendingUpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M23 6 13.5 15.5l-5-5L1 18" pathLength="1" className="draw-path" />
      <path d="M17 6h6v6" pathLength="1" className="draw-path" style={{ animationDelay: "0.35s" }} />
    </svg>
  );
}

export function DrawAwardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="9" r="6" pathLength="1" className="draw-path" />
      <path d="M8.5 14 7 22l5-3 5 3-1.5-8" pathLength="1" className="draw-path" style={{ animationDelay: "0.35s" }} />
    </svg>
  );
}
