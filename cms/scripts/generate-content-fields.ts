/**
 * Builds the admin form for every coded section from the frontend source:
 * reads the `$t("key", "default")` and `useCmsData("key", data__cms)` calls written by
 * content-codemod.ts and writes lib/sections/content.generated.json:
 *
 *   { "UiUxHero": { fields: [...], defaults: {...} }, ... }
 *
 * A section's form includes the content of the component's own file plus every component file it
 * imports (recursively), one collapsible group per file. Run via `npm run registry`.
 */
import { existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { Node, Project, ts, type SourceFile } from "ts-morph";
import { NON_CONTENT_KEYS, NUMERIC_CONTENT_KEYS, STYLE_KEY, isContentString, staticValue, stripWrappers } from "./content-heuristics";
import pages from "../lib/sections/pages.generated.json";

const FRONT = path.resolve(process.cwd(), "../frontend");
const COMPONENTS = path.join(FRONT, "app/components");
const OUT = path.resolve(process.cwd(), "lib/sections/content.generated.json");

type Field = {
  name: string;
  label: string;
  type: "text" | "textarea" | "richinline" | "image" | "href" | "number" | "list" | "textlist" | "group";
  max?: number;
  help?: string;
  fields?: Field[];
  maxItems?: number;
  flat?: boolean;
};

const IMAGE_EXT = /\.(png|jpe?g|webp|svg|gif|avif)(\?.*)?$/i;
const IMAGE_KEYS = /^(image|img|src|photo|avatar|logo|thumbnail|thumb|poster|picture|cover|bgImage|backgroundImage|icon(Src|Url)?|imageSrc|imageUrl)$/i;
const HREF_KEYS = /^(href|link|url|to|path|ctaHref|buttonHref|linkHref)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov)(\?.*)?$/i;
const LOOKS_URL = /^(\/(?![\s])|#|https?:\/\/|mailto:|tel:)\S*$/;
const LOOKS_MEDIA = /^(\/|https?:\/\/)\S+$/;

const words = (s: string) =>
  s
    .replace(/__cms$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
const preview = (s: string, n = 60) => {
  const one = s.replace(/\s+/g, " ").trim();
  return one.length > n ? `${one.slice(0, n - 1)}…` : one;
};

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name !== "_unused") walk(p, out);
    } else if (/\.tsx?$/.test(name)) out.push(p);
  }
  return out;
}

/* ------------------------ field type for a single string ------------------------ */

function stringField(name: string, label: string, value: string, hint?: { attr?: string; key?: string }): Field {
  const attr = hint?.attr ?? "";
  const key = hint?.key ?? "";
  let type: Field["type"] = "text";
  if ((attr === "src" || attr === "poster" || IMAGE_KEYS.test(key) || IMAGE_EXT.test(value) || VIDEO_EXT.test(value)) && LOOKS_MEDIA.test(value)) type = "image";
  else if ((attr === "href" || HREF_KEYS.test(key)) && LOOKS_URL.test(value)) type = "href";
  else if (value.length > 90 || value.includes("\n")) type = "textarea";
  const f: Field = { name, label, type, max: type === "textarea" ? 5000 : 1000 };
  if (type === "image" && VIDEO_EXT.test(value)) f.help = "Video file URL (MP4/WebM)";
  return f;
}

/* ------------------------ labels for $t() calls ------------------------ */

const TAG_LABELS: Record<string, string> = {
  p: "Paragraph", button: "Button text", a: "Link text", Link: "Link text", li: "List item", label: "Label", option: "Option",
  span: "Text", strong: "Bold text", b: "Bold text", em: "Italic text", i: "Italic text", small: "Small text", div: "Text",
  blockquote: "Quote", figcaption: "Caption", th: "Table heading", td: "Table cell", text: "Chart text", tspan: "Chart text", title: "Title",
};
const ATTR_LABELS: Record<string, string> = { src: "Image / media", href: "Link URL", alt: "Image alt text", placeholder: "Placeholder", title: "Title", poster: "Video poster" };

