import NavBar from "@/components/layout/NavBar";

export default function Page() {
  return (
    <main className="relative">
      <NavBar />

      <section
        id="home"
        className="scroll-mt-16 min-h-screen pt-16 flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold">Home</h1>
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
