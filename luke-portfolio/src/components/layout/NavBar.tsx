"use client";

import Image from "next/image";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#141414]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo + Name */}
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo.jpg"
            alt="Luke Zhuang"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
            priority
          />

          <span className="text-[1.2rem] font-bold tracking-[0.15em] text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
            LUKE ZHUANG
          </span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-semibold tracking-wider text-white opacity-80 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)] transition hover:opacity-100"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (logic later) */}
        <button className="md:hidden text-sm font-semibold tracking-wider text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
          Menu
        </button>
      </div>
    </nav>
  );
}
