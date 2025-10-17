"use client";

import Link from "next/link";
import { ExternalLink, Home, Languages, User } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Separator } from "@/components/ui/separator";

export function Dock() {
  const { toggleLanguage, dictionary } = useLanguage();

  const internalItems = [
    {
      href: "/",
      label: dictionary.dock.home,
      icon: Home,
    },
    {
      href: "/about",
      label: dictionary.dock.about,
      icon: User,
    },
  ];

  const externalItems = [
    {
      href: "https://apps.huyixi.com",
      label: dictionary.dock.apps,
    },
    {
      href: "https://blog.huyixi.com",
      label: dictionary.dock.blog,
    },
  ];

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
      <div className="pointer-events-auto flex items-end gap-3 rounded-3xl border border-white/10 bg-black/70 px-4 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {internalItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] transition-all duration-200 group-hover:-translate-y-1 group-hover:scale-[1.05] group-hover:border-white/30 group-hover:bg-white/10 group-hover:shadow-lg group-hover:shadow-black/40"
              aria-label={item.label}
            >
              <Icon className="h-5 w-5 text-white/70 transition-colors group-hover:text-white" />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}

        {externalItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] transition-all duration-200 group-hover:-translate-y-1 group-hover:scale-[1.05] group-hover:border-white/30 group-hover:bg-white/10 group-hover:shadow-lg group-hover:shadow-black/40"
            aria-label={item.label}
          >
            <ExternalLink className="h-5 w-5 text-white/70 transition-colors group-hover:text-white" />
            <span className="sr-only">{item.label}</span>
          </a>
        ))}

        <Separator
          orientation="vertical"
          className="h-10 bg-white/10"
        />
        <button
          type="button"
          onClick={toggleLanguage}
          className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] transition-all duration-200 group-hover:-translate-y-1 group-hover:scale-[1.05] group-hover:border-white/30 group-hover:bg-white/10 group-hover:shadow-lg group-hover:shadow-black/40"
          aria-label={dictionary.dock.languageButtonAria}
        >
          <Languages className="h-5 w-5 text-white/70 transition-colors group-hover:text-white" />
          <span className="sr-only">{dictionary.dock.languageButtonLabel}</span>
        </button>
      </div>
    </nav>
  );
}
