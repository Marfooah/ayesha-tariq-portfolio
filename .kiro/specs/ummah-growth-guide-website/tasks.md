# Implementation Plan: Ummah Growth Guide Website

## Overview

Transform the existing Ayesha Tariq personal portfolio into the Ummah Growth Guide (UGG) Business
Systems Studio website. The transformation is config-driven: all copy constants are centralised in
`src/lib/site.ts`, each portfolio component is evolved in place, and two new components (`cost.tsx`,
`faq.tsx`) are added. The visual identity (oklch palette, glassmorphism, typography, NeuralHero,
Particles) is preserved without modification throughout.

Implementation proceeds in strict dependency order: `site.ts` first (all components depend on it),
then components in isolation, then the page route, then the property-based test suite.

---

## Tasks

- [x] 1. Rewrite `src/lib/site.ts` — all copy constants and TypeScript interfaces
  - Delete: `FOCUS_AREAS`, `SKILL_GROUPS`, `LEARNING_JOURNEY`, `CERTIFICATIONS`, `ENGINEERING_PROCESS`
  - Add TypeScript interfaces: `ProofCard`, `CostItem`, `Service`, `EngagementStep`, `Principle`, `FaqItem`
  - Rewrite `SITE` constant: set `name`, `tagline`, `auditUrl`, `email`, `linkedin`, `github`, `githubUser`, `socialProof`
  - Add `META` constant with `title` (≤ 70 chars) and `description` (≤ 160 chars, includes "intelligent systems" and Primary_CTA offer)
  - Add `PROOF_CARDS: ProofCard[]` — minimum 3 entries (value + label per entry)
  - Add `COST_ITEMS: CostItem[]` — 4–6 entries (title ≤ 4 words, desc 1–2 sentences)
  - Add `SERVICES: Service[]` — exactly 22 entries with all four fields (title, problem, transformation, outcome); no first-person pronouns
  - Add `ENGAGEMENT_PROCESS: EngagementStep[]` — exactly 6 entries with title + desc ≤ 200 chars per step; add build-time assertion that throws if length ≠ 6
  - Add `PRINCIPLES: Principle[]` — 4–6 entries with title, desc, and icon (Lucide icon name string)
  - Add `FAQ_ITEMS: FaqItem[]` — 7–10 entries covering: existing tools compatibility, AI handling repetitive work, agent decision boundaries, employee oversight, data security, system evolution, which businesses benefit most
  - Ensure zero first-person singular pronouns (`\bI\b`, `\bmy\b`, `\bme\b`) and zero forbidden buzzwords (`revolutionary`, `cutting-edge`, `game-changer`, `synergy`, `leverage`, `innovative`) in any exported string
  - _Requirements: 1.1, 1.3, 3.10, 4.3, 5.3, 6.3, 8.3, 9.3, 13.1, 13.3_

- [x] 2. Update `src/components/portfolio/nav.tsx`
  - [x] 2.1 Replace `LINKS` array with UGG nav links
    - Remove old links (`#about`, `#skills`, `#projects`, `#experience`, `#contact`)
    - Replace with: `"Systems"→#systems`, `"Process"→#process`, `"Work"→#work`, `"Why UGG"→#why-ugg`, `"FAQ"→#faq` in that order
    - Change logo text from `{SITE.name}` to `"UGG"` (keep `font-display` class and primary-colour dot)
    - Remove `<Link to="/auth">Admin</Link>` element entirely
    - Change CTA button label from `"Get in touch"` to `"Free Audit"` and href from `#contact` to `SITE.auditUrl`
    - Preserve: `fixed inset-x-0 top-0 z-50`, `glass-strong mx-auto … rounded-2xl px-5 py-3`, `hidden md:flex` on link list, `rounded-full bg-foreground … text-background` on CTA button
    - _Requirements: 1.2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  - [x] 2.2 Write unit tests for `nav.tsx`
    - Assert "UGG" logo text is rendered
    - Assert all 5 nav link labels and hrefs are present in order
    - Assert "Free Audit" button is present in the DOM
    - Assert no element with href="/auth" or text "Admin" exists
    - _Requirements: 2.1, 2.2_

