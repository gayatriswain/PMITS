"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLiveContent } from "./editStore";

/**
 * Per-section content from the CMS. Section components read it through:
 *   const $t = useCmsText();           $t("File__t3", "Original text")
 *   const items = useCmsData("File__items", items__cms);
 * Anything not saved in the CMS falls back to the text/data written in the component, so the
 * website renders exactly as coded until someone edits it in the admin.
 */
type Content = Record<string, unknown>;
const SectionContentContext = createContext<Content | null>(null);

export function SectionContentProvider({ value, sectionKey, children }: { value?: Content | null; sectionKey?: string; children: ReactNode }) {
  // admin visual editor: unsaved edits of this section, shown while typing (nothing outside the editor)
  const live = useLiveContent(sectionKey);
  const v = live ?? value;
  return <SectionContentContext.Provider value={v && Object.keys(v).length ? v : null}>{children}</SectionContentContext.Provider>;
}

export function useCmsText() {
  const content = useContext(SectionContentContext);
  return (key: string, fallback: string): string => {
    const v = content?.[key];
    return typeof v === "string" ? v : fallback;
  };
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype;

/**
 * Deep-merge CMS values over the coded defaults. Only strings/numbers come from the CMS; anything
 * else in the defaults (icons, JSX, functions, colours…) is kept. Lists may grow or shrink: new
 * items borrow their non-editable parts (icons etc.) from the last coded item.
 */
function merge(def: unknown, over: unknown): unknown {
  if (over === undefined || over === null) return def;
  if (Array.isArray(def)) {
    if (!Array.isArray(over)) return def;
    if (!def.length) return over.filter((o) => typeof o === "string" || typeof o === "number");
    return over.map((o, i) => merge(def[Math.min(i, def.length - 1)], o));
  }
  if (isPlainObject(def)) {
    if (!isPlainObject(over)) return def;
    const out: Record<string, unknown> = { ...def };
    for (const k of Object.keys(def)) if (k in over) out[k] = merge(def[k], over[k]);
    return out;
  }
  if (typeof def === "string") return typeof over === "string" ? over : def;
  if (typeof def === "number") return typeof over === "number" && Number.isFinite(over) ? over : def;
  return def;
}

export function useCmsData<T>(key: string, fallback: T): T {
  const content = useContext(SectionContentContext);
  const v = content?.[key];
  // Stable identity across renders, so effects/memos that depend on the data don't re-run.
  return useMemo(() => (v === undefined ? fallback : (merge(fallback, v) as T)), [fallback, v]);
}
