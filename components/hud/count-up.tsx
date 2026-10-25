"use client";

import { useRef } from "react";
import { prefersReducedMotion } from "@/lib/hud";
import { useOnDeploy } from "@/hooks/use-on-deploy";

export function CountUp({ to, pad = 0, delay = 0 }: { to: number; pad?: number; delay?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const fmt = (v: number) => String(Math.round(v)).padStart(pad, "0");

    useOnDeploy(() => {
        const el = ref.current;
        if (!el || prefersReducedMotion()) return;
        let raf = 0;
        el.textContent = fmt(0);
        const t0 = performance.now() + 450 + delay, dur = 1200;
        const step = (now: number) => {
            const p = Math.max(0, Math.min(1, (now - t0) / dur));
            el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => { cancelAnimationFrame(raf); el.textContent = fmt(to); };
    });

    return <span ref={ref} className="tabular-nums">{fmt(to)}</span>;
}
