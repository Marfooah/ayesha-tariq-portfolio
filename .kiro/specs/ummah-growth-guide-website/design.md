# Design Document: Ummah Growth Guide Website

## Overview

This document describes the technical design for transforming the existing Ayesha Tariq personal
portfolio into the official website for **Ummah Growth Guide (UGG)** — a Business Systems Studio.
The transformation is purely content and structure — the full visual identity (oklch dark palette,
glassmorphism utilities, typography, neural canvas, particle system) is preserved without modification.

The single conversion goal is "Get Your Free AI Opportunity Audit" (`auditUrl`).

### Design Philosophy

- **No new dependencies.** Every component reuses the existing design system tokens defined in
  `src/styles.css`. No new UI libraries, no new CSS frameworks.
- **Config-driven content.** All copy lives in `src/lib/site.ts`. Components read constants and
  render them — copy changes never require touching component files.
- **Structural map.** The transformation is a 1:1 mapping of old sections to new sections:
  `skills.tsx` → Services, `process.tsx` → Process, `about.tsx` → Why UGG, `contact.tsx` →
  Final CTA. Two new components are created: `cost.tsx` and `faq.tsx`.

---

## Architecture

The website is a single-page TanStack Start (React 19, SSR) application. The architecture is
unchanged — only `src/routes/index.tsx`, `src/lib/site.ts`, and the portfolio component files
are modified.

```
src/
├── lib/
│   └── site.ts                    ← Full rewrite (all copy constants)
├── routes/
│   └── index.tsx                  ← Section order update, meta tags, remove unused imports
└── components/portfolio/
    ├── nav.tsx                    ← UGG brand, new links, Free Audit CTA
    ├── hero.tsx                   ← New copy, PROOF_CARDS grid
    ├── skills.tsx                 → Services section (id=systems)
    ├── process.tsx                → ENGAGEMENT_PROCESS, fixed icon map, shadow-glow index 0
    ├── projects.tsx               → id=work, loading skeleton, empty/error states
    ├── about.tsx                  → WhyUGG section (id=why-ugg), PRINCIPLES
    ├── cost.tsx                   ← NEW — id=cost, COST_ITEMS grid
    ├── faq.tsx                    ← NEW — id=faq, shadcn Accordion
    ├── contact.tsx                → Final CTA (no form, auditUrl button)
    └── footer.tsx                 ← UGG branding, remove Admin link, add Free Audit link
```

### Data Flow

```
site.ts constants
       │
       ├─ SITE, META         → nav.tsx, hero.tsx, contact.tsx, footer.tsx, routes/index.tsx
       ├─ PROOF_CARDS        → hero.tsx
       ├─ COST_ITEMS         → cost.tsx
       ├─ SERVICES           → skills.tsx
       ├─ ENGAGEMENT_PROCESS → process.tsx
       ├─ PRINCIPLES         → about.tsx
       └─ FAQ_ITEMS          → faq.tsx

Supabase projects table
       │
       └─ TanStack Query (queryKey: "projects-public") → projects.tsx
```

---

## Components and Interfaces

### TypeScript Interfaces (new additions to `src/lib/site.ts`)

```typescript
/** A social-proof metric displayed in the Hero section */
export interface ProofCard {
  value: string;   // e.g. "22+"
  label: string;   // e.g. "System Types Built"
}

/** A pain-point card in The Cost Section */
export interface CostItem {
  title: string;   // ≤ 4 words, e.g. "Invisible Time Drain"
  desc: string;    // 1–2 sentences describing business consequence
}

/** An intelligent system type UGG delivers */
export interface Service {
  title: string;          // e.g. "AI Employees"
  problem: string;        // 1 sentence — what pain this solves
  transformation: string; // 1 sentence — how UGG transforms the situation
  outcome: string;        // 1 sentence — measurable business outcome
}

/** One step in the 6-step engagement process */
export interface EngagementStep {
  title: string; // e.g. "Free AI Opportunity Audit"
  desc: string;  // ≤ 200 characters
}

/** A UGG differentiator / philosophy principle */
export interface Principle {
  title: string;    // e.g. "Business-First, Not AI-First"
  desc: string;     // 1–2 sentences
  icon: string;     // Lucide icon name, e.g. "Target"
}

/** A FAQ question and answer pair */
export interface FaqItem {
  question: string;
  answer: string;
}
```

---

### Component Prop Signatures

