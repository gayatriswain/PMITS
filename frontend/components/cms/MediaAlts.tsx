"use client";

import { useEffect } from "react";

/**
 * Alt texts typed in the CMS Media library (Admin → Media library → image → Alt text) applied to every
 * matching <img> on the page - including next/image (/_next/image?url=…) and images added later
 * (sliders, popups). The page's own alt is replaced only when the media library has one for that file.
 */
export default function MediaAlts({ alts }: { alts: Record<string, string> }) {
  useEffect(() => {
    const origin = window.location.origin;
    const norm = (u: string) => {
      try {
        const url = new URL(u, origin);
        if (url.pathname === "/_next/image") {
          const inner = url.searchParams.get("url");
          if (inner) return norm(inner);
        }
        return decodeURI(url.origin === origin ? url.pathname : url.href);
      } catch {
        return u;
      }
    };
    const map = new Map(Object.entries(alts).map(([k, v]) => [norm(k), v]));
    if (!map.size) return;
    const apply = (root: ParentNode) => {
      root.querySelectorAll("img").forEach((img) => {
        const alt = map.get(norm(img.getAttribute("src") || img.currentSrc || ""));
        if (alt && img.alt !== alt) img.alt = alt;
      });
    };
    apply(document);
    const mo = new MutationObserver((list) => {
      for (const m of list) {
        if (m.type === "attributes" && m.target instanceof HTMLImageElement) apply(m.target.parentNode ?? document);
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLImageElement) apply(n.parentNode ?? document);
          else if (n instanceof Element) apply(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
    return () => mo.disconnect();
  }, [alts]);
  return null;
}
