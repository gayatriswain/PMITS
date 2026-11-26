/** Shared rules for what counts as editable content (used by content-codemod and generate-registry). */
import { Node, SyntaxKind } from "ts-morph";

/* ----------------------------- heuristics ----------------------------- */

export const NON_CONTENT_KEYS = new Set([
  "className", "class", "style", "id", "key", "slug", "type", "variant", "ease", "color", "colour", "bg", "bgColor", "background",
  "gradient", "accent", "tone", "theme", "shadow", "border", "fill", "stroke", "d", "viewBox", "size", "width", "height", "x", "y",
  "cx", "cy", "r", "transform", "animation", "delay", "align", "side", "direction", "layout", "font", "weight", "glow", "ring",
  "iconKey", "iconName", "component", "as", "target", "rel", "kind", "mode", "status", "repeatType", "origin", "rotate", "scale",
  "opacity", "zIndex", "top", "left", "right", "bottom", "pos", "dir", "cls", "classes", "textColor", "iconColor", "hex", "rgb",
  "gradientFrom", "gradientTo", "from", "to", "via", "dot", "dotColor", "bar", "barColor", "hover", "formType", "source", "method",
  "name_attr", "inputMode", "autoComplete", "pattern", "role_attr", "dataKey", "stackId", "strokeDasharray", "points", "chartColor",
  "offset", "margin", "amount", "perspective", "clipPath", "filter", "mask", "cursor", "display", "overflow", "objectFit",
]);
/** Style-ish property names (backgroundColor, transformOrigin, boxShadow…). */
export const STYLE_KEY = /(Color|Colour|Gradient|Shadow|Origin|Position|Transform|Filter|Radius|Opacity|Delay|Duration|Easing|Class|ClassName|Style|Bg|Background|Blend|Mode)$/;
/** Keys that are always content even when the value looks like a single lowercase word. */
export const ALWAYS_CONTENT_KEYS = new Set(["title", "heading", "text", "desc", "description", "quote", "answer", "question", "caption", "alt", "subtitle", "label"]);
export const NUMERIC_CONTENT_KEYS = new Set(["value", "count", "number", "rating", "percent", "stat", "target", "end", "amount", "price", "score", "years", "total"]);

export const INTRINSIC_ATTRS: Record<string, string[]> = {
  "*": ["alt", "title", "placeholder"],
  img: ["src"],
  video: ["src", "poster"],
  source: ["src"],
  iframe: ["src"],
  a: ["href"],
};
export const COMPONENT_ATTRS = new Set([
  "alt", "src", "href", "title", "subtitle", "heading", "eyebrow", "label", "text", "description", "desc", "caption", "placeholder",
  "image", "poster", "cta", "ctaText", "ctaLabel", "buttonText", "buttonLabel", "badge", "tag", "quote", "value", "author", "role", "name",
]);
/** JSX attributes whose object/array values are never content (animation, styling…). */
export const NON_CONTENT_JSX_ATTRS = new Set([
  "style", "className", "initial", "animate", "exit", "transition", "variants", "whileInView", "whileHover", "whileTap", "viewport",
  "sx", "css", "key", "data", "margin", "config", "chartConfig", "options", "dataKey",
]);

const CSS_VALUE = /^(#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(|(linear|radial|conic)-gradient|url\(|var\(--|calc\()/;
const UNIT_VALUE = /^-?[\d.]+(px|rem|em|%|s|ms|deg|vh|vw|fr)$/;
const SVG_PATH = /^[MmLlHhVvCcSsQqTtAaZz0-9\s.,-]+$/;
const TW_TOKEN = /^!?-?([a-z0-9-]+:)*[a-z][a-z0-9]*(-[\w[\]/.#%(),'"]+)+!?$/;
const TW_WORDS = new Set(["flex", "grid", "block", "hidden", "relative", "absolute", "fixed", "sticky", "inline", "contents", "group", "peer", "italic", "uppercase", "lowercase", "capitalize", "truncate", "underline", "shadow", "rounded", "border", "transition", "transform", "grow", "shrink", "container", "invisible", "visible", "static"]);

function looksLikeClasses(s: string) {
  const tokens = s.trim().split(/\s+/);
  return tokens.length > 0 && tokens.every((t) => TW_TOKEN.test(t) || TW_WORDS.has(t)) && tokens.some((t) => t.includes("-") || TW_WORDS.has(t));
}

/** Is this string user-visible content (as opposed to an id, css value, class list, path data…)? */
export function isContentString(value: string, key?: string) {
  const v = value.trim();
  if (!v) return false;
  if (key && (NON_CONTENT_KEYS.has(key) || STYLE_KEY.test(key))) return false;
  if (!/[\p{L}\p{N}]/u.test(v)) return false;
  if (CSS_VALUE.test(v) || UNIT_VALUE.test(v)) return false;
  if (v.includes(" ") && v.split(/\s+/).every((tok) => UNIT_VALUE.test(tok) || /^-?[\d.]+$/.test(tok) || /^(auto|center|top|bottom|left|right|start|end|none)$/.test(tok))) return false;
  if (v.length > 8 && SVG_PATH.test(v) && /\d/.test(v) && /[MmLlCcHhVvZz]/.test(v)) return false;
  if (looksLikeClasses(v)) return false;
  if (/^[a-z][a-zA-Z0-9_-]*$/.test(v) && !(key && ALWAYS_CONTENT_KEYS.has(key))) return false; // identifier / slug / keyword
  if (/^(use client|use server|use strict)$/.test(v)) return false;
  return true;
}

export function stripWrappers(n: Node | undefined): Node | undefined {
  let cur = n;
  while (cur && (Node.isAsExpression(cur) || Node.isParenthesizedExpression(cur) || Node.isSatisfiesExpression(cur) || Node.isTypeAssertion(cur))) {
    cur = cur.getExpression();
  }
  return cur;
}

/** Static JSON value of a literal (undefined for anything non-serialisable). */
export function staticValue(n: Node | undefined): unknown {
  const e = stripWrappers(n);
  if (!e) return undefined;
  if (Node.isStringLiteral(e) || Node.isNoSubstitutionTemplateLiteral(e)) return e.getLiteralValue();
  if (Node.isNumericLiteral(e)) return Number(e.getLiteralValue());
  if (Node.isPrefixUnaryExpression(e) && e.getOperatorToken() === SyntaxKind.MinusToken) {
    const v = staticValue(e.getOperand());
    return typeof v === "number" ? -v : undefined;
  }
  if (e.getKind() === SyntaxKind.TrueKeyword) return true;
  if (e.getKind() === SyntaxKind.FalseKeyword) return false;
  if (Node.isArrayLiteralExpression(e)) return e.getElements().map((x) => staticValue(x) ?? null);
  if (Node.isObjectLiteralExpression(e)) {
    const o: Record<string, unknown> = {};
    for (const p of e.getProperties()) {
      if (!Node.isPropertyAssignment(p)) continue;
      const nn = p.getNameNode();
      const k = Node.isStringLiteral(nn) ? nn.getLiteralValue() : nn.getText();
      const v = staticValue(p.getInitializer());
      if (v !== undefined) o[k] = v;
    }
    return o;
  }
  return undefined;
}

/** Does a static value contain at least one content string? */
export function hasContent(v: unknown, key?: string): boolean {
  if (typeof v === "string") return isContentString(v, key);
  if (Array.isArray(v)) return v.some((x) => hasContent(x, key));
  if (v && typeof v === "object") return Object.entries(v).some(([k, x]) => !NON_CONTENT_KEYS.has(k) && hasContent(x, k));
  return false;
}

