import { cn } from "@/lib/utils";

interface MediaFrameProps {
    children: React.ReactNode;
    /** numbered as "FIG. 01 // caption" inside a debrief */
    caption?: React.ReactNode;
    /** right side of the caption strip */
    meta?: React.ReactNode;
    width?: number;
    className?: string;
}

// spans only, markdown images end up inside a <p>
export function MediaFrame({ children, caption, meta, width, className }: MediaFrameProps) {
    return (
        <span
            data-slot="media-frame"
            style={width ? { width: `${width}px` } : undefined}
            className={cn("relative mx-auto my-6 block w-fit max-w-full border border-border bg-card backdrop-blur-sm", className)}
        >
            <span className="relative block overflow-hidden">{children}</span>
            {(caption || meta) && (
                <span className="flex items-center justify-between gap-4 border-t px-3 py-2 hud-meta text-[0.62rem]">
                    <span className="media-caption min-w-0 truncate">{caption}</span>
                    {meta && <span className="shrink-0 tabular-nums">{meta}</span>}
                </span>
            )}
        </span>
    );
}
