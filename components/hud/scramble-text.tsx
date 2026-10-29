"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/hud";
import { useOnDeploy } from "@/hooks/use-on-deploy";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>";
// keeps whitespace so multi-word text wraps the same while decoding
const noise = (s: string) => s.replace(/\S/g, () => CHARS[Math.random() * CHARS.length | 0]);

/** glitch-able text that decodes from noise every time the interface deploys */
export function ScrambleText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);

    useOnDeploy(() => {
        const el = ref.current;
        if (!el || prefersReducedMotion()) return;
        const total = 16;
        let f = 0, iv = 0;
        el.textContent = noise(text);
        const t = window.setTimeout(() => {
            iv = window.setInterval(() => {
                f++;
                const n = Math.floor(f / total * text.length);
                el.textContent = text.slice(0, n) + noise(text.slice(n));
                if (f >= total) { window.clearInterval(iv); el.textContent = text; }
            }, 45);
        }, 160 + delay);
        return () => { window.clearTimeout(t); window.clearInterval(iv); el.textContent = text; };
    });

    return (
        <span ref={ref} className={cn("glitch", className)} data-glitch data-text={text}>
            {text}
        </span>
    );
}