function labelFor(call: Node, value: string): { label: string; hint: { attr?: string; key?: string } } {
  // inside a JSX attribute?
  const attr = call.getFirstAncestor((a) => Node.isJsxAttribute(a) || Node.isJsxElement(a) || Node.isJsxSelfClosingElement(a));
  if (attr && Node.isJsxAttribute(attr)) {
    const name = attr.getNameNode().getText();
    const el = attr.getParent()?.getParent();
    const tag = el && (Node.isJsxOpeningElement(el) || Node.isJsxSelfClosingElement(el)) ? el.getTagNameNode().getText().replace(/^motion\./, "") : "";
    const base = ATTR_LABELS[name] ?? words(name);
    return { label: `${base}${tag && !/^(img|a|Image|Link)$/.test(tag) ? ` (${tag})` : ""}: ${preview(value, 50)}`, hint: { attr: name } };
  }
  // value of an object property inside the component
  const prop = call.getParent();
  if (prop && Node.isPropertyAssignment(prop)) {
    const key = prop.getNameNode().getText().replace(/^["']|["']$/g, "");
    return { label: `${words(key)}: ${preview(value)}`, hint: { key } };
  }
  // JSX child text
  const el = call.getFirstAncestor((a) => Node.isJsxElement(a));
  const tag = el && Node.isJsxElement(el) ? el.getOpeningElement().getTagNameNode().getText().replace(/^motion\./, "") : "";
  const h = /^h([1-6])$/.exec(tag);
  const kind = h ? `Heading (H${h[1]})` : TAG_LABELS[tag] ?? (tag && /^[A-Z]/.test(tag) ? words(tag) : "Text");
  return { label: `${kind}: ${preview(value)}`, hint: {} };
}

/* ------------------------ schema for data lists ------------------------ */

function schemaFor(name: string, label: string, v: unknown, key?: string): Field | null {
  if (typeof v === "string") {
    const urlish = key && ((IMAGE_KEYS.test(key) && LOOKS_MEDIA.test(v)) || (HREF_KEYS.test(key) && LOOKS_URL.test(v)));
    if (!isContentString(v, key) && !urlish) return null;
    if (key && HREF_KEYS.test(key) && !LOOKS_URL.test(v) && /^[MmLlHhVvCcSsQqTtAaZz]/.test(v.trim())) return null; // SVG path data
    return stringField(name, label, v, { key });
  }
  if (typeof v === "number") return key && NUMERIC_CONTENT_KEYS.has(key) ? { name, label, type: "number" } : null;
  if (Array.isArray(v)) {
    const items = v.filter((x) => x !== null && x !== undefined);
    if (!items.length) return null;
    if (items.every((x) => typeof x === "string")) {
      return items.some((x) => isContentString(x as string, key)) ? { name, label, type: "textlist", maxItems: Math.max(30, items.length * 3) } : null;
    }
    if (items.every((x) => x && typeof x === "object" && !Array.isArray(x))) {
      const fields: Field[] = [];
      for (const item of items as Record<string, unknown>[]) {
        for (const [k, val] of Object.entries(item)) {
          if (fields.some((f) => f.name === k) || NON_CONTENT_KEYS.has(k) || STYLE_KEY.test(k)) continue;
          const f = schemaFor(k, words(k), val, k);
          if (f) fields.push(f);
        }
      }
      return fields.length ? { name, label, type: "list", fields, maxItems: Math.max(30, items.length * 3) } : null;
    }
    return null;
  }
  if (v && typeof v === "object") {
    const fields: Field[] = [];
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      if (NON_CONTENT_KEYS.has(k) || STYLE_KEY.test(k)) continue;
      const f = schemaFor(k, words(k), val, k);
      if (f) fields.push(f);
    }
    return fields.length ? { name, label, type: "group", fields } : null;
  }
  return null;
}

/** Keep only the parts of a default value that the schema can edit. */
function pick(field: Field, v: unknown): unknown {
  switch (field.type) {
    case "list":
      return Array.isArray(v) ? v.map((item) => pickObject(field.fields ?? [], item)) : [];
    case "group":
      return pickObject(field.fields ?? [], v);
    case "textlist":
      return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
    default:
      return v;
  }
}
function pickObject(fields: Field[], v: unknown) {
  const src = (v && typeof v === "object" ? v : {}) as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const f of fields) if (src[f.name] !== undefined) out[f.name] = pick(f, src[f.name]);
  return out;
}

/* ------------------------ per file ------------------------ */

type FileInfo = { base: string; fields: Field[]; defaults: Record<string, unknown>; imports: string[] };

