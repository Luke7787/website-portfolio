import Image from "next/image";
import NavBar from "@/components/layout/NavBar";
import AnimatedName from "@/components/effects/AnimatedName";
import TextScramble from "@/components/effects/TextScramble";
// testing
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
          {/* Left: Image */}
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
              <Image
                src="/images/about.jpg"
                alt="Luke Zhuang portrait"
                width={800}
                height={528}
                className="
                  rounded-lg
                  border-2
                  border-white
                  shadow-lg
                  object-cover
                  md:-translate-x-6
                "
              />
            </div>
          </div>

          {/* Right: Text */}
          <div
            className="
              text-center
              md:text-left
              self-start
              md:-translate-y-5
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
