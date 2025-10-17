"use client";

import { IBM_Plex_Serif } from "next/font/google";

import { EmailChip } from "./email-chip";
import { ProjectCard } from "./project-card";
import { MoodBoard } from "./mood-board";

const ibmSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const PORTRAIT_SRC = "dog.png";

export function ProjectsGrid() {
  const projects = [
    {
      id: 1,
      title: "MY APPS",
      description: "THIS PROJECT IS LOCKED",
      locked: true,
    },
    {
      id: 2,
      title: "MY BLOG",
      description: "THIS PROJECT IS LOCKED",
      locked: true,
    },
    {
      id: 3,
      title: "SELLDAY • SHOPPING",
      description: "INSTANT TRANSACTION MAKER",
      locked: false,
      images: [
        "/mobile-shopping-app-mockup.jpg",
        "/mobile-app-interface.png",
        "/shopping-cart-mobile-screen.jpg",
      ],
    },
  ];

  const stickyNotes = [
    {
      id: 1,
      title: "MY MOOD",
      content:
        "Specialized in crafting digital product, mobile apps, and websites",
      position: "top-0 left-0 sm:top-4 sm:left-4",
    },
    {
      id: 2,
      title: "EXPERIENCE",
      content:
        "Crafted an outstanding digital product experiences in last 4 years",
      position: "bottom-0 right-0 sm:bottom-4 sm:right-4",
    },
  ];

  return (
    <div className="relative border border-border/30 rounded-lg p-6 sm:p-8 mb-16 bg-card/5 overflow-hidden">
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center px-6 py-3 rounded-lg border border-border bg-card/70 backdrop-blur-sm shadow-sm">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif italic text-foreground">
              huyixi&apos;s Board
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:hidden">
          <div className="flex justify-center">
            <div className="relative inline-flex w-full max-w-sm justify-center drop-shadow-2xl">
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40"
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  src={PORTRAIT_SRC}
                  alt="huyixi portrait"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full border-4 border-background bg-card flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <EmailChip />
          </div>

          <div className="relative min-h-[360px] w-full">
            {stickyNotes.map((note) => (
              <div
                key={note.id}
                className={`absolute ${note.position} z-10 max-w-[260px] rounded-2xl border border-white/10 bg-neutral-950/90 px-6 py-6 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-lg`}
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02]" />
                <div className="relative space-y-3">
                  <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/60">
                    {note.title}
                  </p>
                  <p
                    className={`${ibmSerif.className} text-sm leading-relaxed text-white/90`}
                  >
                    {note.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                className="max-w-full"
              />
            ))}
          </div>
        </div>

        <div className="relative hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[700px]">
          {/* Top-left: My Apps */}
          <div className="flex items-start">
            <ProjectCard {...projects[0]} />
          </div>

          {/* Top-right: Draggable mood board */}
          <div className="flex items-start justify-end">
            <MoodBoard />
          </div>

          {/* Center: Profile photo positioned absolutely */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative inline-flex w-[24rem] max-w-lg justify-center drop-shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div
                className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40"
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  src={PORTRAIT_SRC}
                  alt="huyixi portrait"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full border-4 border-background bg-card flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Bottom-left: My Blog */}
          <div className="flex items-end">
            <ProjectCard {...projects[1]} />
          </div>

          {/* Bottom-right: Shopping app with carousel */}
          <div className="flex items-end justify-end">
            <ProjectCard {...projects[2]} />
          </div>
        </div>
      </div>
    </div>
  );
}
