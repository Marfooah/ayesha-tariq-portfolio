# Requirements Document

## Introduction

Transform the existing personal portfolio (TanStack Start + React 19 + Tailwind CSS v4 + Framer Motion + Supabase) into the official premium website for **Ummah Growth Guide (UGG)** — a Business Systems Studio that designs intelligent AI systems to remove operational friction for businesses. The transformation preserves the entire visual identity (oklch dark palette, glassmorphism, Space Grotesk/Inter/JetBrains Mono typography, neural canvas, particle system, hover-lift animations, shadow-glow tokens) and evolves only content, copy, and section structure. The single conversion goal is "Get Your Free AI Opportunity Audit".

---

## Glossary

- **UGG**: Ummah Growth Guide — the client studio being represented by this website.
- **Website**: The single-page marketing site built on the existing TanStack Start codebase.
- **Visitor**: A business owner, founder, agency operator, or revenue-generating company representative who lands on the Website.
- **Primary_CTA**: The call-to-action button labelled "Get Your Free AI Opportunity Audit", which is the single conversion goal of the Website.
- **Site_Config**: The `src/lib/site.ts` file that centralises all copywriting constants, branding tokens, navigation links, section data, and external URLs.
- **Nav**: The fixed top navigation bar component (`src/components/portfolio/nav.tsx`).
- **Hero**: The first full-viewport section of the Website rendered by `src/components/portfolio/hero.tsx`.
- **The_Cost_Section**: A tension-building section that surfaces the hidden cost of manual, repetitive work.
- **Services_Section**: The "What We Build" section listing all intelligent system types UGG delivers, rendered by an evolved `src/components/portfolio/skills.tsx`.
- **Process_Section**: The "How We Work" 6-step process section rendered by an evolved `src/components/portfolio/process.tsx`.
- **Projects_Section**: The case studies section rendered by the existing `src/components/portfolio/projects.tsx` with UGG-reframed content.
- **Why_UGG_Section**: The principles / differentiators section that replaces the "About" section.
- **FAQ_Section**: Objection-handling accordion section rendered by a new component using the existing shadcn Accordion UI primitive.
- **Final_CTA_Section**: The closing emotional call-to-action section that replaces the "Contact" form section.
- **Footer**: The bottom footer component (`src/components/portfolio/footer.tsx`).
- **Design_System**: The set of CSS custom utilities and oklch colour tokens defined in `src/styles.css` (glass, glass-strong, text-gradient, hover-lift, shadow-glow, bg-mesh, bg-grid, animate-float-slow, animate-pulse-glow).
- **NeuralHero**: The animated neural-network canvas component (`src/components/portfolio/neural-hero.tsx`).
- **Particles**: The interactive floating-dot particle canvas component (`src/components/portfolio/particles.tsx`).
- **Supabase_CMS**: The Supabase `projects` table used to drive the Projects_Section via TanStack Query.
- **Section_Label**: The small mono-spaced uppercase decorative heading exported from `src/components/portfolio/about.tsx`.

---

## Requirements

### Requirement 1: Brand Identity and Site Configuration

**User Story:** As a Visitor, I want the Website to clearly represent Ummah Growth Guide so that I understand immediately which studio I am engaging with.

#### Acceptance Criteria

1. THE Site_Config SHALL export a `SITE` constant with `name` set to `"Ummah Growth Guide"`, `tagline` set to `"We don't sell AI. We redesign how your business operates."`, and the fields `githubUser`, `github`, `linkedin`, and `email` replaced with UGG contact details (any non-empty string placeholder is acceptable until real details are provided).
2. THE Website SHALL render the Nav logo as `"UGG"` using the existing `font-display` class and primary-colour dot indicator.
3. THE Site_Config SHALL export a `META` constant with page `title` set to `"Ummah Growth Guide — Business Systems Studio"` and `description` containing both the brand name `"Ummah Growth Guide"` and the exact tagline string `"We don't sell AI. We redesign how your business operates."`.
4. WHEN the Website is loaded in a browser, THE Website SHALL display the string `"Ummah Growth Guide"` and the tagline `"We don't sell AI. We redesign how your business operates."` within the first visible viewport without requiring any scrolling.

---

### Requirement 2: Navigation

**User Story:** As a Visitor, I want a clear navigation menu so that I can jump to any section of the Website and reach the Primary_CTA from any scroll position.

