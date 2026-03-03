"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "@/components/layout/NavBar";
import AnimatedName from "@/components/effects/AnimatedName";
import TextScramble from "@/components/effects/TextScramble";
import VantaBirdsBackground from "@/components/effects/VantaBirdsBackground";

// Skill logos — jsDelivr CDN. Card layout: icon + label per skill (Framer-style).
const ICON_CDN = "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons";
const skillEntry = (slug: string, name: string) => ({
  name,
  icon: `${ICON_CDN}/${slug}.svg`,
});
const skillsMarqueeRow1 = [
  skillEntry("typescript", "TypeScript"),
  skillEntry("javascript", "JavaScript"),
  skillEntry("python", "Python"),
  skillEntry("java", "Java"),
  skillEntry("c", "C"),
  skillEntry("cplusplus", "C++"),
  skillEntry("react", "React.js"),
  skillEntry("nextdotjs", "Next.js"),
  skillEntry("nodedotjs", "Node.js"),
  skillEntry("express", "Express.js"),
];
const skillsMarqueeRow2 = [
  skillEntry("prisma", "Prisma ORM"),
  skillEntry("axios", "Axios"),
  skillEntry("postgresql", "PostgreSQL"),
  skillEntry("mongodb", "MongoDB"),
  skillEntry("amazonaws", "AWS"),
  skillEntry("microsoftazure", "Azure"),
  skillEntry("docker", "Docker"),
  skillEntry("github", "GitHub"),
  skillEntry("render", "Render"),
  skillEntry("linux", "Linux"),
];

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
      {/* Aspect Ratio Container */}
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

      {/* Caption (Added Only) */}
      <p
        className="
          mt-4
          cursor-default
          text-sm
          text-white/70
          tracking-[0.03em]
          text-center
        "
      >
        {current.caption}
      </p>

      {/* Arrows */}
      {/* Left Arrow */}
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

      {/* Right Arrow */}
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
    </div>
  );
}

