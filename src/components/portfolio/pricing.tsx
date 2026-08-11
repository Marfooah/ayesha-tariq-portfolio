import { motion } from "framer-motion";
import { SectionLabel } from "@/components/portfolio/about";
import { SITE, PRICING_TIERS } from "@/lib/site";
import type { PricingTier } from "@/lib/site";

export function Pricing() {
  return (
    <section id="pricing" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">

        {/* Section header */}
        <SectionLabel>Engagement / Investment</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          What it costs.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Our engagement models are designed around the level of operational
          complexity, integrations, and ongoing support your business requires.
        </p>

        {/* Tier list */}
        <div className="mt-16">
          {PRICING_TIERS.map((tier: PricingTier, i: number) => (
            <div key={tier.number}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-4 py-8 md:flex-row md:items-start md:gap-0"
              >
                {/* Left column — tier number, name, description */}
                <div className="flex flex-1 flex-col gap-2">
                  <span className="font-mono text-xs tracking-widest text-muted-foreground">
                    {tier.number}
                  </span>
                  <h3 className="font-display text-xl font-semibold uppercase tracking-widest">
                    {tier.name}
                  </h3>
                  <p className="max-w-md text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </div>

                {/* Right column — price, billing */}
                <div className="flex flex-col gap-1 md:items-end md:text-right">
                  <span className="font-display text-2xl font-bold">
                    {tier.price}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {tier.billing}
                  </span>
                </div>
              </motion.div>

              {/* Divider between tiers — not after the last */}
              {i < PRICING_TIERS.length - 1 && (
                <hr className="border-white/10" />
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer block */}
        <div className="mt-10 space-y-2">
          <p className="text-sm text-muted-foreground">
            — Every engagement begins with an assessment of the existing workflow.
          </p>
          <p className="text-sm text-muted-foreground">
            — Investment is determined by scope, integrations, complexity, and
            operational requirements.
          </p>
        </div>

        {/* Restrained CTA */}
        <div className="mt-8">
          <a
            href={SITE.auditUrl}
            className="text-sm underline underline-offset-4 transition hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Request an Assessment
          </a>
        </div>

      </div>
    </section>
  );
}
