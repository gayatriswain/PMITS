"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BookOpen, Briefcase, FileStack, FolderKanban, Inbox, LayoutGrid, MessageSquareQuote, ScrollText } from "lucide-react";
import { api } from "@/lib/client/api";
import { Badge, Card, EmptyState, PageHeader, Spinner, fmtDate } from "./ui";

type Stats = {
  totals: Record<string, number>;
  recentLeads: { _id: string; name?: string; email: string; formType: string; source?: string; status: string; createdAt: string }[];
  recentActivity: { _id: string; userName?: string; action: string; entity: string; summary?: string; createdAt: string }[];
  series: { date: string; leads: number }[];
  byForm: { name: string; value: number }[];
  byStatus: { name: string; value: number }[];
};

const COLORS = ["#0d9488", "#0c1e3d", "#38bdf8", "#f59e0b", "#8b5cf6", "#f43f5e", "#64748b", "#22c55e"];

export function Dashboard({ name }: { name: string }) {
  const [s, setS] = useState<Stats | null>(null);
  const [err, setErr] = useState("");
  useEffect(() => {
    api<Stats>("/api/admin/dashboard").then(setS).catch((e) => setErr(e.message));
  }, []);

  if (err) return <EmptyState title="Could not load the dashboard" text={err} />;
  if (!s) return <Spinner />;
  const t = s.totals;
  const tiles = [
    { label: "Website pages", value: t.pages, sub: `${t.pagesPublished} published · ${t.pagesPending} with unpublished changes`, icon: FileStack, href: "/admin/pages" },
    { label: "Services", value: t.services, sub: "published", icon: LayoutGrid, href: "/admin/content/services" },
    { label: "Blog posts", value: t.blogs, sub: `${t.blogsDraft} drafts / scheduled`, icon: BookOpen, href: "/admin/content/blogs" },
    { label: "Testimonials", value: t.testimonials, sub: "published", icon: MessageSquareQuote, href: "/admin/content/testimonials" },
    { label: "Portfolio projects", value: t.portfolio, sub: "published", icon: FolderKanban, href: "/admin/content/portfolio" },
    { label: "Open positions", value: t.careersOpen, sub: `${t.applicationsNew} new applications`, icon: Briefcase, href: "/admin/content/careers" },
    { label: "Leads", value: t.leadsTotal, sub: `${t.leadsNew} new`, icon: Inbox, href: "/admin/leads", accent: t.leadsNew > 0 },
    { label: "Proposal requests", value: t.proposalsTotal, sub: `${t.proposalsNew} new`, icon: ScrollText, href: "/admin/proposals", accent: t.proposalsNew > 0 },
  ];

  return (
    <>
      <PageHeader title={`Welcome back, ${name.split(" ")[0]}`} description="Live overview of the website content and enquiries." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((x) => (
          <Link key={x.label} href={x.href} className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-teal/40 hover:shadow-sm">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-500">{x.label}</p>
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${x.accent ? "bg-teal text-white" : "bg-slate-100 text-slate-500 group-hover:bg-teal/10 group-hover:text-teal"}`}>
                <x.icon className="h-4.5 w-4.5" />
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{x.value}</p>
            <p className="mt-0.5 text-xs text-slate-500">{x.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card title="Enquiries – last 30 days" className="xl:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={s.series} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#0d9488" stopOpacity={0.3} />
                    <stop offset="1" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} interval={4} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip />
                <Area type="monotone" dataKey="leads" stroke="#0d9488" strokeWidth={2} fill="url(#lg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Leads by status">
          {s.byStatus.length === 0 ? (
            <EmptyState title="No leads yet" text="Enquiries from website forms will appear here." />
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={s.byStatus} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                    {s.byStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card title="Recent enquiries" className="xl:col-span-2" actions={<Link href="/admin/leads" className="text-xs font-medium text-teal hover:underline">View all</Link>}>
          {s.recentLeads.length === 0 ? (
            <EmptyState icon={<Inbox className="h-6 w-6" />} title="No enquiries yet" />
          ) : (
            <ul className="-my-2 divide-y divide-slate-100">
              {s.recentLeads.map((l) => (
                <li key={l._id}>
                  <Link href={`/admin/leads/${l._id}`} className="flex items-center gap-3 py-2.5 hover:bg-slate-50/60">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800">{l.name || l.email}</p>
                      <p className="truncate text-xs text-slate-500">{l.formType}{l.source ? ` · ${l.source}` : ""}</p>
                    </div>
                    <Badge value={l.status} />
                    <span className="hidden w-28 text-right text-xs text-slate-400 sm:block">{fmtDate(l.createdAt, true)}</span>
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
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={s.byForm} layout="vertical" margin={{ left: 10, right: 10 }}>
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11, fill: "#475569" }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0c1e3d" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      <Card title="Recent activity" className="mt-6">
        {s.recentActivity.length === 0 ? (
          <EmptyState title="No activity yet" />
        ) : (
          <ul className="-my-2 divide-y divide-slate-100">
            {s.recentActivity.map((a) => (
              <li key={a._id} className="flex items-start gap-3 py-2.5 text-sm">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
                <p className="flex-1 text-slate-700">
                  <b className="font-medium">{a.userName ?? "System"}</b> · {a.summary ?? `${a.action} ${a.entity}`}
                </p>
                <span className="shrink-0 text-xs text-slate-400">{fmtDate(a.createdAt, true)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