```typescript
// nav.tsx — no props (reads SITE from site.ts)
export function Nav(): JSX.Element

// hero.tsx — no props (reads SITE, PROOF_CARDS from site.ts)
export function Hero(): JSX.Element

// skills.tsx (Services) — no props (reads SERVICES from site.ts)
export function Skills(): JSX.Element   // renamed in usage to Services conceptually

// process.tsx — no props (reads ENGAGEMENT_PROCESS from site.ts)
export function Process(): JSX.Element

// projects.tsx — same as current
export function Projects({ projects }: { projects: Project[] }): JSX.Element

// about.tsx (WhyUGG) — no props (reads PRINCIPLES from site.ts)
export function About(): JSX.Element

// cost.tsx — NEW, no props (reads COST_ITEMS from site.ts)
export function Cost(): JSX.Element

// faq.tsx — NEW, no props (reads FAQ_ITEMS from site.ts)
export function FAQ(): JSX.Element

// contact.tsx (FinalCTA) — no props (reads SITE from site.ts)
export function Contact(): JSX.Element

// footer.tsx — no props (reads SITE from site.ts)
export function Footer(): JSX.Element
```

---

## Data Models

### `src/lib/site.ts` — Full Rewrite

#### `SITE` constant

```typescript
export const SITE = {
  name: "Ummah Growth Guide",
  tagline: "We don't sell AI. We redesign how your business operates.",
  auditUrl: "https://cal.com/ummaharowthguide/audit",  // replace with real booking URL
  email: "hello@ummahhgrowthguide.com",
  linkedin: "https://www.linkedin.com/company/ummah-growth-guide",
  github: "https://github.com/ummah-growth-guide",
  githubUser: "ummah-growth-guide",
  socialProof: "20+ systems deployed across 8 industries",  // optional; set to undefined to hide
};
```

#### `META` constant

```typescript
export const META = {
  title: "Ummah Growth Guide — Business Systems Studio",
  description:
    "Ummah Growth Guide builds intelligent systems that eliminate repetitive work. We don't sell AI. We redesign how your business operates. Get your free AI Opportunity Audit.",
};
```
> Note: description is ≤ 160 chars and includes "intelligent systems" and the Primary_CTA offer.

#### `PROOF_CARDS` array (minimum 3)

```typescript
export const PROOF_CARDS: ProofCard[] = [
  { value: "22+", label: "Intelligent System Types" },
  { value: "100%", label: "Custom Architecture" },
  { value: "6-Step", label: "Proven Delivery Process" },
];
```

Hero renders `Math.max(PROOF_CARDS.length, 3)` cards. If fewer than 3 are defined, the component
reads placeholder entries also embedded in `PROOF_CARDS` as the last entries — the array itself
must always contain at least 3 items (the placeholder entries count).

#### `COST_ITEMS` array (4–6 items)

```typescript
export const COST_ITEMS: CostItem[] = [
  { title: "Invisible Time Drain", desc: "Your team spends 60–70% of their week on tasks a system could handle in seconds. That time never comes back." },
  { title: "Inconsistent Execution", desc: "Manual processes break differently every time. Customers experience that inconsistency before you see it in data." },
  { title: "Bottlenecked Growth", desc: "Every new client adds a new manual workload. You cannot scale what depends entirely on human hours." },
  { title: "Knowledge Locked in Heads", desc: "When a key team member leaves, institutional knowledge leaves with them. Systems make that knowledge permanent." },
  { title: "Delayed Decisions", desc: "Without automated data flows, decisions wait on reports that wait on people. Speed compounds over months and years." },
  { title: "Competitor Advantage Lost", desc: "Businesses that automate now are compounding efficiency gains. The gap widens every quarter they operate smarter." },
];
```

#### `SERVICES` array (exactly 22 entries)

Each entry follows the `Service` interface. The 22 required titles in order:
AI Employees, Agentic AI Systems, Workflow Automation, Voice AI Agents, Customer Support Agents,
Internal Knowledge Systems, Lead Qualification Agents, Sales Follow-up Systems, CRM Intelligence,
Email Intelligence, Operations Automation, Document AI, Meeting Intelligence, Executive Assistants,
Custom Business Dashboards, AI Research Agents, Multi-Agent Systems, Internal Company AI,
RAG Knowledge Assistants, MCP Integrations, Custom AI Applications, Future-proof AI Infrastructure.

Example entry shape:
```typescript
{
  title: "AI Employees",
  problem: "Repetitive, rule-based tasks consume skilled team members who were hired for judgment.",
  transformation: "UGG deploys AI agents that handle those tasks end-to-end with no human intervention.",
  outcome: "Your team reclaims 10–15 hours per week to focus on work that actually requires them.",
}
```

#### `ENGAGEMENT_PROCESS` array (exactly 6 steps — build-time assertion required)

```typescript
// Build-time guard — add this immediately after the array definition:
if (ENGAGEMENT_PROCESS.length !== 6) {
  throw new Error(
    `ENGAGEMENT_PROCESS must contain exactly 6 steps. Found: ${ENGAGEMENT_PROCESS.length}`
  );
}
```

Step titles in order: "Free AI Opportunity Audit", "Business Systems Strategy",
"System Architecture", "Development", "Deployment", "Optimisation".

#### `PRINCIPLES` array (4–6 items)

