import { motion } from "framer-motion";
import { SectionLabel } from "./about";

// This component is no longer used in index.tsx (superseded by the UGG redesign).
// The LEARNING_JOURNEY export was removed from site.ts in Task 1.
// Kept as dead code; using an empty array so TypeScript stays clean.
const LEARNING_JOURNEY: Array<{
  period: string;
  role: string;
  org: string;
  points: string[];
}> = [];

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionLabel>Journey</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          Current <span className="text-gradient">learning journey</span>.
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          An honest timeline of where I am — not where I want to look like I am.
        </p>

        <ol className="relative mt-14 space-y-8 border-l border-white/10 pl-8">
            {LEARNING_JOURNEY.map((e: { period: string; role: string; org: string; points: string[] }, i: number) => (
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
                  {e.points.map((p: string) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-emerald" /> {p}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
      </div>
    </section>
  );
}
