import { motion } from "framer-motion";
import { Brain, Cpu, Sparkles, Target } from "lucide-react";
import { SITE } from "@/lib/site";

const PILLARS = [
  { icon: Brain, title: "Research-grade thinking", desc: "Reading papers, then reducing them to code that ships." },
  { icon: Cpu, title: "Production discipline", desc: "Eval suites, observability, latency budgets — not just notebooks." },
  { icon: Sparkles, title: "Product taste", desc: "AI that feels like a product, not a demo." },
  { icon: Target, title: "Outcome focus", desc: "Models judged by user impact, not leaderboard scores." },
];

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
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>About</SectionLabel>
        <div className="mt-6 grid gap-12 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              An engineer who treats AI like <span className="text-gradient">infrastructure</span>, not magic.
            </h2>
            <p className="mt-6 text-muted-foreground md:text-lg">
              I'm {SITE.name.split(" ")[0]} — I build machine learning and generative AI systems that survive
              contact with real users and real data. From medical image classifiers and predictive
              maintenance pipelines to RAG knowledge agents, my work is grounded in three things:
              clean data, honest evaluation, and a UI someone actually wants to use.
            </p>
            <p className="mt-4 text-muted-foreground">
              I work across the whole stack — data engineering, model training, MLOps, and the React /
              FastAPI surfaces that make a model feel like a product. My goal: AI that quietly does
              the job, day after day.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass hover-lift rounded-2xl p-5"
              >
                <p.icon className="size-5 text-primary" />
                <h3 className="mt-3 font-display text-base font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}