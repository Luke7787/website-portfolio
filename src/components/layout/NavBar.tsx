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

/** Share of the viewport (by area) covered by this element — comparable across sections of any height. */
function sectionViewportCoverage(el: HTMLElement): number {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w <= 0 || h <= 0) return 0;
  const r = el.getBoundingClientRect();
  const top = Math.max(0, r.top);
  const left = Math.max(0, r.left);
  const bottom = Math.min(h, r.bottom);
  const right = Math.min(w, r.right);
  const area = Math.max(0, right - left) * Math.max(0, bottom - top);
  return area / (w * h);
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS[0]);
  const [isScrolling, setIsScrolling] = useState(false);
  const isScrollingRef = useRef(false);
  const navRef = useRef<HTMLElement | null>(null);
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

  // Scroll spy: section that covers the largest share of the viewport wins (feels like "what you're mostly seeing").
  // Uses viewport-normalized area, not IntersectionObserver ratio (which divides by section height and skewed tall blocks).
  // Ties favor a later section so boundaries slightly favor the lower block (e.g. skills vs projects).
  useEffect(() => {
    function computeActiveSection(): string {
      let bestId = SECTION_IDS[0];
      let bestCov = -1;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const cov = sectionViewportCoverage(el);
        if (cov >= bestCov) {
          bestCov = cov;
          bestId = id;
        }
      }
      if (bestCov <= 0) {
        const yRef = window.innerHeight * 0.35;
        let current = SECTION_IDS[0];
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= yRef) current = id;
        }
        return current;
      }
      return bestId;
    }

    function scheduleSpyUpdate() {
      if (isScrollingRef.current || isProgrammaticScroll) return;
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const next = computeActiveSection();
        setActiveSection((prev) => (prev === next ? prev : next));
      });
    }

    window.addEventListener("scroll", scheduleSpyUpdate, { passive: true });
    window.addEventListener("resize", scheduleSpyUpdate);
    scheduleSpyUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleSpyUpdate);
      window.removeEventListener("resize", scheduleSpyUpdate);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
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

      {/* Mobile Dropdown — pill-style like desktop */}
      <div
        id="mobile-nav"
        className={
          "md:hidden border-t border-white/10 bg-[#141414]/95 backdrop-blur " +
          (open ? "block" : "hidden")
        }
      >
        <ul className="flex items-center justify-center gap-1 px-3 py-3">
          {NAV_ITEMS.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={item.href} className="relative">
                <Link
                  href="/"
                  className={
                    "relative z-10 block uppercase rounded-md px-2.5 py-2 text-[0.7rem] font-semibold tracking-[0.08em] transition-[color,opacity,background-color] duration-300 ease-out " +
                    (isActive
                      ? "text-white opacity-100"
                      : "text-white/90 opacity-90 hover:opacity-100 hover:bg-[#1E90FF]")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(id);
                    scrollToSection(item.href, scrollCallbacks);
                    setOpen(false);
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mobile-nav-pill"
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
      </div>
    </nav>
  );
}
