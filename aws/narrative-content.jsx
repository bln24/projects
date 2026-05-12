/* global React */
/* CAIO Elevate — narrative + storyboard content (modeled on the gold-standard examples) */

const NARRATIVE = {
  eyebrow: "Working draft · v3",
  title: "CAIO Elevate First Call Deck",
  subtitle: "Informed by the April 24 working session, the CAIO Profile (Enterprise) deck, and the AWS Sales Enablement CAIO deck.",
  attribution: "Drafted by Angie Paik · reviewed by Stephen Lee · Brand · BLN24",

  purpose: {
    label: "Purpose",
    body: [
      "This document specifies the narrative arc for the CAIO Elevate First Call Deck. It is the outline a seller walks through in a single 45–60 minute conversation with a Chief AI Officer (or CAIO-adjacent leader) on a first call.",
      "The deck has to do four things at once. It has to demonstrate that AWS understands the CAIO seat. It has to install the vocabulary the rest of the conversation depends on. It has to diagnose where the customer actually is, rather than assume. And it has to show that AWS — with a named partner ecosystem — can meet agentic needs across the full spectrum, not just sell one product.",
      "This is one deck for both seller and customer. There is no separate seller-facing version. Sellers should be able to walk this verbatim, with appendix material pulled forward as the room requires.",
    ],
  },

  principles: {
    label: "Design principles",
    items: [
      {
        name: "Diagnostic, not pitch.",
        body: "The CAIO could be anywhere on the autonomy spectrum when the seller walks in. The deck has to diagnose live and adjust pacing in real time. The fulcrum is the mental-model slide — the seller reads the room there and chooses how the rest of the call unfolds.",
      },
      {
        name: "Welded structure.",
        body: "Diagnostic and answer cannot be separated by an act break. Whatever gap the CAIO names, the very next slide shows what closes it.",
        attribution: "Brad, working session: \u201cthis is my most important problem, and let's figure out what's the best way to approach this with AWS.\u201d",
      },
      {
        name: "Modular by mandate.",
        body: "The CAIO seat is structurally different from the CMO or COO seat because it carries both an internal mandate (digital labor) and an external mandate (product AI) simultaneously. The deck has to flex live: a CAIO with external influence pulls toward CMO Elevate material; a CAIO with internal influence pulls toward COO Elevate. The maturity-model slide is where this hand-off lives structurally.",
      },
      {
        name: "Industry-aware from the first slide.",
        body: "Per Elena: a generic deck loses an industry-specific CAIO in the first three slides. Industry doesn't get its own act — it threads through the entire deck. The opening names the customer's frontier agentic concern (e.g., AdContext Protocol for ad tech, agent identity for FSI, clinical-trial agentic workflows for pharma); the diagnostic slide carries an industry-relevant signal; and the proof point is industry-matched where possible.",
      },
      {
        name: "Peer-agnostic by design.",
        body: "The CAIO is the foundation-builder for whichever C-suite peers matter most in their organization — which differs by industry and company. The deck must not lock into a fixed set of peer titles (CMO / CFO / COO). Instead, peer conversations are named by outcome — Revenue, Cost, Risk, Product — with named C-suite peers as illustrative tags the seller customizes per customer.",
        commentRef: 2,
      },
    ],
  },

  arc: {
    label: "CAIO FCD Narrative",
    intro: "The seller walks the CAIO through seven moves over 45–60 minutes. Each move earns the right to the next one. The pacing is variable based on Move 2 (the seller reads the room and chooses fast path or slow path).",
    moves: [
      {
        n: 1,
        title: "Open on the dual mandate",
        time: "≈5 min",
        blocks: [
          {
            label: "What the seller does",
            body: "Names the seat directly. Not stats. Not product. The CAIO is the only C-suite seat in the organization with both an internal mandate (deploy AI as digital labor across the enterprise) and an external mandate (ship AI as a customer-facing product) — simultaneously, with no settled playbook for either.",
          },
          {
            label: "Why this move first",
            body: "The CAIO seat is new and politically exposed. Acknowledging it before pitching anything is what earns the next 40 minutes. The dual mandate is also what differentiates this deck from CMO Elevate and COO Elevate — the CMO has one mandate, the COO has one mandate, the CAIO has both.",
          },
          {
            label: "Industry signal",
            body: "On the same slide or immediately after, the seller names the customer's industry-specific frontier agentic concern. Not the industry generally — the cutting-edge concern. For ad tech: agent-to-agent communication and AdContext Protocol. For FSI: agent identity, audit trail, SEC AI disclosure. For healthcare/pharma: clinical-trial agentic workflows, HIPAA-grade governance. For manufacturing/auto: agentic supply chain, OT/IT identity convergence.",
          },
          {
            label: "What the customer should feel",
            body: "\u201cThey understand my job, and they understand my industry. This isn't a template.\u201d",
            italic: true,
          },
        ],
      },
      {
        n: 2,
        title: "Install the agentic vocabulary",
        time: "≈5 min",
        blocks: [
          {
            label: "What the seller does",
            body: "Walks the CAIO from the LLM paradigm (\u201cprompt in, response out, value = better answers, buying = tokens\u201d) to the agentic paradigm (\u201cgoal in, outcome delivered, value = problems resolved end-to-end, buying = orchestration, identity, observability\u201d). Two-column comparison.",
          },
          {
            label: "Why this is the fulcrum",
            body: "Most leaders are still thinking LLM as agentic. Until that shifts, every downstream conversation about agents, autonomy, gaps, and partners will miss. This is the slide the rest of the deck depends on.",
          },
          {
            label: "Branch point — the seller reads the room here",
            body: "If the CAIO nods and uses agentic vocabulary back: the seller takes the fast path. Compresses the maturity model and gaps, and spends the time on partners, proof, and the CFO conversation. If the CAIO pushes back or stays in LLM-language: the seller takes the slow path. Spends most of the call on this slide and the maturity model. The 5 Gaps still get covered, but the partners and CFO material may slide to a follow-up.",
            commentRef: 4,
          },
        ],
      },
      {
        n: 3,
        title: "Locate them on the maturity map",
        time: "≈5–10 min",
        blocks: [
          {
            label: "What the seller does",
            body: "Walks the four-stage autonomy model — Tool, Teammate, Digital Employee, Workforce Layer. Both internal and external columns visible on one slide. Asks: where are your agents?",
          },
          {
            label: "Why this slide carries the dual mandate",
            body: "This is the first place the CAIO sees their dual mandate reflected on a single visual. The internal column lights up if they're operations-focused; the external column lights up if they're product-focused. Either way, they see themselves.",
          },
          {
            label: "Reframe",
            body: "93.6% of AI is \u201cin production,\u201d but stuck at Stage 1–2 autonomy. You're not behind on deployment — you're stuck on autonomy.",
            highlight: true,
          },
        ],
      },
      {
        n: 4,
        title: "Diagnose the gap",
        time: "≈5 min",
        blocks: [
          {
            label: "What the seller does",
            body: "Presents the 5 Gaps as the autonomy blockers: Profitability, Identity, Pilot Trap & Sprawl, Data Foundation, Trust. Each with a quantified signal. The skills gap is called out separately as cross-cutting.",
          },
          {
            label: "Critical design note",
            body: "This slide is not a five-tile equal-weight layout. The slide is designed to support ranking. The seller is explicitly asking the CAIO to name the one that hurts most — not absorb all five equally. Whichever the CAIO names is what the rest of the call orbits.",
            commentRef: 7,
          },
          {
            label: "What the customer should do",
            body: "Pick one. The seller's prompt is direct: \u201cWhich of these is the most urgent for you right now?\u201d",
          },
        ],
      },
      {
        n: 5,
        title: "The welded answer",
        time: "≈10 min",
        blocks: [
          {
            label: "What the seller does",
            body: "This is the slide that welds diagnostic to pitch. Whatever gap the CAIO named in Move 4, this slide shows three things in one beat: what AWS does to close it, what the CAIO does with that capability, and which peer conversation it serves.",
          },
          {
            label: "Slide structure",
            body: "Per gap, one row, three readable bands. Band 1 — AWS services that close the gap (e.g., Bedrock Guardrails + AgentCore + zero data retention for Trust). Band 2 — What the CAIO does with it (e.g., \u201cTrust Gap closed at the platform layer; agents evaluable like a role.\u201d). Band 3 — Which peer conversation it serves (e.g., \u201cWhat you take to your Risk and Compliance peers\u201d).",
          },
          {
            label: "Peer-conversation framing",
            body: "Peer conversations are named by outcome, not by C-suite title: Revenue / Growth, Cost / Efficiency, Risk / Compliance, Product / Customer. Named C-suite peers (CMO, CFO, COO, CRO, CISO, Chief Risk Officer, Chief Product Officer, Chief Supply Chain Officer, Chief Medical Officer) appear as illustrative tags under each conversation, not as fixed column headers.",
          },
        ],
      },
      {
        n: 6,
        title: "Show the value chain",
        time: "≈5 min",
        blocks: [
          {
            label: "What the seller does",
            body: "Names AWS's strategic value chain by role, not by logo: foundation models (Anthropic), SI delivery, data/security/governance partner. Then shows that each of the 5 Gaps has multiple named partners — not just one — as the proof of ecosystem depth.",
          },
          {
            label: "Why this is the differentiator",
            body: "Not a single-partner pitch, an end-to-end story. The strategic value chain is the message; the gap-by-partner ecosystem is the proof.",
          },
        ],
      },
      {
        n: 7,
        title: "Prove and close with two questions",
        time: "≈5–10 min",
        blocks: [
          {
            label: "Proof point",
            body: "GoDaddy on Bedrock with Anthropic. The buying sequence walked cleanly: Foundation (zero data retention, PII detection via Comprehend, single API proxy) → Stage 1–2 (2,000 developers on GoCode, AI-assisted coding) → Stage 2–3 (Airo.ai — agentic product turning customer conversations into completed tasks). Headline metrics: 50% sprint reduction, 100+ models behind one API.",
          },
          {
            label: "The close",
            body: "Three time-boxed options, sized to where the CAIO actually is. Option A — Data Foundation Assessment (free; for when data is the named blocker). Option B — 30-Day Agent Pilot (one workflow, one metric, AWS + Anthropic + named SI co-build). Option C — Cross-functional Working Session (2-hour readiness session with AWS + partner SMEs).",
          },
          {
            label: "The two questions",
            body: "(1) Which next step? — the CAIO picks A, B, or C. (2) Who else is in the next room? — the seller asks the CAIO to name the C-suite peer or LoB leader who owns the gap they identified in Move 4. Whoever that is, they're invited to the second meeting. This second question is where the multi-peer narrative actually executes.",
            highlight: true,
          },
        ],
      },
    ],
  },

  // The 12 core slides
  slideList: {
    label: "Slide count and structure",
    sublabel: "Core deck",
    items: [
      "Cover",
      "The dual mandate + industry frontier concern (Move 1)",
      "LLM → Agentic — the mental-model shift (Move 2)",
      "Agents vs. Autonomy — vocabulary (sets up Move 3)",
      "The 4 Stages of Maturity — internal + external columns (Move 3)",
      "The 5 Gaps — designed for ranking (Move 4)",
      "The welded answer — AWS × CAIO × peer conversation (Move 5)",
      "Industry lens — broad strokes across 4 priority industries, with one quadrant lit up for the room",
      "The strategic value chain + partner ecosystem (Move 6)",
      "GoDaddy proof point or industry-matched proof (Move 7)",
      "Three next-step options + the two questions (Move 7)",
      "Recap slide — names the buying committee, calendars the next meeting",
    ],
  },

  appendix: {
    label: "Appendix",
    sublabel: "Pulled forward live, not walked linearly",
    items: [
      "Discovery diagnostic (autonomy / digital labor / growth value drivers)",
      "Industry deep-dives library — named accounts and reference customers per industry",
      "CFO business case — three value drivers (autonomy, digital labor, growth) with formulas",
      "Cost stack and time-to-value ramp",
      "Partner play map — 5 Gaps × named partners × funding programs",
      "Objection responses — competitor platform, data not ready, ROI gate, governance blockers, regulator pressure, \u201cwe just need better LLM access\u201d",
      "Outcome map / KPI scorecard — what the CAIO measures once they commit",
    ],
  },

  takeaways: {
    label: "What the CAIO should walk away believing",
    items: [
      "AWS understands the CAIO seat as a dual mandate — not a CTO extension.",
      "The real bottleneck is autonomy, not deployment. 93.6% of AI is at Stage 1–2.",
      "The 5 Gaps are the right diagnostic to run their own program against.",
      "AWS has a sequenced answer — foundation, scaling, growth — and a partner ecosystem that closes each gap.",
      "There is a credible business case and a documented case study (GoDaddy) showing the path from Stage 1 to 3.",
      "AWS shows up with partners — model providers, SIs, governance partners — not alone.",
      "The CAIO is a foundation-builder for their C-suite peers, not just an AI buyer.",
      "There is a concrete next step on the calendar within seven days, with the right people in the room.",
    ],
  },
};

