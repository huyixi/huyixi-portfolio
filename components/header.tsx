"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

export function Header() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
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

  const renderHeader = (timeLabel: string) => {
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

    return (
      <header className="mb-4 space-y-6 md:space-y-0">
        <div className="flex justify-center md:hidden">{availabilityBadge}</div>
        <div className="hidden items-center justify-between md:flex">
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
    return renderHeader("00:00:00 AM");
  }

  return renderHeader(time);
}
