import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import heroImg from "@/assets/hero-portrait.jpg";
import { SITE, STATS } from "@/lib/site";
import { Particles } from "./particles";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
      <div className="absolute inset-0 bg-mesh opacity-70" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_30%,transparent_70%)]" aria-hidden />
      <div className="absolute inset-0">
        <Particles density={80} />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald animate-pulse-glow" />
            Available for AI engineering roles & contracts
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Building AI systems<br />
            that solve <span className="text-gradient">real problems</span>.
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
              href={SITE.resumeUrl}
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.06]"
            >
              <Download className="size-4" /> Resume
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" /> Contact
            </a>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.07 }}
                className="glass rounded-xl px-4 py-3"
              >
                <div className="font-display text-2xl font-bold text-foreground">
                  {s.value}
                  {s.suffix}
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/40 to-emerald/30 opacity-50 blur-3xl animate-pulse-glow" />
          <div className="glass-strong relative overflow-hidden rounded-[2rem] p-2 shadow-elegant">
            <img
              src={heroImg}
              alt={`${SITE.name} — AI Engineer portrait`}
              fetchPriority="high"
              width={896}
              height={1152}
              className="aspect-[7/9] w-full rounded-[1.6rem] object-cover"
            />
            <div className="pointer-events-none absolute inset-2 rounded-[1.6rem] ring-1 ring-inset ring-white/10" />
          </div>
          <div className="glass-strong absolute -bottom-4 -left-4 rounded-xl px-3 py-2 text-xs">
            <span className="text-muted-foreground">Currently:</span>{" "}
            <span className="text-foreground">Shipping RAG agents</span>
          </div>
          <div className="glass-strong absolute -right-3 top-10 rounded-xl px-3 py-2 text-xs">
            <span className="text-emerald">●</span> Production-grade ML
          </div>
        </motion.div>
      </div>
    </section>
  );
}