```typescript
export const PRINCIPLES: Principle[] = [
  { title: "Business-First, Not AI-First", desc: "Every system starts with a specific business outcome, not an AI capability. Technology follows strategy.", icon: "Target" },
  { title: "Systems, Not Shortcuts", desc: "Quick fixes create technical debt. UGG builds architectures that compound in value over time.", icon: "GitBranch" },
  { title: "Custom Architecture, Not Templates", desc: "Your workflows are unique. Off-the-shelf automation breaks the moment your process has an edge case.", icon: "Code2" },
  { title: "Built to Scale With You", desc: "Systems are designed to handle 10x your current volume without needing a rebuild.", icon: "TrendingUp" },
  { title: "Designed Around Your Workflow", desc: "Implementation adapts to how your team actually operates, not the other way around.", icon: "LayoutDashboard" },
];
```

#### `FAQ_ITEMS` array (7–10 items)

Covers: compatibility with existing tools, AI handling repetitive work, agent decision boundaries,
employee oversight, data security, system evolution, which businesses benefit most.

---

## File-by-File Change Specification

### 1. `src/lib/site.ts` — Full Rewrite

**Delete:** `FOCUS_AREAS`, `SKILL_GROUPS`, `LEARNING_JOURNEY`, `CERTIFICATIONS`, `ENGINEERING_PROCESS`

**Add:** `META`, `PROOF_CARDS`, `COST_ITEMS`, `SERVICES`, `ENGAGEMENT_PROCESS` (with build assertion),
`PRINCIPLES`, `FAQ_ITEMS`

**Modify:** `SITE` object — update `name`, `tagline`, add `auditUrl`, add `socialProof`, update
contact fields.

---

### 2. `src/components/portfolio/nav.tsx`

**Changes:**

```typescript
// Remove: Link to /auth (Admin button)
// Remove: "Get in touch" CTA linked to #contact

// Replace LINKS array:
const LINKS = [
  { href: "#systems", label: "Systems" },
  { href: "#process", label: "Process" },
  { href: "#work",    label: "Work" },
  { href: "#why-ugg", label: "Why UGG" },
  { href: "#faq",     label: "FAQ" },
];

// Logo: change {SITE.name} to "UGG"
// CTA button: change href="#contact" label="Free Audit"
// Keep: fixed inset-x-0 top-0 z-50, glass-strong, rounded-2xl, hidden md:flex on link list
```

Tailwind classes preserved on nav container: `glass-strong mx-auto flex max-w-6xl items-center
justify-between rounded-2xl px-5 py-3`

CTA button: `rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background
transition-transform hover:scale-[1.03]`

---

### 3. `src/components/portfolio/hero.tsx`

**Remove:** `FOCUS_AREAS` import, focus-area grid, NeuralHero floating status badges with old copy,
personal skill badge overlays.

**Add:** `PROOF_CARDS` import. Render `PROOF_CARDS` as a `grid grid-cols-3 gap-3` of
`glass hover-lift rounded-xl px-4 py-3` cards replacing the focus-area grid.

**ProofCard render pattern:**
```tsx
<div className="mt-12">
  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
    What UGG delivers
  </div>
  <div className="grid grid-cols-3 gap-3">
    {PROOF_CARDS.map((card, i) => (
      <motion.div
        key={card.label}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 + i * 0.06 }}
        className="glass hover-lift rounded-xl px-3 py-2.5 text-center"
      >
        <div className="text-gradient font-display text-lg font-bold">{card.value}</div>
        <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{card.label}</div>
      </motion.div>
    ))}
  </div>
</div>
```

**Headline copy:**
```tsx
<h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
  Your business is leaking time.<br />
  <span className="text-gradient">Every single day.</span>
</h1>
```

**Subheadline (no first-person pronouns):**
```tsx
<p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
  Ummah Growth Guide is a Business Systems Studio that eliminates repetitive manual work by
  designing intelligent systems built around how your business actually operates.
</p>
```

**CTA buttons:**
```tsx
<a href={SITE.auditUrl} className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]">
  Get Your Free AI Opportunity Audit
  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
</a>
<a href="#systems" className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.06]">
  Explore Intelligent Systems
  <ArrowRight className="size-4" />
</a>
```

**Floating status badge:**
```tsx
<motion.div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
  <span className="size-1.5 rounded-full bg-emerald animate-pulse-glow" />
  Now taking on new clients
</motion.div>
```

**Preserved unchanged:** `lg:grid-cols-[1.05fr_0.95fr]` layout, NeuralHero right column,
`<Particles density={80} />`, `bg-mesh opacity-70` layer, `bg-grid opacity-40` layer, all
motion animation timing.

---

### 4. `src/components/portfolio/cost.tsx` — NEW FILE

Full implementation spec:

```tsx
import { motion } from "framer-motion";
import { COST_ITEMS } from "@/lib/site";
import { SectionLabel } from "./about";

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
            Every hour spent on repetitive manual tasks is an hour your competitors could be
            using to scale.
          </p>
        )}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COST_ITEMS.map((item, i) => (
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
      </div>
    </section>
  );
}
```

