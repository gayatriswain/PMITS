"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  Activity, ArrowRight, ArrowUpRight, BookOpen, Briefcase, CalendarDays, FileStack, FolderKanban, Inbox, Layers, LayoutGrid,
  MessageSquareQuote, PenLine, ScrollText, Sparkles, TrendingUp,
} from "lucide-react";
import { api } from "@/lib/client/api";
import { can, type Permission, type Role } from "@/lib/permissions";
import { Badge, Card, EmptyState, Spinner, fmtDate } from "./ui";

type Stats = {
  totals: Record<string, number>;
  recentLeads: { _id: string; name?: string; email: string; formType: string; source?: string; status: string; createdAt: string }[];
  recentActivity: { _id: string; userName?: string; action: string; entity: string; summary?: string; createdAt: string }[];
  series: { date: string; leads: number }[];
  byForm: { name: string; value: number }[];
  byStatus: { name: string; value: number }[];
};

const COLORS = ["#0d9488", "#0c1e3d", "#38bdf8", "#f59e0b", "#8b5cf6", "#f43f5e", "#64748b", "#22c55e"];

/** Tile colour themes: icon background + soft glow. */
const TONES = {
  teal: { icon: "bg-teal/10 text-teal", glow: "from-teal/15" },
  navy: { icon: "bg-navy/10 text-navy", glow: "from-navy/10" },
  sky: { icon: "bg-sky-100 text-sky-600", glow: "from-sky-200/40" },
  violet: { icon: "bg-violet-100 text-violet-600", glow: "from-violet-200/40" },
  amber: { icon: "bg-amber-100 text-amber-600", glow: "from-amber-200/40" },
  rose: { icon: "bg-rose-100 text-rose-600", glow: "from-rose-200/40" },
  emerald: { icon: "bg-emerald-100 text-emerald-600", glow: "from-emerald-200/40" },
  indigo: { icon: "bg-indigo-100 text-indigo-600", glow: "from-indigo-200/40" },
} as const;

/** Animated number that counts up from 0 (skipped for "reduce motion" users). */
function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setN(value), 0);
      return () => clearTimeout(t);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 900);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{n.toLocaleString("en-IN")}</>;
}

