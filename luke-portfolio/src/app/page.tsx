import NavBar from "@/components/layout/NavBar";

export default function Page() {
  return (
    <main className="relative">
      <NavBar />

      <section
        id="home"
        className="scroll-mt-16 min-h-screen pt-16 flex items-center justify-center"
      >
        <div className="text-center">
          {/* Subheading */}
          <p className="mb-2 text-sm font-normal tracking-[0.8px] text-[rgb(140,140,140)]">
            HELLO! MY NAME IS
          </p>

          {/* Name */}
          <h1 className="text-3xl font-bold tracking-[3.2px] text-white/90 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
            LUKE ZHUANG
          </h1>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-16 min-h-screen pt-16 flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold">About</h1>
      </section>

      <section
        id="projects"
        className="scroll-mt-16 min-h-screen pt-16 flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold">Projects</h1>
      </section>

      <section
        id="skills"
        className="scroll-mt-16 min-h-screen pt-16 flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold">Skills</h1>
      </section>

      <section
        id="contact"
        className="scroll-mt-16 min-h-screen pt-16 flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold">Contact</h1>
      </section>
    </main>
  );
}
