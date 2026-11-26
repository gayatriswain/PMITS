"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Check, ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { api, qs } from "@/lib/client/api";
import { RESOURCE_UI } from "@/lib/client/resources";
import { Badge, Button, Card, EmptyState, PageHeader, Pagination, SearchInput, Select, Spinner, fmtDate, useConfirm, useToast } from "./ui";
import { Thumb } from "./MediaPicker";

type Row = Record<string, unknown> & { _id: string };
const FRONT = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export function ResourceList({ name, canWrite, canDelete }: { name: string; canWrite: boolean; canDelete: boolean }) {
  const ui = RESOURCE_UI[name];
  const toast = useToast();
  const confirm = useConfirm();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [data, setData] = useState<{ items: Row[]; total: number; pages: number } | null>(null);

  const load = useCallback(async () => {
    try {
      setData(await api(`/api/admin/resources/${name}${qs({ q, page, ...filters })}`));
    } catch (e) {
      toast("error", (e as Error).message);
      setData({ items: [], total: 0, pages: 1 });
    }
  }, [name, q, page, filters, toast]);
  useEffect(() => {
    // Defer to after render (fetch results update state asynchronously).
    const t = setTimeout(load, 0);
    return () => clearTimeout(t);
  }, [load]);

  const remove = async (row: Row) => {
    const ok = await confirm({ title: `Delete ${ui.singular}?`, body: <>“{String(row[ui.titleKey])}” will be removed permanently. This cannot be undone.</>, confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try {
      await api(`/api/admin/resources/${name}/${row._id}`, { method: "DELETE" });
      toast("success", `${ui.singular[0].toUpperCase() + ui.singular.slice(1)} deleted`);
      load();
    } catch (e) {
      toast("error", (e as Error).message);
    }
  };

  const cell = (row: Row, c: (typeof ui.columns)[number]) => {
    const v = row[c.key];
    switch (c.kind) {
      case "status":
        return <Badge value={String(v ?? "")} />;
      case "date":
        return <span className="text-slate-500">{fmtDate(v as string)}</span>;
      case "bool":
        return v ? <Check className="h-4 w-4 text-teal" /> : <span className="text-slate-300">—</span>;
      case "image":
        return v ? <Thumb item={{ url: String(v), mimeType: "image/*" }} className="h-10 w-14 rounded bg-slate-50" /> : <span className="block h-10 w-14 rounded bg-slate-100" />;
      default:
        return <span className={c.className}>{v === undefined || v === null || v === "" ? "—" : String(v)}</span>;
    }
  };

  return (
    <>
      <PageHeader
        title={ui.label}
        description={ui.description}
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: ui.label }]}
        actions={
          canWrite && (
            <Link href={`/admin/content/${name}/new`}>
              <Button>
                <Plus className="h-4 w-4" /> New {ui.singular}
              </Button>
            </Link>
          )
        }
      />
      <Card className="overflow-hidden [&>div]:p-0">
        <div className="flex flex-col gap-2 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <SearchInput value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder={`Search ${ui.label.toLowerCase()}…`} />
          {ui.filters?.map((f) => (
            <Select key={f.key} label={f.label} value={filters[f.key] ?? ""} options={f.options} onChange={(v) => { setFilters((x) => ({ ...x, [f.key]: v })); setPage(1); }} />
          ))}
        </div>
        {!data ? (
          <Spinner />
        ) : data.items.length === 0 ? (
          <EmptyState title={q || Object.values(filters).some(Boolean) ? "Nothing matches your search" : `No ${ui.label.toLowerCase()} yet`} action={canWrite && !q ? <Link href={`/admin/content/${name}/new`}><Button variant="secondary"><Plus className="h-4 w-4" /> Add the first one</Button></Link> : undefined} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                <tr>
                  {ui.columns.map((c) => <th key={c.key} className="whitespace-nowrap px-4 py-2.5">{c.label}</th>)}
                  <th className="px-4 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.items.map((row) => {
                  const view = ui.viewUrl?.(row);
                  return (
                    <tr key={row._id} className="hover:bg-slate-50/60">
                      {ui.columns.map((c, i) => (
                        <td key={c.key} className={`px-4 py-2.5 ${i === 0 || c.key === ui.titleKey ? "font-medium text-slate-800" : "text-slate-600"}`}>
                          {c.key === ui.titleKey ? <Link href={`/admin/content/${name}/${row._id}`} className="hover:text-teal">{cell(row, c)}</Link> : cell(row, c)}
                        </td>
                      ))}
                      <td className="whitespace-nowrap px-4 py-2.5 text-right">
                        {view && (
                          <a href={`${FRONT}${view}`} target="_blank" rel="noreferrer" className="mr-1 inline-flex rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="View on website">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <Link href={`/admin/content/${name}/${row._id}`} className="inline-flex rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        {canDelete && (
                          <button type="button" onClick={() => remove(row)} className="ml-1 inline-flex rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {data && <Pagination page={page} pages={data.pages} total={data.total} onPage={setPage} />}
      </Card>
    </>
  );
}
