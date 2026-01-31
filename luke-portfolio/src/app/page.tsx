import NavBar from "@/components/layout/NavBar";

export default function Page() {
  return (
    <main>
      <NavBar />

      <section id="home" className="h-screen pt-16">
        Home
      </section>

      <section id="about" className="h-screen pt-16">
        About
      </section>

      <section id="projects" className="h-screen pt-16">
        Projects
      </section>

      <section id="skills" className="h-screen pt-16">
        Skills
      </section>

      <section id="contact" className="h-screen pt-16">
        Contact
      </section>
    </main>
  );
}
