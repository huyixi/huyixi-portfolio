"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User } from "lucide-react";

const dockItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/about",
    label: "About",
    icon: User,
  },
];

export function Dock() {
  const pathname = usePathname();

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
      <div className="pointer-events-auto flex items-end gap-3 rounded-3xl border border-white/10 bg-black/70 px-4 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {dockItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex flex-col items-center space-y-2"
              aria-label={item.label}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-200 ${
                  isActive
                    ? "border-white/30 bg-white/10 shadow-lg shadow-black/40"
                    : "border-white/5 bg-white/[0.02]"
                } group-hover:-translate-y-1 group-hover:scale-[1.05]`}
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    isActive ? "text-white" : "text-white/70 group-hover:text-white"
                  }`}
                />
              </div>
              <span
                className={`text-xs font-mono uppercase tracking-widest text-white transition-opacity ${
                  isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

