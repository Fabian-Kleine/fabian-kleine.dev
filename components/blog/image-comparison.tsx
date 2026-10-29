"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageComparisonProps {
    before: string;
    after: string;
    beforeLabel?: string;
    afterLabel?: string;
    /** CSS aspect-ratio, both images are cropped to it */
    aspectRatio?: string;
    /** starting divider position in percent */
    initial?: number;
    width?: number;
    className?: string;
}

export default function ImageComparison({
    before,
    after,
    beforeLabel,
    afterLabel,
    aspectRatio = "16 / 9",
    initial = 50,
    width = 800,
    className,
}: ImageComparisonProps) {
    const [position, setPosition] = useState(initial);
    const [dragging, setDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const moveTo = (clientX: number) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const pct = ((clientX - rect.left) / rect.width) * 100;
        setPosition(Math.min(100, Math.max(0, pct)));
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        moveTo(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (dragging) moveTo(e.clientX);
    };

    const stopDragging = () => setDragging(false);

    const label = [beforeLabel, afterLabel].filter(Boolean).join(" / ") || "Image comparison";

    return (
        <div
            ref={containerRef}
            style={{ width: `${width}px`, aspectRatio }}
            className={cn(
                "group relative mx-auto my-4 max-w-full select-none overflow-hidden rounded-xl border touch-pan-y",
                dragging ? "cursor-grabbing" : "cursor-ew-resize",
                className,
            )}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
        >
            <img src={after} alt={afterLabel ?? ""} loading="lazy" draggable={false} className="absolute inset-0 size-full object-cover" />
            <img
                src={before}
                alt={beforeLabel ?? ""}
                loading="lazy"
                draggable={false}
                className="absolute inset-0 size-full object-cover"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            />

            {beforeLabel && (
                <ComparisonLabel className="left-3" hidden={position < 20}>{beforeLabel}</ComparisonLabel>
            )}
            {afterLabel && (
                <ComparisonLabel className="right-3" hidden={position > 80}>{afterLabel}</ComparisonLabel>
            )}

            <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-primary" style={{ left: `${position}%` }}>
                <div className="absolute top-1/2 left-1/2 flex h-10 w-6 -translate-1/2 items-center justify-center gap-1 rounded-sm border border-primary bg-background/80 backdrop-blur-sm transition-shadow group-has-focus-visible:ring-2 group-has-focus-visible:ring-ring">
                    <span className="h-4 w-px bg-primary" />
                    <span className="h-4 w-px bg-primary" />
                </div>
            </div>

            {/* keyboard and screen reader control */}
            <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(position)}
                onChange={(e) => setPosition(Number(e.target.value))}
                aria-label={label}
                className="sr-only"
            />
        </div>
    );
}

function ComparisonLabel({ children, className, hidden }: { children: React.ReactNode; className?: string; hidden: boolean }) {
    return (
        <span
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute bottom-3 border border-border bg-background/75 px-2.5 py-1 hud-label backdrop-blur-sm transition-opacity",
                hidden && "opacity-0",
                className,
            )}
        >
            {children}
        </span>
    );
}