- [x] 3. Update `src/components/portfolio/hero.tsx`
  - [x] 3.1 Replace personal copy and focus-area grid with UGG copy and PROOF_CARDS grid
    - Remove imports: `FOCUS_AREAS`; add import: `PROOF_CARDS`
    - Replace floating badge copy with `"Now taking on new clients"` (keep `glass rounded-full px-3 py-1 text-xs animate-pulse-glow` emerald dot)
    - Replace `h1` with cost-of-inaction headline ending in a `text-gradient` span
    - Replace `subheadline` paragraph with ≤ 2-sentence UGG intro, no first-person singular pronouns
    - Replace primary CTA: label `"Get Your Free AI Opportunity Audit"`, href `SITE.auditUrl`, keep `bg-foreground text-background rounded-full` + `ArrowRight` icon
    - Replace secondary CTA: label `"Explore Intelligent Systems"`, href `#systems`, keep `glass rounded-full` style
    - Remove `<a href="mailto:…">Contact</a>` third button
    - Replace focus-area grid with `PROOF_CARDS` grid: label `"What UGG delivers"`, `grid-cols-3 gap-3`, each card `glass hover-lift rounded-xl px-3 py-2.5 text-center`, value in `text-gradient font-display text-lg font-bold`, label in `text-[11px] text-muted-foreground`
    - Preserve: `lg:grid-cols-[1.05fr_0.95fr]` layout, NeuralHero right column, `<Particles density={80} />`, `bg-mesh opacity-70`, `bg-grid opacity-40`, `motion.div` animation timing throughout
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10_
  - [x] 3.2 Write property test for PROOF_CARDS hero card count (Property 1)
    - **Property 1: PROOF_CARDS always renders at least three hero cards**
    - **Validates: Requirements 3.10**
    - Use fast-check to generate `PROOF_CARDS` arrays of length ≥ 3 and assert the rendered card count equals the array length

- [x] 4. Create `src/components/portfolio/cost.tsx` — NEW FILE
  - [x] 4.1 Implement the Cost component with sub-component for testable injection
    - Create `CostGrid` sub-component accepting `items: CostItem[]` as prop (enables property testing without module mocking)
    - Implement `Cost` parent that imports `COST_ITEMS` from site.ts and passes it to `CostGrid`
    - Section: `id="cost"`, `relative px-6 py-24 md:py-32`
    - Render `SectionLabel` ("The Hidden Cost") imported from `./about`
    - Render `h2` headline (≤ 12 words naming the compounding cost), with a `text-gradient` span
    - Fallback `<p>` paragraph when `COST_ITEMS.length === 0` (alongside label and headline, not replacing them)
    - Card grid: `mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3`
    - Each card: `motion.div` with `initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}`, `transition={{ duration: 0.5, delay: i * 0.07 }}`, `glass hover-lift rounded-2xl p-6`
    - Card title in `<h3>` wrapped in `<span className="text-gradient">`, card desc in `<p className="… text-muted-foreground">`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  - [x] 4.2 Write property test for CostGrid card elements (Property 2)
    - **Property 2: Every COST_ITEMS entry renders all required card elements**
    - **Validates: Requirements 4.3**
    - Use fast-check to generate arrays of `{ title, desc }` objects and render `<CostGrid items={...} />`; assert each title and desc appears in the DOM and that `.text-gradient` elements count ≥ items.length

- [x] 5. Update `src/components/portfolio/skills.tsx` → Services Section
  - [x] 5.1 Evolve `Skills` to render the Services section
    - Replace `SKILL_GROUPS` import with `SERVICES` import from site.ts
    - Change section `id` from `"skills"` to `"systems"`
    - Update `SectionLabel` to `"What We Build"`
    - Update `h2` headline to reference intelligent systems (no "Services" word)
    - Create `ServiceCard` sub-component accepting a single `Service` as prop (for property testing)
    - Replace skill-group card internals with: `<h3>` for title, `<p>` for problem (prefixed with "Problem:"), `<p>` for outcome (prefixed with "Outcome:"), `<p>` for transformation (italic, muted)
    - Preserve: `glass hover-lift group relative overflow-hidden rounded-2xl p-6` card class, `pointer-events-none` radial glow, `motion.div whileInView` animation, `gap-4 sm:grid-cols-2 lg:grid-cols-3` grid
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_
  - [x] 5.2 Write property test for ServiceCard four-field render (Property 3)
    - **Property 3: Every SERVICES entry renders all four required fields**
    - **Validates: Requirements 5.4**
    - Use fast-check to generate `Service` objects (all four fields non-empty) and render `<ServiceCard service={...} />`; assert title, problem, transformation, and outcome all appear in the DOM

