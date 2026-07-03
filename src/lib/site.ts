// ─── Interfaces ──────────────────────────────────────────────────────────────

/** A social-proof metric displayed in the Hero section */
export interface ProofCard {
  value: string; // e.g. "22+"
  label: string; // e.g. "System Types Built"
}

/** A pain-point card in The Cost Section */
export interface CostItem {
  title: string; // ≤ 4 words, e.g. "Invisible Time Drain"
  desc: string; // 1–2 sentences describing business consequence
}

/** An intelligent system type UGG delivers */
export interface Service {
  title: string; // e.g. "AI Employees"
  problem: string; // 1 sentence — what pain this solves
  transformation: string; // 1 sentence — how UGG transforms the situation
  outcome: string; // 1 sentence — measurable business outcome
}

/** One step in the 6-step engagement process */
export interface EngagementStep {
  title: string; // e.g. "Free AI Opportunity Audit"
  desc: string; // ≤ 200 characters
}

/** A UGG differentiator / philosophy principle */
export interface Principle {
  title: string; // e.g. "Business-First, Not AI-First"
  desc: string; // 1–2 sentences
  icon: string; // Lucide icon name, e.g. "Target"
}

/** A FAQ question and answer pair */
export interface FaqItem {
  question: string;
  answer: string;
}

// ─── Site Config ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "Ummah Growth Guide",
  tagline: "We don't sell AI. We redesign how your business operates.",
  auditUrl: "/apply",
  email: "salam@ummahgrowthguide.com",
  linkedin: "",
  github: "https://github.com/Marfooah",
  githubUser: "Marfooah",
  socialProof: "",
};

export const META = {
  title: "Ummah Growth Guide — Business Systems Studio",
  description:
    "Ummah Growth Guide builds intelligent systems that eliminate repetitive work — so your business operates smarter. Get your free AI Opportunity Audit.",
};

// ─── Proof Cards ─────────────────────────────────────────────────────────────

export const PROOF_CARDS: ProofCard[] = [
  { value: "22+", label: "Intelligent System Types" },
  { value: "100%", label: "Custom Architecture" },
  { value: "6-Step", label: "Proven Delivery Process" },
];

// ─── Cost Items ───────────────────────────────────────────────────────────────

