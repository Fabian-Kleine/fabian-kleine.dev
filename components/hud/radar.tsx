"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { prefersReducedMotion, readToken } from "@/lib/hud";

// fixed bearings and ranges so the contacts spread around the scope
const SLOTS = [{ a: .7, r: .55 }, { a: 2.3, r: .78 }, { a: 3.9, r: .4 }, { a: 5.3, r: .68 }, { a: 1.5, r: .3 }, { a: 4.6, r: .85 }];

export function Radar({ contacts }: { contacts: string[] }) {
    const t = useTranslations("Insignia");
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        const reduce = prefersReducedMotion();
        const primary = readToken("--primary"), highlight = readToken("--highlight");
        const font = readToken("--font-mono");
        const points = contacts.map((n, i) => ({ ...SLOTS[i % SLOTS.length], n: n.toUpperCase() }));
        let W = 0, H = 0, sweep = 0, last = performance.now(), raf = 0;

        const size = () => {
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            W = canvas.clientWidth; H = canvas.clientHeight;
            canvas.width = W * dpr; canvas.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        const draw = (now: number) => {
            const dt = Math.min(64, now - last); last = now;
            if (!reduce) sweep = (sweep + dt * .0016) % (Math.PI * 2);
            const cx = W / 2, cy = H / 2 + 8, R = Math.min(W, H) * .44;
            ctx.clearRect(0, 0, W, H);

            ctx.strokeStyle = primary; ctx.globalAlpha = .22; ctx.lineWidth = 1;
            for (let i = 1; i <= 3; i++) { ctx.beginPath(); ctx.arc(cx, cy, R * i / 3, 0, Math.PI * 2); ctx.stroke(); }
            ctx.beginPath(); ctx.moveTo(cx - R - 20, cy); ctx.lineTo(cx + R + 20, cy); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();

            // sweep wedge
            if ("createConicGradient" in ctx) {
                const g = ctx.createConicGradient(sweep - .9, cx, cy);
                g.addColorStop(0, "transparent");
                g.addColorStop(.14, primary);
                g.addColorStop(.1432, "transparent");
                g.addColorStop(1, "transparent");
                ctx.globalAlpha = .32; ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
            }
            ctx.globalAlpha = .85; ctx.strokeStyle = highlight;
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R); ctx.stroke();

            // contacts fade after the sweep passes them
            ctx.font = `10px ${font}`;
            points.forEach((c) => {
                const since = (sweep - c.a + Math.PI * 2) % (Math.PI * 2);
                const alpha = reduce ? 1 : Math.max(.15, 1 - since / (Math.PI * 1.6));
                const x = cx + Math.cos(c.a) * R * c.r, y = cy + Math.sin(c.a) * R * c.r;
                ctx.globalAlpha = alpha; ctx.fillStyle = highlight;
                ctx.fillRect(x - 3, y - 3, 6, 6);
                ctx.globalAlpha = alpha * .8; ctx.strokeStyle = primary;
                ctx.strokeRect(x - 7, y - 7, 14, 14);
                ctx.globalAlpha = alpha;
                if (W > 300) ctx.fillText(c.n, x + 10, y + 3);
            });
            ctx.globalAlpha = 1;
            if (!reduce) raf = requestAnimationFrame(draw);
        };

        const onResize = () => { size(); if (reduce) draw(performance.now()); };
        size();
        raf = requestAnimationFrame(draw);
        window.addEventListener("resize", onResize);
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
    }, [contacts]);

    return <canvas ref={ref} className="block aspect-video w-full" aria-label={t("radar", { count: contacts.length })} />;
}
