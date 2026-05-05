import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "next-themes";
import ThemeParticles from "@/components/magicui/theme-particles";
import AnalyticsWrapper from "@/components/analytics";
import { cn } from "@/lib/utils";

const ibmPlexSansHeading = IBM_Plex_Sans({subsets:['latin'],variable:'--font-heading'});

const raleway = Raleway({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fabian Kleine | Portfolio",
  description: "This is my portfolio page where you can find out more about me and my projects.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", raleway.variable, ibmPlexSansHeading.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <main className="relative min-h-screen overflow-clip">
            <ThemeParticles />
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
