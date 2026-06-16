import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { EXPERIENCE, CERTIFICATIONS } from "@/lib/site";
import { SectionLabel } from "./about";

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Journey</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          Experience & <span className="text-gradient">credentials</span>.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <ol className="relative space-y-8 border-l border-white/10 pl-8">
            {EXPERIENCE.map((e, i) => (
              <motion.li
                key={e.role}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[37px] top-1.5 grid size-4 place-items-center rounded-full bg-background ring-1 ring-primary">
                  <span className="size-1.5 rounded-full bg-primary shadow-glow" />
                </span>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {e.period}
                </div>
                <h3 className="mt-1 font-display text-lg font-semibold">{e.role}</h3>
                <div className="text-sm text-muted-foreground">{e.org}</div>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-emerald" /> {p}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Certifications</h3>
            <div className="grid gap-3">
              {CERTIFICATIONS.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="glass hover-lift flex items-center gap-4 rounded-2xl p-4"
                >
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/15">
                    <Award className="size-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.issuer}</div>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">{c.year}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}