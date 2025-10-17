import type { Metadata } from "next";

import { Header } from "@/components/header";
import { ProjectsGrid } from "@/components/projects-grid";

export const metadata: Metadata = {
  title: "Home | huyixi portfolio",
  description:
    "Explore huyixi's latest product design explorations, mood boards, and featured case study work.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background grid-background md:h-dvh md:overflow-hidden">
      <div className="container mx-auto px-4 py-6 max-w-7xl flex flex-col md:h-full">
        <div className="shrink-0">
          <Header />
        </div>
        <div className="md:flex-1 md:min-h-0">
          <ProjectsGrid />
        </div>
      </div>
    </main>
  );
}
