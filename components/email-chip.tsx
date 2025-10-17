"use client";

import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EMAIL = "CONNECT@HALODHIMAS.COM";

interface EmailChipProps {
  className?: string;
}

export function EmailChip({ className }: EmailChipProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL.toLowerCase());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy email", error);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm",
        className,
      )}
    >
      <Mail className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm font-mono text-muted-foreground text-center">{EMAIL}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md hover:bg-muted"
        onClick={copyEmail}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}
