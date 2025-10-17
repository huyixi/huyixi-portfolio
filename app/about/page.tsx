import type { Metadata } from "next";

import { Header } from "@/components/header";
import { AboutHero } from "@/components/about-hero";
import { EmailChip } from "@/components/email-chip";
import { ExperienceTimeline } from "@/components/experience-timeline";

export const metadata: Metadata = {
  title: "About | huyixi portfolio",
  description:
    "Learn more about huyixi's background, design philosophy, and professional experience as a digital product designer.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background grid-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header />
        <div className="mt-20 space-y-16">
          <AboutHero />
          <ExperienceTimeline />
          <div className="flex justify-center">
            <EmailChip />
          </div>
        </div>
      </div>
    </main>
  );
}
