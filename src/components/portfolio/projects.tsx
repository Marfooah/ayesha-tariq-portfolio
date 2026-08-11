import { motion } from "framer-motion";
import { SectionLabel } from "./about";
import techmart from "@/assets/project-techmart.jpg";
import type { Project } from "@/lib/projects-data";

// ─── Hardcoded Techmart project ───────────────────────────────────────────────
const TECHMART_PROJECT = {
  id: "techmart-ai-agent",
  title: "TechMart AI Support Agent",
  slug: "techmart-ai-agent",
  short_description:
    "A fully autonomous AI support agent built for a consumer electronics ecommerce brand. Handles order status, returns, product queries, and escalations — end-to-end.",
  technologies: ["AI Agent", "Ecommerce", "Customer Support", "Automation"],
  metrics: [
    { label: "Tickets automated", value: "78%" },
    { label: "Response time", value: "<30s" },
    { label: "CSAT", value: "4.8/5" },
  ],
  featured: true,
  thumbnail_url: techmart,
  demo_url: "https://techmart-pk-eight.vercel.app",
};

// ─── ProjectCard ──────────────────────────────────────────────────────────────
export function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const demoUrl = (project as any).demo_url as string | undefined;
  return (
    <a
      href={demoUrl ?? "#"}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`View ${project.title} live application`}
      className="block"
    >
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay }}
        className="glass-strong group relative overflow-hidden rounded-3xl transition-[box-shadow] duration-500 hover:shadow-glow"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.thumbnail_url ?? ""}
            alt={project.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          {project.featured && (
            <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald">
              Featured
            </span>
          )}
        </div>

        <div className="space-y-4 p-6">
          <h3 className="font-display text-xl font-semibold">{project.title}</h3>
          <p className="text-sm text-muted-foreground">{project.short_description}</p>

          {project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
              {project.metrics.slice(0, 3).map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-gradient font-display text-sm font-semibold">{m.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </a>
  );
}

// ─── Projects section ─────────────────────────────────────────────────────────
// Uses the hardcoded Techmart project directly — ignores Supabase data.
export function Projects({
  projects: _projects,
  isLoading: _isLoading,
  isError: _isError,
}: {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <section id="work" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Work</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          Operational improvements.{" "}
          <span className="text-gradient">Measured results.</span>
        </h2>

        <div className="mt-12 max-w-2xl">
          <ProjectCard project={TECHMART_PROJECT as unknown as Project} delay={0} />
        </div>
      </div>
    </section>
  );
}
