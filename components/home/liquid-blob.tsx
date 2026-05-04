"use client";

import { useEffect, useState } from "react";

export function LiquidBlob() {
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cx = 230, cy = 230, baseR = 150;
  const n = 10;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const r = baseR + Math.sin(t * 1.2 + i * 1.7) * 18 + Math.sin(t * 0.7 + i * 0.9) * 10;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  });

  const path =
    pts
      .map((p, i) => {
        const prev = pts[(i - 1 + n) % n];
        const next = pts[(i + 1) % n];
        const c1x = prev.x + (p.x - pts[(i - 2 + n) % n].x) / 6;
        const c1y = prev.y + (p.y - pts[(i - 2 + n) % n].y) / 6;
        const c2x = p.x - (next.x - prev.x) / 6;
        const c2y = p.y - (next.y - prev.y) / 6;
        return i === 0
          ? `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
          : `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      })
      .join(" ") + " Z";

  return (
    <div className="relative w-[460px] h-[460px]">
      <svg width="460" height="460" className="absolute inset-0">
        <defs>
          <radialGradient id="liquidBlobGrad" cx="40%" cy="40%" r="70%">
            <stop offset="0%" stopColor="oklch(0.75 0.22 295)" />
            <stop offset="50%" stopColor="oklch(0.55 0.265 301.924)" />
            <stop offset="100%" stopColor="oklch(0.3 0.18 295)" />
          </radialGradient>
          <filter id="liquidBlobGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        {/* glow underlay */}
        <path
          d={path}
          fill="oklch(0.496 0.265 301.924)"
          opacity="0.5"
          filter="url(#liquidBlobGlow)"
        />
        {/* main blob */}
        <path d={path} fill="url(#liquidBlobGrad)" />
        {/* specular highlight */}
        <ellipse
          cx="180"
          cy="170"
          rx="50"
          ry="30"
          fill="oklch(0.95 0.05 295 / 0.35)"
        />
      </svg>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-center font-mono select-none"
        style={{ textShadow: "0 2px 20px oklch(0 0 0 / 0.5)" }}
      >
        <div className="text-6xl font-bold tracking-tight">{"{ }"}</div>
        <div className="text-xs tracking-[0.2em] opacity-85 mt-2 uppercase">
          Building Things
        </div>
      </div>
    </div>
  );
}
