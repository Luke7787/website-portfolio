"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import ScrollRevealWords from "@/components/effects/ScrollRevealWords";
import { useInViewStable } from "@/hooks/useInViewStable";
import { useIsMobile } from "@/hooks/useIsMobile";
import { estimateDisableRevealProjectSequenceMs } from "@/lib/projectCardSequence";

/** Match ScrollRevealWords exactly: same spring and variants */
const defaultSpring = {
  type: "spring" as const,
  stiffness: 65,
  damping: 24,
  mass: 0.9,
};

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.02,
      staggerChildren: 0.04,
    },
  },
};

const itemVariants = {
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

/** Snappier spring for image (contact-section pace). */
const imageSpring = {
  type: "spring" as const,
  stiffness: 80,
  damping: 26,
  mass: 0.7,
};

const imageVariants = {
  hidden: itemVariants.hidden,
  visible: {
    ...itemVariants.visible,
    transition: imageSpring,
  },
};

const textBlockVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
};

/** Same as itemVariants but with a delay so links appear after description word reveal. */
function linksVariants(descriptionWordCount: number) {
  const descriptionRevealDuration = descriptionWordCount * 0.02;
  const delay = 0.08 + descriptionRevealDuration + 0.06;
  return {
    hidden: itemVariants.hidden,
    visible: {
      ...itemVariants.visible,
      transition: {
        ...defaultSpring,
        delay,
      },
    },
  };
}

export interface ProjectLink {
  label: string;
  href: string;
}

/** Reveals links with the same smooth tween after a delay (so they appear after title + description). Each link reveals separately for better flow. */
function LinksRevealAfterDelay({
  delayMs,
  cardRef,
  links,
  inViewAmount = 0.2,
  trigger,
}: {
  delayMs: number;
  cardRef: React.RefObject<HTMLDivElement | null>;
  links: ProjectLink[];
  inViewAmount?: number;
  /** When set, use this instead of useInView (e.g. stable-in-view from parent). */
  trigger?: boolean;
}) {
  const [show, setShow] = useState(false);
  const isInViewFromRef = useInView(cardRef, { once: true, amount: inViewAmount });
  const isInView = trigger !== undefined ? trigger : isInViewFromRef;

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setShow(true), delayMs);
    return () => clearTimeout(t);
  }, [isInView, delayMs]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "tween" as const,
        duration: 0.9,
        ease: [0.22, 0.08, 0.28, 1] as const,
      },
    },
  };

  return (
    <motion.div
      className="flex gap-4 mt-4 flex-wrap"
      variants={containerVariants}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
    >
      {links.map((link) => (
        <motion.span
          key={link.href}
          variants={linkVariants}
          style={{ display: "inline-block" }}
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0099ff] font-medium hover:underline"
          >
            {link.label}
          </a>
        </motion.span>
      ))}
    </motion.div>
  );
}

interface ScrollRevealCardProps {
  imageSrc: string;
  imageAlt: string;
  imageSizes?: string;
  imageObjectPosition?: string;
  title: string;
  description: string;
  mainHref: string;
  links: ProjectLink[];
  className?: string;
  cardClassName?: string;
  /** Only card 4 uses col-span on md/lg */
  colSpanClassName?: string;
  /** Delay in seconds before this card's animation starts (for staggering cards: image → text, then next card). */
  startDelay?: number;
  /** When true, card does not animate on its own; use with a parent ScrollRevealBlock to reveal the whole row at once. */
  disableReveal?: boolean;
  /** Visibility threshold (0–1) for when links reveal; use to match parent ScrollRevealBlock amount when it's higher than default. */
  linksInViewAmount?: number;
  /** Require card in view for this many ms before revealing content (handles fast scroll). Use with parent ScrollRevealBlock minVisibleMs. */
  inViewStableMs?: number;
  /** Mobile + disableReveal: row index (0,1,…) for ordered reveals with siblings. */
  sequentialIndex?: number;
  sequentialOpenGate?: number;
  onSequentialStart?: (index: number, durationMs: number) => void;
  onSequentialRaw?: (visible: boolean) => void;
}

