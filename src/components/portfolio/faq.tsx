import { motion } from "framer-motion";
import { SectionLabel } from "./about";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "Who is this for?",
    answer:
      "Growing ecommerce brands — typically doing seven figures or more — where support volume has outpaced the team's capacity to handle it efficiently. If you're hiring support staff primarily to answer the same questions repeatedly, that's the problem we solve.",
  },
  {
    question: "What does the system actually do?",
    answer:
      "It resolves routine customer conversations without involving your team. Order status, returns, exchanges, delivery questions, policy queries — these follow predictable patterns. We design systems that handle them end-to-end.",
  },
  {
    question: "Will this replace our support team?",
    answer:
      "No. The goal is to remove repetitive work from your team's plate so they focus on conversations that actually require judgment. Complex queries, escalations, and relationship-sensitive interactions stay with people.",
  },
  {
    question: "Does it work with our existing tools?",
    answer:
      "Yes. We build around your existing stack — Gorgias, Zendesk, Shopify, or whatever you're running. The goal is to improve how your operation works, not to introduce unnecessary complexity.",
  },
  {
    question: "How long does it take?",
    answer:
      "Typically four to eight weeks from scoping to deployment, depending on integration complexity and how clearly the workflows are defined at the start. The Operations Assessment maps this accurately before any work begins.",
  },
  {
    question: "How do you handle edge cases?",
    answer:
      "Every system is designed with a clear escalation path. When a conversation falls outside the defined parameters, it routes to your team with context already attached. Nothing falls through the cracks.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We monitor, measure, and refine. The system improves as it processes more volume. We track resolution rates and flag anything that needs adjustment.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          Straightforward{" "}
          <span className="text-gradient">answers.</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 glass-strong relative overflow-hidden rounded-3xl p-8 md:p-14"
        >
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary opacity-10 blur-3xl" aria-hidden />
          <Accordion type="multiple" className="relative">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