export const COST_ITEMS: CostItem[] = [
  {
    title: "Invisible Time Drain",
    desc: "Your team spends 60–70% of their week on tasks a system could handle in seconds. That time never comes back.",
  },
  {
    title: "Inconsistent Execution",
    desc: "Manual processes break differently every time. Customers experience that inconsistency before you see it in data.",
  },
  {
    title: "Bottlenecked Growth",
    desc: "Every new client adds a new manual workload. You cannot scale what depends entirely on human hours.",
  },
  {
    title: "Knowledge Locked Away",
    desc: "When a key team member leaves, institutional knowledge leaves with them. Systems make that knowledge permanent.",
  },
  {
    title: "Delayed Decisions",
    desc: "Without automated data flows, decisions wait on reports that wait on people. Speed compounds over months and years.",
  },
  {
    title: "Competitor Advantage Lost",
    desc: "Businesses that automate now are compounding efficiency gains. The gap widens every quarter they operate smarter.",
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────

export const SERVICES: Service[] = [
  {
    title: "AI Employees",
    problem: "Repetitive, rule-based tasks consume skilled team members who were hired for judgment.",
    transformation:
      "UGG deploys AI agents that handle those tasks end-to-end with no human intervention.",
    outcome: "Your team reclaims 10–15 hours per week to focus on work that actually requires them.",
  },
  {
    title: "Agentic AI Systems",
    problem:
      "Static automation breaks the moment a process has an edge case or requires a decision.",
    transformation:
      "UGG builds agent-based architectures that reason, adapt, and act across multi-step workflows.",
    outcome:
      "Complex operations run autonomously without constant human oversight or manual exceptions.",
  },
  {
    title: "Workflow Automation",
    problem: "Disconnected tools and manual handoffs create invisible delays across every department.",
    transformation:
      "UGG connects your existing stack into orchestrated workflows that trigger and complete automatically.",
    outcome: "Tasks that took hours to coordinate now resolve in minutes with zero manual effort.",
  },
  {
    title: "Voice AI Agents",
    problem: "Phone-based interactions require constant human availability and produce no useful data.",
    transformation:
      "UGG deploys voice agents that handle calls, qualify leads, and book appointments around the clock.",
    outcome:
      "Your business operates 24/7 without adding headcount, and every call produces structured records.",
  },
  {
    title: "Customer Support Agents",
    problem:
      "Support queues grow faster than teams can hire, and repetitive queries drain senior capacity.",
    transformation:
      "UGG builds AI agents trained on your knowledge base to resolve common queries instantly.",
    outcome:
      "Resolution time drops, customer satisfaction rises, and your team handles only complex cases.",
  },
  {
    title: "Internal Knowledge Systems",
    problem:
      "Critical business knowledge is scattered across documents, emails, and individuals' memory.",
    transformation:
      "UGG builds searchable, queryable knowledge systems that surface the right answer in seconds.",
    outcome:
      "Onboarding accelerates, decisions improve, and expertise no longer walks out the door.",
  },
  {
    title: "Lead Qualification Agents",
    problem:
      "Sales teams spend significant time on prospects who were never a good fit to begin with.",
    transformation:
      "UGG deploys agents that qualify, score, and route leads automatically before any human contact.",
    outcome:
      "Your sales team talks only to high-intent prospects, compressing time-to-close and improving conversion.",
  },
  {
    title: "Sales Follow-up Systems",
    problem:
      "Deals go cold because timely, personalised follow-up requires consistency no human can sustain.",
    transformation:
      "UGG builds automated follow-up sequences that adapt messaging based on prospect behaviour.",
    outcome:
      "No lead goes cold by default, and your pipeline stays active without manual calendar management.",
  },
  {
    title: "CRM Intelligence",
    problem:
      "CRM data is outdated, incomplete, and never reflects what sales conversations actually reveal.",
    transformation:
      "UGG integrates AI that reads interactions and updates CRM records automatically and accurately.",
    outcome:
      "Your CRM becomes a trusted source of truth, and forecasting improves with clean, real-time data.",
  },
  {
    title: "Email Intelligence",
    problem:
      "High email volume means important threads get buried and responses arrive too late to matter.",
    transformation:
      "UGG builds AI systems that triage, draft, and route emails based on content and urgency.",
    outcome:
      "Response times improve dramatically, and your team focuses on high-value correspondence only.",
  },
  {
    title: "Operations Automation",
    problem:
      "Operational processes are documented once and then executed inconsistently by different people.",
    transformation:
      "UGG converts operational procedures into automated systems that run identically every time.",
    outcome: "Execution quality becomes predictable, errors decrease, and capacity scales without hiring.",
  },
  {
    title: "Document AI",
    problem:
      "Document-heavy workflows such as contracts, reports, and invoices require manual review and extraction.",
    transformation:
      "UGG deploys document intelligence systems that read, extract, classify, and act on document content.",
    outcome:
      "Document processing time drops by up to 80%, and accuracy improves with structured, auditable outputs.",
  },
  {
    title: "Meeting Intelligence",
    problem:
      "Meetings produce decisions and actions that are immediately lost to memory or incomplete notes.",
    transformation:
      "UGG builds systems that transcribe, summarise, and extract next actions from every meeting automatically.",
    outcome:
      "Nothing falls through the cracks, accountability is clear, and meeting output feeds directly into workflows.",
  },
  {
    title: "Executive Assistants",
    problem:
      "Executives spend hours each week on scheduling, briefing preparation, and information gathering.",
    transformation:
      "UGG builds AI assistant systems that handle calendar logic, research requests, and briefing generation.",
    outcome:
      "Executives recover 5–10 hours per week for strategic work instead of administrative coordination.",
  },
  {
    title: "Custom Business Dashboards",
    problem:
      "Business data lives in silos and decision-makers lack a single, accurate view of operations.",
    transformation:
      "UGG builds live dashboards that aggregate, clean, and surface the metrics that actually drive decisions.",
    outcome:
      "Leadership sees the full operational picture in one place, enabling faster and better-informed choices.",
  },
  {
    title: "AI Research Agents",
    problem:
      "Competitive research and market analysis require hours of manual browsing and synthesis.",
    transformation:
      "UGG deploys research agents that gather, filter, and summarise information from multiple sources automatically.",
    outcome:
      "Research that once took a full day now arrives in structured form within minutes.",
  },
  {
    title: "Multi-Agent Systems",
    problem:
      "Complex business operations require coordination between multiple specialised functions simultaneously.",
    transformation:
      "UGG architects multi-agent networks where specialised agents collaborate to complete end-to-end workflows.",
    outcome:
      "Business processes that required multiple human roles can now run with minimal oversight.",
  },
  {
    title: "Internal Company AI",
    problem:
      "Generic AI tools don't understand your business context, terminology, or specific workflows.",
    transformation:
      "UGG builds a private, company-specific AI trained on your documentation, processes, and data.",
    outcome:
      "Every team member has an always-on assistant that gives accurate, business-specific answers instantly.",
  },
  {
    title: "RAG Knowledge Assistants",
    problem:
      "Employees waste time searching for information that already exists somewhere in the organisation.",
    transformation:
      "UGG deploys retrieval-augmented generation systems that surface exact answers from your existing documents.",
    outcome:
      "Information retrieval drops from minutes to seconds, and answers are always grounded in current documentation.",
  },
  {
    title: "MCP Integrations",
    problem:
      "AI tools cannot access your live business data, making their outputs generic and often incorrect.",
    transformation:
      "UGG connects AI systems to your live data sources using Model Context Protocol integrations.",
    outcome:
      "AI reasoning becomes accurate and context-aware because it operates on real, current business data.",
  },
  {
    title: "Custom AI Applications",
    problem:
      "Off-the-shelf AI products solve generic problems, not the specific workflows unique to your business.",
    transformation:
      "UGG designs and builds purpose-built AI applications scoped entirely around your operational requirements.",
    outcome:
      "You get a system that fits your processes exactly, not a tool you have to work around.",
  },
  {
    title: "Future-proof AI Infrastructure",
    problem:
      "Businesses adopt AI point solutions that create technical debt and break when requirements change.",
    transformation:
      "UGG designs modular AI infrastructure with clean interfaces that absorb new capabilities without rebuilding.",
    outcome:
      "Your AI investment compounds over time instead of requiring costly replacement every 12–18 months.",
  },
];

// ─── Engagement Process ───────────────────────────────────────────────────────

export const ENGAGEMENT_PROCESS: EngagementStep[] = [
  {
    title: "Free AI Opportunity Audit",
    desc: "A focused 30-minute session to map where time and money are being lost to manual, repetitive work in your business.",
  },
  {
    title: "Business Systems Strategy",
    desc: "A prioritised plan that identifies which systems to build first for the highest return and fastest time to value.",
  },
  {
    title: "System Architecture",
    desc: "UGG designs the technical blueprint for your system, selecting the right models, tools, and integrations for your stack.",
  },
  {
    title: "Development",
    desc: "Full build of the system with regular progress updates, staged testing, and feedback loops throughout the process.",
  },
  {
    title: "Deployment",
    desc: "The system goes live in your environment with documentation, training, and a handover your team can actually use.",
  },
  {
    title: "Optimisation",
    desc: "Post-launch monitoring, performance tuning, and iterative improvements as your business evolves and scales.",
  },
];

if (ENGAGEMENT_PROCESS.length !== 6) {
  throw new Error(
    `ENGAGEMENT_PROCESS must contain exactly 6 steps. Found: ${ENGAGEMENT_PROCESS.length}`,
  );
}

// ─── Principles ───────────────────────────────────────────────────────────────

export const PRINCIPLES: Principle[] = [
  {
    title: "Business-First, Not AI-First",
    desc: "Every system starts with a specific business outcome, not an AI capability. Technology follows strategy.",
    icon: "Target",
  },
  {
    title: "Systems, Not Shortcuts",
    desc: "Quick fixes create technical debt. UGG builds architectures that compound in value over time.",
    icon: "GitBranch",
  },
  {
    title: "Custom Architecture, Not Templates",
    desc: "Your workflows are unique. Off-the-shelf automation breaks the moment your process has an edge case.",
    icon: "Code2",
  },
  {
    title: "Built to Scale With You",
    desc: "Systems are designed to handle 10x your current volume without needing a rebuild.",
    icon: "TrendingUp",
  },
  {
    title: "Designed Around Your Workflow",
    desc: "Implementation adapts to how your team actually operates, not the other way around.",
    icon: "LayoutDashboard",
  },
];

// ─── FAQ Items ────────────────────────────────────────────────────────────────

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Will this work with the tools and software we already use?",
    answer:
      "Yes. UGG builds systems that integrate with your existing stack — whether that's a CRM, project management tool, communication platform, or custom software. The goal is to enhance what you already have, not replace it.",
  },
  {
    question: "Which repetitive tasks can AI actually handle end-to-end?",
    answer:
      "Any task that follows a consistent logic path is a candidate: data entry, document processing, email triage, lead qualification, scheduling, report generation, customer query responses, and internal information retrieval. The audit session maps exactly which tasks in your business fit that profile.",
  },
  {
    question: "How much control does the AI have, and where does it stop?",
    answer:
      "Every system is designed with clear boundaries. Agents operate within defined parameters — they act, respond, and process, but any decision that carries financial, legal, or strategic weight is flagged for human review. You decide where the boundaries sit.",
  },
  {
    question: "Do our employees need to supervise the AI constantly?",
    answer:
      "No. The systems are built to run autonomously within their defined scope. Your team receives exception reports and edge-case alerts, but routine operations require no daily oversight. The goal is to free your team, not create a new monitoring job.",
  },
  {
    question: "How is our business data kept secure?",
    answer:
      "Data security is a design requirement, not an afterthought. Systems are built with access controls, encryption in transit and at rest, and minimal data exposure principles. Where possible, processing happens within your own infrastructure rather than through third-party APIs.",
  },
  {
    question: "What happens when our business processes change?",
    answer:
      "Systems are built with modular architecture specifically so that changes in your business processes can be absorbed without a full rebuild. Updates, new integrations, and process changes are handled through a planned optimisation cycle rather than starting from scratch.",
  },
  {
    question: "Which types of businesses benefit most from working with UGG?",
    answer:
      "The highest-value clients are typically businesses with 5–100 employees that have well-established processes but are constrained by the manual effort those processes require. Service businesses, agencies, professional practices, and operations-heavy companies see the fastest returns.",
  },
  {
    question: "How long does it take to build and deploy a system?",
    answer:
      "A focused automation or agent system typically takes 2–6 weeks from architecture sign-off to deployment, depending on integration complexity. The free audit identifies scope accurately so there are no surprises on timeline or cost.",
  },
  {
    question: "What does the free AI Opportunity Audit actually involve?",
    answer:
      "The audit is a 30-minute structured conversation focused on understanding your current workflows, where time is being lost, and which systems would deliver the clearest return. There is no sales pitch — the output is a plain-language map of your automation opportunities.",
  },
];
