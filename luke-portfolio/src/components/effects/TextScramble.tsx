"use client";

import { useEffect, useRef } from "react";

type TextScrambleProps = {
  text: string;
  className?: string;
  duration?: number;
};

export default function TextScramble({
  text,
  className = "",
  duration = 1700,
}: TextScrambleProps) {
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const letters =
      "ゲネバコンヰゾケウユハポフチヘツムカザルマボレピスルベトペアドプヤブヲンタシデラソミネブニヌレクサゲガバーネゼ";

    const el = textRef.current;
    if (!el) return;

    let iteration = 0;
    const finalText = text;
    const startTime = Date.now();

    el.style.visibility = "hidden";

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      iteration = Math.min(
        finalText.length,
        Math.floor((elapsed / duration) * finalText.length),
      );

      el.textContent = finalText
        .split("")
        .map((char, i) =>
          i < iteration
            ? finalText[i]
            : letters[Math.floor(Math.random() * letters.length)],
        )
        .join("");

      if (iteration >= finalText.length) {
        clearInterval(interval);
        el.textContent = finalText;
      }
    }, 55);

    setTimeout(() => {
      el.style.visibility = "visible";
    }, 0);

    return () => clearInterval(interval);
  }, [text, duration]);

  return (
    <p ref={textRef} className={className}>
      {text}
    </p>
  );
}
