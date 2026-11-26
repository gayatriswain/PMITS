"use client";

import { useState } from "react";
import { ArrowIcon, BriefcaseIcon, ChatIcon, ChevronDownIcon, MailIcon, PhoneIcon, UserIcon } from "./icons";
import { submitEnquiry, goToThankYou } from "@/lib/forms";
import Honeypot from "@/components/cms/Honeypot";

const TEAL = "#0d9488";
const DARK = "#0b3b35";

const NEEDS = ["Website Design", "Website Development", "SEO", "E-commerce", "Digital Marketing", "Other"];

/**
 * "Free consultation" form used on the homepage hero and the location page.
 * Markup and styling match the original static forms; it now submits to the CMS (Admin → Leads).
 */
/** `extended` adds phone and message fields (contact page). */
export default function ConsultationForm({ variant, formType, extended = false }: { variant: "home" | "location"; formType: string; extended?: boolean }) {
  const home = variant === "home";
  const [form, setForm] = useState({ name: "", email: "", service: "", phone: "", message: "" });
  const [hp, setHp] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const field = home
    ? "flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-500"
    : "flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setSending(true);
    setError("");
    const r = await submitEnquiry(formType, { name: form.name, email: form.email, service: form.service, phone: form.phone || undefined, message: form.message || undefined, hp });
    setSending(false);
    if (r.ok) {
      setSent(true);
      goToThankYou("consultation");
    }
    else setError(r.error);
  };

  if (sent) {
    return (
      <div className={`${home ? "mt-5" : ""} rounded-xl bg-emerald-50 px-4 py-6 text-center`}>
        <p className="text-small font-semibold text-emerald-700">Thank you! We&apos;ve received your request.</p>
        <p className="text-caption mt-1 text-emerald-700/80">Our experts will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={`relative ${home ? "mt-5 " : ""}flex flex-col gap-3`}>
      <Honeypot value={hp} onChange={setHp} />
      <label className={field}>
        <UserIcon className={home ? "text-slate-400" : "text-teal-600"} />
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
        />
      </label>
      <label className={field}>
        <MailIcon />
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
        />
      </label>
      <label className={`${field} relative`}>
        <BriefcaseIcon />
        <select
          name="service"
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          aria-label="What do you need help with?"
          className={`w-full flex-1 cursor-pointer appearance-none bg-transparent pr-6 outline-none ${form.service ? "text-slate-700" : "text-slate-400"}`}
        >
          <option value="">What do you need help with?</option>
          {NEEDS.map((n) => (
            <option key={n} value={n} className="text-slate-700">
              {n}
            </option>
          ))}
        </select>
        <span className={`pointer-events-none absolute ${home ? "right-3" : "right-4"}`}>
          <ChevronDownIcon />
        </span>
      </label>

      {extended && (
        <>
          <label className={field}>
            <PhoneIcon />
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
          <label className={`${field} items-start`}>
            <span className="mt-0.5"><ChatIcon /></span>
            <textarea
              name="message"
              rows={4}
              maxLength={5000}
              placeholder="Tell us about your project"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
        </>
      )}

      {error && (
        <p role="alert" className="text-caption font-semibold text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className={`mt-1 flex items-center justify-center gap-2 rounded-full px-5 ${home ? "py-3" : "py-3.5"} text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70`}
        style={home ? { backgroundImage: `linear-gradient(135deg, ${TEAL}, ${DARK})` } : { backgroundColor: DARK }}
      >
        {sending ? "Sending..." : "Get Free Consultation"} <ArrowIcon />
      </button>
    </form>
  );
}