- [x] 6. Update `src/components/portfolio/process.tsx` → Engagement Process
  - [x] 6.1 Evolve `Process` to render the 6-step Engagement Process
    - Replace `ENGINEERING_PROCESS` import with `ENGAGEMENT_PROCESS` import from site.ts
    - Replace icon imports and `ICONS` array with: `import { Search, LayoutDashboard, GitBranch, Code2, Rocket, TrendingUp } from "lucide-react"` and `const ICONS = [Search, LayoutDashboard, GitBranch, Code2, Rocket, TrendingUp]`
    - Update `SectionLabel` to `"How We Work"`
    - Update `h2` headline: `"A clear path from <span className="text-gradient">problem to system</span>."`
    - Remove personal subheadline `<p>`
    - Render `ENGAGEMENT_PROCESS.slice(0, 6)` (safety guard for runtime)
    - Apply `shadow-glow` class only on index 0: `` className={`glass hover-lift … ${i === 0 ? "shadow-glow" : ""}`} ``
    - Update `ArrowDown` connector condition from `i < ENGINEERING_PROCESS.length - 1` to `i < 5`
    - Preserve: `glass hover-lift group relative overflow-hidden rounded-2xl p-6`, `pointer-events-none` radial glow, `motion.div whileInView`, step counter `Step 01`…`Step 06`, `md:grid-cols-2 lg:grid-cols-3`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8_
  - [x] 6.2 Write property test for process step count (Property 4)
    - **Property 4: Process section renders exactly 6 steps regardless of array length**
    - **Validates: Requirements 6.3, 6.4**
    - Use fast-check to generate `EngagementStep` arrays of length 6–20 and assert the rendered step card count is always exactly 6
  - [x] 6.3 Write property test for fixed icon mapping (Property 5)
    - **Property 5: Process step icons follow the fixed index-based mapping**
    - **Validates: Requirements 6.5**
    - For each index 0–5, render the process step and assert the correct Lucide icon `data-lucide` attribute or test-id is present
  - [x] 6.4 Write property test for shadow-glow exclusivity (Property 6)
    - **Property 6: shadow-glow applied exclusively to the step at index 0**
    - **Validates: Requirements 6.8**
    - For any valid 6-item `ENGAGEMENT_PROCESS`, render the Process component and assert exactly one step card has the `shadow-glow` class and it is at position 0; assert positions 1–5 do not have it

- [x] 7. Update `src/components/portfolio/projects.tsx` → Case Studies
  - [x] 7.1 Add `isLoading` and `isError` props, update copy, implement loading skeleton and empty/error states
    - Change section `id` from `"projects"` to `"work"`
    - Update `SectionLabel` to `"Work"` and `h2` to include phrase `"case studies"`
    - Update sub-paragraph to `"Real intelligent systems built for real business operations."`
    - Add `isLoading: boolean` and `isError: boolean` to the `Projects` component prop signature
    - Implement loading skeleton when `isLoading === true`: `grid gap-6 md:grid-cols-2`, 4 skeleton cards with `glass-strong rounded-3xl overflow-hidden animate-pulse`, aspect-ratio div + text placeholder divs
    - Implement empty/error state when `!isLoading && (isError || projects.length === 0)`: `glass rounded-2xl p-12 text-center text-muted-foreground` with text `"New case studies coming soon."`
    - Render project card grid only when `!isLoading && projects.length > 0`
    - Ensure the three render states are mutually exclusive
    - Preserve: 3D tilt interaction, `glass-strong` card style, `hover:shadow-glow`, thumbnail gradient overlay, technology pill tags, `Featured` badge, `motion.div whileInView`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_
  - [x] 7.2 Write property test for ProjectCard required data fields (Property 7)
    - **Property 7: Every Project card renders all required data fields**
    - **Validates: Requirements 7.3**
    - Use fast-check to generate `Project` objects with non-empty `title`, `short_description`, `technologies[]`, and `metrics[]`; render `<ProjectCard project={...} delay={0} />`; assert all four fields appear in the DOM

- [x] 8. Update `src/components/portfolio/about.tsx` → Why UGG Section
  - [x] 8.1 Evolve `About` to render the Why UGG section
    - Add imports: `Target, GitBranch, Code2, TrendingUp, LayoutDashboard, Rocket, Brain, Sparkles` from lucide-react
    - Define `ICON_MAP: Record<string, React.ComponentType<{ className?: string }>>` mapping icon name strings to components; unknown names fall back to `Target`
    - Import `PRINCIPLES` from site.ts; remove `PILLARS` constant and `SITE.name` bio copy
    - Change section `id` from `"about"` to `"why-ugg"`
    - Update `SectionLabel` to `"Why UGG"`
    - Update `h2` to frame section around Visitor benefit ("your business"), second-person only, no first-person
    - Remove two-column bio/pillars layout; replace with single `SectionLabel + h2 + grid` layout
    - Render principles grid only when `PRINCIPLES.length > 0` (guard required)
    - Grid: `mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3`; each card: `glass hover-lift rounded-2xl p-5`
    - Each principle card: icon resolved from `ICON_MAP`, title in `<h3>`, desc in `<p className="… text-muted-foreground">`
    - Preserve `SectionLabel` export (still exported from this file for other components to import)
    - Preserve `motion.div whileInView` with `delay: i * 0.06`
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_
  - [x] 8.2 Write property test for principle card three-field render (Property 8)
    - **Property 8: Every PRINCIPLES entry renders its icon, title, and description**
    - **Validates: Requirements 8.4**
    - Use fast-check to generate `Principle` objects (title, desc, valid icon name); render the principle card; assert a Lucide icon element, the title text, and the desc text are all present in the DOM

