"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/i18n/config";
import { setLocale } from "@/i18n/actions";

export function LocaleSwitcher({ className }: { className?: string }) {
    const t = useTranslations("LocaleSwitcher");
    const active = useLocale();
    const [pending, startTransition] = useTransition();

    // setting the cookie in a server action re-renders the current route in the new language
    const select = (locale: Locale) => {
        if (locale === active) return;
        startTransition(() => setLocale(locale));
    };

    return (
        <div
            role="group"
            aria-label={t("label")}
            className={cn("flex flex-none items-center border font-mono text-xs tracking-widest", pending && "opacity-60", className)}
        >
            {locales.map((locale) => (
                <button
                    key={locale}
                    type="button"
                    lang={locale}
                    title={t(locale)}
                    aria-pressed={locale === active}
                    disabled={pending}
                    onClick={() => select(locale)}
                    className={cn(
                        "px-2 py-1 uppercase transition-colors",
                        locale === active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-highlight"
                    )}
                >
                    {locale}
                </button>
            ))}
        </div>
    );
}
