"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ExternalLink, FilePlus2, FileStack } from "lucide-react";
import { api, qs } from "@/lib/client/api";
import { Badge, Button, Card, EmptyState, Modal, PageHeader, SearchInput, Select, Spinner, fmtDate, useToast } from "./ui";
import { FieldGroup } from "./fields";

type PageRow = { _id: string; title: string; path: string; group?: string; kind: "coded" | "builder"; status: string; hasUnpublishedChanges?: boolean; sectionCount: number; updatedAt: string };
const FRONT = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
const GROUPS = [
  { value: "", label: "All groups" },
  { value: "main", label: "Main pages" },
  { value: "web-software", label: "Web & Software" },
  { value: "design-innovation", label: "Design & Innovation" },
  { value: "marketing-growth", label: "Marketing & Growth" },
  { value: "hire-developer", label: "Hire Developers" },
];

export function PagesList({ canCreate }: { canCreate: boolean }) {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState<{ items: PageRow[]; total: number } | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await api(`/api/admin/pages${qs({ q, group, status, limit: 100 })}`));
    } catch (e) {
      toast("error", (e as Error).message);
    }
  }, [q, group, status, toast]);
  useEffect(() => {
    // Defer to after render (fetch results update state asynchronously).
    const t = setTimeout(load, 0);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <>
      <PageHeader
        title="Pages & sections"
        description="Every page of the website. Edit details, SEO and sections, preview changes, then publish."
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Pages" }]}
        actions={canCreate && <Button onClick={() => setCreating(true)}><FilePlus2 className="h-4 w-4" /> New page</Button>}
      />
      <Card className="overflow-hidden [&>div]:p-0">
        <div className="flex flex-col gap-2 border-b border-slate-100 p-4 sm:flex-row">
          <SearchInput value={q} onChange={setQ} placeholder="Search by title or URL…" />
          <Select label="Group" value={group} onChange={setGroup} options={GROUPS} />
          <Select label="Status" value={status} onChange={setStatus} options={[{ value: "", label: "All statuses" }, { value: "published", label: "Published" }, { value: "draft", label: "Draft" }]} />
        </div>
        {!data ? (
          <Spinner />
        ) : data.items.length === 0 ? (
          <EmptyState icon={<FileStack className="h-6 w-6" />} title="No pages found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2.5">Page</th>
                  <th className="px-4 py-2.5">URL</th>
                  <th className="px-4 py-2.5">Sections</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5">Updated</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.items.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-2.5">
                      <Link href={`/admin/pages/${p._id}`} className="font-medium text-slate-800 hover:text-teal">{p.title}</Link>
                      <p className="text-xs text-slate-400">{p.kind === "coded" ? "Designed page" : "CMS page"}</p>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-slate-500">{p.path}</td>
                    <td className="px-4 py-2.5 text-slate-600">{p.sectionCount}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        <Badge value={p.status} />
                        {p.hasUnpublishedChanges && <Badge value="changes" label="unpublished changes" />}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">{fmtDate(p.updatedAt, true)}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right">
                      {p.status === "published" && (
                        <a href={`${FRONT}${p.path}`} target="_blank" rel="noreferrer" title="View on website" className="mr-2 inline-flex rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <Link href={`/admin/pages/${p._id}`}><Button variant="secondary" size="sm">Edit</Button></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      {creating && <CreatePage onClose={() => setCreating(false)} />}
    </>
  );
}

function CreatePage({ onClose }: { onClose: () => void }) {
  const toast = useToast();
  const [v, setV] = useState<Record<string, unknown>>({ title: "", slug: "" });
  const [errors, setErrors] = useState<Record<string, string | string[]>>({});
  const [busy, setBusy] = useState(false);
  return (
    <Modal title="Create a new page" onClose={onClose}>
      <p className="mb-4 text-sm text-slate-500">New pages are built from sections (hero, text, cards, FAQ…). They stay as drafts until you publish.</p>
      <FieldGroup
        values={v}
        onChange={setV}
        errors={errors}
        fields={[
          { name: "title", label: "Page title", type: "text", required: true, max: 200 },
          { name: "slug", label: "URL", type: "slug", from: "title", required: true, help: "e.g. contact or company/careers → /contact" },
          { name: "description", label: "Short description", type: "textarea", max: 1000 },
        ]}
      />
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button
          loading={busy}
          onClick={async () => {
            setBusy(true);
            try {
              const doc = await api<{ _id: string }>("/api/admin/pages", { method: "POST", json: { ...v, status: "draft", seo: { title: v.title } } });
              window.location.href = `/admin/pages/${doc._id}`;
            } catch (e) {
              setErrors((e as { errors?: Record<string, string> }).errors ?? {});
              toast("error", (e as Error).message);
              setBusy(false);
            }
          }}
        >
          Create page
        </Button>
      </div>
    </Modal>
  );
}
