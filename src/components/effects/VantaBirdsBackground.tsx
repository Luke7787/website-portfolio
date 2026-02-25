"use client";

import { useEffect, useRef, useState } from "react";

const VANTA_MOBILE_BREAKPOINT = 600;

/**
 * Vanta.js uses different code paths for mobile vs desktop and different bird-count formulas:
 * - Desktop (width >= 600): GPU path, count = (2^quantity)^2  → e.g. quantity 2 = 16 birds
 * - Mobile (width < 600):   CPU path, count = 6 * 2^quantity  → e.g. quantity 0 = 6 birds
 * So with the same quantity, small screens get more birds. We use a lower quantity on
 * small screens so that bird count is fewer on small screens.
 */
function getQuantityForWidth(width: number): number {
  return width >= VANTA_MOBILE_BREAKPOINT ? 2 : 0;
}

/**
 * Vanta.js Birds effect for the home section.
 * Loads Three.js and Vanta only on the client to avoid SSR issues.
 * Visibility is controlled by the parent (e.g. show when user touches "LUKE ZHUANG").
 * @see https://www.vantajs.com/?effect=birds
 */
type Props = { visible: boolean };

export default function VantaBirdsBackground({ visible }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<{ destroy: () => void } | null>(null);
  const [quantity, setQuantity] = useState(() =>
    typeof window !== "undefined" ? getQuantityForWidth(window.innerWidth) : 0
  );

  // Sync quantity with viewport so small screens get fewer birds (Vanta uses different formulas per breakpoint)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      const next = getQuantityForWidth(window.innerWidth);
      setQuantity((q) => (q !== next ? next : q));
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    let mounted = true;

    Promise.all([import("three"), import("vanta/dist/vanta.birds.min")])
      .then(([THREE_MOD, BIRDS_MOD]) => {
        if (!mounted || !containerRef.current) return;
        const THREE = (THREE_MOD as { default?: unknown }).default ?? THREE_MOD;
        const BIRDS = ((BIRDS_MOD as { default?: unknown }).default ??
          BIRDS_MOD) as (opts: Record<string, unknown>) => {
          destroy: () => void;
        };
        effectRef.current = BIRDS({
          el: containerRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          // Match portfolio dark background (#141414)
          backgroundColor: 0x141414,
          // Dark blue blend
          color1: 0x0d47a1,
          color2: 0x1565c0,
          birdSize: 1.0,
          wingSpan: 25,
          speedLimit: 4,
          separation: 23,
          // Responsive quantity: fewer birds on small screens (Vanta uses different count formulas per breakpoint)
          quantity,
        });
      })
      .catch((err) => {
        console.warn("Vanta Birds failed to load:", err);
      });

    return () => {
      mounted = false;
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, [quantity]);

  return (
    <div
      className="absolute inset-0 min-h-screen transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      <div ref={containerRef} className="absolute inset-0 min-h-screen" />
    </div>
  );
}
