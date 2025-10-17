import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Dock } from "@/components/dock";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "huyixi's Board - Product Designer Portfolio",
  description: "Specialized in crafting digital product experiences",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`font-mono ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}
      >
        <LanguageProvider>
          <div>{children}</div>
          <Dock />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
