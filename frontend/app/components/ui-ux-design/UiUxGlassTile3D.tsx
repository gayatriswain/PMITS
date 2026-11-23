"use client";

import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import type { MotionValue } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Pen-tool icon, painted to a 2D canvas so it can be "drawn" live    */
/* ------------------------------------------------------------------ */
type P = [number, number];
const A: P = [128, 392];
const C1: P = [128, 150];
const C2: P = [384, 150];
const B: P = [384, 392];

const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** de Casteljau: control points of the cubic from t=0 to t=`t` */
function splitCubic(t: number): [P, P, P, P] {
  const ab = lerp(A, C1, t);
  const bc = lerp(C1, C2, t);
  const cd = lerp(C2, B, t);
  const abc = lerp(ab, bc, t);
  const bcd = lerp(bc, cd, t);
  const p = lerp(abc, bcd, t);
  return [A, ab, abc, p];
}

function paintIcon(ctx: CanvasRenderingContext2D, color: string, progress: number, pop: number) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // curve
  if (progress > 0.001) {
    const [p0, p1, p2, p3] = splitCubic(Math.min(1, progress));
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(p0[0], p0[1]);
    ctx.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
    ctx.stroke();
  }

  if (pop <= 0) return;
  const s = pop;

  // handles
  ctx.lineWidth = 7;
  ctx.setLineDash([14, 12]);
  ctx.globalAlpha *= 0.75;
  ctx.beginPath();
  ctx.moveTo(A[0], A[1]);
  ctx.lineTo(C1[0], C1[1]);
  ctx.lineTo(C2[0], C2[1]);
  ctx.lineTo(B[0], B[1]);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha /= 0.75;

  // anchors (squares)
  const sq = 34 * s;
  ctx.fillRect(A[0] - sq / 2, A[1] - sq / 2, sq, sq);
  ctx.fillRect(B[0] - sq / 2, B[1] - sq / 2, sq, sq);
  // handle knobs
  ctx.beginPath();
  ctx.arc(C1[0], C1[1], 21 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(C2[0], C2[1], 21 * s, 0, Math.PI * 2);
  ctx.fill();
  // peak node (hollow)
  ctx.lineWidth = 11;
  ctx.beginPath();
  ctx.arc(256, 210, 24 * s, 0, Math.PI * 2);
  ctx.stroke();
}

function useIconCanvas() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    const draw = (progress: number, pop: number, alpha: number) => {
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, 512, 512);
      ctx.globalAlpha = alpha;
      // engraved look: light lip below, dark body above
      ctx.save();
      ctx.translate(0, 5);
      paintIcon(ctx, "rgba(235,255,252,0.75)", progress, pop);
      ctx.restore();
      paintIcon(ctx, "#0a3a44", progress, pop);
      ctx.globalAlpha = 1;
      texture.needsUpdate = true;
    };
    return { texture, draw };
  }, []);
}

function useSheenTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const g = c.getContext("2d")!;
    const lin = g.createLinearGradient(0, 0, 256, 256);
    lin.addColorStop(0, "rgba(255,255,255,0.55)");
    lin.addColorStop(0.45, "rgba(220,255,250,0.18)");
    lin.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = lin;
    g.fillRect(0, 0, 256, 256);
    const rad = g.createRadialGradient(70, 60, 0, 70, 60, 120);
    rad.addColorStop(0, "rgba(255,255,255,0.35)");
    rad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = rad;
    g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

