"use client";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiC,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiAxios,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGithub,
  SiRender,
  SiLinux,
  SiSharp,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiPostman,
  SiExpo,
  SiFigma,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbBrandAzure } from "react-icons/tb";
import NavBar from "@/components/layout/NavBar";
import AnimatedName from "@/components/effects/AnimatedName";
import TextScramble from "@/components/effects/TextScramble";
import ScrollRevealWords from "@/components/effects/ScrollRevealWords";
import ScrollRevealBlock from "@/components/effects/ScrollRevealBlock";
import ScrollRevealCard from "@/components/effects/ScrollRevealCard";
import VantaBirdsBackground from "@/components/effects/VantaBirdsBackground";
import { useMobileProjectSequentialGate } from "@/hooks/useMobileProjectSequentialGate";

// Skills: best icon per tech from react-icons only (Si = Simple Icons, Fa = Font Awesome, Tb = Tabler).
type IconComponent = (props: {
  className?: string;
  "aria-hidden"?: boolean;
}) => React.ReactNode;
type SkillEntry = { name: string; Icon: IconComponent };

const skillsMarqueeRow1: SkillEntry[] = [
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Python", Icon: SiPython },
  { name: "Java", Icon: SiOpenjdk },
  { name: "C", Icon: SiC },
  { name: "C++", Icon: SiCplusplus },
  { name: "React.js", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express.js", Icon: SiExpress },
];
const skillsMarqueeRow2: SkillEntry[] = [
  { name: "Prisma ORM", Icon: SiPrisma },
  { name: "Axios", Icon: SiAxios },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "AWS", Icon: FaAws },
  { name: "Azure", Icon: TbBrandAzure },
  { name: "Docker", Icon: SiDocker },
  { name: "GitHub", Icon: SiGithub },
  { name: "Render", Icon: SiRender },
  { name: "Linux", Icon: SiLinux },
];
const skillsMarqueeRow3: SkillEntry[] = [
  { name: "C#", Icon: SiSharp },
  { name: "HTML", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss },
  { name: "React Native", Icon: SiReact },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Postman", Icon: SiPostman },
  { name: "Expo", Icon: SiExpo },
  { name: "Figma", Icon: SiFigma },
];

function SkillIcon({ skill }: { skill: SkillEntry }) {
  return <skill.Icon className="w-5 h-5 shrink-0 text-white" aria-hidden />;
}

/** Mobile-only about: slideshow + arrows sooner; bio + lower block use same offset (desktop unchanged). */
const MOBILE_ABOUT_SLIDESHOW_DELAY_S = 0.42;
/** Additional pause after slideshow reveal before bio words start. */
const MOBILE_ABOUT_IMAGE_TO_BIO_DELAY_S = 0.56;
/** Mobile bio line begins after slideshow reveal + this extra pause. */
const MOBILE_ABOUT_DESC_DELAY_CHILDREN_S =
  MOBILE_ABOUT_SLIDESHOW_DELAY_S + MOBILE_ABOUT_IMAGE_TO_BIO_DELAY_S;
/** Word stagger for mobile bio line — keep in sync with `showLowerAbout` effect below. */
const MOBILE_ABOUT_DESC_STAGGER_CHILDREN_S = 0.05;
/** Per-word tween duration for mobile bio — keep in sync with `ScrollRevealWords` `transitionOverrides.duration`. */
const MOBILE_ABOUT_DESC_WORD_DURATION_S = 0.95;

