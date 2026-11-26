"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown, Eye, FilePen, Globe2, KeyRound, LogIn, LogOut, MapPin, Monitor, Plus, Send, Trash2, Upload, type LucideIcon,
} from "lucide-react";
import { api, qs } from "@/lib/client/api";
import { Card, EmptyState, PageHeader, Pagination, PerPage, SearchInput, Select, Spinner, fmtDate, usePerPage } from "./ui";

type Item = {
  _id: string;
  userName?: string;
  user?: string;
  action: string;
  entity: string;
  summary?: string;
  createdAt: string;
  ip?: string;
  location?: string;
  device?: string;
  path?: string;
  changes?: { field: string; before?: string; after?: string }[];
};
type Data = { items: Item[]; total: number; pages: number; users: { _id: string; name: string }[] };

const ACTIONS: Record<string, { icon: LucideIcon; cls: string; label: string }> = {
  login: { icon: LogIn, cls: "bg-emerald-50 text-emerald-600 ring-emerald-200", label: "Signed in" },
  logout: { icon: LogOut, cls: "bg-slate-100 text-slate-500 ring-slate-200", label: "Signed out" },
  view: { icon: Eye, cls: "bg-sky-50 text-sky-600 ring-sky-200", label: "Opened" },
  create: { icon: Plus, cls: "bg-teal-50 text-teal-600 ring-teal-200", label: "Created" },
  update: { icon: FilePen, cls: "bg-amber-50 text-amber-600 ring-amber-200", label: "Updated" },
  "save-draft": { icon: FilePen, cls: "bg-amber-50 text-amber-600 ring-amber-200", label: "Saved draft" },
  publish: { icon: Send, cls: "bg-teal-50 text-teal-700 ring-teal-200", label: "Published" },
  unpublish: { icon: Globe2, cls: "bg-slate-100 text-slate-600 ring-slate-200", label: "Unpublished" },
  delete: { icon: Trash2, cls: "bg-rose-50 text-rose-600 ring-rose-200", label: "Deleted" },
  upload: { icon: Upload, cls: "bg-violet-50 text-violet-600 ring-violet-200", label: "Uploaded" },
  "reset-password": { icon: KeyRound, cls: "bg-indigo-50 text-indigo-600 ring-indigo-200", label: "Password" },
  "change-password": { icon: KeyRound, cls: "bg-indigo-50 text-indigo-600 ring-indigo-200", label: "Password" },
};
const actionOf = (a: string) => ACTIONS[a] ?? { icon: FilePen, cls: "bg-slate-100 text-slate-600 ring-slate-200", label: a.replace(/-/g, " ") };

const AREAS = ["pages", "services", "blogs", "testimonials", "portfolio", "careers", "team", "media", "navigation", "settings", "leads", "proposals", "applications", "users"];

