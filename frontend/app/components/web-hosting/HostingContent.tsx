"use client";

import Link from "next/link";
import Container from "../shared/Container";
import { BoltIcon, ArrowIcon, CheckIcon, CloudIcon, BrowserCheckIcon, ShieldLockIcon, ShieldCheckIcon, GaugeIcon, HeadsetIcon, CloudUploadIcon, LockIcon, UsersIcon } from "../shared/icons";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";

const TEAL = "#0d9488";

const DARK = "#0b3b35";

const trustPoints__cms = ["No Hidden Fees", "Cancel Anytime", "30-Day Money-Back Guarantee"];

const floatingCards__cms = [
  {
    icon: BrowserCheckIcon,
    iconColor: TEAL,
    label: "YOUR WEBSITE",
    labelColor: TEAL,
    title: "Online",
    dot: "#16a34a",
    sub: "Always Available",
    className: "right-6 top-[14%]",
  },
  {
    icon: GaugeIcon,
    iconColor: TEAL,
    label: "FAST DELIVERY",
    labelColor: TEAL,
    title: "98–100% Uptime*",
    sub: "High Performance",
    className: "right-6 top-[38%]",
  },
  {
    icon: ShieldLockIcon,
    iconColor: NAVY,
    label: "SECURED",
    labelColor: NAVY,
    title: "SSL · Firewall Backups",
    sub: "Your Data, Protected",
    className: "right-6 top-[62%]",
  },
  {
    icon: UsersIcon,
    iconColor: TEAL,
    label: "READY FOR VISITORS",
    labelColor: TEAL,
    title: "Always On",
    sub: "Built for Every Visitor",
    className: "right-6 top-[86%]",
  },
];

const stats__cms = [
  { icon: ShieldCheckIcon, value: "99.9%", title: "Uptime Commitment", sub: "Your site. Always on." },
  { icon: HeadsetIcon, value: "24/7", title: "Expert Support", sub: "Real people. Real help." },
  { icon: CloudUploadIcon, value: "Daily", title: "Backups", sub: "Restore anytime." },
  { icon: LockIcon, value: "Secure", title: "By Design", sub: "Protection at every layer." },
];

/** Moved out of app/hosting/page.tsx so its content can be edited in the CMS (markup unchanged). */
export default function HostingContent() {
  const $t = useCmsText();
  const trustPoints = useCmsData("HostingContent__trustPoints", trustPoints__cms);
  const floatingCards = useCmsData("HostingContent__floatingCards", floatingCards__cms);
  const stats = useCmsData("HostingContent__stats", stats__cms);
  return (
    <section className="relative overflow-hidden">
      <div
        className="hero-banner relative bg-cover bg-no-repeat"
        style={{ backgroundImage: "url(/web-hosting-banner.webp)", backgroundPosition: "8% center" }}
      >
        <style>{`
          @media (min-width: 1024px) {
            .hero-banner { background-position: 92% center; }
          }
        `}</style>
      <Container className="relative grid grid-cols-1 gap-14 pb-16 pt-14 lg:min-h-[620px] lg:grid-cols-2 lg:items-center lg:pb-24 lg:pt-20">
        {/* Left column */}
        <div className="lg:max-w-md">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide"
          style={{ borderColor: "rgba(13,148,136,0.3)", color: TEAL, backgroundColor: "#e6f6f4" }}
        >
          <CloudIcon /> {$t("HostingContent__t2", "WEBSITE HOSTING ")}<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>

        <h1 className="text-h1 mt-5 font-bold" style={{ color: NAVY }}>
          {$t("HostingContent__t3", "Fast Hosting.")}<br />
          <span style={{ color: TEAL }}>{$t("HostingContent__t4", "Zero Hosting Headaches.")}</span>
        </h1>

        <p className="text-body mt-5 max-w-lg text-slate-600">
          {rich($t("HostingContent__t5", "Reliable, secure, and high-performance hosting built to keep your website online, fast, and ready for every visitor."))}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={$t("HostingContent__t6", "/contact")}
            className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: DARK }}
          >
            <BoltIcon /> {$t("HostingContent__t7", "Get My Hosting Plan ")}<ArrowIcon />
          </Link>
          <Link
            href={$t("HostingContent__t8", "/contact")}
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
          >
            {$t("HostingContent__t9", "Talk to an Expert")}</Link>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
          {trustPoints.map((point) => (
            <span key={point} className="flex items-center gap-1.5">
              <CheckIcon className="text-teal-600" /> {point}
            </span>
          ))}
        </div>
        </div>

        {/* Right column: kept empty so text stays on the left half; the illustration lives in the section background */}
        <div aria-hidden="true" className="hidden lg:block" />

        {/* Floating cards + dashed connector, bounded by the same global container as the rest of the site */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          role="img"
          aria-label="Website hosting dashboard on a laptop next to a secure server rack"
        >
          <div
            className="absolute right-[228px] top-[14%] h-[72%] border-l-2 border-dashed"
            style={{ borderColor: "rgba(13,148,136,0.35)" }}
          >
            {[0, 33.33, 66.66, 100].map((pos) => (
              <span
                key={pos}
                className="absolute -left-[5px] h-2.5 w-2.5 rounded-full"
                style={{ top: `${pos}%`, backgroundColor: TEAL, transform: "translateY(-50%)" }}
              />
            ))}
          </div>

          {floatingCards.map(({ icon: Icon, iconColor, label, labelColor, title, dot, sub, className }) => (
            <div
              key={label}
              className={`absolute flex w-52 -translate-y-1/2 items-start gap-3 rounded-2xl bg-white p-4 shadow-lg ${className}`}
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm"
                style={{ backgroundColor: "#f0faf9", color: iconColor }}
              >
                <Icon />
              </span>
              <span>
                <span className="block text-[10px] font-bold tracking-wide" style={{ color: labelColor }}>
                  {label}
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-sm font-bold leading-snug" style={{ color: NAVY }}>
                  {dot && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: dot }} />}
                  {title}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">{sub}</span>
              </span>
            </div>
          ))}
        </div>


        
      </Container>
      </div>

      {/* Stats bar */}
      <Container className="relative pb-14 lg:pb-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 rounded-2xl bg-white p-8 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)] sm:grid-cols-4 lg:p-10">
          {stats.map(({ icon: Icon, value, title, sub }) => (
            <div key={title} className="flex items-start gap-4">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#e6f6f4", color: TEAL }}
              >
                <Icon />
              </span>
              <div>
                <p className="text-body font-bold" style={{ color: NAVY }}>
                  {value}
                </p>
                <p className="text-small font-semibold" style={{ color: NAVY }}>
                  {title}
                </p>
                <p className="text-caption text-slate-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
