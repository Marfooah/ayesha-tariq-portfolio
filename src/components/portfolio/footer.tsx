import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm">
          <div className="font-display font-semibold">{SITE.name}</div>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} — Built with intent.
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <a href={SITE.github} target="_blank" rel="noreferrer" className="hover:text-foreground" aria-label="GitHub">
            <Github className="size-4" />
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground" aria-label="LinkedIn">
            <Linkedin className="size-4" />
          </a>
          <a href={`mailto:${SITE.email}`} className="hover:text-foreground" aria-label="Email">
            <Mail className="size-4" />
          </a>
          <Link to="/auth" className="hover:text-foreground">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