function ago(d: string) {
  const s = Math.max(0, (Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)} d ago`;
  return fmtDate(d);
}

function Row({ a }: { a: Item }) {
  const [open, setOpen] = useState(false);
  const act = actionOf(a.action);
  const n = a.changes?.length ?? 0;
  const light = a.action === "view";
  return (
    <li className={`px-4 py-3.5 sm:px-6 ${light ? "bg-slate-50/40" : ""}`}>
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ring-1 ring-inset ${act.cls}`}>
          <act.icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className={`text-sm ${light ? "text-slate-500" : "text-slate-700"}`}>
            <b className="font-semibold text-slate-900">{a.userName ?? "System"}</b> · {a.summary ?? act.label}
            {a.path && <span className="ml-1.5 font-mono text-[11px] text-slate-400">{a.path}</span>}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
            <span title={fmtDate(a.createdAt, true)}>{ago(a.createdAt)} · {fmtDate(a.createdAt, true)}</span>
            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-medium capitalize text-slate-500">{a.entity}</span>
            {a.location && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {a.location}</span>}
            {a.ip && <span className="font-mono">IP {a.ip}</span>}
            {a.device && <span className="inline-flex items-center gap-1"><Monitor className="h-3 w-3" /> {a.device}</span>}
          </p>
          {n > 0 && (
            <button type="button" onClick={() => setOpen((o) => !o)} className="mt-2 inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200 transition hover:bg-amber-100">
              {n} {n === 1 ? "change" : "changes"} <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
            </button>
          )}
          {open && n > 0 && (
            <div className="mt-2 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-left text-slate-500">
                  <tr><th className="px-3 py-2 font-semibold">What</th><th className="px-3 py-2 font-semibold">Before</th><th className="px-3 py-2 font-semibold">After</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {a.changes!.map((c, i) => (
                    <tr key={i} className="align-top">
                      <td className="px-3 py-2 font-medium text-slate-700">{c.field}</td>
                      <td className="px-3 py-2 text-rose-600 line-through decoration-rose-300">{c.before || <span className="text-slate-300 no-underline">empty</span>}</td>
                      <td className="px-3 py-2 text-emerald-700">{c.after || <span className="text-slate-300">empty</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

/** Audit log: who did what, from where (IP, location, device), what exactly changed, and which screens they opened. */
export function ActivityLog() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = usePerPage("activity", 25);
  const [entity, setEntity] = useState("");
  // default: everything, including which admin screens were opened
  const [kind, setKind] = useState("all");
  const [user, setUser] = useState("");
  const [q, setQ] = useState("");
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    api<Data>(`/api/admin/activity${qs({ page, limit, entity, kind, user, q })}`).then(setData).catch(() => setData({ items: [], total: 0, pages: 1, users: [] }));
  }, [page, limit, entity, kind, user, q]);
  const reset = (fn: (v: string) => void) => (v: string) => { fn(v); setPage(1); };

  return (
    <>
      <PageHeader title="Activity log" description="Who did what, when and from where - including exactly what changed and which admin screens were opened." crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Activity" }]} />
      <Card className="overflow-hidden [&>div]:p-0">
        <div className="flex flex-col gap-2 border-b border-slate-100 bg-slate-50/50 p-4 lg:flex-row lg:flex-wrap">
          <SearchInput value={q} onChange={reset(setQ)} placeholder="Search text, field or IP…" />
          <Select
            label="Type"
            value={kind}
            onChange={reset(setKind)}
            options={[
              { value: "all", label: "Everything (incl. pages opened)" },
              { value: "", label: "Without page visits" },
              { value: "changes", label: "Changes only" },
              { value: "auth", label: "Sign-ins & passwords" },
              { value: "visits", label: "Pages opened only" },
            ]}
          />
          <Select label="User" value={user} onChange={reset(setUser)} options={[{ value: "", label: "All users" }, ...(data?.users ?? []).map((u) => ({ value: u._id, label: u.name }))]} />
          <Select label="Area" value={entity} onChange={reset(setEntity)} options={[{ value: "", label: "All areas" }, ...AREAS.map((x) => ({ value: x, label: x[0].toUpperCase() + x.slice(1) }))]} />
          <PerPage value={limit} onChange={(n) => { setLimit(n); setPage(1); }} />
        </div>
        {!data ? (
          <Spinner />
        ) : data.items.length === 0 ? (
          <EmptyState title="No activity" text="Nothing matches these filters." />
        ) : (
          <ul className="divide-y divide-slate-100">{data.items.map((a) => <Row key={a._id} a={a} />)}</ul>
        )}
        {data && <Pagination page={page} pages={data.pages} total={data.total} onPage={setPage} limit={limit} onLimit={(n) => { setLimit(n); setPage(1); }} />}
      </Card>
      <p className="mt-3 text-xs text-slate-400">
        Location comes from the hosting provider once the site is live (on this computer it shows &quot;This network&quot;). Entries made before this update have no IP, location or change details.
      </p>
    </>
  );
}
