"use client";

import { useSyncExternalStore } from "react";

/**
 * Unsaved section content sent by the admin's visual editor (preview iframe only), so text edits
 * show on the page while typing. Saved drafts reach the page through a normal refresh; these
 * overrides only bridge the second until then. Empty outside the visual editor.
 */
type Content = Record<string, unknown>;
const overrides = new Map<string, Content>();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function setLiveContent(key: string, content: Content) {
  overrides.set(key, content);
  emit();
}

export function clearLiveContent() {
  if (!overrides.size) return;
  overrides.clear();
  emit();
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useLiveContent(key?: string): Content | undefined {
  return useSyncExternalStore(
    subscribe,
    () => (key ? overrides.get(key) : undefined),
    () => undefined,
  );
}