// Storyboard cards — modeled on CAIO_Elevate_Storyboard_FINAL.docx
// Each card = one slide. Sections from intro through Section 6 + Appendix.
const STORYBOARD = {
  header: "CAIO ELEVATE · STORYBOARD",
  subhead: "Moving the Enterprise from AI Deployment to AI Autonomy",
  intro: "A storyboard for engaging Chief AI Officers on the journey from Stage 1–2 (AI as a tool) to Stage 3–4 (AI as a workforce layer).",

  cards: [
    // Card 0: How to read this storyboard
    {
      kind: "intro",
      n: "00",
      section: "How to read this storyboard",
      tagline: "One card · one slide · one moment in the story",
      title: "CAIO Elevate FCD",
      lead: "This storyboard is a diagnostic intervention. The enterprise AI market is currently trapped in a \u201cProduction Paradox.\u201d Boards are demanding transformational ROI, yet 93.6% of AI in production is stuck at Stage 1 and 2 — acting as expensive chat tools that require constant human oversight. The problem is no longer adoption; the bottleneck is autonomy.",
      sequence: [
        { label: "The Reality Check", n: "Sections 1–3", body: "We reflect the CAIO's dual mandate back to them, establish the \u201cAgent vs. Autonomy\u201d vocabulary, and force them to locate their current reality on the four-stage Autonomy Map." },
        { label: "The Diagnostic Wedge", n: "Section 4", body: "We introduce the Five Gaps as strategic autonomy blockers. You will ask the CAIO which gap is loudest, and pivot the conversation based on their answer." },
        { label: "The Path Forward", n: "Sections 5–6", body: "We position AWS as the only unified stack purpose-built for Stage 3–4 autonomy, locking in the non-negotiable buying sequence: Foundation first, then Scaling, then Growth." },
      ],
    },

    // Card 01 — Production Paradox (3 stats)
    {
      kind: "stats",
      n: "01",
      section: "Section 1 · Intro",
      title: "The Production Paradox",
      goal: "Start the conversation with big, bold numbers. The problem isn't adoption; it's the autonomy ceiling.",
      visualLabel: "Visual — Three Stats Band",
      stats: [
        { big: "88%", body: "of companies are using AI" },
        { big: "85%", body: "of organizations have active agent pilots" },
        { big: "93%", body: "of AI is already \u201cin production\u201d" },
      ],
      kicker: "Every board is pushing for AI. But 93.6% of it is stuck at Stage 1 and 2.",
      source: "Source: HBR; Stanford AI Index 2026.",
    },

    // Card 02 — CAIO seat dual mandate
    {
      kind: "twoCol",
      n: "02",
      section: "Section 1 · The CAIO seat",
      title: "Your dual mandate, in Retail*",
      titleNote: "* insert relevant industry",
      goal: "Reflect the CAIO's own job back to them with challenges and contexts specific to their industry. The internal column lights up for operations-led leaders; the external column lights up for product-led ones. Whichever column they engage with first tells you which gap to lead with next.",
      visualLabel: "Visual — Dual-Mandate Comparison",
      cols: [
        {
          tag: "INTERNAL",
          name: "Digital Labor",
          rows: [
            { label: "What it looks like", body: "Agents running SOPs, drafting analysis, triaging tickets end-to-end." },
            { label: "Who feels it first", body: "COO, CHRO, CFO." },
            { label: "How value shows up", body: "Capacity created, cost removed, cycle time compressed." },
            { label: "What breaks first", body: "Identity boundaries, governance, trust telemetry." },
          ],
        },
        {
          tag: "EXTERNAL",
          name: "Customer-Facing Product AI",
          rows: [
            { label: "What it looks like", body: "Agents inside the product, resolving customer intent without a handoff." },
            { label: "Who feels it first", body: "CMO, Chief Product Officer, CRO." },
            { label: "How value shows up", body: "Retention, conversion, new revenue lines." },
            { label: "What breaks first", body: "Brand safety, hallucination, customer trust." },
          ],
        },
      ],
      footnote: "MODULARITY BEGINS — adapt this card to challenges and opportunities specific to the CAIO's industry (pick from cards in Appendix).",
      source: "Source: HBR; Gartner; AWS Customer Research 2026.",
    },

    // Card 03 — Paradigm shift (LLM -> Agentic)
    {
      kind: "shiftTable",
      n: "03",
      section: "Section 2 · The paradigm shift",
      title: "From prompt in, to outcome out",
      goal: "Walk the leader from \u201cprompt in, response out\u201d to \u201cgoal in, outcome delivered\u201d before any product conversation. If this shift doesn't land, every later slide misses.",
      visualLabel: "Visual — LLM Paradigm → Agentic Paradigm",
      colA: { tag: "WHERE MOST LEADERS ARE", name: "LLM Paradigm" },
      colB: { tag: "WHERE LEADERS NEED TO BE", name: "Agentic Paradigm" },
      rows: [
        ["Prompt in, response out", "Goal in, outcome delivered"],
        ["Value = better answers", "Value = problems resolved end-to-end"],
        ["Success = single-response accuracy", "Success = resolution rate across workflows"],
        ["Architecture = model + prompt template", "Architecture = agents + tools + memory + boundaries"],
        ["Trust = \u201cdoes it hallucinate?\u201d", "Trust = \u201ccan I verify what it decided and why?\u201d"],
        ["Buying = tokens, seats, API calls", "Buying = orchestration, identity, observability"],
      ],
      anchor: {
        attr: "Marco Argenti, CIO Goldman Sachs",
        body: "\u201cWe used to look at models as a chat that would provide questions and answers. Now we look at models as agents that perform tasks on our behalf.\u201d",
        kicker: "A peer is already speaking the language. Use it.",
      },
      source: "Source: Goldman Sachs AI Exchanges; Fortune.",
    },

    // Card 04 — Vocabulary (Agent vs Autonomy)
    {
      kind: "definitions",
      n: "04",
      section: "Section 2 · The paradigm shift",
      title: "\u201cTrust to Revenue\u201d — agent vs. autonomy",
      goal: "Define the vocabulary. Agent is the architecture. Autonomy is the maturity level. The CAIO's job is moving agents up the autonomy spectrum.",
      visualLabel: "Visual — Side-by-side Definition Cards",
      defs: [
        {
          tag: "THE ARCHITECTURE",
          name: "Agent",
          body: "A software system with scope, identity, and tools. It perceives, decides, and acts. Every stage of maturity uses agents.",
          notIs: "What it isn't: a model. A model is a component inside an agent.",
        },
        {
          tag: "THE MATURITY LEVEL",
          name: "Autonomy",
          body: "How much independence the agent is granted before, during, and after action. A spectrum, not a binary.",
          notIs: "What it isn't: a feature. It's an organizational decision about trust.",
        },
      ],
      kicker: "Once these two words are clean, the five gaps land as autonomy blockers — not technology problems.",
      commentRef: 4,
    },

    // Card 05 — Maturity map (4 stages)
    {
      kind: "maturity",
      n: "05",
      section: "Section 3 · The maturity map",
      title: "How autonomous are your agents today?",
      goal: "Get the CAIO to point at where they live on the map. Whichever column they point to (internal or external) tells the seller which gap to lead with next.",
      visualLabel: "Visual — Four-Stage Autonomy Map",
      stages: [
        { n: "01", name: "Tool", sub: "Human-directed", internal: "Data entry, report formatting, rule-based ops.", external: "Scripted bots, basic FAQs, simple recommendations.", gov: "Human validates every output." },
        { n: "02", name: "Teammate", sub: "Human-in-the-loop", internal: "Drafts, analysis, AIOps copilots.", external: "Smart search, recommendations, content creation.", gov: "Human reviews and approves." },
        { n: "03", name: "Digital Employee", sub: "Goal-directed", internal: "End-to-end support triage, CI/CD, financial reporting.", external: "In-app agents that resolve, transact, personalize.", gov: "Monitor decisions, not actions." },
        { n: "04", name: "Workforce Layer", sub: "Fully autonomous", internal: "Permanent operational layer; org assumes AI participation.", external: "Products are agent-native; agent-to-agent B2B.", gov: "Enterprise-scale fleet management." },
      ],
      reframe: "93.6% of AI is in production — but stuck at Stage 1–2. You aren't behind on deployment. You're stuck on autonomy.",
      source: "Source: AWS Internal Research 2026; cross-referenced with McKinsey Agentic AI Foundations, April 2026.",
      commentRef: 7,
    },

    // Card 06 — Five gaps grid
    {
      kind: "gapsGrid",
      n: "06",
      section: "Section 4 · The five gaps",
      title: "Five autonomy blockers — which is loudest?",
      goal: "Frame the gaps as a diagnostic, not a feature list. The CAIO's job here is to tell the seller which gap they have the clearest signal on. That answer becomes the entry point.",
      visualLabel: "Visual — 2×3 Gap Grid",
      gaps: [
        { n: "01", name: "Profitability", stat: "1 in 50 AI initiatives delivers transformational value." },
        { n: "02", name: "Identity", stat: "45B+ non-human identities. 10% of orgs ready." },
        { n: "03", name: "Pilot Trap & Sprawl", stat: "85% have pilots. 5% have production." },
        { n: "04", name: "Data Foundation", stat: "75% cite data quality as the top barrier to scaling." },
        { n: "05", name: "Trust", stat: "83% plan to deploy. 29% feel ready." },
        { n: "x", name: "Skills (cross-cutting)", stat: "The #1 reason Stage 2→3 stalls and the #1 partner opportunity.", subtle: true },
      ],
      ask: "Which one is loudest in your organization right now?",
      source: "Sources: Stanford AI Index 2026; Cisco State of AI Security 2026.",
    },

    // Card 07 — Gap 1 Profitability
    {
      kind: "gapDetail",
      n: "07",
      section: "Section 4 · Gap 1 — Profitability",
      title: "1 in 50 AI initiatives delivers transformational value",
      goal: "Reframe \u201cAI ROI\u201d from a CFO grievance into an autonomy decision. Stage 1–2 agents cost money. Stage 3–4 agents make it. The path through this gap is production-first sequencing, not better dashboards.",
      visualLabel: "Visual — Three-Line Gap Frame",
      data: "88% of companies are using AI; 6% see clear financial returns. 89% of agents never reach production at $150K–$800K each.",
      voice: { who: "Marco Argenti, Goldman Sachs", body: "Takes a measured approach, refuses to declare ROI prematurely, has Anthropic engineers embedded in financial-process agent builds." },
      answer: "Production-first deployment patterns. Bedrock cost controls. Inferentia for inference economics. FinOps for AI dashboards.",
      persona: "CFO and CEO are watching. CAIO carries it.",
      pilot: "Pick one workflow with a measurable cost or revenue line. Move it to production in 30 days. Prove the unit economics before scaling.",
      source: "Sources: Stanford AI Index 2026; Goldman Sachs CIO interviews.",
    },

    // Card 08 — Gap 2 Identity
    {
      kind: "gapDetail",
      n: "08",
      section: "Section 4 · Gap 2 — Identity",
      title: "45 billion non-human identities, 10% of orgs ready",
      goal: "Make agent identity feel like the IAM problem the security org already understands — except 12× larger than the human workforce, and almost entirely ungoverned today.",
      visualLabel: "Visual — Three-Line Gap Frame",
      data: "45B+ non-human and agentic identities active by end of 2025 — 12× the global human workforce. Only 10% of organizations have a developed strategy.",
      voice: { who: "Lori Beer, JPMorgan Chase", body: "\u201cAgent-to-agent interactions are very different than traditional system-to-system interactions.\u201d The agentic-paradigm argument compressed to one line." },
      answer: "AWS IAM for agents. Bedrock AgentCore identity controls. CloudTrail logging at the agent level. Session memory and credential boundaries.",
      persona: "CISO co-owns it. CAIO can't ship without them.",
      pilot: "Microsoft launched Entra Agent ID. Palo Alto paid $25B for CyberArk. Okta acquired Axiom. The market is repricing this overnight.",
      pilotLabel: "Industry signal",
      source: "Sources: Bloomberg Tech Disruptors; CIO.com.",
    },

    // Card 09 — Gap 3 Pilot Trap
    {
      kind: "gapDetail",
      n: "09",
      section: "Section 4 · Gap 3 — Pilot trap & sprawl",
      title: "Why 85% have pilots and 5% have production",
      goal: "Name the trap directly. Pilots aren't proof — they're a tax if they don't graduate. The way out is org design, not another POC.",
      visualLabel: "Visual — Three-Line Gap Frame",
      data: "85% have agent pilots; 5% have moved them to production. 96% say a unified platform is important; 7% have one. Gartner expects 40%+ of agentic projects scrapped by 2027.",
      voice: { who: "Suresh Kumar, Walmart", body: "Built four super agents — Sparky (customer), Marty (suppliers), a developer agent, an associate agent. One framework. Four audiences." },
      answer: "Bedrock as the unified foundation. AI CoE model. Bedrock Flows for visual orchestration. Fleet governance from day one.",
      persona: "CAIO and Head of Platform. The COO if pilots are clogging operations.",
      pilot: "Salesforce's own admission: ~8% of customers have activated Agentforce. Even the platform vendor sees the trap.",
      pilotLabel: "Counterpoint to keep in pocket",
      source: "Sources: AI Business; CIO Dive; Salesforce investor materials.",
    },

    // Card 10 — Gap 4 Data Foundation
    {
      kind: "gapDetail",
      n: "10",
      section: "Section 4 · Gap 4 — Data foundation",
      title: "Stage 3 won't run on Stage 1 data",
      goal: "Move data quality from an IT grievance to an autonomy gate. Without enterprise-grade data, agents can't reason reliably, and any conversation about \u201cmore autonomy\u201d hits a wall.",
      visualLabel: "Visual — Three-Line Gap Frame",
      data: "75% cite data integration and quality as the top barrier to agentic AI. McKinsey: 80% cite data limitations as the roadblock to scaling.",
      voice: { who: "Teresa Heitsenrether, JPMorgan Chase", body: "Sits on the Operating Committee, owns firmwide AI adoption with the data foundation explicitly first. JPMC was one of three firms to disclose architecture details for agentic workflows." },
      answer: "SageMaker Feature Store. Amazon DataZone. Bedrock Knowledge Bases. Lake Formation. The four-step McKinsey framework mapped to AWS services.",
      persona: "CDAO or CDO. Without them in the room, this gap doesn't close.",
      pilot: "Most CAIOs underestimate this gap by 6–12 months. Data work is 60–70% of the time-to-Stage-3 cost.",
      pilotLabel: "Why this is the hidden gate",
      source: "Source: McKinsey \u201cBuilding the Foundations for Agentic AI at Scale,\u201d April 2026.",
    },

    // Card 11 — Stack pillars
    {
      kind: "pillars",
      n: "11",
      section: "Section 5 · The stack",
      title: "The complete stack for Stage 3–4 agentic AI",
      goal: "Show the breadth without making it a product parade. The point isn't every service — it's that data foundation, agent orchestration, and trust governance are all on a single platform under a single security model.",
      visualLabel: "Visual — Three Pillars",
      pillars: [
        {
          name: "Data Foundation",
          items: [
            ["Bedrock Knowledge Bases", "Connect agents to enterprise data."],
            ["Amazon DataZone", "Data mesh with built-in governance."],
            ["SageMaker Feature Store", "Reusable, governed ML features."],
            ["OpenSearch + vector store", "Semantic retrieval at scale."],
          ],
        },
        {
          name: "Agent Orchestration",
          items: [
            ["Bedrock Agents", "Build, deploy, manage agents."],
            ["Strands SDK & AgentCore", "Multi-agent coordination."],
            ["Bedrock Flows", "Visual orchestration."],
            ["Amazon Q (Dev & Business)", "AI teammate, embedded."],
          ],
        },
        {
          name: "Trust & Governance",
          items: [
            ["Bedrock Guardrails", "Filters, PII, hallucination grounding."],
            ["IAM for Agents", "Identity boundaries for non-humans."],
            ["CloudWatch AI", "Telemetry, audit trails, observability."],
            ["Zero data retention", "Enterprise data stewardship by default."],
          ],
        },
      ],
      kicker: "AWS is the only cloud provider with all three pillars purpose-built and integrated for Stage 3–4 — not bolted together post-hoc.",
    },

    // Card 12 — Buying sequence
    {
      kind: "sequence",
      n: "12",
      section: "Section 5 · The sequence",
      title: "Foundation, scaling, growth — in order",
      goal: "Lock the buying sequence. Most CAIOs want to start with the visible thing (an agent product) and skip the invisible one (data and identity). The seller's job here is to make reversal feel reckless.",
      visualLabel: "Visual — Three Stacked Phases",
      phases: [
        { n: "Phase 1", name: "Foundation", items: ["Data foundations & MLOps", "Agent identity & compliance", "Observability & regulatory QA"], closes: "Data Foundation, Identity, Trust", mandate: "Internal + External" },
        { n: "Phase 2", name: "Scaling", items: ["Agent platforms", "Digital labor engines"], closes: "Pilot Trap, all five at scale", mandate: "Internal-heavy" },
        { n: "Phase 3", name: "Growth", items: ["Product AI", "Agent features in revenue products"], closes: "Profitability (revenue side)", mandate: "External" },
      ],
      kicker: "Foundation purchases are non-deferrable in 2026. Scaling without them is how you get to 89% of agents never reaching production.",
      source: "Source: Stanford AI Index 2026; AWS Customer Research 2026.",
    },

    // Card 13 — Partner ecosystem
    {
      kind: "partnerTable",
      n: "13",
      section: "Section 6 · The ecosystem",
      title: "A partner play for every gap",
      goal: "Signal that the CAIO won't be doing this alone. Each gap has a named partner play, and the flagship event tells the story across model, data, and delivery in one motion.",
      visualLabel: "Visual — Gap / Partner Play / Named Partners",
      rows: [
        ["01", "Profitability", "Inference Cost Optimization", "Anthropic, Loka, Fireworks, Nvidia, OpenAI"],
        ["02", "Identity", "Agent Trust Framework", "Caylent, CrowdStrike, Cyera, PwC"],
        ["03", "Pilot Trap & Sprawl", "Agent Orchestration Build", "Anthropic, Loka, Caylent, Slalom, Softserve"],
        ["04", "Data Foundation", "ML Feedback Pipeline", "Capgemini, Caylent, Loka, Slalom, Databricks"],
        ["05", "Trust", "Evaluation, Testing, Observability", "Caylent, Loka, Slalom, Dynatrace, Datadog"],
      ],
      kicker: "Anthropic for models and orchestration, a data foundation partner for trust and security, an SI for delivery. End-to-end story; not a single-partner pitch.",
    },

    // Card 14 — GoDaddy proof
    {
      kind: "proof",
      n: "14",
      section: "Section 6 · The proof",
      title: "GoDaddy on Bedrock — the journey, walked",
      goal: "Show that the buying sequence is not theoretical. GoDaddy did it in order: foundation, then scaling, then growth — and the result is a revenue-generating agentic product, not a slide.",
      visualLabel: "Visual — Three-Phase Journey",
      steps: [
        { n: "Step 1", name: "Foundation", body: "Zero data retention. PII auto-detection via Amazon Comprehend. Single API proxy controls all developer-to-model interactions.", result: "Security-first architecture before any scaling.", closes: "Closes Trust Gap" },
        { n: "Step 2 — Stage 1→2", name: "Scaling", body: "2,000 developers given secure access to AI coding tools through GoCode. Human-in-the-loop on every output.", result: "50% reduction in sprint duration.", closes: "Closes Pilot Trap" },
        { n: "Step 3 — Stage 2→3", name: "Growth", body: "Airo.ai launched — an agentic product that turns customer conversations into completed tasks across specialized sub-agents.", result: "Revenue-generating agentic product.", closes: "Closes Profitability (revenue)" },
      ],
      kicker: "Foundation first. Then scale. Then growth. This is what Stage 1→2→3 actually looks like in production.",
      source: "Source: GoDaddy / Anthropic on Amazon Bedrock case study.",
    },

    // Card 15 — Next steps
    {
      kind: "options",
      n: "15",
      section: "Section 6 · Next steps",
      title: "Two starts, both 30 days",
      goal: "Leave the meeting with a chosen first move. The seller's job is not to close — it's to walk out with a signed-off scope on Foundation work or a single-workflow agent pilot.",
      visualLabel: "Visual — Two Option Cards",
      options: [
        { name: "Option A", title: "Foundations for Agentic AI Assessment", scope: "Map current data architecture against the four-step framework. Identify the three biggest blockers to Stage 3 readiness.", duration: "30 days", evidence: "A prioritized investment plan, costed, with quick-win recommendations." },
        { name: "Option B", title: "Single-Workflow Agent Pilot", scope: "Pick one workflow with a measurable line (cost, revenue, or cycle time). Build, deploy, and measure against a human baseline.", duration: "30 days", evidence: "Agent error rate vs. human baseline, hours freed, go/no-go for Stage 2." },
      ],
      kicker: "What gets confirmed in the room: which option fits the loudest gap, who sponsors it, what success looks like, and which appendix workbook gets run next.",
    },

    // Card 16 — Close
    {
      kind: "takeaways",
      n: "16",
      section: "Section 6 · Close",
      title: "What the CAIO should walk away believing",
      goal: "Land the five takeaways the rest of the deck has earned. This is the slide the CAIO holds in their head when they walk into their next executive meeting.",
      visualLabel: "Visual — Five Numbered Takeaways",
      items: [
        { n: "01", tag: "Seat", body: "The seat is real and the mandate is dual." },
        { n: "02", tag: "Autonomy", body: "The bottleneck is autonomy, not deployment." },
        { n: "03", tag: "Gaps", body: "Five gaps are the right diagnostic." },
        { n: "04", tag: "Sequence", body: "Foundation, then scaling, then growth — in order." },
        { n: "05", tag: "Ecosystem", body: "AWS plus a partner play for every gap." },
      ],
    },

    // Appendix divider
    {
      kind: "appendixDivider",
      n: "—",
      section: "Appendices",
      title: "Workbooks, peer profiles, industry use cases",
      lead: "These cards run after the meeting, not during it. Use them to take a customer signal from the main deck and turn it into a sized opportunity.",
      groups: [
        { letter: "A", name: "Discovery Diagnostic Workbook", count: "3 cards" },
        { letter: "B", name: "AI Business Case Framework", count: "1 card" },
        { letter: "C", name: "Cost & Time-to-Value Workbook", count: "1 card" },
        { letter: "D", name: "Peer Leader Profiles", count: "5 cards" },
        { letter: "E", name: "Industry Use Cases", count: "10 cards" },
      ],
    },

    // Appendix D — peer profile sample
    {
      kind: "peerProfile",
      n: "D1",
      section: "Appendix D · Peer profile",
      title: "Argenti — the measured-pace voice",
      goal: "Use Argenti when the CAIO is the budget owner and is being asked to justify pace. He is the most quotable CIO on the LLM-to-agent shift, and his framing maps almost one-for-one onto the deck's autonomy thesis.",
      visualLabel: "Visual — Profile Block",
      person: { name: "Marco Argenti", title: "CIO, Goldman Sachs", match: "Profitability Gap", when: "When the CFO is pushing for premature ROI declarations." },
      sections: [
        { label: "The mental-model shift, in his words", body: "\u201cWe used to look at models as a chat that would provide questions and answers. Now a year later, we look at models as essentially entities or agents that can perform tasks on your behalf.\u201d Calls agentic AI \u201ca monumental, generational shift.\u201d" },
        { label: "Top-of-mind concerns", body: "Change management at scale. Measured rollout over hype. Preparing the next generation of \u201cAI-native\u201d employees who don't know a pre-AI workflow." },
        { label: "Distinctive move", body: "Embedded Anthropic engineers directly into Goldman's technology teams to co-build autonomous agents for financial processes." },
      ],
      source: "Sources: Fortune; Goldman Sachs AI Exchanges.",
    },
  ],
};

window.NARRATIVE = NARRATIVE;
window.STORYBOARD = STORYBOARD;
