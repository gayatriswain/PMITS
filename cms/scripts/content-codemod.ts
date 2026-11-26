/**
 * Makes the hard-coded content of frontend section components editable from the CMS — without
 * changing what the website renders by default.
 *
 *   npx tsx scripts/content-codemod.ts            # dry run: prints what would change
 *   npx tsx scripts/content-codemod.ts --apply    # rewrites the files
 *   npx tsx scripts/content-codemod.ts --apply ../frontend/app/components/home/HomeHero.tsx   # one file
 *
 * What it rewrites (inside React components only):
 *   - visible JSX text            <h2>Grow faster</h2>        -> <h2>{$t("File__t1", "Grow faster")}</h2>
 *   - content attributes          alt="…" src="…" href="…"    -> alt={$t("File__t2", "…")}
 *   - strings in local data       { title: "Fast" }           -> { title: $t("File__t3", "Fast") }
 *   - module-level data lists     const cards = [...]         -> const cards__cms = [...]; and inside each
 *                                 component: const cards = useCmsData("File__cards", cards__cms)
 *
 * `$t(key, default)` returns the CMS value when one is saved, otherwise the original text, so the
 * rendered output is byte-for-byte the same until someone edits the content in the admin.
 * The script is idempotent: already-converted strings are skipped and numbering continues.
 * Field labels/types for the admin are derived later by `npm run registry`.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { Node, Project, SyntaxKind, ts, type SourceFile } from "ts-morph";
import { decodeHTML } from "entities";
import {
  ALWAYS_CONTENT_KEYS, COMPONENT_ATTRS, INTRINSIC_ATTRS, NON_CONTENT_JSX_ATTRS, NON_CONTENT_KEYS,
  hasContent, isContentString, staticValue, stripWrappers,
} from "./content-heuristics";

const APPLY = process.argv.includes("--apply");
const onlyFiles = process.argv.slice(2).filter((a) => !a.startsWith("--")).map((f) => path.resolve(f));
const ROOT = path.resolve(process.cwd(), "../frontend/app/components");
const SKIP_DIRS = new Set(["_unused", "layout"]);
// Already editable through explicit fields, or contain no content.
const SKIP_FILES = new Set(["Container.tsx", "icons.tsx", "drawIcons.tsx", "FAQSection.tsx", "CtaSection.tsx", "TrustedBar.tsx", "useCountUp.ts", "ConsultationForm.tsx"]);
const RUNTIME_IMPORT = "@/components/cms/SectionContent";

/** Babel's JSX text whitespace rules -> the exact string React renders. */
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

/* ----------------------------- helpers ----------------------------- */

type Edit = { start: number; end: number; text: string };
type FnNode = Node & { getBody?: () => Node | undefined };

function walkFiles(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) {
      if (!SKIP_DIRS.has(name)) walkFiles(p, out);
    } else if (name.endsWith(".tsx") && !SKIP_FILES.has(name)) out.push(p);
  }
  return out;
}

/** Top-level React components: Capitalised functions (declarations, arrow/function consts, memo/forwardRef wrappers). */
function topLevelComponents(sf: SourceFile): { name: string; fn: FnNode }[] {
  const out: { name: string; fn: FnNode }[] = [];
  for (const st of sf.getStatements()) {
    if (Node.isFunctionDeclaration(st)) {
      const name = st.getName() ?? (st.isDefaultExport() ? "Default" : "");
      if (/^[A-Z]/.test(name) && st.getBody()) out.push({ name, fn: st });
    } else if (Node.isVariableStatement(st)) {
      for (const d of st.getDeclarations()) {
        const name = d.getName();
        if (!/^[A-Z]/.test(name)) continue;
        let init = stripWrappers(d.getInitializer());
        if (init && Node.isCallExpression(init) && /(^|\.)(memo|forwardRef)$/.test(init.getExpression().getText())) init = stripWrappers(init.getArguments()[0]);
        if (init && (Node.isArrowFunction(init) || Node.isFunctionExpression(init))) out.push({ name, fn: init });
      }
    }
  }
  return out;
}

function propertyKeyOf(lit: Node): string | undefined {
  const p = lit.getParent();
  if (p && Node.isPropertyAssignment(p) && p.getInitializer() === lit) {
    const n = p.getNameNode();
    return Node.isIdentifier(n) || Node.isStringLiteral(n) ? (Node.isStringLiteral(n) ? n.getLiteralValue() : n.getText()) : undefined;
  }
  return undefined;
}

