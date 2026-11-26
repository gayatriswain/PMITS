"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AlignLeft, FormInput, Heading, ImageIcon, Link2, List, MousePointerClick, RotateCcw, Search, Type } from "lucide-react";
import { FieldInput, type FieldDef } from "./fields";

type Values = Record<string, unknown>;
type Errors = Record<string, string | string[]>;

/**
 * Friendly editor for a coded section's content (the auto-detected texts, links and images of a
 * website section). Instead of one long list of "Text: …" inputs it shows typed cards (heading,
 * paragraph, button, image…), pairs a button's text with its link and an image with its
 * description, offers filter tabs + search, and marks/undoes what was changed from the original.
 */

type Kind = "heading" | "text" | "paragraph" | "button" | "link" | "image" | "alt" | "form" | "list";
type Tab = "all" | "text" | "buttons" | "images" | "lists" | "form";

const KIND: Record<Kind, { label: string; icon: typeof Type; cls: string; tab: Tab }> = {
  heading: { label: "Heading", icon: Heading, cls: "bg-indigo-50 text-indigo-700 ring-indigo-200", tab: "text" },
  text: { label: "Text", icon: Type, cls: "bg-slate-100 text-slate-700 ring-slate-200", tab: "text" },
  paragraph: { label: "Paragraph", icon: AlignLeft, cls: "bg-sky-50 text-sky-700 ring-sky-200", tab: "text" },
  button: { label: "Button", icon: MousePointerClick, cls: "bg-teal-50 text-teal-700 ring-teal-200", tab: "buttons" },
  link: { label: "Link", icon: Link2, cls: "bg-teal-50 text-teal-700 ring-teal-200", tab: "buttons" },
  image: { label: "Image", icon: ImageIcon, cls: "bg-amber-50 text-amber-700 ring-amber-200", tab: "images" },
  alt: { label: "Image description", icon: ImageIcon, cls: "bg-amber-50 text-amber-700 ring-amber-200", tab: "images" },
  form: { label: "Form text", icon: FormInput, cls: "bg-violet-50 text-violet-700 ring-violet-200", tab: "form" },
  list: { label: "List", icon: List, cls: "bg-rose-50 text-rose-700 ring-rose-200", tab: "lists" },
};

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "text", label: "Headings & text" },
  { id: "buttons", label: "Buttons & links" },
  { id: "images", label: "Images" },
  { id: "lists", label: "Lists & cards" },
  { id: "form", label: "Form texts" },
];

function classify(f: FieldDef): { kind: Kind; sub?: string } {
  if (f.type === "list" || f.type === "textlist") return { kind: "list" };
  if (f.type === "image") return { kind: "image" };
  if (f.type === "href") return { kind: "link" };
  const prefix = (f.label.match(/^([^:]+):/) ?? [])[1]?.trim() ?? "";
  const h = prefix.match(/^Heading \((H\d)\)/);
  if (h) return { kind: "heading", sub: h[1] };
  if (/^Paragraph/i.test(prefix) || f.type === "richinline") return { kind: "paragraph" };
  if (/^(Link text|Button text)/i.test(prefix)) return { kind: "button" };
  if (/^Image alt/i.test(prefix)) return { kind: "alt" };
  if (/^(Placeholder|Option)/i.test(prefix)) return { kind: "form", sub: (prefix.match(/\(([^)]+)\)/) ?? [])[1] };
  return { kind: "text" };
}

type Block =
  | { type: "single"; kind: Kind; sub?: string; field: FieldDef }
  | { type: "button"; text: FieldDef; href: FieldDef }
  | { type: "image"; image: FieldDef; alt: FieldDef };

/** Walk the fields in page order and pair link+text (buttons) and image+description. */
function toBlocks(fields: FieldDef[]): Block[] {
  const out: Block[] = [];
  for (let i = 0; i < fields.length; i++) {
    const f = fields[i];
    const c = classify(f);
    const next = fields[i + 1];
    const nc = next ? classify(next) : null;
    if (c.kind === "link" && next && nc && (nc.kind === "button" || nc.kind === "text")) {
      out.push({ type: "button", href: f, text: next });
      i++;
    } else if (c.kind === "button" && next && nc?.kind === "link") {
      out.push({ type: "button", text: f, href: next });
      i++;
    } else if (c.kind === "image" && next && nc?.kind === "alt") {
      out.push({ type: "image", image: f, alt: next });
      i++;
    } else out.push({ type: "single", kind: c.kind, sub: c.sub, field: f });
  }
  return out;
}

const blockKind = (b: Block): Kind => (b.type === "button" ? "button" : b.type === "image" ? "image" : b.kind);
const blockFields = (b: Block): FieldDef[] => (b.type === "button" ? [b.text, b.href] : b.type === "image" ? [b.image, b.alt] : [b.field]);
const wide = (b: Block) => b.type !== "single" || ["paragraph", "list", "image"].includes(b.kind);
const same = (a: unknown, b: unknown) => JSON.stringify(a ?? "") === JSON.stringify(b ?? "");
const plain = (v: unknown) => (typeof v === "string" ? v.replace(/<[^>]+>/g, "").trim() : "");

