"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

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
        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          UNAVAILABLE FOR ANY COLLABORATION
        </span>
      </div>
    );

    return (
      <header className="mb-4 space-y-6 md:space-y-0">
        <div className="flex justify-center md:hidden">{availabilityBadge}</div>
        <div className="hidden items-center justify-between md:flex">
          <div className="text-sm text-muted-foreground font-mono">
            HANGZHOU, CN • {timeLabel}
          </div>
          {availabilityBadge}
          <div className="text-xs text-muted-foreground font-mono">
            PRESS{" "}
            <kbd className="px-2 py-1 bg-muted rounded text-foreground">B</kbd>{" "}
            TO BOOK A CALL
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