**Design notes:**
- `md:grid-cols-2` on md+ satisfies the 2-column minimum requirement (req 4.4)
- `text-gradient` applied to each card title satisfies the "styled element" requirement (req 4.3)
- Empty state fallback paragraph renders when `COST_ITEMS.length === 0` (req 4.6)
- `viewport={{ once: true }}` ensures each card animates at most once (req 4.5)

---

### 5. `src/components/portfolio/skills.tsx` → Services Section

**Replace** `SKILL_GROUPS` import with `SERVICES`. Change section `id` to `"systems"`.

```tsx
import { SERVICES } from "@/lib/site";

// Section: id="systems"
// SectionLabel: "What We Build"
// Headline: "Intelligent systems for <span className="text-gradient">every part of your business</span>."
// Grid: gap-4 sm:grid-cols-2 lg:grid-cols-3

// Card pattern (replaces skill group card):
<motion.div className="glass hover-lift group relative overflow-hidden rounded-2xl p-6">
  <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-primary to-emerald opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
  <h3 className="font-display text-lg font-semibold">{service.title}</h3>
  <p className="mt-3 text-xs text-muted-foreground"><span className="text-primary">Problem:</span> {service.problem}</p>
  <p className="mt-1 text-xs text-muted-foreground"><span className="text-emerald">Outcome:</span> {service.outcome}</p>
  <p className="mt-2 text-[11px] italic text-muted-foreground/70">{service.transformation}</p>
</motion.div>
```

**Preserved:** `glass hover-lift group relative overflow-hidden rounded-2xl p-6` card style,
`pointer-events-none` radial glow, `motion.div whileInView` animation pattern, grid breakpoints.

---

### 6. `src/components/portfolio/process.tsx` → Engagement Process

**Replace** `ENGINEERING_PROCESS` import with `ENGAGEMENT_PROCESS`. Change icon array to:

```typescript
import { Search, LayoutDashboard, GitBranch, Code2, Rocket, TrendingUp } from "lucide-react";

// Fixed index-based mapping (requirement 6.5):
const ICONS = [Search, LayoutDashboard, GitBranch, Code2, Rocket, TrendingUp];
//              0        1                2          3       4        5
```

**Heading updates:**
```tsx
// SectionLabel: "How We Work"
// h2: "A clear path from <span className="text-gradient">problem to system</span>."
// Remove personal subheadline paragraph
```

**shadow-glow on index 0 only (requirement 6.8):**
```tsx
className={`glass hover-lift group relative overflow-hidden rounded-2xl p-6 ${
  i === 0 ? "shadow-glow" : ""
}`}
```

**Render only first 6 steps (requirement 6.4):**
```tsx
{ENGAGEMENT_PROCESS.slice(0, 6).map((step, i) => { ... })}
```

**Preserved:** `glass hover-lift group relative overflow-hidden rounded-2xl p-6` card style,
`pointer-events-none` radial glow, `motion.div whileInView` animation, step counter format
`Step 01` through `Step 06`, grid `md:grid-cols-2 lg:grid-cols-3`, `ArrowDown` connector icon
(now only on i < 5 to match exactly 6 steps).

---

### 7. `src/components/portfolio/projects.tsx` → Case Studies

**Change section id** from `"projects"` to `"work"`.

**Update headline and SectionLabel:**
```tsx
// SectionLabel: "Work"
// h2: "Selected <span className="text-gradient">case studies</span>."
// Sub-paragraph: "Real intelligent systems built for real business operations."
```

**Add loading skeleton** — rendered when `isLoading` is `true`. The component needs `isLoading`
and `isError` props, OR the query state is passed from `index.tsx`:

**Recommended approach:** lift query state into `projects.tsx` using `useQuery` directly
(matching how other data-driven components are handled in TanStack Start with Supabase):

```tsx
// projects.tsx signature change:
export function Projects() {
  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ["projects-public"],
    queryFn: ...  // same query as index.tsx
  });
  // index.tsx passes no props — Projects is self-contained
```

Alternatively, keep props but add `isLoading` and `isError`:

```tsx
export function Projects({
  projects,
  isLoading,
  isError,
}: {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
})
```

**Design decision:** keep props-based to avoid duplicating the Supabase query. The parent
`index.tsx` destructures `isLoading` and `isError` from `useQuery` and passes them.

**Loading skeleton pattern (requirement 7.4):**
```tsx
{isLoading && (
  <div className="mt-12 grid gap-6 md:grid-cols-2">
    {[0, 1, 2, 3].map((i) => (
      <div key={i} className="glass-strong rounded-3xl overflow-hidden animate-pulse">
        <div className="aspect-[16/10] bg-white/[0.04]" />
        <div className="p-6 space-y-3">
          <div className="h-4 w-2/3 rounded bg-white/[0.06]" />
          <div className="h-3 w-full rounded bg-white/[0.04]" />
          <div className="h-3 w-4/5 rounded bg-white/[0.04]" />
        </div>
      </div>
    ))}
  </div>
)}
```