export default function Page() {
  const [birdsVisible, setBirdsVisible] = useState(false);
  const [contactBirdsVisible, setContactBirdsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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
                hover:text-[#1E90FF]
              "
              onMouseEnter={() => setBirdsVisible(true)}
              onClick={() => setBirdsVisible(true)}
              onTouchStart={() => setBirdsVisible(true)}
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
            <p
              className="
                block
                cursor-default
                font-['League Spartan','Arial','sans-serif']
                text-[90px]
                sm:text-[110px]
                lg:text-[150px]
                font-black
                uppercase
                leading-none
                tracking-[0.6px]
                text-[rgba(255,255,255,0.15)]
                [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]
                -translate-y-118.75
                md:translate-y-0
              "
            >
              ABOUT
            </p>

            <h2
              className="
                hidden
                cursor-default
                md:block
                mt-2
                text-[1.8rem]
                font-medium
                tracking-[0.05em]
                text-white
                md:translate-x-19
                md:-translate-y-22
              "
            >
              {"Hi! I'm Luke Zhuang"}
            </h2>

            <p
              className="
                mt-5
                cursor-default
                max-w-[320px]
                sm:max-w-sm
                md:max-w-md
                text-[1rem]
                sm:text-[1.05rem]
                md:text-[1.125rem]
                font-medium
                leading-[1.6]
                md:leading-[1.75]
                tracking-[0.03em]
                text-white/80
                text-justify
                md:translate-x-19
                md:-translate-y-13
                -translate-y-30
  
              "
            >
              I’m a software engineer with a passion for building websites. I’m
              constantly seeking new challenges to expand my skills and
              knowledge.
            </p>

            <a
              href="/LukeResume2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                block
                mt-4
                text-[1.125rem]
                font-medium
                text-[#1E90FF]
                hover:underline
                transition-colors
                duration-200
                -translate-y-25
                md:translate-x-19
                md:-translate-y-10
                cursor-pointer
              "
            >
              Check out my resume
            </a>

            {/* Social Icons */}
            <div
              className="
                mt-6
                flex
                justify-center
                md:justify-start
                gap-4
                md:translate-x-19
                md:-translate-y-7
                -translate-y-28
              "
            >
              {/* GitHub */}
              <a
                href="https://github.com/Luke7787"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  transition-all
                  duration-300
                  hover:scale-110
                "
              >
                <i
                  className="
                    fab fa-github
                    text-[30px]
                    text-[#1B76D2]
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/zhuangluke/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  transition-all
                  duration-300
                  hover:scale-110
                "
              >
                <i
                  className="
                    fab fa-linkedin
                    text-[30px]
                    text-[#1B76D2]
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/luke.zhuang/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  transition-all
                  duration-300
                  hover:scale-110
                "
              >
                <i
                  className="
                    fab fa-facebook
                    text-[30px]
                    text-[#1B76D2]
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                />
              </a>
            </div>

            <div
              className="
                mt-4
                max-w-md
                space-y-2
                text-[1rem]
                font-medium
                leading-[1.6]
                tracking-[0.03em]
                md:translate-x-19
                md:-translate-y-2.25
                -translate-y-22
              "
            >
              <p>
                <span className="cursor-default text-[#8c8c8c]">Email:</span>{" "}
                <span
                  className="
                  border-b border-transparent
                  text-[#1E90FF]
                  hover:border-[#1E90FF]
                  transition-colors
                  duration-200
                  cursor-pointer
                "
                >
                  lukewzhuang@gmail.com
                </span>
              </p>

              <p>
                <span className="cursor-default text-[#8c8c8c]">Phone:</span>{" "}
                <span
                  className="
                    border-b border-transparent
                    text-[#1E90FF]
                    hover:border-[#1E90FF]
                    transition-colors
                    duration-200
                    cursor-pointer
                  "
                >
                  (415) 837-8686
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS — Framer-style card grid */}
      <section
        id="projects"
        className="scroll-mt-2 md:scroll-mt-16 min-h-screen pt-16 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="mb-2 cursor-default text-[20px] tracking-[0.8px] text-[rgb(140,140,140)]">
              PORTFOLIO
            </p>
            <h2 className="cursor-default text-3xl md:text-4xl font-bold tracking-[0.12em] text-white/90">
              Featured Projects
            </h2>
          </div>

          {/* Card grid — 1 col mobile, 2 cols md, 3 cols lg */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Card 1: Showroom Booking App */}
            <div className="group opacity-100 transition-all duration-500 ease-out">
              <a
                href="https://showroom-appointment-scheduler.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative w-full aspect-9/8 overflow-hidden rounded-xl mb-5">
                  <Image
                    src="/images/P1P1.png"
                    alt="Showroom Booking App"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1128px) 50vw, 33vw"
                    className="rounded-xl object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <h3 className="cursor-default text-xl font-semibold text-white mb-2">
                  Showroom Booking App
                </h3>
                <p className="cursor-default text-white/70 text-[15px] leading-relaxed">
                  Full-stack appointment scheduling with Next.js, TypeScript, Prisma, and PostgreSQL. Book visits and manage availability with admin control.
                </p>
              </a>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://showroom-appointment-scheduler.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0099ff] font-medium hover:underline"
                >
                  Live Site
                </a>
                <a
                  href="https://github.com/Luke7787/showroom-appointment-scheduler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0099ff] font-medium hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Card 2: Inventory Management Platform */}
            <div className="group opacity-100 transition-all duration-500 ease-out">
              <a
                href="https://mango-island-08612f41e.5.azurestaticapps.net"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative w-full aspect-9/8 overflow-hidden rounded-xl mb-5">
                  <Image
                    src="/images/project2.png"
                    alt="Inventory Management Platform"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1128px) 50vw, 33vw"
                    className="rounded-xl object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <h3 className="cursor-default text-xl font-semibold text-white mb-2">
                  Inventory Management Platform
                </h3>
                <p className="cursor-default text-white/70 text-[15px] leading-relaxed">
                  Full-stack inventory app with React, TypeScript, Node.js, and MongoDB. View, add, update, and manage inventory through a responsive interface.
                </p>
              </a>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://mango-island-08612f41e.5.azurestaticapps.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0099ff] font-medium hover:underline"
                >
                  Live Site
                </a>
                <a
                  href="https://github.com/Luke7787/ImmaculateInventors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0099ff] font-medium hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Card 3: Blackjack */}
            <div className="group opacity-100 transition-all duration-500 ease-out">
              <a
                href="https://luke7787.github.io/Blackjack/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative w-full aspect-9/8 overflow-hidden rounded-xl mb-5">
                  <Image
                    src="/images/project3.png"
                    alt="Blackjack game"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1128px) 50vw, 33vw"
                    className="rounded-xl object-cover object-[center_5%] transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <h3 className="cursor-default text-xl font-semibold text-white mb-2">
                  Blackjack
                </h3>
                <p className="cursor-default text-white/70 text-[15px] leading-relaxed">
                  Blackjack built with JavaScript, HTML5, and CSS. Split, double down, Blackjack payouts, and responsive UI for play on any device.
                </p>
              </a>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://luke7787.github.io/Blackjack/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0099ff] font-medium hover:underline"
                >
                  Live Site
                </a>
                <a
                  href="https://github.com/Luke7787/Blackjack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0099ff] font-medium hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Card 4: Server-and-Client */}
            <div className="group opacity-100 transition-all duration-500 ease-out md:col-span-2 lg:col-span-1">
              <a
                href="https://github.com/Luke7787/Server-and-Client"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative w-full aspect-9/8 overflow-hidden rounded-xl mb-5">
                  <Image
                    src="/images/project4.png"
                    alt="Server-and-Client webserver"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1128px) 50vw, 33vw"
                    className="rounded-xl object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <h3 className="cursor-default text-xl font-semibold text-white mb-2">
                  Server-and-Client
                </h3>
                <p className="cursor-default text-white/70 text-[15px] leading-relaxed">
                  Concurrent web server in C implementing a subset of HTTP. Handles multiple clients via forked processes for parallel request processing.
                </p>
              </a>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://github.com/Luke7787/Server-and-Client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0099ff] font-medium hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS — Framer-style cards (icon + text), two rows scrolling with fade */}
      <section
        id="skills"
        className="-scroll-mt-20 md:scroll-mt-0 pt-16 pb-8 flex flex-col items-center justify-center bg-[#141414] text-white rounded-[90px] overflow-hidden"
      >
        <div className="w-full text-center mb-12">
          <p className="mb-2 cursor-default text-[20px] tracking-[0.8px] text-[rgb(140,140,140)]">
            EXPERTISE
          </p>
          <h2 className="cursor-default text-3xl md:text-4xl font-bold tracking-[0.12em] text-white/90">
            Technical Skills
          </h2>
        </div>

        {/* Row 1: scroll left — cards with icon + label; two equal-width copies for seamless loop */}
        <div
          className="w-full flex items-center py-2 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
          }}
        >
          <ul className="flex list-none m-0 p-0 relative w-max skill-marquee-left">
            <li className="flex items-center gap-8 shrink-0">
              {skillsMarqueeRow1.map((skill, i) => (
                <div key={`row1-a-${i}`} className="shrink-0">
                  <div className="shrink-0 flex items-center gap-5 rounded-3xl border border-white/20 bg-[rgb(13,13,13)] px-6 py-5 min-h-[96px] w-[300px] transition-colors duration-200 hover:bg-[rgb(22,22,22)] hover:border-white/30">
                    <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={skill.icon}
                        alt=""
                        className="w-8 h-8 object-contain brightness-0 invert"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-white text-2xl md:text-[28px] font-medium tracking-[-0.02em] leading-tight m-0 truncate">
                      {skill.name}
                    </h3>
                  </div>
                </div>
              ))}
              <span className="shrink-0 w-0 block" aria-hidden />
            </li>
            <li className="flex items-center gap-8 shrink-0" aria-hidden>
              {skillsMarqueeRow1.map((skill, i) => (
                <div key={`row1-b-${i}`} className="shrink-0">
                  <div className="shrink-0 flex items-center gap-5 rounded-3xl border border-white/20 bg-[rgb(13,13,13)] px-6 py-5 min-h-[96px] w-[300px] transition-colors duration-200 hover:bg-[rgb(22,22,22)] hover:border-white/30">
                    <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={skill.icon}
                        alt=""
                        className="w-8 h-8 object-contain brightness-0 invert"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-white text-2xl md:text-[28px] font-medium tracking-[-0.02em] leading-tight m-0 truncate">
                      {skill.name}
                    </h3>
                  </div>
                </div>
              ))}
              <span className="shrink-0 w-0 block" aria-hidden />
            </li>
          </ul>
        </div>

        {/* Row 2: scroll right — two equal-width copies for seamless loop */}
        <div
          className="w-full flex items-center py-2 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
          }}
        >
          <ul className="flex list-none m-0 p-0 relative w-max skill-marquee-right">
            <li className="flex items-center gap-8 shrink-0">
              {skillsMarqueeRow2.map((skill, i) => (
                <div key={`row2-a-${i}`} className="shrink-0">
                  <div className="shrink-0 flex items-center gap-5 rounded-3xl border border-white/20 bg-[rgb(13,13,13)] px-6 py-5 min-h-[96px] w-[300px] transition-colors duration-200 hover:bg-[rgb(22,22,22)] hover:border-white/30">
                    <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={skill.icon}
                        alt=""
                        className="w-8 h-8 object-contain brightness-0 invert"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-white text-2xl md:text-[28px] font-medium tracking-[-0.02em] leading-tight m-0 truncate">
                      {skill.name}
                    </h3>
                  </div>
                </div>
              ))}
              <span className="shrink-0 w-0 block" aria-hidden />
            </li>
            <li className="flex items-center gap-8 shrink-0" aria-hidden>
              {skillsMarqueeRow2.map((skill, i) => (
                <div key={`row2-b-${i}`} className="shrink-0">
                  <div className="shrink-0 flex items-center gap-5 rounded-3xl border border-white/20 bg-[rgb(13,13,13)] px-6 py-5 min-h-[96px] w-[300px] transition-colors duration-200 hover:bg-[rgb(22,22,22)] hover:border-white/30">
                    <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={skill.icon}
                        alt=""
                        className="w-8 h-8 object-contain brightness-0 invert"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-white text-2xl md:text-[28px] font-medium tracking-[-0.02em] leading-tight m-0 truncate">
                      {skill.name}
                    </h3>
                  </div>
                </div>
              ))}
              <span className="shrink-0 w-0 block" aria-hidden />
            </li>
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative -scroll-mt-25 min-h-screen pt-0 flex items-center justify-center overflow-hidden"
      >
        <VantaBirdsBackground visible={contactBirdsVisible} />
        <div className="relative z-10 text-center">
          {/* Headline */}
          <p className="cursor-default text-[1.5rem] font-bold tracking-[0.03em] text-[rgb(140,140,140)]">
            {"Let's Connect"}
          </p>

          {/* Contact Info */}
          <div className="mt-6 space-y-4">
            {/* Email */}
            <a
              href="mailto:lukewzhuang@gmail.com"
              className="
                block
                text-white
                text-[1.55rem]
                font-bold
                transition-colors
                duration-300
                hover:text-[#1E90FF]
              "
              onMouseEnter={() => setContactBirdsVisible(true)}
              onMouseLeave={() => setContactBirdsVisible(false)}
              onClick={() => setContactBirdsVisible(true)}
              onTouchStart={() => setContactBirdsVisible(true)}
            >
              lukewzhuang@gmail.com
            </a>

            {/* Social Icons */}
            <div className="mt-8 flex justify-center gap-6">
              {[
                { href: "https://github.com/Luke7787", icon: "fab fa-github" },
                {
                  href: "https://www.linkedin.com/in/zhuangluke/",
                  icon: "fab fa-linkedin",
                },
                {
                  href: "https://www.facebook.com/luke.zhuang/",
                  icon: "fab fa-facebook",
                },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 transition-all duration-300 hover:scale-110"
                >
                  <i
                    className={`${item.icon} text-[28px] text-[#1B76D2] transition-colors duration-300 group-hover:text-white`}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center">
        <p
          className="
            cursor-default
            text-[0.9rem]
            sm:text-[1rem]
            font-medium
            text-white/70
            font-['Open_Sans',sans-serif]
          "
        >
          © {new Date().getFullYear()} All rights reserved | This template is
          made by{" "}
          <a
            href="https://github.com/Luke7787/website-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              cursor-pointer
              px-2
              py-1
              ml-1
              text-white
              text-[0.9rem]
              sm:text-[1rem]
              font-extrabold
              bg-[#1b76d2]
              rounded
              transition-transform
              duration-300
              hover:scale-105
            "
          >
            Luke Zhuang
          </a>
        </p>
      </footer>
    </main>
  );
}
