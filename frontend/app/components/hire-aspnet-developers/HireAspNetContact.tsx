"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, FileText, Lock, Mail, MessageSquareText, Phone, Rocket, Send, ShieldCheck, User, Zap, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";
import { submitEnquiry, goToThankYou } from "@/lib/forms";
import Honeypot from "@/components/cms/Honeypot";
import { AzureLogo, CSharpLogo, EfLogo, GitHubLogo, SqlServerLogo, VisualStudioLogo } from "./TechLogos";

const EASE = [0.22, 1, 0.36, 1] as const;
const TEAL = "#0d8a91";
const NAVY = "#0d1b3e";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08 * i, ease: EASE } }),
};

const PERK_ICONS: LucideIcon[] = [MessageSquareText, Zap, Rocket, ShieldCheck];
const perks__cms = [{ label: "Free Consultation" }, { label: "Quick Response" }, { label: "On-Time Delivery" }, { label: "Long-Term Partnership" }];

const logos__cms = [
  { name: "Mushrooms Culture", logo: "/aspnet/logo-mushrooms.png" },
  { name: "Dataways", logo: "/aspnet/logo-dataways.png" },
  { name: "SoftArt Technologies", logo: "/aspnet/logo-softart.png" },
  { name: "Maclead", logo: "/aspnet/logo-maclead.png" },
];

// Tech bubbles on the orbit around the badge: [angle in degrees, logo]
const ORBIT = [
  [-128, <CSharpLogo key="cs" className="h-8 w-8 sm:h-10 sm:w-10" />],
  [-52, <AzureLogo key="az" className="h-8 w-8 sm:h-10 sm:w-10" />],
  [180, <EfLogo key="ef" className="h-8 w-8 sm:h-10 sm:w-10" />],
  [0, <VisualStudioLogo key="vs" className="h-8 w-8 sm:h-10 sm:w-10" />],
  [140, <SqlServerLogo key="sql" className="h-8 w-8 sm:h-10 sm:w-10" />],
  [40, <GitHubLogo key="gh" className="h-7 w-7 sm:h-9 sm:w-9" />],
] as const;