**Empty / error state (requirement 7.5):**
```tsx
{!isLoading && (isError || projects.length === 0) && (
  <div className="mt-12 glass rounded-2xl p-12 text-center text-muted-foreground">
    New case studies coming soon.
  </div>
)}
```

**Loaded state (requirement 7.6):** rendered when `!isLoading && projects.length > 0`.
The three states are mutually exclusive — only one renders at a time:
1. `isLoading` → skeleton
2. `!isLoading && (isError || length === 0)` → empty state
3. `!isLoading && length > 0` → project cards

**Preserved:** 3D tilt interaction, `glass-strong` card style, `hover:shadow-glow`, thumbnail
gradient overlay, technology pill tags, `Featured` badge, `motion.div whileInView`.

---

### 8. `src/components/portfolio/about.tsx` → Why UGG Section

**Remove** personal biography text, `SITE.name` bio paragraph, `PILLARS` constant.

**Import** `PRINCIPLES` from site.ts. Resolve icon names at render time using a lookup map:

```typescript
import { Target, GitBranch, Code2, TrendingUp, LayoutDashboard, Rocket, Brain, Sparkles } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Target, GitBranch, Code2, TrendingUp, LayoutDashboard, Rocket, Brain, Sparkles,
};
```

**Section structure:**
```tsx
<section id="why-ugg" className="relative px-6 py-24 md:py-32">
  <SectionLabel>Why UGG</SectionLabel>
  <h2>What makes the difference for <span className="text-gradient">your business</span>.</h2>
  {PRINCIPLES.length > 0 && (
    <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {PRINCIPLES.map((p, i) => {
        const Icon = ICON_MAP[p.icon] ?? Target;
        return (
          <motion.div key={p.title} ... className="glass hover-lift rounded-2xl p-5">
            <Icon className="size-5 text-primary" />
            <h3 className="mt-3 font-display text-base font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
          </motion.div>
        );
      })}
    </div>
  )}
</section>
```

**Guard (requirement 8.6):** The grid renders only when `PRINCIPLES.length > 0`.

**Copy rules (requirement 8.6):** No first-person pronouns. Headline uses "your business".

**Preserved:** `SectionLabel` export (still exported from this file), `glass hover-lift rounded-2xl
p-5` card style, `motion.div whileInView` with staggered `delay: i * 0.06`.

---

### 9. `src/components/portfolio/faq.tsx` — NEW FILE

```tsx
import { motion } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/site";
import { SectionLabel } from "./about";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          Questions worth <span className="text-gradient">answering honestly</span>.
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
```

**Design notes:**
- `type="multiple"` allows several items open simultaneously (requirement 9.4)
- `glass-strong rounded-3xl p-8 md:p-14` mirrors the existing Contact section container (req 9.6)
- `motion.div` wraps the container with `initial={{ opacity: 0, y: 24 }}` (req 9.7)
- `border-white/10` on `AccordionItem` replaces the default shadcn `border-b` grey divider

---

### 10. `src/components/portfolio/contact.tsx` → Final CTA Section

**Remove** the entire form, `Field` component, `onSubmit` handler, `useState`, `toast` import,
and the three social/location `<li>` items.

**Replace with:**
```tsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { SectionLabel } from "./about";

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-14 text-center"
        >
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary opacity-20 blur-3xl" aria-hidden />
          <div className="absolute -bottom-24 -left-10 size-72 rounded-full bg-emerald opacity-20 blur-3xl" aria-hidden />

          <div className="relative">
            <SectionLabel>Start Here</SectionLabel>
            <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl md:text-5xl max-w-3xl mx-auto">
              Every repetitive task you do tomorrow is work your business{" "}
              <span className="text-gradient">could already have automated</span>.
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
              The audit is free. The conversation takes 30 minutes. The cost of waiting is
              measured in hours every single week.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
              {SITE.auditUrl ? (
                <a
                  href={SITE.auditUrl}
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
                >
                  Get Your Free AI Opportunity Audit
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background opacity-40 cursor-not-allowed"
                >
                  Get Your Free AI Opportunity Audit
                  <ArrowRight className="size-4" />
                </button>
              )}

              {SITE.socialProof && (
                <span className="glass rounded-full px-3 py-1 text-xs text-muted-foreground">
                  {SITE.socialProof}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

**Design notes:**
- `auditUrl` guard: renders a live `<a>` when defined, disabled `<button>` when not (req 10.6)
- `SITE.socialProof` conditional: zero DOM nodes when undefined (req 10.8)
- No form, no form fields (req 10.6)
- `motion.div` on container with `initial={{ opacity: 0, y: 24 }}` (req 10.7)

---

### 11. `src/components/portfolio/footer.tsx`

**Changes:**
```tsx
// Remove: <Link to="/auth"> Admin </Link> entirely
// Update brand display: SITE.name = "Ummah Growth Guide"
// Add tagline below brand name (both always rendered together)
// Add "Get Your Free Audit" link

