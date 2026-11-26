"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Copy, ImageIcon, Trash2, Upload } from "lucide-react";
import { api, ApiError, qs } from "@/lib/client/api";
import { Button, Card, EmptyState, Modal, PageHeader, Pagination, SearchInput, Select, Spinner, fmtDate, useConfirm, useToast } from "./ui";
import { mediaSrc, Thumb, useUpload, type MediaItem } from "./MediaPicker";

const kb = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

export function MediaLibrary({ canWrite, canDelete }: { canWrite: boolean; canDelete: boolean }) {
  const toast = useToast();
  const confirm = useConfirm();
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ items: MediaItem[]; total: number; pages: number } | null>(null);
  const [sel, setSel] = useState<MediaItem | null>(null);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { upload, busy } = useUpload();

  const load = useCallback(async () => {
    try {
      setData(await api(`/api/admin/media${qs({ q, type, source, page, limit: 36 })}`));
    } catch (e) {
      toast("error", (e as Error).message);
    }
  }, [q, type, source, page, toast]);
  useEffect(() => {
    // Defer to after render (fetch results update state asynchronously).
    const t = setTimeout(load, 0);
    return () => clearTimeout(t);
  }, [load]);

  const doUpload = async (files: FileList | File[]) => {
    if ((await upload(files)).length) {
      setPage(1);
      load();
    }
  };

  const remove = async (m: MediaItem, force = false) => {
    if (!force && !(await confirm({ title: "Delete this file?", body: "It is removed from storage permanently.", confirmLabel: "Delete", danger: true }))) return;
    try {
      await api(`/api/admin/media/${m._id}${force ? "?force=1" : ""}`, { method: "DELETE" });
      toast("success", "File deleted");
      setSel(null);
      load();
    } catch (e) {
      if (e instanceof ApiError && e.status === 409 && e.errors?.usage) {
        const uses = ([] as string[]).concat(e.errors.usage);
        const go = await confirm({
          title: "This file is still in use",
          body: (
            <>
              <p>It is used in:</p>
              <ul className="mt-2 list-disc pl-5">{uses.slice(0, 10).map((u) => <li key={u}>{u}</li>)}</ul>
              <p className="mt-2">Deleting it will leave broken images there.</p>
            </>
          ),
          confirmLabel: "Delete anyway",
          danger: true,
        });
        if (go) remove(m, true);
      } else toast("error", (e as Error).message);
    }
  };

  return (
    <>
      <PageHeader
        title="Media library"
        description="Images and documents used across the website. Website images (already in the site code) are listed for reuse."
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Media" }]}
        actions={canWrite && (
          <>
            <input ref={fileRef} type="file" multiple hidden accept="image/*,.pdf,.docx" onChange={(e) => { if (e.target.files) doUpload(e.target.files); e.target.value = ""; }} />
            <Button onClick={() => fileRef.current?.click()} loading={busy}><Upload className="h-4 w-4" /> Upload files</Button>
          </>
        )}
      />
      <Card className="[&>div]:p-0">
        <div className="flex flex-col gap-2 border-b border-slate-100 p-4 sm:flex-row">
          <SearchInput value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search files…" />
          <Select label="Type" value={type} onChange={(v) => { setType(v); setPage(1); }} options={[{ value: "", label: "All types" }, { value: "image", label: "Images" }, { value: "document", label: "Documents" }]} />
          <Select label="Source" value={source} onChange={(v) => { setSource(v); setPage(1); }} options={[{ value: "", label: "All sources" }, { value: "uploads", label: "Uploaded in CMS" }, { value: "website", label: "Website images" }]} />
        </div>
        <div
          className={`p-4 ${drag ? "bg-teal/5 ring-2 ring-inset ring-teal/40" : ""}`}
          onDragOver={(e) => { if (canWrite) { e.preventDefault(); setDrag(true); } }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); if (canWrite && e.dataTransfer.files.length) doUpload(e.dataTransfer.files); }}
        >
          {!data ? (
            <Spinner />
          ) : data.items.length === 0 ? (
            <EmptyState icon={<ImageIcon className="h-6 w-6" />} title="No files" text={canWrite ? "Drag files here or use Upload. JPG, PNG, WebP, AVIF, GIF, SVG up to 8 MB; PDF/DOCX up to 10 MB." : undefined} />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
              {data.items.map((m) => (
                <button key={m._id} type="button" onClick={() => setSel(m)} className="group overflow-hidden rounded-lg border border-slate-200 bg-white text-left hover:border-teal hover:ring-2 hover:ring-teal/20">
                  <Thumb item={m} className="h-32 w-full bg-[repeating-conic-gradient(#f1f5f9_0_25%,#fff_0_50%)] bg-[length:16px_16px]" />
                  <div className="px-2 py-1.5">
                    <p className="truncate text-xs font-medium text-slate-700">{m.title || m.filename}</p>
                    <p className="text-[11px] text-slate-400">{m.isFrontendAsset ? "Website image" : kb(m.size)}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        {data && <Pagination page={page} pages={data.pages} total={data.total} onPage={setPage} />}
      </Card>
      {sel && <MediaDetail item={sel} canWrite={canWrite} canDelete={canDelete && !sel.isFrontendAsset} onClose={() => setSel(null)} onSaved={(m) => { setSel(m); load(); }} onDelete={() => remove(sel)} />}
    </>
  );
}

function MediaDetail({ item, canWrite, canDelete, onClose, onSaved, onDelete }: { item: MediaItem; canWrite: boolean; canDelete: boolean; onClose: () => void; onSaved: (m: MediaItem) => void; onDelete: () => void }) {
  const toast = useToast();
  const [alt, setAlt] = useState(item.alt ?? "");
  const [title, setTitle] = useState(item.title ?? "");
  const [busy, setBusy] = useState(false);
  return (
    <Modal title={item.title || item.filename} onClose={onClose} size="lg">
      <div className="grid gap-5 md:grid-cols-2">
        <Thumb item={item} className="h-64 w-full rounded-lg border border-slate-200 bg-[repeating-conic-gradient(#f1f5f9_0_25%,#fff_0_50%)] bg-[length:16px_16px]" />
        <div className="space-y-3 text-sm">
          <dl className="space-y-1 text-xs text-slate-500">
            <div>Type: <span className="text-slate-700">{item.mimeType}</span></div>
            <div>Size: <span className="text-slate-700">{kb(item.size)}</span></div>
            <div>Added: <span className="text-slate-700">{fmtDate(item.createdAt, true)}</span></div>
          </dl>
          <div>
            <p className="mb-1 text-xs font-medium text-slate-600">URL</p>
            <div className="flex gap-1">
              <input readOnly value={item.url} className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 font-mono text-xs" />
              <Button size="sm" variant="secondary" onClick={() => { navigator.clipboard.writeText(item.url); toast("success", "URL copied"); }} title="Copy"><Copy className="h-4 w-4" /></Button>
            </div>
            <a href={mediaSrc(item.url)} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-teal hover:underline">Open original</a>
          </div>
          <label className="block"><span className="mb-1 block text-xs font-medium text-slate-600">Alt text (describes the image for SEO & screen readers)</span>
            <input disabled={!canWrite} value={alt} onChange={(e) => setAlt(e.target.value)} maxLength={300} className="h-9 w-full rounded-lg border border-slate-200 px-2 text-sm" /></label>
          <label className="block"><span className="mb-1 block text-xs font-medium text-slate-600">Title</span>
            <input disabled={!canWrite} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} className="h-9 w-full rounded-lg border border-slate-200 px-2 text-sm" /></label>
          <div className="flex justify-between pt-2">
            {canDelete ? <Button variant="ghost" className="text-rose-600 hover:bg-rose-50" onClick={onDelete}><Trash2 className="h-4 w-4" /> Delete</Button> : <span />}
            {canWrite && (
              <Button loading={busy} onClick={async () => {
                setBusy(true);
                try { onSaved(await api<MediaItem>(`/api/admin/media/${item._id}`, { method: "PATCH", json: { alt, title } })); toast("success", "Saved"); }
                catch (e) { toast("error", (e as Error).message); }
                finally { setBusy(false); }
              }}>Save details</Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
