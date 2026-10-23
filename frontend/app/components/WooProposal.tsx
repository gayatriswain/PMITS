"use client";

import { useState } from "react";
import { Caveat } from "next/font/google";
import { motion, type Variants } from "framer-motion";
import Container from "./Container";
import { Plant } from "./WooWhyHire";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const PANEL = "#0d3b3a";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;
const MESSAGE_MAX = 1000;

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
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

const PlaneIcon = ({ size = 14, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.9)}>
    <path d="M21 3 3 10.5l7 2.5 2.5 7Z" />
    <path d="m10 13 4.5-4.5" />
  </svg>
);
const TargetIcon = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="11" cy="13" r="8" />
    <circle cx="11" cy="13" r="4" />
    <path d="M11 13 20 4M17 4h3v3" />
  </svg>
);
const RocketIcon = ({ size = 20, color = "#7f54b3" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const ShieldIcon = ({ size = 20, color = "#d97706" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3 19.5 6V11.5C19.5 16.8 16 20 12 21.5 8 20 4.5 16.8 4.5 11.5V6Z" />
    <path d="m8.7 12.2 2.2 2.1 4.4-4.8" />
  </svg>
);
const ClockIcon = ({ size = 20, color = "#2563eb" }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);
const DocIcon = ({ size = 22, color = "#5eead4" }: IconProps) => (
  <svg {...base(size, color, 1.6)}>
    <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8Z" />
    <path d="M14 3v5h5M8.5 12.5h7M8.5 16h7" />
  </svg>
);
const UserIcon = ({ size = 16, color = "#9fb9b6" }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </svg>
);
const MailIcon = ({ size = 16, color = "#9fb9b6" }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </svg>
);
const PhoneIcon = ({ size = 16, color = "#9fb9b6" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);
const PinIcon = ({ size = 16, color = "#9fb9b6" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 21s-7-6.3-7-12a7 7 0 0 1 14 0c0 5.7-7 12-7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
const PenIcon = ({ size = 16, color = "#9fb9b6" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 20l4-1L19 8a2.1 2.1 0 0 0-3-3L5 16Z" />
  </svg>
);
const SendIcon = ({ size = 20, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 1.9)}>
    <path d="M21 3 3 10.5l7 2.5 2.5 7Z" />
    <path d="m10 13 4.5-4.5" />
  </svg>
);
const ChevronIcon = ({ size = 16, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 2.4)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
const LockIcon = ({ size = 13, color = "#9fb9b6" }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <rect x="5" y="10" width="14" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);
const PeopleIcon = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M15.5 14.2c2.6.5 4.5 2.8 4.5 5.8" />
  </svg>
);
const CheckCircleIcon = ({ size = 52, color = "#5eead4" }: IconProps) => (
  <svg {...base(size, color, 1.4)}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="m7.5 12.3 3 3 6-6.3" />
  </svg>
);

const BENEFITS = [
  { Icon: TargetIcon, bg: "#e6f6f4", title: "Tailored for You", desc: "A custom strategy aligned with your goals." },
  { Icon: RocketIcon, bg: "#f1ebfa", title: "Actionable & Clear", desc: "No fluff, just a clear plan that delivers results." },
  { Icon: ShieldIcon, bg: "#fdf3e3", title: "100% Confidential", desc: "Your information is safe with us." },
  { Icon: ClockIcon, bg: "#e8f0fe", title: "Fast Response", desc: "We'll get back to you within 24 hours." },
];

/* ---------- Left illustration: clipboard, envelope, plant, plane, trusted card ---------- */
function ProposalIllustration() {
  return (
    <div className="relative h-[230px] w-full max-w-[460px]">
      {/* dashed flight path + plane */}
      <svg className="absolute right-[18%] top-0 h-[110px] w-[160px]" viewBox="0 0 160 110" fill="none" aria-hidden>
        <path d="M10 100C40 60 60 80 90 50S130 20 150 10" stroke="#94a3b8" strokeWidth="1.3" strokeDasharray="3 5" />
      </svg>
      <motion.svg
        animate={{ y: [0, -6, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[12%] -top-3 h-10 w-12"
        viewBox="0 0 48 40"
        aria-hidden
      >
        <path d="M2 20 46 2 30 38 22 26Z" fill="#fff" stroke="#94a3b8" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M22 26 46 2 18 23Z" fill="#e2e8f0" />
      </motion.svg>

      {/* ground shadow */}
      <div className="absolute bottom-2 left-6 h-8 w-[300px] rounded-[50%] bg-slate-300/40 blur-xl" />

      {/* plant */}
      <div className="absolute bottom-[34px] left-0 h-[130px] w-[90px]"><Plant /></div>

      {/* envelope */}
      <svg className="absolute bottom-3 left-[18px] h-[96px] w-[150px] drop-shadow-[0_14px_14px_rgba(13,94,86,0.3)]" viewBox="0 0 150 96" aria-hidden>
        <rect x="2" y="10" width="146" height="84" rx="8" fill="#14705f" />
        <path d="M2 18 75 62 148 18" fill="none" stroke="#0f5c56" strokeWidth="3" />
        <path d="M2 18l73 44 73-44V14a6 6 0 0 0-6-6H8a6 6 0 0 0-6 6Z" fill="#1b8a76" />
      </svg>

      {/* clipboard */}
      <motion.div
        initial={{ rotate: -14, y: 20, opacity: 0 }}
        whileInView={{ rotate: -8, y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="absolute bottom-[26px] left-[80px] h-[190px] w-[150px] rounded-2xl bg-[#e3ebf2] p-3 shadow-[0_25px_35px_-15px_rgba(15,40,60,0.45)]"
      >
        <span className="absolute -top-2 left-1/2 h-5 w-14 -translate-x-1/2 rounded-md bg-[#2f4e6a]" />
        <div className="h-full rounded-lg bg-white px-3 pt-4">
          <p className="text-center text-[12px] font-extrabold tracking-[0.12em]" style={{ color: NAVY }}>PROPOSAL</p>
          <span className="mx-auto mt-1 block h-px w-16 bg-slate-200" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="mt-3 flex items-center gap-2">
              <svg {...base(13, TEAL, 3)}><path d="m5 12 4.5 4.5L19 7" /></svg>
              <span className="h-1.5 flex-1 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      </motion.div>
      {/* pen */}
      <svg className="absolute bottom-[78px] left-[214px] h-[110px] w-[30px] rotate-[18deg]" viewBox="0 0 30 110" aria-hidden>
        <rect x="9" y="4" width="12" height="80" rx="6" fill="#2f4e6a" />
        <rect x="9" y="20" width="12" height="6" fill="#94a3b8" />
        <path d="M9 84h12l-6 18Z" fill="#cbd5e1" />
      </svg>

      {/* trusted card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
        className="absolute bottom-[10px] left-[212px] flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_22px_40px_-18px_rgba(15,40,60,0.45)] ring-1 ring-slate-100"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50"><PeopleIcon /></span>
        <div className="leading-tight">
          <p className="text-[10.5px] text-slate-500">Trusted by</p>
          <p className="text-[20px] font-extrabold" style={{ color: NAVY }}>100+</p>
          <p className="text-[10px] text-slate-500">Businesses Worldwide</p>
        </div>
        <svg className="ml-1" width="42" height="34" viewBox="0 0 42 34" fill="none" aria-hidden>
          {[[2, 22], [11, 16], [20, 12], [29, 6]].map(([x, y]) => <rect key={x} x={x} y={y} width="6" height={32 - y} rx="1" fill="#99e0d7" />)}
          <path d="M3 18 13 12l9 2 15-12" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
          <path d="M32 2h6v6" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ---------- Form ---------- */
type Fields = { firstName: string; lastName: string; email: string; phone: string; location: string; message: string };
type FieldErrors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: Fields = { firstName: "", lastName: "", email: "", phone: "", location: "", message: "" };

function validate(v: Fields): FieldErrors {
  const e: FieldErrors = {};
  if (!v.firstName.trim()) e.firstName = "Please enter your first name.";
  if (!v.lastName.trim()) e.lastName = "Please enter your last name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!v.location.trim()) e.location = "Please enter your location.";
  if (v.message.length > MESSAGE_MAX) e.message = `Please keep this under ${MESSAGE_MAX} characters.`;
  return e;
}

function Field({
  id,
  icon,
  error,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className={`relative flex items-center gap-3 rounded-xl border bg-white/[0.04] px-4 transition focus-within:bg-white/[0.07] ${
          error ? "border-red-400/80" : "border-white/15 focus-within:border-teal-300/70"
        }`}
      >
        <span className="shrink-0">{icon}</span>
        {children}
      </div>
      <p id={`${id}-err`} className="mt-1 min-h-[14px] text-[11px] text-red-300">{error}</p>
    </div>
  );
}

function ProposalForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const errors = { ...validate(values), ...serverErrors };
  const show = (k: keyof Fields) => (touched[k] ? errors[k] : undefined);

  const bind = (k: keyof Fields) => ({
    id: `wp-${k}`,
    name: k,
    value: values[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
      setServerErrors((s) => ({ ...s, [k]: undefined }));
    },
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
    "aria-invalid": !!show(k),
    "aria-describedby": `wp-${k}-err`,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, email: true, phone: true, location: true, message: true });
    if (Object.keys(validate(values)).length) return;

    const honeypot = (new FormData(e.currentTarget).get("website") as string) ?? "";
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/proposals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "hire-woocommerce-developers", website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setServerErrors(data.errors);
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setValues(EMPTY);
      setTouched({});
    } catch (err) {
      setStatus("error");
      setError(err instanceof TypeError ? "We couldn't reach our server. Please check your connection and try again." : (err as Error).message);
    }
  }

  const input = "h-[50px] w-full bg-transparent text-[14px] text-white placeholder:text-slate-300/80 outline-none";

  return (
    <div className="relative rounded-[26px] px-6 py-8 sm:px-9 sm:py-9 shadow-[0_40px_80px_-40px_rgba(5,40,40,0.8)]" style={{ backgroundColor: PANEL }}>
      {/* notch pointing toward the left column */}
      <span className="absolute -left-3 top-[42%] hidden lg:block h-7 w-7 rotate-45 rounded-[4px]" style={{ backgroundColor: PANEL }} />
      {/* dotted corner */}
      <svg className="pointer-events-none absolute right-6 top-6 opacity-30" width="60" height="40" viewBox="0 0 60 40" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => <circle key={i} cx={5 + (i % 6) * 10} cy={5 + Math.floor(i / 6) * 13} r="1.6" fill="#5eead4" />)}
      </svg>

      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-teal-300/30 bg-teal-300/10">
          <DocIcon />
        </span>
        <h3 className="mt-4 text-[24px] sm:text-[28px] font-bold text-white">Let&apos;s Build Something</h3>
        <p className={`${caveat.className} relative mx-auto -mt-1 inline-block text-[36px] sm:text-[42px] font-bold leading-tight text-teal-300`}>
          Amazing Together!
          <svg className="pointer-events-none absolute -bottom-2 left-[10%] h-3 w-[80%]" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
            <path d="M3 9C60 3 140 2 197 6" fill="none" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </p>
      </div>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-teal-300/20 bg-white/[0.04] px-6 py-12 text-center"
          role="status"
        >
          <CheckCircleIcon />
          <p className="text-[20px] font-bold text-white">Thank you! Your request is in.</p>
          <p className="max-w-sm text-[14px] text-slate-300">
            Our experts will review your details and send your free proposal within 24 hours.
          </p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-2 text-[13px] font-semibold text-teal-300 underline underline-offset-4">
            Submit another request
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-7">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
            <Field id="wp-firstName" icon={<UserIcon />} error={show("firstName")}>
              <input {...bind("firstName")} autoComplete="given-name" placeholder="First Name*" className={input} />
            </Field>
            <Field id="wp-lastName" icon={<UserIcon />} error={show("lastName")}>
              <input {...bind("lastName")} autoComplete="family-name" placeholder="Last Name*" className={input} />
            </Field>
            <Field id="wp-email" icon={<MailIcon />} error={show("email")}>
              <input {...bind("email")} type="email" autoComplete="email" placeholder="Business Email*" className={input} />
            </Field>
            <Field id="wp-phone" icon={<PhoneIcon />} error={show("phone")}>
              <input {...bind("phone")} type="tel" autoComplete="tel" placeholder="Phone Number* (with country code)" className={input} />
            </Field>
            <div className="sm:col-span-2">
              <Field id="wp-location" icon={<PinIcon />} error={show("location")}>
                <input {...bind("location")} autoComplete="address-level2" placeholder="Your Location*" className={input} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <div
                className={`relative flex gap-3 rounded-xl border bg-white/[0.04] px-4 pt-3.5 transition focus-within:bg-white/[0.07] ${
                  show("message") ? "border-red-400/80" : "border-white/15 focus-within:border-teal-300/70"
                }`}
              >
                <span className="shrink-0 pt-0.5"><PenIcon /></span>
                <textarea
                  {...bind("message")}
                  rows={4}
                  maxLength={MESSAGE_MAX}
                  placeholder="What's your biggest challenge right now? What's not working with your current digital presence?"
                  className="w-full resize-y bg-transparent pb-3 text-[14px] leading-relaxed text-white placeholder:text-slate-300/80 outline-none"
                />
              </div>
              <p id="wp-message-err" className="mt-1 min-h-[14px] text-[11px] text-red-300">{show("message")}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="h-px flex-1 border-t border-dashed border-white/20" />
            <span className={`${caveat.className} text-[19px] text-teal-200`}>No Commitment. Just Possibilities.</span>
            <span className="h-px flex-1 border-t border-dashed border-white/20" />
          </div>

          {status === "error" && (
            <p role="alert" className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-[13px] text-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group relative mt-5 flex h-[58px] w-full items-center justify-center gap-3 rounded-xl text-[15px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_18px_35px_-14px_rgba(45,212,191,0.6)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
            style={{ background: "linear-gradient(90deg, #0f766e, #14b8a6 55%, #0f766e)" }}
          >
            {status === "submitting" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending...
              </>
            ) : (
              <>
                <SendIcon />
                Send My Free Proposal
              </>
            )}
            <span className="absolute right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#0b2a2a] transition-transform group-hover:translate-x-0.5">
              <ChevronIcon />
            </span>
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-[12px] text-slate-300">
            <LockIcon /> We respect your privacy. Your information is safe with us.
          </p>
        </form>
      )}
    </div>
  );
}

export default function WooProposal() {
  return (
    <section id="free-proposal" className="relative w-full overflow-hidden bg-gradient-to-br from-white via-[#f8fbfb] to-[#f1f7f6] py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
          {/* Left */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] shadow-sm"
              style={{ color: DEEP_TEAL }}
            >
              <PlaneIcon /> Let&apos;s turn your idea into reality
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-[40px] sm:text-[50px] lg:text-[56px] font-extrabold leading-[1.05] tracking-tight"
              style={{ color: NAVY }}
            >
              Get My
              <br />
              <span style={{ color: TEAL }}>Free</span>{" "}
              <span className="relative inline-block">
                Proposal
                <svg className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
                  <path d="M3 9C60 3 140 2 197 6" fill="none" stroke={NAVY} strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 max-w-[440px] text-[15px] leading-[1.75] text-slate-600">
              Share a few details about your project and our experts will create a personalized roadmap to help your business
              grow faster.
            </motion.p>

            <ul className="mt-7 flex flex-col gap-4">
              {BENEFITS.map((b) => (
                <motion.li key={b.title} variants={fadeUp} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: b.bg }}>
                    <b.Icon />
                  </span>
                  <div>
                    <p className="text-[14.5px] font-bold" style={{ color: NAVY }}>{b.title}</p>
                    <p className="text-[12.5px] text-slate-500">{b.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={fadeUp} className="mt-8 hidden sm:block">
              <ProposalIllustration />
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <ProposalForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