function resolveImport(from: string, spec: string): string | null {
  let target: string;
  if (spec.startsWith("@/")) target = path.join(FRONT, spec.slice(2));
  else if (spec.startsWith(".")) target = path.resolve(path.dirname(from), spec);
  else return null;
  for (const ext of [".tsx", ".ts", "/index.tsx", "/index.ts"]) if (existsSync(target + ext)) return path.normalize(target + ext);
  return null;
}

function analyse(sf: SourceFile): FileInfo {
  const file = sf.getFilePath();
  const base = path.basename(file).replace(/\.tsx?$/, "");
  const items: { pos: number; field: Field; def: unknown }[] = [];
  sf.forEachDescendant((n) => {
    if (!Node.isCallExpression(n)) return;
    const callee = n.getExpression().getText();
    const [k, d] = n.getArguments();
    if (!k || !Node.isStringLiteral(k)) return;
    const key = k.getLiteralValue();
    if (callee === "$t") {
      const value = staticValue(d);
      if (typeof value !== "string") return;
      const { label, hint } = labelFor(n, value);
      const field = stringField(key, label, value, hint);
      // {rich($t(...))} in the frontend renders bold/italic/links -> formatting editor in the admin
      const parent = n.getParent();
      if (parent && Node.isCallExpression(parent) && parent.getExpression().getText() === "rich") Object.assign(field, { type: "richinline", max: 5000 });
      items.push({ pos: n.getStart(), field, def: value });
    } else if (callee === "useCmsData" && d && Node.isIdentifier(d)) {
      const decl = sf.getVariableDeclaration(d.getText());
      const value = staticValue(stripWrappers(decl?.getInitializer()));
      const local = key.split("__").pop() ?? key;
      const f = schemaFor(key, words(local), value, local);
      if (!f) return;
      items.push({ pos: n.getStart(), field: f, def: pick(f, value) });
    }
  });
  // one field per key (a key can appear in several components of the same file)
  const seen = new Set<string>();
  const fields: Field[] = [];
  const defaults: Record<string, unknown> = {};
  for (const it of items.sort((a, b) => a.pos - b.pos)) {
    if (seen.has(it.field.name)) continue;
    seen.add(it.field.name);
    fields.push(it.field);
    defaults[it.field.name] = it.def;
  }
  const imports = sf
    .getImportDeclarations()
    .map((d) => resolveImport(file, d.getModuleSpecifierValue()))
    .filter((p): p is string => !!p && p.startsWith(path.normalize(COMPONENTS)) && !p.includes(`${path.sep}layout${path.sep}`));
  return { base, fields, defaults, imports };
}

/* ------------------------ main ------------------------ */

const project = new Project({ compilerOptions: { jsx: ts.JsxEmit.Preserve }, skipAddingFilesFromTsConfig: true });
const infos = new Map<string, FileInfo>();
for (const f of walk(COMPONENTS)) {
  const sf = project.addSourceFileAtPath(f);
  infos.set(path.normalize(f), analyse(sf));
  project.removeSourceFile(sf);
}
const byBase = new Map([...infos.entries()].map(([p, i]) => [i.base, p]));

const components = new Set((pages as { sections: { component: string }[] }[]).flatMap((p) => p.sections.map((s) => s.component)));
const out: Record<string, { fields: Field[]; defaults: Record<string, unknown> }> = {};
let totalFields = 0;
for (const comp of [...components].sort()) {
  const root = byBase.get(comp);
  if (!root) continue;
  // BFS over imported component files
  const order: string[] = [];
  const queue = [root];
  while (queue.length) {
    const p = queue.shift()!;
    if (order.includes(p)) continue;
    order.push(p);
    for (const i of infos.get(p)?.imports ?? []) if (infos.has(i)) queue.push(i);
  }
  const groups: Field[] = [];
  const defaults: Record<string, unknown> = {};
  for (const p of order) {
    const info = infos.get(p)!;
    if (!info.fields.length) continue;
    groups.push({ name: `g__${info.base}`, label: groups.length === 0 ? words(info.base) : `${words(info.base)} (inner part)`, type: "group", flat: true, fields: info.fields });
    Object.assign(defaults, info.defaults);
    totalFields += info.fields.length;
  }
  if (groups.length) out[comp] = { fields: groups, defaults };
}
writeFileSync(OUT, JSON.stringify(out));
console.log(`Wrote editable fields for ${Object.keys(out).length} section components (${totalFields} fields) -> ${path.relative(process.cwd(), OUT)}`);
