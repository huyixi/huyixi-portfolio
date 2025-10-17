"use client"

import { Button } from "@/components/ui/button"

const experiences = [
  {
    company: "HUB.XYZ",
    role: "PRODUCT & BRAND DESIGNER",
    period: "24 - O",
  },
  {
    company: "ITSAVIRUS",
    role: "PRODUCT DESIGNER",
    period: "22 - 24",
  },
  {
    company: "BOXYLABS",
    role: "PRODUCT & NFT DESIGNER",
    period: "21 - 22",
  },
]

export function ExperienceTimeline() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2 className="text-sm font-bold tracking-wider text-foreground">EXPERIENCES</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          DOWNLOAD CV
        </Button>
      </div>

      {/* Experience List */}
      <div className="space-y-0">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="group border-b border-border py-6 hover:bg-muted/5 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-bold tracking-wide text-foreground group-hover:text-primary transition-colors">
                  {exp.company}
                </h3>
                <p className="text-xs text-muted-foreground tracking-wide">{exp.role}</p>
              </div>
              <span className="text-xs text-muted-foreground tracking-wider">{exp.period}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
