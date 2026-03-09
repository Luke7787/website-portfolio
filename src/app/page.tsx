"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

// Slideshow Component (Added Only)
function Slideshow() {
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
    },
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
  const [index, setIndex] = useState(0);

  function next() {
    setIndex((prev) => (prev + 1) % slides.length);
  }

  function prev() {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  const current = slides[index];

  return (
    <div className="relative">
      {/* Aspect Ratio Container — scroll reveal */}
      <ScrollRevealBlock
        animationStyle="words"
        delay={0.2}
        amount={0.3}
        transitionOverrides={{ stiffness: 45, damping: 22 }}
      >
        <div className="relative w-full aspect-square">
          {/* IMAGE */}
          {current.type === "image" && (
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
          )}

          {/* VIDEO */}
          {current.type === "video" && (
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
          )}
        </div>
      </ScrollRevealBlock>

      {/* Caption — word-by-word reveal */}
      <ScrollRevealWords
        className="mt-4"
        threshold={0.3}
        delayChildren={0.25}
        staggerChildren={0.04}
        lines={[
          {
            as: "p",
            text: current.caption,
            className:
              "cursor-default text-sm text-white/70 tracking-[0.03em] text-center",
          },
        ]}
      />

      {/* Arrows — scroll reveal */}
      <div className="absolute inset-0">
        <ScrollRevealBlock
          animationStyle="words"
          delay={0.6}
          amount={0.3}
          transitionOverrides={{ stiffness: 22, damping: 18 }}
          className="absolute inset-0"
        >
          <button
            onClick={prev}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              flex items-center justify-center
              w-12 h-12
              rounded-full
              bg-gray-100
              text-black
              text-3xl
              leading-none
              shadow-[0_8px_20px_rgba(0,0,0,0.15)]
              hover:bg-gray-200
              hover:scale-110
              active:scale-95
              transition-all duration-300
            "
          >
            <span className="-translate-x-px -translate-y-0.5">‹</span>
          </button>

          <button
            onClick={next}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              flex items-center justify-center
              w-12 h-12
              rounded-full
              bg-gray-100
              text-black
              text-3xl
              leading-none
              shadow-[0_8px_20px_rgba(0,0,0,0.15)]
              hover:bg-gray-200
              hover:scale-110
              active:scale-95
              transition-all duration-300
            "
          >
            <span className="translate-x-px -translate-y-0.5">›</span>
          </button>
        </ScrollRevealBlock>
      </div>
    </div>
  );
}

