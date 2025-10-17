"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

type Viewport = "small" | "medium" | "large";

const getViewportCategory = (width: number): Viewport => {
  if (width < 660) return "small";
  if (width < 1024) return "medium";
  return "large";
};

export function Header() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [viewport, setViewport] = useState<Viewport>(() => {
    if (typeof window === "undefined") return "large";
    return getViewportCategory(window.innerWidth);
  });
  const { t, dictionary, language } = useLanguage();

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const hangzhouTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Shanghai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setTime(hangzhouTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "b" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        // Check if user is not typing in an input field
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          window.open("https://cal.com/huyixi", "_blank");
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      setViewport(getViewportCategory(window.innerWidth));
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const renderHeader = (timeLabel: string, currentViewport: Viewport) => {
    const availabilityBadge = (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur-sm">
        <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center overflow-hidden rounded-full">
          <motion.span
            className="absolute h-full w-full rounded-full bg-emerald-300/45"
            animate={{ scale: [0.55, 9], opacity: [0.65, 0] }}
            transition={{
              duration: 2.4,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 0.6,
            }}
          />
          <motion.span
            className="absolute h-full w-full rounded-full bg-emerald-400/50"
            animate={{ scale: [0.75, 9], opacity: [0.8, 0] }}
            transition={{
              duration: 1.9,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 0.8,
            }}
          />
          <motion.span
            className="relative h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.65)]"
            animate={{ scale: [1, 1.08, 2] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </span>
        <span
          className={cn(
            "text-xs text-muted-foreground font-mono",
            language === "zh" ? "tracking-normal" : "tracking-wider",
          )}
        >
          {dictionary.header.unavailable}
        </span>
      </div>
    );

    if (currentViewport === "small") {
      return (
        <header className="mb-4">
          <div className="flex justify-center">{availabilityBadge}</div>
        </header>
      );
    }

    if (currentViewport === "medium") {
      return (
        <header className="mb-4">
          <div className="flex flex-col items-center gap-3">
            <div className="text-sm text-muted-foreground font-mono">
              {t("header.location", { time: timeLabel })}
            </div>
            {availabilityBadge}
          </div>
        </header>
      );
    }

    return (
      <header className="mb-4">
        <div className="flex items-center justify-between gap-6">
          <div className="text-sm text-muted-foreground font-mono">
            {t("header.location", { time: timeLabel })}
          </div>
          {availabilityBadge}
          <div
            className={cn(
              "text-xs text-muted-foreground font-mono",
              language === "zh" ? "tracking-normal" : "",
            )}
          >
            {dictionary.header.shortcut.beforeKey}
            <kbd className="px-2 py-1 bg-muted rounded text-foreground">B</kbd>
            {dictionary.header.shortcut.afterKey}
          </div>
        </div>
      </header>
    );
  };

  if (!mounted) {
    return renderHeader("00:00:00 AM", viewport);
  }

  return renderHeader(time, viewport);
}
