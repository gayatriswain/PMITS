"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Clock3, Globe2, Mail, MapPinned, PhoneCall, ShieldCheck, Target, TrendingUp, User, Users } from "lucide-react";
import { Inner, LPill, LS, Panel, Stars, ease, heading } from "./LocalSeoShared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const POINTS = [
  { Icon: MapPinned, label: "Show up in Local Searches" },
  { Icon: PhoneCall, label: "Get More Calls & Visits" },
  { Icon: TrendingUp, label: "Grow Your Business" },
];

function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [honey, setHoney] = useState("");
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
    const idea = [`Local SEO strategy request from ${name.trim()} (Local SEO page)`, site.trim() && `Business / website: ${site.trim()}`].filter(Boolean).join("\n").slice(0, 500);
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, email: email.trim(), source: "local-seo", website: honey }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
      setName("");
      setEmail("");
      setSite("");
    } catch (e2) {
      setErr({ server: e2 instanceof Error && e2.message !== "Failed to fetch" ? e2.message : "We couldn’t reach the server. Please try again." });
      setStatus("idle");
    }
  };

  const field = "flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#0f766e] focus-within:shadow-[0_0_0_3px_rgba(15,118,110,.12)]";
  const input = "w-full bg-transparent py-3.5 text-[15px] text-[#0b1b33] outline-none placeholder:text-slate-400 2xl:py-4";

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" aria-hidden>
            <motion.circle cx="40" cy="40" r="36" stroke="#0f766e" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
            <motion.path d="m25 41 10 10 20-22" stroke="#14a39a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.5 }} />
          </svg>
          <p className={`${heading.className} mt-4 text-xl font-bold text-[#0b1b33]`}>Thanks — we’re on it!</p>
          <p className="mt-1 text-sm text-slate-600">Your Local SEO strategy will reach you within 24–48 hrs.</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm font-semibold text-[#0f766e] hover:underline">
            Send another request
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate className="space-y-3.5">
          <div>
            <label className={field}>
              <User className="h-5 w-5 shrink-0 text-slate-400" />
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" autoComplete="name" className={input} />
            </label>
            {err.name && <p className="mt-1 text-xs text-rose-600">{err.name}</p>}
          </div>
          <div>
            <label className={field}>
              <Mail className="h-5 w-5 shrink-0 text-slate-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work Email" autoComplete="email" className={input} />
            </label>
            {err.email && <p className="mt-1 text-xs text-rose-600">{err.email}</p>}
          </div>
          <label className={field}>
            <Globe2 className="h-5 w-5 shrink-0 text-slate-400" />
            <input value={site} onChange={(e) => setSite(e.target.value)} placeholder="Your Business / Website" className={input} />
          </label>
          <input type="text" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} className="hidden" aria-hidden />
          {err.server && <p className="text-xs text-rose-600">{err.server}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#0f766e] py-4 text-[16px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(15,118,110,.8)] transition hover:bg-[#0d6b64] disabled:opacity-60 2xl:text-[17px]"
          >
            <span className="ai-shine pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,.22)_50%,transparent_65%)]" aria-hidden />
            <span className="relative">{status === "sending" ? "Sending…" : "Get My Local SEO Strategy"}</span>
            <svg viewBox="0 0 24 24" className="relative h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 12h16M14 6l6 6-6 6" />
            </svg>
          </button>
          <p className="flex items-center justify-center gap-2 rounded-xl bg-teal-50/70 py-3 text-[13px] text-slate-600">
            <ShieldCheck className="h-4 w-4 text-[#0f766e]" /> No spam. No obligation. Just expert guidance.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default function LocalSeoContact() {
  return (
    <Panel id="local-seo-contact" inner="!bg-[#f6f8fa]">
      <Inner className="!max-w-[1500px] py-14 sm:py-16 lg:py-20 2xl:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] xl:grid-cols-[minmax(0,0.95fr)_minmax(0,0.55fr)_minmax(0,0.85fr)] xl:gap-4">
          {/* copy */}
          <div className="relative z-10">
            <LPill soft className="!normal-case !tracking-normal">Let&apos;s Get You Found Locally</LPill>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className={`${heading.className} mt-6 text-[clamp(32px,3vw,56px)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0b1b33]`}
            >
              Your Customers
              <br /> Are Searching.
              <span className="mt-2 block text-[0.72em] text-[#0f766e] xl:whitespace-nowrap">Let&apos;s Make Sure They Find You.</span>
            </motion.h2>
            <p className="mt-5 max-w-[520px] text-base leading-relaxed text-slate-600 2xl:text-[18px]">
              We help local businesses stand out in their neighborhood, get more calls, more visits, and more customers.
            </p>
            <div className="mt-7 grid max-w-[460px] grid-cols-3 gap-4">
              {POINTS.map(({ Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease }}
                  className="group"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-[#0f766e] transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="mt-2 block text-[14px] font-semibold leading-snug text-[#0b1b33]">{label}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease }}
              className="mt-7 inline-flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-[0_18px_40px_-28px_rgba(15,40,80,.5)]"
            >
              <Image src={LS.avatars} alt="Local business owners" width={135} height={45} className="h-10 w-auto" />
              <span>
                <span className="block text-[13px] text-slate-600">500+ Local Businesses Trust Us</span>
                <span className="flex items-center gap-1.5 text-[13px] text-slate-700">
                  <Stars className="h-3.5 w-3.5" /> <b>4.9</b> (120+ Reviews)
                </span>
              </span>
            </motion.div>
          </div>

          {/* map scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
            className="relative z-0 mx-auto hidden aspect-[1.156] w-full xl:-ml-[50%] xl:block xl:w-[150%] xl:max-w-none"
          >
            <Image src={LS.contactMap} alt="Map pin over a local shop" fill sizes="520px" className="object-contain [mask-image:radial-gradient(65%_65%_at_62%_55%,#000_60%,transparent)]" />
            <span className="ai-anim absolute left-[67%] top-[44%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#14a39a]/40" style={{ animation: "aiPing 2.6s ease-out infinite" }} />
            {[
              { Icon: BarChart3, a: "More Visibility", b: "in Local Searches", pos: "left-[66%] top-[12%]" },
              { Icon: Users, a: "More Customers", b: "More Growth", pos: "left-[64%] top-[66%]" },
            ].map(({ Icon, a, b, pos }, i) => (
              <div key={a} className={`ai-float absolute ${pos} flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-[0_14px_30px_-18px_rgba(15,40,80,.5)]`} style={{ animationDelay: `${i}s` }}>
                <Icon className="h-4 w-4 text-[#0f766e]" />
                <span className="text-[11px] leading-tight">
                  <span className="block font-semibold text-[#0b1b33]">{a}</span>
                  <span className="block text-slate-500">{b}</span>
                </span>
              </div>
            ))}
          </motion.div>

          {/* form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease }}
            className="relative z-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_34px_70px_-40px_rgba(15,40,80,.55)] sm:p-8"
          >
            <p className={`${heading.className} text-center text-2xl font-bold text-[#0b1b33] 2xl:text-[28px]`}>
              Ready to Be Found Locally?
            </p>
            <p className="mt-1 text-center text-[15px] text-slate-500">Get your custom Local SEO strategy today.</p>
            <div className="mt-6">
              <LeadForm />
            </div>
            <div className="mt-6 grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 pt-5 text-center">
              {[
                { I: ShieldCheck, v: "100%", l: "Confidential" },
                { I: Clock3, v: "24–48 hrs", l: "Strategy Delivery" },
                { I: Target, v: "Tailored", l: "For Your Business" },
              ].map(({ I, v, l }) => (
                <div key={l} className="flex flex-col items-center gap-1 px-1 sm:flex-row sm:justify-center sm:gap-2 sm:text-left">
                  <I className="h-6 w-6 shrink-0 text-[#0f766e]" strokeWidth={1.8} />
                  <span>
                    <span className="block text-[15px] font-bold text-[#0b1b33]">{v}</span>
                    <span className="block text-[11.5px] text-slate-500">{l}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Inner>
    </Panel>
  );
}
