import { Header } from "@/components/header";
import { AboutHero } from "@/components/about-hero";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { SocialLinks } from "@/components/social-links";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background grid-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header />
        <div className="mt-20 space-y-16">
          <AboutHero />
          <ExperienceTimeline />
        </div>
      </div>
    </main>
  );
}
