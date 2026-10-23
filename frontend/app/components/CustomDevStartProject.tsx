"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "./Container";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const PHONE_DISPLAY = "+91 98765 43210";
const PHONE_TEL = "+919876543210";

const IDEA_MIN = 10;
const IDEA_MAX = 500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type IconProps = { size?: number; color?: string };
const base = (size: number, color: string, strokeWidth = 1.6) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const BoltIcon = ({ size = 12, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7Z" />
  </svg>
);
const ChatIcon = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 5h16v11H9l-5 4Z" />
    <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" strokeWidth={2.4} />
  </svg>
);
const DocIcon = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8Z" />
    <path d="M14 3v5h5M8.5 12.5h7M8.5 16h7" />
  </svg>
);
const ShieldLockIcon = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3 19.5 6V11.5C19.5 16.8 16 20 12 21.5 8 20 4.5 16.8 4.5 11.5V6Z" />
    <rect x="9.3" y="11" width="5.4" height="4.4" rx="0.8" />
    <path d="M10.4 11V9.7a1.6 1.6 0 0 1 3.2 0V11" />
  </svg>
);
const BulbIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.3 1 2.2h5.2c0-.9.4-1.7 1-2.2A6 6 0 0 0 12 3Z" />
  </svg>
);
const MailIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </svg>
);
const ArrowIcon = ({ size = 16, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);
const LockIcon = ({ size = 12, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <rect x="5" y="10" width="14" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);
const PhoneIcon = ({ size = 24, color = DEEP_TEAL }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1Z" />
  </svg>
);
const CalendarIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4M8 13h2M12 13h2M8 16.5h2" />
  </svg>
);
const HeartIcon = ({ size = 16, color = NAVY }: IconProps) => (
  <svg {...base(size, color, 1.8)}>
    <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
  </svg>
);
const CheckCircleIcon = ({ size = 44, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="m7.5 12.3 3 3 6-6.3" />
  </svg>
);

const FEATURES = [
  { Icon: ChatIcon, title: "Talk to Real Experts", desc: "No bots. No runaround. Just experienced people." },
  { Icon: DocIcon, title: "Get Clarity, Fast", desc: "We analyze your idea and share the right way forward." },
  { Icon: ShieldLockIcon, title: "Confidential & Safe", desc: "Your idea stays 100% secure — always." },
];

/* Hand-drawn style underline used under highlighted words */
function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none absolute left-0 w-full ${className}`} viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
      <path d="M2 8C40 3 90 2 198 6" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function CodeIllustration() {
  // Front face of the glass block: a rounded rect skewed into perspective.
  const FACE = "translate(98 150) skewY(-9)";
  return (
    <svg viewBox="0 0 300 380" className="mx-auto h-auto w-full max-w-[320px] overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="spGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
          <stop offset="60%" stopColor="#f3fbfa" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#d5f0ee" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="spLayer" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8fdfc" />
          <stop offset="100%" stopColor="#cfe9e7" />
        </linearGradient>
        <linearGradient id="spCode" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <linearGradient id="spCyl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5fd8e0" />
          <stop offset="50%" stopColor="#a5f3fc" />
          <stop offset="100%" stopColor="#22c5d6" />
        </linearGradient>
        <linearGradient id="spTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e6f6f8" />
        </linearGradient>
        <radialGradient id="spGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="spOrb" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d6e6ea" />
        </radialGradient>
        <filter id="spBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="spSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
        <filter id="spDrop" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#0f3b44" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Dashed flight path */}
      <path
        d="M62 296C22 272 18 232 46 214S78 176 58 156 72 104 126 98 196 86 222 66"
        fill="none"
        stroke={TEAL}
        strokeWidth="1.6"
        strokeDasharray="4 6"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Paper plane */}
      <motion.g
        animate={{ y: [0, -7, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "250px 50px" }}
      >
        <g transform="translate(206 14)" filter="url(#spDrop)">
          <path d="M0 46 92 0 58 70 42 52Z" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1" strokeLinejoin="round" />
          <path d="M42 52 92 0 30 48Z" fill="#5eead4" />
          <path d="M42 52 46 68 58 70Z" fill="#14b8a6" />
        </g>
      </motion.g>

      {/* Pedestal glow */}
      <ellipse cx="150" cy="330" rx="130" ry="34" fill="url(#spGlow)" filter="url(#spBlur)" />

      {/* Pedestal: base disc, cyan cylinder, top plate with ring */}
      <ellipse cx="150" cy="332" rx="112" ry="26" fill="#eef7f8" stroke="#d7e9ec" />
      <path d="M48 306v14a102 24 0 0 0 204 0v-14Z" fill="url(#spCyl)" />
      <ellipse cx="150" cy="306" rx="102" ry="24" fill="url(#spTop)" stroke="#bdeef3" />
      <ellipse cx="150" cy="304" rx="80" ry="17" fill="none" stroke="#67e8f9" strokeWidth="5" filter="url(#spSoft)" opacity="0.9" />
      <ellipse cx="150" cy="304" rx="80" ry="17" fill="#f0fdff" stroke="#22d3ee" strokeWidth="2" />

      {/* Orbs */}
      <circle cx="262" cy="282" r="6" fill="url(#spOrb)" filter="url(#spDrop)" />
      <circle cx="276" cy="300" r="3" fill="url(#spOrb)" />
      <circle cx="34" cy="300" r="4" fill="url(#spOrb)" />

      {/* Floating glass block */}
      <motion.ellipse
        cx="150"
        cy="302"
        rx="40"
        ry="6"
        fill="#0d9488"
        filter="url(#spSoft)"
        animate={{ opacity: [0.14, 0.07, 0.14], rx: [40, 32, 40] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.g animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <g filter="url(#spDrop)">
          {/* stacked back layers give the slab its depth */}
          {[3, 2, 1].map((i) => (
            <rect
              key={i}
              x={-i * 7}
              y={-i * 6}
              width="104"
              height="128"
              rx="14"
              transform={FACE}
              fill="url(#spLayer)"
              stroke="#ffffff"
              strokeWidth="1.2"
              opacity={1 - i * 0.12}
            />
          ))}
          {/* front face */}
          <rect x="0" y="0" width="104" height="128" rx="14" transform={FACE} fill="url(#spGlass)" stroke="#ffffff" strokeWidth="1.6" />
        </g>
        <g transform={FACE}>
          {/* faint code lines */}
          {[
            [12, 16, 38],
            [12, 24, 52],
            [18, 32, 30],
            [12, 102, 44],
            [18, 110, 28],
          ].map(([x, y, w]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={w} height="3" rx="1.5" fill="#99d5d0" opacity="0.45" />
          ))}
          {/* teal bottom edge tint */}
          <rect x="1" y="112" width="102" height="15" rx="7" fill="#5eead4" opacity="0.18" />
          {/* </> glyph */}
          <g fill="none" stroke="url(#spCode)" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M33 52 19 65 33 78" />
            <path d="M46 86 58 44" />
            <path d="M71 52 85 65 71 78" />
          </g>
        </g>
      </motion.g>
    </svg>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

function StartProjectForm() {
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({ idea: false, email: false });

  const ideaError =
    idea.trim().length < IDEA_MIN ? `Please add a little more detail (at least ${IDEA_MIN} characters).` : "";
  const emailError = !EMAIL_RE.test(email.trim()) ? "Please enter a valid email address." : "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ idea: true, email: true });
    if (ideaError || emailError) return;

    const honeypot = (new FormData(e.currentTarget).get("website") as string) ?? "";

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim(), email: email.trim(), source: "custom-development", website: honeypot }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setIdea("");
      setEmail("");
      setTouched({ idea: false, email: false });
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof TypeError
          ? "We couldn't reach our server. Please check your connection or call us."
          : (err as Error).message
      );
    }
  }

  const fieldBase =
    "w-full rounded-xl border bg-white px-4 text-[14px] text-slate-700 placeholder:text-slate-400 outline-none transition focus:ring-4";
  const fieldState = (bad: boolean) =>
    bad ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-teal-400 focus:ring-teal-100";

  return (
    <div className="relative rounded-[24px] border border-teal-100 bg-white/90 p-6 sm:p-8 shadow-[0_30px_70px_-35px_rgba(13,80,80,0.45)] backdrop-blur">
      <div className="text-center">
        <h3 className="font-serif text-[28px] sm:text-[32px] font-bold" style={{ color: NAVY }}>Start Your Project</h3>
        <p className="mt-1 font-serif italic text-[17px] text-slate-500">
          It all starts with a{" "}
          <span className="relative inline-block font-semibold" style={{ color: DEEP_TEAL }}>
            conversation.
            <Squiggle className="-bottom-1.5 h-2" />
          </span>
        </p>
      </div>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-teal-50/70 px-6 py-10 text-center"
          role="status"
        >
          <CheckCircleIcon />
          <p className="text-[18px] font-bold" style={{ color: NAVY }}>Thanks — we&apos;ve got your idea!</p>
          <p className="max-w-xs text-[14px] text-slate-500">Our team will review it and get back to you within one business day.</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-2 text-[13px] font-semibold underline underline-offset-4"
            style={{ color: DEEP_TEAL }}
          >
            Share another idea
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-7 flex flex-col gap-5">
          {/* Honeypot (hidden from people, catches bots) */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <div className="flex gap-3 sm:gap-4">
            <span className="mt-6 hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 border border-teal-100">
              <BulbIcon />
            </span>
            <div className="flex-1 min-w-0">
              <label htmlFor="sp-idea" className="mb-2 block text-[14px] font-semibold" style={{ color: NAVY }}>
                What are you looking to build?
              </label>
              <div className="relative">
                <textarea
                  id="sp-idea"
                  name="idea"
                  rows={4}
                  maxLength={IDEA_MAX}
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, idea: true }))}
                  placeholder="Describe your idea, goals, or any feature you have in mind..."
                  aria-invalid={touched.idea && !!ideaError}
                  aria-describedby="sp-idea-msg"
                  className={`${fieldBase} ${fieldState(touched.idea && !!ideaError)} resize-none py-3 pb-7`}
                />
                <span className="pointer-events-none absolute bottom-2.5 right-3 text-[11px] text-slate-400">
                  {idea.length} / {IDEA_MAX}
                </span>
              </div>
              <p id="sp-idea-msg" className="mt-1.5 min-h-[16px] text-[12px] text-red-500">
                {touched.idea && ideaError}
              </p>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <span className="mt-6 hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 border border-teal-100">
              <MailIcon />
            </span>
            <div className="flex-1 min-w-0">
              <label htmlFor="sp-email" className="mb-2 block text-[14px] font-semibold" style={{ color: NAVY }}>
                Your Work Email
              </label>
              <input
                id="sp-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                placeholder="you@company.com"
                aria-invalid={touched.email && !!emailError}
                aria-describedby="sp-email-msg"
                className={`${fieldBase} ${fieldState(touched.email && !!emailError)} h-12`}
              />
              <p id="sp-email-msg" className="mt-1.5 min-h-[16px] text-[12px] text-red-500">
                {touched.email && emailError}
              </p>
            </div>
          </div>

          {status === "error" && (
            <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-[13px] text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group relative flex h-14 w-full items-center justify-center rounded-full text-[16px] font-semibold text-white shadow-[0_18px_35px_-15px_rgba(13,148,136,0.8)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
            style={{ background: `linear-gradient(90deg, ${DEEP_TEAL}, ${TEAL})` }}
          >
            {status === "submitting" ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending...
              </span>
            ) : (
              "Let's Build Something Amazing"
            )}
            <span className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] text-slate-500">
            <span className="flex items-center gap-1.5"><LockIcon /> Free consultation</span>
            <span className="h-1 w-1 rounded-full bg-teal-500" />
            <span>No obligation</span>
            <span className="h-1 w-1 rounded-full bg-teal-500" />
            <span>100% confidential</span>
          </div>
        </form>
      )}
    </div>
  );
}

function ContactStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mt-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-8 rounded-[22px] border border-slate-100 bg-white px-6 py-6 sm:px-8 shadow-[0_20px_45px_-30px_rgba(15,40,60,0.35)]"
    >
      <p className="relative font-serif italic text-[22px] shrink-0" style={{ color: DEEP_TEAL }}>
        Prefer to talk?
        <Squiggle className="-bottom-2 h-2.5" />
      </p>

      <a href={`tel:${PHONE_TEL}`} className="group flex items-center gap-4 shrink-0">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 border border-teal-100 transition group-hover:scale-105">
          <PhoneIcon />
        </span>
        <span>
          <span className="block text-[14px] font-semibold" style={{ color: NAVY }}>We&apos;re just a call away.</span>
          <span className="block text-[12px] text-slate-500">Mon - Sat (10 AM - 7 PM IST)</span>
          <span className="block text-[20px] font-bold" style={{ color: DEEP_TEAL }}>{PHONE_DISPLAY}</span>
        </span>
      </a>

      <span className="hidden lg:block h-14 w-px bg-slate-200" />

      <div className="flex flex-1 items-center justify-center gap-4">
        <div className="flex -space-x-3">
          {["#f3d2b6", "#e2b896", "#d4a37e", "#f0c9a8"].map((c) => (
            <span key={c} className="h-11 w-11 rounded-full ring-2 ring-white" style={{ background: `linear-gradient(160deg, ${c}, #b88765)` }} />
          ))}
        </div>
        <p className="max-w-[190px] text-[13px] leading-snug" style={{ color: NAVY }}>
          Our team is ready to turn your idea into <span className="font-semibold" style={{ color: TEAL }}>reality.</span>
        </p>
      </div>

      <Link
        href="/contact"
        className="group flex items-center gap-4 rounded-2xl border border-teal-200 bg-teal-50/40 px-5 py-3.5 transition hover:border-teal-400 hover:bg-teal-50 shrink-0"
      >
        <CalendarIcon />
        <span>
          <span className="block text-[15px] font-semibold" style={{ color: DEEP_TEAL }}>Schedule a Call</span>
          <span className="block text-[11.5px] text-slate-500">Pick a time that works for you</span>
        </span>
        <span className="ml-2 transition-transform group-hover:translate-x-1"><ArrowIcon color={TEAL} /></span>
      </Link>
    </motion.div>
  );
}

