import type { Metadata } from "next";
import { Barlow, Saira_Extra_Condensed, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AnalyticsWrapper from "@/components/analytics";
import { ConsentBanner } from "@/components/consent-banner";
import { HudBackground } from "@/components/hud/hud-background";
import { BootLine, BootSequence } from "@/components/hud/boot-sequence";
import { RevealOnView } from "@/components/hud/reveal-on-view";
import { bootScript } from "@/lib/hud";
import { getAllTech } from "@/lib/projects";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

const sairaHeading = Saira_Extra_Condensed({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--font-heading' });

const barlow = Barlow({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans' });

const shareTechMono = Share_Tech_Mono({ subsets: ['latin'], weight: '400', variable: '--font-mono' });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const t = await getTranslations("Boot");
  const bootLines: BootLine[] = [
    { text: t("build"), kind: "hd" },
    { text: t("copyright", { year: new Date().getFullYear() }), kind: "dim" },
    { text: t("memoryCheck"), status: "65536K OK" },
    { text: t("mount"), status: "[OK]" },
    { text: t("loadModule", { name: "stack" }), status: t("items", { count: getAllTech().length }) },
    { text: t("loadModule", { name: "insignia" }), status: t("awarded", { count: config.insignia.length }) },
    { text: t("loadModule", { name: "operations" }), status: t("files", { count: config.projects.projectsSlugs.length }) },
    { text: t("loadModule", { name: "render.hud" }), status: "[OK]" },
    { text: t("loadModule", { name: "signal.suppressor" }), kind: "warn", status: t("unstable") },
    { text: t("uplink"), status: t("locked") },
    { text: t("biometrics"), status: t("match") },
  ];

  return (
    <html lang={locale} suppressHydrationWarning className={cn("dark font-sans", barlow.variable, sairaHeading.variable, shareTechMono.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        <NextIntlClientProvider>
          <HudBackground />
          <Navbar />
          <main className="relative z-1 min-h-screen">
            {children}
          </main>
          <Footer />
          <ConsentBanner />
          <BootSequence lines={bootLines} />
          <RevealOnView />
        </NextIntlClientProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
