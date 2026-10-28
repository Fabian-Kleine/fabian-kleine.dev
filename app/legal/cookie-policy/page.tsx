import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import En from "./en.mdx";
import De from "./de.mdx";

const content = { en: En, de: De };

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("Legal");
    return { title: t("metaTitle", { title: t("cookiePolicy") }) };
}

export default async function CookiePolicy() {
    const Content = content[await getLocale()];
    return <Content />;
}
