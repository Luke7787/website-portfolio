"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  duration?: number;
  intervalMs?: number;
};

export default function TextScramble({
  text,
  className = "",
  duration = 1700,
  intervalMs = 55,
}: Props) {
  const pRef = useRef<HTMLParagraphElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const letters =
      "ゲネバコンヰゾケウユハポフチヘツムカザルマボレピスルベトペアドプヤブヲンタシデラソミネブニヌレクサゲガバーネゼ";

    const el = pRef.current;
    if (!el) return;

    // Clear any previous timers (safe if React re-renders)
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);

    let iteration = 0;

    const renderScramble = () => {
      el.textContent = text
        .split("")
        .map((_, i) =>
          i < iteration
            ? text[i]
            : letters[Math.floor(Math.random() * letters.length)],
        )
        .join("");
    };

    const startScramble = () => {
      iteration = 0;

      // Immediately scramble all characters so the first letter changes too
      renderScramble();

      const startTime = Date.now();

      intervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;

        iteration = Math.min(
          text.length,
          Math.floor((elapsed / duration) * text.length),
        );

        renderScramble();

        if (iteration >= text.length) {
          if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          el.textContent = text;
        }
      }, intervalMs);
    };

    timeoutRef.current = window.setTimeout(() => {
      setVisible(true);
      startScramble();
    }, 0);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, duration, intervalMs]);

  return (
    <p
      ref={pRef}
      className={className}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      {text}
    </p>
  );
}
