"use client";

import type React from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

type StickyNote = {
  id: number;
  title: string;
  content: string;
  desktopPosition?: string;
};

interface MoodBoardProps {
  stickyNotes: StickyNote[];
  serifClassName?: string;
}

export function MoodBoard({ stickyNotes, serifClassName }: MoodBoardProps) {
  const { language } = useLanguage();
  
  return (
    <div className="relative flex items-start justify-center md:justify-end">
      <div className="relative h-[18rem] w-[22rem] md:w-[24rem] max-w-full select-none">
        {stickyNotes.map((note, index) => {
          const isRight =
            note.desktopPosition?.includes("right") ??
            index === 1;

          return (
            <motion.div
            key={note.id}
            className={cn(
              "absolute max-w-[260px] rounded-2xl border border-white/10 bg-neutral-950/90 px-6 py-6 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-lg",
              note.desktopPosition ??
                (index === 0 ? "top-0 left-0" : "bottom-6 right-0"),
            )}
            whileHover={{
              scale: 1.05,
              rotate: isRight ? 4 : -4,
              x: isRight ? 10 : -10,
              y: 8,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
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
                className={cn(
                  serifClassName,
                  "text-sm leading-relaxed text-white/90",
                )}
              >
                {note.content}
              </p>
            </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
