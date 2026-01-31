"use client";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Left */}
        <div className="font-semibold tracking-wide">Luke Zhuang</div>

        {/* Right */}
        <ul className="hidden gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-gray-700 transition hover:text-black"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile placeholder */}
        <button className="md:hidden text-sm">Menu</button>
      </div>
    </nav>
  );
}
