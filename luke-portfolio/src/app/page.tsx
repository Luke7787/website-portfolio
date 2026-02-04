import NavBar from "@/components/layout/NavBar";
import AnimatedName from "@/components/effects/AnimatedName";
import TextScramble from "@/components/effects/TextScramble";

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
      <section
        id="about"
        className="scroll-mt-16 min-h-screen pt-16 flex items-center justify-center"
      >
        <div className="text-center">
          <p className="mb-2 text-sm tracking-[0.8px] text-[rgb(140,140,140)]">
            ABOUT
          </p>

          <h2 className="text-4xl font-bold tracking-[0.15em] text-white/90">
            WHO I AM
          </h2>
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
