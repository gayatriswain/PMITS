"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { Anton, Caveat } from "next/font/google";
import Container from "../shared/Container";

const heavy = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const script = Caveat({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });

const EASE = [0.22, 1, 0.36, 1] as const;
const GREEN = "#1f7a3f";
const DEEP = "#0e4d2f";
const INK = "#0c1f1a";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PROJECT_TYPES = [
  "New Shopify store setup",
  "Theme customization",
  "Custom app / integration",
  "Store migration to Shopify",
  "Headless / Hydrogen build",
  "Something else",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08 * i, ease: EASE } }),
};

const ic = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-[18px] w-[18px]",
};

/* ------------------------------ Shopify logo (bag + wordmark) ------------------------------ */
function ShopifyLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 40 46" className="h-10 w-9" aria-hidden>
        <path d="M6 12.5L4 41l22 5 12-4.5L34 13z" fill="#95bf47" />
        <path d="M34 13l4 28.5-12 4.5V13z" fill="#5e8e3e" />
        <path d="M13 13c0-6 3-10 7-10s7 4 7 10" fill="none" stroke="#4a7a2c" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M23.5 22.5c-1-.8-2.3-1.2-3.6-1.2-2 0-3.3 1-3.3 2.5 0 3.5 7.5 2.5 7.5 7.2 0 2.6-2.2 4.2-5 4.2-1.7 0-3.3-.5-4.4-1.4" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
      <span className="text-[26px] font-extrabold tracking-[-0.04em]" style={{ color: INK }}>shopify</span>
    </div>
  );
}

/* ------------------------------ form ------------------------------ */
type Status = "idle" | "sending" | "success" | "error";

const fieldCls = "w-full bg-transparent py-3 pl-10 pr-3 text-[13px] text-[#0c1f1a] outline-none placeholder:text-slate-500";

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="group relative block rounded-lg border border-[#dfe7e1] bg-white transition-[border-color,box-shadow] focus-within:border-[#1f7a3f] focus-within:shadow-[0_0_0_3px_rgba(31,122,63,0.14)]">
      <span className="pointer-events-none absolute left-3.5 top-[15px] text-slate-500 transition-colors group-focus-within:text-[#1f7a3f]">{icon}</span>
      {children}
    </label>
  );
}

function ProposalForm({ inView }: { inView: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function fail(msg: string) {
    setStatus("error");
    setMessage(msg);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const name = get("name");
    const email = get("email");
    const type = get("type");
    const project = get("project");

    if (!name) return fail("Please tell us your name.");
    if (!EMAIL_RE.test(email)) return fail("Please enter a valid email address.");
    if (!type) return fail("Please choose a project type.");
    if (project.length < 5) return fail("Please add a few details about your project.");

    // The leads API stores one free-text "idea" (10–500 chars) plus the email.
    const idea = `Shopify proposal request — ${name}${get("business") ? ` (${get("business")})` : ""} · ${type} · ${project}`.slice(0, 500);

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, email, source: "hire-shopify-developers", website: get("website") }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      fail(err instanceof TypeError ? "We couldn't reach our server. Please try again or call us." : (err as Error).message);
    }
  }

  const sending = status === "sending";
  const rows = [
    <Field key="n" icon={<svg {...ic}><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c.5-3.5 3.3-5.5 7-5.5s6.5 2 7 5.5" /></svg>}>
      <input name="name" placeholder="Your Name *" autoComplete="name" className={fieldCls} />
    </Field>,
    <Field key="e" icon={<svg {...ic}><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="M4 7l8 6 8-6" /></svg>}>
      <input name="email" type="email" placeholder="Your Email *" autoComplete="email" className={fieldCls} />
    </Field>,
    <Field key="b" icon={<svg {...ic}><rect x="5" y="3.5" width="14" height="17" rx="1.5" /><path d="M9 8h2M13 8h2M9 12h2M13 12h2M10.5 20.5v-3h3v3" /></svg>}>
      <input name="business" placeholder="Business Name" autoComplete="organization" className={fieldCls} />
    </Field>,
    <Field key="t" icon={<svg {...ic}><path d="M6 3.5h8l4 4v13H6z" /><path d="M14 3.5v4h4M9 12.5h6M9 16h4" /></svg>}>
      <select name="type" defaultValue="" className={`${fieldCls} appearance-none`}>
        <option value="" disabled>Project Type *</option>
        {PROJECT_TYPES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3 top-[15px] h-4 w-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
    </Field>,
    <Field key="p" icon={<svg {...ic}><path d="M4 6.5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-6l-4 3.5v-3.5H6a2 2 0 01-2-2z" /><path d="M8.5 9.5h7M8.5 12.5h4" /></svg>}>
      <textarea name="project" rows={2} maxLength={300} placeholder="Tell us about your project *" className={`${fieldCls} resize-none`} />
    </Field>,
  ];

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* honeypot: real users never see this */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="space-y-2.5">
        {rows.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: EASE }}>
            {r}
          </motion.div>
        ))}
      </div>

      <motion.button
        type="submit"
        disabled={sending}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 1 }}
        className="group relative mt-4 flex h-12 w-full items-center justify-center gap-2.5 overflow-hidden rounded-full text-[14px] font-semibold text-white shadow-[0_16px_28px_-12px_rgba(14,77,47,0.9)] transition-transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70"
        style={{ background: `linear-gradient(180deg,#2a8a4a,${DEEP})` }}
      >
        <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative">{sending ? "Sending…" : "Get My Free Proposal"}</span>
        <svg viewBox="0 0 24 24" className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <line x1="4" y1="12" x2="20" y2="12" />
          <polyline points="14 6 20 12 14 18" />
        </svg>
      </motion.button>

      <p role="status" aria-live="polite" className={`mt-2 min-h-[1.25rem] text-center text-[12px] font-medium ${status === "error" ? "text-[#c0392b]" : "text-[#1f7a3f]"}`}>
        {status === "success" ? "Thank you! We'll send your proposal within 24 hours." : message}
      </p>
      <p className="mt-1 flex items-center justify-center gap-1.5 text-[10.5px] text-slate-500">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="#1f7a3f" aria-hidden><path d="M12 2l8 3v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V5l8-3zm-1 13l6-6-1.4-1.4L11 12.2 8.4 9.6 7 11l4 4z" /></svg>
        Your information is 100% secure and confidential.
      </p>
    </form>
  );
}