export default function CustomDevStartProject() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f4f8f8] via-white to-[#eef6f5] py-12 sm:py-16 lg:py-20">
      {/* soft background waves */}
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full opacity-40" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d={`M0 ${220 + i * 4} C 400 ${120 + i * 6}, 900 ${300 - i * 4}, 1440 ${150 + i * 5}`} fill="none" stroke="#99f6e4" strokeWidth="0.8" />
        ))}
      </svg>

      <Container>
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.75fr_1.15fr] gap-10 lg:gap-6 items-center">
          {/* Left: heading + features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.1em] uppercase" style={{ color: DEEP_TEAL }}>
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-teal-200 bg-teal-50">
                <BoltIcon />
              </span>
              Ready to bring your idea to life?
            </span>
            <h2 className="mt-5 font-serif text-[34px] sm:text-[40px] lg:text-[44px] font-bold leading-[1.08]" style={{ color: NAVY }}>
              Your Idea.
              <br />
              Our Code.
              <br />
              <span style={{ color: TEAL }}>
                Real{" "}
                <span className="relative inline-block">
                  Impact.
                  <Squiggle className="-bottom-1 h-3" />
                </span>
              </span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-slate-500">
              Share your vision in a few words and we&apos;ll show you how we can{" "}
              <span className="font-semibold" style={{ color: TEAL }}>build it to scale.</span>
            </p>

            <ul className="mt-7 flex flex-col gap-5">
              {FEATURES.map((f) => (
                <li key={f.title} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-slate-100 shadow-[0_10px_25px_-12px_rgba(15,40,60,0.25)]">
                    <f.Icon />
                  </span>
                  <div>
                    <p className="text-[14.5px] font-bold" style={{ color: NAVY }}>{f.title}</p>
                    <p className="mt-0.5 max-w-[220px] text-[12.5px] leading-snug text-slate-500">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Center: illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="hidden lg:block"
          >
            <CodeIllustration />
          </motion.div>

          {/* Right: form */}
          <motion.div
            id="start-project"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            <StartProjectForm />
          </motion.div>
        </div>

        <ContactStrip />

        <p className="relative mt-8 flex items-center justify-center gap-2 text-[14px]" style={{ color: NAVY }}>
          <HeartIcon /> Long-term partner. Long-term success.
        </p>
      </Container>
    </section>
  );
}