#### Acceptance Criteria

1. THE Nav SHALL display the following anchor links in order: `"Systems"` (→ `#systems`), `"Process"` (→ `#process`), `"Work"` (→ `#work`), `"Why UGG"` (→ `#why-ugg`), `"FAQ"` (→ `#faq`).
2. THE Nav SHALL render the Primary_CTA button labelled `"Free Audit"` in the top-right position using the existing `bg-foreground text-background` pill button styling.
3. THE Nav SHALL remain fixed to the top of the viewport using the existing `fixed inset-x-0 top-0 z-50` positioning.
4. THE Nav SHALL preserve the existing `glass-strong` backdrop styling and `rounded-2xl` container shape.
5. WHERE a viewport width is less than 768px, THE Nav SHALL hide the anchor link list using the existing `hidden md:flex` class pattern. This breakpoint threshold of 768px SHALL apply regardless of how narrow the viewport becomes below that value.
6. THE Primary_CTA pill button SHALL always be present in the DOM and visible regardless of viewport width.

---

### Requirement 3: Hero Section

**User Story:** As a Visitor, I want an impactful first impression that frames the cost of inaction so that I feel compelled to learn more about UGG's systems.

#### Acceptance Criteria

1. THE Hero SHALL render a headline using the existing `font-display text-4xl … lg:text-7xl bold` typographic scale with copy focused on the hidden cost of repetitive work — for example: `"Your business is leaking time. Every day."` — followed by a `text-gradient` span as a reinforcing sub-phrase.
2. THE Hero SHALL render a subheadline paragraph of no more than two sentences that introduces UGG as a Business Systems Studio and states that UGG eliminates repetitive manual work, without using first-person singular pronouns.
3. THE Hero SHALL render the Primary_CTA as the dominant button using the existing `bg-foreground text-background rounded-full` pill style with an `ArrowRight` icon.
4. THE Hero SHALL render a secondary CTA labelled `"Explore Intelligent Systems"` using the existing `glass rounded-full` pill style linking to `#systems`.
5. THE Hero SHALL preserve the NeuralHero canvas component in the right column of the exact `lg:grid-cols-[1.05fr_0.95fr]` layout on viewports at or above the `lg` breakpoint; this specific grid template is mandatory and SHALL NOT be altered.
6. THE Hero SHALL preserve the Particles component at `density={80}` rendered as an absolute-positioned layer behind content.
7. THE Hero SHALL preserve the `bg-mesh opacity-70` and `bg-grid opacity-40` ambient layers.
8. THE Hero SHALL render a floating status badge using the existing `glass rounded-full px-3 py-1 text-xs` style with an `animate-pulse-glow` emerald dot and copy that contains the phrase `"taking on new clients"`.
9. WHEN a Visitor views the Hero on a viewport narrower than the `lg` breakpoint, THE Hero SHALL stack content vertically with the NeuralHero canvas displayed below the headline group.
10. THE Site_Config SHALL export a `PROOF_CARDS` array of at least three objects, each with a `value` string and a `label` string. THE Hero SHALL render these as `glass hover-lift rounded-xl` cards replacing the personal focus-area grid. WHEN `PROOF_CARDS` contains fewer than three entries, THE Hero SHALL supplement the rendered set with default placeholder entries also defined in `PROOF_CARDS` until three cards are displayed. A render that successfully displays three cards using placeholder entries SHALL be considered compliant.

---

### Requirement 4: The Cost Section

**User Story:** As a Visitor, I want to recognise the operational pain my business experiences so that I feel motivated to explore UGG's solutions.

#### Acceptance Criteria

1. THE The_Cost_Section SHALL be a new section rendered at `id="cost"` positioned immediately after the Hero in the page flow.
2. THE The_Cost_Section SHALL render a `SectionLabel` reading `"The Hidden Cost"` followed by a headline of no more than twelve words that names the compounding cost of manual work.
3. THE The_Cost_Section SHALL render a grid of four to six `glass hover-lift rounded-2xl` pain-point cards. Each card SHALL contain: a pain-point title of no more than four words, a one-to-two sentence description of the business consequence, and an element styled with the `text-gradient` or `text-emerald` CSS utility token.
4. WHEN a Visitor views The_Cost_Section on a viewport of `md` width or wider, THE The_Cost_Section SHALL render pain-point cards in at least two columns applied consistently to all cards in the grid.
5. THE The_Cost_Section SHALL animate each card into view using `motion.div` with `initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`, and `viewport={{ once: true }}` so each card animates at most once per page load.
6. IF no pain-point card data is defined in Site_Config, THEN THE The_Cost_Section SHALL render at least one sentence of descriptive paragraph text alongside the `SectionLabel` and headline. WHEN either the `SectionLabel` or the headline fails to render due to a technical issue, THE The_Cost_Section SHALL allow partial rendering and display whichever elements are available rather than failing the entire section.

