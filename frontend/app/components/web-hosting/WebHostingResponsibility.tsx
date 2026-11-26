"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Activity, ArrowRight, BarChart3, CheckCircle2, CloudUpload, Gauge, Globe, HeartHandshake, Lock, Mail, ShieldCheck, User, Users, Zap, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";
import { submitEnquiry, goToThankYou } from "@/lib/forms";
import Honeypot from "@/components/cms/Honeypot";

const MINT = "#3fd3b8";
const TEAL = "#0f766e";
const NAVY = "#0f2333";
const EASE = [0.22, 1, 0.36, 1] as const;

const PILL_ICONS: LucideIcon[] = [Zap, ShieldCheck, Activity, CloudUpload];
const ORBIT_ICONS: LucideIcon[] = [Gauge, Lock, CloudUpload, BarChart3];

const pills__cms = [{ label: "Fast" }, { label: "Secure" }, { label: "Monitored" }, { label: "Backed Up" }];
const assurances__cms = [
  { title: "Quick Response", text: "We reply within 1 business day" },
  { title: "No Obligation", text: "100% free recommendation" },
  { title: "Human Support", text: "Talk to real hosting experts" },
];

/** "Your Website. Our Responsibility." - hosting recommendation form (Admin → Leads + email alerts). */
export default function WebHostingResponsibility() {
  const $t = useCmsText();
  const pills = useCmsData("WebHostingResponsibility__pills", pills__cms);
  const assurances = useCmsData("WebHostingResponsibility__assurances", assurances__cms);
  const [form, setForm] = useState({ name: "", email: "", website: "" });
  const [hp, setHp] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError($t("WebHostingResponsibility__t1", "Please enter your name and a valid email."));
      return;
    }
    setSending(true);
    setError("");
    const r = await submitEnquiry("web-hosting-recommendation", {
      name: form.name,
      email: form.email,
      service: "Web Hosting",
      details: form.website ? { "Website URL": form.website } : undefined,
      hp,
    });
    setSending(false);
    if (r.ok) {
      setSent(true);
      goToThankYou("web-hosting");
    }
    else setError(r.error);
  };

  const field = "flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-400 transition focus-within:border-[#0f766e] focus-within:ring-2 focus-within:ring-[#0f766e]/15";
  const input = "w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-500";

  return (
    <section id="hosting-recommendation" className="bg-white pb-16 lg:pb-24">
      <Container>
        <motion.div
          className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[28px] bg-[radial-gradient(ellipse_at_20%_30%,#0d4752_0%,#062b37_45%,#04212c_100%)] px-6 pb-6 pt-8 shadow-[0_30px_70px_-30px_rgba(4,33,44,0.8)] sm:px-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:gap-10">
            {/* left */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/90">
                <HeartHandshake className="h-4 w-4" style={{ color: MINT }} />
                {$t("WebHostingResponsibility__t2", "Let us handle it")}
              </span>
              <h2 className="text-h2 font-heading mt-5 font-bold leading-[1.08] text-white">
                <span className="block">{$t("WebHostingResponsibility__t3", "Your Website.")}</span>
                <span className="block" style={{ color: MINT }}>{$t("WebHostingResponsibility__t4", "Our Responsibility.")}</span>
              </h2>
              <p className="text-body mt-4 max-w-[440px] text-white/80">{rich($t("WebHostingResponsibility__t5", "Leave the hosting to us. We'll keep your website fast, secure, available, and ready to grow."))}</p>

              <div className="relative mx-auto mt-6 grid max-w-[460px] grid-cols-[56px_1fr_56px] items-center gap-3">
                <div className="space-y-10">
                  {ORBIT_ICONS.slice(0, 2).map((Icon, i) => (
                    <span key={i} className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-white/5"><Icon className="h-6 w-6 text-white/90" /></span>
                  ))}
                </div>
                <Image src={$t("WebHostingResponsibility__t6", "/web-hosting/responsibility-laptop.webp")} alt={$t("WebHostingResponsibility__t7", "Laptop protected by a security shield on a server platform")} width={401} height={326} className="edge-fade h-auto w-full mix-blend-screen" />
                <div className="space-y-10">
                  {ORBIT_ICONS.slice(2).map((Icon, i) => (
                    <span key={i} className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-white/5"><Icon className="h-6 w-6 text-white/90" /></span>
                  ))}
                </div>
              </div>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {pills.map((p, i) => {
                  const Icon = PILL_ICONS[i % PILL_ICONS.length];
                  return (
                    <li key={i} className="flex items-center gap-2 text-[13px] font-medium text-white/90">
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20"><Icon className="h-4 w-4" style={{ color: MINT }} /></span>
                      {p.label}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* form */}
            <div className="self-start rounded-2xl bg-white p-6 shadow-xl sm:p-8">
              <h3 className="text-h5 font-heading font-bold" style={{ color: NAVY }}>{$t("WebHostingResponsibility__t8", "Tell us about your website.")}</h3>
              <p className="text-caption mt-1 text-slate-500">{$t("WebHostingResponsibility__t9", "We'll recommend the perfect hosting for you.")}</p>
              {sent ? (
                <div className="mt-6 rounded-xl bg-emerald-50 px-4 py-8 text-center">
                  <p className="text-small font-semibold text-emerald-700">{$t("WebHostingResponsibility__t10", "Thank you! We'll send your hosting recommendation shortly.")}</p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="relative mt-5 flex flex-col gap-3">
                  <Honeypot value={hp} onChange={setHp} />
                  <label className={field}>
                    <User className="h-4 w-4 shrink-0" />
                    <input className={input} value={form.name} onChange={set("name")} placeholder={$t("WebHostingResponsibility__t11", "Your Name")} autoComplete="name" />
                  </label>
                  <label className={field}>
                    <Mail className="h-4 w-4 shrink-0" />
                    <input className={input} type="email" value={form.email} onChange={set("email")} placeholder={$t("WebHostingResponsibility__t12", "Work Email")} autoComplete="email" />
                  </label>
                  <label className={field}>
                    <Globe className="h-4 w-4 shrink-0" />
                    <input className={input} type="text" inputMode="url" value={form.website} onChange={set("website")} placeholder={$t("WebHostingResponsibility__t13", "Your Website URL")} />
                  </label>
                  <p className="-mt-1 pl-11 text-[11px] text-slate-500">{$t("WebHostingResponsibility__t14", "e.g., www.yoursite.com")}</p>
                  {error && <p role="alert" className="text-caption font-semibold text-red-600">{error}</p>}
                  <button type="submit" disabled={sending} className="group mt-1 flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-95 disabled:opacity-70" style={{ background: TEAL }}>
                    {sending ? $t("WebHostingResponsibility__t15", "Sending…") : $t("WebHostingResponsibility__t16", "Get My Hosting Recommendation")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>
              )}
              <ul className="mt-5 grid grid-cols-3 gap-3">
                {assurances.map((a, i) => (
                  <li key={i} className="flex gap-1.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: TEAL }} />
                    <span>
                      <span className="block text-[12px] font-bold" style={{ color: NAVY }}>{a.title}</span>
                      <span className="block text-[11px] leading-snug text-slate-500">{a.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/20"><Users className="h-6 w-6" style={{ color: MINT }} /></span>
              <p className="text-small font-semibold text-white">
                {$t("WebHostingResponsibility__t17", "You focus on your business.")}
                <span className="block" style={{ color: MINT }}>{$t("WebHostingResponsibility__t18", "We'll take care of what keeps your website running.")}</span>
              </p>
            </div>
            <p className="font-caveat text-[clamp(22px,2vw,30px)] -rotate-2" style={{ color: MINT }}>{$t("WebHostingResponsibility__t19", "Let's build something great together.")}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
