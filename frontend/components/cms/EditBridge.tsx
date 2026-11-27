"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearLiveContent, setLiveContent } from "./editStore";

/**
 * Talks to the admin's visual page editor when this preview is shown inside its iframe:
 * - outlines the section / text / image under the pointer, and on click tells the admin what was
 *   clicked (section key + its text or image) so the matching field opens there;
 * - shows unsaved text edits instantly and refreshes after the admin saves a draft.
 * Only active in draft mode, inside a frame, and only with the CMS admin's origin.
 */
type Msg =
  | { type: "mode"; mode: "edit" | "browse" }
  | { type: "labels"; labels: Record<string, string> }
  | { type: "content"; key: string; content: Record<string, unknown> }
  | { type: "clear" }
  | { type: "refresh" }
  | { type: "focus"; key: string | null; scroll?: boolean };

const Z = 2147483000;
const TEAL = "#0d9488";

function box(el: Element | null): DOMRect | null {
  if (!el) return null;
  // section markers use display:contents (no box of their own): use the union of their children
  if (getComputedStyle(el).display === "contents") {
    let top = Infinity, left = Infinity, right = -Infinity, bottom = -Infinity;
    for (const c of Array.from(el.children)) {
      const r = box(c);
      if (!r || (!r.width && !r.height)) continue;
      top = Math.min(top, r.top);
      left = Math.min(left, r.left);
      right = Math.max(right, r.right);
      bottom = Math.max(bottom, r.bottom);
    }
    return top === Infinity ? null : new DOMRect(left, top, right - left, bottom - top);
  }
  return el.getBoundingClientRect();
}

const bgUrl = (el: Element) => {
  const m = getComputedStyle(el).backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
  return m ? m[1] : "";
};

/** What the pointer is on: an image, a background image or a piece of text (inside one section). */
function pick(target: Element) {
  const section = target.closest("[data-cms-key]");
  const area = section ? null : target.closest("header") ? "header" : target.closest("footer") ? "footer" : null;
  const img = target instanceof HTMLImageElement ? target : target.closest("picture")?.querySelector("img") ?? null;
  if (img) return { section, area, el: img as Element, kind: "image" as const, src: img.currentSrc || img.src, text: img.alt };
  const text = (target as HTMLElement).innerText?.replace(/\s+/g, " ").trim() ?? "";
  if (text && text.length < 600) return { section, area, el: target, kind: "text" as const, src: "", text };
  // no text here: nearest background image up to the section
  for (let el: Element | null = target; el && el !== section; el = el.parentElement) {
    const u = bgUrl(el);
    if (u) return { section, area, el, kind: "image" as const, src: u, text: "" };
  }
  return { section, area, el: target, kind: "text" as const, src: "", text: text.slice(0, 600) };
}

