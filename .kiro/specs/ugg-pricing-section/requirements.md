# Requirements Document

## Introduction

This feature adds a new **Engagement / Investment** (pricing) section to the UGG website. The section presents three engagement tiers — Foundation, System, and Advanced — in an editorial, typographically-led layout that reflects UGG's premium, architectural brand tone. The section must integrate seamlessly into the existing React + TanStack Router + Tailwind v4 codebase without introducing new dependencies, duplicating CSS, or disturbing any other section.

## Glossary

- **Pricing_Section**: The new `<section>` React component named `Pricing`, rendered as part of the main page `index.tsx`.
- **Engagement_Tier**: A single plan row within the Pricing_Section, consisting of a tier number, plan name, short description, and price.
- **Assessment_CTA**: The restrained call-to-action link at the bottom of the Pricing_Section, labelled "Request an Assessment", pointing to `SITE.auditUrl`.
- **Section_Label**: The small all-caps mono-spaced label component (`SectionLabel`) already exported from `about.tsx`, used consistently across all sections.
- **Divider**: A thin horizontal hairline (`<hr>`) separating consecutive Engagement_Tiers, styled with `border-border`.
- **SectionLabel**: The existing exported sub-component from `src/components/portfolio/about.tsx`.
- **SITE**: The existing site-config object exported from `src/lib/site.ts`.
- **Pricing_Data**: A typed constant array of `PricingTier` objects defined in `src/lib/site.ts`.

---

## Requirements

### Requirement 1: Pricing Section Component

**User Story:** As a website visitor, I want to read about UGG's engagement tiers and their pricing in a single, coherent section, so that I can understand the investment required before requesting an assessment.

#### Acceptance Criteria