---

### Requirement 5: Services Section — "What We Build"

**User Story:** As a Visitor, I want to browse all intelligent systems UGG builds so that I can identify which ones apply to my business.

#### Acceptance Criteria

1. THE Services_Section SHALL be rendered at `id="systems"` using the evolved `src/components/portfolio/skills.tsx` component.
2. THE Services_Section SHALL render a `SectionLabel` reading `"What We Build"` and a headline that names the section without using the word "Services".
3. THE Site_Config SHALL export a `SERVICES` array containing at minimum the following twenty-two system types: AI Employees, Agentic AI Systems, Workflow Automation, Voice AI Agents, Customer Support Agents, Internal Knowledge Systems, Lead Qualification Agents, Sales Follow-up Systems, CRM Intelligence, Email Intelligence, Operations Automation, Document AI, Meeting Intelligence, Executive Assistants, Custom Business Dashboards, AI Research Agents, Multi-Agent Systems, Internal Company AI, RAG Knowledge Assistants, MCP Integrations, Custom AI Applications, Future-proof AI Infrastructure.
4. WHEN rendered, each service card SHALL display: a service title, a one-sentence problem statement, a one-sentence transformation statement, and a one-sentence business outcome — all sourced from the `SERVICES` array in Site_Config.
5. THE Services_Section SHALL render service cards using the existing `glass hover-lift group relative overflow-hidden rounded-2xl p-6` card style with the pointer-events-none radial glow on hover.
6. WHEN a Visitor views the Services_Section on a viewport of `lg` width or wider, including `xl` and larger breakpoints, THE Services_Section SHALL render cards in a three-column grid; on `sm` or `md` viewports in a two-column grid; on smaller viewports in a single-column layout.
7. THE Services_Section SHALL animate each card using `motion.div` with `whileInView` scroll reveal consistent with the existing `Skills` component animation pattern.
8. WHEN a Visitor hovers a service card, THE Services_Section SHALL reveal a primary-coloured gradient glow using the existing `group-hover:opacity-30` pointer-events overlay pattern.

---

### Requirement 6: Process Section — "How We Work"

**User Story:** As a Visitor, I want to understand UGG's engagement process so that I know what to expect after requesting an audit.

#### Acceptance Criteria

1. THE Process_Section SHALL be rendered at `id="process"` using the evolved `src/components/portfolio/process.tsx` component.
2. THE Process_Section SHALL render a `SectionLabel` reading `"How We Work"`.
3. THE Site_Config SHALL export an `ENGAGEMENT_PROCESS` array of exactly six steps in the following order: `"Free AI Opportunity Audit"`, `"Business Systems Strategy"`, `"System Architecture"`, `"Development"`, `"Deployment"`, `"Optimisation"`. Each step SHALL include a `title` string and a `desc` string of no more than 200 characters. IF the `ENGAGEMENT_PROCESS` array contains a value other than exactly six steps at build time, THE build SHALL fail with a validation error to catch configuration mistakes.
4. WHEN Site_Config contains more than six steps in `ENGAGEMENT_PROCESS` and the build-time validation in criterion 3 does not catch the error, THE Process_Section SHALL render only the first six steps and not render any additional entries.
5. WHEN rendered, each process step card SHALL display the step title, the step description, a step counter formatted as `Step 01` through `Step 06`, and a Lucide icon drawn from the following fixed index-based mapping: index 0 → `Search`, index 1 → `LayoutDashboard`, index 2 → `GitBranch`, index 3 → `Code2`, index 4 → `Rocket`, index 5 → `TrendingUp`.
6. THE Process_Section SHALL use the existing `glass hover-lift group relative overflow-hidden rounded-2xl p-6` card style and `motion.div whileInView` animation pattern.
7. THE Process_Section SHALL render a three-column grid on `lg` viewports and wider, a two-column grid on `md` viewports, and a single-column layout on smaller viewports. Layout SHALL switch immediately at the exact `md` and `lg` Tailwind breakpoints with no buffer zone.
8. THE Process_Section SHALL apply the `shadow-glow` CSS utility class to the step at index 0 (`"Free AI Opportunity Audit"`) and SHALL NOT apply `shadow-glow` to any other step card.

