"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scale factor that fits a fixed-width design canvas into its container.
 * Returns 0 until the container has been measured, so callers can hide the
 * canvas instead of flashing it at the wrong size.
 */
export function useFitScale(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / designWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);
  return { ref, scale };
}
