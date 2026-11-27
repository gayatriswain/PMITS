/**
 * Tidies the editable texts of the website's coded sections (after content-codemod.ts):
 *
 *  A) One sentence = one field. A heading/paragraph built from several `$t()` pieces, e.g.
 *       <h2>{$t("X__t2", "Our Core Expertise,")} <span className="text-teal">{$t("X__t3", "Your Advantage")}</span></h2>
 *     becomes a single formatted field that keeps the inline styling as HTML:
 *       <h2>{rich($t("X__t2m", "Our Core Expertise, <span class=\"text-teal\">Your Advantage</span>"))}</h2>
 *     Only plain inline markup is merged (span/strong/em/b/i/u/s/mark/small/sup/sub/br with a static
 *     className or none); anything with other props, components or logic is left alone.
 *     The merged field gets a NEW key ("…m"); scripts/migrate-merged-fields.ts moves texts already
 *     edited in the CMS from the old pieces into it (run it after this, on every database).
 *
 *  B) HTML typed into a plain text field works: `{$t(…)}` shown as text inside an HTML element
 *     becomes `{html($t(…))}` (same output for text without tags; the admin input stays a simple one).
 *
 *   npx tsx scripts/merge-text-fields.ts           # dry run: prints what would change
 *   npx tsx scripts/merge-text-fields.ts --apply   # rewrites the files + writes the migration map
 */
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { Node, Project, ts, type JsxElement, type SourceFile } from "ts-morph";
import { decodeHTML } from "entities";

const APPLY = process.argv.includes("--apply");
const ROOT = path.resolve(process.cwd(), "../frontend/app/components");
const MAP = path.resolve(process.cwd(), "scripts/merged-fields.map.json");
const SKIP_DIRS = new Set(["_unused"]);
const RICH_IMPORT = "@/components/cms/rich";

const INLINE = new Set(["span", "strong", "b", "em", "i", "u", "s", "mark", "small", "sup", "sub"]);
/** Elements whose children must stay plain strings (or are SVG/text-only). */
const NO_MARKUP = new Set(["option", "title", "textarea", "text", "tspan", "style", "script", "svg", "path"]);

type Piece = { key: string; def: string; rich: boolean };
type MapEntry = { file: string; key: string; template: string; pieces: Piece[] };

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) {
      if (!SKIP_DIRS.has(name)) walk(p, out);
    } else if (/\.tsx$/.test(name)) out.push(p);
  }
  return out;
}

