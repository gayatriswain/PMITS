"use client";

import { useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowUp, ImageIcon, Plus, Trash2, X } from "lucide-react";
import { api, qs } from "@/lib/client/api";
import { MediaPicker, Thumb } from "./MediaPicker";
import { Button } from "./ui";
import { PasswordInput } from "./PasswordInput";

const RichTextEditor = dynamic(() => import("./RichTextEditor").then((m) => m.RichTextEditor), {
  ssr: false,
  loading: () => <div className="h-72 animate-pulse rounded-lg border border-slate-200 bg-slate-50" />,
});
const InlineRichText = dynamic(() => import("./InlineRichText").then((m) => m.InlineRichText), {
  ssr: false,
  loading: () => <div className="h-[76px] animate-pulse rounded-lg border border-slate-200 bg-slate-50" />,
});

export type FieldType =
  | "text" | "textarea" | "richtext" | "richinline" | "image" | "link" | "number" | "boolean" | "select" | "list"
  | "tags" | "date" | "datetime" | "relation" | "seo" | "email" | "url" | "password" | "textlist" | "slug" | "json" | "href" | "group";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  help?: string;
  max?: number;
  required?: boolean;
  options?: { value: string; label: string }[];
  fields?: FieldDef[];
  maxItems?: number;
  /** relation: resource to pick from + label key */
  relation?: { resource: string; labelKey: string; multiple?: boolean };
  /** slug: field to derive from */
  from?: string;
  placeholder?: string;
  /** Show the field in a half-width column on wide screens. */
  half?: boolean;
  /** group: its fields read/write the parent object directly (presentational grouping only). */
  flat?: boolean;
};

type Errors = Record<string, string | string[]>;
type Values = Record<string, unknown>;

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal focus:ring-2 focus:ring-teal/15 disabled:bg-slate-50";

export function Label({ children, htmlFor, required, help }: { children: ReactNode; htmlFor?: string; required?: boolean; help?: string }) {
  return (
    <div className="mb-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
        {children}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>
      {help && <p className="mt-0.5 text-xs text-slate-500">{help}</p>}
    </div>
  );
}

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 120);

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50">
        {value ? <Thumb item={{ url: value, mimeType: "image/*" }} className="h-full w-full" /> : <ImageIcon className="h-6 w-6 text-slate-300" />}
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <input className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} placeholder="/images/photo.webp or https://…" />
        <div className="flex gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={() => setOpen(true)}>
            Choose from library
          </Button>
          {value && (
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
              Remove
            </Button>
          )}
        </div>
      </div>
      {open && (
        <MediaPicker
          onClose={() => setOpen(false)}
          onSelect={(m) => {
            onChange(m.url);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

function TagsField({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const t = draft.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setDraft("");
  };
  return (
    <div className={`${inputCls} flex flex-wrap items-center gap-1.5 py-1.5`}>
      {value.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
          {t}
          <button type="button" aria-label={`Remove ${t}`} onClick={() => onChange(value.filter((x) => x !== t))}>
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          } else if (e.key === "Backspace" && !draft && value.length) onChange(value.slice(0, -1));
        }}
        onBlur={add}
        placeholder={value.length ? "" : placeholder ?? "Type and press Enter"}
        className="min-w-[120px] flex-1 bg-transparent text-sm outline-none"
      />
    </div>
  );
}

function RelationField({ value, onChange, relation }: { value: string[] | string; onChange: (v: string[] | string) => void; relation: NonNullable<FieldDef["relation"]> }) {
  const [options, setOptions] = useState<{ _id: string; [k: string]: unknown }[]>([]);
  useEffect(() => {
    api<{ items: { _id: string }[] }>(`/api/admin/resources/${relation.resource}${qs({ limit: 100 })}`)
      .then((d) => setOptions(d.items as { _id: string }[]))
      .catch(() => setOptions([]));
  }, [relation.resource]);
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  if (!relation.multiple) {
    return (
      <select className={inputCls} value={(value as string) || ""} onChange={(e) => onChange(e.target.value)}>
        <option value="">— None —</option>
        {options.map((o) => (
          <option key={o._id} value={o._id}>
            {String(o[relation.labelKey])}
          </option>
        ))}
      </select>
    );
  }
  return (
    <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-slate-200 p-2">
      {options.length === 0 && <p className="px-1 py-2 text-xs text-slate-400">Nothing to choose yet.</p>}
      {options.map((o) => (
        <label key={o._id} className="flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 text-sm hover:bg-slate-50">
          <input
            type="checkbox"
            className="accent-teal"
            checked={selected.includes(o._id)}
            onChange={(e) => onChange(e.target.checked ? [...selected, o._id] : selected.filter((x) => x !== o._id))}
          />
          {String(o[relation.labelKey])}
        </label>
      ))}
    </div>
  );
}

function ListField({ field, value, onChange, errors, path }: { field: FieldDef; value: Values[]; onChange: (v: Values[]) => void; errors: Errors; path: string }) {
  const items = Array.isArray(value) ? value : [];
  const max = field.maxItems ?? 50;
  const move = (i: number, d: -1 | 1) => {
    const next = [...items];
    const [x] = next.splice(i, 1);
    next.splice(i + d, 0, x);
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {field.label} #{i + 1}
            </span>
            <div className="flex gap-1">
              <Button type="button" variant="ghost" size="sm" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"><ArrowUp className="h-3.5 w-3.5" /></Button>
              <Button type="button" variant="ghost" size="sm" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><ArrowDown className="h-3.5 w-3.5" /></Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange(items.filter((_, j) => j !== i))} aria-label="Remove"><Trash2 className="h-3.5 w-3.5 text-rose-500" /></Button>
            </div>
          </div>
          <FieldGroup fields={field.fields ?? []} values={item} onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))} errors={errors} prefix={`${path}.${i}`} />
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" disabled={items.length >= max} onClick={() => onChange([...items, {}])}>
        <Plus className="h-4 w-4" /> Add {field.label.replace(/s$/, "").toLowerCase()}
      </Button>
    </div>
  );
}

