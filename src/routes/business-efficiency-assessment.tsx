import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Search,
  Clock,
  Map,
  BarChart3,
  CheckCircle2,
  FileText,
  Lightbulb,
} from "lucide-react";
import { Footer } from "@/components/portfolio/footer";
import { SectionLabel } from "@/components/portfolio/about";
import { Particles } from "@/components/portfolio/particles";
import { NeuralHero } from "@/components/portfolio/neural-hero";

// ─── The Tally application form URL ──────────────────────────────────────────
const APPLY_URL = "/apply";

export const Route = createFileRoute("/business-efficiency-assessment")({
  head: () => ({
    meta: [
      { title: "Free Business Efficiency Assessment — Ummah Growth Guide" },
      {
        name: "description",
        content:
          "Discover where AI can eliminate repetitive work, reduce operational inefficiencies, and uncover hidden opportunities to save time across your business.",
      },
    ],
  }),
  component: BusinessEfficiencyAssessment,
});

// ─── CTA button ──────────────────────────────────────────────────────────────
function CTAButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={APPLY_URL}
      className={`group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03] ${className}`}
    >
      Request My Assessment
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function AssessmentHero() {
  return (
    <section className="relative isolate overflow-hidden pt-12 pb-24 md:pt-16 md:pb-32">
      <div className="absolute inset-0 bg-mesh opacity-70" aria-hidden />
      <div
        className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_30%,transparent_70%)]"
        aria-hidden
      />
      <div className="absolute inset-0">
        <Particles density={80} />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald animate-pulse-glow" />
            Complimentary for a limited number of businesses
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Free Business{" "}
            <span className="text-gradient">Efficiency Assessment</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            Discover where AI can eliminate repetitive work, reduce operational
            inefficiencies, and uncover hidden opportunities to save time across
            your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8"
          >
            <CTAButton />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative mx-auto aspect-square w-full max-w-lg lg:h-[520px] lg:max-w-none lg:aspect-auto"
        >
          <NeuralHero />
          <div className="glass-strong absolute -bottom-4 -left-4 rounded-xl px-3 py-2 text-xs">
            <span className="text-muted-foreground">Delivered within:</span>{" "}
            <span className="text-foreground">2–3 business days</span>
          </div>
          <div className="glass-strong absolute -right-3 top-6 rounded-xl px-3 py-2 text-xs">
            <span className="text-emerald">●</span> Personalised for your business
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── What You'll Receive ──────────────────────────────────────────────────────
const DELIVERABLES = [
  {
    icon: Search,
    title: "Business Workflow Analysis",
    desc: "We analyse your current workflows to identify operational bottlenecks.",
  },
  {
    icon: Lightbulb,
    title: "Automation Opportunities",
    desc: "Discover repetitive processes that could be automated using AI.",
  },
  {
    icon: Clock,
    title: "Time-Saving Recommendations",
    desc: "Receive practical recommendations tailored specifically to your business.",
  },
  {
    icon: Map,
    title: "Implementation Roadmap",
    desc: "A personalised roadmap showing the highest-impact AI opportunities.",
  },
];

function WhatYouReceive() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>What You'll Receive</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          A complete picture of{" "}
          <span className="text-gradient">where your time is going</span>.
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DELIVERABLES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass hover-lift group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-primary to-emerald opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
              <div className="grid size-10 place-items-center rounded-xl bg-primary/15">
                <item.icon className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Report Previews ──────────────────────────────────────────────────────────
const REPORT_PAGES = [
  {
    label: "Executive Summary",
    lines: [
      { w: "w-3/4", h: "h-4", bold: true },
      { w: "w-full", h: "h-2.5" },
      { w: "w-5/6", h: "h-2.5" },
      { w: "w-4/6", h: "h-2.5" },
      { w: "w-full", h: "h-2.5" },
      { w: "w-3/5", h: "h-2.5" },
    ],
    accent: "from-primary/20 to-emerald/10",
    metric: { value: "47%", label: "Time recoverable" },
  },
  {
    label: "Automation Opportunities",
    lines: [
      { w: "w-2/3", h: "h-4", bold: true },
      { w: "w-full", h: "h-2.5" },
      { w: "w-full", h: "h-2.5" },
      { w: "w-4/5", h: "h-2.5" },
      { w: "w-full", h: "h-2.5" },
      { w: "w-3/4", h: "h-2.5" },
    ],
    accent: "from-emerald/20 to-primary/10",
    metric: { value: "8", label: "Processes identified" },
  },
  {
    label: "Implementation Roadmap",
    lines: [
      { w: "w-4/5", h: "h-4", bold: true },
      { w: "w-full", h: "h-2.5" },
      { w: "w-5/6", h: "h-2.5" },
      { w: "w-full", h: "h-2.5" },
      { w: "w-2/3", h: "h-2.5" },
      { w: "w-full", h: "h-2.5" },
    ],
    accent: "from-primary/15 to-primary/5",
    metric: { value: "3", label: "Priority systems" },
  },
];

