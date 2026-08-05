import { motion } from "framer-motion";
import { SectionLabel } from "./about";
import type { CostItem } from "@/lib/site";

const OPERATIONAL_COSTS: CostItem[] = [
  {
    title: "Repeated Questions",
    desc: "The same questions arrive every day. Each one requires a person to read, process, and reply. That cost compounds.",
  },
  {
    title: "Delayed Replies",
    desc: "When volume exceeds capacity, response times slip. Customers notice before you see it in the data.",
  },
  {
    title: "Higher Payroll",
    desc: "The instinct is to hire. But hiring for repetitive work adds cost without adding capability.",
  },
  {
    title: "Longer Training",
    desc: "Every new hire needs time before they become useful. That gap costs you twice — in time and in quality.",
  },
  {
    title: "More Management",
    desc: "Larger teams require more coordination. Coordination takes time away from the work that actually matters.",
  },
  {
    title: "More Complexity",
    desc: "What started as a support team becomes an operational layer that needs its own management. Growth becomes expensive.",
  },
];

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
        <SectionLabel>The Operational Reality</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          The system is the bottleneck.{" "}
          <span className="text-gradient">Not the team.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Most growing ecommerce brands handle support the same way. More volume means more people.
          More people means more management. The hidden costs accumulate before anyone notices.
        </p>
        <CostGrid items={OPERATIONAL_COSTS} />
      </div>
    </section>
  );
}
