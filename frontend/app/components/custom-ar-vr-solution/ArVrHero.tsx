"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Container from "../shared/Container";

// Opening inside ARVR-frame.png (fractions of the image box)
const LENS_CENTER_Y = 0.556;
const LENS_W = 0.585;
const LENS_H = 0.615;
// Video window behind the frame (slightly bigger than the opening; the ring hides its edge)
const BOX = { left: 0.19, top: 0.21, width: 0.62, height: 0.67 };

// Scroll progress (0..1 over the pinned track)
const ZOOM_START = 0.04;
const ZOOM_END = 0.3;
const VIDEO_START = 0.32;
const VIDEO_END = 0.97;

// Scroll-scrubbed video (painted on a canvas)
const VIDEO_SRC = "/Video%20Project%205.mp4";
const FRAME_W = 1280;
const FRAME_H = 720;
// Part of the zoom (0..1) where the video window opens up to the full screen
const OPEN_FROM = 0.8;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
};

type Geo = {
  vw: number;
  vh: number;
  w: number;
  h: number;
  top: number;
  scale: number;
  shift: number;
};

const EMPTY_GEO: Geo = { vw: 1200, vh: 700, w: 1200, h: 410, top: 280, scale: 3, shift: -150 };

// Video window rect (stage coordinates) at zoom progress p
function videoRect(g: Geo, p: number) {
  const s = lerp(1, g.scale, p);
  const dy = g.shift * p;
  const originY = g.top + LENS_CENTER_Y * g.h;

  const bw = BOX.width * g.w * s;
  const bh = BOX.height * g.h * s;
  const bl = g.w / 2 + (BOX.left * g.w - g.w / 2) * s;
  const bt = originY + (BOX.top * g.h - LENS_CENTER_Y * g.h) * s + dy;

  // Final state: the video fills the whole stage (full screen)
  const ew = g.vw;
  const eh = g.vh;
  const el = 0;
  const et = 0;

  const t = smooth((p - OPEN_FROM) / (1 - OPEN_FROM));
  return {
    t,
    left: lerp(bl, el, t),
    top: lerp(bt, et, t),
    width: lerp(bw, ew, t),
    height: lerp(bh, eh, t),
    rx: 0.07 * bw * (1 - t),
    ry: 0.12 * bh * (1 - t),
  };
}