function AnimatedWords({
  text,
  as: Tag,
  className,
}: {
  text: string;
  as: "h3" | "p";
  className?: string;
}) {
  const words = text.split(/\s+/);
  return (
    <Tag className={className}>
      <motion.span variants={textBlockVariants} style={{ display: "inline" }}>
        {words.map((word, j) => (
          <motion.span
            key={j}
            variants={itemVariants}
            style={{ display: "inline-block" }}
          >
            {word}
            {j < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

export default function ScrollRevealCard({
  imageSrc,
  imageAlt,
  imageSizes = "(max-width: 768px) 100vw, (max-width: 1128px) 50vw, 33vw",
  imageObjectPosition,
  title,
  description,
  mainHref,
  links,
  className = "",
  cardClassName = "group opacity-100 transition-all duration-500 ease-out",
  colSpanClassName = "",
  /** Delay in seconds before this card's animation starts (e.g. for staggering multiple cards). */
  startDelay = 0,
  disableReveal = false,
  linksInViewAmount,
  inViewStableMs,
  sequentialIndex,
  sequentialOpenGate,
  onSequentialStart,
  onSequentialRaw,
}: ScrollRevealCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textInViewRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  /** On mobile + disableReveal, observing the full card fires when only the image top crosses the viewport; use the text block so the prior card can finish its reveal first. */
  const inViewObserveRef =
    disableReveal && isMobile ? textInViewRef : containerRef;
  const viewAmount = linksInViewAmount ?? 0.2;
  const inViewAmount =
    disableReveal && isMobile ? Math.max(viewAmount, 0.45) : viewAmount;
  const mobileTextInView = useInView(textInViewRef, {
    once: false,
    amount: inViewAmount,
  });
  const containerInstantInView = useInView(containerRef, {
    once: true,
    amount: viewAmount,
  });
  const isInViewStable = useInViewStable(inViewObserveRef, {
    amount: inViewAmount,
    minVisibleMs: inViewStableMs ?? 0,
  });
  const sequentialEnabled =
    disableReveal &&
    isMobile &&
    typeof sequentialIndex === "number" &&
    typeof sequentialOpenGate === "number" &&
    typeof onSequentialStart === "function" &&
    typeof onSequentialRaw === "function";
  const [sequentialLatched, setSequentialLatched] = useState(false);
  const [mobileNonSequentialLatched, setMobileNonSequentialLatched] =
    useState(false);

  useEffect(() => {
    if (!sequentialEnabled) return;
    onSequentialRaw(mobileTextInView);
  }, [sequentialEnabled, mobileTextInView, onSequentialRaw]);

  useEffect(() => {
    if (!sequentialEnabled || sequentialIndex === undefined) return;
    const eligible =
      mobileTextInView &&
      sequentialOpenGate === sequentialIndex &&
      !sequentialLatched;
    if (eligible) {
      setSequentialLatched(true);
      onSequentialStart(
        sequentialIndex,
        estimateDisableRevealProjectSequenceMs(
          title,
          description,
          links.length,
        ),
      );
    }
  }, [
    sequentialEnabled,
    mobileTextInView,
    sequentialOpenGate,
    sequentialIndex,
    sequentialLatched,
    onSequentialStart,
    title,
    description,
    links.length,
  ]);

  useEffect(() => {
    if (sequentialEnabled) return;
    if (!(disableReveal && isMobile)) return;
    if (mobileTextInView && !mobileNonSequentialLatched) {
      setMobileNonSequentialLatched(true);
    }
  }, [
    sequentialEnabled,
    disableReveal,
    isMobile,
    mobileTextInView,
    mobileNonSequentialLatched,
  ]);

  const isInView = sequentialEnabled
    ? sequentialLatched
    : disableReveal && isMobile
      ? mobileNonSequentialLatched
      : inViewStableMs !== undefined
        ? isInViewStable
        : containerInstantInView;
  const [hasDelayed, setHasDelayed] = useState(false);

  useEffect(() => {
    if (!isInView || disableReveal) return;
    if (startDelay <= 0) {
      const id = setTimeout(() => setHasDelayed(true), 0);
      return () => clearTimeout(id);
    }
    const t = setTimeout(() => setHasDelayed(true), startDelay * 1000);
    return () => clearTimeout(t);
  }, [isInView, startDelay, disableReveal]);

  const descriptionWordCount = description.split(/\s+/).length;
  const shouldAnimate = !disableReveal && isInView && hasDelayed;

  if (disableReveal) {
    const titleWordCount = title.split(/\s+/).length;
    const descriptionWordCount = description.split(/\s+/).length;
    // Links reveal right after title + description: delayChildren + (title + desc words) * staggerChildren + short buffer
    let linksRevealDelayMs =
      (0.08 + (titleWordCount + descriptionWordCount) * 0.058 + 0.15) * 1000;
    if (links.length === 1) {
      linksRevealDelayMs += 120;
    }

    return (
      <div ref={containerRef} className={`${cardClassName} ${colSpanClassName}`}>
        <a
          href={mainHref}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <motion.div
            className="relative w-full aspect-9/8 overflow-hidden rounded-xl mb-5"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={
              isInView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{
              type: "tween",
              duration: 1.5,
              ease: [0.22, 0.08, 0.28, 1],
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes={imageSizes}
              className={`rounded-xl object-cover transition-transform duration-300 ${cardClassName.includes("group") ? "group-hover:scale-[1.02]" : ""} ${imageObjectPosition ? "" : "object-center"}`}
              style={
                imageObjectPosition
                  ? { objectPosition: imageObjectPosition }
                  : undefined
              }
            />
          </motion.div>
          <div
            ref={isMobile ? textInViewRef : undefined}
            className={className}
          >
            <ScrollRevealWords
              observeRef={inViewObserveRef}
              threshold={inViewAmount}
              forceVisible={isInView}
              delayChildren={0.08}
              staggerChildren={0.058}
              transitionOverrides={{
                type: "tween",
                duration: 1.05,
                ease: [0.22, 0.08, 0.28, 1],
              }}
              lines={[
                {
                  as: "h3",
                  text: title,
                  className:
                    "cursor-default text-xl font-semibold text-white mb-2",
                },
                {
                  as: "p",
                  text: description,
                  className:
                    "cursor-default text-white/70 text-[15px] leading-relaxed",
                },
              ]}
            />
          </div>
        </a>
        <LinksRevealAfterDelay
          delayMs={linksRevealDelayMs}
          cardRef={containerRef}
          links={links}
          inViewAmount={inViewAmount}
          trigger={isInView}
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`${cardClassName} ${colSpanClassName}`}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={cardContainerVariants}
    >
      <a
        href={mainHref}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <motion.div
          variants={imageVariants}
          className="relative w-full aspect-9/8 overflow-hidden rounded-xl mb-5"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes={imageSizes}
            className={`rounded-xl object-cover transition-transform duration-300 ${cardClassName.includes("group") ? "group-hover:scale-[1.02]" : ""} ${imageObjectPosition ? "" : "object-center"}`}
            style={
              imageObjectPosition
                ? { objectPosition: imageObjectPosition }
                : undefined
            }
          />
        </motion.div>
        <div className={className}>
          <motion.div variants={itemVariants}>
            <AnimatedWords
              text={title}
              as="h3"
              className="cursor-default text-xl font-semibold text-white mb-2"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <AnimatedWords
              text={description}
              as="p"
              className="cursor-default text-white/70 text-[15px] leading-relaxed"
            />
          </motion.div>
        </div>
      </a>
      <motion.div
        variants={linksVariants(descriptionWordCount)}
        className="flex gap-4 mt-4"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0099ff] font-medium hover:underline"
          >
            {link.label}
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}
