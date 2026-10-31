import { cn } from "@/lib/utils";
import { EUROPE, GERMANY, GRATICULE, HOME } from "./europe-map-data";

type Props = {
    label: string;
    className?: string;
};

// framed on Germany; the rest of Europe spills past the viewBox and fades out through the mask
const VIEW = "150 50 340 300";

/** Europe centred on Germany, with a ping on the operator's home base. Drawn in currentColor for use as a backdrop */
export function EuropeMap({ label, className }: Props) {
    return (
        <svg
            viewBox={VIEW}
            role="img"
            aria-label={label}
            className={cn("block mask-[radial-gradient(ellipse_at_center,#000_35%,transparent_72%)]", className)}
        >
            <path d={GRATICULE} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.5} />
            <path d={EUROPE} fill="currentColor" fillOpacity={0.06} stroke="currentColor" strokeOpacity={0.25} strokeWidth={0.5} strokeLinejoin="round" />
            <path d={GERMANY} fill="currentColor" fillOpacity={0.14} stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.2} strokeLinejoin="round" />
            <g transform={`translate(${HOME.x} ${HOME.y})`}>
                <circle r={4} className="origin-center [transform-box:fill-box] motion-safe:animate-ping" fill="none" stroke="currentColor" strokeWidth={1.5} />
                <circle r={9} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={0.75} strokeDasharray="2 2" />
                <circle r={2.5} fill="currentColor" />
            </g>
        </svg>
    );
}
