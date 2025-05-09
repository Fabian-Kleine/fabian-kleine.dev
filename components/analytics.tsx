"use client"

import useCookie from "@/hooks/useCookie";
import { Analytics, BeforeSendEvent } from "@vercel/analytics/next";

export default function AnalyticsWrapper() {
    const [cookieConsent] = useCookie("cookie-consent", "false", 365);

    return <Analytics beforeSend={(event: BeforeSendEvent) => {
        const consent = cookieConsent === "true" || cookieConsent?.includes("analytics");
        if (!consent) {
            return null;
        }

        return event;
    }} />;
}