"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Meter } from "@/components/hud/meter";
import { cn } from "@/lib/utils";
import { prefersReducedMotion, pulse, readToken } from "@/lib/hud";
import type { Certificate, Insignia } from "@/config";

export interface InsigniaDossier extends Insignia {
    unit: string;
    summary: string;
    caption: string;
    stats: [value: string, label: string][];
    meter?: { label: string; value: string; percent: number };
    certificates: Certificate[];
    partners: string[];
    operations: { title: string; slug?: string }[];
}

function BadgeArt({ item, className, ref }: { item: InsigniaDossier; className?: string; ref?: React.Ref<HTMLImageElement> }) {
    const t = useTranslations("Insignia");

    return (
        <Image
            ref={ref}
            src={item.image}
            alt={t("alt", { name: item.name })}
            width={item.width}
            height={item.height}
            className={cn("size-full object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,.65)]", className)}
        />
    );
}

/** flies a detached copy of a badge between two boxes, tilting and glowing mid-flight */
function fly(src: string, from: DOMRect, to: DOMRect, duration: number) {
    const glow = readToken("--primary");
    const box = (r: DOMRect) => ({ left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
    const copy = document.createElement("img");
    copy.src = src;
    copy.alt = "";
    copy.className = "hud-flyer";
    Object.assign(copy.style, box(from));
    document.body.appendChild(copy);
    const animation = copy.animate([
        { ...box(from), transform: "rotate(0deg) scale(1)", filter: "drop-shadow(0 12px 16px rgba(0,0,0,.6))" },
        { offset: .55, transform: "rotate(-7deg) scale(1.1)", filter: `drop-shadow(0 0 28px ${glow}bf) brightness(1.25)` },
        { ...box(to), transform: "rotate(0deg) scale(1)", filter: "drop-shadow(0 10px 14px rgba(0,0,0,.6))" },
    ], { duration, easing: "cubic-bezier(.7,0,.2,1)", fill: "forwards" });
    return animation.finished.then(() => copy, () => copy);
}

/** one line of the dossier that sketches in as a bar, then reveals its text */
function Line({ i, multi, className, children }: { i: number; multi?: boolean; className?: string; children: React.ReactNode }) {
    return (
        <div className={cn("ml", multi && "multi", className)} style={{ "--i": i } as React.CSSProperties}>
            <div className="mt">{children}</div>
        </div>
    );
}

function Dossier({ item, landed, imageRef }: { item: InsigniaDossier; landed: boolean; imageRef: React.Ref<HTMLImageElement> }) {
    const t = useTranslations("Insignia");
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!landed) return;
        const t = window.setTimeout(() => pulse(titleRef.current, 340), 260);
        return () => window.clearTimeout(t);
    }, [landed, item.id]);

    let i = 4;
    return (
        <div className="flex max-h-[calc(100dvh-2rem)] min-h-0 flex-col">
            <div className="flex flex-none items-center justify-between gap-4 border-b px-4 py-2.5 font-mono text-[0.68rem] tracking-[0.18em] text-muted-foreground sm:px-6">
                <span className="truncate">{t("dossier")} // <b className="font-normal text-primary">FK-0800-{item.id.charAt(0).toUpperCase()}</b></span>
                <DialogClose asChild>
                    <Button variant="terminal" size="xs">{t("close")}</Button>
                </DialogClose>
            </div>
            <div className="grid min-h-0 gap-6 overflow-y-auto p-4 sm:gap-7 sm:p-8">
                <div className="grid grid-cols-[112px_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[clamp(120px,34%,300px)_minmax(0,1fr)] sm:gap-8">
                    <div className="dossier-box relative aspect-5/4 border border-border-strong p-2 sm:p-4">
                        <BadgeArt ref={imageRef} item={item} className={cn("drop-shadow-[0_10px_14px_rgba(0,0,0,.6)]", !landed && "invisible")} />
                    </div>
                    <div className="grid min-w-0 content-start gap-2.5 pt-1">
                        <Line i={0} className="w-fit max-w-full"><span className="hud-label">{item.unit}</span></Line>
                        <Line i={1}>
                            <DialogTitle
                                className="glitch hud-title block text-[clamp(2rem,7vw,5rem)] font-extrabold"
                                data-text={item.name}
                                ref={titleRef}
                            >
                                {item.name}
                            </DialogTitle>
                        </Line>
                        <Line i={2}><p className="font-mono text-xs tracking-[0.14em] text-highlight uppercase">{item.caption}</p></Line>
                        {item.meter && (
                            <Line i={3} className="max-w-xs">
                                <div className="grid gap-1.5">
                                    <div className="flex justify-between hud-meta"><span>{item.meter.label}</span><b className="font-normal text-highlight">{item.meter.value}</b></div>
                                    <Meter value={landed ? item.meter.percent : 0} className="h-2" />
                                </div>
                            </Line>
                        )}
                    </div>
                </div>

                <Line i={i++} multi>
                    <DialogDescription className="max-w-[68ch] font-sans text-base leading-relaxed text-foreground">{item.summary}</DialogDescription>
                </Line>

                <dl className="grid grid-cols-3 gap-px border bg-border">
                    {item.stats.map(([value, label]) => (
                        <Line key={label} i={i++} className="bg-popover px-3 py-2.5 sm:px-4">
                            <dt className="hud-meta text-[0.62rem]">{label}</dt>
                            <dd className="font-heading text-[clamp(1.5rem,4vw,2.2rem)] leading-none font-bold text-heading tabular-nums">{value}</dd>
                        </Line>
                    ))}
                </dl>

                {item.certificates.length > 0 && (
                    <div className="grid gap-3">
                        <Line i={i++} className="w-fit"><span className="hud-label">{t("certifications")}</span></Line>
                        <div className="grid gap-3 sm:grid-cols-3">
                            {item.certificates.map((cert) => (
                                <Line key={cert.file} i={i++} className="*:h-full">
                                    <a
                                        href={`/certificats/${cert.file}.png`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/cert flex h-full flex-col border bg-background/40 transition-colors hover:border-primary"
                                    >
                                        <div className="relative aspect-4/3 bg-muted/40">
                                            <Image
                                                src={`/certificats/${cert.file}.png`}
                                                alt={cert.name}
                                                fill
                                                sizes="(max-width: 640px) 100vw, 300px"
                                                className="object-contain p-2 transition-transform duration-500 group-hover/cert:scale-[1.03]"
                                            />
                                        </div>
                                        <div className="grid flex-1 content-between gap-1 border-t p-3">
                                            <span className="grid gap-1">
                                                <span className="text-sm leading-snug font-semibold text-heading">{cert.name}</span>
                                                {cert.validUntil && (
                                                    <span className="font-mono text-[0.62rem] tracking-[0.14em] text-highlight uppercase">{t("validUntil", { date: cert.validUntil })}</span>
                                                )}
                                            </span>
                                            <span className="flex items-center justify-between hud-meta text-[0.62rem]">
                                                {cert.issuer}
                                                <ExternalLink className="size-3 text-primary" />
                                            </span>
                                        </div>
                                    </a>
                                </Line>
                            ))}
                        </div>
                    </div>
                )}

                {(item.partners.length > 0 || item.operations.length > 0) && (
                    <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                        {item.operations.length > 0 && (
                            <div className="grid content-start gap-2">
                                <Line i={i++} className="w-fit"><span className="hud-label">{t("deployedIn")}</span></Line>
                                <Line i={i++} multi>
                                    <ul className="grid gap-1 leading-relaxed">
                                        {item.operations.map((op) => (
                                            <li key={op.title} className="relative pl-5 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-2 before:bg-primary">
                                                {op.slug ? (
                                                    <Link href={`/projects/${op.slug}`} className="underline-offset-4 hover:text-primary hover:underline">{op.title}</Link>
                                                ) : (
                                                    <>{op.title}</>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </Line>
                            </div>
                        )}
                        {item.partners.length > 0 && (
                            <div className="grid content-start gap-2">
                                <Line i={i++} className="w-fit"><span className="hud-label">{t("partners")}</span></Line>
                                <Line i={i++}>
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.partners.map((p) => <Badge key={p} variant="secondary">{p}</Badge>)}
                                    </div>
                                </Line>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export function InsigniaCase({ items }: { items: InsigniaDossier[] }) {
    const t = useTranslations("Insignia");
    const [active, setActive] = useState<string | null>(null);
    // keeps the dossier filled while the dialog plays its close animation
    const [shown, setShown] = useState<string | null>(null);
    // the case badge stays hidden while its copy is in the air or in the dossier
    const [lifted, setLifted] = useState<string | null>(null);
    // the badge has landed in the dossier, which starts the line reveal
    const [landed, setLanded] = useState(false);
    const caseImages = useRef<Record<string, HTMLImageElement | null>>({});
    const dossierImage = useRef<HTMLImageElement | null>(null);
    const takeoff = useRef<{ from: DOMRect; src: string } | null>(null);
    const busy = useRef(false);
    const item = items.find((it) => it.id === (active ?? shown));

    const open = (id: string) => {
        const source = caseImages.current[id];
        if (busy.current || active || !source) return;
        setShown(id);
        setActive(id);
        setLanded(false);
        if (prefersReducedMotion()) {
            setLanded(true);
            return;
        }
        busy.current = true;
        takeoff.current = { from: source.getBoundingClientRect(), src: source.currentSrc || source.src };
        setLifted(id);
    };

    // the dossier image mounts inside the dialog portal, so measure it once it exists and fly there
    const attachDossierImage = useCallback((el: HTMLImageElement | null) => {
        dossierImage.current = el;
        const flight = takeoff.current;
        if (!el || !flight) return;
        takeoff.current = null;
        fly(flight.src, flight.from, el.getBoundingClientRect(), 720).then((copy) => {
            setLanded(true);
            requestAnimationFrame(() => copy.remove());
            busy.current = false;
        });
    }, []);

    const close = () => {
        if (busy.current || !active) return;
        const id = active, target = dossierImage.current, home = caseImages.current[id];
        setActive(null);
        setLanded(false);
        if (prefersReducedMotion() || !target || !home) {
            setLifted(null);
            return;
        }
        busy.current = true;
        fly(target.currentSrc || target.src, target.getBoundingClientRect(), home.getBoundingClientRect(), 560).then((copy) => {
            setLifted(null);
            requestAnimationFrame(() => copy.remove());
            busy.current = false;
        });
    };

    return (
        <>
            <Card className="grid grid-cols-3 overflow-visible gap-[clamp(.4rem,3vw,2.5rem)] bg-[radial-gradient(70%_90%_at_50%_100%,color-mix(in_oklab,var(--glow)_28%,transparent),transparent_70%)] px-[clamp(.6rem,3vw,2.2rem)] py-[clamp(1.2rem,3vw,2.2rem)]">
                {items.map((it) => (
                    <CardContent key={it.id} className="px-0">
                        <button
                            type="button"
                            aria-haspopup="dialog"
                            onClick={() => open(it.id)}
                            className="group/insig grid w-full min-w-0 cursor-pointer content-start justify-items-center gap-4 px-1 pt-2 pb-4 text-center outline-none"
                        >
                            <span className="relative isolate block aspect-square w-full max-w-[230px] group-focus-visible/insig:outline-2 group-focus-visible/insig:outline-offset-6 group-focus-visible/insig:outline-ring">
                                <span className="absolute inset-x-[12%] -bottom-[5%] -z-10 h-[12%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_40%,transparent),transparent_70%)]" />
                                <BadgeArt
                                    ref={(el) => { caseImages.current[it.id] = el; }}
                                    item={it}
                                    className={cn(
                                        "transition-[translate,rotate,scale,filter] duration-400 ease-[cubic-bezier(.2,.8,.2,1)]",
                                        "group-hover/insig:-translate-y-2 group-hover/insig:-rotate-3 group-hover/insig:scale-[1.04] group-hover/insig:drop-shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_50%,transparent)]",
                                        "group-focus-visible/insig:-translate-y-2 group-focus-visible/insig:-rotate-3 group-focus-visible/insig:scale-[1.04]",
                                        lifted === it.id && "invisible"
                                    )}
                                />
                            </span>
                            <span className="grid min-w-0 gap-1">
                                <span className="hud-meta text-[0.62rem]">{it.caption}</span>
                                <strong className="hud-title text-[clamp(1.3rem,3.5vw,2rem)] leading-none">{it.name}</strong>
                                <span className="font-mono text-[0.58rem] tracking-[0.08em] text-primary uppercase sm:text-[0.66rem] sm:tracking-[0.14em]">{it.unit}</span>
                            </span>
                            <Badge variant="outline" className="hidden text-muted-foreground transition-colors group-hover/insig:border-primary group-hover/insig:bg-primary group-hover/insig:text-primary-foreground sm:inline-flex">
                                {t("inspect")}
                            </Badge>
                        </button>
                    </CardContent>
                ))}
            </Card>

            <Dialog open={active !== null} onOpenChange={(o) => { if (!o) close(); }}>
                <DialogContent
                    showCloseButton={false}
                    data-reveal={landed || undefined}
                    className="hud-dossier block max-h-[calc(100dvh-2rem)] gap-0 overflow-hidden border-border-strong bg-popover p-0 shadow-[0_30px_80px_rgba(0,0,0,.6)] sm:max-w-240"
                >
                    {item && <Dossier item={item} landed={landed} imageRef={attachDossierImage} />}
                </DialogContent>
            </Dialog>
        </>
    );
}
