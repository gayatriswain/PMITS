"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bot,
  Cake,
  Code,
  Code2,
  Cpu,
  Film,
  Glasses,
  Globe,
  Hexagon,
  LayoutDashboard,
  MapPin,
  Package,
  PenTool,
  Server,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
type Tone = "teal" | "indigo" | "amber" | "rose";

export type ServiceItem = {
  label: string;
  href: string;
  desc: string;
  icon: LucideIcon;
  badge?: string;
};

export type ServiceGroup = {
  title: string;
  blurb: string;
  tone: Tone;
  items: ServiceItem[];
};

// Tailwind needs full class names, so each tone is spelled out.
const TONES: Record<Tone, { dot: string; line: string; tile: string; hover: string; text: string }> = {
  teal: {
    dot: "bg-teal-500",
    line: "from-teal-200",
    tile: "bg-teal-50 text-teal-700",
    hover: "group-hover:bg-teal-600 group-hover:text-white",
    text: "text-teal-700",
  },
  indigo: {
    dot: "bg-indigo-500",
    line: "from-indigo-200",
    tile: "bg-indigo-50 text-indigo-700",
    hover: "group-hover:bg-indigo-600 group-hover:text-white",
    text: "text-indigo-700",
  },
  amber: {
    dot: "bg-amber-500",
    line: "from-amber-200",
    tile: "bg-amber-50 text-amber-700",
    hover: "group-hover:bg-amber-500 group-hover:text-white",
    text: "text-amber-700",
  },
  rose: {
    dot: "bg-rose-500",
    line: "from-rose-200",
    tile: "bg-rose-50 text-rose-700",
    hover: "group-hover:bg-rose-600 group-hover:text-white",
    text: "text-rose-700",
  },
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: "Web & Software",
    blurb: "Build it right",
    tone: "teal",
    items: [
      { label: "Website Development", href: "/web-software/website-development", desc: "Fast, secure business websites", icon: Globe },
      { label: "App Development", href: "/web-software/app-development", desc: "iOS, Android & cross-platform apps", icon: Smartphone },
      { label: "Custom Development", href: "/web-software/custom-development", desc: "Tailor-made web software", icon: Code2 },
      { label: "Custom CRM Solution", href: "/web-software/custom-crm-solution", desc: "CRM built around your sales flow", icon: LayoutDashboard },
      { label: "Shopify Web Design", href: "/web-software/shopify-web-design", desc: "Online stores that convert", icon: ShoppingBag },
      { label: "Web Hosting", href: "/web-software/web-hosting", desc: "Reliable, secure hosting", icon: Server },
    ],
  },
  {
    title: "Design & Innovation",
    blurb: "Stand out",
    tone: "indigo",
    items: [
      { label: "UI/UX Design", href: "/design-innovation/ui-ux-design", desc: "Interfaces people love to use", icon: PenTool },
      { label: "Animation & Graphic Design", href: "/design-innovation/animation-and-graphic-design", desc: "Motion and brand visuals", icon: Film },
      { label: "Custom AR/VR Solution", href: "/design-innovation/custom-ar-vr-solution", desc: "Immersive 3D experiences", icon: Glasses },
      { label: "Custom Agentic AI Solution", href: "/design-innovation/custom-agentic-ai-solution", desc: "Autonomous AI workflows", icon: Bot, badge: "AI" },
    ],
  },
  {
    title: "Marketing & Growth",
    blurb: "Get found",
    tone: "amber",
    items: [
      { label: "Digital Marketing", href: "/marketing-growth/digital-marketing", desc: "Full-funnel growth campaigns", icon: TrendingUp },
      { label: "Social Media Marketing", href: "/marketing-growth/social-media-marketing", desc: "Content that builds community", icon: Share2 },
      { label: "Google Ads", href: "/marketing-growth/google-ads", desc: "High-intent paid traffic", icon: Target },
      { label: "AI SEO", href: "/marketing-growth/ai-seo", desc: "Rank in search and AI answers", icon: Sparkles, badge: "New" },
      { label: "E-commerce SEO", href: "/marketing-growth/ecommerce-seo", desc: "More organic sales for stores", icon: ShoppingCart },
      { label: "Local SEO", href: "/marketing-growth/local-seo", desc: "Get found by nearby customers", icon: MapPin, badge: "New" },
    ],
  },
  {
    title: "Hire Developers",
    blurb: "Scale your team",
    tone: "rose",
    items: [
      { label: "Hire WooCommerce Developers", href: "/hire-developer/hire-woocommerce-developers", desc: "Store experts on demand", icon: Store },
      { label: "Hire Core PHP Developers", href: "/hire-developer/hire-core-php-developers", desc: "Clean, scalable PHP", icon: Code },
      { label: "Hire CakePHP Developers", href: "/hire-developer/hire-cakephp-developers", desc: "Secure CakePHP applications", icon: Cake },
      { label: "Hire ASP.NET Developers", href: "/hire-developer/hire-aspnet-developers", desc: "Enterprise-grade .NET apps", icon: Cpu, badge: "New" },
      { label: "Hire Shopify Developers", href: "/hire-developer/hire-shopify-developers", desc: "Custom Shopify builds", icon: ShoppingBag },
      { label: "Hire Magento Developers", href: "/hire-developer/hire-magento-developers", desc: "Scalable Magento stores", icon: Hexagon },
      { label: "Hire BigCommerce Developers", href: "/hire-developer/hire-bigcommerce-developers", desc: "BigCommerce builds that grow", icon: Package },
    ],
  },
];

