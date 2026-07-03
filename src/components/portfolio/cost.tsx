import { motion } from "framer-motion";
import { COST_ITEMS, type CostItem } from "@/lib/site";
import { SectionLabel } from "./about";

export function CostGrid({ items }: { items: CostItem[] }) {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
          className="glass hover-lift rounded-2xl p-6"
        >
          <h3 className="font-display text-base font-semibold">
            <span className="text-gradient">{item.title}</span>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function Cost() {
  return (
    <section id="cost" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>The Hidden Cost</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          Manual work compounds into a{" "}
          <span className="text-gradient">permanent competitive disadvantage</span>.
        </h2>
        {COST_ITEMS.length === 0 && (
          <p className="mt-4 max-w-xl text-muted-foreground">
            Every hour spent on repetitive manual tasks is an hour your competitors could be using to scale.
          </p>
        )}
        <CostGrid items={COST_ITEMS} />
      </div>
    </section>
  );
}
