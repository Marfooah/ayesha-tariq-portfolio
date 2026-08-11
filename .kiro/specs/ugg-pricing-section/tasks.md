# Implementation Plan: UGG Pricing Section

## Tasks

- [ ] 1. Add `PricingTier` interface and `PRICING_TIERS` constant to `src/lib/site.ts`
  - Add `PricingTier` interface with fields: `number`, `name`, `description`, `price`, `billing`
  - Add `PRICING_TIERS: PricingTier[]` constant with all three tiers (Foundation, System, Advanced)
  - _Requirements: 2.1, 7.2, 7.3_

- [ ] 2. Create `src/components/portfolio/pricing.tsx`
  - Export named `Pricing` component
  - Section with `id="pricing"`, `SectionLabel`, `<h2>`, supporting `<p>`
  - Map over `PRICING_TIERS` with `motion.div` whileInView animations
  - Two-column desktop layout, single-column mobile
  - Exactly two `<hr>` dividers (not after last tier)
  - Disclaimer block with em-dash markers
  - Restrained `<a>` CTA (underline only, hover:opacity-70, focus-visible:ring-2)
  - _Requirements: 1.1–1.6, 2.1–2.8, 3.1–3.5, 4.1–4.5, 5.1–5.4, 6.1–6.6, 7.1, 7.4, 7.5_

- [ ] 3. Wire `<Pricing />` into `src/routes/index.tsx`
  - Add import
  - Insert `<Pricing />` between `<FAQ />` and `<Newsletter />`
  - _Requirements: 1.1, 7.6_

- [ ] 4. Verify build passes
  - Run `npm run build` and confirm no errors

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2"] },
    { "id": 2, "tasks": ["3"] },
    { "id": 3, "tasks": ["4"] }
  ]
}
```
