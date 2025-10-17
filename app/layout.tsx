import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Dock } from "@/components/dock";
import { LanguageProvider } from "@/components/language-provider";
import { geistMono, geistSans, playfair } from "@/lib/fonts";
import "./globals.css";

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
        className={`font-mono ${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
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