---

### Requirement 7: Projects Section — Case Studies

**User Story:** As a Visitor, I want to review real examples of systems UGG has built so that I can assess UGG's capability and relevance to my business.

#### Acceptance Criteria

1. THE Projects_Section SHALL be rendered at `id="work"` by changing the existing `id="projects"` attribute in `src/components/portfolio/projects.tsx`.
2. THE Projects_Section SHALL render a `SectionLabel` reading `"Work"` and a headline containing the phrase `"case studies"` (case-insensitive).
3. WHEN project data is loaded from the Supabase_CMS, THE Projects_Section SHALL display each project's `title`, `short_description`, `technologies`, and `metrics` using the existing `ProjectCard` layout.
4. THE Projects_Section SHALL display a loading skeleton for each expected card position while the Supabase_CMS query is in-flight, using the existing `animate-pulse` utility.
5. IF the Supabase_CMS returns zero published projects OR if a Supabase_CMS connection or query error occurs AND no projects have previously loaded successfully in the current session, THEN THE Projects_Section SHALL render a single `glass rounded-2xl` empty-state container with a non-technical message — for example: `"New case studies coming soon."` — and SHALL NOT render a `ProjectCard` or any raw error text. IF some projects have already loaded successfully and a subsequent error occurs, THE Projects_Section SHALL keep displaying the successfully loaded project cards and SHALL show a non-technical error indicator separately rather than replacing the cards with the empty state.
6. WHEN at least one published project loads successfully, THE Projects_Section SHALL NOT render the empty-state container. WHEN projects load successfully alongside concurrent connection errors, THE Projects_Section SHALL show the loaded project cards and SHALL NOT show the empty-state container.
7. THE Projects_Section SHALL preserve the 3D tilt on-mouse-move interaction, the `glass-strong` card style, the `hover:shadow-glow` effect, the thumbnail image with gradient overlay, the technology pill tags, and the `Featured` badge.

---

### Requirement 8: Why UGG Section

**User Story:** As a Visitor, I want to understand UGG's philosophy and differentiators so that I can evaluate whether UGG is the right partner for my business.

#### Acceptance Criteria

1. THE Why_UGG_Section SHALL be rendered at `id="why-ugg"` using the evolved `src/components/portfolio/about.tsx` component.
2. THE Why_UGG_Section SHALL render a `SectionLabel` reading `"Why UGG"` and a headline that frames the section around Visitor benefit rather than self-promotion.
3. THE Site_Config SHALL export a `PRINCIPLES` array of four to six objects, each with a `title` and `desc` string, covering: business-first not AI-first, systems not shortcuts, custom architecture not templates, built to scale, and designed around client workflow.
4. WHEN rendered, each principle card SHALL display a Lucide icon, the principle title, and the principle description using the existing `glass hover-lift rounded-2xl p-5` card style.
5. THE Why_UGG_Section SHALL animate cards using the existing `motion.div whileInView` pattern with staggered delays.
6. THE Why_UGG_Section SHALL NOT contain any first-person singular language. THE Why_UGG_Section SHALL address the Visitor directly using second-person ("your business", "you"). WHEN no `PRINCIPLES` entries are defined in Site_Config, THE Why_UGG_Section SHALL NOT render until at least one principle is provided; rendering with zero principles is not permitted.

---

### Requirement 9: FAQ Section

**User Story:** As a Visitor, I want answers to my most common objections and concerns so that I can make a confident decision about requesting an audit.

#### Acceptance Criteria