- [x] 9. Create `src/components/portfolio/faq.tsx` — NEW FILE
  - [x] 9.1 Implement the FAQ component using the shadcn Accordion primitive
    - Import `FAQ_ITEMS` from site.ts, `SectionLabel` from `./about`, `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger` from `@/components/ui/accordion`
    - Section: `id="faq"`, `relative px-6 py-24 md:py-32`
    - Render `SectionLabel` ("FAQ") and `h2` headline of ≤ 8 words with a `text-gradient` span
    - Wrap accordion in `motion.div` with `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-60px" }}`, `transition={{ duration: 0.6 }}`
    - Container: `glass-strong relative overflow-hidden rounded-3xl p-8 md:p-14`
    - Ambient orb: `absolute -right-20 -top-20 size-72 rounded-full bg-primary opacity-10 blur-3xl`
    - `<Accordion type="multiple">` — allows multiple items open simultaneously
    - Each `AccordionItem`: `value={`item-${i}`}`, `className="border-white/10"`
    - `AccordionTrigger`: `text-base font-semibold text-foreground hover:no-underline hover:text-primary`
    - `AccordionContent`: `text-muted-foreground`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

- [x] 10. Update `src/components/portfolio/contact.tsx` → Final CTA Section
  - [x] 10.1 Replace contact form with Final CTA section; create `FinalCTAContent` sub-component for testing
    - Remove: `useState`, `toast`, `onSubmit`, `Field` function, entire `<form>`, `<ul>` social list items, `Mail/Github/Linkedin/MapPin/Send` icon imports
    - Add imports: `ArrowRight` from lucide-react; keep `motion`, `SITE`, `SectionLabel`
    - Extract inner rendered content into `FinalCTAContent` sub-component accepting `auditUrl: string | undefined` and `socialProof: string | undefined` as props (enables property testing)
    - Section: `id="contact"`, `relative px-6 py-24 md:py-32`
    - Container: `glass-strong relative overflow-hidden rounded-3xl p-8 md:p-14 text-center`
    - Two ambient orbs: `-right-20 -top-20 bg-primary opacity-20` and `-bottom-24 -left-10 bg-emerald opacity-20`
    - `motion.div` with `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`
    - `SectionLabel` ("Start Here"), emotionally direct `h2` headline with `text-gradient` span
    - Supporting paragraph (1–2 sentences, no fear-based or hype language)
    - CTA button: when `SITE.auditUrl` is truthy → `<a href={SITE.auditUrl}>` with `bg-foreground text-background rounded-full` + `ArrowRight`; when falsy → `<button disabled>` with `opacity-40 cursor-not-allowed`
    - Social proof pill: render `glass rounded-full px-3 py-1 text-xs` pill only when `SITE.socialProof` is a non-empty string; zero DOM nodes otherwise
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8_
  - [x] 10.2 Write property test for Final CTA auditUrl href (Property 9)
    - **Property 9: Final CTA button href equals the configured auditUrl**
    - **Validates: Requirements 10.6**
    - Use fast-check to generate non-empty `auditUrl` strings; render `<FinalCTAContent auditUrl={url} />`; assert the rendered `<a>` element's `href` equals the generated string exactly
  - [x] 10.3 Write property test for social proof conditional render (Property 10)
    - **Property 10: Social proof pill renders if and only if socialProof is a non-empty string**
    - **Validates: Requirements 10.8**
    - Use fast-check to generate values spanning `undefined`, empty string `""`, and non-empty strings; render `<FinalCTAContent socialProof={value} />`; assert pill is present iff value is a non-empty string

