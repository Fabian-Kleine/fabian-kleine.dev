"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

// German local time, switching between CET and CEST (MEZ and MESZ in German) with daylight saving
const berlin = (locale: string) => new Intl.DateTimeFormat(locale, {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZoneName: "short",
});
const clocks = { en: berlin("en-GB"), de: berlin("de-DE") };

function readClock(locale: keyof typeof clocks) {
    const parts = clocks[locale].formatToParts(new Date());
    const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "--";
    return { time: `${part("hour")}:${part("minute")}:${part("second")}`, zone: part("timeZoneName") };
}

export function Telemetry() {
    const t = useTranslations("Nav");
    const locale = useLocale();
    const [clock, setClock] = useState({ time: "--:--:--", zone: locale === "de" ? "MEZ" : "CET" });

    useEffect(() => {
        const tick = () => setClock(readClock(locale));
        tick();
        const timer = window.setInterval(tick, 1000);
        return () => window.clearInterval(timer);
    }, [locale]);

    return (
        <div className="hidden flex-none font-mono text-xs tracking-widest text-muted-foreground tabular-nums lg:block" aria-label={t("localTime")}>
            <i className="mr-1.5 inline-block size-[7px] animate-blink bg-primary shadow-[0_0_8px_var(--primary)]" />
            {clock.zone} <b className="font-normal text-highlight">{clock.time}</b>
        </div>
    );
}
