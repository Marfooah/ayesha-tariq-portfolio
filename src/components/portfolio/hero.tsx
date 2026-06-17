import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { SITE, FOCUS_AREAS } from "@/lib/site";
import { Particles } from "./particles";
import { NeuralHero } from "./neural-hero";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
      <div className="absolute inset-0 bg-mesh opacity-70" aria-hidden />
      <div
        className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_30%,transparent_70%)]"
        aria-hidden
      />
      <div className="absolute inset-0">
        <Particles density={80} />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald animate-pulse-glow" />
            Open to AI / ML internships &amp; collaborations
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Teaching machines to solve problems<br />
            <span className="text-gradient">while humans keep creating new ones</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            {SITE.subheadline}. {SITE.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
            >
              View projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.06]"
            >
              Explore my work
              <ArrowRight className="size-4" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" /> Contact
            </a>
          </motion.div>

          <div className="mt-12">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Current focus
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {FOCUS_AREAS.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.06 }}
                  className="glass hover-lift group rounded-xl px-3 py-2.5"
                >
                  <div className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {f.title}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                    {f.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative mx-auto aspect-square w-full max-w-lg lg:h-[520px] lg:max-w-none lg:aspect-auto"
        >
          <NeuralHero />
          <div className="glass-strong absolute -bottom-4 -left-4 rounded-xl px-3 py-2 text-xs">
            <span className="text-muted-foreground">Currently:</span>{" "}
            <span className="text-foreground">Building ML portfolio projects</span>
          </div>
          <div className="glass-strong absolute -right-3 top-6 rounded-xl px-3 py-2 text-xs">
            <span className="text-emerald">●</span> Learning in public
          </div>
        </motion.div>
      </div>
    </section>
  );
}
