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

        {/* Section 3 — Philosophy */}
        <SectionLabel>Our Philosophy</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Growth shouldn't require answering{" "}
          <span className="text-gradient">the same question twice.</span>
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              heading: "Great operations remove repetitive work before it reaches people.",
              body: "When a question reaches your team, the system has already failed. A well-designed operation resolves it before that point.",
            },
            {
              heading: "Technology supports people. It doesn't replace responsibility.",
              body: "The goal is not to automate your team out of a job. The goal is to give them work worth doing.",
            },
            {
              heading: "The bottleneck is rarely the team. It's almost always the system.",
              body: "Hiring more people to manage a broken process makes the process more expensive. It doesn't fix it.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass hover-lift rounded-2xl p-6"
            >
              <h3 className="font-display text-base font-semibold leading-snug">{item.heading}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Section 4 — Introduce UGG */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 glass-strong relative overflow-hidden rounded-3xl p-8 md:p-14"
        >
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary opacity-10 blur-3xl" aria-hidden />
          <SectionLabel>Who We Are</SectionLabel>
          <p className="mt-6 max-w-2xl font-display text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            UGG designs customer support systems that resolve routine conversations before they reach your team.
          </p>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Nothing more. Nothing less.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
