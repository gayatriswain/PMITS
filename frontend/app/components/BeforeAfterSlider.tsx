"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeBadge: string;
  afterBadge: string;
  initialPosition?: number;
  /** Height (or aspect-ratio) classes for the slider frame — sized to match the source images so they show in full, uncropped. */
  heightClassName?: string;
};

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeBadge,
  afterBadge,
  initialPosition = 50,
  heightClassName = "aspect-[1900/906]",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [position, setPosition] = useState(initialPosition);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const stopDragging = () => {
    draggingRef.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 3));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 3));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`group relative w-full ${heightClassName} touch-none select-none overflow-hidden bg-[#fafafa]`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      {/* AFTER layer — always fully visible underneath */}
      <div className="absolute inset-0">
        <Image src={afterImage} alt="After" fill priority className="object-cover object-top" />
        <span className="pointer-events-none absolute right-3 top-3 shrink-0 rounded-full bg-[#cca651] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px]">
          {afterBadge}
        </span>
      </div>

      {/* BEFORE layer — clipped to reveal only up to `position` */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <div className="absolute inset-0 bg-[#141414]">
          <Image
            src={beforeImage}
            alt="Before"
            fill
            priority
            className="object-cover object-top grayscale contrast-125 brightness-[0.7]"
          />
        </div>
        <span className="pointer-events-none absolute left-3 top-3 shrink-0 rounded-full border border-slate-300 bg-black/40 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-slate-100 backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px]">
          {beforeBadge}
        </span>
      </div>

      {/* Divider line + drag handle */}
      <div
        className="absolute top-0 bottom-0 z-30 flex items-center justify-center"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-0 bottom-0 w-[2px] bg-white/80 shadow-[0_0_8px_rgba(0,0,0,0.35)]" />
        <div
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="relative z-10 flex h-10 w-10 cursor-ew-resize items-center justify-center rounded-full bg-white text-[#0b3b35] shadow-[0_5px_15px_rgba(0,0,0,0.25)] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] group-hover:scale-105 sm:h-12 sm:w-12"
        >
          <div className="flex gap-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