/* ------------------------------ section ------------------------------ */
export default function HireShopifyContact() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // observe the section itself: a fully clip-pathed element never counts as "in view"
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const show = reduce || inView;

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden bg-[#0f4d22] lg:min-h-[760px]">
      {/* full-bleed zipper scene (public/shopify-zipper-reveal.webp): white fabric left, green right.
          Positioned low so the zip pull stays in frame; the fabric "unzips" in from the top on scroll. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
        initial={false}
        animate={{ clipPath: show ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
        transition={{ duration: reduce ? 0 : 1.6, ease: EASE }}
      >
        <Image src="/shopify-zipper-reveal.webp" alt="" fill sizes="100vw" className="select-none object-cover" style={{ objectPosition: "50% 72%" }} />
        {/* soft glint travelling on the zip pull */}
        {!reduce && (
          <motion.span
            className="absolute left-[46%] top-[80%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(210,255,215,0.9),rgba(210,255,215,0)_68%)]"
            animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.2, 0.6] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        )}
      </motion.div>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[12%] hidden h-72 w-72 rounded-full bg-emerald-300/15 blur-3xl lg:block"
        animate={reduce ? undefined : { x: [0, -24, 0], y: [0, 18, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* banner version for tablets / phones */}
      <div aria-hidden className="relative h-[220px] overflow-hidden bg-white sm:h-[300px] lg:hidden">
        <Image src="/shopify-zipper-reveal.webp" alt="" fill sizes="100vw" className="select-none object-cover" style={{ objectPosition: "50% 75%" }} />
      </div>

      <Container className="relative max-w-[1240px]">
        <div className="grid items-center gap-10 pb-12 pt-10 lg:min-h-[760px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:py-14">
          {/* ------------------------------ left: message on the white fabric ------------------------------ */}
          <motion.div initial="hidden" animate={show ? "show" : "hidden"} className="relative z-20 max-w-[520px] lg:-mt-2">
            <motion.div variants={fadeUp} custom={0} className="hidden lg:block">
              <ShopifyLogo />
            </motion.div>
            <motion.p variants={fadeUp} custom={1} className="mt-3 hidden text-[10.5px] font-semibold uppercase tracking-[0.3em] text-slate-500 lg:block">
              Ideas into real stores
            </motion.p>

            <h2 className={`${heavy.className} mt-0 text-[54px] font-normal uppercase leading-[0.98] tracking-[0.005em] text-white sm:text-[64px] lg:mt-8 lg:text-[76px] lg:text-[#0c1f1a]`}>
              {[
                { t: "Unzip", c: "" },
                { t: "Possibilities.", c: "text-[#4cc26f] lg:text-[#1f7a3f]" },
                { t: "Build Success.", c: "" },
              ].map((l, i) => (
                <span key={l.t} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                  <motion.span
                    className={`block ${l.c}`}
                    variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: EASE } } }}
                  >
                    {l.t}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.span
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, delay: 0.6, ease: EASE } } }}
              className="mt-6 block h-[3px] w-14 origin-left rounded-full"
              style={{ background: GREEN }}
            />
            <motion.p variants={fadeUp} custom={5} className="mt-5 max-w-[330px] text-[15px] leading-relaxed text-white/85 lg:text-slate-700">
              Get a tailored Shopify solution
              <br />
              for your business.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={6}
              className={`${script.className} mt-12 hidden w-[170px] -rotate-[8deg] text-[25px] leading-[1.1] lg:block`}
              style={{ color: DEEP }}
            >
              Your
              <br />
              <span className="ml-3 inline-block">Ecommerce</span>
              <br />
              <span className="ml-8 inline-block">Growth Partner</span>
              <svg viewBox="0 0 150 14" className="mt-0.5 h-3 w-[150px]" fill="none" aria-hidden>
                <motion.path d="M2 9C40 2 90 12 148 4" stroke={GREEN} strokeWidth="1.6" strokeLinecap="round" initial={{ pathLength: 0 }} animate={show ? { pathLength: 1 } : {}} transition={{ duration: 1, delay: 1.3 }} />
              </svg>
            </motion.p>
          </motion.div>

          {/* ------------------------------ right: proposal card ------------------------------ */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="relative z-[5] mx-auto w-full max-w-[430px] lg:ml-auto lg:mr-6"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-3xl bg-[#f6f9f6] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.65)] sm:p-7"
            >
              <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                <span className="h-px w-5 bg-slate-400/70" />
                Get started today
              </p>
              <h3 className="mt-3 text-[30px] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[34px]" style={{ color: INK }}>
                Get My
                <br />
                <span style={{ color: DEEP }}>Free Proposal</span>
              </h3>
              <div className="mt-5">
                <ProposalForm inView={show} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
