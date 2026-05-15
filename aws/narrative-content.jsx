/* global React */
/* CAIO Elevate — narrative + storyboard content
   SOURCE OF TRUTH: CAIO_Elevate_Rebranded-v3.pptx
   Reverse-engineered by QA-Calvin, May 15 2026.
*/

const NARRATIVE = {
  eyebrow: "Approved standard · v3",
  title: "CAIO Elevate First Call Deck",
  subtitle: "Reverse-engineered from the approved v3 deck. This is the narrative spec the deck was built from — and the spec all future versions must hold to.",
  attribution: "QA-Calvin · May 15, 2026 · BLN24 × AWS",

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
        name: "Open on the problem, not the product.",
        body: "The deck opens with three numbers that name the CAIO's lived reality before a single AWS product appears. 88%, 85%, 93%. Everyone has adopted. Almost no one is in production. Credibility is earned here, not on the AWS stack slide.",
      },
      {
        name: "Welded structure.",
        body: "Diagnostic and answer cannot be separated by an act break. Whatever enabler the CAIO names as their constraint, the next slide shows what closes it.",
        attribution: "Brad, working session: "this is my most important problem, and let's figure out what's the best way to approach this with AWS."",
      },
      {
        name: "The CAIO as Orchestrator — not buyer.",
        body: "The central reframe: the CAIOs reaching production aren't the ones who own AI — they're the ones who orchestrate it. The deck positions the CAIO as the hub of every CXO conversation, not as an AI department head.",
      },
      {
        name: "Industry-aware from the first slide.",
        body: "A generic deck loses an industry-specific CAIO in the first three slides. Industry doesn't get its own act — it threads through the entire deck. The case studies are matched to CXO peer seats the CAIO is already accountable to.",
      },
      {
        name: "Six proofs, not one.",
        body: "The v3 deck replaced the single GoDaddy proof point with six case studies — one per CXO seat. Each case: objection / solution / metrics / enabler status. Industry-matched proof is now viable for any room.",
      },
    ],
  },

  arc: {
    label: "CAIO FCD Narrative",
    intro: "The seller walks the CAIO through seven moves over 45–60 minutes. Each move earns the right to the next one. The branch point is Move 5 — the seller reads which enabler the CAIO flags and chooses which case study to lead with.",
    moves: [
      {
        n: 1,
        title: "Open on the production gap",
        time: "≈5 min",
        blocks: [
          { label: "What the seller does", body: "Opens with three numbers before a single product is named: 88% have adopted AI. 85% are running pilots. 93% never reach production. The harder problem starts after the pilot. Building one is cheap. Staying in it isn't." },
          { label: "Why this move first", body: "The CAIO knows this is true — they're living it. Opening with external validation earns credibility before any AWS product appears. The frame: the problem isn't adoption, it's the production wall." },
          { label: "What the customer should feel", body: "\"They're not here to sell me something I already have. They see the real problem.\"", italic: true },
        ],
      },
      {
        n: 2,
        title: "Install the maturity model",
        time: "≈5–7 min",
        blocks: [
          { label: "What the seller does", body: "Walks the four-stage model: Assisted → Augmented → Agentic → Autonomous. Names the production line. ROI doesn't show up until Stage 3–4. Plants the reframe: 93% of organizations sit on the left of this line. 5.8× ROI in 14 months is the prize on the right." },
          { label: "Why this slide is the map", body: "Until the CAIO sees where they are on the spectrum, every downstream conversation about enablers and partners is abstract. This is the shared map the whole conversation references." },
          { label: "Key stat", body: "5.8× ROI within 14 months — but only in production (Stage 3–4). The left side of the line costs money. The right side makes it.", highlight: true },
        ],
      },
      {
        n: 3,
        title: "Name the seat",
        time: "≈5 min",
        blocks: [
          { label: "What the seller does", body: "Acknowledges that the CAIO title is now permanent (76% of enterprises, up from 26% in 2025) but the job description has changed. YESTERDAY: The Evangelist. TODAY: The Orchestrator — engineer the climb to production. Connect AI to every CXO's agenda." },
          { label: "Why this move", body: "Most CAIOs are still operating in Evangelist mode. Naming the shift before pitching anything signals AWS understands the seat at a level most vendors don't." },
          { label: "What the customer should feel", body: "\"They've described my last 18 months and pointed to what I actually need to become.\"", italic: true },
        ],
      },
      {
        n: 4,
        title: "Place them at the C-suite table",
        time: "≈5–8 min",
        blocks: [
          { label: "What the seller does", body: "Frames the CAIO as the single orchestrator across every CXO conversation. Hub-and-spoke: CAIO at center, six peers at the spokes — CMO, COO, CIO, CFO, CHRO, CPO. Drills to operational specifics: for each CXO, what are they chasing and what does the CAIO orchestrate for them?" },
          { label: "Why this works", body: "36% higher ROI for hub-and-spoke AI operating models vs. decentralized. Production happens when AI shows up in every CXO's agenda — not just the CAIO's." },
          { label: "What the customer should feel", body: "\"This is the peer map I've been trying to build. AWS has already done the work.\"", italic: true },
        ],
      },
      {
        n: 5,
        title: "Surface the five enablers",
        time: "≈5 min",
        blocks: [
          { label: "What the seller does", body: "Names the five architectural enablers the CAIO must own — the ones no CXO will ask for by name but that every CXO outcome depends on. Data (architecture that holds). Identity (IAM for non-humans). Trust (telemetry, QA, observability). Scale Path (pilots → production). Profit (cost & ROI)." },
          { label: "Branch point — read the room here", body: "Which enabler does the CAIO flag as loudest? That determines which case study leads in Move 6. Prompt: \"Which of these is the most urgent for you right now?\"", commentRef: 5 },
          { label: "What the customer should do", body: "Identify which enabler is their current constraint. The conversation now orbits that one." },
        ],
      },
      {
        n: 6,
        title: "Prove it — one case study per CXO seat",
        time: "≈10–12 min, modular",
        blocks: [
          { label: "What the seller does", body: "Delivers one case matched to the CXO seat where the flagged enabler lives. Structure: the objection → the AWS + partner solution → headline metrics → enabler status. Six cases: CMO → Pinterest, CIO → Capital One, COO → United Airlines, CHRO → Lumeris, CFO → JPMorgan, CTO → GoDaddy." },
          { label: "Structural rule", body: "Each case walks the buying sequence: Foundation → Scale → Revenue. Not a logo slide. The CAIO's objection has already been answered by a peer at a real enterprise." },
          { label: "What the customer should feel", body: "\"These aren't aspirational. These are enterprises that hit the same wall I'm hitting and crossed it.\"", italic: true },
        ],
      },
      {
        n: 7,
        title: "Show the stack and close",
        time: "≈7–10 min",
        blocks: [
          { label: "What the seller does", body: "Names the AWS Gen AI stack as unified architecture. Three-phase engagement model: Phase 0 (2–4 wks, free diagnostic), Phase 1 (6–12 wks, one use case in production), Phase 2 (quarter+, orchestration at scale). Close with two paths." },
          { label: "The close — two paths", body: "Path A: co-scope the five fronts. Walk away with a Phase 0 plan. Free. Yours to keep. Path B: full discovery and CXO workshop — AWS specialists, partner ecosystem, reference architectures.", highlight: true },
          { label: "The exit question", body: "Name the C-suite peer who owns the flagged enabler. That person is invited to the second meeting. This is where the deal expands. Exit line: \"You walk into your next board meeting with AWS already at the table.\"" },
        ],
      },
    ],
  },

  slideList: {
    label: "Slide count and structure",
    sublabel: "Core deck",
    items: [
      "Cover",
      "The production gap — 88/85/93 (Move 1)",
      "Four stages of maturity — Assisted, Augmented, Agentic, Autonomous (Move 2)",
      "Same title. New job. Evangelist → Orchestrator (Move 3)",
      "Your real job is at the C-suite table — hub-and-spoke (Move 4)",
      "The CAIO as Orchestrator — five CXO detail panels (Move 4)",
      "Five enablers you have to architect — Data, Identity, Trust, Scale Path, Profit (Move 5)",
      "Pinterest · CMO · Agentic Campaign Management (Move 6)",
      "Capital One · CIO · Data Readiness for AI (Move 6)",
      "United Airlines · COO · Disruption Response (Move 6)",
      "Lumeris · CHRO · Employee Experience (Move 6)",
      "JPMorgan · CFO · Financial Close & FP&A (Move 6)",
      "GoDaddy · CTO · AI-Assisted to Agentic Development (Move 6)",
      "Every conversation. One AWS stack (Move 7)",
      "Three phases. Meet you where you are (Move 7)",
    ],
  },

  appendix: {
    label: "Appendix",
    sublabel: "Pulled forward live — five enabler deep dives",
    items: [
      "Data deep dive — Architecture that holds · Stage 2→3 gate",
      "Identity deep dive — IAM for non-humans · Stage 3→4 gate",
      "Trust deep dive — Telemetry & observability",
      "Scale Path deep dive — Pilots → production · Stage 2→3 gate",
      "Profit deep dive — Cost & ROI",
    ],
  },

  takeaways: {
    label: "What the CAIO should walk away believing",
    items: [
      "AWS understands the CAIO seat as a dual mandate — not a CTO extension.",
      "The real bottleneck is autonomy, not deployment. 93% of AI is stuck at Stage 1–2.",
      "The five architectural enablers are the right diagnostic for their own program.",
      "AWS has a sequenced answer — Foundation → Scaling → Growth — and a partner ecosystem.",
      "The proof points are real and replicable at their organization.",
      "AWS shows up with an ecosystem — model providers, SIs, governance partners — not alone.",
      "The CAIO is a foundation-builder for the C-suite, not just an AI buyer.",
      "There is a concrete next step within 7 days with the right people in the room.",
    ],
  },
};

