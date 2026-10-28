"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/config";
import { setConsent, useConsent } from "@/lib/consent";

/** asks once whether externally hosted project videos may be loaded */
export function ConsentBanner() {
    const t = useTranslations("Consent");
    const consent = useConsent();

    if (!config.cookies.cookieConsent || consent !== null) return null;

    return (
        <Card
            data-hud-chrome="consent"
            role="region"
            aria-labelledby="consentTitle"
            size="sm"
            className="fixed inset-x-4 bottom-4 z-100 bg-background/95 shadow-2xl sm:left-auto sm:max-w-md"
        >
            <CardHeader>
                <CardDescription className="text-primary">{t("eyebrow")}</CardDescription>
                <CardTitle id="consentTitle">{t("title")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-muted-foreground">
                <p>{t("description")}</p>
                <p>
                    {t.rich("details", {
                        link: (chunks) => <Link href="/legal/privacy-policy#external-media" className="text-primary underline">{chunks}</Link>,
                    })}
                </p>
            </CardContent>
            <CardFooter className="flex-wrap gap-2">
                <Button size="sm" onClick={() => setConsent("granted")}>{t("allow")}</Button>
                <Button size="sm" variant="outline" onClick={() => setConsent("denied")}>{t("deny")}</Button>
            </CardFooter>
        </Card>
    );
}

/** reopens the banner so the visitor can change or withdraw their decision */
export function ConsentSettingsButton({ className }: { className?: string }) {
    const t = useTranslations("Consent");

    if (!config.cookies.cookieConsent) return null;

    return (
        <Button variant="ghost" size="xs" className={className} onClick={() => setConsent(null)}>
            {t("settings")}
        </Button>
    );
}
