"use client";

import { useEffect, useRef, useState } from "react";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useTranslations } from "next-intl";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BOOT_EVENT, BOOT_STORAGE_KEY, DEPLOY_EVENT, prefersReducedMotion, pulse } from "@/lib/hud";

export interface BootLine {
    text: string;
    kind?: "hd" | "dim" | "warn";
    status?: string;
}

const STAGES = ["decrypting", "stack", "operations", "deploying"] as const;

function LogLine({ line }: { line: BootLine }) {
    const [showStatus, setShowStatus] = useState(false);

    useEffect(() => {
        const t = window.setTimeout(() => setShowStatus(true), 70);
        return () => window.clearTimeout(t);
    }, []);

    return (
        <div className={cn(
            "flex items-baseline gap-[0.6em] overflow-hidden whitespace-nowrap",
            line.kind === "hd" && "text-[1.1em] text-heading",
            line.kind === "dim" && "text-muted-foreground"
        )}>
            <span className="flex-none">&gt; {line.text}</span>
            {line.status && (
                <>
                    <span className="min-w-4 flex-1 translate-y-[-0.3em] border-b border-dotted border-border-strong" />
                    <span className={cn(
                        "flex-none text-primary",
                        !showStatus && "invisible",
                        line.kind === "warn" && "animate-blink bg-primary px-[0.35em] text-primary-foreground"
                    )}>
                        {line.status}
                    </span>
                </>
            )}
        </div>
    );
}

export function BootSequence({ lines }: { lines: BootLine[] }) {
    const t = useTranslations("Boot");
    const [log, setLog] = useState<BootLine[]>([]);
    const [phase, setPhase] = useState<"log" | "core" | "granted">("log");
    const [progress, setProgress] = useState(0);
    const [flash, setFlash] = useState(false);
    const [clear, setClear] = useState(false);
    const markRef = useRef<HTMLDivElement>(null);
    const grantedRef = useRef<HTMLDivElement>(null);
    const skipRef = useRef<HTMLButtonElement>(null);
    const finishRef = useRef<() => void>(() => {});
    const [booting, setBooting] = useState(false);

    // any of these skips straight to the end of the boot
    const skip = () => finishRef.current();
    useHotkey("Escape", skip, { enabled: booting });
    useHotkey("Enter", skip, { enabled: booting });
    useHotkey("Space", skip, { enabled: booting });

    useEffect(() => {
        const root = document.documentElement;
        let timers: number[] = [];
        let raf = 0;
        let booting = false;
        const later = (fn: () => void, ms: number) => { timers.push(window.setTimeout(fn, ms)); };
        const clearTimers = () => { timers.forEach(window.clearTimeout); timers = []; cancelAnimationFrame(raf); };

        const finish = () => {
            if (!booting) return;
            booting = false;
            setBooting(false);
            clearTimers();
            // a skipped boot jumps to its final state so the flash has something to show
            setPhase("granted");
            setProgress(100);
            try { sessionStorage.setItem(BOOT_STORAGE_KEY, "1"); } catch { /* storage unavailable */ }

            const build = () => {
                root.removeAttribute("data-prebuild");
                root.setAttribute("data-deployed", "");
                window.dispatchEvent(new Event(DEPLOY_EVENT));
                later(() => root.removeAttribute("data-bg-in"), 2500);
            };
            if (prefersReducedMotion()) {
                root.removeAttribute("data-boot");
                build();
                return;
            }
            // 1. boot text flashes twice, 2. overlay turns see-through while the background morphs in, 3. interface builds up
            setFlash(true);
            later(() => { setClear(true); root.setAttribute("data-bg-in", ""); }, 640);
            later(() => root.removeAttribute("data-boot"), 840);
            later(build, 1550);
        };

        const runProgress = () => {
            setPhase("core");
            pulse(markRef.current, 320);
            const t0 = performance.now(), dur = 1500;
            const step = (now: number) => {
                const p = Math.min(1, (now - t0) / dur);
                // stall near the end, then finish
                const eased = p < .7 ? p * 1.15 : .805 + (p - .7) * .65;
                setProgress(Math.min(100, Math.round(eased * 100)));
                if (Math.random() < .06) pulse(markRef.current, 200);
                if (p < 1) {
                    raf = requestAnimationFrame(step);
                } else {
                    setProgress(100);
                    setPhase("granted");
                    later(() => pulse(grantedRef.current, 360), 40);
                    later(finish, 750);
                }
            };
            raf = requestAnimationFrame(step);
        };

        const start = () => {
            clearTimers();
            booting = true;
            setBooting(true);
            setLog([]);
            setPhase("log");
            setProgress(0);
            setFlash(false);
            setClear(false);
            root.removeAttribute("data-deployed");
            root.setAttribute("data-boot", "");
            root.setAttribute("data-prebuild", "");
            window.setTimeout(() => skipRef.current?.focus({ preventScroll: true }), 0);

            let t = 160;
            lines.forEach((line, i) => {
                later(() => setLog((prev) => [...prev, line]), t);
                t += i < 2 ? 140 : 95 + Math.random() * 90;
            });
            later(runProgress, t + 200);
        };

        const onReboot = () => {
            if (prefersReducedMotion()) return;
            window.scrollTo({ top: 0 });
            start();
        };
        finishRef.current = finish;
        window.addEventListener(BOOT_EVENT, onReboot);
        if (root.hasAttribute("data-boot")) start();

        return () => {
            clearTimers();
            window.removeEventListener(BOOT_EVENT, onReboot);
        };
    }, [lines]);

    const stage = STAGES[Math.min(STAGES.length - 1, Math.floor(progress / 100 * STAGES.length))];

    return (
        <div
            className={cn("boot", flash && "flash", clear && "clear")}
            role="dialog"
            aria-label={t("label")}
            onClick={() => finishRef.current()}
        >
            <div className="boot-frame relative w-full max-w-195">
                <div className="min-h-[15em] text-[clamp(.7rem,2.4vw,.88rem)] leading-[1.7] tracking-[0.04em]" aria-live="polite">
                    {log.map((line, i) => <LogLine key={i} line={line} />)}
                </div>
                {phase !== "log" && (
                    <div className="mt-6 grid gap-3">
                        <div
                            ref={markRef}
                            className="glitch font-heading text-[clamp(3rem,13vw,6.5rem)] leading-[.85] font-extrabold tracking-[0.01em] text-heading uppercase"
                            data-text="KLEINE-OS"
                        >
                            KLEINE-OS
                            <small className="mt-2.5 block font-mono text-xs font-normal tracking-[0.3em] text-primary">{t("subtitle")}</small>
                        </div>
                        <Progress value={progress} segmented className="h-2.5 *:data-[slot=progress-indicator]:transition-none" />
                        <div className="flex justify-between gap-4 text-xs tracking-[0.12em] text-muted-foreground">
                            <span>{t(`stages.${stage}`)}</span>
                            <b className="font-normal text-highlight tabular-nums">{String(progress).padStart(3, "0")}%</b>
                        </div>
                        {phase === "granted" && (
                            <div
                                ref={grantedRef}
                                className="glitch font-heading text-[clamp(1.4rem,5vw,2.2rem)] tracking-[0.08em] text-heading uppercase"
                                data-text={t("granted")}
                            >
                                {t("granted")}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Button
                ref={skipRef}
                variant="terminal"
                size="xs"
                className="boot-skip absolute right-5 bottom-5 z-10 border-border text-muted-foreground"
                onClick={(e) => { e.stopPropagation(); finishRef.current(); }}
            >
                {t("skip")}
            </Button>
        </div>
    );
}
