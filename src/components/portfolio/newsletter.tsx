import { motion } from "framer-motion";
import { SectionLabel } from "./about";

export function Newsletter() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-strong relative overflow-hidden rounded-3xl px-8 py-12 md:px-14 md:py-16"
        >
          {/* Ambient orb */}
          <div
            className="absolute -left-20 -top-20 size-72 rounded-full bg-primary opacity-10 blur-3xl"
            aria-hidden
          />

          <div className="relative max-w-xl">
            <SectionLabel>The UGG Letter</SectionLabel>

            <h2 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Build better.{" "}
              <span className="text-gradient">Operate smarter.</span>
            </h2>

            <p className="mt-4 text-muted-foreground">
              Occasional insights on AI, customer support, e-commerce automation,
              and building businesses with intention.
            </p>

            {/* Hostinger Reach form embed — script loaded globally in __root.tsx */}
            <div className="mt-8">
              <div data-reach-form="283a6646-75ba-4e75-8e10-1677ff381284" />
            </div>

            <p className="mt-4 px-1 text-xs text-muted-foreground/60">
              No noise. No spam. Just useful insights, when they're worth sending.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
