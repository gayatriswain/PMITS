"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";

const EASE = [0.22, 1, 0.36, 1] as const;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = "+1 (555) 123-4567";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 * i, ease: EASE },
  }),
};

const I = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FEATURES = [
  {
    title: "Strategic Partnership",
    text: "Aligned goals, shared success.",
    icon: (
      <svg {...I} className="h-6 w-6">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
        <path d="M12 12l7-7M17 3.5V7h3.5" />
      </svg>
    ),
  },
  {
    title: "Tailored Solutions",
    text: "Custom-built for your unique needs.",
    icon: (
      <svg {...I} className="h-6 w-6">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M17 14.2c2.4 0 4 1.7 4 4.3" />
      </svg>
    ),
  },
  {
    title: "Proven Results",
    text: "Data-driven impact you can trust.",
    icon: (
      <svg {...I} className="h-6 w-6">
        <path d="M12 2.5l8 3v6c0 4.8-3.3 8.4-8 10-4.7-1.6-8-5.2-8-10v-6l8-3z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
];

// Orbit: a thin ellipse around the archway; bubbles sit exactly on it (angle in degrees, y down)
const ORBIT_CX = 50;
const ORBIT_CY = 48;
const ORBIT_RX = 48;
const ORBIT_RY = 46;
const onRing = (deg: number) => ({
  left: `${ORBIT_CX + ORBIT_RX * Math.cos((deg * Math.PI) / 180)}%`,
  top: `${ORBIT_CY + ORBIT_RY * Math.sin((deg * Math.PI) / 180)}%`,
});

const ORBIT = [
  {
    angle: 222,
    delay: 0,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M5.2 6.5h13.6c1.8 0 3.2 1.4 3.2 3.2v3.1c0 1.8-1.4 3.2-3.2 3.2h-2.6c-.8 0-1.4-.4-1.8-1l-.5-.8a1.3 1.3 0 00-1.1-.6h-1.6c-.5 0-.9.2-1.1.6l-.5.8c-.4.6-1 1-1.8 1H5.2A3.2 3.2 0 012 12.8V9.7c0-1.8 1.4-3.2 3.2-3.2zm.9 2.2a1.4 1.4 0 00-1.4 1.4v2.4c0 .8.6 1.4 1.4 1.4h2.4c.8 0 1.4-.6 1.4-1.4v-2.4c0-.8-.6-1.4-1.4-1.4H6.1zm9.4 0a1.4 1.4 0 00-1.4 1.4v2.4c0 .8.6 1.4 1.4 1.4h2.4c.8 0 1.4-.6 1.4-1.4v-2.4c0-.8-.6-1.4-1.4-1.4h-2.4z" fillRule="evenodd" />
      </svg>
    ),
  },
  {
    angle: 172,
    delay: 0.6,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
        <path d="M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4l8-4.6z" />
        <path d="M4 7.4l8 4.6 8-4.6M12 12v9.2" />
        <circle cx="8" cy="9" r=".9" fill="currentColor" stroke="none" />
        <circle cx="16" cy="9" r=".9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    angle: 322,
    delay: 0.3,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <rect x="3.5" y="12.5" width="4.2" height="8" rx="1" />
        <rect x="9.9" y="3.5" width="4.2" height="17" rx="1" />
        <rect x="16.3" y="8.5" width="4.2" height="12" rx="1" />
      </svg>
    ),
  },
  {
    angle: 18,
    delay: 0.9,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M4 21V9.5L10 7v14H4zm8 0V3l8 3v15h-8z" opacity=".9" />
        <path d="M5.8 11.5h2.4v1.6H5.8zm0 3.2h2.4v1.6H5.8zm0 3.2h2.4v1.6H5.8zm8-9.6h1.6v1.6h-1.6zm3 0h1.6v1.6h-1.6zm-3 3.2h1.6v1.6h-1.6zm3 0h1.6v1.6h-1.6zm-3 3.2h1.6v1.6h-1.6zm3 0h1.6v1.6h-1.6z" fill="#fff" />
      </svg>
    ),
  },
];

