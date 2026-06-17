import { motion } from "framer-motion";
import { Brain, Cpu, Sparkles, Target } from "lucide-react";
import { SITE } from "@/lib/site";

const PILLARS = [
  { icon: Brain, title: "Curious by default", desc: "Reading papers and breaking models apart to understand why they work." },
  { icon: Cpu, title: "Hands-on practice", desc: "Building, training and evaluating models — not just watching tutorials." },
  { icon: Sparkles, title: "Beyond the notebook", desc: "Wrapping experiments into Streamlit and web apps people can actually use." },
  { icon: Target, title: "Honest about progress", desc: "Showing real work in real time — no inflated metrics, no fake claims." },
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
              An aspiring engineer learning AI <span className="text-gradient">by building it</span>.
            </h2>
            <p className="mt-6 text-muted-foreground md:text-lg">
              I'm {SITE.name.split(" ")[0]} — an aspiring AI engineer and machine learning enthusiast.
              I learn by building real projects in Python with NumPy, Pandas, Scikit-Learn and
              TensorFlow, then shipping them as Streamlit or web apps so the work doesn't stay
              stuck in a notebook.
            </p>
            <p className="mt-4 text-muted-foreground">
              My focus right now is machine learning, deep learning and computer vision — and
              getting better every week. I'm actively looking for an internship where I can
              contribute to real systems and learn from experienced engineers.
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