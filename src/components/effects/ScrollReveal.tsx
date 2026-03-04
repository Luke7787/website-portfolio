"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Offset from viewport bottom (0–1 or px) where animation triggers. Default 0.4 (later = more in view first) */
  threshold?: number;
  /** Initial translateY in px. Default 40 (slide up from below). */
  yOffset?: number;
  /** Transition duration in ms. Default 1100 */
  duration?: number;
  /** Easing. Default "cubic-bezier(0.22, 1, 0.36, 1)" */
  easing?: string;
  className?: string;
}

export default function ScrollReveal({
  children,
  threshold = 0.4,
  yOffset = 40,
  duration = 1100,
  easing = "cubic-bezier(0.22, 1, 0.36, 1)",
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: "transform",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : `translateY(${yOffset}px)`,
        transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
      }}
    >
      {children}
    </div>
  );
}