// /** Clear “glass” pill — no backdrop-filter (blur was smearing the slide); translucent tint only */
// const SLIDESHOW_GLASS_BTN =
//   "z-10 absolute top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full " +
//   "border border-white/50 " +
//   "bg-gradient-to-b from-white/[0.38] to-white/[0.16] " +
//   "shadow-[0_4px_28px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(255,255,255,0.06)] " +
//   "text-white transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out " +
//   "hover:from-white/[0.48] hover:to-white/[0.22] hover:border-white/60 " +
//   "hover:shadow-[0_8px_36px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-1px_0_rgba(255,255,255,0.08)] " +
//   "motion-safe:hover:scale-[1.06] motion-safe:active:scale-[0.94] " +
//   "motion-reduce:hover:scale-100 motion-reduce:active:scale-100 " +
//   "active:from-white/[0.28] active:to-white/[0.12] active:border-white/45 " +
//   "active:shadow-[inset_0_2px_10px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.25)] " +
//   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 " +
//   "focus-visible:ring-offset-black/40 " +
//   "touch-manipulation select-none [-webkit-tap-highlight-color:transparent]";
//
// function SlideshowChevron({ dir }: { dir: "left" | "right" }) {
//   return (
//     <span
//       className="pointer-events-none flex h-full w-full items-center justify-center"
//       aria-hidden
//     >
//       <svg
//         className={`block h-[22px] w-[22px] shrink-0 opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] translate-y-px ${dir === "left" ? "-translate-x-[0.5px]" : "translate-x-[0.5px]"}`}
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth={2.25}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         {dir === "left" ? (
//           <path d="M15 18l-6-6 6-6" />
//         ) : (
//           <path d="M9 18l6-6-6-6" />
//         )}
//       </svg>
//     </span>
//   );
// }

// Slideshow Component (Added Only)
function Slideshow({
  revealDelay = 0.02,
  isMobile = false,
}: {
  revealDelay?: number;
  isMobile?: boolean;
}) {
  const slideshowRef = useRef<HTMLDivElement>(null);
  const slideshowInView = useInView(slideshowRef, { once: true, amount: 0.3 });
  const slides = [
    {
      type: "image",
      src: "/images/fishing.png",
      caption:
        "Taken in San Francisco Bay after catching my first striped bass October 7, 2017 (Age 16)",
    },
    {
      type: "image",
      src: "/images/about.jpg",
      caption:
        "Taken at Seattle’s iconic Space Needle during a family road trip September 10, 2022 (Age 20)",
    }, // fixed hero: Seattle / Space Needle — keep as slides[1] when re-enabling slideshow
    {
      type: "video",
      src: "/images/handstand.mp4",
      caption:
        "Taken at Cal Poly Rec, finally achieved my first headstand push up November 4, 2022 (Age 21)",
    },
    {
      type: "image",
      src: "/images/test.jpeg",
      caption:
        "Taken at Japantown, San Francisco, showing my girlfriend around June 17, 2023 (Age 21)",
    },
  ];

  // Slideshow cycling (commented — About uses fixed Seattle slide only)
  // const [index, setIndex] = useState(0);
  // const [hasChangedSlide, setHasChangedSlide] = useState(false);
  //
  // function next() {
  //   setHasChangedSlide(true);
  //   setIndex((prev) => (prev + 1) % slides.length);
  // }
  //
  // function prev() {
  //   setHasChangedSlide(true);
  //   setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  // }
  //
  // const current = slides[index];

  /** Seattle iconic (Space Needle) — same as slides[1] in the array above */
  const current = slides[1];

  return (
    <div ref={slideshowRef} className="relative">
      {/* Aspect Ratio Container — fade-in only (no y movement to prevent layout shifts) */}
      <motion.div
        initial={{
          opacity: 0,
          filter: "blur(10px)",
          y: isMobile ? 14 : 0,
        }}
        animate={
          slideshowInView
            ? { opacity: 1, filter: "blur(0px)", y: 0 }
            : { opacity: 0, filter: "blur(10px)", y: isMobile ? 14 : 0 }
        }
        transition={{
          delay: revealDelay,
          type: "spring",
          stiffness: 65,
          damping: 24,
        }}
      >
        <div className="relative w-full aspect-square overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {current.type === "image" ? (
              <motion.div
                key={current.src}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.src}
                  alt="Luke Zhuang"
                  fill
                  className="
                    rounded-lg
                    border-2
                    border-white
                    shadow-lg
                    object-cover
                  "
                />
              </motion.div>
            ) : (
              <motion.div
                key={current.src}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0 }}
                className="absolute inset-0"
              >
                <video
                  src={current.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    rounded-lg
                    border-2
                    border-white
                    shadow-lg
                    object-cover
                  "
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/*
      Caption — ScrollRevealWords on first view, plain text after slide change
      {hasChangedSlide ? (
        <p className="mt-4 cursor-default text-[13.75px] md:text-sm text-white/70 tracking-[0.03em] text-justify md:text-center">
          {current.caption}
        </p>
      ) : (
        <ScrollRevealWords
          className="mt-4"
          threshold={0.45}
          delayChildren={revealDelay + 0.08}
          staggerChildren={0.058}
          transitionOverrides={{
            type: "tween",
            duration: 1.05,
            ease: [0.22, 0.08, 0.28, 1],
          }}
          lines={[
            {
              as: "p",
              text: current.caption,
              className:
                "cursor-default text-[13.75px] md:text-sm text-white/70 tracking-[0.03em] text-justify md:text-center",
            },
          ]}
        />
      )}
      */}

      {/*
      Arrows — ScrollRevealBlock words-style; mobile uses disableTranslateY to avoid layout jump
      <div className="absolute inset-0">
        <ScrollRevealBlock
          animationStyle="words"
          delay={revealDelay + 0.02}
          amount={0.3}
          margin="0px"
          disableTranslateY={isMobile}
          transitionOverrides={{ stiffness: 65, damping: 24 }}
          className="absolute inset-0"
        >
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className={`left-4 ${SLIDESHOW_GLASS_BTN}`}
          >
            <SlideshowChevron dir="left" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className={`right-4 ${SLIDESHOW_GLASS_BTN}`}
          >
            <SlideshowChevron dir="right" />
          </button>
        </ScrollRevealBlock>
      </div>
      */}
    </div>
  );
}

