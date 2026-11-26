"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Copy, Download, ExternalLink, FileText, ImageIcon, Maximize2, Ruler, Trash2, Upload, UploadCloud } from "lucide-react";
import { api, ApiError, qs } from "@/lib/client/api";
import { Button, Card, EmptyState, Modal, PageHeader, Pagination, PerPage, SearchInput, Select, Spinner, fmtDate, useConfirm, usePerPage, useToast } from "./ui";
import { mediaSrc, Thumb, useUpload, type MediaItem } from "./MediaPicker";

const kb = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
const isImage = (m: Pick<MediaItem, "mimeType">) => m.mimeType.startsWith("image/");
const checker = "bg-[repeating-conic-gradient(#f1f5f9_0_25%,#fff_0_50%)] bg-[length:16px_16px]";

export function MediaLibrary({ canWrite, canDelete }: { canWrite: boolean; canDelete: boolean }) {
  const toast = useToast();
  const confirm = useConfirm();
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = usePerPage("media", 25);
  const [data, setData] = useState<{ items: MediaItem[]; total: number; pages: number } | null>(null);
  const [sel, setSel] = useState<MediaItem | null>(null);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { upload, busy } = useUpload();

  const load = useCallback(async () => {
    try {
      setData(await api(`/api/admin/media${qs({ q, type, source, page, limit })}`));
    } catch (e) {
      toast("error", (e as Error).message);
    }
  }, [q, type, source, page, limit, toast]);
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

  const reset = (fn: (v: string) => void) => (v: string) => { fn(v); setPage(1); };

  return (
    <>
      <PageHeader
        title="Media library"
        description="Every image and document of the website. Click a file to see its size, copy its link or set the alt text shown on the website."
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Media" }]}
        actions={canWrite && (
          <>
            <input ref={fileRef} type="file" multiple hidden accept="image/*,.pdf,.docx" onChange={(e) => { if (e.target.files) doUpload(e.target.files); e.target.value = ""; }} />
            <Button onClick={() => fileRef.current?.click()} loading={busy}><Upload className="h-4 w-4" /> Upload files</Button>
          </>
        )}
      />
      <Card className="overflow-hidden [&>div]:p-0">
        <div className="flex flex-col gap-2 border-b border-slate-100 bg-slate-50/50 p-4 lg:flex-row lg:items-center">
          <SearchInput value={q} onChange={reset(setQ)} placeholder="Search by name or alt text…" />
          <Select label="Type" value={type} onChange={reset(setType)} options={[{ value: "", label: "All types" }, { value: "image", label: "Images" }, { value: "document", label: "Documents" }]} />
          <Select label="Source" value={source} onChange={reset(setSource)} options={[{ value: "", label: "All sources" }, { value: "uploads", label: "Uploaded in CMS" }, { value: "website", label: "Website images" }]} />
          <PerPage value={limit} onChange={(n) => { setLimit(n); setPage(1); }} />
        </div>
        <div
          className={`relative p-4 transition ${drag ? "bg-teal/5" : ""}`}
          onDragOver={(e) => { if (canWrite) { e.preventDefault(); setDrag(true); } }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); if (canWrite && e.dataTransfer.files.length) doUpload(e.dataTransfer.files); }}
        >
          {drag && (
            <div className="pointer-events-none absolute inset-3 z-10 grid place-items-center rounded-2xl border-2 border-dashed border-teal bg-white/80 backdrop-blur-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-teal"><UploadCloud className="h-5 w-5" /> Drop files to upload</p>
            </div>
          )}
          {canWrite && (
            <button type="button" onClick={() => fileRef.current?.click()} className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 py-3 text-sm text-slate-500 transition hover:border-teal/50 hover:bg-teal/5 hover:text-teal">
              <UploadCloud className="h-4 w-4" /> Drag files here or <b className="font-semibold">browse</b> · JPG, PNG, WebP, AVIF, SVG up to 8 MB · PDF/DOCX up to 10 MB
            </button>
          )}
          {!data ? (
            <Spinner />
          ) : data.items.length === 0 ? (
            <EmptyState icon={<ImageIcon className="h-6 w-6" />} title="No files" text="Nothing matches this search." />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {data.items.map((m, i) => (
                <button
                  key={m._id}
                  type="button"
                  onClick={() => setSel(m)}
                  style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}
                  className="admin-row-in group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_16px_36px_-22px_rgba(13,148,136,0.55)]"
                >
                  <div className="relative">
                    <Thumb item={m} className={`aspect-[4/3] w-full ${checker}`} />
                    <span className="absolute inset-0 grid place-items-center bg-navy/0 opacity-0 transition group-hover:bg-navy/35 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow"><Maximize2 className="h-3.5 w-3.5" /> Details</span>
                    </span>
                    <span className={`absolute left-2 top-2 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${m.isFrontendAsset ? "bg-white/90 text-slate-600" : "bg-teal text-white"}`}>
                      {m.isFrontendAsset ? "Website" : "Uploaded"}
                    </span>
                  </div>
                  <div className="space-y-1 px-3 py-2.5">
                    <p className="truncate text-sm font-semibold text-slate-800">{m.title || m.filename}</p>
                    <p className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
                      <span>{m.size ? kb(m.size) : m.mimeType.split("/")[1]?.toUpperCase()}</span>
                      {isImage(m) &&
                        (m.alt ? (
                          <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-600"><CheckCircle2 className="h-3 w-3" /> Alt</span>
                        ) : (
                          <span className="font-semibold text-amber-600">No alt</span>
                        ))}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        {data && <Pagination page={page} pages={data.pages} total={data.total} onPage={setPage} limit={limit} onLimit={(n) => { setLimit(n); setPage(1); }} />}
      </Card>
      {sel && <MediaDetail item={sel} canWrite={canWrite} canDelete={canDelete && !sel.isFrontendAsset} onClose={() => setSel(null)} onSaved={(m) => { setSel(m); load(); }} onDelete={() => remove(sel)} />}
    </>
  );
}

function ratio(w: number, h: number) {
  const g = (a: number, b: number): number => (b ? g(b, a % b) : a);
  const d = g(w, h) || 1;
  const r = `${w / d}:${h / d}`;
  return r.length <= 7 ? r : (w / h).toFixed(2);
}

function MediaDetail({ item, canWrite, canDelete, onClose, onSaved, onDelete }: { item: MediaItem; canWrite: boolean; canDelete: boolean; onClose: () => void; onSaved: (m: MediaItem) => void; onDelete: () => void }) {
  const toast = useToast();
  const [alt, setAlt] = useState(item.alt ?? "");
  const [title, setTitle] = useState(item.title ?? "");
  const [busy, setBusy] = useState(false);
  const [dim, setDim] = useState<{ w: number; h: number } | null>(null);
  const image = isImage(item);
  const src = mediaSrc(item.url);
  const facts = [
    { label: "Type", value: item.mimeType },
    { label: "File size", value: item.size ? kb(item.size) : "—" },
    { label: "Dimensions", value: image ? (dim ? `${dim.w} × ${dim.h} px` : "measuring…") : "—" },
    { label: "Aspect ratio", value: dim ? ratio(dim.w, dim.h) : "—" },
    { label: "Source", value: item.isFrontendAsset ? "Website image" : "Uploaded in CMS" },
    { label: "Added", value: fmtDate(item.createdAt, true) },
  ];
  return (
    <Modal title={item.title || item.filename} onClose={onClose} size="xl">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className={`grid min-h-[280px] place-items-center overflow-hidden rounded-2xl border border-slate-200 ${checker}`}>
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={alt} onLoad={(e) => setDim({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })} className="max-h-[420px] w-auto object-contain" />
            ) : (
              <FileText className="h-14 w-14 text-slate-300" />
            )}
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-xl bg-slate-50 px-3 py-2">
                <dt className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  {f.label === "Dimensions" && <Ruler className="h-3 w-3" />}
                  {f.label}
                </dt>
                <dd className="mt-0.5 truncate text-sm font-semibold text-slate-800" title={f.value}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-4">
          <div>
            <p className="mb-1.5 text-[13px] font-semibold text-slate-700">File link</p>
            <div className="flex gap-1.5">
              <input readOnly value={item.url} onFocus={(e) => e.target.select()} className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 font-mono text-xs" />
              <Button variant="secondary" onClick={() => { navigator.clipboard.writeText(item.url); toast("success", "Link copied"); }} title="Copy link"><Copy className="h-4 w-4" /></Button>
            </div>
            <div className="mt-2 flex gap-3 text-xs">
              <a href={src} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-teal hover:underline"><ExternalLink className="h-3.5 w-3.5" /> Open original</a>
              <a href={src} download className="inline-flex items-center gap-1 font-semibold text-teal hover:underline"><Download className="h-3.5 w-3.5" /> Download</a>
            </div>
          </div>
          {image && (
            <label className="block">
              <span className="mb-1.5 flex items-center justify-between text-[13px] font-semibold text-slate-700">
                Alt text <span className="font-normal text-slate-400">{alt.length}/300</span>
              </span>
              <textarea
                disabled={!canWrite}
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                maxLength={300}
                rows={3}
                placeholder="e.g. Server racks with a cloud icon representing secure web hosting"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-teal focus:ring-4 focus:ring-teal/10"
              />
              <span className="mt-1 block text-xs text-slate-500">Describe what the image shows. It is used on the website wherever this image appears (Google & screen readers read it).</span>
            </label>
          )}
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-semibold text-slate-700">Title (admin only)</span>
            <input disabled={!canWrite} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} className="h-10 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none transition focus:border-teal focus:ring-4 focus:ring-teal/10" />
          </label>
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            {canDelete ? <Button variant="ghost" className="text-rose-600 hover:bg-rose-50" onClick={onDelete}><Trash2 className="h-4 w-4" /> Delete</Button> : <span />}
            {canWrite && (
              <Button variant="teal" loading={busy} onClick={async () => {
                setBusy(true);
                try { onSaved(await api<MediaItem>(`/api/admin/media/${item._id}`, { method: "PATCH", json: { alt, title } })); toast("success", "Saved - the website uses the new alt text within a few seconds"); }
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
