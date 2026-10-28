import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { TypographyH1, TypographyLink, TypographyList } from "@/components/blog/typography";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("Legal");
    return { title: t("metaTitle", { title: t("title") }) };
}

export default async function LegalPage() {
    const t = await getTranslations("Legal");

    return (
        <>
            <TypographyH1>{t("title")}</TypographyH1>
            <TypographyList>
                <li><TypographyLink target="_self" href="/legal/imprint">{t("imprint")}</TypographyLink></li>
                <li><TypographyLink target="_self" href="/legal/privacy-policy">{t("privacyPolicy")}</TypographyLink></li>
                <li><TypographyLink target="_self" href="/legal/cookie-policy">{t("cookiePolicy")}</TypographyLink></li>
            </TypographyList>
        </>
    );
}
