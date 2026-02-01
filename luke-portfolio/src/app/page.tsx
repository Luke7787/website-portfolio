import NavBar from "@/components/layout/NavBar";

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
          <p className="mb-2 text-sm tracking-[0.8px] text-[rgb(140,140,140)]">
            HELLO! MY NAME IS
          </p>

          <h1 className="text-3xl font-bold tracking-[3.2px] text-white/90 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
            LUKE ZHUANG
          </h1>
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