const STORYBOARD = {
  header: "CAIO ELEVATE · STORYBOARD",
  subhead: "The CAIO's Playbook: Driving Business Value Beyond the Pilot",
  intro: "21 slides. 7 moves. One seller narrative that earns the right to every next slide before taking it. Reverse-engineered from CAIO_Elevate_Rebranded-v3.pptx.",

  cards: [
    { kind: "intro", n: "00", section: "How to read this storyboard", tagline: "One card · one slide · one moment in the story", title: "CAIO Elevate v3", lead: "This storyboard is reverse-engineered from the approved v3 deck. The deck is the standard. Every future version is tested against this spec.", sequence: [
      { label: "Moves 1–3 · The reality check", n: "Slides 2–4", body: "Open on the production gap. Install the maturity model. Name the seat shift. Credibility earned before any product appears." },
      { label: "Move 4 · The C-suite table", n: "Slides 5–6", body: "The CAIO as orchestrator of every CXO's AI agenda. Hub-and-spoke. Five detailed CXO panels. 36% higher ROI with this model." },
      { label: "Moves 5–7 · Diagnose, prove, close", n: "Slides 7–21", body: "Five enablers. Six case studies. AWS stack. Three phases. Two paths to a next step." },
    ]},
    { kind: "stats", n: "01", section: "Section 1 · Move 1 — Open on the production gap", title: "Everyone has adopted AI. But almost no one is in production.", goal: "Open with three numbers that name the CAIO's lived reality before any product appears.", visualLabel: "Visual — Three Stats Band (large)", stats: [
      { big: "88%", body: "have adopted AI — at least one business function" },
      { big: "85%", body: "are running pilots — organizations with agent pilots underway" },
      { big: "93%", body: "are stuck — never reach production" },
    ], kicker: "The harder problem starts after the pilot. Building one is cheap. Staying in it isn't.", source: "Sources: McKinsey State of AI 2025 · Stanford AI Index 2026 · IBM IBV CEO Survey 2026" },
    { kind: "maturity", n: "02", section: "Section 1 · Move 2 — Install the maturity model", title: "Pilots don't pay. Production does.", goal: "Install the shared map. The production line is the visual anchor.", visualLabel: "Visual — Four-Stage Maturity Model with production line", stages: [
      { n: "01", name: "Assisted", sub: "AI helps individuals work faster", internal: "Copilots, document drafting, rule-based ops.", external: "Basic recommendations, scripted bots.", gov: "Human validates every output." },
      { n: "02", name: "Augmented", sub: "AI improves team-level workflows", internal: "AIOps copilots, analysis drafts.", external: "Smart search, personalization, content.", gov: "Human reviews and approves." },
      { n: "03", name: "Agentic", sub: "Agents act on the business with oversight", internal: "End-to-end support triage, financial reporting.", external: "In-app agents that resolve, transact, personalize.", gov: "Monitor decisions, not individual actions." },
      { n: "04", name: "Autonomous", sub: "Systems run the business with guardrails", internal: "Permanent operational layer.", external: "Products are agent-native.", gov: "Enterprise-scale fleet governance." },
    ], reframe: "93% of organizations sit on the left of this line. 5.8× ROI within 14 months — but only in production.", source: "Sources: McKinsey State of AI 2025 · Stanford AI Index 2026" },
    { kind: "twoCol", n: "03", section: "Section 1 · Move 3 — Name the seat", title: "Same title. New job.", goal: "Name the shift before pitching anything.", visualLabel: "Visual — Two-column Yesterday / Today", cols: [
      { tag: "YESTERDAY", name: "The Evangelist", rows: [
        { label: "Mission", body: "Get the company to adopt AI." },
        { label: "Mode", body: "Hold the AI agenda. Build awareness. Run experiments. Prove the technology works." },
        { label: "Success", body: "Pilots launched. Board sees AI activity." },
      ]},
      { tag: "TODAY", name: "The Orchestrator", rows: [
        { label: "Mission", body: "Engineer the climb to production." },
        { label: "Mode", body: "Connect AI to every CXO's agenda. Move pilots past the production wall. Earn the ROI." },
        { label: "Success", body: "Agents in production. CXO peers pulling for AI. Board seeing ROI." },
      ]},
    ], kicker: "76% of enterprises now have a CAIO (up from 26% in 2025). The seat is permanent. The job description isn't.", footnote: "The CAIOs reaching production aren't the ones who own AI — they're the ones who orchestrate it." },
    { kind: "gapsGrid", n: "04", section: "Section 2 · Move 4 — C-suite table", title: "Your real job is at the C-suite table.", goal: "Frame the CAIO as the hub. 36% higher ROI with the hub-and-spoke model.", visualLabel: "Visual — Hub-and-spoke: CAIO center, six CXO spokes", gaps: [
      { n: "CMO", name: "Customer Growth", stat: "Personalization · Agentic campaign mgmt · Customer journey intelligence" },
      { n: "COO", name: "Operational Efficiency", stat: "Supply chain resilience · Dynamic pricing · Contact center automation" },
      { n: "CIO", name: "Platform Modernization", stat: "Developer productivity · Data readiness · IT service mgmt automation" },
      { n: "CFO", name: "Margin & ROI", stat: "Financial close · Dynamic forecasting · Spend intelligence · Audit monitoring" },
      { n: "CHRO", name: "Workforce Productivity", stat: "Talent acquisition · Workforce planning · Employee experience" },
      { n: "CPO", name: "Spend Optimization", stat: "Procurement intelligence · Vendor performance · Contract automation" },
    ], kicker: "36% higher ROI for hub-and-spoke AI operating models vs. decentralized.", source: "Source: IBM Institute for Business Value, 2026" },
    { kind: "gapsGrid", n: "06", section: "Section 3 · Move 5 — Five enablers", title: "Under every CXO outcome: five enablers you have to architect.", goal: "Surface the one that's loudest. That's where Move 6 goes.", visualLabel: "Visual — Five enablers, designed for ranking", gaps: [
      { n: "01", name: "Data", stat: "The Foundation — Architecture that holds. Stage 2→3 prerequisite." },
      { n: "02", name: "Identity", stat: "The Focus — IAM for non-humans. Stage 3→4 prerequisite." },
      { n: "03", name: "Trust", stat: "The Guardrails — Telemetry, QA, observability. Always-on." },
      { n: "04", name: "Scale Path", stat: "The Leap — Pilots → production. Stage 2→3 gate." },
      { n: "05", name: "Profit", stat: "The Outcome — Cost & ROI. Only 1 in 50 AI initiatives delivers transformational value." },
      { subtle: true, n: "→", name: "None of the CXO outcomes reach production without these.", stat: "Which one is loudest in your organization right now?" },
    ], ask: "Which of these is the most urgent for you right now?" },
    { kind: "gapDetail", n: "07", section: "Move 6 — CMO · Pinterest", title: "Pinterest went from brand-safe pilots to agentic commerce.", goal: "CMO seat proof. Scale Path + Profit enablers resolved.", visualLabel: "Visual — Objection → Solution → Metrics", data: "3 months → weeks prompt development cycle. 10M+ AI recommendations/sec. 60K human hours/year saved.", voice: { who: "CMO · Agentic Campaign Management", body: "Prompt engineering took three months per cycle. Brand consistency, safety, and personalization couldn't move together at scale." }, answer: "PromptHub on Amazon Bedrock with EKS. Centralized prompt versioning, evaluation, auto-tuning. Pinterest Assistant — agentic visual-first shopping — now in market.", persona: "CMO · Head of Marketing · Chief Digital Officer", pilot: "Scale Path ✓ · Profit Proving", pilotLabel: "Enabler status", source: "Source: AWS Pinterest AI Case Study (Tier 1A)." },
    { kind: "gapDetail", n: "08", section: "Move 6 — CIO · Capital One", title: "Capital One rebuilt the data foundation that AI requires.", goal: "CIO seat proof. Data + Identity resolved.", visualLabel: "Visual — Objection → Solution → Metrics", data: "8 on-prem data centers closed. 80% of 2,000 apps cloud-native. 300%+ release frequency increase.", voice: { who: "CIO · Data Readiness for AI", body: "Data readiness is the AI prerequisite — and CIOs own it. Without a unified data layer, agent identity and guardrails fall apart at scale." }, answer: "Serverless-first 'AI Factory' on AWS. EC2, Lambda, DynamoDB, Step Functions. Cloud Custodian for governance. IAM for Agents + Bedrock Guardrails. CIO owns platform; CAIO leads agentic policy — joint model.", persona: "CIO · Chief Data Officer · CDAO", pilot: "Data ✓ · Identity ✓ · Profit Proving", pilotLabel: "Enabler status", source: "Source: AWS Capital One All-In Case Study (Tier 1A)." },
    { kind: "gapDetail", n: "09", section: "Move 6 — COO · United Airlines", title: "United Airlines put AI in front of customers without breaking safety-of-flight.", goal: "COO seat proof. Trust resolved.", visualLabel: "Visual — Objection → Solution → Metrics", data: "6% CSAT lift on first deployment. 100s of agentic use cases governed. 1 unified governance layer.", voice: { who: "COO · Disruption Response", body: "Safety-of-flight culture blocks customer-facing GenAI. Auditable governance had to come before deployment — not after." }, answer: "Mars ML platform on Bedrock + United Data Hub. Unified governance for hundreds of agentic use cases. Manual passenger-record work eliminated. Contact-center copilots scaling.", persona: "COO · Head of Digital Operations", pilot: "Trust ✓ · Profit Proving", pilotLabel: "Enabler status", source: "Source: AWS United Airlines Innovator Story (Tier 1A)." },
    { kind: "gapDetail", n: "10", section: "Move 6 — CHRO · Lumeris", title: "Lumeris put an agentic HR copilot in front of every employee in eight weeks.", goal: "CHRO seat proof. Trust resolved. Tight scoping is what makes the first deployment safe.", visualLabel: "Visual — Objection → Solution → Metrics", data: "8 weeks POC to all-employee rollout. 1st line for every HR query. 100% tested before any employee saw it.", voice: { who: "CHRO · Employee Experience", body: "No playbook for putting LLMs in front of every employee. HR data is the most sensitive in the enterprise." }, answer: "Amazon Bedrock with Claude 3.5 Sonnet. Tight scope — answers HR policy questions, escalates the rest. P&C team tested end-to-end before launch.", persona: "CHRO · Chief People Officer", pilot: "Trust ✓ · Profit Proving", pilotLabel: "Enabler status", source: "Source: AWS Lumeris Case Study (Tier 1A). Verified May 2026." },
    { kind: "gapDetail", n: "11", section: "Move 6 — CFO · JPMorgan", title: "JPMorgan put AI into the CFO's function and onto every desk in the firm.", goal: "CFO seat proof. Profit anchored in the hardest regulated environment.", visualLabel: "Visual — Objection → Solution → Metrics", data: "230K+ employees on LLM Suite. 360K labor hours/year saved on contracts. $4.1T in assets under governance.", voice: { who: "CFO · Financial Close & FP&A", body: "Regulated, audited, model-risk-governed. The CFO needed AI value the auditor would sign on." }, answer: "AWS Bedrock + SageMaker. ChatCFO automates FP&A. LLM Suite scaled across the enterprise — same governance, same control plane. COiN saves 360,000 hours/year on contracts.", persona: "CFO · Chief Finance Officer", pilot: "Profit Proving", pilotLabel: "Enabler status", source: "Sources: AWS JPMorgan Chase Case Study + re:Invent 2024 (Tier 1A). Verified May 2026." },
    { kind: "proof", n: "12", section: "Move 6 — CTO · GoDaddy", title: "GoDaddy went from AI-assisted coding to agentic product development.", goal: "The canonical buying sequence: Foundation → Scale → Growth. Stage 1→2→3 walked cleanly.", visualLabel: "Visual — Three-phase buying sequence", steps: [
      { n: "Foundation", name: "Trust Gap closed", body: "Zero data retention. PII auto-detection. Single API proxy controls all dev-to-model interactions.", result: "GoCode platform on Amazon Bedrock.", closes: "Trust ✓" },
      { n: "Stage 1→2", name: "Scale Path closed", body: "2,000 developers on GoCode. AI-assisted coding. 100+ models via one API.", result: "50% decrease in sprint duration.", closes: "Scale Path ✓" },
      { n: "Stage 2→3", name: "Profit realized", body: "Launched Airo.ai — agentic product turning customer conversations into completed tasks.", result: "Revenue-generating agentic product in market.", closes: "Profit ✓" },
    ], kicker: "Foundation first. Then scale. Then growth. This is what Stage 1→2→3 actually looks like.", source: "Source: AWS GoDaddy + Anthropic on Bedrock case study (Tier 1A). Market benchmark: 5.8× ROI within 14 months at Stage 3–4 (McKinsey Global AI Survey, 2025)." },
    { kind: "sequence", n: "14", section: "Section 4 · Move 7 — Three phases", title: "Three phases. Meet you where you are.", goal: "The de-risked entry point. Phase 0 is free and yours to keep.", visualLabel: "Visual — Three stacked phases with durations", phases: [
      { n: "Phase 0 · 2–4 weeks", name: "Scope the foundation", items: ["Diagnostic of five architectural enablers", "Gap-by-gap readiness + named first-motion use case", "Yours to keep — with or without AWS"], closes: "All five enablers assessed", mandate: "Free · No commitment required" },
      { n: "Phase 1 · 6–12 weeks", name: "Localized POC", items: ["One named use case in production", "AWS + named partner · governance from day one", "You demo a working agent to your board"], closes: "Scale Path · Trust · Data", mandate: "Single CXO mandate · Partner co-build" },
      { n: "Phase 2 · Quarter+", name: "Orchestration at scale", items: ["Multiple use cases on a shared platform", "CAIO becomes the orchestrator the deck describes", "CXO peers pulling for AI"], closes: "All five enablers · Full ROI", mandate: "Full C-suite activation" },
    ], kicker: "Foundation runs as a parallel track across all three phases — required for Stage 3 agentic AI." },
    { kind: "options", n: "20", section: "Section 4 · Move 7 — Your next move", title: "Bring AWS into your next CXO conversation.", goal: "Leave with a chosen path. The CAIO stays in control. AWS brings the depth.", visualLabel: "Visual — Two paths", options: [
      { name: "Path A", title: "Co-scope your five fronts", scope: "Phase 0 diagnostic. Gap-by-gap readiness. Named first-motion use case.", duration: "2–4 weeks. Yours to keep with or without AWS.", evidence: "Gap-by-gap readiness assessment. Scoped Phase 1 POC plan." },
      { name: "Path B", title: "Full discovery and CXO workshop", scope: "AWS specialists per CXO domain. Partner ecosystem. Reference architectures.", duration: "You stay the orchestrator. We bring the depth.", evidence: "Prioritized roadmap. Named partner team. CXO peer at second meeting." },
    ], kicker: "Either way, you walk into your next executive board meeting with AWS already at the table.", ask: "Which path — and who from the C-suite is coming to the next meeting?" },
  ],
};

// ── Persona registry ──────────────────────────────────────────────────────
// Add new CXO personas here. The webapp reads this to auto-show built-in
// documents for any persona that has content — no code changes needed.
// Format: { PERSONA_KEY: { narrative: NARRATIVE_OBJ, storyboard: STORYBOARD_OBJ } }
const PERSONA_REGISTRY = {
  CAIO: { narrative: NARRATIVE, storyboard: STORYBOARD },
  // CMO:  { narrative: CMO_NARRATIVE, storyboard: CMO_STORYBOARD },
  // COO:  { narrative: COO_NARRATIVE, storyboard: COO_STORYBOARD },
  // CIO:  { narrative: CIO_NARRATIVE, storyboard: CIO_STORYBOARD },
  // CFO:  { narrative: CFO_NARRATIVE, storyboard: CFO_STORYBOARD },
  // CTO:  { narrative: CTO_NARRATIVE, storyboard: CTO_STORYBOARD },
};

window.NARRATIVE        = NARRATIVE;
window.STORYBOARD       = STORYBOARD;
window.PERSONA_REGISTRY = PERSONA_REGISTRY;
