"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const defaultSpring = {
  type: "spring" as const,
  stiffness: 65,
  damping: 24,
  mass: 0.9,
};

const containerVariants = (
  delayChildren: number,
  staggerChildren: number
) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 1,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: defaultSpring,
  },
};

interface TextLineConfig {
  as: "p" | "h1" | "h2" | "h3" | "span" | "a";
  text: string;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  /** Additional props for link elements (e.g. onMouseEnter, onClick) */
  linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

interface CustomLineConfig {
  as: "custom";
  content: React.ReactNode;
  className?: string;
}

type LineConfig = TextLineConfig | CustomLineConfig;

interface ScrollRevealWordsProps {
  lines: LineConfig[];
  className?: string;
  threshold?: number;
  /** Delay before first child animates (seconds). Default 0.18 */
  delayChildren?: number;
  /** Delay between each child (seconds). Default 0.12 */
  staggerChildren?: number;
}

export default function ScrollRevealWords({
  lines,
  className = "",
  threshold = 0.45,
  delayChildren = 0.18,
  staggerChildren = 0.12,
}: ScrollRevealWordsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants(delayChildren, staggerChildren)}
    >
      {lines.map((line, i) => {
        if (line.as === "custom") {
          return (
            <motion.div
              key={i}
              variants={wordVariants}
              className={line.className}
            >
              {line.content}
            </motion.div>
          );
        }
        const words = line.text.split(/\s+/);
        const Tag = line.as;
        const linkProps =
          Tag === "a" && line.href
            ? {
                href: line.href,
                target: line.target,
                rel: line.rel,
                ...line.linkProps,
              }
            : {};
        if (Tag === "a") {
          return (
            <motion.span
              key={i}
              variants={wordVariants}
              style={{ display: "inline-block" }}
            >
              <Tag className={line.className} {...linkProps}>
                {line.text}
              </Tag>
            </motion.span>
          );
        }
        return (
          <Tag key={i} className={line.className} {...linkProps}>
            {words.map((word, j) => (
              <motion.span
                key={j}
                variants={wordVariants}
                style={{ display: "inline-block" }}
              >
                {word}
                {j < words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            ))}
          </Tag>
        );
      })}
    </motion.div>
  );
}
