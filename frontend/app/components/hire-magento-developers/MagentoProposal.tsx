"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "../shared/Container";
import CountUp from "../shared/CountUp";
import { ArrowRight, Emblem, Icon, ease, fadeUp, heading, useSeen, type IconName } from "../shared/MagentoShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";
import { goToThankYou } from "@/lib/forms";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MSG_MAX = 320;

const perks__cms: { title: string; text: string; icon: IconName }[] = [
  { title: "Quick Response", text: "Get a reply within 24 hours", icon: "bolt" },
  { title: "Tailored Solution", text: "A proposal based on your exact needs", icon: "docText" },
  { title: "From Magento Experts", text: "Discuss with experienced professionals", icon: "users" },
  { title: "No Obligation", text: "Just expert advice, absolutely free", icon: "rupee" },
];
const projectTypes__cms = [
  "New Magento Store",
  "Custom Development",
  "Theme & Frontend",
  "Extension Development",
  "Integrations",
  "Upgrade / Migration",
  "Performance Optimization",
  "Ongoing Support",
];
const stats__cms = [
  { to: 500, label: "Happy Clients" },
  { to: 250, label: "Projects Delivered" },
  { to: 10, label: "Years of Magento Experience" },
];
const proposalItems__cms = ["Project Understanding", "Recommended Approach", "Timeline & Cost Estimate", "Next Steps"];

type Form = { name: string; company: string; email: string; phone: string; type: string; message: string; website: string };
const empty: Form = { name: "", company: "", email: "", phone: "", type: "", message: "", website: "" };

function Field({
  icon,
  label,
  error,
  children,
}: {
  icon: IconName;
  label: string;
  error?: string;
  children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <span
        className={`group flex items-center gap-2.5 rounded-lg border bg-white px-3 transition-all focus-within:border-[#0d9488] focus-within:shadow-[0_0_0_3px_rgba(13,148,136,0.12)] ${
          error ? "border-rose-300" : "border-slate-200"
        }`}
      >
        <Icon name={icon} className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-focus-within:text-[#0d9488]" />
        {children}
      </span>
      {error && <span className="mt-1 block text-[11px] text-rose-500">{error}</span>}
    </label>
  );
}

/** "Your Custom Proposal" sheet tucked into a dark-green folder pocket, peeking out from behind the form (xl+). */
function ProposalPocket() {
  const $t = useCmsText();
  const proposalItems = useCmsData("MagentoProposal__proposalItems", proposalItems__cms);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeen(ref);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute right-[calc(100%-24px)] top-[250px] hidden h-[480px] w-[340px] xl:block">
      {/* folder back */}
      <motion.div
        initial={{ opacity: 0, rotate: 4 }}
        animate={seen ? { opacity: 1, rotate: 14 } : undefined}
        transition={{ duration: 1, ease }}
        className="absolute left-[56px] top-[18px] h-[410px] w-[250px] origin-bottom rounded-[56px_56px_28px_28px] bg-gradient-to-b from-[#235f49] via-[#174837] to-[#0b2a20] shadow-[0_40px_70px_-30px_rgba(11,42,32,0.85)]"
      >
        <span className="absolute inset-x-6 top-3 h-px bg-white/15" />
      </motion.div>

      {/* sheets rising out of the pocket */}
      <motion.div
        initial={reduce ? false : { y: 90, opacity: 0 }}
        animate={seen ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1.1, delay: 0.35, ease }}
        className="absolute inset-0"
      >
        <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0">
          <div className="absolute left-[92px] top-[72px] h-[300px] w-[205px] rounded-xl bg-gradient-to-br from-[#efeee9] to-[#dcdad3] shadow-md" style={{ transform: "rotate(13deg)" }} />
          <div
            className="absolute left-[64px] top-[58px] h-[330px] w-[218px] rounded-xl bg-gradient-to-br from-white via-[#fbfbf9] to-[#ecebe6] p-6 shadow-[0_24px_40px_-18px_rgba(0,0,0,0.35)]"
            style={{ transform: "rotate(9deg)" }}
          >
            <Emblem sizes="48px" className="w-[42px]" />
            <p className={`text-body ${heading.className} mt-5 font-semibold text-[#111]`}>
              {rich($t("MagentoProposal__t1", "Your"))}<br />
              {rich($t("MagentoProposal__t2", "Custom Proposal"))}</p>
            <ul className="mt-5 space-y-2.5">
              {proposalItems.map((t, k) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -6 }}
                  animate={seen ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: 1.1 + k * 0.15 }}
                  className="flex items-center gap-2 whitespace-nowrap text-[11.5px] text-slate-700"
                >
                  <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#173f31] text-white">
                    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="m5 12 5 5 9-10" /></svg>
                  </span>
                  {t}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* white curved pocket lip in front */}
      <svg className="absolute bottom-0 left-0 h-[220px] w-[340px] drop-shadow-[0_-14px_22px_rgba(0,0,0,0.12)] [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%),linear-gradient(to_right,transparent_0%,black_14%)] [mask-composite:intersect]" viewBox="0 0 340 220" fill="none">
        <defs>
          <linearGradient id="magLip" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.6" stopColor="#f6f5f1" />
            <stop offset="1" stopColor="#e6e3dc" />
          </linearGradient>
        </defs>
        <path d="M0 40 C 70 90, 150 150, 340 128 V220 H0 Z" fill="url(#magLip)" />
        <path d="M0 40 C 70 90, 150 150, 340 128" stroke="#ffffff" strokeWidth="2" />
      </svg>
    </div>
  );
}

