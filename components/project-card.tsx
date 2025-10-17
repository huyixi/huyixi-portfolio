"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { motion } from "motion/react";

import { useLanguage } from "@/components/language-provider";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  locked: boolean;
  images?: string[];
  className?: string;
}

const FALLBACK_IMAGE = "/placeholder.svg";
const CAROUSEL_IMAGE_WIDTH = 320;
const CAROUSEL_IMAGE_HEIGHT = 240;

export function ProjectCard({
  title,
  description,
  locked,
  images,
  className,
}: ProjectCardProps) {
  const { dictionary, language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const imageSources = images ?? [];
  const hasMultipleImages = imageSources.length > 1;
  const activeImage = imageSources[currentImageIndex] ?? FALLBACK_IMAGE;

  const handleNextImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex((prev) => (prev + 1) % imageSources.length);
  };

  const handlePrevImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + imageSources.length) % imageSources.length,
    );
  };

  return (
    <div
      className={cn("w-full max-w-[280px]", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className="group relative overflow-hidden border-border bg-card/50 transition-colors duration-300 hover:bg-card/70">
        <div className="p-5">
          <div className="mb-6 flex items-center justify-between">
            <span
              className={cn(
                "text-[10px] font-mono text-muted-foreground",
                language === "zh"
                  ? "tracking-normal"
                  : "uppercase tracking-wider",
              )}
            >
              {dictionary.projectCard.label}
            </span>
          </div>

          {locked ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-border transition-colors group-hover:border-muted-foreground">
                <Lock className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
          ) : (
            <div className="group/carousel relative mb-6">
              <div className="flex items-center justify-center overflow-hidden rounded-lg">
                <Image
                  src={activeImage}
                  alt={title}
                  width={CAROUSEL_IMAGE_WIDTH}
                  height={CAROUSEL_IMAGE_HEIGHT}
                  className="h-auto w-full max-w-[200px] object-contain transition-all duration-300"
                  sizes="(max-width: 768px) 70vw, 200px"
                />
              </div>

              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous project image"
                    className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 opacity-0 backdrop-blur-sm transition-opacity hover:bg-background group-hover/carousel:opacity-100"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next project image"
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 opacity-0 backdrop-blur-sm transition-opacity hover:bg-background group-hover/carousel:opacity-100"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    {imageSources.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`View project image ${index + 1}`}
                        className={cn(
                          "h-1.5 rounded-full transition-all",
                          index === currentImageIndex
                            ? "w-4 bg-foreground"
                            : "w-1.5 bg-muted-foreground/30",
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <motion.div
            className="relative overflow-hidden rounded-lg border border-border/60 bg-background/40"
            animate={
              locked
                ? { boxShadow: "0px 0px 0px rgba(0,0,0,0)" }
                : {
                    boxShadow: hovered
                      ? "0px 6px 18px rgba(0,0,0,0.18)"
                      : "0px 0px 0px rgba(0,0,0,0)",
                  }
            }
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute inset-0 rounded-lg bg-primary/5"
              animate={
                locked
                  ? { opacity: 0 }
                  : { opacity: hovered ? 0.12 : 0 }
              }
              transition={{ duration: 0.3 }}
            />
            <div className="relative">
              <motion.h3
                className={cn(
                  "origin-left px-3 pt-3 text-xs font-mono text-foreground transition-transform",
                  language === "zh"
                    ? "tracking-normal"
                    : "uppercase tracking-wider",
                )}
                animate={
                  locked
                    ? { scale: 1, rotate: 0, y: 0 }
                    : {
                        scale: hovered ? 0.94 : 1,
                        rotate: hovered ? -1.5 : 0,
                        y: hovered ? 4 : 0,
                      }
                }
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
              >
                {title}
              </motion.h3>
              <motion.div
                className="px-3 pb-3"
                animate={
                  locked
                    ? { y: 0, opacity: 1 }
                    : { y: hovered ? 24 : 0, opacity: hovered ? 0 : 1 }
                }
                transition={{ duration: 0.22 }}
              >
                <p
                  className={cn(
                    "text-[10px] text-muted-foreground",
                    language === "zh"
                      ? "tracking-normal"
                      : "uppercase tracking-wider",
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
  );
}
