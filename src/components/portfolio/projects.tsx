import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { type Project, thumbFor } from "@/lib/projects-data";
import { SectionLabel } from "./about";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Work</SectionLabel>
            <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Selected <span className="text-gradient">projects</span>.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Production-grade AI products spanning medical imaging, predictive maintenance and RAG
            knowledge agents.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
  };
  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="glass-strong group relative overflow-hidden rounded-3xl transition-[box-shadow] duration-500 hover:shadow-glow"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={thumbFor(project)}
          alt={project.title}
          loading="lazy"
          width={1280}
          height={800}
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
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold">{project.title}</h3>
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">{project.short_description}</p>

        {project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            {project.metrics.slice(0, 3).map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-display text-sm font-semibold text-foreground">{m.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs transition-colors hover:bg-white/[0.05]"
            >
              <Github className="size-3.5" /> Code
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background"
            >
              <ExternalLink className="size-3.5" /> Live demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}