export default function Page() {
  const [birdsVisible, setBirdsVisible] = useState(false);
  const [contactBirdsVisible, setContactBirdsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileContactBirds, setMobileContactBirds] = useState(false);
  const [showLowerAbout, setShowLowerAbout] = useState(false);
  const [copiedField, setCopiedField] = useState<
    "email" | "phone" | "contactEmail" | null
  >(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const copyFeedbackTimeoutRef = useRef<number | null>(null);
  const footerInView = useInView(footerRef, { once: true, amount: 0.3 });
  const aboutSectionInView = useInView(aboutSectionRef, {
    once: true,
    amount: 0.08,
  });
  const aboutInView = useInView(aboutTextRef, { once: true, amount: 0.45 });
  /** Single source for resume timing: mobile must not re-run when `aboutInView` flips later (resets timeout). */
  const aboutRevealReady = isMobile ? aboutSectionInView : aboutInView;

  const {
    openGate: mobileProjectOpenGate,
    onSequenceStart: mobileProjectOnSequenceStart,
    setRawAt: mobileProjectSetRawAt,
  } = useMobileProjectSequentialGate(isMobile);

  const reportMobileProjectRaw = useCallback(
    (index: number, visible: boolean) => {
      mobileProjectSetRawAt?.(index, visible);
    },
    [mobileProjectSetRawAt],
  );
  const onMobileProjectSequentialRaw0 = useCallback(
    (v: boolean) => reportMobileProjectRaw(0, v),
    [reportMobileProjectRaw],
  );
  const onMobileProjectSequentialRaw1 = useCallback(
    (v: boolean) => reportMobileProjectRaw(1, v),
    [reportMobileProjectRaw],
  );
  const onMobileProjectSequentialRaw2 = useCallback(
    (v: boolean) => reportMobileProjectRaw(2, v),
    [reportMobileProjectRaw],
  );
  const onMobileProjectSequentialRaw3 = useCallback(
    (v: boolean) => reportMobileProjectRaw(3, v),
    [reportMobileProjectRaw],
  );
  const onMobileProjectSequentialRaw4 = useCallback(
    (v: boolean) => reportMobileProjectRaw(4, v),
    [reportMobileProjectRaw],
  );
  const onMobileProjectSequentialRaw5 = useCallback(
    (v: boolean) => reportMobileProjectRaw(5, v),
    [reportMobileProjectRaw],
  );

  const aboutLowerMotionSpring = isMobile
    ? { type: "spring" as const, stiffness: 52, damping: 22, mass: 1.12 }
    : { type: "spring" as const, stiffness: 65, damping: 24, mass: 0.9 };

  // Desktop: keep a single scroll-to-top on mount (unchanged behavior).
  // Mobile: Safari/Chrome often re-apply scroll restoration after useEffect; see mobile useLayoutEffect below.
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      window.scrollTo(0, 0);
    }
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;
    const prevRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const goTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    goTop();
    requestAnimationFrame(goTop);
    const t0 = window.setTimeout(goTop, 0);
    const t1 = window.setTimeout(goTop, 50);
    const t2 = window.setTimeout(goTop, 200);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      history.scrollRestoration = prevRestoration;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setBirdsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!footerInView || !isMobile) return;
    const timer = setTimeout(() => setMobileContactBirds(true), 2500);
    return () => clearTimeout(timer);
  }, [footerInView, isMobile]);

  // About section: when to show resume → icons → email/phone (`forceVisible`).
  // Mobile uses section visibility for stable sequencing regardless of slow scroll.
  useEffect(() => {
    if (!aboutRevealReady) return;
    const paragraphWordCount =
      "I'm a software engineer with a passion for building websites. I'm constantly seeking new challenges to expand my skills and knowledge.".split(
        /\s+/,
      ).length;
    const staggerBeforeParagraph = isMobile ? 0 : 2 * 0.058;
    const mobileExtraDelay = isMobile ? MOBILE_ABOUT_DESC_DELAY_CHILDREN_S : 0;
    const paragraphStagger = isMobile
      ? MOBILE_ABOUT_DESC_STAGGER_CHILDREN_S
      : 0.058;
    const resumeThroughPhoneLeadMs = 1040; // mobile only: pull-forward vs estimated bio end (higher = resume line sooner)
    const delayMs = isMobile
      ? Math.max(
          0,
          Math.round(
            (mobileExtraDelay +
              0.04 +
              (paragraphWordCount - 1) * paragraphStagger +
              MOBILE_ABOUT_DESC_WORD_DURATION_S +
              0.02) *
              1000 -
              resumeThroughPhoneLeadMs,
          ),
        )
      : Math.max(
          0,
          Math.round(
            (0.08 +
              staggerBeforeParagraph +
              (paragraphWordCount - 1) * paragraphStagger +
              0.15) *
              1000,
          ),
        );
    const t = setTimeout(() => setShowLowerAbout(true), Math.round(delayMs));
    return () => clearTimeout(t);
  }, [aboutRevealReady, isMobile]);

  useEffect(() => {
    return () => {
      if (copyFeedbackTimeoutRef.current !== null) {
        window.clearTimeout(copyFeedbackTimeoutRef.current);
      }
    };
  }, []);

  const copyText = async (
    value: string,
    field: "email" | "phone" | "contactEmail",
  ) => {
    if (typeof navigator === "undefined") return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedField(field);
    if (copyFeedbackTimeoutRef.current !== null) {
      window.clearTimeout(copyFeedbackTimeoutRef.current);
    }
    copyFeedbackTimeoutRef.current = window.setTimeout(() => {
      setCopiedField((prev) => (prev === field ? null : prev));
      copyFeedbackTimeoutRef.current = null;
    }, 1400);
  };

  return (
    <main className="relative">
      <NavBar />

      {/* HOME */}
      <section
        id="home"
        className="relative scroll-mt-16 min-h-screen pt-16 flex items-center justify-center overflow-hidden"
      >
        <VantaBirdsBackground visible={birdsVisible} />
        <div className="relative z-10 text-center -translate-y-26 md:translate-y-0">
          <TextScramble
            text="HELLO! MY NAME IS"
            className="mb-1 cursor-default text-[20px] tracking-[0.8px] text-[rgb(140,140,140)]"
          />

          <AnimatedName>
            <h1
              className="
                text-[40px]
                font-bold
                tracking-[3.2px]
                text-white/90
                drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]
                opacity-0
                animate-[revealText_0.65s_ease-in-out_0.65s_forwards]
                transition-colors
                duration-300
              "
              style={{ cursor: "default" }}
            >
              LUKE ZHUANG
            </h1>
          </AnimatedName>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        ref={aboutSectionRef}
        className="scroll-mt-16 md:scroll-mt-34 min-h-screen pt-16 pb-24 md:pb-0 flex"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2 pt-[11vh] md:pt-[8vh]">
          {/* Left: Image (Now Slideshow, styles untouched) */}
          <div className="flex justify-center md:justify-end">
            <div
              className="
                w-80
                sm:w-84
                md:w-100
                lg:w-116
                md:-translate-x-12
              "
            >
              <Slideshow
                revealDelay={isMobile ? MOBILE_ABOUT_SLIDESHOW_DELAY_S : 0.02}
                isMobile={isMobile}
              />
            </div>
          </div>

          {/* Right: Text */}
          <div
            ref={aboutTextRef}
            className="
              text-center
              md:text-left
              self-start
              md:-translate-y-6
              md:-translate-x-16
            "
          >
            {/* Mobile: separate animations for each element */}
            <div className="md:hidden">
              <ScrollRevealWords
                className=""
                forceVisible={aboutSectionInView}
                threshold={0.15}
                delayChildren={0.08}
                staggerChildren={0.058}
                transitionOverrides={{
                  type: "tween",
                  duration: 1.05,
                  ease: [0.22, 0.08, 0.28, 1],
                }}
                lines={[
                  {
                    as: "p",
                    text: "ABOUT",
                    className:
                      "relative -top-[1mm] block cursor-default font-['League Spartan','Arial','sans-serif'] text-[90px] sm:text-[110px] font-black uppercase leading-none tracking-[0.6px] text-[rgba(255,255,255,0.15)] [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)] -translate-y-115",
                  },
                ]}
              />
              <ScrollRevealWords
                className=""
                forceVisible={aboutSectionInView}
                threshold={0.45}
                delayChildren={MOBILE_ABOUT_DESC_DELAY_CHILDREN_S}
                staggerChildren={MOBILE_ABOUT_DESC_STAGGER_CHILDREN_S}
                transitionOverrides={{
                  type: "tween",
                  duration: MOBILE_ABOUT_DESC_WORD_DURATION_S,
                  ease: [0.22, 0.08, 0.28, 1],
                }}
                lines={[
                  {
                    as: "p",
                    text: "I'm a software engineer with a passion for building websites. I'm constantly seeking new challenges to expand my skills and knowledge.",
                    className:
                      "mt-5 cursor-default max-w-[320px] sm:max-w-sm text-[1rem] sm:text-[1.05rem] font-medium leading-[1.6] tracking-[0.03em] text-white/80 text-justify -translate-y-30",
                  },
                ]}
              />
            </div>
            {/* Desktop: single staggered animation */}
            <div className="hidden md:block">
              <ScrollRevealWords
                className=""
                threshold={0.45}
                delayChildren={0.08}
                staggerChildren={0.058}
                transitionOverrides={{
                  type: "tween",
                  duration: 1.05,
                  ease: [0.22, 0.08, 0.28, 1],
                }}
                lines={[
                  {
                    as: "p",
                    text: "ABOUT",
                    className:
                      "block cursor-default font-['League Spartan','Arial','sans-serif'] lg:text-[150px] font-black uppercase leading-none tracking-[0.6px] text-[rgba(255,255,255,0.15)] [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]",
                  },
                  {
                    as: "h2",
                    text: "Hi! I'm Luke Zhuang",
                    className:
                      "cursor-default block mt-2 text-[1.8rem] font-medium tracking-[0.05em] text-white md:translate-x-19 md:-translate-y-22",
                  },
                  {
                    as: "p",
                    text: "I'm a software engineer with a passion for building websites. I'm constantly seeking new challenges to expand my skills and knowledge.",
                    className:
                      "mt-5 cursor-default md:max-w-md md:text-[1.125rem] font-medium md:leading-[1.75] tracking-[0.03em] text-white/80 text-justify md:translate-x-19 md:-translate-y-13",
                  },
                ]}
              />
            </div>
            <ScrollRevealWords
              className=""
              forceVisible={showLowerAbout}
              threshold={0.1}
              delayChildren={isMobile ? 0.04 : 0}
              staggerChildren={isMobile ? 0.12 : 0.092}
              transitionOverrides={{
                type: "tween",
                duration: isMobile ? 1.05 : 1.15,
                ease: isMobile
                  ? ([0.22, 0.08, 0.28, 1] as const)
                  : ([0.33, 0.1, 0.2, 1] as const),
              }}
              lines={[
                {
                  as: "a",
                  text: "Check out my resume",
                  href: "/LukeResume2026.pdf",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className:
                    "block mt-1 md:mt-4 text-[1.125rem] font-medium text-[#1E90FF] hover:underline transition-colors duration-200 -translate-y-25 md:translate-x-19 md:-translate-y-10 cursor-pointer",
                },
                {
                  as: "custom",
                  className:
                    "mt-9 md:mt-6 flex justify-center md:justify-start gap-4 md:translate-x-19 md:-translate-y-7 -translate-y-28",
                  content: (
                    <motion.div
                      className="flex justify-center md:justify-start gap-4"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: isMobile ? 0.09 : 0.1,
                            delayChildren: isMobile ? 0.03 : 0,
                          },
                        },
                      }}
                    >
                      {[
                        {
                          href: "https://github.com/Luke7787",
                          icon: "fab fa-github",
                        },
                        {
                          href: "https://www.linkedin.com/in/zhuangluke/",
                          icon: "fab fa-linkedin",
                        },
                        {
                          href: "https://www.instagram.com/lukez7787/",
                          icon: "fab fa-instagram",
                        },
                      ].map((item) => (
                        <motion.span
                          key={item.href}
                          variants={{
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
                              transition: aboutLowerMotionSpring,
                            },
                          }}
                          style={{ display: "inline-block" }}
                        >
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 transition-all duration-300 hover:scale-110"
                          >
                            <i
                              className={`${item.icon} text-[30px] text-[#1B76D2] transition-colors duration-300 group-hover:text-white ${
                                item.icon.includes("instagram")
                                  ? "[-webkit-text-stroke:0.65px_currentColor] [paint-order:stroke_fill]"
                                  : ""
                              }`}
                            />
                          </a>
                        </motion.span>
                      ))}
                    </motion.div>
                  ),
                },
                {
                  as: "custom",
                  className:
                    "mt-4 max-w-md space-y-2 text-[1rem] font-medium leading-[1.6] tracking-[0.03em] md:translate-x-19 md:-translate-y-2.25 -translate-y-22",
                  content: (
                    <motion.div
                      className="space-y-2"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: isMobile ? 0.07 : 0.08,
                            delayChildren: isMobile ? 0.04 : 0,
                          },
                        },
                      }}
                    >
                      <motion.p
                        className="m-0"
                        variants={{
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
                            transition: aboutLowerMotionSpring,
                          },
                        }}
                        style={{ display: "block" }}
                      >
                        <motion.span
                          variants={{
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
                              transition: aboutLowerMotionSpring,
                            },
                          }}
                          style={{ display: "inline-block" }}
                          className="cursor-default text-[#8c8c8c]"
                        >
                          Email:
                        </motion.span>{" "}
                        <motion.button
                          type="button"
                          onClick={() =>
                            copyText("lukewzhuang@gmail.com", "email")
                          }
                          aria-label="Copy email address"
                          title="Copy email"
                          variants={{
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
                              transition: aboutLowerMotionSpring,
                            },
                          }}
                          style={{ display: "inline-block" }}
                          className="text-[#1E90FF] hover:underline transition-colors duration-200 cursor-pointer bg-transparent p-0"
                        >
                          lukewzhuang@gmail.com
                        </motion.button>
                        <AnimatePresence initial={false}>
                          {copiedField === "email" ? (
                            <motion.span
                              key="email-copied"
                              initial={{
                                opacity: 0,
                                y: 8,
                                scale: 0.92,
                                filter: "blur(6px)",
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: "blur(0px)",
                              }}
                              exit={{
                                opacity: 0,
                                y: -4,
                                scale: 0.98,
                                filter: "blur(4px)",
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 320,
                                damping: 24,
                                mass: 0.75,
                              }}
                              className="ml-2 inline-flex items-center gap-1 rounded-full border border-[#1E90FF]/35 bg-[#1E90FF]/12 px-2 py-0.5 align-middle text-[0.72rem] font-medium tracking-[0.02em] text-[#b9ddff] shadow-[0_0_14px_rgba(30,144,255,0.2)]"
                            >
                              <i
                                aria-hidden
                                className="fa-regular fa-clipboard text-[0.68rem] text-[#7ec0ff]"
                              />
                              Copied to Clipboard
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </motion.p>
                      <motion.p
                        className="m-0"
                        variants={{
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
                            transition: aboutLowerMotionSpring,
                          },
                        }}
                        style={{ display: "block" }}
                      >
                        <motion.span
                          variants={{
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
                              transition: aboutLowerMotionSpring,
                            },
                          }}
                          style={{ display: "inline-block" }}
                          className="cursor-default text-[#8c8c8c]"
                        >
                          Phone:
                        </motion.span>{" "}
                        <motion.button
                          type="button"
                          onClick={() => copyText("(415) 837-8686", "phone")}
                          aria-label="Copy phone number"
                          title="Copy phone number"
                          variants={{
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
                              transition: aboutLowerMotionSpring,
                            },
                          }}
                          style={{ display: "inline-block" }}
                          className="text-[#1E90FF] hover:underline transition-colors duration-200 cursor-pointer bg-transparent p-0"
                        >
                          (415) 837-8686
                        </motion.button>
                        <AnimatePresence initial={false}>
                          {copiedField === "phone" ? (
                            <motion.span
                              key="phone-copied"
                              initial={{
                                opacity: 0,
                                y: 8,
                                scale: 0.92,
                                filter: "blur(6px)",
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: "blur(0px)",
                              }}
                              exit={{
                                opacity: 0,
                                y: -4,
                                scale: 0.98,
                                filter: "blur(4px)",
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 320,
                                damping: 24,
                                mass: 0.75,
                              }}
                              className="ml-2 inline-flex items-center gap-1 rounded-full border border-[#1E90FF]/35 bg-[#1E90FF]/12 px-2 py-0.5 align-middle text-[0.72rem] font-medium tracking-[0.02em] text-[#b9ddff] shadow-[0_0_14px_rgba(30,144,255,0.2)]"
                            >
                              <i
                                aria-hidden
                                className="fa-regular fa-clipboard text-[0.68rem] text-[#7ec0ff]"
                              />
                              Copied to Clipboard
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </motion.p>
                    </motion.div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* PROJECTS — Framer-style card grid */}
      <section
        id="projects"
        className="scroll-mt-2 md:scroll-mt-16 min-h-screen pt-24 md:pt-16 pb-24 md:pb-32 flex items-start md:items-center justify-center"
      >
        <div className="w-full max-w-6xl mx-auto px-6">
          <ScrollRevealWords
            className="text-center mb-16"
            threshold={isMobile ? 0.8 : 0.45}
            margin={isMobile ? "0px 0px -300px 0px" : undefined}
            delayChildren={0.08}
            staggerChildren={0.058}
            transitionOverrides={{
              type: "tween",
              duration: 1.05,
              ease: [0.22, 0.08, 0.28, 1],
            }}
            lines={[
              {
                as: "p",
                text: "PORTFOLIO",
                className:
                  "mb-2 cursor-default text-[20px] tracking-[0.8px] text-[rgb(140,140,140)]",
              },
              {
                as: "h2",
                text: "Featured Projects",
                className:
                  "cursor-default text-3xl md:text-4xl font-bold tracking-[0.12em] text-white/90",
              },
            ]}
          />

          {/* First three projects reveal together; project 4 reveals when scrolled into view */}
          <div className="flex flex-wrap gap-8 lg:gap-10">
            <ScrollRevealBlock
              animationStyle="words"
              delay={0.35}
              amount={isMobile ? 0.075 : 0.2}
              transitionOverrides={{ stiffness: 24, damping: 24, mass: 1.2 }}
              className="flex flex-wrap gap-8 lg:gap-10 w-full"
            >
              <div className="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-5rem)/3)]">
                <ScrollRevealCard
                  imageSrc="/images/showroom-booking.jpg"
                  imageAlt="Showroom Booking App"
                  imageObjectFit="cover"
                  imageObjectPosition="top center"
                  title="Showroom Booking App"
                  description="Full-stack appointment scheduling with Next.js, TypeScript, Prisma, and PostgreSQL. Book visits and manage availability with admin control."
                  mainHref="https://showroom-appointment-scheduler.onrender.com/"
                  links={[
                    {
                      label: "Live Site",
                      href: "https://showroom-appointment-scheduler.onrender.com/",
                    },
                    {
                      label: "GitHub",
                      href: "https://github.com/Luke7787/showroom-appointment-scheduler",
                    },
                  ]}
                  cardClassName="group opacity-100 transition-all duration-500 ease-out"
                  disableReveal
                  sequentialIndex={isMobile ? 0 : undefined}
                  sequentialOpenGate={
                    isMobile ? mobileProjectOpenGate : undefined
                  }
                  onSequentialStart={
                    isMobile ? mobileProjectOnSequenceStart : undefined
                  }
                  onSequentialRaw={
                    isMobile ? onMobileProjectSequentialRaw0 : undefined
                  }
                />
              </div>

              <div className="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-5rem)/3)]">
                <ScrollRevealCard
                  imageSrc="/images/project2.png"
                  imageAlt="Inventory Management Platform"
                  title="Inventory Management Platform"
                  description="Full-stack inventory app with React, TypeScript, Node.js, and MongoDB. View, add, update, and manage inventory through a responsive interface."
                  mainHref="https://delightful-wave-0026bfa0f.7.azurestaticapps.net"
                  links={[
                    {
                      label: "Live Site",
                      href: "https://delightful-wave-0026bfa0f.7.azurestaticapps.net",
                    },
                    {
                      label: "GitHub",
                      href: "https://github.com/Luke7787/ImmaculateInventors",
                    },
                  ]}
                  cardClassName="group opacity-100 transition-all duration-500 ease-out"
                  disableReveal
                  sequentialIndex={isMobile ? 1 : undefined}
                  sequentialOpenGate={
                    isMobile ? mobileProjectOpenGate : undefined
                  }
                  onSequentialStart={
                    isMobile ? mobileProjectOnSequenceStart : undefined
                  }
                  onSequentialRaw={
                    isMobile ? onMobileProjectSequentialRaw1 : undefined
                  }
                />
              </div>

              <div className="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-5rem)/3)]">
                <ScrollRevealCard
                  imageSrc="/images/project3.png"
                  imageAlt="Blackjack game"
                  imageObjectPosition="center 5%"
                  title="Blackjack"
                  description="Blackjack built with JavaScript, HTML5, and CSS. Split, double down, Blackjack payouts, and responsive UI for play on any device."
                  mainHref="https://luke7787.github.io/Blackjack/"
                  links={[
                    {
                      label: "Live Site",
                      href: "https://luke7787.github.io/Blackjack/",
                    },
                    {
                      label: "GitHub",
                      href: "https://github.com/Luke7787/Blackjack",
                    },
                  ]}
                  cardClassName="group opacity-100 transition-all duration-500 ease-out"
                  disableReveal
                  linksInViewAmount={isMobile ? undefined : 0.2}
                  inViewStableMs={isMobile ? undefined : 120}
                  sequentialIndex={isMobile ? 2 : undefined}
                  sequentialOpenGate={
                    isMobile ? mobileProjectOpenGate : undefined
                  }
                  onSequentialStart={
                    isMobile ? mobileProjectOnSequenceStart : undefined
                  }
                  onSequentialRaw={
                    isMobile ? onMobileProjectSequentialRaw2 : undefined
                  }
                />
              </div>
            </ScrollRevealBlock>

            <ScrollRevealBlock
              animationStyle="words"
              delay={0.75}
              amount={isMobile ? 0.075 : 0.2}
              minVisibleMs={220}
              transitionOverrides={{ stiffness: 24, damping: 24, mass: 1.2 }}
              className="flex flex-wrap gap-8 lg:gap-10 w-full"
            >
              <div className="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-5rem)/3)]">
                <ScrollRevealCard
                  imageSrc="/images/project5.png"
                  imageAlt="Tutoring business website"
                  imageObjectFit="cover"
                  imageObjectPosition="top center"
                  title="Tutoring Business Website"
                  description="Responsive tutoring website built with HTML and CSS. Showcases services, pricing, policies, and contact information through a clean design."
                  mainHref="https://luke7787.github.io/tutoring/"
                  links={[
                    {
                      label: "Live Site",
                      href: "https://luke7787.github.io/tutoring/",
                    },
                    {
                      label: "GitHub",
                      href: "https://github.com/Luke7787/tutoring",
                    },
                  ]}
                  cardClassName="group opacity-100 transition-all duration-500 ease-out"
                  disableReveal
                  sequentialIndex={isMobile ? 3 : undefined}
                  sequentialOpenGate={
                    isMobile ? mobileProjectOpenGate : undefined
                  }
                  onSequentialStart={
                    isMobile ? mobileProjectOnSequenceStart : undefined
                  }
                  onSequentialRaw={
                    isMobile ? onMobileProjectSequentialRaw3 : undefined
                  }
                />
              </div>

              <div className="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-5rem)/3)]">
                <ScrollRevealCard
                  imageSrc="/images/chat-app.png"
                  imageAlt="Real-Time Chat Application"
                  imageObjectFit="contain"
                  imageBackdropFill
                  imageForegroundScale={1.1}
                  title="Real-Time Chat Application"
                  description="Full-stack messaging platform with Socket.io, user authentication, online status, image sharing, persistent chat history, and customizable themes."
                  mainHref="https://chat-app-7v3r.onrender.com/login"
                  links={[
                    {
                      label: "Live Site",
                      href: "https://chat-app-7v3r.onrender.com/login",
                    },
                    {
                      label: "GitHub",
                      href: "https://github.com/Luke7787/chat-app",
                    },
                  ]}
                  cardClassName="group opacity-100 transition-all duration-500 ease-out"
                  disableReveal
                  sequentialIndex={isMobile ? 4 : undefined}
                  sequentialOpenGate={
                    isMobile ? mobileProjectOpenGate : undefined
                  }
                  onSequentialStart={
                    isMobile ? mobileProjectOnSequenceStart : undefined
                  }
                  onSequentialRaw={
                    isMobile ? onMobileProjectSequentialRaw4 : undefined
                  }
                />
              </div>

              <div className="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-5rem)/3)]">
                <ScrollRevealCard
                  imageSrc="/images/project4.png"
                  imageAlt="Server and Client webserver"
                  title="Server and Client"
                  description="Concurrent web server in C implementing a subset of HTTP. Handles multiple clients via forked processes for parallel request processing."
                  mainHref="https://github.com/Luke7787/Server-and-Client"
                  links={[
                    {
                      label: "GitHub",
                      href: "https://github.com/Luke7787/Server-and-Client",
                    },
                  ]}
                  cardClassName="group opacity-100 transition-all duration-500 ease-out"
                  disableReveal
                  sequentialIndex={isMobile ? 5 : undefined}
                  sequentialOpenGate={
                    isMobile ? mobileProjectOpenGate : undefined
                  }
                  onSequentialStart={
                    isMobile ? mobileProjectOnSequenceStart : undefined
                  }
                  onSequentialRaw={
                    isMobile ? onMobileProjectSequentialRaw5 : undefined
                  }
                />
              </div>
            </ScrollRevealBlock>
          </div>
        </div>
      </section>

      {/* SKILLS — Framer-style cards (icon + text), two rows scrolling with fade */}
      <section
        id="skills"
        className="-scroll-mt-20 md:scroll-mt-0 mt-20 pt-28 pb-24 flex flex-col items-center justify-center bg-[#141414] text-white rounded-[90px] overflow-hidden"
      >
        <div className="w-full mb-12">
          <ScrollRevealWords
            className="text-center"
            threshold={0.6}
            delayChildren={0.25}
            staggerChildren={0.08}
            transitionOverrides={{
              type: "spring",
              stiffness: 42,
              damping: 22,
              mass: 1.1,
            }}
            lines={[
              {
                as: "p",
                text: "EXPERTISE",
                className:
                  "mb-2 cursor-default text-[20px] tracking-[0.8px] text-[rgb(140,140,140)]",
              },
              {
                as: "h2",
                text: "Technical Skills",
                className:
                  "cursor-default text-3xl md:text-4xl font-bold tracking-[0.12em] text-white/90",
              },
            ]}
          />
        </div>

        {/* Row 1: scroll left — cards with icon + label; two equal-width copies for seamless loop */}
        <div className="flex flex-col gap-6 py-4 w-full">
          <ScrollRevealBlock
            animationStyle="words"
            delay={0.25}
            amount={0.6}
            margin="0px 0px 0px 0px"
            transitionOverrides={{ stiffness: 42, damping: 22, mass: 1.1 }}
          >
            <div
              className="w-full flex items-center overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)",
              }}
            >
              <ul className="flex list-none m-0 p-0 relative w-max skill-marquee-left">
                <li className="flex items-center gap-3 md:gap-4 shrink-0">
                  {skillsMarqueeRow1.map((skill, i) => (
                    <div key={`row1-a-${i}`} className="shrink-0">
                      <div className="skill-card-border shrink-0">
                        <div className="shrink-0 flex items-center justify-center gap-2 md:gap-3 rounded-[18px] md:rounded-[23px] bg-[#121212] px-3 md:px-4 py-1.5 md:py-2.5 min-h-[40px] md:min-h-[52px] w-[155px] md:w-[200px] transition-colors duration-200 hover:bg-[#171717]">
                          <div className="shrink-0 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center">
                            <SkillIcon skill={skill} />
                          </div>
                          <h3 className="text-white text-sm md:text-lg font-medium tracking-[-0.02em] leading-tight m-0 truncate">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                  <span className="shrink-0 w-0 block" aria-hidden />
                </li>
                <li
                  className="flex items-center gap-3 md:gap-4 shrink-0"
                  aria-hidden
                >
                  {skillsMarqueeRow1.map((skill, i) => (
                    <div key={`row1-b-${i}`} className="shrink-0">
                      <div className="skill-card-border shrink-0">
                        <div className="shrink-0 flex items-center justify-center gap-2 md:gap-3 rounded-[18px] md:rounded-[23px] bg-[#121212] px-3 md:px-4 py-1.5 md:py-2.5 min-h-[40px] md:min-h-[52px] w-[155px] md:w-[200px] transition-colors duration-200 hover:bg-[#171717]">
                          <div className="shrink-0 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center">
                            <SkillIcon skill={skill} />
                          </div>
                          <h3 className="text-white text-sm md:text-lg font-medium tracking-[-0.02em] leading-tight m-0 truncate">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                  <span className="shrink-0 w-0 block" aria-hidden />
                </li>
              </ul>
            </div>
          </ScrollRevealBlock>

          {/* Row 2: scroll right — two equal-width copies for seamless loop */}
          <ScrollRevealBlock
            animationStyle="words"
            delay={0.5}
            amount={0.6}
            margin="0px 0px 0px 0px"
            transitionOverrides={{ stiffness: 42, damping: 22, mass: 1.1 }}
          >
            <div
              className="w-full flex items-center overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)",
              }}
            >
              <ul className="flex list-none m-0 p-0 relative w-max skill-marquee-right">
                <li className="flex items-center gap-3 md:gap-4 shrink-0">
                  {skillsMarqueeRow2.map((skill, i) => (
                    <div key={`row2-a-${i}`} className="shrink-0">
                      <div className="skill-card-border shrink-0">
                        <div className="shrink-0 flex items-center justify-center gap-2 md:gap-3 rounded-[18px] md:rounded-[23px] bg-[#121212] px-3 md:px-4 py-1.5 md:py-2.5 min-h-[40px] md:min-h-[52px] w-[155px] md:w-[200px] transition-colors duration-200 hover:bg-[#171717]">
                          <div className="shrink-0 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center">
                            <SkillIcon skill={skill} />
                          </div>
                          <h3 className="text-white text-sm md:text-lg font-medium tracking-[-0.02em] leading-tight m-0 truncate">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                  <span className="shrink-0 w-0 block" aria-hidden />
                </li>
                <li
                  className="flex items-center gap-3 md:gap-4 shrink-0"
                  aria-hidden
                >
                  {skillsMarqueeRow2.map((skill, i) => (
                    <div key={`row2-b-${i}`} className="shrink-0">
                      <div className="skill-card-border shrink-0">
                        <div className="shrink-0 flex items-center justify-center gap-2 md:gap-3 rounded-[18px] md:rounded-[23px] bg-[#121212] px-3 md:px-4 py-1.5 md:py-2.5 min-h-[40px] md:min-h-[52px] w-[155px] md:w-[200px] transition-colors duration-200 hover:bg-[#171717]">
                          <div className="shrink-0 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center">
                            <SkillIcon skill={skill} />
                          </div>
                          <h3 className="text-white text-sm md:text-lg font-medium tracking-[-0.02em] leading-tight m-0 truncate">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                  <span className="shrink-0 w-0 block" aria-hidden />
                </li>
              </ul>
            </div>
          </ScrollRevealBlock>

          {/* Row 3: scroll left — C#, HTML, CSS, React Native, Tailwind, Postman, Expo, Figma */}
          <ScrollRevealBlock
            animationStyle="words"
            delay={0.75}
            amount={0.6}
            margin="0px 0px 0px 0px"
            transitionOverrides={{ stiffness: 42, damping: 22, mass: 1.1 }}
          >
            <div
              className="w-full flex items-center overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)",
              }}
            >
              <ul className="flex list-none m-0 p-0 relative w-max skill-marquee-left-alt">
                <li className="flex items-center gap-3 md:gap-4 shrink-0">
                  {skillsMarqueeRow3.map((skill, i) => (
                    <div key={`row3-a-${i}`} className="shrink-0">
                      <div className="skill-card-border shrink-0">
                        <div className="shrink-0 flex items-center justify-center gap-2 md:gap-3 rounded-[18px] md:rounded-[23px] bg-[#121212] px-3 md:px-4 py-1.5 md:py-2.5 min-h-[40px] md:min-h-[52px] w-[155px] md:w-[200px] transition-colors duration-200 hover:bg-[#171717]">
                          <div className="shrink-0 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center">
                            <SkillIcon skill={skill} />
                          </div>
                          <h3 className="text-white text-sm md:text-lg font-medium tracking-[-0.02em] leading-tight m-0 truncate">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                  <span className="shrink-0 w-0 block" aria-hidden />
                </li>
                <li
                  className="flex items-center gap-3 md:gap-4 shrink-0"
                  aria-hidden
                >
                  {skillsMarqueeRow3.map((skill, i) => (
                    <div key={`row3-b-${i}`} className="shrink-0">
                      <div className="skill-card-border shrink-0">
                        <div className="shrink-0 flex items-center justify-center gap-2 md:gap-3 rounded-[18px] md:rounded-[23px] bg-[#121212] px-3 md:px-4 py-1.5 md:py-2.5 min-h-[40px] md:min-h-[52px] w-[155px] md:w-[200px] transition-colors duration-200 hover:bg-[#171717]">
                          <div className="shrink-0 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center">
                            <SkillIcon skill={skill} />
                          </div>
                          <h3 className="text-white text-sm md:text-lg font-medium tracking-[-0.02em] leading-tight m-0 truncate">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                  <span className="shrink-0 w-0 block" aria-hidden />
                </li>
              </ul>
            </div>
          </ScrollRevealBlock>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        ref={contactRef}
        className="relative -scroll-mt-25 min-h-screen pt-0 flex items-center justify-center overflow-hidden"
      >
        <VantaBirdsBackground
          visible={mobileContactBirds || contactBirdsVisible}
        />
        <div className="relative z-10 text-center">
          <ScrollRevealWords
            className="text-center"
            threshold={0.45}
            delayChildren={isMobile ? 0 : 0.18}
            staggerChildren={isMobile ? 0 : 0.12}
            transitionOverrides={
              isMobile
                ? { type: "spring", stiffness: 82, damping: 26, mass: 0.8 }
                : undefined
            }
            lines={[
              {
                as: "p",
                text: "Let's Connect",
                className:
                  "cursor-default text-[1.5rem] font-bold tracking-[0.03em] text-[rgb(140,140,140)]",
              },
              {
                as: "custom",
                content: (
                  <div className="mt-6 flex justify-center">
                    <div className="relative inline-flex flex-col items-center">
                      <button
                        type="button"
                        onMouseEnter={() => setContactBirdsVisible(true)}
                        onMouseLeave={() => setContactBirdsVisible(false)}
                        onTouchStart={() => setContactBirdsVisible(true)}
                        onClick={() => {
                          setContactBirdsVisible(true);
                          void copyText(
                            "lukewzhuang@gmail.com",
                            "contactEmail",
                          );
                        }}
                        className="bg-transparent p-0 text-white text-[1.55rem] font-bold transition-colors duration-300 hover:text-[#1E90FF] cursor-pointer"
                        aria-label="Copy contact email address"
                        title="Copy email"
                      >
                        lukewzhuang@gmail.com
                      </button>
                      <AnimatePresence initial={false}>
                        {copiedField === "contactEmail" ? (
                          <motion.span
                            key="contact-email-copied"
                            initial={{
                              opacity: 0,
                              y: 8,
                              scale: 0.92,
                              filter: "blur(6px)",
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              filter: "blur(0px)",
                            }}
                            exit={{
                              opacity: 0,
                              y: -4,
                              scale: 0.98,
                              filter: "blur(4px)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 24,
                              mass: 0.75,
                            }}
                            className="pointer-events-none absolute left-1/2 top-full z-10 mt-0.5 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-[#1E90FF]/35 bg-[#1E90FF]/12 px-2 py-0.5 text-[0.72rem] font-medium tracking-[0.02em] text-[#b9ddff] shadow-[0_0_14px_rgba(30,144,255,0.2)]"
                          >
                            <i
                              aria-hidden
                              className="fa-regular fa-clipboard text-[0.68rem] text-[#7ec0ff]"
                            />
                            Copied to Clipboard
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>
                ),
              },
              {
                as: "custom",
                content: (
                  <motion.div
                    className="mt-8 flex justify-center gap-6"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: isMobile ? 0 : 0.1,
                          delayChildren: 0,
                        },
                      },
                    }}
                  >
                    {[
                      {
                        href: "https://github.com/Luke7787",
                        icon: "fab fa-github",
                      },
                      {
                        href: "https://www.linkedin.com/in/zhuangluke/",
                        icon: "fab fa-linkedin",
                      },
                      {
                        href: "https://www.instagram.com/lukez7787/",
                        icon: "fab fa-instagram",
                      },
                    ].map((item) => (
                      <motion.span
                        key={item.href}
                        variants={{
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
                            transition: {
                              type: "spring",
                              stiffness: isMobile ? 88 : 65,
                              damping: isMobile ? 26 : 24,
                              mass: isMobile ? 0.75 : 0.9,
                            },
                          },
                        }}
                        style={{ display: "inline-block" }}
                      >
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 transition-all duration-300 hover:scale-110"
                        >
                          <i
                            className={`${item.icon} text-[28px] text-[#1B76D2] transition-colors duration-300 group-hover:text-white ${
                              item.icon.includes("instagram")
                                ? "[-webkit-text-stroke:0.6px_currentColor] [paint-order:stroke_fill]"
                                : ""
                            }`}
                          />
                        </a>
                      </motion.span>
                    ))}
                  </motion.div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" ref={footerRef} className="py-6 text-center">
        <div
          className="
            cursor-default
            text-[0.7rem]
            sm:text-[1rem]
            font-medium
            text-white/70
            font-['Open_Sans',sans-serif]
          "
        >
          <ScrollRevealWords
            className="inline"
            threshold={0.2}
            lines={[
              {
                as: "span",
                text: `© ${new Date().getFullYear()} All rights reserved | This website is made by `,
                className:
                  "cursor-default text-[0.7rem] sm:text-[1rem] font-medium text-white/70 font-['Open_Sans',sans-serif]",
              },
              {
                as: "a",
                text: "Luke Zhuang",
                href: "https://github.com/Luke7787/website-portfolio",
                target: "_blank",
                rel: "noopener noreferrer",
                className:
                  "inline-block cursor-pointer px-1.5 py-0.5 sm:px-2 sm:py-1 ml-1 text-white text-[0.7rem] sm:text-[1rem] font-extrabold bg-[#1b76d2] rounded transition-transform duration-300 hover:scale-105",
              },
            ]}
          />
        </div>
      </footer>
    </main>
  );
}
