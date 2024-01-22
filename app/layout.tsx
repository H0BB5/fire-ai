import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
const inter = Inter({ subsets: ["latin"], preload: true });

export const metadata: Metadata = {
  metadataBase: new URL("https://alexandersafety.com/"),
  title: "Fire Tag AI",
  description: "Fire Tag Tracking System",
  appleWebApp: true,
  openGraph: {
    title: "Alexander Safety",
    description: "Fire Tag Tracking System",
    url: "https://alexandersafety.com/",
    siteName: "Alexander Safety | Fire AI",
    images: [
      {
        url: "https://nextjs.org/og.png", // alexander-safety-logo-light.svg
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "Alexander Safety Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexander Safety | Fire AI",
    description: "Fire Tag Tracking System",
    images: "https://nextjs.org/og-alt.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn("bg-background bg-[url('/grid.svg')]", inter.className)}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
