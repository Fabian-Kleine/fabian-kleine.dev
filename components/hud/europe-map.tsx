import { cn } from "@/lib/utils";
import { EUROPE, GERMANY, GRATICULE, HOME, MAP } from "./europe-map-data";

type Props = {
    label: string;
    title: string;
    location: string;
    coords: string;
    className?: string;
};

/** Europe centred on Germany, with a ping on the operator's home base */
export function EuropeMap({ label, title, location, coords, className }: Props) {
    return (
        <div className={cn("relative overflow-hidden border bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--glow)_25%,transparent),transparent_70%)]", className)}>
            <svg
                viewBox={`0 0 ${MAP.width} ${MAP.height}`}
                role="img"
                aria-label={label}
                className="block h-auto w-full [mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_100%)]"
            >
                <path d={GRATICULE} fill="none" className="stroke-primary/15" strokeWidth={0.5} />
                <path d={EUROPE} className="fill-muted/60 stroke-border-strong" strokeWidth={0.5} strokeLinejoin="round" />
                <path d={GERMANY} className="fill-primary/25 stroke-primary" strokeWidth={1.2} strokeLinejoin="round" />
                <g transform={`translate(${HOME.x} ${HOME.y})`} className="text-highlight">
                    <circle r={4} className="origin-center fill-none stroke-current [transform-box:fill-box] motion-safe:animate-ping" strokeWidth={1.5} />
                    <circle r={9} className="fill-none stroke-primary/70" strokeWidth={0.75} strokeDasharray="2 2" />
                    <circle r={2.5} className="fill-current" />
                </g>
            </svg>
            <div className="pointer-events-none absolute inset-x-3 top-2 flex justify-between gap-4 hud-meta text-[0.62rem]">
                <span>{title}</span>
                <span>{coords}</span>
            </div>
            <div className="pointer-events-none absolute bottom-2 left-3 flex items-center gap-1.5 hud-meta text-[0.62rem] text-highlight">
                <span aria-hidden="true" className="inline-block size-1.5 bg-highlight" />
                {location}
            </div>
        </div>
    );
}
