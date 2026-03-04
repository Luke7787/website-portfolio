"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

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
      delayChildren: 0.18,
      staggerChildren: 0.12,
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

const textBlockVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

/** Same as itemVariants but with a delay so links appear after description word reveal. */
function linksVariants(descriptionWordCount: number) {
  const descriptionRevealDuration = descriptionWordCount * 0.06;
  const delay = 0.42 + descriptionRevealDuration + 0.35;
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
}: ScrollRevealCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const descriptionWordCount = description.split(/\s+/).length;

  return (
    <motion.div
      ref={ref}
      className={`${cardClassName} ${colSpanClassName}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardContainerVariants}
    >
      <a href={mainHref} target="_blank" rel="noopener noreferrer" className="block">
        <motion.div
          variants={itemVariants}
          className="relative w-full aspect-9/8 overflow-hidden rounded-xl mb-5"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes={imageSizes}
            className={`rounded-xl object-cover transition-transform duration-300 ${cardClassName.includes("group") ? "group-hover:scale-[1.02]" : ""} ${imageObjectPosition ? "" : "object-center"}`}
            style={imageObjectPosition ? { objectPosition: imageObjectPosition } : undefined}
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
      <motion.div variants={linksVariants(descriptionWordCount)} className="flex gap-4 mt-4">
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