function ReportPreviews() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Inside Your Assessment</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          A premium report{" "}
          <span className="text-gradient">built around your business</span>.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REPORT_PAGES.map((page, i) => (
            <motion.div
              key={page.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-strong group relative overflow-hidden rounded-3xl p-6"
            >
              {/* Ambient gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${page.accent} opacity-40`}
                aria-hidden
              />
              {/* Page label */}
              <div className="relative mb-5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {page.label}
                </span>
                <FileText className="size-3.5 text-muted-foreground/50" />
              </div>
              {/* Blurred content lines */}
              <div className="relative space-y-2.5 select-none" style={{ filter: "blur(3.5px)" }}>
                {page.lines.map((line, j) => (
                  <div
                    key={j}
                    className={`${line.w} ${line.h} rounded ${line.bold ? "bg-foreground/25" : "bg-foreground/10"}`}
                  />
                ))}
              </div>
              {/* Metric badge */}
              <div className="relative mt-6 glass rounded-xl px-4 py-3 text-center">
                <div className="text-gradient font-display text-2xl font-bold">
                  {page.metric.value}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {page.metric.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 max-w-2xl text-sm text-muted-foreground"
        >
          Every assessment is personalised specifically for your business using
          publicly available information and reviewed before delivery.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Why Businesses Request This ─────────────────────────────────────────────
const OUTCOMES = [
  {
    icon: Clock,
    title: "Reduce repetitive work.",
    desc: "Free your team from tasks that follow a predictable pattern. Time recovered from repetitive work compounds across every week, month, and year.",
  },
  {
    icon: Lightbulb,
    title: "Identify automation opportunities.",
    desc: "See exactly which processes in your business are candidates for AI. Not hypothetical — specific to how your operations actually run.",
  },
  {
    icon: BarChart3,
    title: "Receive a practical implementation roadmap.",
    desc: "Walk away with a prioritised plan of action, not a generic report. The highest-impact opportunities are ranked so you know where to start.",
  },
];

function WhyBusinessesRequest() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Why Businesses Request This</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          Clarity before{" "}
          <span className="text-gradient">any commitment</span>.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {OUTCOMES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass hover-lift group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-primary to-emerald opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
              <item.icon className="size-5 text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Value Section ────────────────────────────────────────────────────────────
function ValueSection() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-14"
        >
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary opacity-10 blur-3xl" aria-hidden />
          <div className="absolute -bottom-20 -left-10 size-72 rounded-full bg-emerald opacity-10 blur-3xl" aria-hidden />

          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <SectionLabel>Business Efficiency Assessment</SectionLabel>
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                Estimated Value{" "}
                <span className="text-gradient">£500</span>
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Complimentary for a limited number of businesses each month.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 text-emerald" />
                No cost. No obligation.
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 text-emerald" />
                Delivered within 2–3 business days.
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 text-emerald" />
                Reviewed before delivery.
              </div>
              <CTAButton className="mt-2" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  { step: "01", title: "Submit your request.", desc: "Fill out a short form about your business and operations. Takes under 5 minutes." },
  { step: "02", title: "We analyse your business.", desc: "Using publicly available information and your form responses, we map your operational landscape." },
  { step: "03", title: "We prepare your personalised assessment.", desc: "Every report is reviewed and tailored before it leaves our hands." },
  { step: "04", title: "Receive it within 2–3 business days.", desc: "Your assessment arrives with a clear breakdown of findings and next steps." },
];

function HowItWorks() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>How It Works</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          A clear path from{" "}
          <span className="text-gradient">request to report</span>.
        </h2>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              data-testid="how-it-works-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`glass hover-lift group relative overflow-hidden rounded-2xl p-6 ${i === 0 ? "shadow-glow" : ""}`}
            >
              <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br from-primary to-emerald opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Step {item.step}
                </span>
                {i < HOW_IT_WORKS.length - 1 && (
                  <ArrowDown className="size-4 text-muted-foreground/40 transition-colors group-hover:text-primary" />
                )}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="relative px-6 py-24 md:py-32">
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
            <SectionLabel>Request Yours</SectionLabel>
            <h2 className="mt-6 mx-auto max-w-3xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Ready to discover where AI can create the{" "}
              <span className="text-gradient">biggest impact in your business</span>?
            </h2>
            <p className="mt-6 mx-auto max-w-xl text-muted-foreground">
              No cost. No obligation. Just a clear, personalised view of where
              your business can operate smarter.
            </p>
            <div className="mt-10 flex justify-center">
              <CTAButton />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function BusinessEfficiencyAssessment() {
  return (
    <div className="min-h-screen">
      <main>
        <AssessmentHero />
        <WhatYouReceive />
        <ReportPreviews />
        <WhyBusinessesRequest />
        <ValueSection />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
