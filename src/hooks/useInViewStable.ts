"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

/** Brief "out of view" gaps (e.g. Safari during smooth scroll) won't reset the visibility timer. */
const OUT_OF_VIEW_GRACE_MS = 100;

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
  const visibleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const graceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (stable) {
      if (graceTimerRef.current) {
        clearTimeout(graceTimerRef.current);
        graceTimerRef.current = null;
      }
      if (visibleTimerRef.current) {
        clearTimeout(visibleTimerRef.current);
        visibleTimerRef.current = null;
      }
      return;
    }

    if (isInView) {
      if (graceTimerRef.current) {
        clearTimeout(graceTimerRef.current);
        graceTimerRef.current = null;
      }
      if (visibleTimerRef.current === null) {
        visibleTimerRef.current = setTimeout(() => {
          visibleTimerRef.current = null;
          setStable(true);
        }, minVisibleMs);
      }
    } else if (
      visibleTimerRef.current !== null &&
      graceTimerRef.current === null
    ) {
      graceTimerRef.current = setTimeout(() => {
        graceTimerRef.current = null;
        if (visibleTimerRef.current) {
          clearTimeout(visibleTimerRef.current);
          visibleTimerRef.current = null;
        }
      }, OUT_OF_VIEW_GRACE_MS);
    }
  }, [isInView, minVisibleMs, stable]);

  useEffect(() => {
    return () => {
      if (graceTimerRef.current) {
        clearTimeout(graceTimerRef.current);
        graceTimerRef.current = null;
      }
      if (visibleTimerRef.current) {
        clearTimeout(visibleTimerRef.current);
        visibleTimerRef.current = null;
      }
    };
  }, []);

  return stable;
}