1. THE FAQ_Section SHALL be a new section rendered at `id="faq"` using a new component `src/components/portfolio/faq.tsx`.
2. THE FAQ_Section SHALL render a `SectionLabel` reading `"FAQ"` and a headline of no more than eight words.
3. THE Site_Config SHALL export a `FAQ_ITEMS` array of seven to ten objects, each with a `question` string and an `answer` string, covering at minimum the following topics: compatibility with existing tools, AI handling repetitive work, agent decision-making boundaries, employee oversight and control, data security and privacy, system evolution over time, and which businesses benefit most from UGG.
4. THE FAQ_Section SHALL render questions and answers using the existing shadcn `Accordion` UI primitive from `src/components/ui/accordion.tsx` in `type="multiple"` mode.
5. WHEN a Visitor clicks a question, THE FAQ_Section SHALL expand the answer with a smooth CSS transition provided by the existing `Accordion` primitive.
6. THE FAQ_Section SHALL render the accordion within a `glass-strong rounded-3xl p-8 md:p-14` container consistent with the existing `Contact` section container style.
7. THE FAQ_Section SHALL animate the container into view using `motion.div` with `initial={{ opacity: 0, y: 24 }}` and `whileInView={{ opacity: 1, y: 0 }}`.

---

### Requirement 10: Final CTA Section

**User Story:** As a Visitor who has reached the end of the page, I want an emotionally compelling final nudge so that I take the action of requesting a free AI opportunity audit.

#### Acceptance Criteria

1. THE Final_CTA_Section SHALL replace the existing `Contact` form section (`src/components/portfolio/contact.tsx`) and be rendered at `id="contact"`.
2. THE Final_CTA_Section SHALL render a `glass-strong rounded-3xl` container with ambient blue and emerald blur orbs consistent with the existing `Contact` section decoration pattern.
3. THE Final_CTA_Section SHALL render an emotionally direct headline — for example: `"Every repetitive task you do tomorrow is work your business could already have automated."` — using the existing `font-display text-3xl … text-5xl bold` typographic scale.
4. THE Final_CTA_Section SHALL render a supporting paragraph of one to two sentences that names the cost of waiting without using fear-based or hype language.
5. THE Final_CTA_Section SHALL render a single large Primary_CTA button labelled `"Get Your Free AI Opportunity Audit"` using the `bg-foreground text-background rounded-full` pill style with an `ArrowRight` icon.
6. THE Final_CTA_Section SHALL NOT render a contact form. THE Final_CTA_Section SHALL render a Primary_CTA button linked to the `auditUrl` defined in Site_Config. WHEN the Primary_CTA button is non-functional for any reason — including failure to render initially or becoming non-functional after rendering — THE Final_CTA_Section SHALL disable the `auditUrl` link so that an unlinked or non-functional navigable element is not present. Both the button rendering and the `auditUrl` link SHALL be active for this acceptance criterion to be satisfied.
7. THE Final_CTA_Section SHALL animate the entire container into view using `motion.div` with `initial={{ opacity: 0, y: 24 }}` and `whileInView={{ opacity: 1, y: 0 }}`.
8. WHERE a social proof element is configured in Site_Config, THE Final_CTA_Section SHALL render a trust line below the CTA button — for example: a count of systems deployed or client testimonial snippet — using the existing `glass rounded-full px-3 py-1 text-xs` pill style. WHEN no social proof element is configured in Site_Config, THE Final_CTA_Section SHALL NOT render any social proof element or placeholder in the DOM.

---

### Requirement 11: Footer

**User Story:** As a Visitor who reaches the footer, I want clear brand attribution and contact options so that I can reach UGG through the appropriate channel.

#### Acceptance Criteria

1. THE Footer SHALL display the brand name `"Ummah Growth Guide"` and the UGG tagline or copyright notice together. Both the brand name and the tagline SHALL always appear together in the Footer regardless of available space; neither element SHALL be omitted independently.
2. THE Footer SHALL render the Primary_CTA as a text or pill link labelled `"Get Your Free Audit"` alongside the social/contact icons.
3. THE Footer SHALL remove the `Admin` link from all public page renders. THE Footer SHALL NOT render the Admin link element in the DOM of the public-facing page under any condition. WHERE an admin route is required for internal use, it SHALL be accessed via a direct URL rather than a Footer link.
4. THE Footer SHALL update social icon links to UGG's own social profiles as defined in Site_Config.
5. THE Footer SHALL preserve the existing `border-t border-white/5 px-6 py-10` layout and `flex sm:flex-row` responsive pattern.

---

### Requirement 12: Design System Preservation

**User Story:** As a Visitor, I want a visually premium, consistent experience across all sections so that the website communicates the quality and sophistication of UGG's work.

#### Acceptance Criteria

