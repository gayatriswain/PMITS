"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "../shared/Container";
import { ArrowRight, BC, BrandRow, Icon, ScreenOverlay, ease, fadeUp, heading, useWidth, type IconName } from "./BigCommerceShared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IW = BC.office.w, IH = BC.office.h;
const LID_QUAD: [[number, number], [number, number], [number, number], [number, number]] = [[298, 600], [628, 582], [696, 832], [400, 836]];

const perks: { icon: IconName; title: string; sub: string }[] = [
  { icon: "bolt", title: "Quick Response", sub: "Within 24 hours" },
  { icon: "users", title: "Free Consultation", sub: "No commitment" },
  { icon: "shieldCheck", title: "Tailored Solutions", sub: "For your business" },
];

/* Placeholder brand names — replace with real client logos. */
const brands = [
  { name: "NORTHPEAK", style: "font-black tracking-wider text-lg" },
  { name: "CLAYMORE", style: "font-semibold tracking-[0.3em] text-base" },
  { name: "LUMEA", style: "font-extrabold text-xl" },
  { name: "Maple&Co", style: "font-bold text-lg" },
  { name: "ORBIT", style: "font-light tracking-[0.4em] text-lg" },
  { name: "◈ PAWSOME", style: "font-semibold tracking-wide text-lg" },
];

