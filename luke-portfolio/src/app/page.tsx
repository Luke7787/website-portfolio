"use client";

import { useState } from "react";
import Image from "next/image";
import NavBar from "@/components/layout/NavBar";
import AnimatedName from "@/components/effects/AnimatedName";
import TextScramble from "@/components/effects/TextScramble";

// Slideshow Component (Added Only)
function Slideshow() {
  const slides = [
    { type: "image", src: "/images/about.jpg" },
    { type: "video", src: "/images/handstand.mp4" },
    { type: "image", src: "/images/test.jpeg" },
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
      {/* IMAGE */}
      {current.type === "image" && (
        <Image
          src={current.src}
          alt="Luke Zhuang"
          width={800}
          height={800}
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
            rounded-lg
            border-2
            border-white
            shadow-lg
            object-cover
            w-full
          "
        />
      )}

      {/* Arrows */}
      {/* Left Arrow */}
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
        <span className="-translate-x-[1px] -translate-y-[2px]">‹</span>
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
        <span className="translate-x-[1px] -translate-y-[2px]">›</span>
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <main className="relative">
      <NavBar />

      {/* HOME */}
      <section
        id="home"
        className="scroll-mt-16 min-h-screen pt-16 flex items-center justify-center"
      >
        <div className="text-center">
          <TextScramble
            text="HELLO! MY NAME IS"
            className="mb-1 text-[20px] tracking-[0.8px] text-[rgb(140,140,140)]"
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
              "
            >
              LUKE ZHUANG
            </h1>
          </AnimatedName>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-16 min-h-screen pt-16 flex">
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
                font-['League Spartan','Arial','sans-serif']
                text-[150px]
                font-black
                uppercase
                leading-none
                tracking-[0.6px]
                text-[rgba(255,255,255,0.15)]
                [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]
              "
            >
              ABOUT
            </p>

            <h2
              className="
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
                max-w-md
                text-[1.125rem]
                font-medium
                leading-[1.75]
                tracking-[0.03em]
                text-white/80
                text-left
                md:text-justify
                md:translate-x-19
                md:-translate-y-15
              "
            >
              I’m a software engineer with a passion for building websites. I’m
              constantly seeking new challenges to expand my skills and
              knowledge.
            </p>

            <p
              className="
                mt-4
                text-[1.125rem]
                font-medium
                text-[#1E90FF]
                hover:underline
                transition-all
                duration-200
                md:translate-x-19
                md:-translate-y-12.5
                cursor-pointer
              "
            >
              Check out my resume
            </p>

            {/* Social Icons */}
            <div
              className="
                mt-6
                flex
                gap-4
                md:translate-x-19
                md:-translate-y-12.5
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
                md:-translate-y-10
              "
            >
              <p>
                <span className="text-[#8c8c8c]">Email:</span>{" "}
                <span
                  className="
                  text-[#1E90FF]
                  hover:underline
                  hover:underline-offset-4
                  transition-all
                  duration-200
                  cursor-pointer
                "
                >
                  lukewzhuang@gmail.com
                </span>
              </p>

              <p>
                <span className="text-[#8c8c8c]">Phone:</span>{" "}
                <span
                  className="
                    text-[#1E90FF]
                    hover:underline
                    hover:underline-offset-4
                    transition-all
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

      {/* PROJECTS */}
      <section
        id="projects"
        className="scroll-mt-16 min-h-screen pt-16 flex items-center justify-center"
      >
        <div className="text-center">
          <p className="mb-2 text-sm tracking-[0.8px] text-[rgb(140,140,140)]">
            PORTFOLIO
          </p>

          <h2 className="text-4xl font-bold tracking-[0.15em] text-white/90">
            PROJECTS
          </h2>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className="scroll-mt-16 min-h-screen pt-16 flex items-center justify-center"
      >
        <div className="text-center">
          <p className="mb-2 text-sm tracking-[0.8px] text-[rgb(140,140,140)]">
            EXPERTISE
          </p>

          <h2 className="text-4xl font-bold tracking-[0.15em] text-white/90">
            SKILLS
          </h2>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="scroll-mt-16 min-h-screen pt-16 flex items-center justify-center"
      >
        <div className="text-center">
          <p className="mb-2 text-sm tracking-[0.8px] text-[rgb(140,140,140)]">
            GET IN TOUCH
          </p>

          <h2 className="text-4xl font-bold tracking-[0.15em] text-white/90">
            CONTACT
          </h2>
        </div>
      </section>
    </main>
  );
}
