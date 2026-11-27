"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from "react";
import Link from "next/link";
import {
  AlertCircle, ArrowDown, ArrowUp, Check, ExternalLink, Eye, EyeOff, FileText, Hand, Info, LayoutList, Link2, Loader2, Lock,
  Monitor, MoreHorizontal, MousePointerClick, Plus, RotateCcw, Save, Search, Send, Settings2, Smartphone, Tablet, Trash2, Undo2,
} from "lucide-react";
import { Badge, Button } from "./ui";
import { FieldFocus, FieldGroup, type FieldDef, type FieldFocusValue } from "./fields";

export type SectionDef = { component: string; label: string; kind: "coded" | "builder"; description?: string; fields: FieldDef[]; defaults: Record<string, unknown>; generated?: boolean };
export type Section = { _id?: string; key: string; component: string; label?: string; enabled: boolean; content: Record<string, unknown>; changed?: boolean };
export type PageDoc = {
  _id: string; title: string; slug: string; path: string; kind: "coded" | "builder"; status: string; group?: string; description?: string; featuredImage?: string;
  seo: Record<string, unknown>; draft?: Record<string, unknown>; hasUnpublishedChanges?: boolean; publishedAt?: string; updatedAt: string;
};
export type SaveState = "idle" | "saving" | "saved" | "error";
/** Sends a message to the preview frame (set by the visual editor while it is open). */
export type BridgeRef = MutableRefObject<((m: Record<string, unknown>) => void) | null>;

const FRONT = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
const FRONT_ORIGIN = (() => {
  try {
    return new URL(FRONT).origin;
  } catch {
    return "http://localhost:3000";
  }
})();

const DEVICES = {
  desktop: { w: 1440, icon: Monitor, label: "Desktop" },
  tablet: { w: 834, icon: Tablet, label: "Tablet" },
  mobile: { w: 390, icon: Smartphone, label: "Mobile" },
} as const;
type Device = keyof typeof DEVICES;

/* ------------------------- clicked thing -> field ------------------------- */

type Leaf = { path: string; value: string; image: boolean };

/** Every text/image value of a section with its field path ("items.2.title", "button.label"…). */
function leaves(fields: FieldDef[], values: Record<string, unknown>, prefix = "", out: Leaf[] = []): Leaf[] {
  for (const f of fields) {
    if (f.type === "group" && f.flat) {
      leaves(f.fields ?? [], values, prefix, out);
      continue;
    }
    const p = prefix ? `${prefix}.${f.name}` : f.name;
    const v = values?.[f.name];
    if (f.type === "list" && Array.isArray(v)) v.forEach((item, i) => leaves(f.fields ?? [], (item ?? {}) as Record<string, unknown>, `${p}.${i}`, out));
    else if (f.type === "group") leaves(f.fields ?? [], (v ?? {}) as Record<string, unknown>, p, out);
    else if (f.type === "link" && v && typeof v === "object") {
      const l = v as { label?: string; href?: string };
      if (l.label) out.push({ path: `${p}.label`, value: l.label, image: false });
    } else if ((f.type === "textlist" || f.type === "tags") && Array.isArray(v)) v.forEach((x) => typeof x === "string" && out.push({ path: p, value: x, image: false }));
    else if (typeof v === "string" && v) out.push({ path: p, value: v, image: f.type === "image" });
  }
  return out;
}

const norm = (s: string) =>
  s
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

/** "/_next/image?url=%2Fa.webp&w=…" or "https://site/a.webp" -> "/a.webp" */
function imgPath(src: string) {
  let s = src;
  try {
    const u = new URL(src, FRONT);
    if (u.pathname.startsWith("/_next/image")) s = u.searchParams.get("url") ?? s;
    const v = new URL(s, FRONT);
    s = v.origin === FRONT_ORIGIN ? v.pathname : v.href;
  } catch {
    /* keep as is */
  }
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}
const baseName = (s: string) => s.split("/").pop()?.split("?")[0] ?? s;

/** Field for what was clicked: the text node under the pointer first, then the whole element's text. */
function matchField(ls: Leaf[], kind: string, text: string, src: string, nodeText = ""): string | null {
  if (kind !== "image" && nodeText && nodeText !== text) {
    const hit = matchText(ls, nodeText);
    if (hit) return hit;
  }
  return matchImageOrText(ls, kind, text, src);
}

