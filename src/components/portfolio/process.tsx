import { motion } from "framer-motion";
import { ArrowDown, Target, Database, Sparkles, Brain, LineChart, Rocket } from "lucide-react";
import { ENGINEERING_PROCESS } from "@/lib/site";
import { SectionLabel } from "./about";

const ICONS = [Target, Database, Sparkles, Brain, LineChart, Rocket];

export function Process() {
  return (
    <section id="process" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Process</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          My <span className="text-gradient">engineering process</span>.
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          How I take an AI project from a vague question to something usable.
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ENGINEERING_PROCESS.map((step, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="glass hover-lift group relative overflow-hidden rounded-2xl p-6"
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
                {i < ENGINEERING_PROCESS.length - 1 && (
                  <ArrowDown className="absolute bottom-4 right-4 size-4 text-muted-foreground/40 transition-colors group-hover:text-primary" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