/** Literal is inside an event handler / effect / async function — logic, not render output. */
function insideNonRenderFunction(lit: Node, component: Node): boolean {
  let cur: Node | undefined = lit.getParent();
  while (cur && cur !== component) {
    if (Node.isArrowFunction(cur) || Node.isFunctionExpression(cur) || Node.isFunctionDeclaration(cur)) {
      if ((cur as { isAsync?: () => boolean }).isAsync?.()) return true;
      const parent = cur.getParent();
      if (parent && Node.isCallExpression(parent)) {
        const callee = parent.getExpression().getText();
        if (/(^|\.)(useEffect|useLayoutEffect|useCallback|setTimeout|setInterval|addEventListener|fetch|then|catch)$/.test(callee)) return true;
      }
      if (parent && Node.isVariableDeclaration(parent) && /^(handle|on[A-Z]|submit|validate|fetch|load|send|reset|update|set[A-Z])/.test(parent.getName())) return true;
      if (Node.isFunctionDeclaration(cur) && /^(handle|on[A-Z]|submit|validate|fetch|load|send|reset|update)/.test(cur.getName() ?? "")) return true;
      if (parent && Node.isJsxExpression(parent)) {
        const attr = parent.getParent();
        if (attr && Node.isJsxAttribute(attr) && /^on[A-Z]/.test(attr.getNameNode().getText())) return true;
      }
    }
    if (Node.isJsxAttribute(cur) && NON_CONTENT_JSX_ATTRS.has(cur.getNameNode().getText())) return true;
    if (Node.isCallExpression(cur)) {
      const callee = cur.getExpression().getText();
      if (/(^|\.)(useState|useRef|useReducer|useScroll|useInView|useTransform|useSpring|useMotionValue|useAnimation|useAnimate|animate|JSON\.stringify|submitEnquiry|setError|setErrorMsg|console\.\w+|includes|indexOf|startsWith|endsWith|split|replace|toLocaleDateString|toLocaleString|Intl\.\w+|cn|clsx|twMerge)$/.test(callee)) return true;
    }
    if (Node.isBinaryExpression(cur) && /^(===|!==|==|!=)$/.test(cur.getOperatorToken().getText())) return true;
    if (Node.isCaseClause(cur) || Node.isSwitchStatement(cur)) return true;
    if (Node.isElementAccessExpression(cur)) return true;
    cur = cur.getParent();
  }
  return false;
}

function jsxTagName(el: Node | undefined): string {
  if (!el) return "";
  if (Node.isJsxOpeningElement(el) || Node.isJsxSelfClosingElement(el)) return el.getTagNameNode().getText();
  return "";
}

/* ----------------------------- per-file transform ----------------------------- */

type Report = { file: string; texts: number; data: string[]; skippedData: string[]; addedUseClient: boolean };

