"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";
import { goToThankYou } from "@/lib/forms";

const INK = "#0d1b33";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
// identifies this form's requests in the proposals table (`source` column)
const FORM_ID = "testimonials-strategy-session";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;
const MESSAGE_MAX = 1000;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type IconProps = { size?: number; color?: string };
const base = (size: number, color: string, strokeWidth = 1.7) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const UsersIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M16 14.2a4.5 4.5 0 0 1 5.5 4.3" />
  </svg>
);
const TargetIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="11" cy="13" r="8" />
    <circle cx="11" cy="13" r="4.5" />
    <circle cx="11" cy="13" r="1.2" fill={color} />
    <path d="m11 13 9-9M17 4h3v3" />
  </svg>
);
const TrendIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />
  </svg>
);
const ShieldIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3 19.5 6V11.5C19.5 16.8 16 20 12 21.5 8 20 4.5 16.8 4.5 11.5V6Z" />
    <path d="m8.7 12.2 2.2 2.1 4.4-4.8" />
  </svg>
);
const PlaneIcon = ({ size = 18, color = "#fff" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M21 3 10 14M21 3l-7 18-4-7-7-4Z" />
  </svg>
);
const UserIcon = ({ size = 16, color = "#94a3b8" }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);
const MailIcon = ({ size = 16, color = "#94a3b8" }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const PhoneIcon = ({ size = 16, color = "#94a3b8" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);
const BuildingIcon = ({ size = 16, color = "#94a3b8" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 21V5l8-2v18M12 8h8v13M2 21h20M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2" />
  </svg>
);
const ClockIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const LockIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);
const CheckIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="m5 12 4.5 4.5L19 7" />
  </svg>
);
const ArrowIcon = ({ size = 18, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const ChevronIcon = ({ size = 16, color = "#94a3b8" }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const BENEFITS__cms = [
  { Icon: UsersIcon, title: "More Traffic", desc: "Attract the right audience with smart strategies." },
  { Icon: TargetIcon, title: "Better Conversion", desc: "Optimized experiences that turn visitors into leads." },
  { Icon: TrendIcon, title: "Real Growth", desc: "Data-driven solutions that scale your business." },
  { Icon: ShieldIcon, title: "Long-Term Impact", desc: "Reliable support and strategies for sustainable success." },
];

const NUMBERS__cms = [
  { value: "150+", label: "Happy Clients" },
  { value: "3X", label: "Average Growth in Leads" },
  { value: "98%", label: "Client Satisfaction" },
];

const TRUST__cms = ["Google", "Clutch", "GoodFirms", "Upwork", "Trustpilot"];

const SERVICES__cms = ["Website Design & Development", "SEO", "Digital Marketing", "E-commerce Store", "App Development", "Something else"];

/* ---------- Form ---------- */
type Fields = { name: string; email: string; phone: string; company: string; service: string; message: string };
type FieldErrors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "submitting" | "success" | "error";
const EMPTY: Fields = { name: "", email: "", phone: "", company: "", service: "", message: "" };

function validate(v: Fields): FieldErrors {
  const e: FieldErrors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email.";
  if (!PHONE_RE.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!v.company.trim()) e.company = "Please enter your company.";
  if (v.message.length > MESSAGE_MAX) e.message = `Please keep this under ${MESSAGE_MAX} characters.`;
  return e;
}

/* The proposals API stores first/last name, a location and one message, so the extra fields fold into those:
   the name splits on its first space, the company goes in `location`, and the service heads the message. */
function toProposal(v: Fields) {
  const [first, ...rest] = v.name.trim().split(/\s+/);
  const message = [v.service && `Looking for: ${v.service}`, v.message.trim()].filter(Boolean).join("\n\n");
  return {
    firstName: first,
    lastName: rest.join(" ") || "-",
    email: v.email.trim(),
    phone: v.phone.trim(),
    location: `Company: ${v.company.trim()}`,
    message,
  };
}

function Field({ id, icon, error, children }: { id: string; icon: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100 ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      >
        <span className="shrink-0">{icon}</span>
        {children}
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1 text-[11px] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function StrategyForm() {
  const $t = useCmsText();
  const SERVICES = useCmsData("TestimonialsStrategy__SERVICES", SERVICES__cms);
  const [values, setValues] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const errors = { ...validate(values), ...serverErrors };
  const show = (k: keyof Fields) => (touched[k] ? errors[k] : undefined);
  const bind = (k: keyof Fields) => ({
    id: `tss-${k}`,
    name: k,
    value: values[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
      setServerErrors((s) => ({ ...s, [k]: undefined }));
    },
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
    "aria-invalid": !!show(k),
    "aria-describedby": `tss-${k}-err`,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, company: true, service: true, message: true });
    if (Object.keys(validate(values)).length) return;

    const honeypot = (new FormData(e.currentTarget).get("pm_trap_field") as string) ?? "";
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/proposals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...toProposal(values), source: FORM_ID, website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // map the API's field names back onto this form's fields
        if (data.errors) {
          const er = data.errors as Record<string, string>;
          setServerErrors({ name: er.firstName || er.lastName, email: er.email, phone: er.phone, company: er.location, message: er.message });
        }
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      goToThankYou("testimonials");
      setValues(EMPTY);
      setTouched({});
    } catch (err) {
      setStatus("error");
      setError(err instanceof TypeError ? "We couldn't reach our server. Please check your connection and try again." : (err as Error).message);
    }
  }

  const input = "h-[46px] w-full bg-transparent text-[13.5px] text-slate-800 placeholder:text-slate-400 outline-none";

  return (
    <div className="relative rounded-[22px] bg-white p-6 shadow-[0_30px_70px_-30px_rgba(13,27,51,0.45)] ring-1 ring-slate-100 sm:p-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 py-1 pl-1 pr-3 text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: DEEP_TEAL }}>
        <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: TEAL }}>
          <PlaneIcon size={13} />
        </span>
        {$t("TestimonialsStrategy__t1", "Take the next step")}</span>
      <h3 className="text-h4 mt-4 font-bold" style={{ color: INK }}>
        {$t("TestimonialsStrategy__t2", "Book Your ")}<span className="italic" style={{ color: TEAL }}>{$t("TestimonialsStrategy__t3", "Free")}</span>
        <br />
        {$t("TestimonialsStrategy__t4", "Strategy Session")}</h3>
      <p className="text-small mt-2 text-slate-500">{rich($t("TestimonialsStrategy__t5", "Tell us about your project and our experts will get back to you within 24 hours."))}</p>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-teal-50 px-6 py-12 text-center"
          role="status"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow">
            <CheckIcon size={28} />
          </span>
          <p className="text-body font-bold" style={{ color: INK }}>
            {rich($t("TestimonialsStrategy__t6", "Thank you! Your request is in."))}</p>
          <p className="text-small max-w-sm text-slate-600">{rich($t("TestimonialsStrategy__t7", "Our team will reach out within 24 hours to schedule your free strategy session."))}</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-1 text-[13px] font-semibold underline underline-offset-4" style={{ color: TEAL }}>
            {$t("TestimonialsStrategy__t8", "Submit another request")}</button>
        </motion.div>
      ) : (
        <form id={FORM_ID} data-form-id={FORM_ID} onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-3">
          <input type="text" name="pm_trap_field" tabIndex={-1} autoComplete="new-password" className="hidden" aria-hidden />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field id="tss-name" icon={<UserIcon />} error={show("name")}>
              <input {...bind("name")} autoComplete="name" placeholder={$t("TestimonialsStrategy__t9", "Your Name*")} className={input} />
            </Field>
            <Field id="tss-email" icon={<MailIcon />} error={show("email")}>
              <input {...bind("email")} type="email" autoComplete="email" placeholder={$t("TestimonialsStrategy__t10", "Your Email*")} className={input} />
            </Field>
          </div>
          <Field id="tss-phone" icon={<PhoneIcon />} error={show("phone")}>
            <input {...bind("phone")} type="tel" autoComplete="tel" placeholder={$t("TestimonialsStrategy__t11", "Your Phone Number*")} className={input} />
          </Field>
          <Field id="tss-company" icon={<BuildingIcon />} error={show("company")}>
            <input {...bind("company")} autoComplete="organization" placeholder={$t("TestimonialsStrategy__t12", "Your Company*")} className={input} />
          </Field>
          <Field id="tss-service" icon={<TargetIcon size={16} color="#94a3b8" />}>
            <select {...bind("service")} className={`${input} appearance-none ${values.service ? "" : "text-slate-400"}`}>
              <option value="">{$t("TestimonialsStrategy__t13", "What are you looking for?")}</option>
              {SERVICES.map((sv) => (
                <option key={sv} value={sv} className="text-slate-800">
                  {sv}
                </option>
              ))}
            </select>
            <ChevronIcon />
          </Field>
          <div>
            <textarea
              {...bind("message")}
              rows={4}
              maxLength={MESSAGE_MAX}
              placeholder={$t("TestimonialsStrategy__t14", "Tell us about your project...")}
              className={`w-full resize-y rounded-xl border bg-white px-3.5 py-3 text-[13.5px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 ${
                show("message") ? "border-red-400" : "border-slate-200"
              }`}
            />
            {show("message") && (
              <p id="tss-message-err" className="mt-1 text-[11px] text-red-500">
                {show("message")}
              </p>
            )}
          </div>

          <ul className="mt-1 grid grid-cols-3 gap-2 text-[11px] leading-tight">
            {[
              { Icon: CheckIcon, t: $t("TestimonialsStrategy__t15", "No Obligation"), d: "100% free consultation" },
              { Icon: ClockIcon, t: $t("TestimonialsStrategy__t16", "Quick Response"), d: "Within 24 hours" },
              { Icon: LockIcon, t: $t("TestimonialsStrategy__t17", "Secure & Private"), d: "Your data is safe with us" },
            ].map(({ Icon, t, d }) => (
              <li key={t} className="flex items-start gap-1.5">
                <span className="mt-0.5 shrink-0">
                  <Icon size={14} />
                </span>
                <span>
                  <span className="block font-semibold" style={{ color: INK }}>
                    {t}
                  </span>
                  <span className="block text-slate-500">{d}</span>
                </span>
              </li>
            ))}
          </ul>

          {status === "error" && (
            <p role="alert" className="text-small rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group mt-2 flex h-[54px] w-full items-center justify-center gap-3 rounded-xl text-[15px] font-semibold text-white shadow-[0_16px_32px_-14px_rgba(15,92,86,0.8)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
            // the site-wide `button` rule is serif and unlayered, so only an inline style can override it
            style={{ background: `linear-gradient(90deg, ${DEEP_TEAL}, ${TEAL})`, fontFamily: "inherit" }}
          >
            {status === "submitting" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                {$t("TestimonialsStrategy__t18", "Sending...")}</>
            ) : (
              <>
                {$t("TestimonialsStrategy__t19", "Get My Free Strategy Session")}<span className="transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </>
            )}
          </button>
          <p className="text-caption mt-1 flex items-center justify-center gap-2 text-slate-500">
            <PhoneIcon size={14} color={TEAL} />
            {rich($t("TestimonialsStrategy__t20", "Prefer to talk?"))}{" "}
            <a href={$t("TestimonialsStrategy__t21", "tel:+919999988888")} className="font-semibold underline underline-offset-2" style={{ color: TEAL }}>
              {$t("TestimonialsStrategy__t22", "Schedule a Call")}</a>
          </p>
        </form>
      )}
    </div>
  );
}

/* ---------- Section ---------- */
export default function TestimonialsStrategy() {
  const $t = useCmsText();
  const BENEFITS = useCmsData("TestimonialsStrategy__BENEFITS", BENEFITS__cms);
  const NUMBERS = useCmsData("TestimonialsStrategy__NUMBERS", NUMBERS__cms);
  const TRUST = useCmsData("TestimonialsStrategy__TRUST", TRUST__cms);
  return (
    <section
      id="strategy-session"
      className="relative w-full overflow-hidden py-16 lg:py-20"
      style={{
        background: [
          "radial-gradient(ellipse 55% 60% at 62% 30%, rgba(165,243,252,0.35), transparent 70%)",
          "radial-gradient(ellipse 45% 55% at 95% 10%, rgba(186,230,253,0.45), transparent 70%)",
          "radial-gradient(ellipse 40% 50% at 0% 100%, rgba(204,251,241,0.45), transparent 70%)",
          "linear-gradient(135deg, #f4fafc 0%, #ffffff 45%, #eef7fb 100%)",
        ].join(","),
      }}
    >
      {/* faint rings behind the laptop and a dot grid in the top-right corner */}
      <div className="pointer-events-none absolute left-[38%] top-[-120px] hidden h-[620px] w-[620px] rounded-full border border-cyan-100/80 lg:block" aria-hidden />
      <div className="pointer-events-none absolute left-[44%] top-[-40px] hidden h-[460px] w-[460px] rounded-full border border-cyan-100/70 lg:block" aria-hidden />
      <div
        className="pointer-events-none absolute right-6 top-10 hidden h-28 w-40 opacity-60 lg:block"
        style={{ backgroundImage: "radial-gradient(#a5d8e6 1.3px, transparent 1.5px)", backgroundSize: "12px 12px" }}
        aria-hidden
      />
      <Container className="relative">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] xl:grid-cols-[minmax(0,1fr)_460px]">
          <div className="relative">
            <div className="grid grid-cols-1 items-center gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
              <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                <motion.span
                  variants={fadeUp}
                  className="inline-flex rounded-full bg-teal-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                  style={{ color: DEEP_TEAL }}
                >
                  {$t("TestimonialsStrategy__t23", "Let's build your next big thing")}</motion.span>
                <motion.h2 variants={fadeUp} className="text-h2 mt-5 font-bold tracking-tight" style={{ color: INK }}>
                  {$t("TestimonialsStrategy__t24", "Let's Turn Your")}<br />
                  {$t("TestimonialsStrategy__t25", "Traffic Into")}<br />
                  <span className="relative inline-block" style={{ color: TEAL }}>
                    {$t("TestimonialsStrategy__t26", "Real Growth")}<svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
                      <path d="M3 9C60 3 140 2 197 6" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-body mt-6 max-w-[420px] text-slate-600">
                  {rich($t("TestimonialsStrategy__t27", "A powerful website strategy that attracts, engages and converts visitors into loyal customers."))}</motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                className="relative z-0 mx-auto aspect-square w-full max-w-[460px] xl:-mb-24 xl:-ml-6 xl:-mr-[150px] xl:w-[calc(100%+180px)] xl:max-w-none"
              >
                <Image
                  src={$t("TestimonialsStrategy__t28", "/client-testimonial7.webp")}
                  alt={$t("TestimonialsStrategy__t29", "A laptop showing a website that reads 'We design websites that drive growth.'")}
                  fill
                  sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 50vw, 100vw"
                  className="object-contain mix-blend-multiply [mask-image:radial-gradient(ellipse_at_60%_50%,#000_58%,transparent_74%)] [-webkit-mask-image:radial-gradient(ellipse_at_60%_50%,#000_58%,transparent_74%)]"
                />
              </motion.div>
            </div>

            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="relative z-10 mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-4 xl:max-w-[640px]"
            >
              {BENEFITS.map(({ Icon, title, desc }, i) => (
                <motion.li
                  key={title}
                  variants={fadeUp}
                  className={`px-3 text-center ${i > 0 ? "sm:border-l sm:border-dashed sm:border-slate-300" : ""} ${i % 2 === 1 ? "border-l border-dashed border-slate-300" : ""}`}
                >
                  {/* icon in a white disc with a soft teal halo */}
                  <span className="mx-auto flex h-[66px] w-[66px] items-center justify-center rounded-full bg-white shadow-[0_14px_28px_-14px_rgba(13,148,136,0.55),0_0_0_6px_rgba(204,240,235,0.6)] ring-1 ring-teal-100">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-teal-50 to-cyan-50">
                      <Icon size={26} color={TEAL} />
                    </span>
                  </span>
                  <p className="text-small mt-4 font-bold" style={{ color: INK }}>
                    {title}
                  </p>
                  <p className="mx-auto mt-1.5 max-w-[140px] text-[11.5px] leading-[1.5] text-slate-500">{desc}</p>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="mt-8 grid grid-cols-1 items-center gap-5 rounded-2xl bg-white/90 p-5 shadow-[0_22px_46px_-28px_rgba(13,27,51,0.45)] ring-1 ring-slate-100 sm:grid-cols-[1.3fr_1fr_1fr_1fr]"
            >
              <div className="flex gap-3 border-slate-200 sm:border-r sm:pr-4">
                <span className="font-serif text-[40px] leading-[0.7]" style={{ color: TEAL }} aria-hidden>
                  &ldquo;
                </span>
                <div>
                  <p className="text-small font-semibold" style={{ color: INK }}>
                    {rich($t("TestimonialsStrategy__t30", "Businesses that work with us see real results."))}</p>
                  <a href={$t("TestimonialsStrategy__t31", "#client-stories")} className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-semibold" style={{ color: TEAL }}>
                    {$t("TestimonialsStrategy__t32", "— And our results speak for themselves.")}</a>
                </div>
              </div>
              {NUMBERS.map((n, i) => (
                <div key={n.label} className={`text-center ${i > 0 ? "sm:border-l sm:border-slate-200" : ""}`}>
                  <p className="text-[26px] font-bold leading-none" style={{ color: INK }}>
                    {n.value}
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-tight text-slate-500">{n.label}</p>
                </div>
              ))}
            </motion.div>

            <div className="mt-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{rich($t("TestimonialsStrategy__t33", "Trusted by businesses worldwide"))}</p>
              <ul className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-3">
                {TRUST.map((t) => (
                  <li key={t} className="text-[18px] font-bold tracking-tight text-slate-400">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="relative z-20 lg:sticky lg:top-24"
          >
            <StrategyForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
