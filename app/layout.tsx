import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "next-themes";
import ThemeParticles from "@/components/magicui/theme-particles";
import CookieDialog from "@/components/ui/cookie-dialog";
import { Analytics } from "@vercel/analytics/next";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();
  const cookieConsent = cookieStore.get("cookie-consent")?.value;
  const allowAnalytics = cookieConsent === "true" || cookieConsent?.includes("analytics");

  return (
    <html lang="en" suppressHydrationWarning>
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
            <CookieDialog />
            <Footer />
          </ThemeProvider>
          {allowAnalytics && <Analytics />}
      </body>
    </html>
  );
}
