import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "./about";
import type { Project } from "@/lib/projects-data";

export function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      className="glass-strong group relative overflow-hidden rounded-3xl transition-[box-shadow] duration-500 hover:shadow-glow"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.03]">
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
          <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">{project.short_description}</p>
        {project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            {project.metrics.slice(0, 3).map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-display text-sm font-semibold text-foreground">{m.value}</div>
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
  );
}

export function Projects({
  projects,
  isLoading,
  isError,
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
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">
          Real work. No invented numbers. No invented clients.
        </p>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="glass-strong rounded-3xl overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-white/[0.04]" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-2/3 rounded bg-white/[0.06]" />
                  <div className="h-3 w-full rounded bg-white/[0.04]" />
                  <div className="h-3 w-4/5 rounded bg-white/[0.04]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty / placeholder state */}
        {!isLoading && (isError || projects.length === 0) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 glass-strong relative overflow-hidden rounded-3xl p-12 md:p-16"
          >
            <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary opacity-10 blur-3xl" aria-hidden />
            <div className="max-w-lg">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Coming Soon
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                Case studies in preparation.
              </h3>
              <p className="mt-4 text-muted-foreground">
                Operational improvements take time to measure properly. Case studies will be published
                once results are verified and clients have approved sharing.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                No invented numbers. No invented testimonials.
              </p>
            </div>
          </motion.div>
        )}

        {/* Loaded state */}
        {!isLoading && projects.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i * 0.05} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