function Chip({ kind, sub }: { kind: Kind; sub?: string }) {
  const k = KIND[kind];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-semibold ring-1 ring-inset ${k.cls}`}>
      <k.icon className="h-3.5 w-3.5" />
      {k.label}
      {sub && <span className="opacity-70">{sub}</span>}
    </span>
  );
}

export function SectionFields({
  fields,
  values,
  defaults = {},
  onChange,
  errors = {},
  prefix = "",
}: {
  fields: FieldDef[];
  values: Values;
  defaults?: Values;
  onChange: (v: Values) => void;
  errors?: Errors;
  prefix?: string;
}) {
  const [tab, setTab] = useState<Tab>("all");
  const [q, setQ] = useState("");
  const blocks = useMemo(() => toBlocks(fields), [fields]);
  const v = values ?? {};
  const isEdited = (f: FieldDef) => f.name in defaults && !same(v[f.name], defaults[f.name]);
  const edited = blocks.filter((b) => blockFields(b).some(isEdited)).length;

  const counts = useMemo(() => {
    const c: Record<Tab, number> = { all: blocks.length, text: 0, buttons: 0, images: 0, lists: 0, form: 0 };
    for (const b of blocks) c[KIND[blockKind(b)].tab]++;
    return c;
  }, [blocks]);

  const needle = q.trim().toLowerCase();
  const shown = blocks.filter((b) => {
    if (tab !== "all" && KIND[blockKind(b)].tab !== tab) return false;
    if (!needle) return true;
    return blockFields(b).some((f) => `${f.label} ${plain(v[f.name])} ${plain(defaults[f.name])}`.toLowerCase().includes(needle));
  });

  const set = (name: string, nv: unknown) => onChange({ ...v, [name]: nv });
  const undo = (b: Block) => {
    const next = { ...v };
    for (const f of blockFields(b)) if (f.name in defaults) next[f.name] = defaults[f.name];
    onChange(next);
  };

  const input = (f: FieldDef, hideLabel = true, labelOverride?: string) => (
    <FieldInput
      field={labelOverride ? { ...f, label: labelOverride } : f}
      value={v[f.name]}
      errors={errors}
      path={prefix ? `${prefix}.${f.name}` : f.name}
      onChange={(nv) => set(f.name, nv)}
      hideLabel={hideLabel}
    />
  );

  const card = (b: Block, i: number): ReactNode => {
    const changed = blockFields(b).some(isEdited);
    const kind = blockKind(b);
    const head = (
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <Chip kind={kind} sub={b.type === "single" ? b.sub : undefined} />
        {changed && (
          <span className="flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">Edited</span>
            <button type="button" onClick={() => undo(b)} className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-teal" title="Back to the website's original">
              <RotateCcw className="h-3 w-3" /> Undo
            </button>
          </span>
        )}
      </div>
    );
    const original = (f: FieldDef) =>
      isEdited(f) && plain(defaults[f.name]) ? (
        <p className="mt-1.5 truncate text-[11px] text-slate-400" title={plain(defaults[f.name])}>
          Original: {plain(defaults[f.name])}
        </p>
      ) : null;
    return (
      <div
        key={i}
        className={`rounded-2xl border bg-white p-4 transition ${changed ? "border-amber-300 shadow-[0_0_0_3px_rgba(251,191,36,0.12)]" : "border-slate-200 hover:border-slate-300"} ${wide(b) ? "sm:col-span-2" : ""}`}
      >
        {head}
        {b.type === "button" ? (
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Button text</p>
              {input(b.text)}
              {original(b.text)}
            </div>
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Opens (link)</p>
              {input(b.href)}
              {original(b.href)}
            </div>
          </div>
        ) : b.type === "image" ? (
          <div className="space-y-3">
            {input(b.image)}
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Image description (for Google & screen readers)</p>
              {input(b.alt)}
            </div>
          </div>
        ) : b.kind === "list" ? (
          input(b.field, false, b.field.label.replace(/^[^:]+:\s*/, ""))
        ) : (
          <>
            {input(b.field)}
            {original(b.field)}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="sm:col-span-2">
      {/* toolbar */}
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-2 lg:flex-row lg:items-center">
        <div className="flex flex-wrap gap-1">
          {TABS.filter((t) => t.id === "all" || counts[t.id] > 0).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${tab === t.id ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-800"}`}
            >
              {t.label} <span className="ml-0.5 text-slate-400">{counts[t.id]}</span>
            </button>
          ))}
        </div>
        <label className="relative lg:ml-auto lg:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Find text in this section…"
            className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-teal focus:ring-4 focus:ring-teal/10"
          />
        </label>
      </div>
      {edited > 0 && (
        <p className="mb-3 text-xs text-amber-700">
          {edited} {edited === 1 ? "change" : "changes"} in this section. Click <b>Save draft</b> to keep them, then <b>Publish</b> to show them on the website.
        </p>
      )}
      {shown.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-500">Nothing matches. Try another tab or search word.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">{shown.map(card)}</div>
      )}
    </div>
  );
}
