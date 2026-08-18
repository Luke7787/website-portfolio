"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Showroom, Inventory, Blackjack, Server & Client, Tutoring Business Website, Real-Time Chat Application — all stacked on mobile. */
const CARD_COUNT = 6;

type RawTuple = [boolean, boolean, boolean, boolean, boolean, boolean];

const initialRaw: RawTuple = [false, false, false, false, false, false];

/**
 * Mobile-only: reveal project cards 0→1→2→3→4→5 in order. The next card may start only after
 * the previous card’s estimated sequence duration, or after skipped (never-started) cards
 * when the user scrolls past them.
 */
export function useMobileProjectSequentialGate(isMobile: boolean) {
  const [openGate, setOpenGate] = useState(0);
  const [rawVisible, setRawVisible] = useState<RawTuple>(initialRaw);
  const startedRef = useRef<Set<number>>(new Set());
  const timeoutRef = useRef<number | null>(null);

  const setRawAt = useCallback((index: number, visible: boolean) => {
    if (index < 0 || index >= CARD_COUNT) return;
    setRawVisible((prev) => {
      if (prev[index] === visible) return prev;
      const next = [...prev] as RawTuple;
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
      // Run after the timeout tick so the next card’s first paint isn’t one frame behind.
      queueMicrotask(() => {
        setOpenGate((g) => Math.max(g, index + 1));
      });
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
    setRawVisible(initialRaw);
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
