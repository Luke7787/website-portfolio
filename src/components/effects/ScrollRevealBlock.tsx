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
  /** Viewport amount (0-1) to trigger. Default 0.2 */
  amount?: number;
}

export default function ScrollRevealBlock({
  children,
  className = "",
  delay = 0.15,
  amount = 0.2,
}: ScrollRevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(ref, { amount, once: true });

  useEffect(() => {
    if (isInView && !hasAnimated) setHasAnimated(true);
  }, [isInView, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 10,
        scale: 1,
        filter: "blur(10px)",
      }}
      animate={
        hasAnimated
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 10, scale: 1, filter: "blur(10px)" }
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
