"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CARD_COUNT = 3;

/**
 * Mobile-only: reveal project cards 0→1→2 in order. The next card may start only after
 * the previous card’s estimated sequence duration, or after skipped (never-started) cards
 * when the user scrolls past them.
 */
export function useMobileProjectSequentialGate(isMobile: boolean) {
  const [openGate, setOpenGate] = useState(0);
  const [rawVisible, setRawVisible] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ]);
  const startedRef = useRef<Set<number>>(new Set());
  const timeoutRef = useRef<number | null>(null);

  const setRawAt = useCallback((index: number, visible: boolean) => {
    setRawVisible((prev) => {
      if (prev[index] === visible) return prev;
      const next: [boolean, boolean, boolean] = [...prev];
      next[index] = visible;
      return next;
    });
  }, []);

  const onSequenceStart = useCallback((index: number, durationMs: number) => {
    startedRef.current.add(index);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      setOpenGate((g) => Math.max(g, index + 1));
    }, durationMs);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMobile || openGate >= CARD_COUNT) return;
    let k = openGate;
    while (k < CARD_COUNT && !rawVisible[k]) {
      k += 1;
    }
    if (k <= openGate || k >= CARD_COUNT) return;
    let ok = true;
    for (let j = openGate; j < k; j += 1) {
      if (rawVisible[j] || startedRef.current.has(j)) {
        ok = false;
        break;
      }
    }
    if (ok) {
      setOpenGate(k);
    }
  }, [rawVisible, openGate, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    setOpenGate(0);
    setRawVisible([false, false, false]);
    startedRef.current.clear();
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [isMobile]);

  return {
    openGate: isMobile ? openGate : 0,
    /** When not mobile, openGate is 0 but cards must not use sequential mode (undefined). */
    onSequenceStart: isMobile ? onSequenceStart : undefined,
    setRawAt: isMobile ? setRawAt : undefined,
  };
}