export default function EditBridge({ adminOrigin }: { adminOrigin: string }) {
  const router = useRouter();
  const pathname = usePathname();

  // tell the editor where the frame is (links followed in "browse" mode)
  useEffect(() => {
    if (window.parent !== window) window.parent.postMessage({ type: "path", path: pathname }, adminOrigin);
  }, [pathname, adminOrigin]);

  useEffect(() => {
    if (window.parent === window) return;
    const post = (m: Record<string, unknown>) => window.parent.postMessage(m, adminOrigin);
    let mode: "edit" | "browse" = "edit";
    let labels: Record<string, string> = {};
    let hover: { section: Element | null; el: Element | null } = { section: null, el: null };
    let selected: Element | null = null;

    // overlay: hovered section, hovered element, selected section
    const layer = document.createElement("div");
    layer.setAttribute("data-cms-overlay", "");
    layer.style.cssText = `position:fixed;inset:0;pointer-events:none;z-index:${Z}`;
    const mk = (css: string) => {
      const d = document.createElement("div");
      d.style.cssText = `position:fixed;display:none;box-sizing:border-box;transition:all .08s ease-out;${css}`;
      layer.appendChild(d);
      return d;
    };
    const selBox = mk(`border:2px solid ${TEAL};border-radius:4px;box-shadow:0 0 0 4px rgba(13,148,136,.12)`);
    const secBox = mk(`border:1.5px dashed ${TEAL};border-radius:4px`);
    const elBox = mk(`border:1.5px solid #2563eb;border-radius:3px;background:rgba(37,99,235,.06)`);
    const tag = mk(`background:${TEAL};color:#fff;font:600 11px/1 system-ui,sans-serif;padding:5px 8px;border-radius:4px 4px 4px 0;white-space:nowrap;transform:translateY(-100%)`);
    const tip = mk(`background:#1e40af;color:#fff;font:600 10.5px/1 system-ui,sans-serif;padding:4px 7px;border-radius:3px;white-space:nowrap;transform:translateY(-100%)`);
    document.body.appendChild(layer);

    const place = (d: HTMLDivElement, r: DOMRect | null) => {
      if (!r) return void (d.style.display = "none");
      d.style.display = "block";
      d.style.left = `${r.left}px`;
      d.style.top = `${r.top}px`;
      d.style.width = `${r.width}px`;
      d.style.height = `${r.height}px`;
    };
    const label = (k: string | null) => (k ? labels[k] ?? (k.startsWith("global:") ? "Shared section" : k) : "");
    const hideBanner = () => document.querySelectorAll<HTMLElement>("[data-preview-banner]").forEach((b) => (b.style.display = "none"));
    const draw = () => {
      // a refresh after saving can re-render <body> and drop nodes React doesn't own: put the overlay back
      if (!layer.isConnected) {
        document.body.appendChild(layer);
        hideBanner();
      }
      const on = mode === "edit";
      place(selBox, box(selected));
      place(secBox, on && hover.section && hover.section !== selected ? box(hover.section) : null);
      place(elBox, on && hover.el ? box(hover.el) : null);
      const sr = on && hover.section ? box(hover.section) : selected ? box(selected) : null;
      const sk = (on && hover.section ? hover.section : selected)?.getAttribute("data-cms-key") ?? null;
      if (sr && sk) {
        tag.style.display = "block";
        tag.textContent = label(sk);
        tag.style.left = `${Math.max(0, sr.left)}px`;
        tag.style.top = `${Math.max(22, sr.top)}px`;
        tag.style.width = "auto";
        tag.style.height = "auto";
      } else tag.style.display = "none";
      const er = on && hover.el ? box(hover.el) : null;
      if (er) {
        tip.style.display = "block";
        tip.textContent = hover.el instanceof HTMLImageElement || !(hover.el as HTMLElement).innerText?.trim() ? "Click to change image" : "Click to edit";
        tip.style.left = `${Math.max(0, er.right - 90)}px`;
        tip.style.top = `${Math.max(16, er.top)}px`;
        tip.style.width = "auto";
        tip.style.height = "auto";
      } else tip.style.display = "none";
    };
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      if (mode !== "edit" || !(e.target instanceof Element) || layer.contains(e.target)) return;
      const p = pick(e.target);
      hover = { section: p.section, el: p.section ? p.el : null };
      // after a refresh the selected section may be a new element: follow it by its key
      if (selected && !selected.isConnected) selected = document.querySelector(`[data-cms-key="${CSS.escape(selected.getAttribute("data-cms-key") ?? "")}"]`);
      schedule();
    };
    const onLeave = () => {
      hover = { section: null, el: null };
      schedule();
    };
    const onClick = (e: MouseEvent) => {
      if (mode !== "edit" || !(e.target instanceof Element)) return;
      // editing: links, buttons and forms do nothing; the admin opens the clicked field instead
      e.preventDefault();
      e.stopPropagation();
      const p = pick(e.target);
      selected = p.section;
      schedule();
      // the exact text under the pointer (a heading can be made of several editable pieces)
      const caret = (document as Document & { caretRangeFromPoint?: (x: number, y: number) => Range | null }).caretRangeFromPoint?.(e.clientX, e.clientY);
      const node = caret?.startContainer;
      const nodeText = node && node.nodeType === Node.TEXT_NODE ? (node.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 600) : "";
      post({
        type: "select",
        key: p.section?.getAttribute("data-cms-key") ?? null,
        area: p.area,
        kind: p.kind,
        text: p.text,
        nodeText,
        src: p.src,
        href: (e.target.closest("a") as HTMLAnchorElement | null)?.getAttribute("href") ?? "",
      });
    };
    const block = (e: Event) => {
      if (mode === "edit") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== adminOrigin || e.source !== window.parent) return;
      const m = e.data as Msg;
      if (!m || typeof m !== "object") return;
      switch (m.type) {
        case "mode":
          mode = m.mode;
          document.documentElement.style.cursor = "";
          hover = { section: null, el: null };
          break;
        case "labels":
          labels = m.labels ?? {};
          break;
        case "content":
          if (typeof m.key === "string" && m.content && typeof m.content === "object") setLiveContent(m.key, m.content);
          break;
        case "clear":
          clearLiveContent();
          break;
        case "refresh":
          router.refresh();
          break;
        case "focus": {
          selected = m.key ? document.querySelector(`[data-cms-key="${CSS.escape(m.key)}"]`) : null;
          if (selected && m.scroll) {
            const r = box(selected);
            if (r) window.scrollTo({ top: window.scrollY + r.top - 90, behavior: "smooth" });
          }
          break;
        }
      }
      schedule();
    };

    // the "you are in preview" pill is for preview tabs, not for the editor frame
    hideBanner();

    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", block, true);
    window.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    window.addEventListener("message", onMessage);
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    post({ type: "ready", path: location.pathname });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      layer.remove();
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", block, true);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("message", onMessage);
    };
  }, [adminOrigin, router]);

  return null;
}
