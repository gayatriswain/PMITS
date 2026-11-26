"use client";

import React, { useState } from "react";
import { submitEnquiry, goToThankYou } from "@/lib/forms";
import Honeypot from "@/components/cms/Honeypot";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { logos } from "./AgenticAiPlatform";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Icon = ({ d, className = "w-5 h-5" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d={d} />
  </svg>
);

const Sparkle = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2c.6 4.6 2.4 7.4 7 8-4.6.6-6.4 3.4-7 8-.6-4.6-2.4-7.4-7-8 4.6-.6 6.4-3.4 7-8Z" />
    <path d="M19 14c.3 2 1 3 3 3.3-2 .3-2.700 1.300-3 3.300-.3-2-1-3-3-3.300 2-.3 2.700-1.300 3-3.300Z" opacity="0.8" />
  </svg>
);

const D = {
  bolt: "M13 2 4 14h7l-1 8 9-12h-7Z",
  shield: "M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6l8-3ZM8.500 12l2.500 2.500L16 9.500",
  mail: "M3 6h18v12H3ZM3.500 7l8.500 6.500L20.500 7",
  chat: "M4 5h16v11H9l-5 4Z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  lock: "M6 11h12v9H6ZM8 11V8a4 4 0 0 1 8 0v3",
  users: "M16 20v-1.500a3.500 3.500 0 0 0-3.500-3.500h-5A3.500 3.500 0 0 0 4 18.500V20M10 11a3.500 3.500 0 1 0 0-7 3.500 3.500 0 0 0 0 7ZM20 20v-1.500a3.500 3.500 0 0 0-2.500-3.300",
  chart: "M3 17l5-5 4 4 8-9M15 7h5v5",
  clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
};

const points__cms = [
  { icon: D.bolt, title: "Smarter Operations", desc: "Automate. Optimize. Scale." },
  { icon: D.shield, title: "Real Business Impact", desc: "Measurable results that matter." },
];

const stats__cms = [
  { icon: D.users, value: "500+", label: "Businesses Empowered", bg: "#0f8a83" },
  { icon: D.chart, value: "90%+", label: "Increase in Productivity", bg: "#3b6bf0" },
  { icon: D.clock, value: "70%+", label: "Time Saved on Manual Tasks", bg: "#7c4dff" },
  { icon: D.shield, value: "99.9%", label: "Enterprise-Grade Reliability", bg: "#0e8a8a" },
];

