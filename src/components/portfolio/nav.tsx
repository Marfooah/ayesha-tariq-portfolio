import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="glass-strong mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3">
        <a href="#top" className="flex items-center gap-2 font-display text-sm font-bold tracking-tight">
          <span className="inline-block size-2 rounded-full bg-primary shadow-glow" />
          {SITE.name}
        </a>
        <ul className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            className="hidden rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
          >
            Admin
          </Link>
          <a
            href="#contact"
            className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-transform hover:scale-[1.03]"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  );
}