/** Babel's JSX text whitespace rules -> the exact string React renders (same as content-codemod.ts). */
function cleanJsxText(raw: string): string {
  const lines = raw.split(/\r\n|\n|\r/);
  let lastNonEmpty = 0;
  lines.forEach((l, i) => {
    if (/[^ \t]/.test(l)) lastNonEmpty = i;
  });
  let out = "";
  lines.forEach((line, i) => {
    const isFirst = i === 0;
    const isLast = i === lines.length - 1;
    let t = line.replace(/\t/g, " ");
    if (!isFirst) t = t.replace(/^[ ]+/, "");
    if (!isLast) t = t.replace(/[ ]+$/, "");
    if (t) {
      if (i !== lastNonEmpty) t += " ";
      out += t;
    }
  });
  return decodeHTML(out);
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const TOKEN = (k: string) => `\u0000${k}\u0000`;

const tagOf = (el: Node) =>
  Node.isJsxElement(el) ? el.getOpeningElement().getTagNameNode().getText() : Node.isJsxSelfClosingElement(el) ? el.getTagNameNode().getText() : "";
const isHtmlParent = (tag: string) => (/^[a-z][a-z0-9]*$/.test(tag) || /^motion\.[a-z]+$/.test(tag)) && !NO_MARKUP.has(tag.replace(/^motion\./, ""));

/** All JSX children, including whitespace-only text like the " " in `<br /> {x}` (getJsxChildren() drops it, React renders it). */
const jsxChildren = (el: JsxElement): Node[] => el.getChildSyntaxListOrThrow().getChildren();

/** `$t("key", "literal")` -> { key, def } */
function tCall(n: Node | undefined): { key: string; def: string } | null {
  if (!n || !Node.isCallExpression(n) || n.getExpression().getText() !== "$t") return null;
  const [k, d] = n.getArguments();
  if (!k || !d || !Node.isStringLiteral(k)) return null;
  if (!Node.isStringLiteral(d) && !Node.isNoSubstitutionTemplateLiteral(d)) return null;
  return { key: k.getLiteralValue(), def: d.getLiteralValue() };
}

const SAFE_COLOR = /^(#[0-9a-fA-F]{3,8}|[a-z]+)$/;

/** A string constant of the file (`const TEAL = "#0d9488"`), or the literal itself. */
function constString(n: Node): string | null {
  if (Node.isStringLiteral(n) || Node.isNoSubstitutionTemplateLiteral(n)) return n.getLiteralValue();
  if (!Node.isIdentifier(n)) return null;
  let defs: Node[] = [];
  try {
    defs = n.getDefinitionNodes();
  } catch {
    return null;
  }
  for (const d of defs) {
    if (!Node.isVariableDeclaration(d)) continue;
    const init = d.getInitializer();
    if (init && (Node.isStringLiteral(init) || Node.isNoSubstitutionTemplateLiteral(init))) return init.getLiteralValue();
  }
  return null;
}

/**
 * Styling allowed on merged inline elements: a static className="…" and/or style={{ color: X }}
 * (X a colour literal or constant), turned into the Tailwind class text-[X] - same colour, and the
 * class is written in the source so Tailwind generates it.
 */
function staticClass(attrs: Node[]): string | null | false {
  if (!attrs.length) return null;
  const classes: string[] = [];
  for (const a of attrs) {
    if (!Node.isJsxAttribute(a)) return false;
    const name = a.getNameNode().getText();
    const init = a.getInitializer();
    if (name === "className" && init && Node.isStringLiteral(init)) classes.push(init.getLiteralValue());
    else if (name === "style" && init && Node.isJsxExpression(init)) {
      const obj = init.getExpression();
      if (!obj || !Node.isObjectLiteralExpression(obj)) return false;
      const props = obj.getProperties();
      if (props.length !== 1 || !Node.isPropertyAssignment(props[0]) || props[0].getName() !== "color") return false;
      const v = constString(props[0].getInitializerOrThrow());
      if (!v || !SAFE_COLOR.test(v)) return false;
      classes.push(`text-[${v}]`);
    } else return false;
  }
  return classes.join(" ").trim() || null;
}

/** Children -> HTML template with piece tokens, or null when they can't be merged. */
/** Inline elements that shape the layout (badges, avatars, positioned decorations, interactive bits) are not "text styling". */
const LAYOUT_CLASS =
  /(^|\s)(flex|inline-flex|grid|inline-grid|absolute|fixed|relative|sticky|inset-\S+|-?(top|left|right|bottom)-\S+|h-\S+|w-\S+|size-\S+|min-[hw]-\S+|max-[hw]-\S+|rounded\S*|items-\S+|justify-\S+|gap-\S+|border\S*|shadow\S*|-?[pm][xytrbl]?-\S+|-?translate-\S+|cursor-\S+|select-none|hover:\S+|transition\S*)(?=\s|$)/;

function serialize(children: Node[], pieces: Piece[], depth = 0): string | null {
  let out = "";
  for (const c of children) {
    if (Node.isJsxText(c)) {
      out += esc(cleanJsxText(c.getFullText()));
    } else if (Node.isJsxExpression(c)) {
      const e = c.getExpression();
      if (!e) continue; // {/* comment */}
      if (Node.isStringLiteral(e) || Node.isNoSubstitutionTemplateLiteral(e)) {
        out += esc(e.getLiteralValue());
        continue;
      }
      const plain = tCall(e);
      if (plain) {
        pieces.push({ ...plain, rich: false });
        out += TOKEN(plain.key);
        continue;
      }
      if (Node.isCallExpression(e) && e.getExpression().getText() === "rich") {
        const inner = tCall(e.getArguments()[0]);
        if (inner) {
          pieces.push({ ...inner, rich: true });
          out += TOKEN(inner.key);
          continue;
        }
      }
      return null;
    } else if (Node.isJsxSelfClosingElement(c)) {
      if (c.getTagNameNode().getText() !== "br") return null;
      const cls = staticClass(c.getAttributes());
      if (cls === false) return null;
      out += cls ? `<br class="${escAttr(cls)}">` : "<br>";
    } else if (Node.isJsxElement(c)) {
      const tag = tagOf(c);
      // one level of styling only (the admin's editor keeps one class per piece of text)
      if (!INLINE.has(tag) || depth > 0) return null;
      const cls = staticClass(c.getOpeningElement().getAttributes());
      if (cls === false || (cls && LAYOUT_CLASS.test(cls))) return null;
      const inner = serialize(jsxChildren(c), pieces, depth + 1);
      // empty decorations (underline bars etc.) stay in code
      if (inner === null || !inner.replace(/<br[^>]*>/g, "").trim()) return null;
      out += `<${tag}${cls ? ` class="${escAttr(cls)}"` : ""}>${inner}</${tag}>`;
    } else return null;
  }
  return out;
}

const fill = (template: string, pieces: Piece[], value: (p: Piece) => string) =>
  pieces.reduce((s, p) => s.split(TOKEN(p.key)).join(p.rich ? value(p) : esc(value(p))), template);

type Edit = { start: number; end: number; text: string };

function processFile(sf: SourceFile, map: MapEntry[]) {
  const file = sf.getFilePath();
  const src = sf.getFullText();
  const edits: Edit[] = [];
  const merged: JsxElement[] = [];
  let usesRich = false;
  let usesHtml = false;

  // A) merge multi-piece sentences (outermost element only)
  sf.forEachDescendant((n) => {
    if (!Node.isJsxElement(n)) return;
    if (!isHtmlParent(tagOf(n)) && tagOf(n) !== "Link") return;
    if (merged.some((m) => m.getPos() <= n.getPos() && n.getEnd() <= m.getEnd())) return;
    const pieces: Piece[] = [];
    const template = serialize(jsxChildren(n), pieces);
    if (template === null || pieces.length < 2) return;
    // a piece used anywhere else in the file can't be folded away
    if (pieces.some((p) => src.split(`"${p.key}"`).length - 1 !== 1)) return;
    const key = `${pieces[0].key}m`;
    const def = fill(template, pieces, (p) => p.def).trim();
    const open = n.getOpeningElement();
    const close = n.getClosingElement();
    edits.push({ start: open.getEnd(), end: close.getStart(), text: `{rich($t(${JSON.stringify(key)}, ${JSON.stringify(def)}))}` });
    merged.push(n);
    usesRich = true;
    map.push({ file: path.relative(ROOT, file).replace(/\\/g, "/"), key, template, pieces });
  });

  // B) plain $t() shown as text -> html($t())
  sf.forEachDescendant((n) => {
    if (!Node.isJsxExpression(n) || !tCall(n.getExpression())) return;
    const parent = n.getParent();
    if (!parent || !Node.isJsxElement(parent) || !isHtmlParent(tagOf(parent))) return;
    if (merged.some((m) => m.getPos() <= n.getPos() && n.getEnd() <= m.getEnd())) return;
    const e = n.getExpression()!;
    edits.push({ start: e.getStart(), end: e.getEnd(), text: `html(${e.getText()})` });
    usesHtml = true;
  });

  if (!edits.length) return { merges: 0, wraps: 0 };
  let text = src;
  for (const e of edits.sort((a, b) => b.start - a.start)) text = text.slice(0, e.start) + e.text + text.slice(e.end);

  // import { rich, html } from "@/components/cms/rich"
  const need = [...(usesRich ? ["rich"] : []), ...(usesHtml ? ["html"] : [])];
  const imp = new RegExp(`import \\{([^}]*)\\} from "${RICH_IMPORT.replace(/[/.]/g, "\\$&")}";`);
  const m = imp.exec(text);
  if (m) {
    const have = m[1].split(",").map((s) => s.trim()).filter(Boolean);
    const all = [...new Set([...have, ...need])].sort();
    text = text.replace(imp, `import { ${all.join(", ")} } from "${RICH_IMPORT}";`);
  } else {
    const lines = text.split("\n");
    let last = -1;
    lines.forEach((l, i) => {
      if (/^import .* from ".*";\s*$/.test(l)) last = i;
    });
    lines.splice(last + 1, 0, `import { ${need.sort().join(", ")} } from "${RICH_IMPORT}";`);
    text = lines.join("\n");
  }
  if (APPLY) writeFileSync(file, text);
  return { merges: merged.length, wraps: edits.length - merged.length };
}

const project = new Project({ compilerOptions: { jsx: ts.JsxEmit.Preserve }, skipAddingFilesFromTsConfig: true });
const map: MapEntry[] = existsSync(MAP) ? JSON.parse(readFileSync(MAP, "utf8")) : [];
const before = map.length;
let merges = 0;
let wraps = 0;
let files = 0;
for (const f of walk(ROOT)) {
  const sf = project.addSourceFileAtPath(f);
  const r = processFile(sf, map);
  project.removeSourceFile(sf);
  if (r.merges || r.wraps) files++;
  merges += r.merges;
  wraps += r.wraps;
}
console.log(`${APPLY ? "Changed" : "Would change"} ${files} files: ${merges} sentences merged into one field, ${wraps} texts accept HTML.`);
for (const e of map.slice(before, before + 12)) console.log(`  ${e.key}: ${fill(e.template, e.pieces, (p) => p.def).slice(0, 110)}`);
if (APPLY) {
  writeFileSync(MAP, JSON.stringify(map, null, 1) + "\n");
  console.log(`Migration map: ${path.relative(process.cwd(), MAP)} (${map.length} merged fields). Next: npm run registry, then npx tsx scripts/migrate-merged-fields.ts`);
}
