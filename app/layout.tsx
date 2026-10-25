import type { Metadata } from "next";
import { Barlow, Saira_Extra_Condensed, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AnalyticsWrapper from "@/components/analytics";
import { HudBackground } from "@/components/hud/hud-background";
import { BootLine, BootSequence } from "@/components/hud/boot-sequence";
import { bootScript } from "@/lib/hud";
import { getAllTech } from "@/lib/projects";
import { config } from "@/config";
import { cn } from "@/lib/utils";

const sairaHeading = Saira_Extra_Condensed({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--font-heading' });

const barlow = Barlow({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans' });

const shareTechMono = Share_Tech_Mono({ subsets: ['latin'], weight: '400', variable: '--font-mono' });

export const metadata: Metadata = {
  title: "Fabian Kleine | Portfolio",
  description: "This is my portfolio page where you can find out more about me and my projects.",
};

const bootLines: BootLine[] = [
  { text: "KLEINE-OS // TACTICAL BUILD", kind: "hd" },
  { text: `(C) ${new Date().getFullYear()} FABIAN KLEINE // FIELD EDITION`, kind: "dim" },
  { text: "MEMORY CHECK", status: "65536K OK" },
  { text: "MOUNT /dev/portfolio", status: "[OK]" },
  { text: "LOAD MODULE stack", status: `[${getAllTech().length} ITEMS]` },
  { text: "LOAD MODULE insignia", status: `[${config.insignia.length} AWARDED]` },
  { text: "LOAD MODULE operations", status: `[${config.projects.projectsSlugs.length} FILES]` },
  { text: "LOAD MODULE render.hud", status: "[OK]" },
  { text: "LOAD MODULE signal.suppressor", kind: "warn", status: "UNSTABLE" },
  { text: "SYNC SATELLITE UPLINK", status: "LOCKED" },
  { text: "VERIFY OPERATOR BIOMETRICS", status: "MATCH" },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("dark font-sans", barlow.variable, sairaHeading.variable, shareTechMono.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        <HudBackground />
        <Navbar />
        <main className="relative z-1 min-h-screen">
          {children}
        </main>
        <Footer />
        <BootSequence lines={bootLines} />
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