function ContactForm() {
  const $t = useCmsText();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [hp, setHp] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError($t("HireAspNetContact__t1", "Please enter your name and a valid email."));
      return;
    }
    setSending(true);
    setError("");
    const r = await submitEnquiry("hire-aspnet-developers", {
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      message: form.message || undefined,
      service: "Hire ASP.NET Developers",
      hp,
    });
    setSending(false);
    if (r.ok) {
      setSent(true);
      goToThankYou("hire-aspnet");
    }
    else setError(r.error);
  };

  if (sent) {
    return (
      <div className="mt-6 rounded-xl bg-emerald-50 px-4 py-8 text-center">
        <p className="text-small font-semibold text-emerald-700">{$t("HireAspNetContact__t2", "Thank you! We've received your project details.")}</p>
        <p className="text-caption mt-1 text-emerald-700/80">{$t("HireAspNetContact__t3", "Our ASP.NET team will get back to you shortly.")}</p>
      </div>
    );
  }

  const field = "flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400 transition focus-within:border-[#0d8a91] focus-within:ring-2 focus-within:ring-[#0d8a91]/15";
  const input = "w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400";
  return (
    <form onSubmit={submit} noValidate className="relative mt-6 flex flex-col gap-3">
      <Honeypot value={hp} onChange={setHp} />
      <label className={field}>
        <User className="h-4 w-4 shrink-0" />
        <input className={input} value={form.name} onChange={set("name")} placeholder={$t("HireAspNetContact__t4", "Your Name")} autoComplete="name" required />
      </label>
      <label className={field}>
        <Mail className="h-4 w-4 shrink-0" />
        <input className={input} type="email" value={form.email} onChange={set("email")} placeholder={$t("HireAspNetContact__t5", "Work Email")} autoComplete="email" required />
      </label>
      <label className={field}>
        <Phone className="h-4 w-4 shrink-0" />
        <input className={input} type="tel" value={form.phone} onChange={set("phone")} placeholder={$t("HireAspNetContact__t6", "Phone Number")} autoComplete="tel" />
      </label>
      <label className={`${field} items-start`}>
        <FileText className="mt-0.5 h-4 w-4 shrink-0" />
        <textarea className={`${input} resize-y`} rows={3} value={form.message} onChange={set("message")} placeholder={$t("HireAspNetContact__t7", "Tell us about your project")} />
      </label>
      {error && (
        <p role="alert" className="text-caption font-semibold text-red-600">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="group mt-1 flex items-center justify-center gap-3 rounded-lg px-5 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_16px_30px_-16px_rgba(13,95,110,0.9)] transition-opacity hover:opacity-95 disabled:opacity-70"
        style={{ backgroundImage: "linear-gradient(90deg,#0b4a5c,#0d8a91)" }}
      >
        {sending ? $t("HireAspNetContact__t8", "Sending…") : $t("HireAspNetContact__t9", "Get a free consultation")}
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}

/** "Build beyond." - tech orbit, enquiry form (Admin → Leads + email alerts) and the "Your vision" banner. */
export default function HireAspNetContact() {
  const $t = useCmsText();
  const perks = useCmsData("HireAspNetContact__perks", perks__cms);
  const logos = useCmsData("HireAspNetContact__logos", logos__cms);
  const reduce = !!useReducedMotion();

  return (
    <section id="aspnet-contact" className="relative overflow-hidden bg-[linear-gradient(180deg,#f6f8fc_0%,#f2f5fa_100%)] pb-14 pt-14 sm:pb-20 sm:pt-16">
      <Container className="relative max-w-[1300px]">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)_380px] lg:gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)_400px]">
          {/* left */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.p variants={fadeUp} className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.22em]" style={{ color: TEAL }}>
              <i aria-hidden className="h-[2px] w-9 bg-[#0d8a91]/70" />
              {$t("HireAspNetContact__t10", "Let's build the future")}
            </motion.p>
            <h2 className="text-h1 font-heading mt-6 font-extrabold uppercase leading-[1] tracking-[-0.01em]" style={{ color: NAVY }}>
              <motion.span variants={fadeUp} custom={1} className="block">{$t("HireAspNetContact__t11", "Build")}</motion.span>
              <motion.span variants={fadeUp} custom={2} className="block bg-[linear-gradient(95deg,#0b6f78,#1596a5_60%,#0d8a91)] bg-clip-text pb-1 text-transparent">
                {$t("HireAspNetContact__t12", "Beyond.")}
              </motion.span>
            </h2>
            <motion.p variants={fadeUp} custom={3} className="text-body mt-6 max-w-[380px] text-slate-600">
              {rich($t("HireAspNetContact__t13", "Have a project in mind? Let's turn it into a powerful ASP.NET solution."))}
            </motion.p>
            <motion.svg variants={fadeUp} custom={4} aria-hidden viewBox="0 0 240 14" className="mt-4 h-3.5 w-60" fill="none">
              <path d="M2 11C60 3 150 1 238 6" stroke="url(#aspSwoosh)" strokeWidth="2.4" strokeLinecap="round" />
              <defs>
                <linearGradient id="aspSwoosh" x1="0" x2="1">
                  <stop offset="0" stopColor="#0d8a91" />
                  <stop offset="1" stopColor="#0d8a91" stopOpacity="0" />
                </linearGradient>
              </defs>
            </motion.svg>
            <motion.ul variants={fadeUp} custom={5} className="mt-9 grid max-w-[460px] grid-cols-4 divide-x divide-slate-200">
              {perks.map((pk, i) => {
                const Icon = PERK_ICONS[i % PERK_ICONS.length];
                return (
                  <li key={i} className="group flex flex-col items-center px-1.5 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-xl bg-white shadow-[0_12px_24px_-14px_rgba(13,27,62,0.4)] ring-1 ring-slate-100 transition-transform duration-300 group-hover:-translate-y-1" style={{ color: TEAL }}>
                      <Icon className="h-6 w-6" strokeWidth={1.7} />
                    </span>
                    <span className="mt-3 text-[12px] font-medium leading-tight text-slate-600">{pk.label}</span>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>

          {/* centre: orbit with tech bubbles */}
          <motion.div
            className="relative mx-auto w-full max-w-[560px]"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            <Image
              src={$t("HireAspNetContact__t14", "/aspnet/orbit-badge.webp")}
              alt={$t("HireAspNetContact__t15", "ASP.NET badge on a glowing podium with orbiting technologies")}
              width={1482}
              height={1061}
              sizes="(min-width: 1024px) 520px, 100vw"
              className="edge-fade h-auto w-full select-none mix-blend-multiply"
            />
            {ORBIT.map(([deg, logo], k) => {
              const rad = ((deg as number) * Math.PI) / 180;
              const left = 50 + 37 * Math.cos(rad);
              const top = 44 + 37 * (1482 / 1061) * Math.sin(rad) * 0.78;
              return (
                <motion.span
                  key={k}
                  className="absolute grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_14px_30px_-14px_rgba(13,27,62,0.45)] ring-1 ring-white sm:h-[70px] sm:w-[70px]"
                  style={{ left: `${left}%`, top: `${top}%` }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + k * 0.1, ease: EASE }}
                >
                  <motion.span
                    className="grid place-items-center"
                    animate={reduce ? undefined : { y: [0, -5, 0] }}
                    transition={{ duration: 4 + k * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {logo}
                  </motion.span>
                </motion.span>
              );
            })}
          </motion.div>

          {/* right: form card */}
          <motion.div
            id="aspnet-form"
            className="relative mx-auto mt-8 w-full max-w-[440px] rounded-[22px] border border-white bg-white/95 px-6 pb-6 pt-14 shadow-[0_30px_60px_-30px_rgba(13,27,62,0.4)] sm:px-8 lg:mt-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <span className="absolute left-1/2 top-0 grid h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[linear-gradient(135deg,#0b4a5c,#0d8a91)] text-white shadow-[0_0_0_8px_rgba(13,138,145,0.12),0_16px_30px_-12px_rgba(13,95,110,0.8)]">
              <Send className="h-8 w-8" strokeWidth={1.6} />
            </span>
            <h3 className="text-h5 font-heading text-center font-extrabold uppercase tracking-[0.02em]" style={{ color: NAVY }}>{$t("HireAspNetContact__t16", "Let's talk")}</h3>
            <p className="text-small mx-auto mt-2 max-w-[280px] text-center text-slate-500">
              {rich($t("HireAspNetContact__t17", "Share your project details and our team will get back to you shortly."))}
            </p>
            <ContactForm />
            <p className="mt-4 flex items-center justify-center gap-2 text-[11.5px] text-slate-500">
              <Lock className="h-3.5 w-3.5" style={{ color: TEAL }} />
              {$t("HireAspNetContact__t18", "We respect your privacy. Your information is safe.")}
            </p>
          </motion.div>
        </div>

        {/* "Your vision" banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-14 overflow-hidden rounded-[28px] bg-[#04111f] shadow-[0_34px_70px_-30px_rgba(4,17,31,0.85)]"
        >
          <div aria-hidden className="absolute inset-y-0 right-0 w-full lg:w-[52%]">
            <Image
              src={$t("HireAspNetContact__t19", "/aspnet/vision-city.webp")}
              alt=""
              fill
              sizes="(min-width: 1024px) 840px, 100vw"
              className="object-cover object-[60%_50%] opacity-40 [mask-image:linear-gradient(90deg,transparent_0%,#000_35%)] lg:opacity-100"
            />
          </div>
          <div className="relative grid gap-8 px-7 pb-6 pt-10 sm:px-12 lg:grid-cols-[auto_1fr] lg:gap-10 lg:pt-12">
            <h2 className="text-h3 font-heading font-extrabold uppercase leading-[1.08] text-white">
              <span className="block">
                {$t("HireAspNetContact__t20", "Your")} <span className="text-[#38c6cf]">{$t("HireAspNetContact__t21", "Vision.")}</span>
              </span>
              <span className="block">
                {$t("HireAspNetContact__t22", "Our")} <span className="text-[#38c6cf]">{$t("HireAspNetContact__t23", "Technology.")}</span>
              </span>
              <span className="block">
                {$t("HireAspNetContact__t24", "Real")} <span className="text-[#38c6cf]">{$t("HireAspNetContact__t25", "Impact.")}</span>
              </span>
            </h2>
            <div className="max-w-[330px] lg:border-l lg:border-white/20 lg:pl-10">
              <p className="text-small text-white/80">
                {rich($t("HireAspNetContact__t26", "Partner with ProManage IT Solutions and experience the power of ASP.NET done right."))}
              </p>
              <Link
                href={$t("HireAspNetContact__t27", "/contact")}
                className="group mt-6 inline-flex items-center gap-4 rounded-lg border border-[#38c6cf]/60 px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/10"
              >
                {$t("HireAspNetContact__t28", "Start your project")}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="relative flex flex-col gap-5 border-t border-white/5 px-7 pb-8 pt-4 sm:px-12 lg:flex-row lg:items-center lg:gap-10">
            <p className="flex shrink-0 items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.3em] text-white/85">
              <i aria-hidden className="hidden h-px w-12 bg-white/30 sm:block" />
              {$t("HireAspNetContact__t29", "Trusted by businesses worldwide")}
            </p>
            <ul className="flex flex-wrap items-center gap-x-2 gap-y-3 lg:divide-x lg:divide-white/15">
              {logos.map((l, i) => (
                <li key={i} className="px-4 first:pl-0">
                  {l.logo ? (
                    <Image
                      src={l.logo}
                      alt={l.name}
                      width={156}
                      height={66}
                      className="h-9 w-auto select-none opacity-90 transition-opacity hover:opacity-100 sm:h-10"
                      unoptimized={/^https?:\/\//.test(l.logo)}
                    />
                  ) : (
                    <span className="text-[15px] font-bold text-white/90">{l.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
