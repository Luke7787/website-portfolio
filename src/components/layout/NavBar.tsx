"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedName from "@/components/effects/AnimatedName";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace("#", ""));

const SCROLL_DURATION_MS = 1600; // same smooth feel in both directions, like going up
// Ease-out-expo: responsive start, very smooth deceleration at end (common in animation libs)
const EASE_OUT_EXPO = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

let scrollRafId: number | null = null;
let isProgrammaticScroll = false;

type ScrollCallbacks = {
  onStart?: () => void;
  onComplete?: (sectionId: string) => void;
};

function scrollToSection(href: string, callbacks?: ScrollCallbacks) {
  if (typeof window === "undefined") return;

  if (scrollRafId !== null) {
    cancelAnimationFrame(scrollRafId);
    scrollRafId = null;
  }

  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) {
    window.history.replaceState(null, "", window.location.pathname);
    return;
  }

  isProgrammaticScroll = true;
  requestAnimationFrame(() => callbacks?.onStart?.());

  const navHeight = 64; // h-16
  const windowH = window.innerHeight;
  let targetY: number;

  if (id === "contact") {
    // Scroll to bottom of page so contact section + full footer are both visible
    const footer = document.getElementById("footer");
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      targetY =
        window.scrollY +
        footerRect.top +
        footerRect.height -
        windowH +
        navHeight;
    } else {
      targetY = window.scrollY + el.getBoundingClientRect().top - navHeight;
    }
  } else {
    const block = id === "skills" ? "center" : "start";
    const rect = el.getBoundingClientRect();
    if (block === "center") {
      targetY =
        window.scrollY +
        rect.top -
        windowH / 2 +
        rect.height / 2 -
        navHeight / 2;
    } else {
      const isMobile = window.innerWidth < 768;
      const pushDown = id === "about" ? (isMobile ? -42 : 85) : 0;
      targetY = window.scrollY + rect.top - navHeight - pushDown;
    }
  }
  targetY = Math.max(0, targetY);

  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function tick(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1);
    const eased = EASE_OUT_EXPO(progress);
    window.scrollTo(0, startY + distance * eased);
    if (progress < 1) {
      scrollRafId = requestAnimationFrame(tick);
    } else {
      scrollRafId = null;
      requestAnimationFrame(() => {
        isProgrammaticScroll = false;
        callbacks?.onComplete?.(id);
      });
    }
  }
  scrollRafId = requestAnimationFrame(tick);

  window.history.replaceState(null, "", window.location.pathname);
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS[0]);
  const [isScrolling, setIsScrolling] = useState(false);
  const isScrollingRef = useRef(false);
  const navRef = useRef<HTMLElement | null>(null);
  const ratioRef = useRef<Record<string, number>>({});
  const rafRef = useRef<number | null>(null);

  const scrollCallbacks: ScrollCallbacks = {
    onStart: () => {
      isScrollingRef.current = true;
      setIsScrolling(true);
    },
    onComplete: (sectionId) => {
      setActiveSection(sectionId);
      isScrollingRef.current = false;
      setIsScrolling(false);
    },
  };

  // Scroll spy: section with largest presence in the "active zone" wins (smooth, no flicker)
  // Skip updates during programmatic scroll so the scroll doesn't stutter at each section
  useEffect(() => {
    SECTION_IDS.forEach((id) => {
      ratioRef.current[id] = 0;
    });

    const elements = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el != null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current || isProgrammaticScroll) return;
        entries.forEach((entry) => {
          ratioRef.current[entry.target.id] = entry.intersectionRatio;
        });
        let maxRatio = 0;
        let bestId = SECTION_IDS[0];
        SECTION_IDS.forEach((id) => {
          const r = ratioRef.current[id] ?? 0;
          if (r > maxRatio) {
            maxRatio = r;
            bestId = id;
          }
        });

        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        const chosen = maxRatio > 0 ? bestId : null;
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          setActiveSection((prev) => chosen ?? prev);
        });
      },
      {
        root: null,
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0, 0.01, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  // On load/refresh: strip hash so URL is always e.g. localhost:3000
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    function handleClickOutside(e: MouseEvent) {
      if (
        open &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#141414]/90 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo + Animated Name */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 translate-y-1">
          <Image
            src="/images/logo.jpg"
            alt="Luke Zhuang"
            width={48}
            height={528}
            className="
              h-10 w-10
              sm:h-12 sm:w-12
              rounded-full
              object-cover
              -translate-y-[2.5px]
            "
            priority
          />

          <Link
            href="/"
            className="min-w-0 pl-1 sm:pl-2 cursor-pointer block"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("home");
              scrollToSection("#home", scrollCallbacks);
            }}
          >
            <AnimatedName>
              <span
                className="
                  block
                  cursor-pointer
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
          </Link>
        </div>

        {/* Desktop Nav Links — sliding pill shows current section; hover suppressed while scrolling */}
        <ul
          className={
            "hidden md:flex items-center gap-2 relative group " +
            (isScrolling ? "scrolling" : "")
          }
        >
          {NAV_ITEMS.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={item.href} className="relative">
                <Link
                  href="/"
                  className={
                    "relative z-10 block uppercase rounded-md px-3 py-2 text-[0.8rem] font-semibold tracking-[0.12em] transition-[color,opacity,background-color] duration-300 ease-out " +
                    (isActive
                      ? "text-white opacity-100"
                      : "text-white/90 opacity-90 hover:opacity-100 hover:bg-[#1E90FF]") +
                    " group-[.scrolling]:hover:bg-transparent group-[.scrolling]:hover:opacity-90"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(id);
                    scrollToSection(item.href, scrollCallbacks);
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md bg-[#1E90FF]"
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 22,
                        mass: 1.2,
                      }}
                      style={{ zIndex: -1 }}
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button — show current section when closed */}
        <button
          type="button"
          className="md:hidden rounded-md px-3 py-2 text-sm font-semibold tracking-wider text-white/90 hover:bg-white/10 flex items-center gap-2"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
          <span className="text-white/60 font-normal text-xs hidden sm:inline">
            {open
              ? ""
              : " · " +
                (NAV_ITEMS.find(
                  (n) => n.href.replace("#", "") === activeSection,
                )?.label ?? activeSection)}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown — highlight current section */}
      <div
        id="mobile-nav"
        className={
          "md:hidden border-t border-white/10 bg-[#141414]/95 backdrop-blur " +
          (open ? "block" : "hidden")
        }
      >
        <div className="px-4 pt-3 pb-1 text-[0.7rem] uppercase tracking-widest text-white/50 transition-opacity duration-300">
          Viewing:{" "}
          {NAV_ITEMS.find((n) => n.href.replace("#", "") === activeSection)
            ?.label ?? activeSection}
        </div>
        <ul className="mx-auto max-w-6xl px-4 py-2">
          {NAV_ITEMS.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={item.href}>
                <Link
                  href="/"
                  className={
                    "block uppercase rounded-md px-3 py-3 text-[0.85rem] font-semibold tracking-[0.12em] transition-[background-color,color,border-color] duration-300 ease-out " +
                    (isActive
                      ? "bg-[#1E90FF]/20 text-[#1E90FF] border-l-2 border-[#1E90FF]"
                      : "text-white/90 hover:bg-[#1E90FF] border-l-2 border-transparent")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(id);
                    scrollToSection(item.href, scrollCallbacks);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
