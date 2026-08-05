import { motion } from "framer-motion";
import { SectionLabel } from "./about";
import type { Service } from "@/lib/site";

const FOCUS_AREAS = [
  {
    title: "Customer Support",
    problem: "Routine questions arrive repeatedly and require a person to handle each one.",
    outcome: "Conversations are resolved before they reach your team.",
    transformation: "We design systems that handle the predictable so your team handles the important.",
  },
  {
    title: "Order & Return Workflows",
    problem: "Order status, returns, and exchanges are your highest-volume contact reasons.",
    outcome: "The majority of these interactions require no human involvement at all.",
    transformation: "We build workflows that process requests, update records, and communicate with customers end-to-end.",
  },
  {
    title: "Internal Support Operations",
    problem: "Your support team spends time on internal requests that slow down their actual work.",
    outcome: "Internal queries are handled systematically, not manually.",
    transformation: "We reduce the operational overhead inside your support function so your team operates leaner.",
  },
];

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="glass hover-lift group relative overflow-hidden rounded-2xl p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-primary to-emerald opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
      <h3 className="font-display text-lg font-semibold">{service.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{service.problem}</p>
      <p className="mt-3 text-sm font-medium text-foreground">{service.outcome}</p>
      <p className="mt-2 text-xs italic text-muted-foreground/70">{service.transformation}</p>
    </div>
  );
}

export function Skills() {
  return (
    <section id="systems" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>What We Improve</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          Three areas.{" "}
          <span className="text-gradient">One specialism.</span>
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {FOCUS_AREAS.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ServiceCard service={area} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