// Simple wordmarks for the "trusted by" row
const BRANDS = [
  {
    name: "AUTOMAX",
    mark: (
      <svg {...I} className="h-5 w-5">
        <path d="M12 3L3 21h4l5-10 5 10h4L12 3z" />
      </svg>
    ),
  },
  {
    name: "BuildRight",
    mark: (
      <svg {...I} className="h-5 w-5">
        <path d="M5 4h8a4 4 0 010 8H5zM5 12h9a4 4 0 010 8H5z" />
      </svg>
    ),
  },
  {
    name: "Infratech",
    mark: (
      <svg {...I} className="h-5 w-5">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path d="M8 6h8M7 8l4 8M17 8l-4 8" />
      </svg>
    ),
  },
  { name: "NextGen", sub: "HEALTHCARE", mark: null },
  {
    name: "SmartSpace",
    mark: (
      <svg {...I} className="h-5 w-5">
        <path d="M4 6a3 3 0 013-3h10a3 3 0 010 6H7a3 3 0 000 6h10a3 3 0 010 6H7a3 3 0 01-3-3" />
      </svg>
    ),
  },
];

type Status = "idle" | "submitting" | "success" | "error";

function ConsultForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const clean = email.trim();
    if (!EMAIL_RE.test(clean)) {
      setStatus("error");
      setMessage("Please enter a valid work email.");
      return;
    }
    const honeypot = (new FormData(e.currentTarget).get("website") as string) ?? "";
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: "Consultation request from the Custom AR/VR Solutions page",
          email: clean,
          source: "custom-ar-vr-solution",
          website: honeypot,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof TypeError
          ? "We couldn't reach our server. Please try again or call us."
          : (err as Error).message,
      );
    }
  }

  return (
    <div className="w-full lg:max-w-[560px]">
      {status === "success" ? (
        <div
          role="status"
          className="flex items-center gap-3 rounded-xl border border-[#d9d9f5] bg-white px-5 py-4 text-sm font-semibold text-[#0f1535]"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#5b43e8] text-white">
            <svg {...I} strokeWidth={2.4} className="h-4 w-4">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          Thank you! We&apos;ll get back to you shortly.
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
          {/* Honeypot: hidden from real users */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <label className="relative flex-1">
            <span className="sr-only">Your work email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Your Work Email"
              autoComplete="email"
              aria-invalid={status === "error"}
              className={`h-12 w-full rounded-xl border bg-white/90 pl-4 pr-11 text-sm text-[#0f1535] outline-none transition placeholder:text-slate-500 focus:ring-4 ${
                status === "error"
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-[#e2e2f5] focus:border-[#5b43e8] focus:ring-[#5b43e8]/15"
              }`}
            />
            <svg
              {...I}
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3.5 7l8.5 6 8.5-6" />
            </svg>
          </label>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#6d4df0] to-[#4f46e5] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_-6px_rgba(91,67,232,0.55)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? "Sending..." : "Schedule a Consultation"}
            <span aria-hidden>→</span>
          </button>
        </form>
      )}
      <p role="alert" className="min-h-[1.25rem] pt-1.5 text-xs text-red-500">
        {status === "error" ? message : ""}
      </p>
      <p className="text-center text-[13px] text-slate-500 sm:text-left">
        Prefer to talk now? Call us at{" "}
        <a
          href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
          className="font-semibold text-[#5b43e8] hover:underline"
        >
          {PHONE}
        </a>
      </p>
    </div>
  );
}