export default function AgenticAiCTA() {
  const $t = useCmsText();
  const points = useCmsData("AgenticAiCTA__points", points__cms);
  const stats = useCmsData("AgenticAiCTA__stats", stats__cms);
  const [sent, setSent] = useState(false);

  const [hp, setHp] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const fd = new FormData(e.currentTarget);
    setSending(true);
    setError("");
    const r = await submitEnquiry("agentic-ai-cta", {
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
      service: "Custom Agentic AI Solution",
      hp,
    });
    setSending(false);
    if (r.ok) {
      setSent(true);
      goToThankYou("agentic-ai");
    }
    else setError(r.error);
  };

  return (
    <section id="contact" className="relative w-full bg-[linear-gradient(180deg,#f5f9fd_0%,#eef5fc_100%)] py-12 sm:py-16 font-sans overflow-hidden">
      <Container className="relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr_370px] xl:grid-cols-[490px_1fr_380px] gap-8 lg:gap-4 items-center">
          {/* ---------------- LEFT: CONTENT (EXPANDED WIDTH) ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-sky-200/80 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.12em] text-[#1b6fa8] uppercase shadow-sm">
              <Sparkle className="w-3.5 h-3.5" />
              {$t("AgenticAiCTA__t1", "Your advantage. Our intelligence.")}</span>
            <h2 className="text-h2 mt-6 font-black tracking-tight text-[#0b1f4a]">
              {$t("AgenticAiCTA__t2", "Ready to")}<br />
              {$t("AgenticAiCTA__t3", "Lead with ")}<span className="text-[#1b8fd6]">{$t("AgenticAiCTA__t4", "AI?")}</span>
            </h2>
            <div className="mt-5 w-12 h-[3.5px] rounded-full bg-[#1b8fd6]" />
            <p className="text-body mt-5 text-slate-600 max-w-[440px]">
              {rich($t("AgenticAiCTA__t5", "One conversation can unlock endless possibilities for your business."))}</p>

            <div className="relative mt-8 space-y-4 max-w-[440px]">
              <span className="absolute left-[-14px] top-5 bottom-5 w-px bg-sky-200" />
              {points.map((p) => (
                <div key={p.title} className="relative flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/50 transition-colors">
                  <span className="absolute left-[-17px] w-[5px] h-[5px] rounded-full bg-[#1b8fd6]" />
                  <span className="w-11 h-11 rounded-full bg-white border border-slate-100 shadow-[0_8px_20px_-10px_rgba(15,35,80,0.3)] text-[#0b1f4a] flex items-center justify-center shrink-0">
                    <Icon d={p.icon} className="w-[19px] h-[19px]" />
                  </span>
                  <div>
                    <div className="text-[14px] font-bold text-[#0b1f4a]">{p.title}</div>
                    <div className="text-[12px] text-slate-500">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ---------------- CENTER: AGENT WITH CIRCLE BEHIND ---------------- */}
          <motion.div
            className="relative h-[380px] sm:h-[440px] overflow-visible"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Circle behind the head: soft fill + rings */}
            <div className="absolute left-1/2 top-[190px] -translate-x-1/2 -translate-y-1/2 w-[330px] h-[330px] sm:w-[400px] sm:h-[400px] pointer-events-none">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(219,238,253,0.95)_0%,rgba(209,232,252,0.7)_60%,rgba(186,224,252,0.35)_100%)]" />
              <div className="absolute inset-0 rounded-full border border-sky-200/80" />
              <motion.div
                className="absolute -inset-5 rounded-full border border-sky-200/60"
                animate={{ scale: [1, 1.03, 1], opacity: [0.7, 0.3, 0.7] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute -inset-12 rounded-full border border-sky-100/80" />
              <span className="absolute left-[10%] top-[14%] w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_3px_rgba(56,189,248,0.5)]" />
            </div>

            {/* AI figure, bottom fades into the background */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[5] w-[360px] sm:w-[460px]"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={$t("AgenticAiCTA__t6", "/AI.webp")}
                alt={$t("AgenticAiCTA__t7", "ProManage AI agent")}
                width={1411}
                height={1115}
                priority
                sizes="(max-width: 768px) 360px, 460px"
                className="w-full h-auto max-w-none select-none [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]"
                style={{ filter: "drop-shadow(0 16px 26px rgba(11,31,74,0.1))" }}
              />
            </motion.div>
          </motion.div>

          {/* ---------------- RIGHT: FORM CARD ---------------- */}
          <motion.div
            className="relative z-10 rounded-3xl bg-white border border-slate-100 shadow-[0_24px_55px_-20px_rgba(15,35,80,0.22)] p-6 sm:p-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Right Floating Sparkle Badge */}
            <span className="absolute right-5 top-5 w-11 h-11 rounded-full bg-white shadow-[0_6px_20px_-4px_rgba(15,35,80,0.18)] border border-sky-100/60 text-[#1b8fd6] flex items-center justify-center">
              <Sparkle className="w-4 h-4" />
            </span>

            <h3 className="text-h5 font-black text-[#0b1f4a] pr-10">
              {$t("AgenticAiCTA__t8", "Let's build your")}<br />
              <span className="text-[#1b8fd6]">{$t("AgenticAiCTA__t9", "AI advantage.")}</span>
            </h3>
            <p className="text-caption mt-2.5 text-slate-500">{rich($t("AgenticAiCTA__t10", "Share your goal — we'll take it from there."))}</p>

            {sent ? (
              <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-6 text-center text-sm text-emerald-700 font-semibold">
                {$t("AgenticAiCTA__t11", "Thank you! Our team will reach out shortly.")}</div>
            ) : (
              <form onSubmit={onSubmit} className="relative mt-5 space-y-3">
                <Honeypot value={hp} onChange={setHp} />
                <label className="flex items-center gap-2.5 h-12 rounded-xl border border-slate-200/90 bg-white px-3.5 text-slate-400 focus-within:border-[#1b8fd6] focus-within:ring-2 focus-within:ring-sky-100 transition-all">
                  <Icon d={D.mail} className="w-4 h-4 shrink-0 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={$t("AgenticAiCTA__t12", "Work Email*")}
                    className="w-full bg-transparent text-[13px] text-[#0b1f4a] placeholder:text-slate-400 outline-none"
                  />
                </label>
                <label className="flex items-start gap-2.5 h-[92px] rounded-xl border border-slate-200/90 bg-white px-3.5 py-3 text-slate-400 focus-within:border-[#1b8fd6] focus-within:ring-2 focus-within:ring-sky-100 transition-all">
                  <Icon d={D.chat} className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                  <textarea
                    name="message"
                    placeholder={$t("AgenticAiCTA__t13", "What's your biggest challenge right now?")}
                    className="w-full h-full resize-none bg-transparent text-[13px] text-[#0b1f4a] placeholder:text-slate-400 outline-none"
                  />
                </label>
                {error && <p role="alert" className="text-caption text-rose-600">{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="disabled:opacity-70 group w-full h-12 rounded-full bg-[linear-gradient(90deg,#2563eb_0%,#1b8fd6_50%,#0ea5e9_100%)] text-white text-[13.5px] font-bold flex items-center justify-center gap-2 shadow-[0_12px_24px_-8px_rgba(37,99,235,0.6)] hover:brightness-105 active:scale-[0.99] transition cursor-pointer"
                >
                  {sending ? $t("AgenticAiCTA__t14", "Sending...") : $t("AgenticAiCTA__t15", "Get Expert Insights")}
                  <Icon d={D.arrow} className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}

            <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500">
              <Icon d={D.lock} className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {$t("AgenticAiCTA__t16", "Your information is safe with us. No spam. Ever.")}</div>
          </motion.div>
        </div>

        {/* ---------------- TRUSTED BY ---------------- */}
        <div className="mt-10 rounded-2xl bg-white/70 border border-slate-100 px-5 py-5 text-center">
          <div className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
            {$t("AgenticAiCTA__t17", "Trusted by innovative businesses worldwide")}</div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-4 items-center lg:divide-x divide-slate-200">
            {logos.map((l) => (
              <div key={l.name} className="flex items-center justify-center gap-2 text-[#0b2a4a] opacity-90">
                <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="currentColor">
                  <path d={l.mark} fillRule="evenodd" />
                </svg>
                <div className="text-left leading-none">
                  <div className={`text-[14px] font-extrabold tracking-wide ${l.serif ? "font-serif" : ""}`}>{l.name}</div>
                  <div className="mt-0.5 text-[6.5px] font-semibold tracking-[0.18em] text-slate-500">{l.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- STATS ---------------- */}
        <div className="mt-4 rounded-2xl bg-white/80 border border-slate-100 px-5 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x divide-slate-100">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 lg:px-5 first:lg:pl-0">
              <span className="w-11 h-11 rounded-full text-white flex items-center justify-center shrink-0" style={{ backgroundColor: s.bg }}>
                <Icon d={s.icon} className="w-5 h-5" />
              </span>
              <div>
                <div className="text-[22px] font-black leading-none" style={{ color: s.bg }}>{s.value}</div>
                <div className="mt-1 text-[10.5px] text-slate-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

