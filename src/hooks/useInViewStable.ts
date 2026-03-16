"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

/**
 * Like useInView, but only returns true after the element has been in view
 * for at least minVisibleMs. Handles fast scrolls: if the user scrolls past
 * quickly, the element never "stabilizes" and the animation won't trigger.
 */
export function useInViewStable(
  ref: React.RefObject<HTMLElement | null>,
  options: {
    amount?: number | "some" | "all";
    margin?: string;
    minVisibleMs: number;
  },
) {
  const { minVisibleMs, amount = 0.2, margin } = options;
  const [stable, setStable] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isInView = useInView(ref, {
    amount,
    once: false,
    margin: margin as Parameters<typeof useInView>[1] extends {
      margin?: infer M;
    }
      ? M
      : never,
  });

  useEffect(() => {
    if (stable) return;

    if (isInView) {
      timerRef.current = setTimeout(() => setStable(true), minVisibleMs);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isInView, minVisibleMs, stable]);

  return stable;
}