export default function MagentoProposal() {
  const $t = useCmsText();
  const perks = useCmsData("MagentoProposal__perks", perks__cms);
  const projectTypes = useCmsData("MagentoProposal__projectTypes", projectTypes__cms);
  const stats = useCmsData("MagentoProposal__stats", stats__cms);
  const reduce = useReducedMotion();
  const [f, setF] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!f.name.trim()) e.name = "Please enter your name.";
    if (!f.company.trim()) e.company = "Please enter your company.";
    if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email.";
    if (f.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid phone number.";
    if (!f.type) e.type = "Please choose a project type.";
    if (f.message.trim().length < 10) e.message = "Please tell us a little more (10+ characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending" || !validate()) return;
    setStatus("sending");
    setServerError("");
    // The leads API stores a single free-text "idea" (10–500 chars), so the form details are packed into it.
    const idea = [
      `Magento proposal request — ${f.type}`,
      `Name: ${f.name.trim()} | Company: ${f.company.trim()} | Phone: ${f.phone.trim()}`,
      f.message.trim(),
    ]
      .join("\n")
      .slice(0, 500);
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, email: f.email.trim(), source: "hire-magento-developers", website: f.website }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
      goToThankYou("hire-magento");
      setF(empty);
    } catch (err) {
      setServerError(err instanceof Error && err.message !== "Failed to fetch" ? err.message : "We couldn’t reach the server. Please try again.");
      setStatus("error");
    }
  };

  const inputCls = "w-full bg-transparent py-3 text-sm text-[#0c1e3d] placeholder:text-slate-400 focus:outline-none";

  return (
    <section id="magento-proposal" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-[#f7f6f3] via-[#f4f4f1] to-[#eef1ef] py-14 sm:py-20">
      {/* light beam + dark green curves */}
      <div aria-hidden className="pointer-events-none absolute -top-24 left-[30%] h-[140%] w-[220px] rotate-[32deg] bg-gradient-to-b from-white/80 to-transparent blur-2xl" />
      <svg aria-hidden className="pointer-events-none absolute bottom-0 right-0 hidden h-[34%] w-[26%] lg:block" viewBox="0 0 400 400" preserveAspectRatio="none" fill="none">
        <path d="M400 0 C 300 120, 260 260, 120 400 H400 Z" fill="#14402f" />
        <path d="M400 60 C 320 160, 300 300, 210 400 H400 Z" fill="#0f3326" opacity="0.8" />
      </svg>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_440px_190px] lg:gap-8 xl:gap-10">
          {/* left copy */}
          <div className="relative">
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              <span className="h-px w-8 bg-slate-400" /> {rich($t("MagentoProposal__t3", "Let’s turn your idea into a plan "))}<span className="h-px w-8 bg-slate-400" />
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`text-h2 ${heading.className} mt-5 font-bold tracking-tight text-[#111]`}
            >
              {$t("MagentoProposal__t4", "Get My ")}<span className="text-[#1b7a6e]">{$t("MagentoProposal__t5", "Free Proposal")}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-body mt-4 max-w-[420px] text-slate-600">
              {rich($t("MagentoProposal__t6", "Share a few details about your Magento project and our experts will get back to you with a tailored proposal — no obligation, just real solutions."))}</motion.p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:max-w-[270px]">
              {perks.map((p, i) => (
                <motion.div key={p.title} variants={fadeUp} custom={2.5 + i * 0.5} initial="hidden" whileInView="show" viewport={{ once: true }} className="group flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/80 text-[#0c1e3d] shadow-sm ring-1 ring-slate-200 transition-all duration-300 group-hover:bg-[#1b7a6e] group-hover:text-white">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-[#111]">{p.title}</span>
                    <span className="block text-[13px] text-slate-500">{p.text}</span>
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              <span className="mb-3 block h-px w-10 bg-slate-400" />
              {$t("MagentoProposal__t7", "Build  |  Grow  |  Scale")}<span className="mt-1 block font-medium tracking-[0.2em] text-slate-400">{$t("MagentoProposal__t8", "With certified Magento experts")}</span>
            </div>

          </div>

          {/* form card, with the proposal "pocket" tucked behind its left edge (xl+) */}
          <div className="relative">
          <ProposalPocket />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="relative z-10 rounded-[22px] border border-white bg-white/95 p-6 shadow-[0_40px_80px_-40px_rgba(12,30,61,0.45)] backdrop-blur sm:p-8"
          >
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[520px] flex-col items-center justify-center text-center"
                >
                  <svg viewBox="0 0 80 80" className="h-20 w-20" fill="none">
                    <motion.circle cx="40" cy="40" r="36" stroke="#0d9488" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
                    <motion.path d="m25 41 10 10 20-22" stroke="#0d9488" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
                  </svg>
                  <h3 className={`text-h5 ${heading.className} mt-6 font-bold text-[#111]`}>{$t("MagentoProposal__t9", "Thank you!")}</h3>
                  <p className="text-small mt-2 max-w-[300px] text-slate-600">{rich($t("MagentoProposal__t10", "Your request is in. A Magento expert will get back to you within 24 hours."))}</p>
                  <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-[#1b7a6e] underline-offset-4 hover:underline">
                    {$t("MagentoProposal__t11", "Send another request")}</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">{rich($t("MagentoProposal__t12", "Tell us about your project"))}</p>
                  <h3 className={`text-h4 ${heading.className} mt-3 font-bold text-[#111]`}>
                    {$t("MagentoProposal__t13", "Request Your")}<br />
                    <span className="text-[#1b7a6e]">{$t("MagentoProposal__t14", "Free Proposal")}</span>
                  </h3>
                  <p className="text-small mt-3 text-slate-500">{rich($t("MagentoProposal__t15", "Fill in the details below and our Magento experts will get back to you shortly."))}</p>

                  {/* honeypot */}
                  <input type="text" name="pm_trap_field" value={f.website} onChange={set("website")} tabIndex={-1} autoComplete="new-password" className="hidden" aria-hidden />

                  <div className="mt-6 space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field icon="user" label={$t("MagentoProposal__t16", "Full name")} error={errors.name}>
                        <input className={inputCls} placeholder={$t("MagentoProposal__t17", "Full Name *")} value={f.name} onChange={set("name")} autoComplete="name" />
                      </Field>
                      <Field icon="briefcase" label={$t("MagentoProposal__t18", "Company name")} error={errors.company}>
                        <input className={inputCls} placeholder={$t("MagentoProposal__t19", "Company Name *")} value={f.company} onChange={set("company")} autoComplete="organization" />
                      </Field>
                    </div>
                    <Field icon="mail" label={$t("MagentoProposal__t20", "Email address")} error={errors.email}>
                      <input className={inputCls} type="email" placeholder={$t("MagentoProposal__t21", "Email Address *")} value={f.email} onChange={set("email")} autoComplete="email" />
                    </Field>
                    <Field icon="phone" label={$t("MagentoProposal__t22", "Phone number")} error={errors.phone}>
                      <input className={inputCls} type="tel" placeholder={$t("MagentoProposal__t23", "Phone Number *")} value={f.phone} onChange={set("phone")} autoComplete="tel" />
                    </Field>
                    <label className="block">
                      <span className="sr-only">{$t("MagentoProposal__t24", "Project type")}</span>
                      <span className={`group relative flex items-center gap-2.5 rounded-lg border bg-white px-3 transition-all focus-within:border-[#0d9488] focus-within:shadow-[0_0_0_3px_rgba(13,148,136,0.12)] ${errors.type ? "border-rose-300" : "border-slate-200"}`}>
                        <Icon name="grid" className="h-4 w-4 shrink-0 text-slate-400 group-focus-within:text-[#0d9488]" />
                        <select value={f.type} onChange={set("type")} className={`w-full appearance-none bg-transparent py-3 pr-6 text-sm focus:outline-none ${f.type ? "text-[#0c1e3d]" : "text-slate-400"}`}>
                          <option value="" disabled>{$t("MagentoProposal__t25", "Project Type *")}</option>
                          {projectTypes.map((t) => (<option key={t} value={t} className="text-[#0c1e3d]">{t}</option>))}
                        </select>
                        <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3 h-4 w-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                      </span>
                      {errors.type && <span className="mt-1 block text-[11px] text-rose-500">{errors.type}</span>}
                    </label>
                    <label className="block">
                      <span className="sr-only">{$t("MagentoProposal__t26", "Tell us about your project")}</span>
                      <span className={`group relative flex gap-2.5 rounded-lg border bg-white px-3 pt-3 transition-all focus-within:border-[#0d9488] focus-within:shadow-[0_0_0_3px_rgba(13,148,136,0.12)] ${errors.message ? "border-rose-300" : "border-slate-200"}`}>
                        <Icon name="docText" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 group-focus-within:text-[#0d9488]" />
                        <textarea
                          value={f.message}
                          onChange={set("message")}
                          maxLength={MSG_MAX}
                          rows={3}
                          placeholder={$t("MagentoProposal__t27", "Tell us about your project *")}
                          className="w-full resize-none bg-transparent pb-6 text-sm text-[#0c1e3d] placeholder:text-slate-400 focus:outline-none"
                        />
                        <span className="absolute bottom-2 right-3 text-[11px] text-slate-400">{f.message.length}/{MSG_MAX}</span>
                      </span>
                      {errors.message && <span className="mt-1 block text-[11px] text-rose-500">{errors.message}</span>}
                    </label>
                  </div>

                  {status === "error" && <p className="text-small mt-3 text-rose-600" role="alert">{serverError}</p>}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative mt-6 flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#0f3d3a] py-4 text-sm font-semibold text-white shadow-[0_16px_30px_-14px_rgba(15,61,58,0.8)] transition hover:bg-[#145049] disabled:opacity-70"
                  >
                    <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/15 transition-[left] duration-700 group-hover:left-[120%]" />
                    {status === "sending" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        {$t("MagentoProposal__t28", "Sending…")}</>
                    ) : (
                      <>
                        {$t("MagentoProposal__t29", "Get My Free Proposal")}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <p className="text-caption mt-3 flex items-center justify-center gap-1.5 text-slate-500">
                    <Icon name="lock" className="h-3.5 w-3.5" />
                    {rich($t("MagentoProposal__t30", "Your information is safe with us. We respect your privacy."))}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
          </div>

          {/* right column */}
          <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:justify-center lg:flex-col lg:items-start lg:gap-0">
            <motion.svg
              viewBox="0 0 200 110"
              className="w-[190px] text-[#2c3e3a] lg:mb-6"
              aria-label="Ideas deserve a plan"
              initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
            >
              <text x="6" y="44" className="font-caveat" fontSize="32" fill="currentColor" transform="rotate(-16 6 44)">{$t("MagentoProposal__t31", "Ideas")}</text>
              <text x="22" y="84" className="font-caveat" fontSize="32" fill="currentColor" transform="rotate(-16 22 84)">{$t("MagentoProposal__t32", "deserve a plan")}</text>
              <path d="M60 104 C110 96 150 80 196 56" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </motion.svg>
            <div className="flex flex-wrap justify-center gap-8 lg:flex-col lg:justify-start lg:gap-7">
              <motion.span
                aria-hidden
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="hidden h-7 w-px origin-top bg-slate-400/70 lg:block"
              />
              {stats.map((s, i) => (
                <motion.div key={s.label} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center lg:text-left">
                  <p className={`${heading.className} text-2xl font-bold text-[#111]`}>
                    <CountUp to={s.to} suffix="+" />
                  </p>
                  <p className="text-small text-slate-500">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <p className="absolute bottom-6 right-8 hidden text-right text-[10px] font-semibold uppercase leading-relaxed tracking-[0.25em] text-white/80 lg:block">
        <span className="mr-3 inline-block h-px w-8 align-middle bg-white/60" />
        {rich($t("MagentoProposal__t33", "Your vision."))}<br />
        {rich($t("MagentoProposal__t34", "Our expertise."))}</p>
    </section>
  );
}
