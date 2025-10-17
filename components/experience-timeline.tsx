"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

export function ExperienceTimeline() {
  const { dictionary, language } = useLanguage();
  const experiences = dictionary.experienceTimeline.items;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2
          className={cn(
            "text-sm font-bold text-foreground",
            language === "zh" ? "tracking-normal" : "tracking-wider",
          )}
        >
          {dictionary.experienceTimeline.heading}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {dictionary.experienceTimeline.download}
        </Button>
      </div>

      <div className="space-y-0">
        {experiences.map((exp, index) => (
          <div
            key={`${exp.company}-${index}`}
            className="group border-b border-border py-6 hover:bg-muted/5 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3
                  className={cn(
                    "text-base font-bold text-foreground group-hover:text-primary transition-colors",
                    language === "zh" ? "tracking-normal" : "tracking-wide",
                  )}
                >
                  {exp.company}
                </h3>
                <p
                  className={cn(
                    "text-xs text-muted-foreground",
                    language === "zh" ? "tracking-normal" : "tracking-wide",
                  )}
                >
                  {exp.role}
                </p>
              </div>
              <span className="text-xs text-muted-foreground tracking-wider">
                {exp.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