export default function ArVrHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [headerH, setHeaderH] = useState(0);
  const [geo, setGeo] = useState<Geo>(EMPTY_GEO);

  const { scrollYProgress: rawProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.35,
    restDelta: 0.0002,
  });

  // Keep the first screen below the site header; slide the header away while the hero is pinned
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const update = () => setHeaderH(header.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(header);

    header.style.transition = "transform 0.35s ease";
    const toggle = (p: number) => {
      header.style.transform = p > 0.002 && p < 0.985 ? "translateY(-100%)" : "";
    };
    toggle(rawProgress.get());
    const off = rawProgress.on("change", toggle);
    return () => {
      ro.disconnect();
      off();
      header.style.transform = "";
      header.style.transition = "";
    };
  }, [rawProgress]);

  // Measure the layout and work out how far to scale/move the frame
  useEffect(() => {
    const stage = stageRef.current;
    const lens = lensRef.current;
    const text = textRef.current;
    if (!stage || !lens || !text) return;

    const measure = () => {
      const vw = stage.clientWidth;
      const vh = stage.clientHeight;
      const w = lens.offsetWidth;
      const h = lens.offsetHeight;
      const top = lens.offsetTop;
      const scale = Math.max(vw / (LENS_W * w), vh / (LENS_H * h)) * 1.3;
      const shift = vh / 2 - (top + LENS_CENTER_Y * h);
      setGeo({ vw, vh, w, h, top, scale, shift });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    ro.observe(text);
    ro.observe(lens);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [headerH]);

  // Scrub the video with scroll: seek to the matching time and paint it on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !video || !ctx) return;
    let raf = 0;
    let wanted = -1;

    const paint = () => {
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) return;
      // "cover" fit into the canvas
      const k = Math.max(FRAME_W / vw, FRAME_H / vh);
      const dw = vw * k;
      const dh = vh * k;
      ctx.drawImage(video, (FRAME_W - dw) / 2, (FRAME_H - dh) / 2, dw, dh);
    };

    const seek = () => {
      const dur = video.duration;
      if (!dur || !isFinite(dur)) return;
      const p = scrollYProgress.get();
      const t =
        Math.min(Math.max((p - VIDEO_START) / (VIDEO_END - VIDEO_START), 0), 1) *
        Math.max(dur - 0.05, 0);
      if (Math.abs(t - wanted) < 0.01) return;
      wanted = t;
      if (!video.seeking) video.currentTime = t;
    };

    const onSeeked = () => {
      paint();
      // catch up if the scroll moved while this seek was running
      if (Math.abs(video.currentTime - wanted) > 0.01) video.currentTime = wanted;
    };
    const onReady = () => {
      wanted = -1;
      seek();
      paint();
    };

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadeddata", onReady);
    if (video.readyState >= 2) onReady();

    const tick = () => {
      seek();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onReady);
    };
  }, [scrollYProgress]);

  // Eased zoom progress: starts slow, glides to the centre, settles softly
  const linearProgress = useTransform(scrollYProgress, [ZOOM_START, ZOOM_END], [0, 1], {
    clamp: true,
  });
  const progress = useTransform(linearProgress, smooth);
  const scale = useTransform(progress, (p) => lerp(1, geo.scale, p));
  const y = useTransform(progress, (p) => geo.shift * p);

  const vLeft = useTransform(progress, (p) => videoRect(geo, p).left);
  const vTop = useTransform(progress, (p) => videoRect(geo, p).top);
  const vWidth = useTransform(progress, (p) => videoRect(geo, p).width);
  const vHeight = useTransform(progress, (p) => videoRect(geo, p).height);
  const vRadius = useTransform(progress, (p) => {
    const r = videoRect(geo, p);
    return `${r.rx}px / ${r.ry}px`;
  });
  // Frame image disappears once the video has opened to full screen
  const frameOpacity = useTransform(progress, (p) => 1 - smooth((p - 0.7) / 0.2));

  const textOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.03], [0, -40]);

  return (
    <section ref={trackRef} className="relative w-full h-[600vh] bg-[#eef0ff]">
      <div ref={stageRef} className="sticky top-0 w-full h-screen overflow-hidden">
        <Image
          src="/ARVR-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom select-none pointer-events-none"
        />

        {/* First-screen layout: text on top, headset at the bottom, never overlapping */}
        <div
          className="absolute left-0 top-0 w-full flex flex-col"
          style={{ height: `calc(100vh - ${headerH}px)` }}
        >
        {/* Text sits in normal flow above the headset; the video and frame always render above it */}
        <motion.div
          ref={textRef}
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-[1] shrink-0"
        >
          <Container className="flex flex-col items-center text-center pt-5 sm:pt-6">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-[#6d5ef5] uppercase mb-3">
              Custom Solutions for AR/VR
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[44px] font-black text-[#0f1535] tracking-tight leading-[1.1] font-sans">
              Step Into. Experience.
              <br />
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] bg-clip-text text-transparent">
                Transform.
              </span>
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              We create immersive AR/VR experiences that connect imagination
              with real-world impact.
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="#contact-form"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 rounded-full bg-[#5b43e8] hover:bg-[#4a35cc] text-white font-semibold text-sm shadow-[0_8px_20px_-4px_rgba(91,67,232,0.45)] transition-colors duration-200"
              >
                <span>Explore Our Work</span>
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="#showreel"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 rounded-full text-[#0f1535] hover:text-[#5b43e8] font-semibold text-sm transition-colors duration-200"
              >
                <span aria-hidden className="text-[#5b43e8]">▶</span>
                <span>Watch Showreel</span>
              </Link>
            </div>
          </Container>
        </motion.div>

        {/* Video window: follows the frame opening, then opens to the full-screen video */}
        <motion.div
          style={{
            left: vLeft,
            top: vTop,
            width: vWidth,
            height: vHeight,
            borderRadius: vRadius,
          }}
          className="absolute z-[2] overflow-hidden bg-[#0b0f2e] pointer-events-none"
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            aria-hidden
            className="hidden"
          />
          <canvas
            ref={canvasRef}
            width={FRAME_W}
            height={FRAME_H}
            aria-hidden
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Headset frame: bottom of the stage, below the text */}
        <div
          ref={lensRef}
          className="relative mt-auto w-full shrink-0 -mb-[1vw] z-[4] pointer-events-none"
        >
          <motion.div
            style={{ scale, y, opacity: frameOpacity, transformOrigin: `50% ${LENS_CENTER_Y * 100}%` }}
            className="will-change-transform"
          >
            <Image
              src="/ARVR-frame.png"
              alt="VR headset frame"
              width={2146}
              height={733}
              priority
              sizes="100vw"
              className="w-full h-auto select-none"
            />
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
}