export default function Page() {
  const [birdsVisible, setBirdsVisible] = useState(false);
  const [contactBirdsVisible, setContactBirdsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setBirdsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative">
      <NavBar />

      {/* HOME */}
      <section
        id="home"
        className="relative scroll-mt-16 min-h-screen pt-16 flex items-center justify-center overflow-hidden"
      >
        <VantaBirdsBackground visible={birdsVisible} />
        <div className="relative z-10 text-center">
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
        className="scroll-mt-16 md:scroll-mt-34 min-h-screen pt-16 flex"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
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
              <Slideshow />
            </div>
          </div>

          {/* Right: Text */}
          <div
            className="
              text-center
              md:text-left
              self-start
              md:-translate-y-6
              md:-translate-x-16
            "
          >
            <ScrollRevealWords
              className=""
              threshold={0.45}
              delayChildren={0.14}
              staggerChildren={0.08}
              lines={[
                {
                  as: "p",
                  text: "ABOUT",
                  className:
                    "block cursor-default font-['League Spartan','Arial','sans-serif'] text-[90px] sm:text-[110px] lg:text-[150px] font-black uppercase leading-none tracking-[0.6px] text-[rgba(255,255,255,0.15)] [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)] -translate-y-118.75 md:translate-y-0",
                },
                {
                  as: "h2",
                  text: "Hi! I'm Luke Zhuang",
                  className:
                    "hidden cursor-default md:block mt-2 text-[1.8rem] font-medium tracking-[0.05em] text-white md:translate-x-19 md:-translate-y-22",
                },
                {
                  as: "p",
                  text: "I'm a software engineer with a passion for building websites. I'm constantly seeking new challenges to expand my skills and knowledge.",
                  className:
                    "mt-5 cursor-default max-w-[320px] sm:max-w-sm md:max-w-md text-[1rem] sm:text-[1.05rem] md:text-[1.125rem] font-medium leading-[1.6] md:leading-[1.75] tracking-[0.03em] text-white/80 text-justify md:translate-x-19 md:-translate-y-13 -translate-y-30",
                },
                {
                  as: "a",
                  text: "Check out my resume",
                  href: "/LukeResume2026.pdf",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className:
                    "block mt-4 text-[1.125rem] font-medium text-[#1E90FF] hover:underline transition-colors duration-200 -translate-y-25 md:translate-x-19 md:-translate-y-10 cursor-pointer",
                },
                {
                  as: "custom",
                  className:
                    "mt-6 flex justify-center md:justify-start gap-4 md:translate-x-19 md:-translate-y-7 -translate-y-28",
                  content: (
                    <motion.div
                      className="flex justify-center md:justify-start gap-4"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.1,
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
                          href: "https://www.facebook.com/luke.zhuang/",
                          icon: "fab fa-facebook",
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
                                stiffness: 65,
                                damping: 24,
                                mass: 0.9,
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
                              className={`${item.icon} text-[30px] text-[#1B76D2] transition-colors duration-300 group-hover:text-white`}
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
                            staggerChildren: 0.06,
                            delayChildren: 0,
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
                            transition: {
                              type: "spring",
                              stiffness: 65,
                              damping: 24,
                              mass: 0.9,
                            },
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
                              transition: {
                                type: "spring",
                                stiffness: 65,
                                damping: 24,
                                mass: 0.9,
                              },
                            },
                          }}
                          style={{ display: "inline-block" }}
                          className="cursor-default text-[#8c8c8c]"
                        >
                          Email:
                        </motion.span>{" "}
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
                              transition: {
                                type: "spring",
                                stiffness: 65,
                                damping: 24,
                                mass: 0.9,
                              },
                            },
                          }}
                          style={{ display: "inline-block" }}
                          className="border-b border-transparent text-[#1E90FF] hover:border-[#1E90FF] transition-colors duration-200 cursor-pointer"
                        >
                          lukewzhuang@gmail.com
                        </motion.span>
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
                            transition: {
                              type: "spring",
                              stiffness: 65,
                              damping: 24,
                              mass: 0.9,
                            },
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
                              transition: {
                                type: "spring",
                                stiffness: 65,
                                damping: 24,
                                mass: 0.9,
                              },
                            },
                          }}
                          style={{ display: "inline-block" }}
                          className="cursor-default text-[#8c8c8c]"
                        >
                          Phone:
                        </motion.span>{" "}
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
                              transition: {
                                type: "spring",
                                stiffness: 65,
                                damping: 24,
                                mass: 0.9,
                              },
                            },
                          }}
                          style={{ display: "inline-block" }}
                          className="border-b border-transparent text-[#1E90FF] hover:border-[#1E90FF] transition-colors duration-200 cursor-pointer"
                        >
                          (415) 837-8686
                        </motion.span>
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
        className="scroll-mt-2 md:scroll-mt-16 min-h-screen pt-16 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl mx-auto px-6">
          <ScrollRevealWords
            className="text-center mb-16"
            threshold={0.45}
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

          {/* Card grid — 1 col mobile, 2 cols md, 3 cols lg */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <ScrollRevealCard
              imageSrc="/images/P1P1.png"
              imageAlt="Showroom Booking App"
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
            />

            <ScrollRevealCard
              imageSrc="/images/project2.png"
              imageAlt="Inventory Management Platform"
              title="Inventory Management Platform"
              description="Full-stack inventory app with React, TypeScript, Node.js, and MongoDB. View, add, update, and manage inventory through a responsive interface."
              mainHref="https://mango-island-08612f41e.5.azurestaticapps.net"
              links={[
                {
                  label: "Live Site",
                  href: "https://mango-island-08612f41e.5.azurestaticapps.net",
                },
                {
                  label: "GitHub",
                  href: "https://github.com/Luke7787/ImmaculateInventors",
                },
              ]}
              cardClassName="group opacity-100 transition-all duration-500 ease-out"
            />

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
            />

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
              colSpanClassName="md:col-span-2 lg:col-span-1"
            />
          </div>
        </div>
      </section>

      {/* SKILLS — Framer-style cards (icon + text), two rows scrolling with fade */}
      <section
        id="skills"
        className="-scroll-mt-20 md:scroll-mt-0 pt-28 pb-24 flex flex-col items-center justify-center bg-[#141414] text-white rounded-[90px] overflow-hidden"
      >
        <div className="w-full mb-12">
          <ScrollRevealWords
            className="text-center"
            threshold={0.45}
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
          <ScrollRevealBlock animationStyle="words" delay={0.2}>
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
                <li className="flex items-center gap-4 shrink-0">
                  {skillsMarqueeRow1.map((skill, i) => (
                    <div key={`row1-a-${i}`} className="shrink-0">
                      <div className="skill-card-border shrink-0">
                        <div className="shrink-0 flex items-center justify-center gap-3 rounded-[23px] bg-[#121212] px-4 py-2.5 min-h-[52px] w-[200px] transition-colors duration-200 hover:bg-[#171717]">
                          <div className="shrink-0 w-9 h-9 flex items-center justify-center">
                            <SkillIcon skill={skill} />
                          </div>
                          <h3 className="text-white text-base md:text-lg font-medium tracking-[-0.02em] leading-tight m-0 truncate">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                  <span className="shrink-0 w-0 block" aria-hidden />
                </li>
                <li className="flex items-center gap-4 shrink-0" aria-hidden>
                  {skillsMarqueeRow1.map((skill, i) => (
                    <div key={`row1-b-${i}`} className="shrink-0">
                      <div className="skill-card-border shrink-0">
                        <div className="shrink-0 flex items-center justify-center gap-3 rounded-[23px] bg-[#121212] px-4 py-2.5 min-h-[52px] w-[200px] transition-colors duration-200 hover:bg-[#171717]">
                          <div className="shrink-0 w-9 h-9 flex items-center justify-center">
                            <SkillIcon skill={skill} />
                          </div>
                          <h3 className="text-white text-base md:text-lg font-medium tracking-[-0.02em] leading-tight m-0 truncate">
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
          <ScrollRevealBlock animationStyle="words" delay={0.45}>
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
                <li className="flex items-center gap-4 shrink-0">
                  {skillsMarqueeRow2.map((skill, i) => (
                    <div key={`row2-a-${i}`} className="shrink-0">
                      <div className="skill-card-border shrink-0">
                        <div className="shrink-0 flex items-center justify-center gap-3 rounded-[23px] bg-[#121212] px-4 py-2.5 min-h-[52px] w-[200px] transition-colors duration-200 hover:bg-[#171717]">
                          <div className="shrink-0 w-9 h-9 flex items-center justify-center">
                            <SkillIcon skill={skill} />
                          </div>
                          <h3 className="text-white text-base md:text-lg font-medium tracking-[-0.02em] leading-tight m-0 truncate">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                  <span className="shrink-0 w-0 block" aria-hidden />
                </li>
                <li className="flex items-center gap-4 shrink-0" aria-hidden>
                  {skillsMarqueeRow2.map((skill, i) => (
                    <div key={`row2-b-${i}`} className="shrink-0">
                      <div className="skill-card-border shrink-0">
                        <div className="shrink-0 flex items-center justify-center gap-3 rounded-[23px] bg-[#121212] px-4 py-2.5 min-h-[52px] w-[200px] transition-colors duration-200 hover:bg-[#171717]">
                          <div className="shrink-0 w-9 h-9 flex items-center justify-center">
                            <SkillIcon skill={skill} />
                          </div>
                          <h3 className="text-white text-base md:text-lg font-medium tracking-[-0.02em] leading-tight m-0 truncate">
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
          <ScrollRevealBlock animationStyle="words" delay={0.7}>
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
                <li className="flex items-center gap-4 shrink-0">
                  {skillsMarqueeRow3.map((skill, i) => (
                    <div key={`row3-a-${i}`} className="shrink-0">
                      <div className="skill-card-border shrink-0">
                        <div className="shrink-0 flex items-center justify-center gap-3 rounded-[23px] bg-[#121212] px-4 py-2.5 min-h-[52px] w-[200px] transition-colors duration-200 hover:bg-[#171717]">
                          <div className="shrink-0 w-9 h-9 flex items-center justify-center">
                            <SkillIcon skill={skill} />
                          </div>
                          <h3 className="text-white text-base md:text-lg font-medium tracking-[-0.02em] leading-tight m-0 truncate">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                  <span className="shrink-0 w-0 block" aria-hidden />
                </li>
                <li className="flex items-center gap-4 shrink-0" aria-hidden>
                  {skillsMarqueeRow3.map((skill, i) => (
                    <div key={`row3-b-${i}`} className="shrink-0">
                      <div className="skill-card-border shrink-0">
                        <div className="shrink-0 flex items-center justify-center gap-3 rounded-[23px] bg-[#121212] px-4 py-2.5 min-h-[52px] w-[200px] transition-colors duration-200 hover:bg-[#171717]">
                          <div className="shrink-0 w-9 h-9 flex items-center justify-center">
                            <SkillIcon skill={skill} />
                          </div>
                          <h3 className="text-white text-base md:text-lg font-medium tracking-[-0.02em] leading-tight m-0 truncate">
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
        className="relative -scroll-mt-25 min-h-screen pt-0 flex items-center justify-center overflow-hidden"
      >
        <VantaBirdsBackground visible={contactBirdsVisible} />
        <div className="relative z-10 text-center">
          <ScrollRevealWords
            className="text-center"
            threshold={0.45}
            lines={[
              {
                as: "p",
                text: "Let's Connect",
                className:
                  "cursor-default text-[1.5rem] font-bold tracking-[0.03em] text-[rgb(140,140,140)]",
              },
              {
                as: "a",
                text: "lukewzhuang@gmail.com",
                href: "mailto:lukewzhuang@gmail.com",
                className:
                  "block mt-6 text-white text-[1.55rem] font-bold transition-colors duration-300 hover:text-[#1E90FF]",
                linkProps: {
                  onMouseEnter: () => setContactBirdsVisible(true),
                  onMouseLeave: () => setContactBirdsVisible(false),
                  onClick: () => setContactBirdsVisible(true),
                  onTouchStart: () => setContactBirdsVisible(true),
                },
              },
              {
                as: "custom",
                content: (
                  <motion.div
                    className="mt-8 flex justify-center gap-6"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.1, delayChildren: 0 },
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
                        href: "https://www.facebook.com/luke.zhuang/",
                        icon: "fab fa-facebook",
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
                              stiffness: 65,
                              damping: 24,
                              mass: 0.9,
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
                            className={`${item.icon} text-[28px] text-[#1B76D2] transition-colors duration-300 group-hover:text-white`}
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
      <footer className="py-6 text-center">
        <div
          className="
            cursor-default
            text-[0.9rem]
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
                text: `© ${new Date().getFullYear()} All rights reserved | This template is made by `,
                className:
                  "cursor-default text-[0.9rem] sm:text-[1rem] font-medium text-white/70 font-['Open_Sans',sans-serif]",
              },
              {
                as: "a",
                text: "Luke Zhuang",
                href: "https://github.com/Luke7787/website-portfolio",
                target: "_blank",
                rel: "noopener noreferrer",
                className:
                  "inline-block cursor-pointer px-2 py-1 ml-1 text-white text-[0.9rem] sm:text-[1rem] font-extrabold bg-[#1b76d2] rounded transition-transform duration-300 hover:scale-105",
              },
            ]}
          />
        </div>
      </footer>
    </main>
  );
}
