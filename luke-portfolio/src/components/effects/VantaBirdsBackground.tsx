"use client";

import { useEffect, useRef } from "react";

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
          color1: 0x3a3a3a,
          color2: 0x2a2a2a,
          birdSize: 1.0,
          wingSpan: 25,
          speedLimit: 4,
          separation: 23,
          // Fewer birds (default is higher; lower = calmer flock)
          quantity: 2,
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
  }, []);

  return (
    <div
      className="absolute inset-0 min-h-screen transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      <div
        ref={containerRef}
        className="absolute inset-0 min-h-screen"
      />
    </div>
  );
}