// Updated copyright block:
<div className="text-sm">
  <div className="font-display font-semibold">{SITE.name}</div>
  <div className="text-xs text-muted-foreground mt-0.5">{SITE.tagline}</div>
  <div className="text-xs text-muted-foreground">
    © {new Date().getFullYear()} — Built with intent.
  </div>
</div>

// Updated links block (no Admin, add Free Audit):
<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
  <a href={SITE.auditUrl} className="hover:text-foreground text-xs font-medium">
    Get Your Free Audit
  </a>
  <a href={SITE.github} ...><Github className="size-4" /></a>
  <a href={SITE.linkedin} ...><Linkedin className="size-4" /></a>
  <a href={`mailto:${SITE.email}`} ...><Mail className="size-4" /></a>
</div>
```

**Preserved:** `border-t border-white/5 px-6 py-10`, `flex sm:flex-row sm:items-center
sm:justify-between` layout, all existing icon sizing.

---

### 12. `src/routes/index.tsx`

**Remove imports:** `Experience`, `GithubStats`, `About` (about.tsx is now WhyUGG)

**Add imports:** `Cost`, `FAQ`

**Update `useQuery` destructuring:** add `isLoading`, `isError`

**Update `head()` meta:**
```typescript
head: () => ({
  meta: [
    { title: META.title },
    { name: "description", content: META.description },
    { property: "og:title", content: META.title },
    { property: "og:description", content: META.description },
    { name: "twitter:card", content: "summary_large_image" },
  ],
}),
```

**Import META from site.ts:**
```typescript
import { SITE, META } from "@/lib/site";
```

**Updated `Index` render order (requirement 14.1):**
```tsx
<div className="min-h-screen">
  <Nav />
  <main>
    <Hero />
    <Cost />
    <Skills />          {/* Services section, id=systems */}
    <Process />
    <Projects projects={projects} isLoading={isLoading} isError={isError} />
    <About />           {/* WhyUGG section, id=why-ugg */}
    <FAQ />
    <Contact />         {/* FinalCTA section, id=contact */}
  </main>
  <Footer />
