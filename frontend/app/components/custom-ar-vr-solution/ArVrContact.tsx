"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock, Mail, MapPin, MessagesSquare, Phone, Quote, Rocket, TrendingUp, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#0f1535";
const PURPLE = "#5b43e8";
const EASE = [0.22, 1, 0.36, 1] as const;

const PERK_ICONS: LucideIcon[] = [MessagesSquare, CalendarDays, Rocket];

export type ArVrContactDetails = { address?: string; email?: string; phone?: string; hours?: string };

const perks__cms = [
  { title: "Free Consultation", text: "Share your idea and get expert advice." },
  { title: "Custom Solutions", text: "Tailored strategies for your unique goals." },
  { title: "End-to-End Support", text: "From concept to deployment and beyond." },
];
/** Client logos and a client quote: left empty on purpose - fill them with real, approved clients in the CMS. */
const logos__cms: { name: string; logo: string }[] = [];
const quote__cms = { text: "", name: "", role: "", photo: "", metric: "", metricLabel: "" };

/** "Ready to create real impact together?" - consultation call to action with contact details from Settings. */
export default function ArVrContact({ details }: { details: ArVrContactDetails }) {
  const $t = useCmsText();
  const perks = useCmsData("ArVrContact__perks", perks__cms);
  const logos = useCmsData("ArVrContact__logos", logos__cms).filter((l) => l.name || l.logo);
  const quote = useCmsData("ArVrContact__quote", quote__cms);
  const reduce = !!useReducedMotion();
  const contacts = [
    details.address && { icon: MapPin, label: $t("ArVrContact__t1", "Our Office"), value: details.address },
    details.email && { icon: Mail, label: $t("ArVrContact__t2", "Email Us"), value: details.email, href: `mailto:${details.email}` },
    details.phone && { icon: Phone, label: $t("ArVrContact__t3", "Call Us"), value: details.phone, href: `tel:${details.phone.replace(/[^+\d]/g, "")}` },
    details.hours && { icon: Clock, label: $t("ArVrContact__t4", "Working Hours"), value: details.hours },
  ].filter(Boolean) as { icon: LucideIcon; label: string; value: string; href?: string }[];

  return (
    <section id="ar-vr-contact" className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_50%_60%,#ffffff_0%,#f3f2f6_60%,#eeedf2_100%)] pb-12 pt-16 lg:pt-24">
      <Container className="relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="text-center">
          <p className="text-[13px] font-bold uppercase tracking-[0.2em]" style={{ color: PURPLE }}>{html($t("ArVrContact__t5", "Let's build your next"))}</p>
          <i aria-hidden className="mx-auto mt-2 block h-[2px] w-8 rounded-full" style={{ background: PURPLE }} />
          <h2 className="text-h2 font-heading mt-4 font-bold leading-[1.1] tracking-[-0.02em]" style={{ color: NAVY }}>
            <span className="block">{html($t("ArVrContact__t6", "Ready to create"))}</span>
            <span className="block">{rich($t("ArVrContact__t7m", "<span class=\"bg-[linear-gradient(90deg,#5b43e8,#7c5cf6)] bg-clip-text text-transparent\">real impact</span> together?"))}</span>
          </h2>
          <p className="text-body mx-auto mt-4 max-w-[460px] text-slate-600">{rich($t("ArVrContact__t9", "Whether you have a bold idea or need expert guidance, our team is ready to turn your vision into immersive reality."))}</p>
        </motion.div>

        <ul className="mx-auto mt-8 grid max-w-[720px] gap-5 sm:grid-cols-3 sm:divide-x sm:divide-slate-300/60">
          {perks.map((p, i) => {
            const Icon = PERK_ICONS[i % PERK_ICONS.length];
            return (
              <li key={i} className="flex items-start gap-3 sm:px-4 sm:first:pl-0">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#ecebfb]"><Icon className="h-5 w-5" style={{ color: PURPLE }} /></span>
                <span>
                  <span className="block text-[14px] font-bold" style={{ color: NAVY }}>{p.title}</span>
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-slate-600">{p.text}</span>
                </span>
              </li>
            );
          })}
        </ul>

        <div className="relative mx-auto mt-10 grid max-w-[1240px] items-center gap-6 lg:grid-cols-[1fr_360px_1fr]">
          {/* client logos (only when filled in the CMS) */}
          <div className="order-2 lg:order-1">
            {logos.length > 0 && (
              <motion.div className="rounded-2xl border border-white bg-white/70 p-6 shadow-[0_20px_44px_-30px_rgba(15,21,53,0.45)] backdrop-blur lg:-rotate-2" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}>
                <p className="text-center text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: PURPLE }}>{html($t("ArVrContact__t10", "Trusted by innovative leaders"))}</p>
                <ul className="mt-5 grid grid-cols-3 items-center gap-5">
                  {logos.map((l, i) => (
                    <li key={i} className="flex justify-center">
                      {l.logo ? <Image src={l.logo} alt={l.name} width={120} height={40} className="h-8 w-auto object-contain opacity-80 grayscale" /> : <span className="text-[14px] font-bold text-slate-600">{l.name}</span>}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* consultation card */}
          <motion.div
            className="order-1 rounded-2xl border border-white bg-white/80 px-7 py-8 text-center shadow-[0_0_0_6px_rgba(124,92,246,0.08),0_30px_60px_-30px_rgba(91,67,232,0.6)] backdrop-blur lg:order-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: PURPLE }}>{html($t("ArVrContact__t11", "Start your journey"))}</p>
            <h3 className="text-h4 font-heading mt-2 font-bold" style={{ color: NAVY }}>{html($t("ArVrContact__t12", "Book a Free Consultation"))}</h3>
            <p className="text-small mt-2 text-slate-600">{rich($t("ArVrContact__t13", "Let's explore how we can create measurable results for your business."))}</p>
            <Link href={$t("ArVrContact__t14", "/contact")} className="group mt-6 flex items-center justify-center gap-3 rounded-lg bg-[linear-gradient(90deg,#5b43e8,#6d5ef5)] px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_14px_28px_-12px_rgba(91,67,232,0.8)]">
              {$t("ArVrContact__t15", "Book a call")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={$t("ArVrContact__t16", "/contact")} className="mt-4 inline-block text-[12px] font-bold uppercase tracking-[0.12em] hover:underline" style={{ color: PURPLE }}>
              {$t("ArVrContact__t17", "Or send us a message")}
            </Link>
          </motion.div>

          {/* client quote (only when filled in the CMS) */}
          <div className="order-3">
            {quote.text && (
              <motion.figure className="relative rounded-2xl border border-white bg-white/70 p-6 shadow-[0_20px_44px_-30px_rgba(15,21,53,0.45)] backdrop-blur lg:rotate-2" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}>
                <Quote className="h-7 w-7 fill-current" style={{ color: PURPLE }} />
                <blockquote className="text-small mt-3 leading-relaxed text-slate-700">{quote.text}</blockquote>
                {quote.name && (
                  <figcaption className="mt-4 flex items-center gap-3">
                    {quote.photo && <Image src={quote.photo} alt={quote.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />}
                    <span>
                      <span className="block text-[13px] font-bold" style={{ color: NAVY }}>{quote.name}</span>
                      {quote.role && <span className="block text-[11px] text-slate-500">{quote.role}</span>}
                    </span>
                  </figcaption>
                )}
                {quote.metric && (
                  <div className="absolute -bottom-10 right-4 flex items-center gap-3 rounded-xl border border-white bg-white px-4 py-3 shadow-lg">
                    <TrendingUp className="h-6 w-6" style={{ color: PURPLE }} />
                    <span>
                      <span className="block text-h5 font-heading font-bold" style={{ color: PURPLE }}>{quote.metric}</span>
                      <span className="block text-[11px] text-slate-600">{quote.metricLabel}</span>
                    </span>
                  </div>
                )}
              </motion.figure>
            )}
          </div>
        </div>

        {/* headset on the podium, with contact details from Settings on either side */}
        <div className="relative mx-auto mt-4 max-w-[1100px]">
          <motion.div className="mx-auto w-full max-w-[620px]" animate={reduce ? undefined : { y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <Image src={$t("ArVrContact__t18", "/ar-vr/cta-headset.webp")} alt={$t("ArVrContact__t19", "VR headset on a glowing podium")} width={886} height={416} sizes="(min-width: 1024px) 620px, 100vw" className="edge-fade h-auto w-full select-none mix-blend-multiply" />
          </motion.div>
          {contacts.length > 0 && (
            <div className="relative z-10 mt-2 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10 lg:divide-x lg:divide-slate-300/60">
              {[contacts.slice(0, Math.ceil(contacts.length / 2)), contacts.slice(Math.ceil(contacts.length / 2))].map((group, g) => (
                <ul key={g} className="flex flex-col gap-5 sm:flex-row sm:gap-10 lg:pl-10 lg:first:pl-0">
                  {group.map((c, i) => {
                    const node = (
                      <span className="flex items-center gap-3">
                        <c.icon className="h-7 w-7 shrink-0" strokeWidth={1.5} style={{ color: PURPLE }} />
                        <span>
                          <span className="block text-[13px] font-bold" style={{ color: NAVY }}>{c.label}</span>
                          <span className="block max-w-[200px] text-[12.5px] text-slate-600">{c.value}</span>
                        </span>
                      </span>
                    );
                    return (
                      <li key={i} className="lg:px-6 lg:first:pl-0">
                        {c.href ? <a href={c.href} className="hover:opacity-80">{node}</a> : node}
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