function SeoField({ value, onChange, errors, path }: { value: Values; onChange: (v: Values) => void; errors: Errors; path: string }) {
  const v = value ?? {};
  const title = String(v.title ?? "");
  const desc = String(v.description ?? "");
  return (
    <div className="space-y-4 rounded-lg border border-slate-200 p-4">
      <div className="rounded-lg bg-slate-50 p-3">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Google preview</p>
        <p className="mt-1 truncate text-[15px] text-[#1a0dab]">{title || "Page title"}</p>
        <p className="line-clamp-2 text-xs text-slate-600">{desc || "Meta description shown in search results."}</p>
      </div>
      <FieldGroup
        values={v}
        onChange={onChange}
        errors={errors}
        prefix={path}
        fields={[
          { name: "title", label: `SEO title (${title.length}/60 recommended)`, type: "text", max: 160 },
          { name: "description", label: `Meta description (${desc.length}/160 recommended)`, type: "textarea", max: 320 },
          { name: "canonical", label: "Canonical URL", type: "url", help: "Leave empty to use this page's own URL.", half: true },
          { name: "ogImage", label: "Social share image (Open Graph)", type: "image" },
          { name: "ogTitle", label: "Social title", type: "text", max: 160, half: true },
          { name: "ogDescription", label: "Social description", type: "text", max: 320, half: true },
          { name: "twitterCard", label: "Twitter card", type: "select", options: [{ value: "summary_large_image", label: "Large image" }, { value: "summary", label: "Summary" }], half: true },
          { name: "robotsIndex", label: "Allow search engines to index this page", type: "boolean", half: true },
          { name: "robotsFollow", label: "Allow search engines to follow links", type: "boolean", half: true },
          { name: "faqSchema", label: "Add FAQ structured data (from this page's FAQ)", type: "boolean", half: true },
          { name: "jsonLd", label: "Custom JSON-LD (advanced)", type: "json", help: "Valid JSON only. Rendered as <script type=application/ld+json>." },
        ]}
      />
    </div>
  );
}