1. THE Website SHALL preserve all CSS custom utilities defined in `src/styles.css` without modification: `glass`, `glass-strong`, `text-gradient`, `shadow-glow`, `shadow-elegant`, `bg-mesh`, `bg-grid`, `hover-lift`, `ring-glow`, `animate-float-slow`, `animate-pulse-glow`.
2. THE Website SHALL preserve all oklch colour tokens defined in the `:root` block of `src/styles.css` including `--primary`, `--emerald`, `--background`, `--foreground`, `--muted-foreground`, and all gradient variables.
3. THE Website SHALL preserve the `Space Grotesk` display font, `Inter` body font, and `JetBrains Mono` mono font loaded from the existing font configuration.
4. THE Website SHALL preserve the NeuralHero and Particles canvas components without behavioural changes.
5. WHEN any section component is modified to serve UGG content, THE Website SHALL NOT introduce new CSS frameworks, new UI component libraries, or inline style overrides that conflict with or duplicate the existing `src/styles.css` design system. This prohibition applies only when sections are actively being modified for UGG content and regardless of whether the new dependency would technically conflict or not.
6. THE Website SHALL maintain consistent `px-6 py-24 md:py-32` section padding, `mx-auto max-w-6xl` content width, and `SectionLabel` decorative heading across all sections.

---

### Requirement 13: Copy Quality and Tone

**User Story:** As a Visitor, I want all website copy to feel premium, direct, and visitor-centric so that I trust UGG's authority and relevance to my situation.

#### Acceptance Criteria

1. THE Website SHALL NOT use first-person singular pronouns (`I`, `my`, `me`) in any section heading, sub-heading, body copy, or CTA label.
2. THE Website SHALL address the Visitor using second-person language (`you`, `your`, `your business`) in all persuasive copy.
3. THE Website SHALL NOT contain marketing buzzwords including: `revolutionary`, `cutting-edge`, `game-changer`, `synergy`, `leverage`, `innovative`, or emojis of any kind.
4. THE Website SHALL render all section headings in sentence case or title case consistently, with no inconsistent capitalisation within a single heading.
5. THE Website SHALL NOT render placeholder copy (`Lorem ipsum`, `[TODO]`, `[placeholder]`) in any published section.
6. WHEN the Website is rendered, THE Website SHALL use the word `"intelligent systems"` or `"business systems"` in preference to `"AI"` as the primary product descriptor in headlines and subheadings, consistent with UGG's positioning as a Business Systems Studio.

---

### Requirement 14: Page Structure and Section Order

**User Story:** As a Visitor, I want to experience the psychological journey from curiosity to action so that each section builds naturally on the previous one.

#### Acceptance Criteria

1. THE Website SHALL render sections in the following order: Nav → Hero → The_Cost_Section → Services_Section → Process_Section → Projects_Section → Why_UGG_Section → FAQ_Section → Final_CTA_Section → Footer.
2. THE Website SHALL remove the `GithubStats` section entirely from the public page. THE `GithubStats` component SHALL NOT be imported into or rendered by `src/routes/index.tsx` under any condition, including in-memory rendering that does not produce DOM output. The section SHALL NOT appear in the DOM under any condition on the public page.
3. THE Website SHALL remove the personal `Experience` / learning-journey section from the public page.
4. THE Website SHALL preserve smooth scroll behaviour via the existing `scroll-behavior: smooth` on the `html` element.
5. WHEN a Visitor follows a Nav anchor link, THE Website SHALL scroll to the target section with a visible motion that preserves spatial orientation.

---

### Requirement 15: Metadata and SEO

**User Story:** As a prospective client finding UGG through search, I want accurate and compelling page metadata so that the search result accurately represents UGG's value proposition.

#### Acceptance Criteria

1. THE Website SHALL render a `<title>` tag of `"Ummah Growth Guide — Business Systems Studio"` using the existing TanStack Router `head()` configuration in `src/routes/index.tsx`.
2. THE Website SHALL render a `<meta name="description">` of no more than 160 characters that includes the phrase `"intelligent systems"` and the Primary_CTA offer.
3. THE Website SHALL render `<meta property="og:title">` and `<meta property="og:description">` tags consistent with the page title and description.
4. THE Website SHALL NOT render the personal portfolio name `"Ayesha Tariq"` in any meta tag, page title, or visible heading.