/** Quote form. `fill` stretches it to its parent's height (used on the photo's glass panel). */
function QuoteForm({ fill = false }: { fill?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [err, setErr] = useState<{ name?: string; email?: string; server?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n: typeof err = {};
    if (name.trim().length < 2) n.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim())) n.email = "Please enter a valid email.";
    setErr(n);
    if (Object.keys(n).length || status === "sending") return;
    setStatus("sending");
    // The leads API stores one free-text "idea" (10–500 chars), so the details are packed into it.
    const idea = [
      `Free BigCommerce quote request from ${name.trim()} (Hire BigCommerce Developers page)`,
      phone.trim() && `Phone: ${phone.trim()}`,
      message.trim(),
    ]
      .filter(Boolean)
      .join("\n")
      .slice(0, 500);
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, email: email.trim(), source: "hire-bigcommerce-developers", website }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (e2) {
      setErr({ server: e2 instanceof Error && e2.message !== "Failed to fetch" ? e2.message : "We couldn’t reach the server. Please try again." });
      setStatus("idle");
    }
  };

  const field = "flex items-center gap-3 rounded-xl border bg-white/90 px-4 transition focus-within:border-[#2348e6] focus-within:shadow-[0_0_0_3px_rgba(35,72,230,0.12)]";
  const input = "w-full bg-transparent py-3.5 text-sm text-[#0b1a4a] placeholder:text-slate-400 focus:outline-none xl:py-3 2xl:py-3.5";

  return (
    <div className={`relative flex flex-col rounded-[24px] border border-white/90 bg-white/85 p-7 shadow-[0_40px_80px_-40px_rgba(11,26,74,0.45)] backdrop-blur-xl xl:p-6 2xl:p-8 ${fill ? "flex-1" : ""}`}>
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex min-h-[330px] flex-1 flex-col items-center justify-center text-center">
            <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" aria-hidden>
              <motion.circle cx="40" cy="40" r="36" stroke="#2348e6" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
              <motion.path d="m25 41 10 10 20-22" stroke="#0d8f9a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.5 }} />
            </svg>
            <h3 className={`${heading.className} mt-5 text-2xl font-bold text-[#0b1a4a]`}>Thanks — we’re on it!</h3>
            <p className="mt-2 text-sm text-slate-600">Our BigCommerce team will reply within 24 hours.</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-5 text-sm font-semibold text-[#2348e6] hover:underline">Send another request</button>
          </motion.div>
        ) : (
          <motion.form key="f" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-1 flex-col">
            <span className="w-fit rounded-full border border-[#0d8f9a]/30 bg-[#0d8f9a]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0d8f9a]">Free consultation</span>
            <h3 className={`${heading.className} mt-4 text-[28px] font-bold leading-tight text-[#0b1a4a] xl:mt-3 xl:text-[25px] 2xl:mt-4 2xl:text-[32px]`}>
              Let’s Talk About
              <br />
              <span className="text-[#2348e6]">Your Goals</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Share a few details and our team will get back to you with the best solution for your business.</p>
            <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div className="mt-5 flex flex-1 flex-col gap-3">
              <label className="block">
                <span className="sr-only">Your name</span>
                <span className={`${field} ${err.name ? "border-rose-300" : "border-slate-200"}`}>
                  <Icon name="user" className="h-4 w-4 text-slate-400" />
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name *" autoComplete="name" className={input} />
                </span>
                {err.name && <span className="mt-1 block text-[11px] text-rose-500">{err.name}</span>}
              </label>
              <label className="block">
                <span className="sr-only">Your email address</span>
                <span className={`${field} ${err.email ? "border-rose-300" : "border-slate-200"}`}>
                  <Icon name="mail" className="h-4 w-4 text-slate-400" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email Address *" autoComplete="email" className={input} />
                </span>
                {err.email && <span className="mt-1 block text-[11px] text-rose-500">{err.email}</span>}
              </label>
              <label className="block">
                <span className="sr-only">Phone number (optional)</span>
                <span className={`${field} border-slate-200`}>
                  <Icon name="phone" className="h-4 w-4 text-slate-400" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number (optional)" autoComplete="tel" className={input} />
                </span>
              </label>
              <label className={`flex flex-col ${fill ? "flex-1" : ""}`}>
                <span className="sr-only">Tell us about your store (optional)</span>
                <span className={`${field} flex-1 items-start border-slate-200 pt-3.5`}>
                  <Icon name="docText" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={350}
                    rows={3}
                    placeholder="Tell us about your store or project (optional)"
                    className="h-full min-h-[72px] w-full resize-none xl:min-h-[56px] 2xl:min-h-[72px] bg-transparent pb-3 text-sm text-[#0b1a4a] placeholder:text-slate-400 focus:outline-none"
                  />
                </span>
              </label>
            </div>
            {err.server && <p className="mt-3 text-sm text-rose-600" role="alert">{err.server}</p>}
            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative mt-5 flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#2348e6] to-[#14b1a0] py-4 text-[15px] font-semibold text-white shadow-[0_16px_34px_-14px_rgba(35,72,230,0.8)] transition hover:-translate-y-0.5 disabled:opacity-70"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/25 transition-[left] duration-700 group-hover:left-[120%]" />
              {status === "sending" ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Sending…</>
              ) : (
                <>Get My Free Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
              )}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <Icon name="lock" className="h-3.5 w-3.5" /> Your information is safe with us.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCards() {
  const reduce = useReducedMotion();
  const cards = [
    { icon: "trend" as IconName, label: "More Traffic", value: "+320%", pos: "left-[37%] top-[19%]" },
    { icon: "chart" as IconName, label: "Higher Revenue", value: "+248%", pos: "left-[50.5%] top-[29%]" },
    { icon: "check" as IconName, label: "Stronger Brand", value: "★★★★★", pos: "left-[48.5%] top-[42%]" },
  ];
  return (
    <>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${IW} ${IH}`} fill="none" aria-hidden>
        <defs>
          <linearGradient id="bcRise" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#2348e6" stopOpacity="0" />
            <stop offset="0.5" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <motion.path
          d="M588 528 C 700 450, 800 350, 860 215"
          stroke="url(#bcRise)"
          strokeWidth="14"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }}
        />
        <motion.path d="M826 234 L870 168 L900 244 Z" fill="#14b8a6" initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.7 }} />
      </svg>
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 + i * 0.2, duration: 0.6, ease }}
          className={`absolute ${c.pos}`}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 3.4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            className="flex items-center gap-2.5 rounded-xl border border-white bg-white/85 px-3.5 py-2.5 shadow-[0_16px_30px_-16px_rgba(35,72,230,0.5)] backdrop-blur"
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${i === 2 ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-[#2348e6]"}`}>
              <Icon name={c.icon} className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[11px] text-slate-500">{c.label}</span>
              <span className={`block font-bold ${i === 2 ? "text-[11px] tracking-widest text-emerald-500" : `${heading.className} text-lg text-emerald-600`}`}>{c.value}</span>
            </span>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}

export default function BigCommerceContact() {
  const [coverRef, coverW] = useWidth<HTMLDivElement>();

  const copy = (
    <div className="max-w-[520px]">
      <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#2348e6]">
        <span className="h-px w-8 bg-[#2348e6]" /> <span>Let’s build your <span className="font-extrabold">success</span></span> <span className="h-px w-8 bg-[#2348e6]" />
      </motion.p>
      <motion.h2
        variants={fadeUp}
        custom={1}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`${heading.className} mt-5 text-[40px] font-bold leading-[1.05] tracking-tight text-[#0b1a4a] sm:text-[54px] xl:text-[clamp(50px,3.6vw,72px)]`}
      >
        Your Next Big
        <br />
        <span className="bg-gradient-to-r from-[#2348e6] via-[#1f8fd6] to-[#14b1a0] bg-clip-text text-transparent">Growth Story</span>
        <br />
        Starts Here.
      </motion.h2>
      <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-5 max-w-[420px] text-base leading-relaxed text-slate-600">
        Tell us a little about your goals, and we’ll create a custom solution to help you grow — faster.
      </motion.p>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        {perks.map((p, i) => (
          <motion.li key={p.title} variants={fadeUp} custom={2.5 + i * 0.4} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2348e6] shadow-sm"><Icon name={p.icon} className="h-4 w-4" /></span>
            <span className="text-[12px] leading-tight">
              <span className="block font-semibold text-[#0b1a4a]">{p.title}</span>
              <span className="text-slate-500">{p.sub}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id="bigcommerce-quote" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#eef4fc] to-white">
      {/* Desktop (xl): the section takes the photo's aspect ratio, so the whole image is always visible
          (no cover-cropping) and every overlay below stays on the same pixels of the art. */}
      <div className="relative hidden xl:block">
        <div className="relative w-full [container-type:inline-size]" style={{ aspectRatio: `${IW} / ${IH}` }}>
          <div ref={coverRef} className="absolute inset-0">
            <Image src={BC.office.src} alt="" fill sizes="100vw" className="object-cover" />
            {/* laptop lid + mug branding */}
            <ScreenOverlay imgW={IW} quad={LID_QUAD} boxW={360} boxH={240} scale={coverW}>
              <div className="flex h-full w-full flex-col items-center justify-center text-center text-slate-500/80">
                <p className={`${heading.className} text-[40px] font-semibold leading-none`}>ProManage</p>
                <p className="mt-2 text-[26px] tracking-wide">IT Solutions</p>
              </div>
            </ScreenOverlay>
            <p className="font-caveat absolute -rotate-[4deg] text-[1.05cqw] leading-[1.05] text-slate-700" style={{ left: `${(772 / IW) * 100}%`, top: `${(712 / IH) * 100}%` }}>
              Better
              <br />
              Ideas.
              <br />
              Bigger
              <br />
              Impact.
            </p>
            <StatCards />
            {/* glass panel spans x 1095–1555, y 100–715 of the photo: the form fills it (and may grow past it on short screens) */}
            <div className="absolute flex flex-col" style={{ left: `${(1093 / IW) * 100}%`, top: `${(100 / IH) * 100}%`, width: `${(464 / IW) * 100}%`, minHeight: `${(615 / IH) * 100}%` }}>
              <QuoteForm fill />
            </div>
            <svg viewBox="0 0 160 110" className="absolute w-[7.5%] text-[#2348e6]" style={{ left: `${(1575 / IW) * 100}%`, top: `${(75 / IH) * 100}%` }} aria-label="Let's grow together">
              <text x="10" y="30" className="font-caveat" fontSize="26" fill="currentColor" transform="rotate(-12 10 30)">Let’s</text>
              <text x="14" y="58" className="font-caveat" fontSize="26" fill="currentColor" transform="rotate(-12 14 58)">Grow</text>
              <text x="18" y="86" className="font-caveat" fontSize="26" fill="currentColor" transform="rotate(-12 18 86)">Together</text>
              <path d="M40 100 C 20 104, 8 98, 4 88" stroke="currentColor" strokeWidth="1.6" fill="none" />
            </svg>
          </div>
          {/* copy sits on the bright left part of the photo; pointer-events-none so the full-width wrapper never blocks the form */}
          <Container className="pointer-events-none absolute inset-x-0 top-[6.5%]">
            <div className="pointer-events-auto w-fit">{copy}</div>
          </Container>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="xl:hidden">
        <Container className="relative py-12">
          {copy}
          <div className="relative mt-8 overflow-hidden rounded-3xl">
            <Image src={BC.office.src} alt="" width={IW} height={IH} sizes="92vw" className="aspect-[16/10] h-auto w-full object-cover object-[28%_85%]" />
          </div>
          <div className="relative mx-auto -mt-10 max-w-[440px] px-2 sm:-mt-20">
            <QuoteForm />
          </div>
        </Container>
      </div>

      {/* trusted strip */}
      <Container className="relative pb-12 pt-8 xl:pt-14">
        <div className="flex flex-col items-center gap-6 border-t border-slate-200/70 pt-8 lg:flex-row lg:gap-10">
          <p className="shrink-0 text-center text-[11px] font-bold uppercase leading-relaxed tracking-[0.25em] text-slate-500 lg:border-r lg:border-slate-200 lg:pr-10 lg:text-left">
            Trusted by
            <br className="hidden lg:block" /> innovative brands
          </p>
          <BrandRow brands={brands} className="flex-1 lg:justify-between xl:!gap-x-6" />
          <p className="font-caveat shrink-0 -rotate-6 text-2xl leading-tight text-[#2348e6]">
            Real Businesses.
            <br />
            Real Growth.
          </p>
        </div>
      </Container>
    </section>
  );
}
