"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Download, Inbox, Mail, Phone, Send, Trash2 } from "lucide-react";
import { api, qs } from "@/lib/client/api";
import { Badge, Button, Card, EmptyState, PageHeader, Pagination, SearchInput, Select, Spinner, fmtDate, useConfirm, useToast } from "./ui";

export const LEAD_STATUSES = ["new", "contacted", "in_progress", "qualified", "converted", "not_interested", "closed"];
const statusOpts = LEAD_STATUSES.map((s) => ({ value: s, label: s.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase()) }));
type Kind = "leads" | "proposals";
type Row = Record<string, unknown> & { _id: string; email: string; status: string; createdAt: string; assignedTo?: { _id: string; name: string } | null };

const who = (r: Row, kind: Kind) => (kind === "leads" ? (r.name as string) || r.email : `${r.firstName ?? ""} ${r.lastName ?? ""}`.trim() || r.email);

export function EnquiryList({ kind, canExport }: { kind: Kind; canExport: boolean }) {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [f, setF] = useState({ status: "", formType: "", from: "", to: "" });
  const [data, setData] = useState<{ items: Row[]; total: number; pages: number; formTypes: string[] } | null>(null);
  const label = kind === "leads" ? "Leads" : "Proposal requests";

  const load = useCallback(async () => {
    try {
      setData(await api(`/api/admin/enquiries/${kind}${qs({ q, page, ...f })}`));
    } catch (e) {
      toast("error", (e as Error).message);
    }
  }, [kind, q, page, f, toast]);
  useEffect(() => {
    // Defer to after render (fetch results update state asynchronously).
    const t = setTimeout(load, 0);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <>
      <PageHeader
        title={label}
        description={kind === "leads" ? "Every enquiry submitted through the website forms." : "“Get My Free Proposal” requests."}
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label }]}
        actions={canExport && <a href={`/api/admin/enquiries/${kind}/export${qs({ q, ...f })}`}><Button variant="secondary"><Download className="h-4 w-4" /> Export CSV</Button></a>}
      />
      <Card className="overflow-hidden [&>div]:p-0">
        <div className="flex flex-col flex-wrap gap-2 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
          <SearchInput value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Name, email, phone, message…" />
          <Select label="Status" value={f.status} onChange={(v) => { setF({ ...f, status: v }); setPage(1); }} options={[{ value: "", label: "All statuses" }, ...statusOpts]} />
          {kind === "leads" && data && (
            <Select label="Form" value={f.formType} onChange={(v) => { setF({ ...f, formType: v }); setPage(1); }} options={[{ value: "", label: "All forms" }, ...data.formTypes.map((t) => ({ value: t, label: t }))]} />
          )}
          <label className="flex items-center gap-1.5 text-xs text-slate-500">From <input type="date" value={f.from} onChange={(e) => { setF({ ...f, from: e.target.value }); setPage(1); }} className="h-10 rounded-lg border border-slate-200 px-2 text-sm" /></label>
          <label className="flex items-center gap-1.5 text-xs text-slate-500">To <input type="date" value={f.to} onChange={(e) => { setF({ ...f, to: e.target.value }); setPage(1); }} className="h-10 rounded-lg border border-slate-200 px-2 text-sm" /></label>
        </div>
        {!data ? (
          <Spinner />
        ) : data.items.length === 0 ? (
          <EmptyState icon={<Inbox className="h-6 w-6" />} title="No enquiries found" text="New website enquiries appear here automatically." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2.5">Contact</th>
                  <th className="px-4 py-2.5">{kind === "leads" ? "Form / page" : "Location"}</th>
                  <th className="px-4 py-2.5">Message</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5">Assigned</th>
                  <th className="px-4 py-2.5">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.items.map((r) => (
                  <tr key={r._id} className={`hover:bg-slate-50/60 ${r.status === "new" ? "bg-teal-50/30" : ""}`}>
                    <td className="px-4 py-2.5">
                      <Link href={`/admin/${kind}/${r._id}`} className="font-medium text-slate-800 hover:text-teal">{who(r, kind)}</Link>
                      <p className="text-xs text-slate-500">{r.email}</p>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">{kind === "leads" ? <>{String(r.formType)}<br /><span className="text-slate-400">{String(r.source ?? "")}</span></> : String(r.location ?? "")}</td>
                    <td className="max-w-xs px-4 py-2.5 text-xs text-slate-500"><span className="line-clamp-2">{String(r.message ?? "—")}</span></td>
                    <td className="px-4 py-2.5"><Badge value={r.status} /></td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">{r.assignedTo?.name ?? "—"}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-xs text-slate-500">{fmtDate(r.createdAt, true)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {data && <Pagination page={page} pages={data.pages} total={data.total} onPage={setPage} />}
      </Card>
    </>
  );
}

export function EnquiryDetail({ kind, id, canWrite, canDelete }: { kind: Kind; id: string; canWrite: boolean; canDelete: boolean }) {
  const router = useRouter();
  const toast = useToast();
  const confirm = useConfirm();
  const [r, setR] = useState<Row | null>(null);
  const [staff, setStaff] = useState<{ _id: string; name: string }[]>([]);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<Row>(`/api/admin/enquiries/${kind}/${id}`).then(setR).catch((e) => toast("error", e.message));
    api<{ _id: string; name: string }[]>("/api/admin/users?assignable=1").then(setStaff).catch(() => {});
  }, [kind, id, toast]);

  const update = async (body: Record<string, unknown>, msg: string) => {
    setBusy(true);
    try {
      setR(await api<Row>(`/api/admin/enquiries/${kind}/${id}`, { method: "PATCH", json: body }));
      toast("success", msg);
      return true;
    } catch (e) {
      toast("error", (e as Error).message);
      return false;
    } finally {
      setBusy(false);
    }
  };

  if (!r) return <Spinner />;
  const label = kind === "leads" ? "Leads" : "Proposal requests";
  const rows: [string, unknown][] =
    kind === "leads"
      ? [["Form", r.formType], ["Page", r.source], ["Page URL", r.sourceUrl], ["Company", r.company], ["Website", r.website], ["Service", r.service], ["Budget", r.budget]]
      : [["Location", r.location], ["Source", r.source]];
  const details = r.details ? Object.entries(r.details as Record<string, string>) : [];
  const utm = r.utm ? Object.entries(r.utm as Record<string, string>).filter(([, v]) => v) : [];
  const notes = (r.notes as { _id: string; body: string; authorName?: string; createdAt: string }[]) ?? [];

  return (
    <>
      <PageHeader
        title={who(r, kind)}
        description={`Received ${fmtDate(r.createdAt, true)}`}
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label, href: `/admin/${kind}` }, { label: "Details" }]}
        actions={
          <>
            <a href={`mailto:${r.email}`}><Button variant="secondary"><Mail className="h-4 w-4" /> Email</Button></a>
            {r.phone ? <a href={`tel:${String(r.phone)}`}><Button variant="secondary"><Phone className="h-4 w-4" /> Call</Button></a> : null}
            {canDelete && (
              <Button
                variant="ghost"
                className="text-rose-600 hover:bg-rose-50"
                onClick={async () => {
                  if (!(await confirm({ title: "Delete this enquiry?", body: "It will be removed permanently.", confirmLabel: "Delete", danger: true }))) return;
                  try {
                    await api(`/api/admin/enquiries/${kind}/${id}`, { method: "DELETE" });
                    toast("success", "Enquiry deleted");
                    router.replace(`/admin/${kind}`);
                  } catch (e) {
                    toast("error", (e as Error).message);
                  }
                }}
              >
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            )}
          </>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <Card title="Enquiry">
            <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              <div><dt className="text-xs text-slate-500">Email</dt><dd className="font-medium text-slate-800">{r.email}</dd></div>
              <div><dt className="text-xs text-slate-500">Phone</dt><dd className="text-slate-800">{String(r.phone ?? "—")}</dd></div>
              {rows.filter(([, v]) => v).map(([k, v]) => (
                <div key={k}><dt className="text-xs text-slate-500">{k}</dt><dd className="break-words text-slate-800">{String(v)}</dd></div>
              ))}
              {details.map(([k, v]) => (
                <div key={k}><dt className="text-xs capitalize text-slate-500">{k}</dt><dd className="break-words text-slate-800">{v}</dd></div>
              ))}
            </dl>
            {r.message ? (
              <div className="mt-4 rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">Message</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{String(r.message)}</p>
              </div>
            ) : null}
            {utm.length > 0 && (
              <p className="mt-4 text-xs text-slate-500">Campaign: {utm.map(([k, v]) => `${k}=${v}`).join(" · ")}</p>
            )}
          </Card>
          <Card title={`Internal notes (${notes.length})`}>
            {notes.length === 0 && <p className="text-sm text-slate-500">No notes yet.</p>}
            <ul className="space-y-3">
              {notes.map((n) => (
                <li key={n._id} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                  <p className="whitespace-pre-wrap text-sm text-slate-700">{n.body}</p>
                  <p className="mt-1 text-xs text-slate-400">{n.authorName} · {fmtDate(n.createdAt, true)}</p>
                </li>
              ))}
            </ul>
            {canWrite && (
              <div className="mt-4">
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} maxLength={4000} placeholder="Add a note for the team (not visible to the client)…" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/15" />
                <Button className="mt-2" size="sm" loading={busy} disabled={!note.trim()} onClick={async () => (await update({ note }, "Note added")) && setNote("")}>
                  <Send className="h-4 w-4" /> Add note
                </Button>
              </div>
            )}
          </Card>
        </div>
        <Card title="Status & owner">
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Status</span>
              <Select className="w-full" value={r.status} onChange={(v) => update({ status: v }, "Status updated")} options={statusOpts} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Assigned to</span>
              <Select className="w-full" value={r.assignedTo?._id ?? ""} onChange={(v) => update({ assignedTo: v || null }, "Assignment updated")} options={[{ value: "", label: "Unassigned" }, ...staff.map((s) => ({ value: s._id, label: s.name }))]} />
            </label>
            {!canWrite && <p className="text-xs text-slate-500">Your role can view enquiries but not change them.</p>}
          </div>
        </Card>
      </div>
    </>
  );
}
