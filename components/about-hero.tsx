"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

export function AboutHero() {
  const { dictionary } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <div className="relative">
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src="/dog.png"
            alt="huyixi"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="max-w-2xl text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {dictionary.aboutHero.title}
        </h1>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {dictionary.aboutHero.subtitle}
        </p>
      </div>
    </div>
  );
}
