"use client";

import { useEffect, useState } from "react";

// German local time, switching between CET and CEST with daylight saving
const berlin = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZoneName: "short",
});

function readClock() {
    const parts = berlin.formatToParts(new Date());
    const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "--";
    return { time: `${part("hour")}:${part("minute")}:${part("second")}`, zone: part("timeZoneName") };
}

export function Telemetry() {
    const [clock, setClock] = useState({ time: "--:--:--", zone: "CET" });

    useEffect(() => {
        const tick = () => setClock(readClock());
        tick();
        const t = window.setInterval(tick, 1000);
        return () => window.clearInterval(t);
    }, []);

    return (
        <div className="hidden flex-none font-mono text-xs tracking-widest text-muted-foreground tabular-nums lg:block" aria-label="Local time in Germany">
            <i className="mr-1.5 inline-block size-[7px] animate-blink bg-primary shadow-[0_0_8px_var(--primary)]" />
            {clock.zone} <b className="font-normal text-highlight">{clock.time}</b>
        </div>
    );
}