1. THE Pricing_Section SHALL render a `<section>` element with `id="pricing"` inside the main page layout in `index.tsx`, positioned between the `<FAQ />` and `<Newsletter />` components.
2. THE Pricing_Section SHALL display the section label "ENGAGEMENT / INVESTMENT" using the existing `SectionLabel` component.
3. THE Pricing_Section SHALL display the main heading "What it costs." as an `<h2>` element.
4. THE Pricing_Section SHALL display the supporting paragraph "Our engagement models are designed around the level of operational complexity, integrations, and ongoing support your business requires." as a `<p>` element directly following the heading.
5. WHEN a Pricing_Section Engagement_Tier enters the viewport for the first time, THE Pricing_Section SHALL apply a `framer-motion` `whileInView` animation with `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, a `duration` of `0.5s`, and `viewport={{ once: true }}` so the animation does not repeat on scroll.
6. THE Pricing_Section SHALL render a minimum observable content model per Engagement_Tier: the tier number, plan name, description, price string, and billing cadence must all be present in the DOM as non-empty text nodes.

### Requirement 2: Engagement Tier Display

**User Story:** As a website visitor, I want to see three clearly differentiated engagement tiers with their descriptions and prices, so that I can assess which tier applies to my business.

#### Acceptance Criteria

1. THE Pricing_Section SHALL render exactly three Engagement_Tiers: "FOUNDATION", "SYSTEM", and "ADVANCED", in that order.
2. THE Engagement_Tier SHALL display a zero-padded two-digit tier number (e.g. "01", "02", "03") in a monospaced font using `font-mono` and `text-muted-foreground`.
3. THE Engagement_Tier SHALL display its plan name in `font-display` uppercase `tracking-widest` text.
4. THE Engagement_Tier SHALL display a short description (maximum 120 characters) in `text-muted-foreground` at `text-sm`.
5. THE Engagement_Tier SHALL display its price (e.g. "FROM $1,500 USD") in `font-display text-2xl`, right-aligned on desktop and stacked below the description on mobile.
6. THE Engagement_Tier SHALL display its billing cadence (e.g. "one-time setup") in `font-mono text-xs text-muted-foreground`, right-aligned on desktop and left-aligned on mobile below the price.
7. WHEN the Pricing_Section renders three Engagement_Tiers, THE Pricing_Section SHALL render exactly two Dividers, one between tier 01 and tier 02, and one between tier 02 and tier 03.
8. THE Pricing_Section SHALL NOT render a Divider after the last Engagement_Tier.

### Requirement 3: Pricing Disclaimer

**User Story:** As a website visitor, I want to read the pricing disclaimer so that I understand how investment is determined before I commit to contacting UGG.

#### Acceptance Criteria

1. THE Pricing_Section SHALL display a two-item disclaimer block below the Engagement_Tiers.
2. THE disclaimer block SHALL render the text "Every engagement begins with an assessment of the existing workflow." as the first disclaimer item.
3. THE disclaimer block SHALL render the text "Investment is determined by scope, integrations, complexity, and operational requirements." as the second disclaimer item.
4. EACH disclaimer item SHALL be preceded by an em dash (—) marker to visually distinguish it from body copy.
5. THE disclaimer block SHALL use `text-sm text-muted-foreground` typography.

### Requirement 4: Assessment CTA

**User Story:** As a website visitor ready to enquire, I want a clear but restrained call-to-action to request an assessment, so that I know how to proceed without feeling pressured.

#### Acceptance Criteria

1. THE Pricing_Section SHALL render the Assessment_CTA as an `<a>` element with `href` set to `SITE.auditUrl`.
2. THE Assessment_CTA label SHALL read "Request an Assessment".
3. THE Assessment_CTA SHALL use an underline-only visual style with no background colour, no border, and no filled or outlined pill shape — it SHALL NOT use the solid filled pill style used by the primary hero CTA.
4. WHEN a user hovers over the Assessment_CTA, THE Assessment_CTA SHALL apply `opacity-70` via the `hover:opacity-70` Tailwind utility and the `transition` utility so the opacity change is animated.
5. WHEN the Assessment_CTA receives keyboard focus via keyboard navigation, THE Assessment_CTA SHALL display a visible focus ring using `focus-visible:ring-2` and the site's existing `ring` token, so the ring is not shown on mouse click.

### Requirement 5: Responsive Layout

**User Story:** As a mobile visitor, I want the pricing tiers to remain readable and well-structured on small screens, so that I can evaluate engagement options on any device.

#### Acceptance Criteria

1. IF the viewport width is 768 px or greater (the Tailwind `md` breakpoint), THEN THE Pricing_Section SHALL render each Engagement_Tier as a two-column flex row with plan name and description occupying the left column and price with billing cadence occupying the right column.
2. IF the viewport width is less than 768 px, THEN THE Pricing_Section SHALL render each Engagement_Tier as a single-column stack in the order: tier number, plan name, description, price, billing cadence.
3. THE Dividers SHALL have `display` set to a non-hidden value and SHALL span the full available width at all viewport sizes.
4. THE section heading and supporting paragraph SHALL have a `max-w-2xl` constraint applied so they do not stretch beyond a comfortable reading line length on wide displays.

### Requirement 6: Accessibility

**User Story:** As a visitor using assistive technology, I want the pricing section to be navigable and readable, so that I can access the engagement information regardless of how I browse.

#### Acceptance Criteria

1. THE Pricing_Section heading "What it costs." SHALL be an `<h2>` element that is a descendant of the page's single `<h1>` element, maintaining correct document heading hierarchy.
2. EACH Engagement_Tier plan name SHALL use an `<h3>` element, making it a descendant of the Pricing_Section `<h2>`.
3. THE Assessment_CTA `<a>` element SHALL have visible text content of "Request an Assessment" as its accessible name, without relying on surrounding context or `aria-label`.
4. THE colour contrast of all visible text in the Pricing_Section against its background SHALL meet WCAG AA: a minimum contrast ratio of 4.5:1 for normal text (below 18 pt / 14 pt bold) and 3:1 for large text (18 pt or 14 pt bold and above), using the existing site colour tokens.
5. WHEN the Pricing_Section is rendered, no `<a>`, `<button>`, or other interactive element within it SHALL carry an `aria-hidden="true"` attribute.
6. WHEN a keyboard user navigates through the Pricing_Section using the Tab key, THE focus order SHALL follow the visual top-to-bottom, left-to-right reading order of the section, and each focusable element SHALL receive a visible focus indicator.

### Requirement 7: Code Integration

**User Story:** As a developer maintaining the UGG codebase, I want the pricing section to follow the existing architecture and conventions, so that it does not introduce technical debt or require additional tooling.

#### Acceptance Criteria

1. THE Pricing_Section SHALL be implemented as a new file `src/components/portfolio/pricing.tsx`, exporting a named `Pricing` component.
2. THE `Pricing_Data` (typed as `PricingTier[]`) SHALL be defined as a constant in `src/lib/site.ts`, following the same pattern as `COST_ITEMS`, `FAQ_ITEMS`, and other data constants.
3. THE `PricingTier` interface SHALL be defined in `src/lib/site.ts` and SHALL include the fields: `number` (string, max 5 characters), `name` (string, max 50 characters), `description` (string, max 200 characters), `price` (string, max 20 characters, human-readable display value such as "FROM $1,500 USD"), and `billing` (string, max 50 characters).
4. THE Pricing_Section SHALL import from exactly these three sources and no others: `framer-motion` (for animation primitives), `@/components/portfolio/about` (for `SectionLabel`), and `@/lib/site` (for `SITE` and `Pricing_Data`). Any import statement in `pricing.tsx` that names a source outside this closed list SHALL be considered a failure.
5. THE Pricing_Section SHALL NOT add any new entry to `package.json` dependencies or devDependencies, and SHALL NOT add any new global CSS selector or custom property to `styles.css`.
6. WHEN `index.tsx` is updated to include `<Pricing />`, THE canonical component order in `index.tsx` SHALL be: `<Hero />`, `<About />`, `<Services />`, `<Process />`, `<CaseStudies />`, `<FAQ />`, `<Pricing />`, `<Newsletter />`, `<Footer />` — and no other component's position SHALL change.
