"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const spring = {
  type: "spring" as const,
  stiffness: 26,
  damping: 21,
  mass: 1.6,
};

/** Same as ScrollRevealWords word animation */
const wordsSpring = {
  type: "spring" as const,
  stiffness: 65,
  damping: 24,
  mass: 0.9,
};

interface ScrollRevealBlockProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds (e.g. 0.1 for first card, 0.18 for second, etc.) */
  delay?: number;
  /** "some" = any part visible (triggers early), "all" = fully visible, or 0–1 for fraction. Default "some". */
  amount?: "some" | "all" | number;
  /** Root margin: extend viewport so elements trigger earlier (e.g. "0px 0px 200px 0px" = 200px below). */
  margin?: string;
  /** Use same animation as "PORTFOLIO Featured Projects" (ScrollRevealWords): y 24, wordsSpring */
  animationStyle?: "default" | "words";
  /** Override spring transition (e.g. { stiffness: 35, damping: 22 } for slower animation) */
  transitionOverrides?: { stiffness?: number; damping?: number; mass?: number };
}

export default function ScrollRevealBlock({
  children,
  className = "",
  delay = 0.15,
  amount = "some",
  margin = "0px 0px 200px 0px",
  animationStyle = "default",
  transitionOverrides,
}: ScrollRevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(ref, {
    amount,
    once: true,
    margin: margin as Parameters<typeof useInView>[1] extends { margin?: infer M } ? M : never,
  });

  const isWords = animationStyle === "words";
  const initialY = isWords ? 24 : 28;
  const transitionSpring = isWords ? wordsSpring : spring;

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const id = setTimeout(() => setHasAnimated(true), 0);
      return () => clearTimeout(id);
    }
  }, [isInView, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: initialY,
        scale: 1,
        filter: "blur(10px)",
      }}
      animate={
        hasAnimated
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: initialY, scale: 1, filter: "blur(10px)" }
      }
      transition={{
        delay,
        ...transitionSpring,
        ...transitionOverrides,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
