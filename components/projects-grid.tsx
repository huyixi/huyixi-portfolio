"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { ibmPlexSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { EmailChip } from "./email-chip";
import { ProjectCard } from "./project-card";
import { MoodBoard } from "./mood-board";

const PORTRAIT_SRC = "/dog.png";

export function ProjectsGrid() {
  const { dictionary, language } = useLanguage();

  const projects = [
    {
      id: 1,
      title: dictionary.projectsGrid.projects.apps.title,
      description: dictionary.projectsGrid.projects.apps.description,
      locked: true,
    },
    {
      id: 2,
      title: dictionary.projectsGrid.projects.blog.title,
      description: dictionary.projectsGrid.projects.blog.description,
      locked: true,
    },
    {
      id: 3,
      title: dictionary.projectsGrid.projects.sellday.title,
      description: dictionary.projectsGrid.projects.sellday.description,
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
      title: dictionary.projectsGrid.stickyNotes.mood.title,
      content: dictionary.projectsGrid.stickyNotes.mood.content,
      position: "top-0 left-0 sm:top-4 sm:left-4",
      desktopPosition: "top-0 left-0",
    },
    {
      id: 2,
      title: dictionary.projectsGrid.stickyNotes.experience.title,
      content: dictionary.projectsGrid.stickyNotes.experience.content,
      position: "bottom-0 right-0 sm:bottom-4 sm:right-4",
      desktopPosition: "bottom-6 right-0",
    },
  ];

  const moodBoardNotes = stickyNotes.map(
    ({ id, title, content, desktopPosition }) => ({
      id,
      title,
      content,
      desktopPosition,
    }),
  );

  return (
    <div className="relative border border-border/30 rounded-lg p-6 sm:p-8 mb-16 bg-card/5 overflow-hidden md:mb-0 md:h-full md:min-h-0">
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

      <div className="relative z-10 flex flex-col gap-8 md:h-full md:min-h-0">
        <div className="flex justify-center md:hidden">
          <div className="inline-flex items-center px-6 py-3 rounded-lg bg-card/70 backdrop-blur-sm shadow-sm">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif italic text-foreground">
              {dictionary.projectsGrid.boardTitle}
            </h1>
          </div>
        </div>
        <div className="hidden md:block absolute inset-x-0 top-0 bottom-0 z-30 pointer-events-none">
          <div className="sticky top-6 flex justify-center">
            <div className="inline-flex items-center px-8 py-4 rounded-lg bg-card/70 backdrop-blur-sm shadow-sm pointer-events-auto">
              <h1 className="text-3xl font-serif italic text-foreground">
                {dictionary.projectsGrid.boardTitle}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:hidden">
          <div className="flex justify-center">
            <div className="relative inline-flex w-full max-w-sm justify-center drop-shadow-2xl">
              <div
                className="relative w-full overflow-hidden rounded-2xl bg-black/40"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Image
                  src={PORTRAIT_SRC}
                  alt="huyixi portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 22rem"
                  className="object-cover"
                  priority
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
                  <p
                    className={cn(
                      "text-[11px] font-mono text-white/60",
                      language === "zh"
                        ? "tracking-normal"
                        : "uppercase tracking-[0.35em]",
                    )}
                  >
                    {note.title}
                  </p>
                  <p
                    className={`${ibmPlexSerif.className} text-sm leading-relaxed text-white/90`}
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

        <div className="relative hidden md:grid md:h-full md:min-h-0 md:flex-1 md:grid-cols-12 md:gap-10 md:auto-rows-min">
          <div className="md:col-span-4 flex items-start">
            <ProjectCard
              {...projects[0]}
              className="w-full max-w-none"
            />
          </div>
          <div className="md:col-span-4 md:col-start-9 flex items-start justify-end">
            <MoodBoard
              stickyNotes={moodBoardNotes}
              serifClassName={ibmPlexSerif.className}
            />
          </div>
          <div className="md:col-span-4 md:row-start-2 flex items-end">
            <ProjectCard
              {...projects[1]}
              className="w-full max-w-none"
            />
          </div>
          <div className="md:col-span-4 md:col-start-9 md:row-start-2 flex items-end justify-end">
            <ProjectCard
              {...projects[2]}
              className="w-full max-w-none"
            />
          </div>
          <div className="md:col-span-4 md:col-start-5 md:row-span-2 flex items-center justify-center">
            <div className="relative inline-flex w-[22rem] max-w-full justify-center drop-shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div
                className="relative w-full overflow-hidden rounded-3xl bg-black/40"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Image
                  src={PORTRAIT_SRC}
                  alt="huyixi portrait"
                  fill
                  sizes="(min-width: 768px) 22rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full border-4 border-background bg-card flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
