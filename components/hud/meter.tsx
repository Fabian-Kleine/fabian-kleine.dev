"use client";

import { useRef, useState } from "react";
import { useInView } from "motion/react";
import { Progress } from "@/components/ui/progress";
import { useOnDeploy } from "@/hooks/use-on-deploy";

/** segmented progress bar that fills once it is deployed and scrolled into view */
export function Meter({ value, className }: { value: number; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [deployed, setDeployed] = useState(false);

    useOnDeploy(() => {
        setDeployed(false);
        const t = window.setTimeout(() => setDeployed(true), 350);
        return () => window.clearTimeout(t);
    });

    return (
        <div ref={ref}>
            <Progress value={inView && deployed ? value : 0} segmented className={className} />
        </div>
    );
}