function matchImageOrText(ls: Leaf[], kind: string, text: string, src: string): string | null {
  if (kind === "image" && src) {
    const want = imgPath(src);
    const imgs = ls.filter((l) => l.image || /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(l.value));
    const hit = imgs.find((l) => imgPath(l.value) === want) ?? imgs.find((l) => baseName(imgPath(l.value)) === baseName(want));
    if (hit) return hit.path;
  }
  return matchText(ls, text);
}

function matchText(ls: Leaf[], text: string): string | null {
  const t = norm(text);
  if (!t) return null;
  const texts = ls.filter((l) => !l.image);
  const exact = texts.find((l) => norm(l.value) === t);
  if (exact) return exact.path;
  // the clicked element shows part of a field (a word in a heading) or a field is part of what was clicked
  const inside = texts.filter((l) => t.length >= 3 && norm(l.value).includes(t)).sort((a, b) => a.value.length - b.value.length)[0];
  if (inside) return inside.path;
  const contains = texts.filter((l) => norm(l.value).length >= 4 && t.includes(norm(l.value))).sort((a, b) => b.value.length - a.value.length)[0];
  return contains?.path ?? null;
}

/** Element of the field in the side panel (falls back to its parent field: "button.label" -> "button"). */
function findField(root: HTMLElement | null, path: string) {
  if (!root) return null;
  const parts = path.split(".");
  while (parts.length) {
    const el = root.querySelector<HTMLElement>(`[data-fpath="${CSS.escape(parts.join("."))}"]`);
    if (el) return el;
    parts.pop();
  }
  return null;
}

/* ------------------------------- preview ------------------------------- */

