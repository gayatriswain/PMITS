/**
 * Reads every frontend route (../frontend/app/**\/page.tsx) and writes lib/sections/pages.generated.json:
 * route path, existing metadata (title/description), and the section components in render order.
 *
 *   npx tsx scripts/generate-registry.ts
 *
 * Re-run after adding a page or section in the frontend, then `npm run seed` to sync MongoDB
 * (seed only adds what is missing - it never overwrites content edited in the CMS).
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { GLOBAL_PATH, GLOBAL_SECTIONS } from "../../frontend/components/cms/global-sections.data";

const FRONTEND_APP = path.resolve(process.cwd(), "../frontend/app");
const OUT = path.resolve(process.cwd(), "lib/sections/pages.generated.json");
const NOT_SECTIONS = /(Styles|Icon|^Image|^Link|^Container)$/;

type Gen = {
  path: string;
  file: string;
  title: string;
  description: string;
  reorderable: boolean;
  /** The hidden global-sections page (see frontend/components/cms/global-sections.data.ts). */
  global?: boolean;
  sections: { key: string; component: string; label: string; carousel?: boolean }[];
};

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "api" || name === "components" || name === "lib" || name === "portfolio" || name.startsWith("_") || name.startsWith("(") || name.startsWith("[")) continue;
      walk(p, out);
    } else if (name === "page.tsx") out.push(p);
  }
  return out;
}

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
const words = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");

/** Strip the page prefix from a component name for a short, stable key (LocalSeoHero -> hero). */
function keyFor(component: string, all: string[]) {
  let prefix = "";
  const first = all[0] || "";
  for (let i = 1; i < first.length; i++) {
    const p = first.slice(0, i);
    if (/[A-Z]/.test(first[i]) && all.filter((c) => c.startsWith(p)).length >= Math.max(2, Math.ceil(all.length / 2))) prefix = p;
  }
  const rest = prefix && component.startsWith(prefix) && component.length > prefix.length ? component.slice(prefix.length) : component;
  return kebab(rest);
}

function read(file: string): Gen | null {
  const src = readFileSync(file, "utf8");
  if (/^\s*export \{ default/m.test(src)) return null; // alias re-export
  const rel = path.relative(FRONTEND_APP, path.dirname(file)).replace(/\\/g, "/");
  const route = rel === "" ? "/" : `/${rel}`;
  // Only read title/description from the `export const metadata = {...}` block (not page copy).
  const metaStart = src.search(/(export const metadata|const staticMetadata)[^=]*=\s*\{/);
  const meta = metaStart > -1 ? src.slice(metaStart, src.indexOf("};", metaStart) + 2) : "";
  const title = (meta.match(/title:\s*["'`]([^"'`]+)["'`]/) || [])[1] || "";
  const description = (meta.match(/description:\s*\n?\s*["'`]([^"'`]+)["'`]/) || [])[1] || "";

  // Components rendered in the default export body, in order.
  const body = src.slice(src.indexOf("export default"));
  // Pages wired to the CMS declare their keys in code: ["key", <Comp key="key" />] or <CmsSlot k="key"><Comp …
  const declared = [
    ...[...body.matchAll(/\["([a-z0-9-]+)",\s*<([A-Z][A-Za-z0-9]+)/g)].map((m) => ({ i: m.index ?? 0, key: m[1], component: m[2], slot: false })),
    ...[...body.matchAll(/<CmsSlot\b[^>]*\bk="([a-z0-9-]+)"[^>]*>\s*<([A-Z][A-Za-z0-9]+)/g)].map((m) => ({ i: m.index ?? 0, key: m[1], component: m[2], slot: true })),
  ].sort((a, b) => a.i - b.i);
  if (declared.length) {
    return {
      path: route,
      file: path.relative(path.resolve(FRONTEND_APP, ".."), file).replace(/\\/g, "/"),
      title,
      description,
      reorderable: !declared.some((d) => d.slot),
      sections: declared.map((d) => ({ key: d.key, component: d.component, label: words(d.component) })),
    };
  }
  const tags = [...body.matchAll(/<([A-Z][A-Za-z0-9]+)\b[^>]*\/>/g)].map((m) => m[1]).filter((c) => !NOT_SECTIONS.test(c));
  const imported = new Set([...src.matchAll(/import\s+([A-Z][A-Za-z0-9]+)\s+from\s+["'][^"']*components\//g)].map((m) => m[1]));
  const comps = tags.filter((c) => imported.has(c));
  // Pages that interleave inline JSX with components can toggle sections but not reorder them.
  const inlineHeavy = /<section[\s>]/.test(body) || body.split("\n").length > 80;
  const seen = new Map<string, number>();
  const sections = comps.map((component) => {
    let key = keyFor(component, comps);
    const n = (seen.get(key) ?? 0) + 1;
    seen.set(key, n);
    if (n > 1) key = `${key}-${n}`;
    return { key, component, label: words(component) };
  });
  return { path: route, file: path.relative(path.resolve(FRONTEND_APP, ".."), file).replace(/\\/g, "/"), title, description, reorderable: !inlineHeavy, sections };
}

const pages = walk(FRONTEND_APP).map(read).filter((p): p is Gen => !!p).sort((a, b) => a.path.localeCompare(b.path));
// Global sections (logos, sliders, CTA…): a hidden "page" that holds their one shared copy of content.
pages.unshift({
  path: GLOBAL_PATH,
  file: "components/cms/global-sections.data.ts",
  title: "Global sections",
  description: "Content shared by every page that shows these sections.",
  reorderable: false,
  global: true,
  sections: GLOBAL_SECTIONS.map((g) => ({ key: g.key, component: g.component, label: g.label, carousel: g.carousel })),
});
writeFileSync(OUT, JSON.stringify(pages, null, 2) + "\n");
console.log(`Wrote ${pages.length} pages, ${pages.reduce((n, p) => n + p.sections.length, 0)} sections -> ${path.relative(process.cwd(), OUT)}`);
for (const p of pages) console.log(`${p.reorderable ? " " : "*"} ${p.path.padEnd(52)} ${p.sections.length} sections`);