</div>
```

**Remove:** `Experience` and `GithubStats` from both imports and render tree.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a
system — essentially, a formal statement about what the system should do. Properties serve as the
bridge between human-readable specifications and machine-verifiable correctness guarantees.*

This feature is a content-and-structure transformation of a React SSR application. Many acceptance
criteria are satisfied by fixed config values (checked with example-based tests). The criteria
amenable to property-based testing are those where rendering behavior varies with input data — 
specifically the rendering functions that map config arrays to DOM output.

**PBT library:** [fast-check](https://fast-check.dev/) with Vitest + React Testing Library.

---

### Property 1: PROOF_CARDS always renders at least three hero cards

*For any* `PROOF_CARDS` array — regardless of its length, including empty arrays — the Hero
section SHALL render at least three proof cards. The three minimum entries are guaranteed by
ensuring `PROOF_CARDS` itself always contains at least three items (the "placeholder" entries
are part of the array, not synthesized at render time).

**Validates: Requirements 3.10**

---

### Property 2: Every COST_ITEMS entry renders all required card elements

*For any* `COST_ITEMS` array entry containing a `title` and `desc` string, the rendered
Cost section card SHALL contain the title text, the description text, and a DOM element bearing
the `text-gradient` CSS class (applied to the title).

**Validates: Requirements 4.3**

---

### Property 3: Every SERVICES entry renders all four required fields

*For any* `Service` object in the `SERVICES` array with all four fields (`title`, `problem`,
`transformation`, `outcome`) populated, the rendered service card SHALL display the title,
problem statement, transformation statement, and outcome — none may be absent.

**Validates: Requirements 5.4**

---

### Property 4: Process section renders exactly 6 steps regardless of array length

*For any* `ENGAGEMENT_PROCESS` array with length ≥ 6, the Process component SHALL render
exactly 6 step cards — never more, never fewer (beyond 6 are silently truncated by `.slice(0,6)`).

**Validates: Requirements 6.3, 6.4**

---

### Property 5: Process step icons follow the fixed index-based mapping

*For any* index `i` in `{0, 1, 2, 3, 4, 5}`, the step card at position `i` SHALL render
the Lucide icon that corresponds to `ICONS[i]` in the fixed mapping
`[Search, LayoutDashboard, GitBranch, Code2, Rocket, TrendingUp]`.

**Validates: Requirements 6.5**

---

### Property 6: shadow-glow applied exclusively to the step at index 0

*For any* valid `ENGAGEMENT_PROCESS` array of exactly 6 items, exactly one step card (the one
at index 0) SHALL bear the `shadow-glow` CSS class, and the remaining five cards SHALL NOT
bear that class.

**Validates: Requirements 6.8**

---

### Property 7: Every Project card renders all required data fields

*For any* `Project` object with populated `title`, `short_description`, `technologies`, and
`metrics` fields, the rendered `ProjectCard` SHALL display all four fields in the DOM.

**Validates: Requirements 7.3**

---

### Property 8: Every PRINCIPLES entry renders its icon, title, and description

*For any* `Principle` object in the `PRINCIPLES` array with `title`, `desc`, and a valid `icon`
name, the rendered principle card in the Why UGG section SHALL include a Lucide icon element,
the title text, and the description text — all three present in the rendered output.

**Validates: Requirements 8.4**

---

### Property 9: Final CTA button href equals the configured auditUrl

*For any* non-empty `auditUrl` string defined in `SITE`, the Primary_CTA `<a>` element rendered
in the Final CTA section SHALL have an `href` attribute equal to that exact string.

**Validates: Requirements 10.6**

---

### Property 10: Social proof pill renders if and only if socialProof is a non-empty string

*For any* possible value of `SITE.socialProof` — whether `undefined`, `null`, empty string, or a
non-empty string — the rendered Final CTA section SHALL contain the social proof pill element if
and only if `SITE.socialProof` is a non-empty string. Any falsy value (undefined, null, `""`)
SHALL produce zero pill DOM nodes.

**Validates: Requirements 10.8**

---

### Property 11: Footer never contains an Admin link element

*For any* render of the `Footer` component, the rendered DOM SHALL NOT contain any element with
`href="/auth"` or text content `"Admin"`.

**Validates: Requirements 11.3**

---

### Property 12: No first-person singular pronouns in any site config string

*For any* string exported from `site.ts` — including all entries in `SERVICES`, `PRINCIPLES`,
`FAQ_ITEMS`, `COST_ITEMS`, `ENGAGEMENT_PROCESS`, and the `SITE` constant fields — that string
SHALL NOT contain the word-bounded tokens `\bI\b`, `\bmy\b`, or `\bme\b` as standalone words.

**Validates: Requirements 13.1, 13.2**

---

### Property 13: No forbidden marketing buzzwords in any site config string

*For any* string value exported from `site.ts`, that string SHALL NOT contain any of the
following tokens (case-insensitive): `revolutionary`, `cutting-edge`, `game-changer`, `synergy`,
`leverage`, `innovative`.

**Validates: Requirements 13.3**

---

**Property Reflection:**

After reviewing all 13 properties:

- Properties 5 and 6 are logically related (both about process step rendering) but test distinct
  invariants (icon identity vs. shadow-glow exclusivity) — both kept.
- Properties 12 and 13 both scan config strings for forbidden content — they target different
  forbidden sets and cannot be merged without losing clarity — both kept.
- Property 4 (exactly 6 steps) and Property 5 (icon mapping per index) could share a single
  test harness but are distinct correctness guarantees — both kept as separate properties.
- No redundant properties were identified.

---

## Error Handling

### Supabase / Projects Data

The query in `index.tsx` (or self-contained within `projects.tsx`) already uses TanStack Query's
`isLoading` / `isError` / `data` states. The component implements three exclusive render paths:

| State | Render |
|---|---|
| `isLoading === true` | Skeleton grid (4 cards, `animate-pulse`) |
| `!isLoading && (isError \|\| data.length === 0)` | Single `glass rounded-2xl` empty state card |
| `!isLoading && data.length > 0` | Project card grid |

Error boundary: No React Error Boundary is required at the component level — TanStack Query
catches and surfaces errors through `isError` without throwing to the React tree.

The error state renders `"New case studies coming soon."` — no raw error messages, no stack
traces, no technical strings visible to visitors.

### `auditUrl` Missing or Empty

The Final CTA section guards the CTA button:
- `SITE.auditUrl` is truthy → renders `<a href={SITE.auditUrl}>` (active link)
- `SITE.auditUrl` is falsy → renders `<button disabled>` with `opacity-40 cursor-not-allowed`

This prevents a non-functional navigable element from existing in the DOM.

### `PRINCIPLES` Empty Array

The Why UGG section wraps the grid in `{PRINCIPLES.length > 0 && ...}`. An empty array renders
nothing — no broken empty grid, no orphaned section structure.

### `COST_ITEMS` Empty Array

The Cost section renders a fallback `<p>` paragraph when `COST_ITEMS.length === 0`, ensuring
the `SectionLabel` and headline are always visible even without pain-point cards.

### Icon Name Not Found in `ICON_MAP`

The `about.tsx` (Why UGG) icon lookup uses `ICON_MAP[p.icon] ?? Target` — unknown icon names
fall back to the `Target` icon silently with no runtime error.

---

## Testing Strategy

### Overview

The feature is primarily a content/structure transformation of a React SSR site. Testing focuses
on two complementary layers:

1. **Unit/example tests** — verify specific DOM output, CSS classes, prop wiring, and
   configuration values. These cover the majority of acceptance criteria.
2. **Property-based tests** — verify universal rendering invariants across generated inputs.
   These cover the 13 correctness properties above.

### Unit / Example Tests

Written with **Vitest** + **React Testing Library** (both already available in the project's
dependency graph via the existing test setup).

Key example tests to write:
- `site.ts` exports: assert `SITE.name`, `META.title`, `META.description`, `SERVICES.length`,
  `ENGAGEMENT_PROCESS.length`, `FAQ_ITEMS.length` match expected values.
- `nav.tsx`: assert "UGG" logo text, all 5 nav links with correct hrefs and labels in order,
  "Free Audit" button present, no "Admin" link in DOM.
- `hero.tsx`: assert `PROOF_CARDS.length >= 3`, hero headline rendered, Primary_CTA present.
- `cost.tsx`: assert `id="cost"`, SectionLabel "The Hidden Cost", grid present.
- `faq.tsx`: assert `id="faq"`, Accordion `type="multiple"`, all `FAQ_ITEMS` rendered.
- `contact.tsx`: assert no `<form>` element, Primary_CTA links to `SITE.auditUrl`.
- `footer.tsx`: assert "Ummah Growth Guide" visible, no `/auth` href, "Get Your Free Audit" link.
- `routes/index.tsx`: assert `<title>` equals `META.title`, `<meta name="description">` ≤ 160
  chars, no "Ayesha Tariq" in any meta content.

### Property-Based Tests

Written with **fast-check** + Vitest. Each property test runs a minimum of **100 iterations**.

```typescript
// Example: Property 2 — COST_ITEMS card renders required elements
import fc from "fast-check";
import { render } from "@testing-library/react";
import { Cost } from "@/components/portfolio/cost";

