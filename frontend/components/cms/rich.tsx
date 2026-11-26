import { Fragment, createElement, type ReactNode } from "react";
import Link from "next/link";

/**
 * Paragraph text from the CMS may carry light formatting written in the admin's paragraph editor:
 * <strong>/<b>, <em>/<i>, <u>, <s>, <a href> and <br>. `rich()` turns exactly those into React
 * elements (no innerHTML); any other markup is shown as plain text. Text without tags is returned
 * unchanged, so un-edited copy renders exactly as before.
 *
 *   <p>{rich($t("File__t3", "Original text"))}</p>
 */
const TAG = /<(\/?)(strong|b|em|i|u|s|a|br)(\s[^<>]*)?\/?>/gi;
const HAS_TAG = /<\/?(strong|b|em|i|u|s|a|br)(\s[^<>]*)?\/?>/i;
const SAFE_HREF = /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i;

const decode = (s: string) =>
  s.replace(/&(amp|lt|gt|quot|#39|#x27|apos|nbsp);/g, (_, e: string) => ({ amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", "#x27": "'", apos: "'", nbsp: " " })[e] ?? _);

const attr = (attrs: string | undefined, name: string) => {
  const m = attrs && new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i").exec(attrs);
  return m ? decode(m[2] ?? m[3] ?? "") : "";
};

type Node = { tag: string; href?: string; children: (Node | string)[] };

export function rich(value: string): ReactNode {
  if (typeof value !== "string") return value;
  // Saved from the editor without formatting: only entities like &amp; to turn back into characters.
  if (!HAS_TAG.test(value)) return value.includes("&") ? decode(value) : value;
  const root: Node = { tag: "", children: [] };
  const stack: Node[] = [root];
  let last = 0;
  for (const m of value.matchAll(TAG)) {
    const top = stack[stack.length - 1];
    if (m.index! > last) top.children.push(decode(value.slice(last, m.index)));
    last = m.index! + m[0].length;
    const [, close, rawTag, attrs] = m;
    const tag = rawTag.toLowerCase();
    if (tag === "br") top.children.push({ tag: "br", children: [] });
    else if (close) {
      const i = stack.map((n) => n.tag).lastIndexOf(tag);
      if (i > 0) stack.length = i; // close it (and anything left open inside it)
    } else {
      const node: Node = { tag, children: [] };
      if (tag === "a") {
        const href = attr(attrs, "href");
        node.href = SAFE_HREF.test(href) ? href : "";
      }
      top.children.push(node);
      stack.push(node);
    }
  }
  if (last < value.length) root.children.push(decode(value.slice(last)));
  return render(root.children);
}

function render(children: (Node | string)[]): ReactNode {
  return children.map((c, i) => {
    if (typeof c === "string") return <Fragment key={i}>{c}</Fragment>;
    if (c.tag === "br") return <br key={i} />;
    const inner = render(c.children);
    if (c.tag === "a") {
      if (!c.href) return <Fragment key={i}>{inner}</Fragment>;
      return /^https?:\/\//i.test(c.href) ? (
        <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{inner}</a>
      ) : (
        <Link key={i} href={c.href} className="underline underline-offset-2">{inner}</Link>
      );
    }
    const tag = c.tag === "b" ? "strong" : c.tag === "i" ? "em" : c.tag;
    return createElement(tag, { key: i, className: tag === "strong" ? "font-bold" : undefined }, inner);
  });
}