function Canvas({
  url,
  device,
  frameRef,
  loading,
}: {
  url: string | null;
  device: Device;
  frameRef: MutableRefObject<HTMLIFrameElement | null>;
  loading: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const w = DEVICES[device].w;
  const scale = size.w ? Math.min(1, (size.w - 24) / w) : 1;
  const h = size.h ? (size.h - 24) / scale : 800;
  return (
    <div ref={wrap} className="relative h-full w-full overflow-hidden">
      <div
        className={`absolute left-1/2 top-3 overflow-hidden bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)] ring-1 ring-slate-200 transition-[width] ${device === "desktop" ? "rounded-lg" : "rounded-[22px]"}`}
        style={{ width: w * scale, height: h * scale, transform: "translateX(-50%)" }}
      >
        {url && (
          <iframe
            ref={frameRef}
            src={url}
            title="Page preview"
            className="origin-top-left border-0"
            style={{ width: w, height: h, transform: `scale(${scale})` }}
          />
        )}
        {loading && (
          <div className="absolute inset-0 grid place-items-center bg-white/80 backdrop-blur-sm">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin text-teal" /> Loading the live preview…
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- editor ------------------------------- */

type Picked = { kind: "none" } | { kind: "area"; area: "header" | "footer" | "other" } | { kind: "global" } | { kind: "section"; matched: boolean; text: string };

export function VisualEditor(props: {
  page: PageDoc;
  details: Record<string, unknown>;
  setDetails: (d: Record<string, unknown>) => void;
  sections: Section[];
  patch: (i: number, p: Partial<Section>) => void;
  move: (i: number, d: -1 | 1) => void;
  remove: (i: number) => void;
  defs: Record<string, SectionDef>;
  sharedLinks: Record<string, string>;
  perms: { write: boolean; publish: boolean; delete: boolean; seo: boolean };
  coded: boolean;
  fixedOrder: boolean;
  errors: Record<string, string | string[]>;
  dirty: boolean;
  pending: boolean;
  saveState: SaveState;
  saveError: string;
  busy: string | null;
  selected: string | null;
  onSelect: (key: string | null) => void;
  onSave: () => void;
  onPublish: () => void;
  onAction: (kind: "unpublish" | "discard" | "delete") => void;
  onDiscardLocal: () => void;
  onAdd: () => void;
  onFormView: () => void;
  getPreviewUrl: () => Promise<string>;
  bridgeRef: BridgeRef;
}) {
  const { page, details, sections, defs, sharedLinks, perms, selected, onSelect, bridgeRef } = props;
  const [url, setUrl] = useState<string | null>(null);
  // bumps every time the preview (re)loads, so mode/labels/selection are sent to each new page
  const [readyN, setReadyN] = useState(0);
  const ready = readyN > 0;
  const [device, setDevice] = useState<Device>("desktop");
  const [mode, setMode] = useState<"edit" | "browse">("edit");
  const [tab, setTab] = useState<"content" | "seo" | "settings">("content");
  const [focus, setFocus] = useState<FieldFocusValue>(null);
  const [picked, setPicked] = useState<Picked>({ kind: "none" });
  const [framePath, setFramePath] = useState(page.path);
  const [menu, setMenu] = useState(false);
  const frame = useRef<HTMLIFrameElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const sent = useRef(new Map<string, string>());
  const focusN = useRef(0);

  const post = useCallback((m: Record<string, unknown>) => frame.current?.contentWindow?.postMessage(m, FRONT_ORIGIN), []);
  useEffect(() => {
    bridgeRef.current = post;
    return () => {
      bridgeRef.current = null;
    };
  }, [bridgeRef, post]);

  // signed preview link (turns on draft mode in the frame), loaded once
  const { getPreviewUrl } = props;
  useEffect(() => {
    let live = true;
    getPreviewUrl()
      .then((u) => live && setUrl(u))
      .catch(() => live && setUrl(`${FRONT}${page.path}`));
    return () => {
      live = false;
    };
  }, [getPreviewUrl, page.path]);

  const labels = useMemo(() => Object.fromEntries(sections.map((s) => [s.key, s.label || defs[s.component]?.label || s.key])), [sections, defs]);
  const valuesOf = useCallback((s: Section) => {
    const def = defs[s.component];
    return def?.generated ? { ...def.defaults, ...s.content } : s.content;
  }, [defs]);

  // messages from the frame
  const sectionsRef = useRef(sections);
  useEffect(() => {
    sectionsRef.current = sections;
  }, [sections]);
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== FRONT_ORIGIN || e.source !== frame.current?.contentWindow) return;
      const m = e.data as { type?: string; key?: string | null; area?: string | null; kind?: string; text?: string; nodeText?: string; src?: string; path?: string };
      if (m?.type === "ready") {
        sent.current.clear();
        setReadyN((n) => n + 1);
        if (m.path) setFramePath(m.path);
      } else if (m?.type === "path" && m.path) setFramePath(m.path);
      else if (m?.type === "select") {
        setTab("content");
        if (!m.key) {
          onSelect(null);
          setPicked({ kind: "area", area: m.area === "header" ? "header" : m.area === "footer" ? "footer" : "other" });
          return;
        }
        if (m.key.startsWith("global:")) {
          onSelect(null);
          setPicked({ kind: "global" });
          return;
        }
        const s = sectionsRef.current.find((x) => x.key === m.key);
        if (!s) return;
        onSelect(s.key);
        const def = defs[s.component];
        const path = def && !sharedLinks[s.component] ? matchField(leaves(def.fields, valuesOf(s)), m.kind ?? "text", m.text ?? "", m.src ?? "", m.nodeText ?? "") : null;
        setPicked({ kind: "section", matched: !!path, text: (m.nodeText || m.text || "").slice(0, 80) });
        setFocus(path ? { path, n: ++focusN.current } : null);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [defs, sharedLinks, onSelect, valuesOf]);

  // keep the frame in sync: edit/browse mode, section names, selection, unsaved text (instant)
  useEffect(() => {
    if (readyN) post({ type: "mode", mode });
  }, [readyN, mode, post]);
  useEffect(() => {
    if (readyN) post({ type: "labels", labels });
  }, [readyN, labels, post]);
  useEffect(() => {
    if (readyN) post({ type: "focus", key: selected });
  }, [readyN, selected, post]);
  useEffect(() => {
    if (!readyN) return;
    for (const s of sections) {
      if (sharedLinks[s.component]) continue;
      const j = JSON.stringify(s.content);
      if (sent.current.get(s.key) === j) continue;
      sent.current.set(s.key, j);
      post({ type: "content", key: s.key, content: s.content });
    }
  }, [readyN, sections, sharedLinks, post]);

  // show the requested field in the side panel
  useEffect(() => {
    if (!focus) return;
    let tries = 0;
    let raf = 0;
    const tick = () => {
      const el = findField(panel.current, focus.path);
      if (el) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        el.classList.remove("vfocus");
        void el.offsetWidth;
        el.classList.add("vfocus");
        // the formatting editor loads a moment later than its box: keep trying to put the cursor in it
        let waits = 0;
        const focusIt = () => {
          const input = el.querySelector<HTMLElement>('input:not([type=checkbox]):not([type=hidden]), textarea, [contenteditable="true"]');
          if (input) input.focus({ preventScroll: true });
          else if (waits++ < 90) raf = requestAnimationFrame(focusIt);
        };
        focusIt();
      } else if (tries++ < 30) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [focus]);

  const selectFromList = (key: string) => {
    onSelect(key);
    setFocus(null);
    setPicked({ kind: "none" });
    setTab("content");
    post({ type: "focus", key, scroll: true });
  };

  const idx = sections.findIndex((s) => s.key === selected);
  const sel = idx >= 0 ? sections[idx] : null;
  const def = sel ? defs[sel.component] : undefined;
  const sharedAt = sel ? sharedLinks[sel.component] : undefined;
  const offPage = framePath.replace(/\/$/, "") !== page.path.replace(/\/$/, "") && !(framePath === "/" && page.path === "/");

  const status = (
    <span className="hidden items-center gap-1.5 text-xs font-medium xl:flex">
      {props.saveState === "saving" ? (
        <><Loader2 className="h-3.5 w-3.5 animate-spin text-slate-400" /> <span className="text-slate-500">Saving draft…</span></>
      ) : props.saveState === "error" ? (
        <span className="flex items-center gap-1 text-rose-600" title={props.saveError}><AlertCircle className="h-3.5 w-3.5" /> Not saved</span>
      ) : props.dirty ? (
        <span className="text-amber-600">Unsaved…</span>
      ) : props.saveState === "saved" ? (
        <span className="flex items-center gap-1 text-emerald-600"><Check className="h-3.5 w-3.5" /> Draft saved</span>
      ) : null}
    </span>
  );

  return (
    <div className="fixed inset-x-0 bottom-0 top-16 z-20 flex flex-col bg-[#eef1f4] lg:left-64">
      {/* top bar */}
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4">
        <div className="flex min-w-0 items-center gap-2">
          <Link href="/admin/pages" className="text-sm text-slate-500 hover:text-teal">Pages</Link>
          <span className="text-slate-300">/</span>
          <span className="truncate text-sm font-semibold text-slate-900">{String(details.title ?? page.title)}</span>
          <Badge value={page.status} />
          {props.pending && page.status === "published" && <span className="hidden 2xl:inline"><Badge value="changes" label="unpublished changes" /></span>}
        </div>

        <div className="mx-auto flex items-center gap-2">
          <div className="flex rounded-xl bg-slate-100 p-1">
            {(Object.keys(DEVICES) as Device[]).map((d) => {
              const D = DEVICES[d];
              return (
                <button key={d} type="button" title={D.label} onClick={() => setDevice(d)} className={`grid h-8 w-9 place-items-center rounded-lg transition ${device === d ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>
                  <D.icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button type="button" onClick={() => setMode("edit")} title="Click texts and images to edit them" className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition ${mode === "edit" ? "bg-white text-teal shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>
              <MousePointerClick className="h-4 w-4" /> <span className="hidden xl:inline">Edit</span>
            </button>
            <button type="button" onClick={() => setMode("browse")} title="Use the page normally: sliders, tabs, links" className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition ${mode === "browse" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>
              <Hand className="h-4 w-4" /> <span className="hidden xl:inline">Browse</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {status}
          {page.status === "published" && (
            <a href={`${FRONT}${page.path}`} target="_blank" rel="noreferrer" className="hidden lg:block">
              <Button variant="secondary" size="sm"><ExternalLink className="h-4 w-4" /> <span className="hidden 2xl:inline">View live</span></Button>
            </a>
          )}
          <div className="relative">
            <Button variant="secondary" size="sm" onClick={() => setMenu((m) => !m)} aria-label="More actions"><MoreHorizontal className="h-4 w-4" /></Button>
            {menu && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setMenu(false)} />
                <div className="absolute right-0 z-40 mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-xl">
                  <MenuItem icon={<LayoutList className="h-4 w-4" />} onClick={() => { setMenu(false); props.onFormView(); }}>Switch to form view</MenuItem>
                  {url && <MenuItem icon={<Eye className="h-4 w-4" />} onClick={() => { setMenu(false); window.open(url, "_blank", "noopener"); }}>Open preview in a new tab</MenuItem>}
                  {props.dirty && <MenuItem icon={<Undo2 className="h-4 w-4" />} onClick={() => { setMenu(false); props.onDiscardLocal(); }}>Undo unsaved edits</MenuItem>}
                  {perms.publish && page.hasUnpublishedChanges && <MenuItem icon={<RotateCcw className="h-4 w-4" />} onClick={() => { setMenu(false); props.onAction("discard"); }}>Discard draft (back to live)</MenuItem>}
                  {perms.publish && page.status === "published" && <MenuItem icon={<EyeOff className="h-4 w-4" />} onClick={() => { setMenu(false); props.onAction("unpublish"); }}>Unpublish page</MenuItem>}
                  {!props.coded && perms.delete && <MenuItem danger icon={<Trash2 className="h-4 w-4" />} onClick={() => { setMenu(false); props.onAction("delete"); }}>Delete page</MenuItem>}
                </div>
              </>
            )}
          </div>
          {(perms.write || perms.seo) && (
            <Button variant="secondary" size="sm" onClick={props.onSave} loading={props.busy === "save"} disabled={!props.dirty}>
              <Save className="h-4 w-4" /> <span className="hidden xl:inline">Save draft</span>
            </Button>
          )}
          {perms.publish && (
            <Button variant="teal" size="sm" onClick={props.onPublish} loading={props.busy === "publish"} disabled={!props.dirty && !props.pending}>
              <Send className="h-4 w-4" /> Publish
            </Button>
          )}
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* page structure */}
        <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-200 bg-white xl:flex">
          <div className="flex items-center justify-between px-4 pb-2 pt-4">
            <h2 className="text-sm font-bold text-slate-900">Page structure</h2>
            {!props.coded && perms.write && (
              <button type="button" onClick={props.onAdd} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-teal hover:bg-teal/10">
                <Plus className="h-3.5 w-3.5" /> Add section
              </button>
            )}
          </div>
          <ol className="sidebar-scroll min-h-0 flex-1 space-y-1.5 overflow-y-auto px-3 pb-4">
            {sections.map((s, i) => {
              const d = defs[s.component];
              const shared = !!sharedLinks[s.component];
              const n = d?.fields.length ?? 0;
              const active = s.key === selected;
              return (
                <li key={s.key} className={`group rounded-xl border transition ${active ? "border-teal/40 bg-teal/[0.06] shadow-[0_8px_20px_-16px_rgba(13,148,136,0.7)]" : s.enabled ? "border-slate-200 bg-white hover:border-slate-300" : "border-dashed border-slate-300 bg-slate-50"}`}>
                  <div className="flex items-center gap-2 px-2.5 py-2">
                    <button type="button" onClick={() => selectFromList(s.key)} className="flex min-w-0 flex-1 items-center gap-2.5 text-left">
                      <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[11px] font-bold ${active ? "bg-teal text-white" : "bg-slate-100 text-slate-500"}`}>{i + 1}</span>
                      <span className="min-w-0">
                        <span className={`block truncate text-[13px] font-semibold ${s.enabled ? "text-slate-800" : "text-slate-400 line-through"}`}>{labels[s.key]}</span>
                        <span className="block truncate text-[11px] text-slate-500">
                          {shared ? "Shared on all pages" : n ? `${n} texts, links & images` : "Layout only"}
                          {s.changed ? " · unpublished" : ""}
                        </span>
                      </span>
                    </button>
                    {perms.write && (
                      <span className={`flex items-center ${active ? "" : "opacity-0 group-hover:opacity-100"} transition`}>
                        {!props.fixedOrder && (
                          <>
                            <IconBtn title="Move up" disabled={i === 0} onClick={() => props.move(i, -1)}><ArrowUp className="h-3.5 w-3.5" /></IconBtn>
                            <IconBtn title="Move down" disabled={i === sections.length - 1} onClick={() => props.move(i, 1)}><ArrowDown className="h-3.5 w-3.5" /></IconBtn>
                          </>
                        )}
                        <IconBtn title={s.enabled ? "Hide on website" : "Show on website"} onClick={() => props.patch(i, { enabled: !s.enabled })}>
                          {s.enabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5 text-slate-400" />}
                        </IconBtn>
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* live preview */}
        <div className="relative min-w-0 flex-1">
          {offPage && (
            <div className="absolute left-1/2 top-5 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-navy px-4 py-2 text-xs text-white shadow-lg">
              <Info className="h-3.5 w-3.5" /> You opened <b className="font-mono">{framePath}</b> - edits here are for {page.path}
              <button type="button" className="rounded-full bg-white/15 px-2.5 py-1 font-semibold hover:bg-white/25" onClick={() => { if (frame.current) { setReadyN(0); frame.current.src = `${FRONT}${page.path}`; } }}>
                Back to this page
              </button>
            </div>
          )}
          <Canvas url={url} device={device} frameRef={frame} loading={!ready} />
        </div>

        {/* inspector */}
        <aside className="flex w-[400px] shrink-0 flex-col border-l border-slate-200 bg-white 2xl:w-[440px]">
          <div className="flex shrink-0 gap-1 border-b border-slate-200 px-3 pt-2">
            {([
              ["content", "Content", FileText],
              ["seo", "SEO", Search],
              ["settings", "Settings", Settings2],
            ] as const).map(([t, label, Icon]) => (
              <button key={t} type="button" onClick={() => setTab(t)} className={`-mb-px flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-semibold transition ${tab === t ? "border-teal text-teal" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </div>
          <div ref={panel} className="vpanel sidebar-scroll min-h-0 flex-1 overflow-y-auto p-4">
            {tab === "content" && (
              <>
                {picked.kind === "area" && (
                  <Note icon={<Info className="h-4 w-4" />}>
                    {picked.area === "header" ? (
                      <>The menu at the top is the same on every page. Edit its links in <Link className="font-semibold text-teal hover:underline" href="/admin/navigation">Navigation</Link>, the logo and button in <Link className="font-semibold text-teal hover:underline" href="/admin/settings">Settings</Link>.</>
                    ) : picked.area === "footer" ? (
                      <>The footer is the same on every page. Edit it in <Link className="font-semibold text-teal hover:underline" href="/admin/settings">Settings</Link> and <Link className="font-semibold text-teal hover:underline" href="/admin/navigation">Navigation</Link>.</>
                    ) : (
                      <>That part of the page is fixed in the design. Click a highlighted section instead.</>
                    )}
                  </Note>
                )}
                {picked.kind === "global" && (
                  <Note icon={<Link2 className="h-4 w-4" />}>This section is shared by the whole website. Edit it once under <Link className="font-semibold text-teal hover:underline" href="/admin/global">Global (all pages)</Link>.</Note>
                )}
                {!sel && picked.kind === "none" && <EmptyInspector />}
                {sel && (
                  <div>
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Section {idx + 1} of {sections.length}</p>
                        <h3 className="truncate text-lg font-bold text-slate-900">{labels[sel.key]}</h3>
                        {def?.description && <p className="mt-0.5 text-xs text-slate-500">{def.description}</p>}
                      </div>
                      {perms.write && (
                        <button type="button" onClick={() => props.patch(idx, { enabled: !sel.enabled })} className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ring-1 ${sel.enabled ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-slate-100 text-slate-500 ring-slate-200"}`}>
                          {sel.enabled ? <><Eye className="h-3.5 w-3.5" /> Shown</> : <><EyeOff className="h-3.5 w-3.5" /> Hidden</>}
                        </button>
                      )}
                    </div>
                    {picked.kind === "section" && !picked.matched && !sharedAt && !!def?.fields.length && picked.text && (
                      <Note icon={<Info className="h-4 w-4" />} tone="amber">
                        &ldquo;{picked.text}&rdquo; is part of the design, not an editable text. The texts and images you can change in this section are below.
                      </Note>
                    )}
                    {sharedAt ? (
                      <div className="rounded-2xl border border-teal/20 bg-teal/[0.05] p-4 text-sm text-slate-600">
                        <p className="font-semibold text-slate-800">Shared on all pages</p>
                        <p className="mt-1 text-xs">This section looks the same everywhere, so it is edited once for the whole website. Here you can only show or hide it on this page.</p>
                        <Link href={sharedAt} className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-teal px-3 py-2 text-xs font-semibold text-white hover:bg-teal/90">
                          <Link2 className="h-3.5 w-3.5" /> Edit the shared section
                        </Link>
                      </div>
                    ) : def?.fields.length ? (
                      <FieldFocus.Provider value={focus}>
                        <fieldset disabled={!perms.write}>
                          <FieldGroup
                            fields={def.fields}
                            values={def.generated ? { ...def.defaults, ...sel.content } : sel.content}
                            defaults={def.generated ? def.defaults : undefined}
                            onChange={(c) => props.patch(idx, { content: c })}
                            errors={props.errors}
                          />
                        </fieldset>
                        {perms.write && Object.keys(def.defaults).length > 0 && (
                          <button type="button" className="mt-4 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-teal" onClick={() => props.patch(idx, { content: def.generated ? {} : structuredClone(def.defaults) })}>
                            <RotateCcw className="h-3 w-3" /> Reset this section to the website&apos;s original
                          </button>
                        )}
                      </FieldFocus.Provider>
                    ) : (
                      <Note icon={<Lock className="h-4 w-4" />}>This section is layout only: it has no texts or images to change here.</Note>
                    )}
                  </div>
                )}
              </>
            )}

            {tab === "seo" && (
              <fieldset disabled={!perms.write && !perms.seo}>
                <p className="mb-3 text-xs text-slate-500">What Google and social apps show for this page. Saved with the page and live after Publish.</p>
                <FieldGroup values={details} onChange={props.setDetails} errors={props.errors} fields={[{ name: "seo", label: "SEO", type: "seo" }]} />
              </fieldset>
            )}

            {tab === "settings" && (
              <div className="space-y-5">
                <fieldset disabled={!perms.write}>
                  <FieldGroup
                    values={details}
                    onChange={props.setDetails}
                    errors={props.errors}
                    fields={[
                      { name: "title", label: "Page name (admin)", type: "text", required: true, max: 200 },
                      { name: "slug", label: "URL path", type: "slug", help: props.coded ? "Fixed for designed pages." : "Changing this changes the page URL." },
                      { name: "description", label: "Description", type: "textarea", max: 1000 },
                      { name: "featuredImage", label: "Featured image", type: "image" },
                    ]}
                  />
                </fieldset>
                {sel && perms.write && !props.coded && (
                  <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4">
                    <p className="text-sm font-semibold text-slate-800">{labels[sel.key]}</p>
                    <button type="button" onClick={() => { props.remove(idx); onSelect(null); }} className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:underline">
                      <Trash2 className="h-3.5 w-3.5" /> Remove this section from the page
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {props.saveState === "error" && props.saveError && (
            <p className="shrink-0 border-t border-rose-100 bg-rose-50 px-4 py-2 text-xs text-rose-700">Not saved: {props.saveError}</p>
          )}
        </aside>
      </div>
    </div>
  );
}

function IconBtn({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...p} className="grid h-6 w-6 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30">
      {children}
    </button>
  );
}

function MenuItem({ icon, children, onClick, danger }: { icon: ReactNode; children: ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left transition hover:bg-slate-50 ${danger ? "text-rose-600" : "text-slate-700"}`}>
      {icon}
      {children}
    </button>
  );
}

function Note({ icon, children, tone = "slate" }: { icon: ReactNode; children: ReactNode; tone?: "slate" | "amber" }) {
  return (
    <div className={`mb-4 flex gap-2.5 rounded-xl px-3.5 py-3 text-xs leading-relaxed ring-1 ${tone === "amber" ? "bg-amber-50 text-amber-800 ring-amber-200" : "bg-slate-50 text-slate-600 ring-slate-200"}`}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function EmptyInspector() {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal/15 to-teal/5 text-teal ring-1 ring-teal/20">
        <MousePointerClick className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-base font-bold text-slate-900">Click anything on the page</h3>
      <p className="mt-1 max-w-[17rem] text-sm text-slate-500">A heading, a paragraph, a button or an image: its field opens here so you can change it.</p>
      <ul className="mt-6 w-full space-y-2 text-left text-xs text-slate-600">
        {[
          [MousePointerClick, "Edit mode: click a text or image to edit it. Links don't open."],
          [Hand, "Browse mode: use the page normally (sliders, tabs, links)."],
          [Monitor, "Check how it looks on desktop, tablet and mobile."],
          [Save, "Edits are saved as a draft automatically. Visitors see them only after Publish."],
        ].map(([Icon, t], i) => {
          const I = Icon as typeof Save;
          return (
            <li key={i} className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5 ring-1 ring-slate-200/70">
              <I className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
              {t as string}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
