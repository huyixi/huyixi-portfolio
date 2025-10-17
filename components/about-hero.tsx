"use client";

import Image from "next/image";

export function AboutHero() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      {/* Profile Image with sticker effect */}
      <div className="relative">
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src="dog.png"
            alt="huyixi"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-2xl text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Hi, I'm huyixi
        </h1>
        <p className="text-muted-foreground leading-relaxed text-sm">
          EXPERIENCED DIGITAL PRODUCT DESIGNER WITH 4+ YEARS CREATING
          USER-CENTERED DIGITAL SOLUTIONS. PASSIONATE TO DO AN EXPERIMENT TO
          CRAFT UNFORGETTABLE PRODUCT EXPERIENCES AND INTERFACES.
        </p>
      </div>
    </div>
  );
}