- [x] 11. Update `src/components/portfolio/footer.tsx`
  - [x] 11.1 Update Footer branding, add Free Audit link, remove Admin link
    - Remove `<Link to="/auth">Admin</Link>` — zero DOM nodes under any condition
    - Import removal: `Link` from `@tanstack/react-router` (no longer needed)
    - Update brand block: render `{SITE.name}` (now "Ummah Growth Guide") and `{SITE.tagline}` together, both always rendered (`mt-0.5 text-xs text-muted-foreground` for tagline)
    - Add `"Get Your Free Audit"` link pointing to `SITE.auditUrl` above the social icons (`hover:text-foreground text-xs font-medium`)
    - Update `github`, `linkedin`, `email` hrefs to UGG values via `SITE` (already resolved by site.ts rewrite in task 1)
    - Preserve: `border-t border-white/5 px-6 py-10`, `flex sm:flex-row sm:items-center sm:justify-between`, icon sizing
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_
  - [x] 11.2 Write property test for Footer Admin link absence (Property 11)
    - **Property 11: Footer never contains an Admin link element**
    - **Validates: Requirements 11.3**
    - Render `<Footer />` with fast-check (or as a simple deterministic assertion); assert no element with `href="/auth"` or text content "Admin" is in the DOM

- [x] 12. Update `src/routes/index.tsx` — section order, meta tags, prop threading
  - [x] 12.1 Wire all components together in the correct section order
    - Remove imports: `Experience`, `GithubStats` — neither should be imported or rendered
    - Add imports: `Cost` from `./cost`, `FAQ` from `./faq`
    - Import `META` alongside `SITE` from `@/lib/site`
    - Update `useQuery` destructuring: add `isLoading`, `isError`
    - Update `head()` meta: replace old meta with `META.title` for title, `META.description` for description, and matching `og:title` / `og:description` using `META` constants
    - Replace render tree with the required order: `<Nav />` → `<Hero />` → `<Cost />` → `<Skills />` → `<Process />` → `<Projects projects={projects} isLoading={isLoading} isError={isError} />` → `<About />` → `<FAQ />` → `<Contact />` → `<Footer />`
    - _Requirements: 14.1, 14.2, 14.3, 15.1, 15.2, 15.3, 15.4_

- [x] 13. Checkpoint — verify build and all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 14. Write property-based tests for site config string hygiene
  - [x] 14.1 Write property test for no first-person pronouns in site config (Property 12)
    - **Property 12: No first-person singular pronouns in any site config string**
    - **Validates: Requirements 13.1, 13.2**
    - Import all string-bearing arrays from `site.ts` (`SITE`, `SERVICES`, `PRINCIPLES`, `FAQ_ITEMS`, `COST_ITEMS`, `ENGAGEMENT_PROCESS`)
    - Collect all string values into a flat array
    - For each string, assert it does not match `\bI\b`, `\bmy\b` (case-insensitive), `\bme\b` (case-insensitive)
    - Note: this is a deterministic data test; fast-check iterates over the collected array
  - [x] 14.2 Write property test for no forbidden marketing buzzwords in site config (Property 13)
    - **Property 13: No forbidden marketing buzzwords in any site config string**
    - **Validates: Requirements 13.3**
    - Using the same collected string array as 14.1, assert each string does not match (case-insensitive): `revolutionary`, `cutting-edge`, `game-changer`, `synergy`, `leverage`, `innovative`

- [x] 15. Final checkpoint — full regression
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP, but each property-based
  test directly validates a formal correctness requirement from the design document.
- Every component that needs property testing exposes a pure sub-component accepting data as props
  (e.g. `CostGrid`, `ServiceCard`, `FinalCTAContent`) — this avoids module-level mocking and keeps
  property tests clean.
- `site.ts` is the only file whose changes cascade to all other components — it MUST be completed
  before any component work starts.
- `SectionLabel` remains exported from `about.tsx` (not moved) because all other components
  already import it from there; no import refactor is needed.
- The build-time assertion in `ENGAGEMENT_PROCESS` (`if (length !== 6) throw`) runs at module
  evaluation time — any misconfiguration will surface as a build or SSR startup error.
- Properties 12 and 13 (Tasks 14.1 and 14.2) are deterministic data tests over static config,
  not random-input property tests, but they use the same fast-check `fc.assert` harness for
  consistency with the rest of the test suite.
- Task 12.1 removes `GithubStats` and `Experience` imports completely — they must not appear
  anywhere in `index.tsx`, not even in commented-out code.

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "3.1", "4.1", "5.1", "6.1", "7.1", "8.1", "9.1", "10.1", "11.1"] },
    { "id": 2, "tasks": ["2.2", "3.2", "4.2", "5.2", "6.2", "6.3", "6.4", "7.2", "8.2", "10.2", "10.3", "11.2"] },
    { "id": 3, "tasks": ["12.1"] },
    { "id": 4, "tasks": ["14.1", "14.2"] }
  ]
}
```
