import { Quote } from "lucide-react";
import { SectionLabel } from "./about";

const ITEMS = [
  {
    quote:
      "Shipped a production RAG agent in two weeks that our internal team now relies on daily. Rare combination of research depth and product taste.",
    name: "Engineering Lead",
    role: "Health-tech startup",
  },
  {
    quote:
      "The Grad-CAM explanations made our clinical reviewers actually trust the model. The eval rigor was on another level.",
    name: "Medical Director",
    role: "Diagnostic imaging lab",
  },
  {
    quote:
      "Took our messy sensor data and turned it into a predictive maintenance pipeline with a 24-hour lead-time on failures.",
    name: "Operations Manager",
    role: "Industrial IoT",
  },
];

export function Testimonials() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Signal</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          What collaborators <span className="text-gradient">say</span>.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {ITEMS.map((t) => (
            <figure key={t.name} className="glass hover-lift flex h-full flex-col rounded-2xl p-6">
              <Quote className="size-6 text-primary" />
              <blockquote className="mt-4 flex-1 text-sm text-foreground/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-white/5 pt-4 text-xs">
                <div className="font-medium">{t.name}</div>
                <div className="text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}