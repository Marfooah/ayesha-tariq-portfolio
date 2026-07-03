import { motion } from "framer-motion";
import {
  Target,
  GitBranch,
  Code2,
  TrendingUp,
  LayoutDashboard,
  Rocket,
  Brain,
  Sparkles,
} from "lucide-react";
import { PRINCIPLES } from "@/lib/site";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  GitBranch,
  Code2,
  TrendingUp,
  LayoutDashboard,
  Rocket,
  Brain,
  Sparkles,
};

/** Pure sub-component — exported for property-based testing */
export function PrincipleCard({ principle }: { principle: { title: string; desc: string; icon: string } }) {
  const Icon = ICON_MAP[principle.icon] ?? Target;
  return (
    <div className="glass hover-lift rounded-2xl p-5">
      <Icon className="size-5 text-primary" />
      <h3 className="mt-3 font-display text-base font-semibold">{principle.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{principle.desc}</p>
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
      {children}
    </div>
  );
}

export function About() {
  return (
    <section id="why-ugg" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Why UGG</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          What makes the difference for{" "}
          <span className="text-gradient">your business</span>.
        </h2>

        {PRINCIPLES.length > 0 && (
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <PrincipleCard principle={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
