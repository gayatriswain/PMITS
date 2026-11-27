import { Fragment, createElement, type ReactNode } from "react";
import Link from "next/link";

/**
 * Text from the CMS may carry light formatting: <strong>/<b>, <em>/<i>, <u>, <s>, <a href>, <br>,
 * and <span>/<mark>/<small>/<sup>/<sub> with a class (e.g. the accent colour of a heading:
 * `Our Core Expertise, <span class="text-teal">Your Advantage</span>`). `rich()` turns exactly those
 * into React elements (no innerHTML; only the class attribute is kept); any other markup is shown as
 * plain text. Text without tags is returned unchanged, so un-edited copy renders exactly as before.
 *
 *   <p>{rich($t("File__t3", "Original text"))}</p>    paragraph / heading: formatting editor in the admin
 *   <p>{html($t("File__t4", "Short text"))}</p>        plain input in the admin; HTML typed there still works
 */
const TAGS = "strong|b|em|i|u|s|a|br|span|mark|small|sup|sub";
const TAG = new RegExp(String.raw`<(\/?)(${TAGS})(\s[^<>]*)?\/?>`, "gi");
const HAS_TAG = new RegExp(String.raw`<\/?(${TAGS})(\s[^<>]*)?\/?>`, "i");
/** Tailwind-style class names only (letters, digits, - _ : / . [ ] % # ( ) , and spaces). */
const SAFE_CLASS = /^[\w\-:/.[\]%#(),\s]*$/;
const SAFE_HREF = /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i;

const decode = (s: string) =>
  s.replace(/&(amp|lt|gt|quot|#39|#x27|apos|nbsp);/g, (_, e: string) => ({ amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", "#x27": "'", apos: "'", nbsp: " " })[e] ?? _);

const attr = (attrs: string | undefined, name: string) => {
  const m = attrs && new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i").exec(attrs);
  return m ? decode(m[2] ?? m[3] ?? "") : "";
};

type Node = { tag: string; href?: string; cls?: string; children: (Node | string)[] };

const classOf = (attrs: string | undefined) => {
  const c = attr(attrs, "class").trim();
  return c && SAFE_CLASS.test(c) ? c : undefined;
};

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
    if (tag === "br") top.children.push({ tag: "br", cls: classOf(attrs), children: [] });
    else if (close) {
      const i = stack.map((n) => n.tag).lastIndexOf(tag);
      if (i > 0) stack.length = i; // close it (and anything left open inside it)
    } else {
      const node: Node = { tag, cls: classOf(attrs), children: [] };
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
    if (c.tag === "br") return <br key={i} className={c.cls} />;
    const inner = render(c.children);
    if (c.tag === "a") {
      if (!c.href) return <Fragment key={i}>{inner}</Fragment>;
      return /^https?:\/\//i.test(c.href) ? (
        <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{inner}</a>
      ) : (
        <Link key={i} href={c.href} className="underline underline-offset-2">{inner}</Link>
      );
    }
    // <b>/<i> written in the code stay <b>/<i> (same markup as before); the admin's editor writes <strong>/<em>
    const tag = c.tag;
    const className = [tag === "strong" && !c.cls ? "font-bold" : "", c.cls ?? ""].filter(Boolean).join(" ") || undefined;
    return createElement(tag, { key: i, className }, inner);
  });
}

/** Same as rich(); used for short texts whose admin field is a plain input (keeps that input simple). */
export const html = (value: string): ReactNode => rich(value);
