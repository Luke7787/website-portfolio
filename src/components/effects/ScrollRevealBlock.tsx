"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const spring = {
  type: "spring" as const,
  stiffness: 26,
  damping: 21,
  mass: 1.6,
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
}

export default function ScrollRevealBlock({
  children,
  className = "",
  delay = 0.15,
  amount = "some",
  margin = "0px 0px 200px 0px",
}: ScrollRevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(ref, { amount, once: true, margin });

  useEffect(() => {
    if (isInView && !hasAnimated) setHasAnimated(true);
  }, [isInView, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 28,
        scale: 1,
        filter: "blur(10px)",
      }}
      animate={
        hasAnimated
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 28, scale: 1, filter: "blur(10px)" }
      }
      transition={{
        delay,
        ...spring,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
