"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  type Variants,
  type Transition,
} from "framer-motion";
import { useInViewStable } from "@/hooks/useInViewStable";

const defaultSpring = {
  type: "spring" as const,
  stiffness: 65,
  damping: 24,
  mass: 0.9,
};

/** Override word animation (e.g. { type: "tween", duration: 0.7, ease: "easeOut" } for smoother/slower). */
type TransitionOverrides =
  | { type: "spring"; stiffness?: number; damping?: number; mass?: number }
  | {
      type: "tween";
      duration?: number;
      ease?: string | readonly [number, number, number, number];
    };

const containerVariants = (delayChildren: number, staggerChildren: number) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});

const wordVariants = (transitionOverrides?: TransitionOverrides): Variants => {
  const transition: Transition =
    transitionOverrides?.type === "tween"
      ? {
          type: "tween",
          duration: transitionOverrides.duration ?? 0.7,
          ease: (transitionOverrides.ease ?? [
            0.22, 0.08, 0.28, 1,
          ]) as Transition["ease"],
        }
      : ((transitionOverrides ?? defaultSpring) as Transition);

  return {
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
      transition,
    },
  };
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

type UseInViewMargin = Parameters<typeof useInView>[1] extends {
  margin?: infer M;
}
  ? M
  : never;

interface ScrollRevealWordsProps {
  lines: LineConfig[];
  className?: string;
  threshold?: number;
  /** IntersectionObserver root margin (e.g. negative bottom % delays trigger while scrolling down). */
  margin?: string;
  /** Require this many ms in view before revealing (only when > 0). */
  minVisibleMs?: number;
  /** When set, use this ref for in-view check instead of internal ref (keeps description and sibling elements in sync). */
  observeRef?: React.RefObject<HTMLDivElement | null>;
  /** When set, use this for visibility instead of useInView (e.g. stable-in-view from parent). */
  forceVisible?: boolean;
  /** Delay before first child animates (seconds). Default 0.18 */
  delayChildren?: number;
  /** Delay between each child (seconds). Default 0.12 */
  staggerChildren?: number;
  /** Override word transition for smoother/slower animation (e.g. tween with easeOut). */
  transitionOverrides?: TransitionOverrides;
}

export default function ScrollRevealWords({
  lines,
  className = "",
  threshold = 0.45,
  margin,
  minVisibleMs,
  observeRef,
  forceVisible,
  delayChildren = 0.18,
  staggerChildren = 0.12,
  transitionOverrides,
}: ScrollRevealWordsProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = observeRef ?? internalRef;
  const marginTyped = margin as UseInViewMargin | undefined;
  const isInViewInstant = useInView(ref, {
    once: true,
    amount: threshold,
    ...(margin ? { margin: marginTyped } : {}),
  });
  const isInViewStable = useInViewStable(ref, {
    amount: threshold,
    minVisibleMs: minVisibleMs ?? 0,
    ...(margin ? { margin } : {}),
  });
  const isInViewFromRef =
    (minVisibleMs ?? 0) > 0 ? isInViewStable : isInViewInstant;
  const isInView = forceVisible !== undefined ? forceVisible : isInViewFromRef;
  const variants = wordVariants(transitionOverrides);

  return (
    <motion.div
      ref={internalRef}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants(delayChildren, staggerChildren)}
    >
      {lines.map((line, i) => {
        if (line.as === "custom") {
          return (
            <motion.div key={i} variants={variants} className={line.className}>
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
              variants={variants}
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
                variants={variants}
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
