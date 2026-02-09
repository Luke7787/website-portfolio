"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AnimatedName from "@/components/effects/AnimatedName";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  // Optional: close on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#141414]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo + Animated Name */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Image
            src="/images/logo.jpg"
            alt="Luke Zhuang"
            width={48}
            height={48}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
            priority
          />

          {/* prevent overflow on small screens */}
          <div className="min-w-0 pl-1 sm:pl-2">
            <AnimatedName>
              <span
                className="
                  block
                  truncate
                  text-[1rem]
                  sm:text-[1.2rem]
                  font-bold
                  tracking-[0.15em]
                  text-white/90
                  drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]
                  transition-colors
                  duration-300
                  ease-in-out
                  hover:text-[#1E90FF]
                  opacity-0
                  animate-[revealText_0.65s_ease-in-out_0.65s_forwards]
                "
              >
                LUKE ZHUANG
              </span>
            </AnimatedName>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="
                  uppercase
                  rounded-md
                  px-3 py-2
                  text-[0.8rem]
                  font-semibold
                  tracking-[0.12em]
                  text-white/90
                  transition-colors
                  hover:bg-[#1E90FF]
                "
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden rounded-md px-3 py-2 text-sm font-semibold tracking-wider text-white/90 hover:bg-white/10"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        id="mobile-nav"
        className={`md:hidden border-t border-white/10 bg-[#141414]/95 backdrop-blur ${
          open ? "block" : "hidden"
        }`}
      >
        <ul className="mx-auto max-w-6xl px-4 py-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="
                  block
                  uppercase
                  rounded-md
                  px-3 py-3
                  text-[0.85rem]
                  font-semibold
                  tracking-[0.12em]
                  text-white/90
                  transition-colors
                  hover:bg-[#1E90FF]
                "
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
