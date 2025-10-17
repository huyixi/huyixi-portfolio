"use client"

import { useState } from "react"
import { Lock, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

interface ProjectCardProps {
  title: string
  description: string
  locked: boolean
  images?: string[]
  className?: string
}

export function ProjectCard({ title, description, locked, images, className }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const { dictionary, language } = useLanguage()

  const nextImage = () => {
    if (images) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (images) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  return (
    <div
      className={cn("w-full max-w-[280px]", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className="relative overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-colors duration-300 hover:bg-card/70 group">
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <span
              className={cn(
                "text-[10px] text-muted-foreground font-mono",
                language === "zh" ? "tracking-normal" : "uppercase tracking-wider",
              )}
            >
              {dictionary.projectCard.label}
            </span>
          </div>

        {locked ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 rounded-full border-2 border-border flex items-center justify-center mb-6 group-hover:border-muted-foreground transition-colors">
              <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        ) : (
          <div className="mb-6 relative group/carousel">
            <div className="flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={images?.[currentImageIndex] || "/placeholder.svg"}
                alt={title}
                className="w-full max-w-[200px] h-auto object-contain transition-all duration-300"
              />
            </div>

            {images && images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-background"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-background"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Carousel dots */}
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-foreground w-4" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

          <motion.div
            className="relative overflow-hidden rounded-lg border border-border/60 bg-background/40"
            animate={hovered ? { boxShadow: "0px 6px 18px rgba(0,0,0,0.18)" } : { boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute inset-0 rounded-lg bg-primary/5"
              animate={hovered ? { opacity: 0.12 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative">
              <motion.h3
                className={cn(
                  "px-3 pt-3 text-xs font-mono text-foreground transition-transform origin-left",
                  language === "zh" ? "tracking-normal" : "uppercase tracking-wider",
                )}
                animate={hovered ? { scale: 0.94, rotate: -1.5, y: 4 } : { scale: 1, rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
              >
                {title}
              </motion.h3>
              <motion.div
                className="px-3 pb-3"
                animate={hovered ? { y: 24, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 0.22 }}
              >
                <p
                  className={cn(
                    "text-[10px] text-muted-foreground",
                    language === "zh" ? "tracking-normal" : "uppercase tracking-wider",
                  )}
                >
                  {description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Card>
    </div>
  )
}