function transform(sf: SourceFile, base: string): { text: string; report: Report } | null {
  const src = sf.getFullText();
  const edits: Edit[] = [];
  const report: Report = { file: base, texts: 0, data: [], skippedData: [], addedUseClient: false };

  // Continue numbering after keys that already exist.
  let counter = 0;
  for (const m of src.matchAll(new RegExp(`"${base}__t(\\d+)"`, "g"))) counter = Math.max(counter, Number(m[1]));
  const nextKey = () => `${base}__t${++counter}`;

  const components = topLevelComponents(sf);
  if (!components.length) return null;
  const componentNames = new Set(components.map((c) => c.name));

  // Components called as plain functions (Name(...)) can't hold hooks safely.
  const calledDirectly = new Set<string>();
  sf.forEachDescendant((n) => {
    if (Node.isCallExpression(n) && Node.isIdentifier(n.getExpression()) && componentNames.has(n.getExpression().getText())) calledDirectly.add(n.getExpression().getText());
  });

  const already = (n: Node) => {
    const call = n.getParent();
    return !!call && Node.isCallExpression(call) && /^(\$t|useCmsData)$/.test(call.getExpression().getText());
  };

  const needsT = new Set<FnNode>();
  const dataHooks = new Map<FnNode, string[]>();

  /* ---- module-level data consts ---- */
  const dataConsts: { name: string; idNode: Node }[] = [];
  for (const st of sf.getStatements()) {
    if (!Node.isVariableStatement(st) || st.isExported()) continue;
    if (st.getDeclarationKind() !== "const") continue;
    for (const d of st.getDeclarations()) {
      const nameNode = d.getNameNode();
      if (!Node.isIdentifier(nameNode)) continue;
      const name = nameNode.getText();
      if (name.endsWith("__cms") || /^[A-Z][a-z]/.test(name) && componentNames.has(name)) continue;
      const init = stripWrappers(d.getInitializer());
      if (!init || !(Node.isArrayLiteralExpression(init) || Node.isObjectLiteralExpression(init))) continue;
      if (!hasContent(staticValue(init))) continue;
      dataConsts.push({ name, idNode: nameNode });
    }
  }

  /** Runtime references to `name` (type-only `typeof name` uses are returned separately). */
  const findRefs = (name: string, declId: Node) => {
    const runtime: Node[] = [];
    const typeOnly: Node[] = [];
    sf.forEachDescendant((n) => {
      if (!Node.isIdentifier(n) || n.getText() !== name || n === declId) return;
      const p = n.getParent();
      if (p && Node.isPropertyAccessExpression(p) && p.getNameNode() === n) return;
      if (p && (Node.isPropertyAssignment(p) || Node.isPropertySignature(p) || Node.isMethodDeclaration(p) || Node.isPropertyDeclaration(p)) && p.getNameNode() === n) return;
      if (p && Node.isBindingElement(p) && p.getPropertyNameNode() === n) return;
      if (n.getFirstAncestor((a) => Node.isTypeNode(a))) {
        typeOnly.push(n);
        return;
      }
      runtime.push(n);
    });
    return { runtime, typeOnly };
  };
  const ownerOf = (r: Node) => components.find((c) => c.fn.getPos() <= r.getPos() && r.getEnd() <= c.fn.getEnd());
  const shadows = (fn: FnNode, name: string) =>
    fn.getDescendants().some((x) => (Node.isVariableDeclaration(x) || Node.isParameterDeclaration(x) || Node.isBindingElement(x)) && (x as { getName?: () => string }).getName?.() === name);
  /** Top-level `const D = <expr using data consts>` statements that can be moved into components. */
  const derivedFor = (r: Node) => {
    const st = r.getFirstAncestor((a) => Node.isVariableStatement(a) && a.getParent() === sf);
    if (!st || !Node.isVariableStatement(st) || st.isExported() || st.getDeclarations().length !== 1) return null;
    const d = st.getDeclarations()[0];
    if (!Node.isIdentifier(d.getNameNode()) || dataConsts.some((x) => x.name === d.getName())) return null;
    return { st, name: d.getName(), idNode: d.getNameNode(), init: d.getInitializer()?.getText() ?? "" };
  };

  const derivedMoves = new Map<FnNode, { name: string; init: string; pos: number }[]>();
  const removedStatements = new Set<Node>();

  for (const dc of dataConsts) {
    const { runtime, typeOnly } = findRefs(dc.name, dc.idNode);
    let unsafe = !runtime.length;
    const owners = new Set<FnNode>();
    const derived: NonNullable<ReturnType<typeof derivedFor>>[] = [];
    for (const r of runtime) {
      const owner = ownerOf(r);
      // Used in a parameter default (before the hook could run) -> leave as is.
      if (owner && r.getFirstAncestor((a) => Node.isParameterDeclaration(a) && a.getParent() === owner.fn)) {
        unsafe = true;
        break;
      }
      if (owner) {
        if (calledDirectly.has(owner.name) || shadows(owner.fn, dc.name)) unsafe = true;
        owners.add(owner.fn);
        continue;
      }
      // Module-level derived const (e.g. const doubled = [...items, ...items]) -> move into the components using it.
      const dv = derivedFor(r);
      if (!dv) {
        unsafe = true;
        break;
      }
      const dRefs = findRefs(dv.name, dv.idNode);
      if (dRefs.typeOnly.length || !dRefs.runtime.length) {
        unsafe = true;
        break;
      }
      for (const dr of dRefs.runtime) {
        const o = ownerOf(dr);
        if (!o || calledDirectly.has(o.name) || shadows(o.fn, dv.name)) {
          unsafe = true;
          break;
        }
        owners.add(o.fn);
        if (!derived.some((x) => x.name === dv.name)) derived.push(dv);
        const list = derivedMoves.get(o.fn) ?? [];
        if (!list.some((x) => x.name === dv.name)) list.push({ name: dv.name, init: dv.init, pos: dv.st.getPos() });
        derivedMoves.set(o.fn, list);
      }
      if (unsafe) break;
    }
    if (unsafe) {
      // Undo any derived moves registered for this const.
      for (const [fn, list] of derivedMoves) derivedMoves.set(fn, list.filter((x) => !derived.some((d) => d.name === x.name)));
      report.skippedData.push(dc.name);
      continue;
    }
    for (const d of derived) removedStatements.add(d.st);
    edits.push({ start: dc.idNode.getStart(), end: dc.idNode.getEnd(), text: `${dc.name}__cms` });
    // `typeof items` in type positions keeps pointing at the original data.
    for (const t of typeOnly) edits.push({ start: t.getStart(), end: t.getEnd(), text: `${dc.name}__cms` });
    for (const o of owners) dataHooks.set(o, [...(dataHooks.get(o) ?? []), dc.name]);
    report.data.push(dc.name);
  }
  for (const st of removedStatements) edits.push({ start: st.getStart(), end: st.getEnd(), text: "" });

  /* ---- literals inside components ---- */
  for (const comp of components) {
    if (calledDirectly.has(comp.name)) continue;
    const fn = comp.fn;
    const use = () => {
      needsT.add(fn);
      report.texts++;
    };

    fn.forEachDescendant((n, trav) => {
      // Don't descend into type annotations.
      if (Node.isTypeNode(n)) {
        trav.skip();
        return;
      }
      // JSX text
      if (Node.isJsxText(n)) {
        const parentEl = n.getParent();
        const tag = Node.isJsxElement(parentEl) ? parentEl.getOpeningElement().getTagNameNode().getText() : "";
        if (tag === "style" || tag === "script") return;
        const value = cleanJsxText(n.getText());
        if (!isContentString(value)) return;
        edits.push({ start: n.getStart(), end: n.getEnd(), text: `{$t(${JSON.stringify(nextKey())}, ${JSON.stringify(value)})}` });
        use();
        return;
      }
      // JSX attributes with string values
      if (Node.isJsxAttribute(n)) {
        const attr = n.getNameNode().getText();
        const init = n.getInitializer();
        const el = n.getParent()?.getParent();
        const tag = jsxTagName(el);
        const isIntrinsic = /^[a-z]/.test(tag);
        const allowed = isIntrinsic ? [...INTRINSIC_ATTRS["*"], ...(INTRINSIC_ATTRS[tag] ?? [])].includes(attr) : COMPONENT_ATTRS.has(attr);
        if (!allowed || !init) return;
        if (Node.isStringLiteral(init)) {
          const value = decodeHTML(init.getLiteralValue());
          if (attr === "href" && /^#?$/.test(value)) return;
          const isUrl = attr === "src" || attr === "href" || attr === "poster";
          if (!isUrl && !isContentString(value, ALWAYS_CONTENT_KEYS.has(attr) ? attr : undefined)) return;
          if (isUrl && !value.trim()) return;
          edits.push({ start: init.getStart(), end: init.getEnd(), text: `{$t(${JSON.stringify(nextKey())}, ${JSON.stringify(value)})}` });
          use();
        }
        return;
      }
      // String literals used as JSX children / conditional branches / data values
      if (Node.isStringLiteral(n) || Node.isNoSubstitutionTemplateLiteral(n)) {
        if (already(n)) return;
        const p = n.getParent();
        if (!p) return;
        if (Node.isJsxAttribute(p) || Node.isImportDeclaration(p) || Node.isExportDeclaration(p)) return;
        const value = n.getLiteralValue();
        let ok = false;
        let key: string | undefined;
        if (Node.isJsxExpression(p) && Node.isJsxElement(p.getParent())) {
          const host = p.getParent();
          const tag = Node.isJsxElement(host) ? host.getOpeningElement().getTagNameNode().getText() : "";
          if (tag === "style" || tag === "script") return; // CSS / script text is never content
          ok = true;
        }
        else if (Node.isJsxExpression(p) && Node.isJsxFragment(p.getParent())) ok = true;
        else if (Node.isConditionalExpression(p) && p.getCondition() !== n) {
          const gp = p.getParentWhile((x) => Node.isConditionalExpression(x) || Node.isParenthesizedExpression(x));
          const host = gp?.getParent() ?? p.getParent();
          ok = !!host && Node.isJsxExpression(host) && !Node.isJsxAttribute(host.getParent());
        } else if (Node.isPropertyAssignment(p) && p.getInitializer() === n) {
          key = propertyKeyOf(n);
          ok = true;
        } else if (Node.isArrayLiteralExpression(p)) {
          // ["a", "b"] lists of display strings; key from the property holding the array
          const holder = stripWrappers(p)?.getParent();
          if (holder && Node.isPropertyAssignment(holder)) key = propertyKeyOf(p);
          ok = true;
        }
        if (!ok) return;
        if (!isContentString(value, key)) return;
        if (insideNonRenderFunction(n, fn)) return;
        edits.push({ start: n.getStart(), end: n.getEnd(), text: `$t(${JSON.stringify(nextKey())}, ${n.getText()})` });
        use();
      }
    });
  }

  if (!needsT.size && !dataHooks.size) return null;

  /* ---- hook insertion at the top of each component body ---- */
  for (const comp of components) {
    const fn = comp.fn;
    const lines: string[] = [];
    if (needsT.has(fn) && !/const \$t = useCmsText\(\)/.test(fn.getText())) lines.push("const $t = useCmsText();");
    for (const name of dataHooks.get(fn) ?? []) lines.push(`const ${name} = useCmsData(${JSON.stringify(`${base}__${name}`)}, ${name}__cms);`);
    for (const d of (derivedMoves.get(fn) ?? []).sort((a, b) => a.pos - b.pos)) lines.push(`const ${d.name} = ${d.init};`);
    if (!lines.length) continue;
    const body = fn.getBody?.();
    if (!body) continue;
    if (Node.isBlock(body)) {
      edits.push({ start: body.getStart() + 1, end: body.getStart() + 1, text: `\n  ${lines.join("\n  ")}` });
    } else {
      // Arrow function with an expression body -> block body returning the same expression.
      edits.push({ start: body.getStart(), end: body.getStart(), text: `{\n  ${lines.join("\n  ")}\n  return (` });
      edits.push({ start: body.getEnd(), end: body.getEnd(), text: `);\n}` });
    }
  }

  /* ---- imports + "use client" ---- */
  const names = [needsT.size ? "useCmsText" : "", dataHooks.size ? "useCmsData" : ""].filter(Boolean);
  const existing = sf.getImportDeclaration((d) => d.getModuleSpecifierValue() === RUNTIME_IMPORT);
  const importNames = new Set([...(existing?.getNamedImports().map((x) => x.getName()) ?? []), ...names]);
  const importLine = `import { ${[...importNames].sort().join(", ")} } from "${RUNTIME_IMPORT}";`;
  if (existing) edits.push({ start: existing.getStart(), end: existing.getEnd(), text: importLine });
  else {
    const imports = sf.getImportDeclarations();
    const at = imports.length ? imports[imports.length - 1].getEnd() : 0;
    edits.push({ start: at, end: at, text: `${at ? "\n" : ""}${importLine}${at ? "" : "\n"}` });
  }
  const first = sf.getStatements()[0];
  const hasUseClient = first && Node.isExpressionStatement(first) && /^["']use client["']/.test(first.getText());
  if (!hasUseClient) {
    edits.push({ start: 0, end: 0, text: `"use client";\n\n` });
    report.addedUseClient = true;
  }

  // Apply edits back-to-front.
  edits.sort((a, b) => b.start - a.start || b.end - a.end);
  let out = src;
  let lastStart = Infinity;
  for (const e of edits) {
    if (e.end > lastStart && e.start !== e.end) throw new Error(`${base}: overlapping edits at ${e.start}`);
    out = out.slice(0, e.start) + e.text + out.slice(e.end);
    if (e.start !== e.end) lastStart = e.start;
  }
  return { text: out, report };
}

/* ----------------------------- main ----------------------------- */

const files = onlyFiles.length ? onlyFiles : walkFiles(ROOT);
const project = new Project({ compilerOptions: { jsx: ts.JsxEmit.Preserve, allowJs: false }, skipAddingFilesFromTsConfig: true });
let changed = 0;
let totalTexts = 0;
let totalData = 0;
const skipped: string[] = [];
for (const file of files) {
  const base = path.basename(file).replace(/\.tsx?$/, "");
  const sf = project.addSourceFileAtPath(file);
  let res;
  try {
    res = transform(sf, base);
  } catch (e) {
    console.error(`!! ${base}: ${(e as Error).message}`);
    continue;
  }
  if (!res) continue;
  changed++;
  totalTexts += res.report.texts;
  totalData += res.report.data.length;
  if (res.report.skippedData.length) skipped.push(`${base}: ${res.report.skippedData.join(", ")}`);
  console.log(`${base.padEnd(40)} texts ${String(res.report.texts).padStart(4)}  lists ${res.report.data.length}${res.report.addedUseClient ? "  +use client" : ""}`);
  if (APPLY) writeFileSync(file, res.text);
  project.removeSourceFile(sf);
}
console.log(`\n${changed} files, ${totalTexts} strings, ${totalData} data lists${APPLY ? " — written" : " (dry run; pass --apply to write)"}`);
if (skipped.length) console.log(`Data consts left as-is (used outside components):\n  ${skipped.join("\n  ")}`);
void readFileSync;