/* ------------------------------------------------------------------ */
/*  The tile                                                           */
/* ------------------------------------------------------------------ */
function Tile({
  mx,
  my,
  reduce,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduce: boolean;
}) {
  const rig = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const sweep = useRef<THREE.PointLight>(null);
  const hover = useRef(false);
  const { texture, draw } = useIconCanvas();
  const sheen = useSheenTexture();

  useEffect(() => {
    if (reduce) draw(1, 1, 1);
    return () => {
      texture.dispose();
    };
  }, [reduce, draw, texture]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const g = rig.current;
    const k = tilt.current;
    if (!g || !k) return;

    if (!reduce) {
      // float + intro (scale eases up from the initial 0.55)
      const target = hover.current ? 1.08 : 1;
      const s = THREE.MathUtils.damp(g.scale.x, target, 3.2, dt);
      g.scale.setScalar(s);
      g.position.y = Math.sin(t * 1.15) * 0.1;

      // slow yaw drift + pointer parallax
      const px = mx.get();
      const py = my.get();
      k.rotation.y = THREE.MathUtils.damp(k.rotation.y, -0.52 + Math.sin(t * 0.5) * 0.12 + px * 0.55, 3, dt);
      k.rotation.x = THREE.MathUtils.damp(k.rotation.x, 0.0 + Math.cos(t * 0.6) * 0.04 + py * 0.3, 3, dt);
      k.rotation.z = THREE.MathUtils.damp(k.rotation.z, 0.1 + Math.sin(t * 0.7) * 0.03, 3, dt);

      // icon: draw curve → pop handles → hold → fade → repeat
      const cyc = (t % 7) / 7;
      const progress = THREE.MathUtils.smoothstep(cyc, 0.05, 0.4);
      const pop = THREE.MathUtils.smoothstep(cyc, 0.38, 0.5);
      const alpha = 1 - THREE.MathUtils.smoothstep(cyc, 0.9, 0.99);
      draw(progress, pop, alpha);

      // travelling highlight
      if (sweep.current) sweep.current.position.set(Math.cos(t * 0.9) * 2.6, 2.4, Math.sin(t * 0.9) * 2.6);
    }
  });

  return (
    <>
      <group ref={rig} scale={0.55} onPointerOver={() => (hover.current = true)} onPointerOut={() => (hover.current = false)}>
        <group ref={tilt} rotation={[0, -0.52, 0.1]}>
          <group rotation={[0.52, 0, 0]}>
            {/* glass shell */}
            <RoundedBox args={[1.8, 0.52, 1.8]} radius={0.2} smoothness={6} creaseAngle={0.4}>
              <meshPhysicalMaterial
                color="#1fb8a5"
                roughness={0.18}
                metalness={0}
                transmission={0.35}
                thickness={0.9}
                ior={1.45}
                clearcoat={1}
                clearcoatRoughness={0.1}
                attenuationColor="#0a7f78"
                attenuationDistance={1.1}
                envMapIntensity={0.85}
              />
            </RoundedBox>

            {/* inner luminous core — gives the "frosted depth" */}
            <RoundedBox args={[1.5, 0.34, 1.5]} radius={0.15} smoothness={5} position={[0, 0.0, 0]}>
              <meshStandardMaterial
                color="#7fe9d9"
                emissive="#27c4af"
                emissiveIntensity={0.45}
                roughness={0.6}
                transparent
                opacity={0.42}
              />
            </RoundedBox>

            {/* soft sheen across the top face */}
            <mesh position={[0, 0.262, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[1.62, 1.62]} />
              <meshBasicMaterial map={sheen} transparent depthWrite={false} toneMapped={false} />
            </mesh>

            {/* engraved icon on the top face */}
            <mesh position={[0, 0.268, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[1.18, 1.18]} />
              <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} polygonOffset polygonOffsetFactor={-2} />
            </mesh>
          </group>
        </group>
      </group>

      {/* lights */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[-2.5, 4, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, -1.2, 1.5]} intensity={6} color="#2dd4bf" distance={6} />
      <pointLight ref={sweep} position={[2.6, 2.4, 0]} intensity={10} color="#e8fffb" distance={9} />

      {/* offline studio reflections (no network HDR) */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#7fb9b2"]} />
        <Lightformer form="rect" intensity={5} position={[-4, 4, 3]} scale={[7, 2.5, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        <Lightformer form="rect" intensity={3} position={[4, 2, -3]} scale={[5, 2, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        <Lightformer form="ring" color="#9ff6e8" intensity={3} position={[0, 5, 0]} scale={4} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        <Lightformer form="rect" color="#2dd4bf" intensity={2} position={[0, -3, 2]} scale={[6, 1.5, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
      </Environment>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Fallback (no WebGL): flat tile                                     */
/* ------------------------------------------------------------------ */
function FlatTile() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-[84px] w-[84px] items-center justify-center rounded-[26px] bg-[linear-gradient(145deg,#7ff0dc_0%,#19c3ac_45%,#0d9488_100%)] shadow-[0_26px_44px_-12px_rgba(13,148,136,0.7)]">
        <svg viewBox="0 0 100 100" className="h-[46px] w-[46px] text-[#0c1e3d]" fill="none" stroke="currentColor">
          <path d="M 22 76 C 22 34, 78 34, 78 76" strokeWidth="5" strokeLinecap="round" />
          <circle cx="50" cy="34" r="6" fill="#fff" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
}

class Boundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <FlatTile /> : this.props.children;
  }
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */
export default function UiUxGlassTile3D({
  mx,
  my,
  reduce = false,
  className = "",
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduce?: boolean;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // stop rendering while off-screen
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={className}>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[4%] left-1/2 h-14 w-48 -translate-x-1/2 animate-pulse rounded-full bg-teal-400/55 blur-2xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[10%] left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-teal-300/70 blur-lg"
      />
      <Boundary>
        <Canvas
          frameloop={reduce ? "demand" : visible ? "always" : "never"}
          dpr={[1, 2]}
          camera={{ position: [0, 2.3, 4.6], fov: 30 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          onCreated={({ camera }) => camera.lookAt(0, -0.05, 0)}
          style={{ background: "transparent" }}
        >
          <Tile mx={mx} my={my} reduce={reduce} />
        </Canvas>
      </Boundary>
    </div>
  );
}
