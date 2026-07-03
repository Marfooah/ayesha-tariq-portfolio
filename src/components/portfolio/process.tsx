import { motion } from "framer-motion";
import { ArrowDown, Search, LayoutDashboard, GitBranch, Code2, Rocket, TrendingUp } from "lucide-react";
import { ENGAGEMENT_PROCESS, type EngagementStep } from "@/lib/site";
import { SectionLabel } from "./about";

const ICONS = [Search, LayoutDashboard, GitBranch, Code2, Rocket, TrendingUp];
//              0        1                2          3       4        5

/** Pure sub-component that renders up to 6 process step cards from the given steps array.
 *  Always renders exactly Math.min(steps.length, 6) cards — the Process parent passes
 *  `ENGAGEMENT_PROCESS.slice(0, 6)` so the count is always exactly 6 at runtime.
 */
export function ProcessGrid({ steps }: { steps: EngagementStep[] }) {
  const visible = steps.slice(0, 6);
  return (
    <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {visible.map((step, i) => {
        const Icon = ICONS[i];
        return (
          <motion.div
            key={step.title}
            data-testid="process-step-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className={`glass hover-lift group relative overflow-hidden rounded-2xl p-6 ${i === 0 ? "shadow-glow" : ""}`}
          >
            <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br from-primary to-emerald opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
            <div className="flex items-center justify-between">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/15">
                <Icon className="size-5 text-primary" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Step {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
            {i < 5 && (
              <ArrowDown className="absolute bottom-4 right-4 size-4 text-muted-foreground/40 transition-colors group-hover:text-primary" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>How We Work</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          A clear path from <span className="text-gradient">problem to system</span>.
        </h2>
        <ProcessGrid steps={ENGAGEMENT_PROCESS.slice(0, 6)} />
      </div>
    </section>
  );
}