// Feature: ummah-growth-guide-website, Property 2: Every COST_ITEMS entry renders all required card elements
test("every generated CostItem renders title, desc, and text-gradient element", () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({ title: fc.string({ minLength: 1 }), desc: fc.string({ minLength: 1 }) }),
        { minLength: 1, maxLength: 6 },
      ),
      (items) => {
        // Temporarily set module-level COST_ITEMS (via dependency injection or mocking)
        const { container } = render(<CostWithItems items={items} />);
        items.forEach((item) => {
          expect(container.textContent).toContain(item.title);
          expect(container.textContent).toContain(item.desc);
        });
        const gradientEls = container.querySelectorAll(".text-gradient");
        expect(gradientEls.length).toBeGreaterThanOrEqual(items.length);
      },
    ),
    { numRuns: 100 },
  );
});
```

**Test tag format:** Each property-based test file uses the comment tag
`// Feature: ummah-growth-guide-website, Property {N}: {property_text}` immediately above the
`test(...)` call.

**Dependency injection for config arrays:** Since the components read constants directly from
`site.ts`, the cleanest approach for property tests is to extract rendering logic into pure
sub-components that accept data as props (e.g. `<CostGrid items={items} />`). The parent
`Cost` component composes these sub-components, passing the config array. This makes
rendering logic testable without module mocking.

**Properties that scan string content** (Properties 12, 13): These are pure function tests —
no rendering required. Import the relevant arrays from `site.ts` and run fast-check over them:

```typescript
// Feature: ummah-growth-guide-website, Property 12: No first-person singular pronouns
test("no first-person pronouns in any site config string", () => {
  const allStrings = [
    ...Object.values(SITE).filter((v) => typeof v === "string"),
    ...SERVICES.flatMap((s) => [s.title, s.problem, s.transformation, s.outcome]),
    ...PRINCIPLES.flatMap((p) => [p.title, p.desc]),
    ...FAQ_ITEMS.flatMap((f) => [f.question, f.answer]),
    ...COST_ITEMS.flatMap((c) => [c.title, c.desc]),
    ...ENGAGEMENT_PROCESS.map((e) => e.desc),
  ];
  allStrings.forEach((str) => {
    expect(str).not.toMatch(/\bI\b/);
    expect(str).not.toMatch(/\bmy\b/i);
    expect(str).not.toMatch(/\bme\b/i);
  });
});
```

### Integration Tests

Not applicable for this feature — all data is either static config or fetched via Supabase
(tested via existing TanStack Query + Supabase integration in the live environment).

### Manual QA Checklist

After implementation, verify these manually in a browser:
- [ ] Nav scrolling to all 5 section anchors
- [ ] Hero NeuralHero canvas renders and animates
- [ ] Process step 0 has visible blue glow ring vs. other steps
- [ ] FAQ accordion opens/closes multiple items simultaneously
- [ ] Final CTA button opens the audit booking URL
- [ ] Footer social links open correct profiles
- [ ] No "Ayesha Tariq" visible anywhere on the page
- [ ] Supabase project loading skeleton displays, then transitions to cards (or empty state)
- [ ] Page title in browser tab matches `META.title`
