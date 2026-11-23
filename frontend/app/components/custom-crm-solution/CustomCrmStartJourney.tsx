"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Container from "../shared/Container";

/* =========================================================================
   SMALL ICONS
   ========================================================================= */

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Icon = ({ d, className = "w-4 h-4" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <path d={d} />
  </svg>
);

const FIELD_ICONS = {
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0",
  building: "M5 21V4h9v17M14 9h5v12M2 21h20M8 8h2M8 12h2M8 16h2",
  mail: "M3 6h18v12H3ZM3.5 7l8.5 6.5L20.5 7",
  phone: "M6.6 2.8l2.2 3-1.4 1.5a12 12 0 0 0 6.3 6.3l1.5-1.4 3 2.2-1.5 2c-.6.8-1.7 1.2-2.7.9C10.6 18.7 5.3 13.4 3.7 7c-.3-1 .1-2.1.9-2.7Z",
  chat: "M4 5h16v11H9l-5 4Z",
} as const;

/* =========================================================================
   TRUSTED-BY LOGOS (simple marks drawn in code)
   ========================================================================= */

const NAVY = "#0b2447";

function LogoMark({ type }: { type: "hexG" | "cube" | "plus" | "hex" | "f" | "bars" }) {
  const common = { viewBox: "0 0 24 24", className: "w-7 h-7 flex-shrink-0" };
  switch (type) {
    case "hexG":
      return (
        <svg {...common}>
          <path d="M12 2 21 7v10l-9 5-9-5V7Z" fill={NAVY} />
          <path d="M15.5 10.2a4 4 0 1 0 .3 3.8H12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "cube":
      return (
        <svg {...common}>
          <path d="M12 2.5 21 7.5 12 12.5 3 7.5Z" fill="#1e3a8a" />
          <path d="M3 7.5 12 12.5v9L3 16.5Z" fill={NAVY} />
          <path d="M21 7.5v9l-9 5v-9Z" fill="#142a5c" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z" fill={NAVY} stroke={NAVY} strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="2.3" fill="#fff" />
        </svg>
      );
    case "hex":
      return (
        <svg {...common}>
          <path d="M12 2 21 7v10l-9 5-9-5V7Z" fill={NAVY} />
          <path d="M8 13l4-6 4 6-4 4Z" fill="#fff" />
        </svg>
      );
    case "f":
      return (
        <svg {...common}>
          <path d="M5 4h14v4.2h-9V11h7v4h-7v5H5Z" fill={NAVY} />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M3 21V10h5.5v11M9.5 21V3H15v18M16 21v-8h5v8" fill={NAVY} />
        </svg>
      );
  }
}

const logos = [
  { name: "Greenwoods", sub: "REALTY", type: "hexG" as const },
  { name: "Eduspark", sub: "LEARNING", type: "cube" as const },
  { name: "CarePlus", sub: "HEALTHCARE", type: "plus" as const },
  { name: "SwiftLogix", sub: "LOGISTICS", type: "hex" as const },
  { name: "FinEdge", sub: "SOLUTIONS", type: "f" as const },
  { name: "BuildWell", sub: "INDUSTRIES", type: "bars" as const },
];

/* =========================================================================
   FORM
   ========================================================================= */

const inputBase =
  "w-full rounded-xl bg-white border border-slate-200/90 text-[13px] text-[#0b2447] placeholder:text-slate-500 shadow-[0_2px_8px_-4px_rgba(15,35,51,0.12)] focus:outline-none focus:border-[#0f8a83] focus:ring-2 focus:ring-[#0f8a83]/15 transition";

function Field({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
        <Icon d={icon} className="w-[15px] h-[15px]" />
      </span>
      {children}
    </div>
  );
}

function ConsultationForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please enter your name and work email.");
      return;
    }
    setError("");
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1200);
  };

  const reset = () => {
    setForm({ name: "", company: "", email: "", phone: "", message: "" });
    setSent(false);
  };

  if (sent) {
    return (
      <div className="py-14 text-center flex flex-col items-center">
        <span className="w-14 h-14 rounded-full bg-[#e8f6f4] text-[#0f8a83] flex items-center justify-center">
          <Icon d="m5 12.5 4.5 4.5L19 7.5" className="w-7 h-7" />
        </span>
        <h4 className="mt-4 text-xl font-extrabold text-[#0b2447]">Thank you, {form.name}!</h4>
        <p className="mt-1.5 text-sm text-slate-600 max-w-xs">Our CRM experts will reach out within 24 hours to schedule your free consultation.</p>
        <button type="button" onClick={reset} className="mt-4 text-sm font-semibold text-[#0f8a83] underline cursor-pointer">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field icon={FIELD_ICONS.user}>
          <input type="text" placeholder="Full Name" value={form.name} onChange={set("name")} className={`${inputBase} pl-10 pr-3 py-3`} />
        </Field>
        <Field icon={FIELD_ICONS.building}>
          <input type="text" placeholder="Company Name" value={form.company} onChange={set("company")} className={`${inputBase} pl-10 pr-3 py-3`} />
        </Field>
        <Field icon={FIELD_ICONS.mail}>
          <input type="email" placeholder="Work Email" value={form.email} onChange={set("email")} className={`${inputBase} pl-10 pr-3 py-3`} />
        </Field>
        <Field icon={FIELD_ICONS.phone}>
          <input type="tel" placeholder="Phone Number" value={form.phone} onChange={set("phone")} className={`${inputBase} pl-10 pr-3 py-3`} />
        </Field>
      </div>

      <div className="relative mt-3">
        <span className="absolute left-3.5 top-3.5 text-slate-500 pointer-events-none">
          <Icon d={FIELD_ICONS.chat} className="w-[15px] h-[15px]" />
        </span>
        <textarea
          rows={3}
          placeholder="What do you want your CRM to solve?"
          value={form.message}
          onChange={set("message")}
          className={`${inputBase} pl-10 pr-3 py-3 resize-none`}
        />
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="group mt-5 w-full h-[52px] rounded-full bg-[linear-gradient(90deg,#0b6b70_0%,#12a39c_100%)] text-white text-[15px] font-semibold shadow-[0_14px_30px_-12px_rgba(15,138,131,0.7)] flex items-center justify-between pl-8 pr-2 hover:brightness-105 transition disabled:opacity-70 cursor-pointer"
      >
        <span className="flex-1 text-center">{sending ? "Sending..." : "Get My Free CRM Consultation"}</span>
        <span className="w-10 h-10 rounded-full bg-white text-[#0f8a83] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
          <Icon d="M5 12h14M13 6l6 6-6 6" className="w-4 h-4" />
        </span>
      </button>

      <ul className="mt-5 flex flex-wrap items-center justify-center gap-y-2 text-[12px] text-slate-600">
        {["Free Consultation", "No Obligation", "Expert Guidance"].map((t, i) => (
          <li key={t} className={`flex items-center gap-2 px-5 ${i > 0 ? "sm:border-l border-slate-200" : ""}`}>
            <span className="w-[18px] h-[18px] rounded-full border border-[#0f8a83] text-[#0f8a83] flex items-center justify-center">
              <Icon d="m6 12.5 4 4 8-9" className="w-3 h-3" />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </form>
  );
}

/* =========================================================================
   MAIN SECTION
   ========================================================================= */

const dots = "bg-[radial-gradient(circle,#8fd0cb_1.2px,transparent_1.6px)] [background-size:11px_11px]";

export default function CustomCrmStartJourney() {
  return (
    <section id="contact" className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#f3f8fa_0%,#fbfdfd_100%)] pt-4 sm:pt-6 pb-14 sm:pb-20 font-sans scroll-mt-20">
      {/* Dotted decoration */}
      <div className={`absolute -left-10 bottom-0 w-[360px] h-[200px] opacity-60 pointer-events-none ${dots} [mask-image:radial-gradient(ellipse_at_bottom_left,#000_10%,transparent_70%)]`} />
      <div className={`absolute -right-10 bottom-0 w-[360px] h-[200px] opacity-60 pointer-events-none ${dots} [mask-image:radial-gradient(ellipse_at_bottom_right,#000_10%,transparent_70%)]`} />

      <Container className="relative z-10">
        <div className="mx-auto w-[90%]">
          {/* ======================= MAIN PANEL ======================= */}
          <motion.div
            className="relative rounded-[28px] bg-white/90 border border-slate-100 shadow-[0_30px_70px_-35px_rgba(15,35,51,0.3)] overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={`absolute right-0 top-10 w-[140px] h-[240px] opacity-50 pointer-events-none ${dots} [mask-image:linear-gradient(to_left,#000,transparent)]`} />

            <div className="relative grid grid-cols-1 lg:grid-cols-[38%_62%] gap-8 lg:gap-4 items-center p-6 sm:p-10 lg:p-10 lg:pr-12">
              {/* Left: copy */}
              <div className="lg:pr-6">
                <div className="relative inline-block">
                  <h2 className="text-4xl sm:text-5xl lg:text-[44px] xl:text-[48px] font-extrabold tracking-tight leading-[1.1] text-[#0b2447]">
                    Start Your
                    <br />
                    <span className="text-[#0f8a83]">CRM Journey</span>
                  </h2>
                  {/* Hand-drawn underline + curly arrow towards the form */}
                  <svg className="hidden lg:block absolute left-0 top-full -mt-1 w-[130%] h-[84px] pointer-events-none overflow-visible" viewBox="0 0 420 84" fill="none" stroke="#0f8a83" strokeWidth="2" strokeLinecap="round">
                    <path d="M0 14C70 22 190 6 330 3" />
                    <path d="M338 6C372 22 352 54 372 58c14 3 18-12 6-14-9-1-7 14 18 22" />
                    <path d="m388 58 10 8-12 4" />
                  </svg>
                </div>
                <p className="mt-16 lg:mt-20 text-sm sm:text-[15px] text-slate-600 leading-relaxed max-w-xs">
                  Book a free consultation and let our experts show you how we can build the right CRM for your business.
                </p>
              </div>

              {/* Right: form card */}
              <div className="rounded-2xl bg-white border border-slate-100 shadow-[0_20px_50px_-30px_rgba(15,35,51,0.3)] p-5 sm:p-7">
                <ConsultationForm />
              </div>
            </div>

            {/* Trusted by */}
            <div className="relative border-t border-slate-100 bg-[#fafcfd] px-6 py-7 sm:px-10">
              <p className="text-center text-[11px] sm:text-xs font-bold tracking-[0.16em] text-[#0f8a83] uppercase">
                Trusted by businesses that grow with us
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-between gap-x-8 gap-y-5">
                {logos.map((l) => (
                  <div key={l.name} className="flex items-center gap-2.5 text-[#0b2447]">
                    <LogoMark type={l.type} />
                    <div className="leading-none">
                      <div className="text-[17px] font-extrabold tracking-tight">{l.name}</div>
                      <div className="mt-1 text-[8.5px] font-semibold tracking-[0.2em] text-slate-500">{l.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ======================= CLOSING MESSAGE ======================= */}
          <motion.div
            className="mt-12 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-10 h-10 rounded-full bg-[#0f8a83] text-white flex items-center justify-center shadow-[0_10px_22px_-8px_rgba(15,138,131,0.7)]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11Z" />
              </svg>
            </span>
            <p className="mt-5 text-2xl sm:text-[30px] font-medium text-[#0b2447] leading-snug">
              We can&apos;t wait to build something
              <br />
              <span className="relative inline-block mr-2">
                <span className="font-caveat italic font-bold text-[#0f8a83] text-[1.15em]">amazing</span>
                <svg className="absolute left-0 -bottom-1 w-full h-2.5" viewBox="0 0 120 10" preserveAspectRatio="none" fill="none" stroke="#0f8a83" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 7C30 2 60 9 118 3" />
                </svg>
              </span>{" "}
              together.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0b1220] text-white text-sm font-semibold hover:bg-[#0f6b6b] transition-colors"
            >
              Let&apos;s Talk
              <span aria-hidden>→</span>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