export function FieldInput({ field, value, onChange, errors, path }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void; errors: Errors; path: string }) {
  const id = `f-${path.replace(/[^a-z0-9]/gi, "-")}`;
  const err = errors[path];
  const errText = Array.isArray(err) ? err.join(", ") : err;
  const str = value === undefined || value === null ? "" : String(value);
  let control: ReactNode;
  switch (field.type) {
    case "textarea":
      control = <textarea id={id} rows={3} maxLength={field.max} className={inputCls} value={str} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
      break;
    case "json":
      control = <textarea id={id} rows={6} className={`${inputCls} font-mono text-xs`} value={str} onChange={(e) => onChange(e.target.value)} spellCheck={false} />;
      break;
    case "richtext":
      control = <RichTextEditor value={str} onChange={onChange} placeholder={field.placeholder} />;
      break;
    case "richinline":
      control = <InlineRichText id={id} value={str} onChange={onChange} placeholder={field.placeholder} />;
      break;
    case "number":
      control = <input id={id} type="number" className={inputCls} value={str} onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))} />;
      break;
    case "boolean":
      return (
        <label className={`flex cursor-pointer items-center gap-2.5 text-sm text-slate-700 ${field.half ? "" : "sm:col-span-2"}`}>
          <input type="checkbox" className="h-4 w-4 accent-teal" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          {field.label}
        </label>
      );
    case "select":
      control = (
        <select id={id} className={inputCls} value={str} onChange={(e) => onChange(e.target.value)}>
          {!field.required && <option value="">—</option>}
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
      break;
    case "image":
      control = <ImageField value={str} onChange={onChange} />;
      break;
    case "link": {
      const v = (value as { label?: string; href?: string }) ?? {};
      control = (
        <div className="grid gap-2 sm:grid-cols-2">
          <input aria-label={`${field.label} text`} className={inputCls} value={v.label ?? ""} onChange={(e) => onChange({ ...v, label: e.target.value })} placeholder="Button text" />
          <input aria-label={`${field.label} URL`} className={inputCls} value={v.href ?? ""} onChange={(e) => onChange({ ...v, href: e.target.value })} placeholder="/contact or https://…" />
        </div>
      );
      break;
    }
    case "tags":
    case "textlist":
      control = field.type === "tags" ? (
        <TagsField value={Array.isArray(value) ? (value as string[]) : []} onChange={onChange} placeholder={field.placeholder} />
      ) : (
        <textarea
          id={id}
          rows={5}
          className={inputCls}
          value={Array.isArray(value) ? (value as string[]).join("\n") : ""}
          onChange={(e) => onChange(e.target.value.split("\n"))}
          onBlur={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
          placeholder="One item per line"
        />
      );
      break;
    case "date":
    case "datetime": {
      const d = value ? new Date(value as string) : null;
      const local = d && !Number.isNaN(d.getTime()) ? new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, field.type === "date" ? 10 : 16) : "";
      control = <input id={id} type={field.type === "date" ? "date" : "datetime-local"} className={inputCls} value={local} onChange={(e) => onChange(e.target.value ? new Date(e.target.value).toISOString() : undefined)} />;
      break;
    }
    case "relation":
      control = <RelationField value={value as string[]} onChange={onChange} relation={field.relation!} />;
      break;
    case "list":
      control = <ListField field={field} value={value as Values[]} onChange={onChange} errors={errors} path={path} />;
      break;
    case "seo":
      control = <SeoField value={value as Values} onChange={onChange} errors={errors} path={path} />;
      break;
    case "href":
      control = <input id={id} maxLength={field.max ?? 500} className={inputCls} value={str} onChange={(e) => onChange(e.target.value)} placeholder="/contact, #section or https://…" />;
      break;
    case "group":
      control = (
        <div className="rounded-lg border border-slate-200 bg-slate-50/40 p-3">
          <FieldGroup fields={field.fields ?? []} values={(value as Values) ?? {}} onChange={onChange} errors={errors} prefix={path} />
        </div>
      );
      break;
    case "password":
      control = (
        <PasswordInput id={id} maxLength={field.max} className={inputCls} value={str} autoComplete="new-password" onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />
      );
      break;
    default:
      control = (
        <input
          id={id}
          type={field.type === "email" ? "email" : "text"}
          maxLength={field.max}
          className={`${inputCls} ${field.type === "slug" ? "font-mono text-xs" : ""}`}
          value={str}
          onChange={(e) => onChange(field.type === "slug" ? e.target.value.toLowerCase().replace(/[^a-z0-9/-]/g, "-") : e.target.value)}
          placeholder={field.placeholder}
        />
      );
  }
  const wide = ["richtext", "richinline", "list", "seo", "textarea", "image", "json", "textlist", "relation", "link", "group"].includes(field.type);
  return (
    <div className={wide && !field.half ? "sm:col-span-2" : ""}>
      <Label htmlFor={id} required={field.required} help={field.help}>
        {field.label}
      </Label>
      {control}
      {errText && <p className="mt-1 text-xs text-rose-600">{errText}</p>}
    </div>
  );
}

/** A titled, collapsible block whose fields live directly on the parent object (CMS section parts). */
function FlatGroup({ field, values, onChange, errors, prefix, defaultOpen }: { field: FieldDef; values: Values; onChange: (v: Values) => void; errors: Errors; prefix: string; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [q, setQ] = useState("");
  const all = field.fields ?? [];
  const shown = q ? all.filter((f) => `${f.label} ${typeof values[f.name] === "string" ? values[f.name] : ""}`.toLowerCase().includes(q.toLowerCase())) : all;
  return (
    <div className="rounded-xl border border-slate-200 sm:col-span-2">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
        <span className="text-sm font-semibold text-slate-800">{field.label}</span>
        <span className="text-xs text-slate-500">{all.length} fields {open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="border-t border-slate-100 p-4">
          {all.length > 8 && (
            <input className={`${inputCls} mb-4`} placeholder="Find a field by its text…" value={q} onChange={(e) => setQ(e.target.value)} />
          )}
          <FieldGroup fields={shown} values={values} onChange={onChange} errors={errors} prefix={prefix} />
        </div>
      )}
    </div>
  );
}

export function FieldGroup({ fields, values, onChange, errors = {}, prefix = "" }: { fields: FieldDef[]; values: Values; onChange: (v: Values) => void; errors?: Errors; prefix?: string }) {
  const v = values ?? {};
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((f, i) =>
        f.type === "group" && f.flat ? (
          <FlatGroup key={f.name} field={f} values={v} onChange={onChange} errors={errors} prefix={prefix} defaultOpen={i === 0 && fields.length <= 3} />
        ) : (
        <FieldInput
          key={f.name}
          field={f}
          value={v[f.name]}
          errors={errors}
          path={prefix ? `${prefix}.${f.name}` : f.name}
          onChange={(nv) => {
            const next: Values = { ...v, [f.name]: nv };
            // Auto-fill slugs while the slug still matches the source field.
            for (const s of fields.filter((x) => x.type === "slug" && x.from === f.name)) {
              if (!v[s.name] || v[s.name] === slugify(String(v[f.name] ?? ""))) next[s.name] = slugify(String(nv ?? ""));
            }
            onChange(next);
          }}
        />
        ),
      )}
    </div>
  );
}
