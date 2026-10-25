import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    id: string;
    eyebrow: string;
    title: string;
    meta?: string;
    className?: string;
    style?: React.CSSProperties;
    as?: "h1" | "h2";
}

export function SectionHeading({ id, eyebrow, title, meta, className, style, as: Heading = "h2" }: SectionHeadingProps) {
    return (
        <div className={cn("mb-8 grid items-end gap-5 md:grid-cols-[auto_minmax(0,1fr)_auto]", className)} style={style}>
            <div>
                <span className="mb-2.5 block hud-label">{eyebrow}</span>
                <Heading id={id} className="hud-title text-[clamp(2.6rem,7vw,4.4rem)] leading-[.85]">{title}</Heading>
            </div>
            <div className="relative mb-2 hidden h-px bg-border md:block" aria-hidden="true">
                <span className="absolute -top-[3px] right-0 h-[7px] w-15 bg-[repeating-linear-gradient(-45deg,var(--primary)_0_3px,transparent_3px_7px)]" />
            </div>
            {meta && <div className="mb-1 hud-meta whitespace-nowrap">{meta}</div>}
        </div>
    );
}