function ago(d: string) {
  const s = Math.max(0, (Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)} d ago`;
  return fmtDate(d);
}

const initials = (s: string) => s.replace(/@.*/, "").split(/[\s._-]+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "?";
const pretty = (s: string) => s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-navy px-3 py-2 text-xs text-white shadow-xl">
      <p className="text-slate-300">{label}</p>
      <p className="font-semibold">{payload[0].value} {payload[0].value === 1 ? "enquiry" : "enquiries"}</p>
    </div>
  );
}

export function Dashboard({ name, role }: { name: string; role: Role }) {
  const [s, setS] = useState<Stats | null>(null);
  const [err, setErr] = useState("");
  const [now] = useState(() => new Date());
  useEffect(() => {
    api<Stats>("/api/admin/dashboard").then(setS).catch((e) => setErr(e.message));
  }, []);

  if (err) return <EmptyState title="Could not load the dashboard" text={err} />;
  if (!s) return <Spinner />;
  const t = s.totals;
  const first = name.split(" ")[0];
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const allow = (p: Permission) => can(role, p);

  const total30 = s.series.reduce((a, d) => a + d.leads, 0);
  const last7 = s.series.slice(-7).reduce((a, d) => a + d.leads, 0);
  const prev7 = s.series.slice(-14, -7).reduce((a, d) => a + d.leads, 0);
  const statusTotal = s.byStatus.reduce((a, d) => a + d.value, 0);
  const formMax = Math.max(1, ...s.byForm.map((f) => f.value));

  const tiles: { label: string; value: number; sub: string; icon: typeof Inbox; href: string; tone: keyof typeof TONES; perm: Permission; hot?: boolean }[] = [
    { label: "Leads", value: t.leadsTotal, sub: `${t.leadsNew} new`, icon: Inbox, href: "/admin/leads", tone: "teal", perm: "leads.read", hot: t.leadsNew > 0 },
    { label: "Proposal requests", value: t.proposalsTotal, sub: `${t.proposalsNew} new`, icon: ScrollText, href: "/admin/proposals", tone: "indigo", perm: "leads.read", hot: t.proposalsNew > 0 },
    { label: "Open positions", value: t.careersOpen, sub: `${t.applicationsNew} new applications`, icon: Briefcase, href: "/admin/applications", tone: "amber", perm: "careers.applications", hot: t.applicationsNew > 0 },
    { label: "Website pages", value: t.pages, sub: `${t.pagesPublished} published · ${t.pagesPending} unpublished changes`, icon: FileStack, href: "/admin/pages", tone: "navy", perm: "pages.read" },
    { label: "Services", value: t.services, sub: "published", icon: LayoutGrid, href: "/admin/content/services", tone: "sky", perm: "content.read" },
    { label: "Blog posts", value: t.blogs, sub: `${t.blogsDraft} drafts / scheduled`, icon: BookOpen, href: "/admin/content/blogs", tone: "violet", perm: "content.read" },
    { label: "Testimonials", value: t.testimonials, sub: "published", icon: MessageSquareQuote, href: "/admin/content/testimonials", tone: "rose", perm: "content.read" },
    { label: "Portfolio projects", value: t.portfolio, sub: "published", icon: FolderKanban, href: "/admin/content/portfolio", tone: "emerald", perm: "content.read" },
  ];
  const visibleTiles = tiles.filter((x) => allow(x.perm));

  const attention = [
    t.leadsNew > 0 && allow("leads.read") && { text: `${t.leadsNew} new ${t.leadsNew === 1 ? "lead" : "leads"} waiting for a reply`, href: "/admin/leads", icon: Inbox },
    t.proposalsNew > 0 && allow("leads.read") && { text: `${t.proposalsNew} new proposal ${t.proposalsNew === 1 ? "request" : "requests"}`, href: "/admin/proposals", icon: ScrollText },
    t.applicationsNew > 0 && allow("careers.applications") && { text: `${t.applicationsNew} new job ${t.applicationsNew === 1 ? "application" : "applications"}`, href: "/admin/applications", icon: Briefcase },
    t.pagesPending > 0 && allow("pages.read") && { text: `${t.pagesPending} ${t.pagesPending === 1 ? "page has" : "pages have"} unpublished changes`, href: "/admin/pages", icon: FileStack },
  ].filter(Boolean) as { text: string; href: string; icon: typeof Inbox }[];

  const actions = [
    allow("pages.write") && { label: "Edit a page", href: "/admin/pages", icon: PenLine },
    allow("content.write") && { label: "Write a blog post", href: "/admin/content/blogs", icon: BookOpen },
    allow("pages.write") && { label: "Global sections", href: "/admin/global", icon: Layers },
    allow("leads.read") && { label: "View leads", href: "/admin/leads", icon: Inbox },
  ].filter(Boolean) as { label: string; href: string; icon: typeof Inbox }[];

  return (
    <>
      {/* ---------- welcome banner ---------- */}
      <section className="auth-rise relative mb-6 overflow-hidden rounded-3xl bg-[linear-gradient(120deg,#0c1e3d_0%,#0b3350_55%,#0b5f5a_100%)] p-6 text-white shadow-[0_24px_60px_-30px_rgba(12,30,61,0.7)] sm:p-8">
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(60%_80%_at_80%_20%,#000,transparent)]" />
        <div aria-hidden className="auth-glow absolute -right-16 -top-20 h-72 w-72 rounded-full bg-teal/40 blur-[80px]" />
        <div aria-hidden className="auth-orbit absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-dashed border-white/15">
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-teal-300 shadow-[0_0_14px_rgba(94,234,212,0.9)]" />
        </div>
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-teal-100">
              <CalendarDays className="h-3.5 w-3.5" /> {now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {greeting}, <span className="bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-transparent">{first}</span> 👋
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              {attention.length
                ? `You have ${attention.length} ${attention.length === 1 ? "thing" : "things"} to look at today. Everything else is up to date.`
                : "All caught up - no new enquiries or unpublished changes right now."}
            </p>
          </div>
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {actions.map((a) => (
                <Link key={a.label} href={a.href} className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-sm font-medium backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20">
                  <a.icon className="h-4 w-4 text-teal-200" /> {a.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- needs attention ---------- */}
      {attention.length > 0 && (
        <div className="auth-rise mb-6 grid gap-3 [animation-delay:80ms] sm:grid-cols-2 xl:grid-cols-4">
          {attention.map((a) => (
            <Link key={a.text} href={a.href} className="group flex items-center gap-3 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-white px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
                <a.icon className="h-4 w-4" />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-ping rounded-full bg-amber-400" />
              </span>
              <span className="flex-1 text-sm font-medium text-slate-800">{a.text}</span>
              <ArrowRight className="h-4 w-4 text-amber-600 transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      )}

      {/* ---------- tiles ---------- */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {visibleTiles.map((x, i) => (
          <Link
            key={x.label}
            href={x.href}
            style={{ animationDelay: `${120 + i * 60}ms` }}
            className="auth-rise group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]"
          >
            <div aria-hidden className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${TONES[x.tone].glow} to-transparent opacity-0 blur-2xl transition group-hover:opacity-100`} />
            <div className="relative flex items-start justify-between">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${TONES[x.tone].icon}`}>
                <x.icon className="h-5 w-5" />
              </span>
              {x.hot ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-teal px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  <Sparkles className="h-3 w-3" /> New
                </span>
              ) : (
                <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-slate-500" />
              )}
            </div>
            <p className="relative mt-4 text-3xl font-bold tracking-tight text-slate-900">
              <CountUp value={x.value ?? 0} />
            </p>
            <p className="relative mt-0.5 text-sm font-semibold text-slate-700">{x.label}</p>
            <p className="relative mt-1 text-xs text-slate-500">{x.sub}</p>
          </Link>
        ))}
      </div>

      {allow("leads.read") && (
        <>
          {/* ---------- charts ---------- */}
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            <Card
              title={<span className="inline-flex items-center gap-2"><TrendingUp className="h-4 w-4 text-teal" /> Enquiries – last 30 days</span>}
              className="xl:col-span-2"
              actions={
                <span className="flex items-center gap-4 text-xs">
                  <span className="text-slate-500">30 days <b className="ml-1 text-base text-slate-900">{total30}</b></span>
                  <span className="text-slate-500">
                    This week <b className="ml-1 text-base text-slate-900">{last7}</b>
                    {last7 !== prev7 && (
                      <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${last7 > prev7 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"}`}>
                        {last7 > prev7 ? "▲" : "▼"} vs last week
                      </span>
                    )}
                  </span>
                </span>
              }
            >
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={s.series} margin={{ left: -20, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#0d9488" stopOpacity={0.35} />
                        <stop offset="1" stopColor="#0d9488" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke="#eef2f7" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} interval={4} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#0d9488", strokeDasharray: "4 4" }} />
                    <Area type="monotone" dataKey="leads" stroke="#0d9488" strokeWidth={2.5} fill="url(#lg)" activeDot={{ r: 5, fill: "#0d9488", stroke: "#fff", strokeWidth: 2 }} animationDuration={1200} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card title="Leads by status">
              {s.byStatus.length === 0 ? (
                <EmptyState title="No leads yet" text="Enquiries from website forms will appear here." />
              ) : (
                <>
                  <div className="relative h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={s.byStatus} dataKey="value" nameKey="name" innerRadius={58} outerRadius={82} paddingAngle={3} cornerRadius={6} stroke="none" animationDuration={1000}>
                          {s.byStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                      <div>
                        <p className="text-2xl font-bold text-slate-900">{statusTotal}</p>
                        <p className="text-[11px] text-slate-500">total leads</p>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {s.byStatus.map((d, i) => (
                      <li key={d.name} className="flex items-center gap-2 text-sm">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="flex-1 text-slate-600">{pretty(d.name)}</span>
                        <b className="text-slate-900">{d.value}</b>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Card>
          </div>

          {/* ---------- recent + by form ---------- */}
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            <Card title="Recent enquiries" className="xl:col-span-2" actions={<Link href="/admin/leads" className="inline-flex items-center gap-1 text-xs font-semibold text-teal hover:underline">View all <ArrowRight className="h-3.5 w-3.5" /></Link>}>
              {s.recentLeads.length === 0 ? (
                <EmptyState icon={<Inbox className="h-6 w-6" />} title="No enquiries yet" />
              ) : (
                <ul className="-mx-2 -my-1 space-y-1">
                  {s.recentLeads.map((l, i) => (
                    <li key={l._id}>
                      <Link href={`/admin/leads/${l._id}`} className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-slate-50">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white" style={{ background: COLORS[i % COLORS.length] }}>
                          {initials(l.name || l.email)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-800 group-hover:text-teal">{l.name || l.email}</p>
                          <p className="truncate text-xs text-slate-500">{pretty(l.formType)}{l.source ? ` · ${l.source}` : ""}</p>
                        </div>
                        <Badge value={l.status} />
                        <span className="hidden w-24 text-right text-xs text-slate-400 sm:block" title={fmtDate(l.createdAt, true)}>{ago(l.createdAt)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
            <Card title="Leads by form">
              {s.byForm.length === 0 ? (
                <EmptyState title="No data yet" />
              ) : (
                <ul className="space-y-3.5">
                  {s.byForm.map((f, i) => (
                    <li key={f.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="truncate text-slate-600">{pretty(f.name)}</span>
                        <b className="text-slate-900">{f.value}</b>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="auth-grow h-full rounded-full" style={{ width: `${(f.value / formMax) * 100}%`, background: COLORS[i % COLORS.length], animationDelay: `${i * 80}ms` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </>
      )}

      {/* ---------- activity ---------- */}
      {allow("activity.read") && (
        <Card title={<span className="inline-flex items-center gap-2"><Activity className="h-4 w-4 text-teal" /> Recent activity</span>} className="mt-6" actions={<Link href="/admin/activity" className="inline-flex items-center gap-1 text-xs font-semibold text-teal hover:underline">Full log <ArrowRight className="h-3.5 w-3.5" /></Link>}>
          {s.recentActivity.length === 0 ? (
            <EmptyState title="No activity yet" />
          ) : (
            <ol className="relative space-y-4 before:absolute before:bottom-1 before:left-[15px] before:top-1 before:w-px before:bg-slate-200">
              {s.recentActivity.map((a) => (
                <li key={a._id} className="relative flex items-start gap-3 text-sm">
                  <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[10px] font-bold text-teal ring-2 ring-teal/20">
                    {initials(a.userName ?? "System")}
                  </span>
                  <div className="min-w-0 flex-1 pt-1">
                    <p className="text-slate-700">
                      <b className="font-semibold text-slate-900">{a.userName ?? "System"}</b> · {a.summary ?? `${a.action} ${a.entity}`}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">{ago(a.createdAt)} · {a.entity}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Card>
      )}
    </>
  );
}
