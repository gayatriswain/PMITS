"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FileText, ImageIcon, Upload } from "lucide-react";
import { api, ApiError, qs } from "@/lib/client/api";
import { Button, EmptyState, Modal, Pagination, SearchInput, Select, Spinner, useToast } from "./ui";

export type MediaItem = {
  _id: string;
  url: string;
  filename: string;
  originalName?: string;
  title?: string;
  alt?: string;
  mimeType: string;
  size: number;
  folder?: string;
  isFrontendAsset?: boolean;
  createdAt?: string;
};

/** The frontend serves its own /public images; preview them from the website origin. */
export function mediaSrc(url: string) {
  if (!url) return "";
  if (url.startsWith("/") && !url.startsWith("/uploads/") && !url.startsWith("/api/")) return `${process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"}${url}`;
  return url;
}

export function Thumb({ item, className = "" }: { item: Pick<MediaItem, "url" | "mimeType" | "alt">; className?: string }) {
  if (!item.mimeType.startsWith("image/")) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 text-slate-400 ${className}`}>
        <FileText className="h-6 w-6" />
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={mediaSrc(item.url)} alt={item.alt || ""} loading="lazy" className={`object-contain ${className}`} />;
}

export function useUpload() {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const upload = useCallback(
    async (files: FileList | File[], folder?: string) => {
      const list = Array.from(files);
      if (!list.length) return [] as MediaItem[];
      setBusy(true);
      try {
        const fd = new FormData();
        list.forEach((f) => fd.append("file", f));
        if (folder) fd.append("folder", folder);
        const res = await fetch("/api/admin/media", { method: "POST", body: fd, credentials: "same-origin" });
        const body = await res.json().catch(() => null);
        if (!res.ok || !body?.success) throw new ApiError(res.status, body?.message ?? "Upload failed");
        toast("success", body.message);
        return body.data as MediaItem[];
      } catch (e) {
        toast("error", (e as Error).message);
        return [];
      } finally {
        setBusy(false);
      }
    },
    [toast],
  );
  return { upload, busy };
}

/** Browse / search / upload, then pick one file. */
export function MediaPicker({ onClose, onSelect, type = "image" }: { onClose: () => void; onSelect: (m: MediaItem) => void; type?: "image" | "document" | "" }) {
  const [q, setQ] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ items: MediaItem[]; total: number; pages: number } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { upload, busy } = useUpload();

  const load = useCallback(async () => {
    setData(null);
    setData(await api(`/api/admin/media${qs({ q, page, type, source, limit: 30 })}`));
  }, [q, page, type, source]);
  useEffect(() => {
    const t = setTimeout(() => load().catch(() => setData({ items: [], total: 0, pages: 1 })), 0);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <Modal title="Choose a file" onClose={onClose} size="xl">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <SearchInput value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search by name, title or alt text" />
        <Select value={source} onChange={(v) => { setSource(v); setPage(1); }} label="Source" options={[{ value: "", label: "All files" }, { value: "uploads", label: "Uploaded in CMS" }, { value: "website", label: "Website images" }]} />
        <div className="sm:ml-auto">
          <input ref={fileRef} type="file" multiple hidden accept={type === "document" ? ".pdf,.docx" : "image/*"} onChange={async (e) => {
            const added = e.target.files ? await upload(e.target.files) : [];
            e.target.value = "";
            if (added.length === 1) onSelect(added[0]);
            else if (added.length) load();
          }} />
          <Button onClick={() => fileRef.current?.click()} loading={busy}>
            <Upload className="h-4 w-4" /> Upload
          </Button>
        </div>
      </div>
      {!data ? (
        <Spinner />
      ) : data.items.length === 0 ? (
        <EmptyState icon={<ImageIcon className="h-6 w-6" />} title="No files found" text="Upload a file or change the search." />
      ) : (
        <>
          <div className="grid max-h-[55vh] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-4 lg:grid-cols-6">
            {data.items.map((m) => (
              <button key={m._id} type="button" onClick={() => onSelect(m)} className="group overflow-hidden rounded-lg border border-slate-200 text-left hover:border-teal hover:ring-2 hover:ring-teal/20">
                <Thumb item={m} className="h-28 w-full bg-[repeating-conic-gradient(#f1f5f9_0_25%,#fff_0_50%)] bg-[length:16px_16px]" />
                <p className="truncate px-2 py-1.5 text-[11px] text-slate-600" title={m.url}>{m.title || m.filename}</p>
              </button>
            ))}
          </div>
          <Pagination page={page} pages={data.pages} total={data.total} onPage={setPage} />
        </>
      )}
    </Modal>
  );
}
