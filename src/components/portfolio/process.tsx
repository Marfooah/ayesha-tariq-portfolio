import { motion } from "framer-motion";
import { ArrowDown, Search, Compass, Code2, TrendingUp } from "lucide-react";
import { SectionLabel } from "./about";
import type { EngagementStep } from "@/lib/site";

const PROCESS_STEPS = [
  {
    title: "Understand",
    desc: "We map your current support operation — what comes in, how it's handled, and where the repetition lives.",
    Icon: Search,
  },
  {
    title: "Design",
    desc: "We design the operating system. What resolves automatically. What reaches your team. How the handoff works.",
    Icon: Compass,
  },
  {
    title: "Build",
    desc: "We build and integrate the system into your existing stack. No new tools for the sake of it.",
    Icon: Code2,
  },
  {
    title: "Refine",
    desc: "We monitor, measure, and improve. The system gets more accurate as it processes more volume.",
    Icon: TrendingUp,
  },
];

export function ProcessGrid({ steps }: { steps: EngagementStep[] }) {
  return (
    <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => {
        const { Icon } = PROCESS_STEPS[i] ?? { Icon: Search };
        return (
          <motion.div
            key={step.title}
            data-testid="process-step-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`glass hover-lift group relative overflow-hidden rounded-2xl p-6 ${i === 0 ? "shadow-glow" : ""}`}
          >
            <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br from-primary to-emerald opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
            <div className="flex items-center justify-between">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/15">
                <Icon className="size-5 text-primary" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
            {i < steps.length - 1 && (
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
      <div className="mx-auto max-w-6xl" id="operations">
        <SectionLabel>How We Work</SectionLabel>
        <h2 className="mt-6 max-w-xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          Understand. Design. Build.{" "}
          <span className="text-gradient">Refine.</span>
        </h2>
        <ProcessGrid steps={PROCESS_STEPS} />
      </div>
    </section>
  );
}