export default function ArVrCTA() {
  return (
    <section
      id="contact-form"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#f4f5ff] via-[#f7f7fd] to-white pb-14 pt-16 sm:pt-20 lg:pb-20"
    >
      <Container className="relative">
        {/* Top: copy + archway artwork */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="relative z-[1]"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="block text-[11px] font-bold uppercase tracking-[0.28em] text-[#6d5ef5]"
            >
              Ready to make an impact?
            </motion.span>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-4 text-4xl font-black leading-[1.1] tracking-tight text-[#0f1535] sm:text-5xl lg:text-[52px]"
            >
              Let&apos;s build something that&apos;s real.{" "}
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] bg-clip-text text-transparent">
                Measurable. Remarkable.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-[15px]"
            >
              Ready to turn immersive ideas into real-world results? Partner with us to
              create experiences that drive engagement, efficiency and growth.
            </motion.p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  custom={3 + i}
                  className="flex items-start gap-3 rounded-2xl border border-white bg-white/70 p-4 shadow-[0_10px_30px_-18px_rgba(91,67,232,0.35)] backdrop-blur"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eeeafe] text-[#5b43e8]">
                    {f.icon}
                  </span>
                  <div>
                    <h3 className="text-[13.5px] font-bold leading-tight text-[#0f1535]">{f.title}</h3>
                    <p className="mt-1 text-[12px] leading-snug text-slate-500">{f.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Archway artwork with orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            {/* thin orbit ring, fading out towards the top and bottom */}
            <div
              aria-hidden
              style={{
                left: `${ORBIT_CX}%`,
                top: `${ORBIT_CY}%`,
                width: `${ORBIT_RX * 2}%`,
                height: `${ORBIT_RY * 2}%`,
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
              }}
              className="absolute hidden -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#d6d2f3] sm:block"
            />

            <Image
              src="/Futuristic Lavender Archway Atrium.webp"
              alt="Glowing archway opening onto a bright modern atrium"
              width={1367}
              height={1150}
              sizes="(min-width: 1024px) 520px, 90vw"
              className="relative h-auto w-full select-none"
            />

            {/* Text inside the archway opening */}
            <div className="absolute left-1/2 top-[34%] flex w-[34%] -translate-x-1/2 flex-col items-center text-center">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/80 text-[#5b43e8] shadow-md sm:h-11 sm:w-11">
                <svg {...I} className="h-5 w-5">
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
                </svg>
              </span>
              <p className="mt-2 text-[11px] font-bold leading-snug text-[#0f1535] sm:text-sm">
                Your Next
                <br />
                Success Story
                <br />
                Starts Here
              </p>
              <a
                href="#cta-form"
                aria-label="Get started"
                className="mt-3 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#7c5cf6] to-[#4f46e5] text-white shadow-[0_8px_20px_-4px_rgba(91,67,232,0.6)] transition hover:scale-105 sm:h-11 sm:w-11"
              >
                <span aria-hidden>→</span>
              </a>
            </div>

            {ORBIT.map((o, i) => (
              <span
                key={i}
                aria-hidden
                style={onRing(o.angle)}
                className="absolute hidden -translate-x-1/2 -translate-y-1/2 sm:block"
              >
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + i * 0.5, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
                  className="grid h-[54px] w-[54px] place-items-center rounded-full border border-[#dedaf7] bg-white text-[#5b43e8] shadow-[0_0_0_6px_rgba(255,255,255,0.55),0_12px_28px_-8px_rgba(91,67,232,0.45)]"
                >
                  {o.icon}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* CTA bar */}
        <motion.div
          id="cta-form"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-10 flex flex-col gap-6 rounded-[28px] border border-white bg-white/70 p-6 shadow-[0_30px_70px_-35px_rgba(91,67,232,0.45)] backdrop-blur lg:mt-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-8"
        >
          <div className="flex items-center gap-5 sm:gap-6">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#eeeafe] text-[#5b43e8] sm:h-20 sm:w-20">
              <svg {...I} className="h-8 w-8 sm:h-10 sm:w-10">
                <path d="M3 9.5C3 8.1 4.1 7 5.5 7h13C19.9 7 21 8.1 21 9.5v4c0 1.4-1.1 2.5-2.5 2.5h-3.2l-1.3-2h-4l-1.3 2H5.5C4.1 16 3 14.9 3 13.5v-4z" />
                <path d="M9 19.5c1 .7 2 1 3 1s2-.3 3-1" />
              </svg>
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#0f1535] sm:text-2xl">Ready to get started?</h3>
              <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-slate-600">
                Let&apos;s discuss how we can create immersive solutions that drive real impact
                for your business.
              </p>
            </div>
          </div>

          <ConsultForm />
        </motion.div>

        {/* Trusted by */}
        <div className="mt-10 text-center">
          <p className="text-xs text-slate-500">Trusted by forward-thinking brands across industries</p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-400">
            {BRANDS.map((b) => (
              <li key={b.name} className="flex items-center gap-2">
                {b.mark}
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[15px] font-bold tracking-tight">{b.name}</span>
                  {"sub" in b && b.sub ? (
                    <span className="mt-0.5 text-[8px] font-semibold tracking-[0.2em]">{b.sub}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
