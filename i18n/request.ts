import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, locales, type Locale } from "./config";

/** first supported language from the Accept-Language header, used until a cookie is set */
function fromAcceptLanguage(header: string | null): Locale | undefined {
    return header
        ?.split(",")
        .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
        .find((lang): lang is Locale => locales.includes(lang as Locale));
}

export default getRequestConfig(async () => {
    const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
    const locale = isLocale(cookieLocale)
        ? cookieLocale
        : fromAcceptLanguage((await headers()).get("accept-language")) ?? defaultLocale;

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});