/** Flat list (kept for anything that still needs a plain array of links). */
export const SERVICE_LINKS = SERVICE_GROUPS.flatMap((g) => g.items.map(({ label, href }) => ({ label, href })));

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-1.5 inline-flex items-center rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-1.5 py-[1px] align-middle text-[9px] font-bold uppercase leading-4 tracking-wide text-white">
      {children}
    </span>
  );
}

function ItemTile({ icon: Icon, tone, size = "md" }: { icon: LucideIcon; tone: Tone; size?: "md" | "sm" }) {
  const t = TONES[tone];
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md ${t.tile} ${t.hover} ${
        size === "md" ? "h-9 w-9" : "h-9 w-9"
      }`}
    >
      <Icon className="h-4 w-4" strokeWidth={1.9} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop mega panel                                                 */
/* ------------------------------------------------------------------ */
export function ServicesMegaPanel({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <div className="p-4">
      <div className="grid grid-flow-col auto-cols-[220px] gap-x-3 xl:auto-cols-[244px]">
        {SERVICE_GROUPS.map((g, gi) => {
          const t = TONES[g.tone];
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.04 + gi * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-1.5 px-2">
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-800">{g.title}</h3>
                </div>
                <div className={`mt-1.5 h-px w-full bg-gradient-to-r ${t.line} to-transparent`} />
              </div>

              <ul>
                {g.items.map((it) => {
                  const active = pathname === it.href;
                  return (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        onClick={onNavigate}
                        className={`group flex items-start gap-2.5 rounded-xl p-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 ${
                          active ? "bg-zinc-50" : "hover:bg-zinc-50"
                        }`}
                      >
                        <ItemTile icon={it.icon} tone={g.tone} />
                        <span className="min-w-0 flex-1">
                          <span className={`block text-[13.5px] font-semibold leading-snug transition-colors ${active ? t.text : "text-zinc-800 group-hover:text-teal-700"}`}>
                            {it.label}
                            {it.badge && <Badge>{it.badge}</Badge>}
                          </span>
                          <span className="mt-px block text-[11px] leading-snug text-zinc-500">{it.desc}</span>
                        </span>
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 -translate-x-1 text-teal-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* bottom call-to-action strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="relative mt-3 overflow-hidden rounded-xl bg-[linear-gradient(110deg,#0b3b35_0%,#0f5d57_60%,#12766f_100%)] px-5 py-3 text-white"
      >
        <span aria-hidden className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-teal-300/20 blur-2xl" />
        <span aria-hidden className="pointer-events-none absolute left-1/3 top-0 h-full w-px rotate-12 bg-white/10" />
        <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
              <BadgeCheck className="h-[18px] w-[18px] text-teal-200" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[14px] font-semibold leading-tight">Not sure which service fits?</p>
              <p className="mt-0.5 text-[12px] text-white/70">Get a free 30-minute consultation with our experts.</p>
            </div>
          </div>

          <div className="hidden items-center gap-5 text-[12px] text-white/80 xl:flex">
            <span className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" /> 4.9/5 rating
            </span>
            <span className="h-4 w-px bg-white/20" />
            <span>200+ happy clients</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              onClick={onNavigate}
              className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#0b3b35] transition-transform hover:-translate-y-0.5"
            >
              Talk to an Expert
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/quote"
              onClick={onNavigate}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile / tablet list (inside the hamburger menu)                   */
/* ------------------------------------------------------------------ */
export function ServicesMobileList({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <div className="space-y-5 pb-2 pl-1 pr-1 pt-2">
      {SERVICE_GROUPS.map((g) => {
        const t = TONES[g.tone];
        return (
          <div key={g.title}>
            <div className="mb-2 flex items-center gap-2 px-1">
              <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
              <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-800">{g.title}</h3>
              <span className={`h-px flex-1 bg-gradient-to-r ${t.line} to-transparent`} />
            </div>
            <ul className="grid gap-1 sm:grid-cols-2">
              {g.items.map((it) => {
                const active = pathname === it.href;
                return (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      onClick={onNavigate}
                      className={`group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors ${active ? "bg-zinc-50" : "active:bg-zinc-50 hover:bg-zinc-50"}`}
                    >
                      <ItemTile icon={it.icon} tone={g.tone} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[13.5px] font-semibold leading-snug ${active ? t.text : "text-zinc-800"}`}>
                          {it.label}
                          {it.badge && <Badge>{it.badge}</Badge>}
                        </span>
                        <span className="block truncate text-[11.5px] text-zinc-500">{it.desc}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <Link
        href="/contact"
        onClick={onNavigate}
        className="flex items-center justify-between gap-3 rounded-2xl bg-[linear-gradient(110deg,#0b3b35,#12766f)] px-4 py-3 text-white"
      >
        <span>
          <span className="block text-[13.5px] font-semibold">Not sure which service fits?</span>
          <span className="block text-[11.5px] text-white/70">Free 30-minute consultation</span>
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#0b3b35]">
          <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </div>
  );
}
