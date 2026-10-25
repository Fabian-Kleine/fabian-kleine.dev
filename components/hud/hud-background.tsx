"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, pulse, readToken } from "@/lib/hud";

const field = (x: number, y: number) =>
    Math.sin(x * 1.3 + Math.cos(y * .9) * 1.6) * .9 +
    Math.cos(y * 1.1 - x * .4 + Math.sin(x * .7) * 1.2) * .8 +
    Math.sin((x + y) * 2.3) * .25 + Math.cos(x * 3.1 - y * 1.7) * .15;

type Point = [number, number];

/** static topographic contour map, drawn with marching squares */
function drawTopo(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = window.innerWidth, h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const color = readToken("--primary");
    const cell = 12, cols = Math.ceil(w / cell) + 1, rows = Math.ceil(h / cell) + 1, sc = 1 / 260;
    const v = new Float32Array(cols * rows);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) v[j * cols + i] = field(i * cell * sc, j * cell * sc);

    ctx.strokeStyle = color;
    for (let k = 0, lv = -2.4; lv <= 2.4; k++, lv += .22) {
        const major = k % 5 === 0;
        ctx.globalAlpha = major ? .22 : .09;
        ctx.lineWidth = major ? 1.1 : .8;
        ctx.beginPath();
        const seg = (p: Point, q: Point) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
        for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
            const a = v[j * cols + i], b = v[j * cols + i + 1], c = v[(j + 1) * cols + i + 1], d = v[(j + 1) * cols + i];
            const idx = (+(a > lv)) | (+(b > lv) << 1) | (+(c > lv) << 2) | (+(d > lv) << 3);
            if (idx === 0 || idx === 15) continue;
            const x = i * cell, y = j * cell;
            const T: Point = [x + cell * (lv - a) / (b - a), y], R: Point = [x + cell, y + cell * (lv - b) / (c - b)];
            const B: Point = [x + cell * (lv - d) / (c - d), y + cell], L: Point = [x, y + cell * (lv - a) / (d - a)];
            switch (idx) {
                case 1: case 14: seg(L, T); break;
                case 2: case 13: seg(T, R); break;
                case 3: case 12: seg(L, R); break;
                case 4: case 11: seg(R, B); break;
                case 6: case 9: seg(T, B); break;
                case 7: case 8: seg(L, B); break;
                case 5: seg(L, T); seg(R, B); break;
                case 10: seg(T, R); seg(L, B); break;
            }
        }
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

export function HudBackground() {
    const topoRef = useRef<HTMLCanvasElement>(null);
    const tearRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = topoRef.current;
        if (!canvas) return;
        drawTopo(canvas);
        let t = 0;
        const onResize = () => { window.clearTimeout(t); t = window.setTimeout(() => drawTopo(canvas), 200); };
        window.addEventListener("resize", onResize);
        return () => { window.removeEventListener("resize", onResize); window.clearTimeout(t); };
    }, []);

    // random glitch bursts on [data-glitch] elements and an occasional screen tear
    useEffect(() => {
        if (prefersReducedMotion()) return;
        const root = document.documentElement;
        const idle = () => !root.hasAttribute("data-boot") && !document.hidden;
        let glitchT = 0, tearT = 0;
        const glitch = () => {
            glitchT = window.setTimeout(() => {
                const els = document.querySelectorAll("[data-glitch]");
                if (idle() && els.length) pulse(els[Math.floor(Math.random() * els.length)]);
                glitch();
            }, 2200 + Math.random() * 3800);
        };
        const tear = () => {
            tearT = window.setTimeout(() => {
                if (idle() && tearRef.current) {
                    tearRef.current.style.top = (10 + Math.random() * 80) + "vh";
                    root.classList.add("tear");
                    window.setTimeout(() => root.classList.remove("tear"), 170);
                }
                tear();
            }, 7000 + Math.random() * 6000);
        };
        glitch();
        tear();
        return () => { window.clearTimeout(glitchT); window.clearTimeout(tearT); };
    }, []);

    return (
        <div aria-hidden="true">
            <div className="hud-atmo glow" />
            <div className="hud-atmo mesh" />
            <canvas ref={topoRef} className="hud-topo" />
            <div className="hud-atmo vignette" />
            <div className="hud-atmo scan" />
            <div ref={tearRef} className="hud-tear-bar" />
            <div className="hud-beam" />
        </div>
    );
}
