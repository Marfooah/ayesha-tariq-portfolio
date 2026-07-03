import { motion } from "framer-motion";
import { SERVICES, type Service } from "@/lib/site";
import { SectionLabel } from "./about";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="glass hover-lift group relative overflow-hidden rounded-2xl p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-primary to-emerald opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
      <h3 className="font-display text-lg font-semibold">{service.title}</h3>
      <p className="mt-3 text-xs text-muted-foreground">
        <span className="text-primary">Problem:</span> {service.problem}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        <span className="text-emerald">Outcome:</span> {service.outcome}
      </p>
      <p className="mt-2 text-[11px] italic text-muted-foreground/70">{service.transformation}</p>
    </div>
  );
}

export function Skills() {
  return (
    <section id="systems" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>What We Build</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          Intelligent systems for{" "}
          <span className="text-gradient">every part of your business</span>.
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
