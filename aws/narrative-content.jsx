/* global React */
/* CAIO Elevate — narrative + storyboard content
   SOURCE OF TRUTH: source-docs/CAIO_Elevate_FCD_Narrative.docx
                  + source-docs/CAO_Elevate_Storyboard_FINAL.docx
                  + source-docs/CAO_CAIO_CIO_Real_World_Examples.docx
                  + source-docs/Deck_Strategy.md
   Aligned to canonical exemplars 2026-05-20. Stephen + Angie's vocabulary.
*/

const NARRATIVE = {
  eyebrow: "Calibrated against source-doc exemplars",
  title: "CAIO Elevate First Call Deck",
  subtitle: "Moving the Enterprise from AI Deployment to AI Autonomy.",
  attribution: "Working draft — informed by the April 24 working session, the CAIO Profile (Enterprise) deck, and the AWS Sales Enablement CAIO deck.",

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
        attribution: "Brad, working session: “this is my most important problem, and let's figure out what's the best way to approach this with AWS.”",
      },
      {
        name: "Modular by mandate.",
        body: "The CAIO seat is structurally different from the CMO or COO seat because it carries both an internal mandate (digital labor) and an external mandate (product AI) simultaneously. The deck has to flex live: a CAIO with external influence pulls toward CMO Elevate material; a CAIO with internal influence pulls toward COO Elevate. The maturity-map slide is where this hand-off lives structurally.",
      },
      {
        name: "Industry-aware from the first slide.",
        body: "A generic deck loses an industry-specific CAIO in the first three slides. Industry doesn't get its own act — it threads through the entire deck. The opening names the customer's frontier agentic concern. The diagnostic slide carries an industry-relevant signal. The proof point is industry-matched where possible.",
      },
      {
        name: "Peer-agnostic by design.",
        body: "The CAIO is the foundation-builder for whichever C-suite peers matter most in their organization — which differs by industry and company. The deck must not lock into a fixed set of peer titles (CMO / CFO / COO). Peer conversations are named by outcome — Revenue / Growth, Cost / Efficiency, Risk / Compliance, Product / Customer. Named C-suite peers appear as illustrative tags the seller customizes per customer, not as fixed column headers.",
      },
    ],
  },

  arc: {
    label: "CAIO FCD Narrative",
    intro: "The seller walks the CAIO through seven moves over 45–60 minutes. Each move earns the right to the next one. The pacing is variable based on Move 2 — the seller reads the room there and chooses fast path or slow path.",
    moves: [
      {
        n: 1,
        title: "Open on the dual mandate",
        time: "≈5 min",
        blocks: [
          { label: "What the seller does", body: "Names the seat directly. Not stats. Not product. The CAIO is the only C-suite seat in the organization with both an internal mandate (deploy AI as digital labor across the enterprise) and an external mandate (ship AI as a customer-facing product) — simultaneously, with no settled playbook for either." },
          { label: "Why this move first", body: "The CAIO seat is new and politically exposed. Acknowledging it before pitching anything is what earns the next 40 minutes. The dual mandate is also what differentiates this deck from CMO Elevate and COO Elevate — the CMO has one mandate, the COO has one mandate, the CAIO has both." },
          { label: "Industry signal", body: "On the same slide or immediately after, the seller names the customer's industry-specific frontier agentic concern. For ad tech: agent-to-agent communication and AdContext Protocol. For FSI: agent identity, audit trail, SEC AI disclosure. For healthcare/pharma: clinical-trial agentic workflows, HIPAA-grade governance. For manufacturing/auto: agentic supply chain, OT/IT identity convergence." },
          { label: "What the customer should feel", body: "\"They understand my job, and they understand my industry. This isn't a template.\"", italic: true },
        ],
      },
      {
        n: 2,
        title: "Install the agentic vocabulary",
        time: "≈5 min",
        blocks: [
          { label: "What the seller does", body: "Walks the CAIO from the LLM paradigm (prompt in, response out, value = better answers, buying = tokens) to the agentic paradigm (goal in, outcome delivered, value = problems resolved end-to-end, buying = orchestration, identity, observability). Two-column comparison on one slide." },
          { label: "Why this is the fulcrum", body: "Most leaders are still thinking LLM as agentic. Until that shifts, every downstream conversation about agents, autonomy, gaps, and partners will miss. This is the slide the rest of the deck depends on." },
          { label: "Branch point — the seller reads the room here", body: "If the CAIO nods and uses agentic vocabulary back: fast path — compress the maturity model and gaps, spend the time on partners, proof, and the CFO conversation. If the CAIO pushes back or stays in LLM-language: slow path — spend most of the call on this slide and the maturity model. The 5 Gaps still get covered, but partners and CFO material may slide to a follow-up.", commentRef: 2 },
          { label: "What the customer should feel", body: "\"I now have the right vocabulary. The conversation just upgraded.\"", italic: true },
        ],
      },
      {
        n: 3,
        title: "Locate them on the maturity map",
        time: "≈5–10 min",
        blocks: [
          { label: "What the seller does", body: "Walks the four-stage autonomy model — Tool, Teammate, Digital Employee, Workforce Layer. Both internal and external columns visible on one slide. Asks: where are your agents?" },
          { label: "Why this slide carries the dual mandate", body: "This is the first place the CAIO sees their dual mandate reflected on a single visual. The internal column lights up if they're operations-focused; the external column lights up if they're product-focused. Either way, they see themselves." },
          { label: "Structural hand-off", body: "This is also where the modular hand-off into CMO Elevate (external column) or COO Elevate (internal column) lives. The seller doesn't break the narrative — they note it and continue, or they pivot if the conversation calls for it." },
          { label: "Reframe", body: "93.6% of AI is “in production,” but stuck at Stage 1–2 autonomy. You're not behind on deployment — you're stuck on autonomy.", highlight: true },
        ],
      },
      {
        n: 4,
        title: "Diagnose the gap",
        time: "≈5 min",
        blocks: [
          { label: "What the seller does", body: "Presents the 5 Gaps as the autonomy blockers: Profitability, Identity, Pilot Trap & Sprawl, Data Foundation, Trust. Each with a quantified signal. The skills gap is called out separately as cross-cutting." },
          { label: "Critical design note", body: "This slide is not a five-tile equal-weight layout. The slide is designed to support ranking. The seller is explicitly asking the CAIO to name the one that hurts most — not absorb all five equally. Whichever the CAIO names is what the rest of the call orbits." },
          { label: "Industry signal", body: "The industry-relevant manifestation of each gap should be readable on the slide — not generic stats. For an FSI customer, the Identity gap should reference SEC AI disclosure and audit trails; for a retail customer, the Pilot Trap should reference fragmented agentic commerce experiments." },
          { label: "What the customer should do", body: "Pick one. The seller's prompt is direct: \"Which of these is the most urgent for you right now?\"" },
        ],
      },
      {
        n: 5,
        title: "The welded answer",
        time: "≈10 min",
        blocks: [
          { label: "What the seller does", body: "This is the slide that welds diagnostic to pitch. Whatever gap the CAIO named in Move 4, this slide shows three things in one beat: what AWS does to close it, what the CAIO does with that capability, and which peer conversation it serves." },
          { label: "Slide structure", body: "Per gap, one row, three readable bands. Band 1 — AWS services that close the gap (e.g., Bedrock Guardrails + AgentCore + zero data retention for Trust). Band 2 — What the CAIO does with it (e.g., Trust Gap closed at the platform layer; agents evaluable like a role). Band 3 — Which peer conversation it serves (e.g., What you take to your Risk and Compliance peers)." },
          { label: "Peer-conversation framing", body: "Peer conversations are named by outcome, not by C-suite title — Revenue/Growth, Cost/Efficiency, Risk/Compliance, Product/Customer. Named C-suite peers (CMO, CFO, COO, CRO, CISO, Chief Risk Officer, Chief Product Officer, Chief Supply Chain Officer, Chief Medical Officer, etc.) appear as illustrative tags under each conversation, not as fixed column headers. The seller customizes the named peers based on the customer's actual org. The slide itself does not lock into a specific C-suite topology." },
          { label: "Why this matters", body: "This is the slide that elevates the CAIO from \"AI buyer\" to \"foundation-builder for the C-suite.\" It also gives the seller permission to expand the conversation beyond the CAIO without breaking the narrative line." },
        ],
      },
      {
        n: 6,
        title: "Show the value chain",
        time: "≈5 min",
        blocks: [
          { label: "What the seller does", body: "Names AWS's strategic value chain by role, not by logo: foundation models (Anthropic), SI delivery, data/security/governance partner. Then shows that each of the 5 Gaps has multiple named partners — not just one — as the proof of ecosystem depth." },
          { label: "Why this is the differentiator", body: "Not a single-partner pitch, an end-to-end story. \"More of a data foundation kind of partner, especially for the CIO, something around trust, security.\" The strategic value chain is the message; the gap-by-partner ecosystem is the proof." },
          { label: "Slide structure", body: "Headline band: the three-role value chain (model + SI + data/security). Supporting band: the 5 Gaps mapped to multiple named partners per gap. The seller's takeaway line: \"AWS shows up with an ecosystem, not alone, and not betting on one partner per gap.\"" },
        ],
      },
      {
        n: 7,
        title: "Prove and close with two questions",
        time: "≈5–10 min",
        blocks: [
          { label: "Proof point", body: "GoDaddy on Bedrock with Anthropic. The buying sequence walked cleanly: Foundation (zero data retention, PII detection via Comprehend, single API proxy) → Stage 1–2 (2,000 developers on GoCode, AI-assisted coding) → Stage 2–3 (Airo.ai — agentic product turning customer conversations into completed tasks). Headline metrics: 50% sprint reduction, 100+ models behind one API. This is not a logo slide. It is the buying sequence executed. Pilot Trap closed. Trust Gap closed. Profitability proving." },
          { label: "Industry-matched proof", body: "Where possible, the seller swaps in an industry-matched proof point from the appendix — Tapestry or Coca-Cola for retail, JPMC or Goldman for FSI, Pfizer or Trainline for healthcare/travel, Walmart for auto/mfg — and uses GoDaddy as the secondary reference." },
          { label: "The close — three options", body: "Three time-boxed options, sized to where the CAIO actually is. Option A — Data Foundation Assessment. Free, for when data is the named blocker. Output: data readiness scorecard + 90-day modernization plan. Option B — 30-Day Agent Pilot. One workflow, one metric, AWS + Anthropic + named SI co-build. Output: agent in production + ROI case + path to scale. Option C — Cross-functional Working Session. Two-hour readiness session with AWS + partner SMEs. Output: prioritized roadmap + named partner team + executive sponsor map.", highlight: true },
          { label: "The two questions", body: "(1) Which next step? The CAIO picks A, B, or C. (2) Who else is in the next room? The seller asks the CAIO to name the C-suite peer or LoB leader who owns the gap they identified in Move 4. Whoever that is, they're invited to the second meeting. This second question is where the multi-peer narrative actually executes. If the CAIO comes alone again, momentum dies. If they bring the right peer, the deal expands." },
        ],
      },
    ],
  },

  slideList: {
    label: "Slide count and structure",
    sublabel: "Core deck",
    items: [
      "Cover",
      "The dual mandate + industry frontier concern (Move 1)",
      "LLM → Agentic — the mental-model shift (Move 2)",
      "Agents vs. Autonomy — vocabulary (sets up Move 3)",
      "The 4 Stages of Maturity — Tool · Teammate · Digital Employee · Workforce Layer (Move 3)",
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
      "A — Discovery Diagnostic Workbook · 3 cards (autonomy / digital labor / growth value drivers)",
      "B — AI Business Case Framework · 1 card (three value drivers, formulas, CFO-ready)",
      "C — Cost & Time-to-Value Workbook · 1 card (cost stack and time-to-value ramp)",
      "D — Peer Leader Profiles · 5 cards (Argenti/Goldman · Beer + Heitsenrether/JPMorgan · Kumar/Walmart · Hervas/Pfizer · Franklin/Moderna)",
      "E — Industry Use Cases · 10 cards (named accounts and reference customers per industry)",
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

const STORYBOARD = {
  header: "CAiO ELEVATE FCD",
  subhead: "Moving the Enterprise from AI Deployment to AI Autonomy",
  intro: "A storyboard for engaging Chief AI Officers on the journey from Stage 1–2 (AI as a tool) to Stage 3–4 (AI as a workforce layer). One card, one slide, one moment in the story.",

  cards: [
    { kind: "intro", n: "00", section: "How to read this storyboard", tagline: "One card · one slide · one moment in the story", title: "CAIO Elevate FCD", lead: "Each card shows the slide number and section, the working title that matches what the audience sees, the seller's move in the conversation (not the words on the slide), and the content sketch — the data, the visual idea, and the proof point.", sequence: [
      { label: "Sections 1–3 · The reality check", n: "Slides 2–6", body: "Set the seat, the paradigm, and the maturity map. Required — don't skip. The CAIO recognises themselves before any product appears." },
      { label: "Section 4 · The diagnostic", n: "Slides 7–12", body: "Walk the five gaps. Each gap is matched to a named peer leader. The CAIO ranks. The rest of the call orbits whichever gap they name." },
      { label: "Sections 5–6 · The welded answer", n: "Slides 13–18", body: "Land the AWS stack, the non-negotiable buying sequence, the partner play per gap, the GoDaddy case, and the 30-day next step." },
      { label: "Appendices", n: "Pulled forward live", body: "Workbooks, peer leader profiles, and industry use cases. Used to take a customer signal from the main deck and turn it into a sized opportunity." },
    ]},

    { kind: "stats", n: "01", section: "Section 1 · Move 1 — The Production Paradox", title: "Everyone has adopted AI. Almost nobody is in production at the autonomy level that pays.", goal: "Open with three numbers that name the CAIO's lived reality before any product appears.", visualLabel: "Visual — Three Stats Band", stats: [
      { big: "88%", body: "of companies are using AI" },
      { big: "85%", body: "have agent pilots underway" },
      { big: "6%", body: "are seeing clear financial returns" },
    ], kicker: "You're not behind on deployment. You're stuck on autonomy.", source: "Sources: McKinsey State of AI 2025 · Stanford AI Index 2026 · IBM IBV CEO Survey 2026." },

    { kind: "twoCol", n: "02", section: "Section 1 · Move 1 — Your dual mandate", title: "Your dual mandate in [Industry]*", goal: "Name the seat — the only C-suite role with both an internal and external AI mandate, simultaneously.", visualLabel: "Visual — Dual-Mandate Comparison", cols: [
      { tag: "INTERNAL", name: "Digital labor across the enterprise", rows: [
        { label: "Mission", body: "Deploy AI as a workforce layer that improves cost, productivity, and time-to-value for every function." },
        { label: "Owns", body: "Internal copilots, agentic operations, governance for non-human workers." },
        { label: "Hands off to", body: "COO Elevate when the conversation moves into operational specifics." },
      ]},
      { tag: "EXTERNAL", name: "Customer-facing AI in product", rows: [
        { label: "Mission", body: "Ship AI as features customers feel — personalization, agentic assistants, in-product autonomy." },
        { label: "Owns", body: "Product AI roadmap, brand-safety governance, agentic UX." },
        { label: "Hands off to", body: "CMO Elevate when the conversation moves into customer growth specifics." },
      ]},
    ], kicker: "*Insert relevant industry. The opening names the customer's frontier agentic concern — not the industry generally, the cutting-edge concern.", source: "Sources: HBR; Gartner; AWS Customer Research 2026." },

    { kind: "twoCol", n: "03", section: "Section 2 · Move 2 — From prompt in to outcome out", title: "From prompt in, to outcome out.", goal: "Install the agentic vocabulary. This is the slide the rest of the deck depends on.", visualLabel: "Visual — LLM Paradigm → Agentic Paradigm", cols: [
      { tag: "YESTERDAY", name: "The LLM Paradigm", rows: [
        { label: "Mental model", body: "Prompt in, response out." },
        { label: "Value", body: "Better answers, faster drafts." },
        { label: "Buying", body: "Tokens, model access, IDE plugins." },
      ]},
      { tag: "TODAY", name: "The Agentic Paradigm", rows: [
        { label: "Mental model", body: "Goal in, outcome delivered." },
        { label: "Value", body: "Problems resolved end-to-end with oversight." },
        { label: "Buying", body: "Orchestration, agent identity, observability, governance." },
      ]},
    ], kicker: "Highlight Agentic — the market has already moved to agentic. Have you?", source: "Sources: Goldman Sachs AI Exchanges; Fortune." },

    { kind: "twoCol", n: "04", section: "Section 2 · Move 2 — Trust to Revenue", title: "Trust to Revenue.", goal: "Two definitions on one slide: agents are the architecture; autonomy is the maturity. The CAIO's job is moving agents up the spectrum.", visualLabel: "Visual — Side-by-Side Definition Cards", cols: [
      { tag: "ARCHITECTURE", name: "Agents", rows: [
        { label: "What they are", body: "Software systems with scope, identity, and tools — the unit you can govern, observe, and pay for." },
        { label: "Why they matter", body: "They are how AI is deployed into work, not just into chats." },
      ]},
      { tag: "MATURITY", name: "Autonomy", rows: [
        { label: "What it is", body: "The independence granted to those agents — a trust lever the CAIO controls." },
        { label: "Why it matters", body: "Autonomy = revenue. More autonomy, less spend, more value. Trust is the precondition." },
      ]},
    ], kicker: "Highlight that autonomy is about trust — and accountable to revenue.", source: "Sources: AWS Internal Research 2026; Goldman Sachs AI Exchanges." },

    { kind: "maturity", n: "05", section: "Section 3 · Move 3 — Locate them on the maturity map", title: "How autonomous are your agents today?", goal: "Walk the four-stage autonomy model. Both internal and external columns visible. Ask: where are your agents?", visualLabel: "Visual — Four-Stage Autonomy Map", stages: [
      { n: "01", name: "Tool", sub: "AI helps individuals work faster", internal: "Copilots, document drafting, rule-based ops.", external: "Basic recommendations, scripted bots.", gov: "Human validates every output." },
      { n: "02", name: "Teammate", sub: "AI augments team-level workflows", internal: "AIOps copilots, analysis drafts, ticket triage.", external: "Smart search, personalization, content drafting.", gov: "Human reviews and approves." },
      { n: "03", name: "Digital Employee", sub: "Agents act on the business with oversight", internal: "End-to-end support triage, financial reporting, supply-chain coordination.", external: "In-app agents that resolve, transact, personalize at the user level.", gov: "Monitor decisions, not individual actions." },
      { n: "04", name: "Workforce Layer", sub: "Systems run the business with guardrails", internal: "A permanent operational layer running named functions.", external: "Products are agent-native; customers interact with autonomous workflows.", gov: "Enterprise-scale fleet governance, role-based agent evaluation." },
    ], reframe: "93.6% of AI is in production — but stuck at Stage 1–2 autonomy. You're not behind on deployment. You're stuck on autonomy. Move further down the autonomous chain.", source: "Source: AWS Internal Research 2026, cross-referenced with McKinsey Agentic AI Foundations, April 2026." },

    { kind: "gapsGrid", n: "06", section: "Section 4 · Move 4 — Diagnose the gap", title: "Five autonomy blockers — which is loudest?", goal: "Surface the one that hurts most. This slide supports ranking, not equal weighting. Whichever the CAIO names is what the rest of the call orbits.", visualLabel: "Visual — 2×3 Gap Grid", gaps: [
      { n: "01", name: "Profitability", stat: "1 in 50 AI initiatives delivers transformational value. Agents must move from cost mode to revenue mode." },
      { n: "02", name: "Identity", stat: "45B non-human and agentic identities by end of 2025. Only 10% of organizations have a strategy for managing them." },
      { n: "03", name: "Pilot Trap & Sprawl", stat: "85% of organizations have agent pilots; only 5% have moved them to production. Hundreds of Stage 1–2 pilots, no platform." },
      { n: "04", name: "Data Foundation", stat: "75% cite data integration and quality as the top barrier to agentic AI. Stage 3–4 won't run on Stage 1 data." },
      { n: "05", name: "Trust", stat: "83% plan to deploy agentic AI; only 29% feel ready to do so securely. No granular telemetry to evaluate agents like a role." },
      { subtle: true, n: "→", name: "And cutting across all five: the skills gap.", stat: "The #1 reason Stage 2→3 stalls and the #1 partner opportunity. Tie content back to issues of trust, revenue, ROI." },
    ], ask: "Which of these is the most urgent for you right now?", source: "Sources: Stanford AI Index 2026; Cisco State of AI Security 2026; analyst aggregations Q4 2025–Q1 2026." },

    { kind: "gapDetail", n: "07", section: "Section 4 · Gap 1 — Profitability", title: "1 in 50 AI initiatives delivers transformational value.", goal: "Name the profit gap. Connect it to the revenue and cost conversations the CFO and CEO are already having.", visualLabel: "Visual — Three-Line Gap Frame", data: "88% are using AI. Only 6% see clear financial returns. 89% of enterprise AI agents never reach production, against per-implementation costs of $150K–$800K.", voice: { who: "Persona this hits hardest", body: "CFO and CEO are watching. CAIO carries it." }, answer: "Pilot move — pick one workflow with a measurable cost or revenue line. Move it to production in 30 days. Prove the unit economics before scaling. Insert appropriate slides based on Gap + LOB + Industry.", persona: "Peer conversation: Revenue / Growth — CFO · CEO · Chief Product Officer", pilot: "→ Appendix D · §6 Hervas (Pfizer)", pilotLabel: "Peer leader profile", source: "Sources: Stanford AI Index 2026; Fortune; Goldman Sachs CIO interviews." },

    { kind: "gapDetail", n: "08", section: "Section 4 · Gap 2 — Identity", title: "45 billion non-human identities. 10% of orgs ready.", goal: "Name the identity gap as net-new architecture — not legacy IAM with a new payload. This is the gap with the loudest M&A signal.", visualLabel: "Visual — Three-Line Gap Frame", data: "45B+ non-human and agentic identities active by end of 2025 — 12× the global human workforce. Only 10% of organizations have a developed strategy for managing them.", voice: { who: "Persona this hits hardest", body: "CISO co-owns it. CAIO can't ship without them." }, answer: "Industry signal — Microsoft launched Entra Agent ID. Palo Alto Networks paid $25B for CyberArk. Okta acquired Axiom. The market is repricing this overnight. Insert appropriate slides based on Gap + LOB + Industry.", persona: "Peer conversation: Risk / Compliance — CISO · Chief Risk Officer · CIO", pilot: "→ Appendix D · §2 Beer + Heitsenrether (JPMorgan)", pilotLabel: "Peer leader profile", source: "Sources: Bloomberg Tech Disruptors; CIO.com; vendor M&A 2025." },

    { kind: "gapDetail", n: "09", section: "Section 4 · Gap 3 — Pilot Trap & Sprawl", title: "Why 85% have pilots and 5% have production.", goal: "Name the structural trap. The anti-sprawl move is architectural, not procedural — you have to design the consolidation in.", visualLabel: "Visual — Three-Line Gap Frame", data: "85% of organizations have agent pilots; only 5% have moved them to production. 52% of department-level AI initiatives run without formal oversight. 78% say adoption is outpacing risk management.", voice: { who: "Persona this hits hardest", body: "CAIO and Head of Platform. The COO if pilots are clogging operations." }, answer: "Counterpoint to keep in pocket — Salesforce's own admission: ~8% of customers have activated Agentforce. Even the platform vendor sees the trap. Insert appropriate slides based on Gap + LOB + Industry.", persona: "Peer conversation: Cost / Efficiency — COO · CIO · LOB Operations Leads", pilot: "→ Appendix D · §5 Kumar (Walmart)", pilotLabel: "Peer leader profile", source: "Sources: AI Business; CIO Dive; Salesforce investor materials." },

    { kind: "gapDetail", n: "10", section: "Section 4 · Gap 4 — Data Foundation", title: "Stage 3 won't run on Stage 1 data.", goal: "Name the hidden gate. Most CAIOs underestimate this gap by 6–12 months. Data work is the majority of the time-to-Stage-3 cost.", visualLabel: "Visual — Three-Line Gap Frame", data: "75% of organizations cite data integration and quality as the top barrier to agentic AI. 96% of leaders say a unified platform to build and govern apps and agents is important; only 7% have adopted one.", voice: { who: "Persona this hits hardest", body: "CDAO or CDO. Without them in the room, this gap doesn't close." }, answer: "Why this is the hidden gate — most CAIOs underestimate this gap by 6–12 months. Data work is 60–70% of the time-to-Stage-3 cost. Insert appropriate slides based on Gap + LOB + Industry.", persona: "Peer conversation: Cost / Efficiency + Risk / Compliance — CIO · CDO · CHRO", pilot: "→ Appendix D · §7 Franklin (Moderna)", pilotLabel: "Peer leader profile", source: "Sources: McKinsey \"Building the Foundations for Agentic AI at Scale,\" April 2026; CIO.com." },

    { kind: "gapDetail", n: "11", section: "Section 4 · Gap 5 — Trust", title: "Why you can't promote an agent you can't observe.", goal: "Name the trust gap. Telemetry-first deployment is the precondition — agents are evaluable like a role, not like a feature.", visualLabel: "Visual — Three-Line Gap Frame", data: "Cisco 2026 State of AI Security: 83% plan to deploy agentic AI; only 29% feel ready to do so securely. Okta: 23% of IT pros say their agents have been tricked into revealing credentials.", voice: { who: "Persona this hits hardest", body: "CISO and Chief Risk Officer. CMO if external-product AI is on brand-safety risk." }, answer: "Counter-voice — Hari Gopalkrishnan, Bank of America CTIO: emphasizes pace over speed. Useful when the CAIO says \"we can't move that fast.\" Trust is the reason to move methodically — not the reason to slow down. Insert appropriate slides based on Gap + LOB + Industry.", persona: "Peer conversation: Risk / Compliance — CISO · Chief Risk Officer · Chief Compliance Officer", pilot: "→ Appendix D · §1 Argenti (Goldman Sachs)", pilotLabel: "Peer leader profile", source: "Sources: Cisco State of AI Security 2026; Okta Identity Threat Survey; CIO.com; Banking Dive." },

    { kind: "gapDetail", n: "12", section: "Section 4 · Gap 6 (cross-cut) — Skills", title: "The skills gap — why Stage 2→3 stalls.", goal: "Name the cross-cutting gap. This is why CAIOs need a partner ecosystem, not just a platform.", visualLabel: "Visual — Three-Line Gap Frame", data: "Where the gap shows up most acutely: agent evaluation engineers, MLOps for agents, prompt-and-tool architects, governance leads. This is the #1 reason Stage 2→3 stalls and the #1 partner opportunity.", voice: { who: "Persona this hits hardest", body: "Cross-cutting. The CAIO sees it first; CHRO + L&D close it." }, answer: "The pivot line at the bottom — the skills gap is why CAIOs need a partner ecosystem, not just a platform. Sets up Move 6 (the value chain) and Move 7 (the close).", persona: "Peer conversation: Cost / Efficiency + Product / Customer — CHRO · CIO · Heads of Centers of Excellence", pilot: "→ Appendix D · §7 Franklin (Moderna) for the people-flow lens", pilotLabel: "Peer leader profile", source: "Source: UNLEASH (\"Why Moderna merged HR and IT to better architect the flow of work\")." },

    { kind: "gapsGrid", n: "13", section: "Section 5 · Move 5/6 — The complete stack", title: "The complete stack for Stage 3–4 agentic AI.", goal: "Land the three-role value chain — foundation models, SI delivery, data/security/governance. Not one partner per gap. An ecosystem.", visualLabel: "Visual — Three Pillars", gaps: [
      { n: "01", name: "Foundation models", stat: "Anthropic on Amazon Bedrock. Claude as the default agentic model. Multi-model where the customer demands it." },
      { n: "02", name: "SI delivery", stat: "Caylent · Slalom · Deloitte · Loka. Sized to the customer's deployment complexity. Joint delivery with named team." },
      { n: "03", name: "Data, security, governance", stat: "Databricks · CrowdStrike · Okta · Palo Alto. The foundation layer that makes Stage 3 trust-worthy." },
    ], kicker: "Headline: AWS shows up with an ecosystem, not alone, and not betting on one partner per gap.", source: "Source: AWS Customer Research 2026." },

    { kind: "sequence", n: "14", section: "Section 5 · Move 5 — The buying sequence", title: "Foundation, scaling, growth — in order.", goal: "Plant the non-negotiable sequencing. Foundation first. Then scaling. Then growth. Not optional, not in parallel.", visualLabel: "Visual — Three Stacked Phases", phases: [
      { n: "Phase 0 · Foundation", name: "Earn the right to scale", items: ["Data architecture that holds — unified data layer, governance standards, agent identity", "Zero data retention, PII auto-detection, observability stack", "Required before anything else can scale"], closes: "Data Foundation · Identity · Trust", mandate: "Free Phase 0 — yours to keep with or without AWS" },
      { n: "Phase 1 · Scaling", name: "Agent platforms, digital labor engines", items: ["One named use case in production · 6–12 weeks", "AWS + named partner · governance from day one", "You demo a working agent to your board"], closes: "Scale Path · Pilot Trap", mandate: "Single CXO mandate · partner co-build" },
      { n: "Phase 2 · Growth", name: "Product AI revenue", items: ["Multiple use cases on a shared platform", "CAIO becomes the orchestrator the deck describes", "CXO peers pulling for AI · revenue line owned"], closes: "Profitability · All five gaps", mandate: "Full C-suite activation" },
    ], kicker: "Foundation runs as a parallel track across all three phases — required for Stage 3 agentic AI.", source: "Sources: Stanford AI Index 2026; AWS Customer Research 2026." },

    { kind: "gapsGrid", n: "15", section: "Section 6 · Move 6 — Partner play per gap", title: "A partner play for every gap.", goal: "Show that each of the 5 Gaps has multiple named partners — not just one. The strategic value chain is the message; the gap-by-partner ecosystem is the proof.", visualLabel: "Visual — Gap / Partner-Play / Named Partners", gaps: [
      { n: "Profitability", name: "Revenue agent partners", stat: "Anthropic (Claude as revenue agent) · Caylent (revenue-flow design) · Slalom (CFO-ready business case)." },
      { n: "Identity", name: "Non-human identity partners", stat: "Okta (Agent Identity) · CrowdStrike (Agent EDR) · Palo Alto Networks (governance)." },
      { n: "Pilot Trap", name: "Platform consolidation partners", stat: "AWS Bedrock + AgentCore · Deloitte (platform architecture) · Caylent (super-agent design)." },
      { n: "Data Foundation", name: "Data foundation partners", stat: "Databricks · Snowflake · Loka (data readiness) · AWS Lake Formation." },
      { n: "Trust", name: "Guardrails + observability partners", stat: "Bedrock Guardrails · Anthropic constitutional AI · Cisco (security telemetry) · zero data retention." },
    ], kicker: "AWS shows up with an ecosystem, not alone, and not betting on one partner per gap.", source: "Source: AWS Partner Network 2026; partner co-sell motions Q1 2026." },

    { kind: "proof", n: "16", section: "Section 6 · Move 7 — Proof point", title: "GoDaddy on Bedrock — the journey, walked.", goal: "Show the canonical Foundation → Scaling → Growth sequence executed cleanly. Pilot Trap closed. Trust Gap closed. Profitability proving.", visualLabel: "Visual — Three-Phase Journey", steps: [
      { n: "Foundation", name: "Trust + Identity closed", body: "Zero data retention. PII auto-detection via Comprehend. Single API proxy controls all dev-to-model interactions.", result: "GoCode platform on Amazon Bedrock.", closes: "Trust ✓ · Data Foundation ✓" },
      { n: "Stage 1→2", name: "Pilot Trap closed", body: "2,000 developers on GoCode. AI-assisted coding. 100+ models behind one API. Governance from day one.", result: "50% decrease in sprint duration.", closes: "Pilot Trap ✓ · Scale Path ✓" },
      { n: "Stage 2→3", name: "Profitability proving", body: "Launched Airo.ai — agentic product turning customer conversations into completed tasks.", result: "Revenue-generating agentic product in market.", closes: "Profitability proving" },
    ], kicker: "Foundation first. Then scale. Then growth. This is what Stage 1→2→3 actually looks like — and it is industry-swappable to the room you're in.", source: "Source: GoDaddy / Anthropic on Amazon Bedrock case study. Market benchmark: 5.8× ROI within 14 months at Stage 3–4 (McKinsey Global AI Survey 2025)." },

    { kind: "options", n: "17", section: "Section 6 · Move 7 — Two starts, both 30 days", title: "Two starts, both 30 days.", goal: "Three time-boxed options. The CAIO picks one. Then the seller asks the second question — who else is in the next room?", visualLabel: "Visual — Two Option Cards (Option C as appendix)", options: [
      { name: "Option A", title: "Data Foundation Assessment", scope: "Free. For when data is the named blocker. Output: data readiness scorecard + 90-day modernization plan.", duration: "2–4 weeks. Yours to keep with or without AWS.", evidence: "Readiness scorecard. Scoped Phase 1 POC plan. Named gap owners." },
      { name: "Option B", title: "30-Day Agent Pilot", scope: "One workflow, one metric, AWS + Anthropic + named SI co-build. Output: agent in production + ROI case + path to scale.", duration: "30 days, executive sponsor signed.", evidence: "Working agent. ROI sheet. Demo to board. Path-to-scale plan." },
      { name: "Option C (appendix)", title: "Cross-functional Working Session", scope: "Two-hour readiness session with AWS + partner SMEs. Output: prioritized roadmap + named partner team + executive sponsor map.", duration: "Two hours. Pulled forward live when the room calls for it.", evidence: "Prioritized roadmap. Named partner team. CXO peer at second meeting." },
    ], kicker: "Either way, you walk into your next executive board meeting with AWS already at the table.", ask: "Which path — and who from the C-suite is coming to the next meeting?" },

    { kind: "gapsGrid", n: "18", section: "Section 6 · Recap — Eight exit beliefs", title: "What the CAIO should walk away believing.", goal: "Eight beliefs. If the CAIO doesn't hold all eight leaving the room, something in the delivery broke.", visualLabel: "Visual — Eight Numbered Takeaways", gaps: [
      { n: "01", name: "Dual mandate, not CTO extension", stat: "AWS understands the CAIO seat as a dual mandate — internal digital labor + external product AI — not a CTO extension." },
      { n: "02", name: "Autonomy, not deployment", stat: "The real bottleneck is autonomy, not deployment. 93.6% of AI is at Stage 1–2." },
      { n: "03", name: "5 Gaps are the diagnostic", stat: "The 5 Gaps are the right diagnostic for the CAIO's own program." },
      { n: "04", name: "Sequenced answer", stat: "AWS has a sequenced answer — foundation, scaling, growth — and a partner ecosystem that closes each gap." },
      { n: "05", name: "Credible business case", stat: "There is a credible business case and a documented case study (GoDaddy) showing the path from Stage 1 to 3." },
      { n: "06", name: "Ecosystem, not alone", stat: "AWS shows up with partners — model providers, SIs, governance partners — not alone." },
      { n: "07", name: "Foundation-builder for the C-suite", stat: "The CAIO is a foundation-builder for their C-suite peers, not just an AI buyer." },
      { n: "08", name: "Concrete next step in 7 days", stat: "There is a concrete next step on the calendar within seven days, with the right people in the room." },
    ], kicker: "These are the exit criteria. The test for whether the deck did its job." },

    /* ────────────── APPENDICES ────────────── */

    { kind: "intro", n: "A0", section: "Appendices · Pulled forward live", title: "Workbooks, peer profiles, and industry use cases.", tagline: "These cards run after the meeting, not during it.", lead: "Used to take a customer signal from the main deck and turn it into a sized opportunity.", sequence: [
      { label: "A · Discovery Diagnostic Workbook", n: "3 cards", body: "Autonomy assessment, digital-labor inventory, growth value drivers." },
      { label: "B · AI Business Case Framework", n: "1 card", body: "Three value drivers (autonomy, digital labor, growth) with formulas. CFO-ready." },
      { label: "C · Cost & Time-to-Value Workbook", n: "1 card", body: "Cost stack and time-to-value ramp." },
      { label: "D · Peer Leader Profiles", n: "5 cards", body: "Argenti / Goldman · Beer + Heitsenrether / JPMorgan · Kumar / Walmart · Hervas / Pfizer · Franklin / Moderna." },
      { label: "E · Industry Use Cases", n: "10 cards", body: "Named accounts and reference customers per industry — FSI, retail, healthcare, manufacturing, etc." },
    ]},

    { kind: "gapDetail", n: "D1", section: "Appendix D · Peer Leader Profile 1 — Trust", title: "Marco Argenti, CIO · Goldman Sachs.", goal: "The most quotable CIO on agentic AI. His framing maps almost one-for-one onto the autonomy-spectrum thesis the deck is built around.", visualLabel: "Visual — Peer profile card · objection → solution → metrics", data: "Firmwide change management at scale. Measured rollout cadence — Argenti's framing dictates pacing, not hype. The mental-model slide isn't abstract; it's how Goldman's own CIO talks publicly.", voice: { who: "Marco Argenti, CIO · Goldman Sachs", body: "We used to look at models as a chat that would provide questions and answers. Now a year later, we look at models as essentially entities or agents that can act on the business." }, answer: "AWS Bedrock + AgentCore + observability stack. Telemetry-first deployment — agents are evaluable like a role, not like a feature. Change-management runway built in: the entire organization re-tunes for AI before agents touch revenue paths.", persona: "Peer conversation: Risk / Compliance — CISO · Chief Risk Officer · Chief Compliance Officer", pilot: "Trust ✓ · Identity proving", pilotLabel: "Gap closed", source: "Sources: Fortune (\"Why Goldman Sachs' CIO is taking a measured approach\"); Goldman Sachs AI exchanges (Tier 1A). Cross-ref: CAO_CAIO_CIO_Real_World_Examples.docx §1 (Argenti)." },

    { kind: "gapDetail", n: "D2", section: "Appendix D · Peer Leader Profile 2 — Identity + Data Foundation", title: "Lori Beer (CIO) + Teresa Heitsenrether (CDAO) · JPMorgan Chase.", goal: "The cleanest real-world example of the CAIO dual mandate operating as a two-person team — CIO owns platform, CDAO owns the foundation.", visualLabel: "Visual — Peer profile card · objection → solution → metrics", data: "$18B technology budget. CDAO seated on the Operating Committee. Agent-to-agent governance treated as net-new architecture, not legacy IAM with a new payload.", voice: { who: "Lori Beer + Teresa Heitsenrether · JPMorgan Chase", body: "Agent-to-agent interactions are very different than traditional system-to-system interactions. You don't bolt non-human identity onto SAML — it has to be designed from the foundation up." }, answer: "AWS Identity for Agents + Bedrock Guardrails + zero-data-retention controls. CDAO owns the data foundation and governance standards before agent rollout begins. CIO operates the platform. The CAIO-equivalent leads agentic policy. Foundation-first sequencing is org-charted, not just road-mapped.", persona: "Peer conversation: Risk / Compliance — CISO · Chief Risk Officer · CIO", pilot: "Identity ✓ · Data Foundation ✓", pilotLabel: "Gap closed", source: "Sources: JPMorganChase 10th Annual Innovation Week; Bloomberg — JPMorgan CIO on the Global Bank's AI Approach (Tier 1A). Cross-ref: CAO_CAIO_CIO_Real_World_Examples.docx §2 (Beer + Heitsenrether)." },

    { kind: "gapDetail", n: "D3", section: "Appendix D · Peer Leader Profile 3 — Pilot Trap", title: "Suresh Kumar, Global CTO/CDO · Walmart.", goal: "The canonical example of a CIO/CTO refusing to let hundreds of point pilots accumulate. The four-agent architecture is the defensible answer to sprawl.", visualLabel: "Visual — Peer profile card · objection → solution → metrics", data: "Four super-agents — Sparky (customers), Marty (sellers + advertisers), a developer agent, an associate agent. One unified company-wide framework, not point tools. Agent population projected to scale into the hundreds of thousands.", voice: { who: "Suresh Kumar · Walmart", body: "Go beyond individual tools and build a unified, company-wide framework. The anti-sprawl move is structural, not procedural — you have to architect the consolidation in." }, answer: "AWS platform layer with consolidated agent orchestration. Each super-agent has its own scope, identity, and tools — but they share governance, observability, and the data foundation. The CAIO sets the consolidation policy; the CTO/CDO operates it; LOB leaders co-design the four agent surfaces.", persona: "Peer conversation: Cost / Efficiency — COO · CIO · LOB Operations Leads", pilot: "Pilot Trap ✓ · Scale Path proving", pilotLabel: "Gap closed", source: "Sources: AI Business — Walmart Consolidates AI Strategy With 'Super Agents'; CIO Dive — Walmart expands AI leadership (Tier 1A). Cross-ref: CAO_CAIO_CIO_Real_World_Examples.docx §5 (Kumar)." },

    { kind: "gapDetail", n: "D4", section: "Appendix D · Peer Leader Profile 4 — Profitability", title: "Berta Rodriguez Hervas, CAIO · Pfizer.", goal: "Direct illustration of the value-framework slide. Pfizer is doing the digital-labor math the deck wants the CAIO to do.", visualLabel: "Visual — Peer profile card · objection → solution → metrics", data: "Three-phase agentic workflow program. Drug R&D timelines compressing. Chief AI & Analytics Officer installed at the operating-committee level — the seat exists, the digital-labor math is owned.", voice: { who: "Berta Rodriguez Hervas · Pfizer", body: "Legally straightforward automation first. Then progressive integration. Then complex agentic flows. Every phase has human-in-the-loop oversight and a 21 CFR Part 11 answer." }, answer: "Amazon Bedrock + AWS clinical data services. Three-phase rollout matches regulatory risk to deployment depth. The CAIO sets agentic policy; the CIO operates the platform; SI partner co-builds. Digital-labor math runs on a per-workflow ROI sheet that the CFO co-owns.", persona: "Peer conversation: Revenue / Growth — CFO · Chief Product Officer · Chief Medical Officer", pilot: "Profitability ✓ · Trust proving", pilotLabel: "Gap closed", source: "Sources: Pfizer 2025 AI Festival; CDO Magazine — Speed, Scale, and Science (Tier 1A). Cross-ref: CAO_CAIO_CIO_Real_World_Examples.docx §6 (Hervas)." },

    { kind: "gapDetail", n: "D5", section: "Appendix D · Peer Leader Profile 5 — Data Foundation + Skills", title: "Tracey Franklin, CPDTO · Moderna.", goal: "The CAIO who refuses Silicon Valley hype. Moderna is the proof point that enterprise rigor is not a competitive liability — it's the buffer against Stage 1 pilot failure when you scale.", visualLabel: "Visual — Peer profile card · objection → solution → metrics", data: "HR + IT merged under one CPDTO. Structured org redesign preceded agent deployment. Data, governance, and change-management foundations explicitly named as prerequisites — not a phase that comes after.", voice: { who: "Tracey Franklin · Moderna", body: "Strong data, governance, and change management foundations have to be in place. Enterprise rigor is not a competitive liability — it's the buffer against Stage 1 pilot failure when you scale." }, answer: "AWS Lake Formation + AWS governance services + workforce identity. People, process, and data move in lockstep. The CAIO-equivalent sits at the intersection of HR and IT — agentic AI treated as a labor-flow problem, not a tech problem.", persona: "Peer conversation: Cost / Efficiency + Risk / Compliance — CIO · CDO · CHRO", pilot: "Data Foundation ✓ · Skills proving", pilotLabel: "Gap closed", source: "Source: UNLEASH — Why Moderna merged HR and IT to better 'architect the flow of work' (Tier 1A). Cross-ref: CAO_CAIO_CIO_Real_World_Examples.docx §7 (Franklin)." },

    { kind: "intro", n: "E0", section: "Appendix E · Industry use cases", title: "Industry use cases — 10 cards.", tagline: "Used to swap in industry-matched proof at Move 7.", lead: "Named accounts and reference customers per industry. The seller pulls the relevant card forward live when the customer's room calls for it.", sequence: [
      { label: "FSI", n: "Goldman Sachs · JPMorgan Chase", body: "Argenti's measured-pacing framing; Beer + Heitsenrether's two-person dual mandate." },
      { label: "Healthcare / Pharma", n: "Pfizer · Moderna", body: "Hervas's phased digital-labor ROI; Franklin's labor-flow re-org." },
      { label: "Retail", n: "Walmart · Tapestry", body: "Kumar's four-super-agent anti-sprawl architecture. Tapestry as agentic commerce reference." },
      { label: "Travel / Hospitality", n: "United Airlines · Trainline", body: "Disruption-response agentic workflows. Customer-facing agent with safety-of-flight governance." },
      { label: "Tech / Platform", n: "GoDaddy · Pinterest", body: "Foundation → Scale → Growth executed cleanly. Brand-safe agentic commerce." },
      { label: "Industrials / Auto", n: "Volkswagen · Boeing", body: "Agentic supply chain. OT/IT identity convergence." },
      { label: "Telecom", n: "Verizon · BT", body: "Contact-center agentic workflows. Network-ops agents." },
      { label: "Insurance", n: "Allstate · Progressive", body: "Claims-triage agents. Regulator-facing telemetry." },
      { label: "Public Sector", n: "DoD · VA · USDA", body: "FedRAMP-grade agentic governance. Mission-domain agents." },
      { label: "Media / Adtech", n: "Pinterest · WPP", body: "AdContext Protocol. Brand-safety governance at agent scale." },
    ]},

  ],
};

// ── CIO Narrative ────────────────────────────────────────────────────────
// Generated 2026-05-21 by cxo-elevate-pipeline-poller from CIO Elevate source files.
// Source files: 2026 CIO Elevate Strategy Doc.docx, CIO_Elevate_Narrative_Arc (1).docx,
// meeting notes.md, meeting notes 2.md, meeting notes 3.md
const CIO_NARRATIVE = {
  eyebrow: 'CIO Elevate · Working Paper · v1',
  title: 'The CIO Imperative: Modernize the Foundation. Lead What Comes Next.',
  subtitle: 'Break the hardware refresh cycle. Build the infrastructure that wins the next decade.',
  attribution: 'Generated from CIO Elevate source files · April 2026 working session · AWS RRCG Industry & Solutions',

  purpose: {
    label: 'Purpose',
    body: [
      'This is the narrative working paper for the CIO Elevate First Call Deck. It specifies the arc a seller walks through in a single 45–60 minute conversation with a Chief Information Officer on a first call.',
      'The deck does four things at once: demonstrates that AWS understands the CIO seat, installs the vocabulary the rest of the conversation depends on, diagnoses where the customer actually is rather than assuming, and shows that AWS with a named partner ecosystem can meet modernization needs across the full spectrum.',
      'The hardware refresh thread runs through the entire arc as the central tension: every dollar poured into replacing aging on-premises servers is a dollar not invested in AI, talent, or competitive differentiation. Migration to AWS is the decisive action that breaks this cycle permanently.',
    ],
  },

  principles: {
    label: 'Design principles',
    items: [
      {
        name: 'Diagnostic, not pitch.',
        body: 'The CIO could be anywhere on the modernization spectrum when the seller walks in. The deck diagnoses live and adjusts pacing in real time. The fulcrum is the maturity map slide — the seller reads the room there and chooses how the rest of the call unfolds.',
      },
      {
        name: 'The hardware economics anchor everything.',
        body: 'The refresh cycle is not a technology argument. It is a capital allocation argument. Per the April 2026 working session: replacement is now cheaper than refresh/renew AND enables agentic workloads. That single equation is the deal thesis.',
      },
      {
        name: 'The CIO is the hero, not the target.',
        body: 'This is not a pitch at a technology manager. It is a conversation with the leader making capital allocation decisions that will define competitive position for the next decade.',
      },
      {
        name: 'The burning platform is real, not manufactured.',
        body: 'Three converging forces create genuine urgency: hardware costs rising due to AI chip demand, Broadcom/VMware licensing 4–7x prior pricing, Oracle and SQL Server contract pressure. The deck names them directly and positions migration as the only response that solves both the cost problem and the AI mandate simultaneously.',
      },
      {
        name: 'Peer-agnostic by design.',
        body: 'The CIO is the foundation-builder for whichever C-suite peers matter most. Peer conversations are named by outcome — CapEx reallocation, AI enablement, risk reduction, business agility — with named C-suite peers as illustrative tags the seller customizes per customer.',
      },
    ],
  },

  arc: {
    label: 'CIO FCD Narrative',
    intro: 'The seller walks the CIO through seven moves over 45–60 minutes. Each move earns the right to the next. Pacing adjusts at Move 2 based on where the CIO is on the refresh calendar.',
    moves: [
      {
        n: 1,
        title: 'Open on the hardware trap and the AI mandate',
        time: '≈5 min',
        blocks: [
          { label: 'What the seller does', body: 'Names the CIO\u2019s reality directly. The opening acknowledges the specific budget conversation every enterprise CIO is already having: a hardware refresh event is coming, it will cost $500K\u2013$50M depending on data center footprint, and at the same time the board is asking when AI will show up in the business. These two demands are structurally in conflict on a fixed IT budget.' },
          { label: 'Three converging forces', body: 'Hardware costs are rising (AI chip demand). Broadcom/VMware licensing increased 4\u20137x prior pricing. Agentic workloads cannot run on legacy on-premises infrastructure — on-prem latency is too high, legacy architecture cannot support real-time agentic data flows regardless of refresh spend.' },
          { label: 'The CIO paradox', body: 'Wesley\u2019s framing from the April 2026 strategy session: CIOs are conservative with spending but are being forced to spend on hardware refreshes even as the case for that spend collapses. Refresh/renew only buys time. It does not advance business objectives.' },
          { label: 'What the customer should feel', body: '\u201cThey understand what is actually happening in my budget right now. And they are not pretending the AI ask is separate from the cost problem.\u201d', italic: true },
        ],
      },
      {
        n: 2,
        title: 'Install the vocabulary: replacement, not refresh',
        time: '≈5 min',
        blocks: [
          { label: 'What the seller does', body: 'Walks the CIO from the \u201crefresh\u201d mental model to the \u201creplacement\u201d mental model. Two-column comparison: Left — what hardware refresh actually delivers (same architecture, same constraints, deferred decision, capital committed with no new capability). Right — what migration delivers (CapEx to OpEx, architecture fit for agentic workloads, AI readiness baked in, vendor lock-in eliminated).' },
          { label: 'The replacement argument', body: 'From the April 2026 strategy session: \u201cReplacement — migration plus modernization — is now cheaper than refresh/renew AND enables agentic workloads.\u201d That equation is the deck\u2019s commercial thesis.' },
          { label: 'Three terms to install', body: '\u201cFit for purpose\u201d — the target state infrastructure. \u201cCompelling event\u201d — the specific refresh or renewal that creates the migration window. \u201cCapital reallocation\u201d — not cost-cutting; every refresh avoided is capital that funds AI and competitive differentiation.' },
          { label: 'Branch point', body: 'If the CIO is already in migration mode with a compelling event in mind: fast path — compress maturity model, spend time on roadmap and ecosystem. If the CIO is in \u201cplanning next refresh\u201d mode: slow path — anchor on the Hardware Refresh Avoidance Analysis as the concrete output.', commentRef: 2 },
          { label: 'What the customer should feel', body: '\u201cI have a new frame for a decision I thought was already made. And it changes the numbers.\u201d', italic: true },
        ],
      },
      {
        n: 3,
        title: 'Locate them on the modernization map',
        time: '≈5\u201310 min',
        blocks: [
          { label: 'What the seller does', body: 'Walks the four-phase transformation model — Migrate & Stabilize, Secure & Govern, Modernize & Enable, Innovate & Lead. Both infrastructure and business-outcome columns visible on one slide. Asks: where are you right now?' },
          { label: 'Phase 1 — Migrate & Stabilize', body: 'The financial case. Migration timed to the refresh calendar. CapEx redirected from hardware to cloud. Target: eliminate at least one refresh event from the planning calendar in 90 days.' },
          { label: 'Phase 2 — Secure & Govern', body: 'Zero-trust, automated compliance, identity governance. AWS patches and hardens infrastructure continuously — the CIO inherits enterprise-grade security automatically.' },
          { label: 'Phase 3 — Modernize & Enable', body: 'Application modernization, database migration to managed services, data platform transformation. 52% of organizations rate their GenAI data foundation as inadequate (AWS/HBR 2025 CDO Report) — Phase 3 is where that changes.' },
          { label: 'Phase 4 — Innovate & Lead', body: 'Agentic AI at scale. Real-time personalization, intelligent automation, and GenAI capabilities structurally impossible on on-premises hardware. The CIO who migrates in 2025 presents AI-driven business outcomes to the board in 2026.' },
          { label: 'Reframe', body: '85% of companies still operate on legacy infrastructure. Only 10\u201315% of enterprise applications are currently in the cloud (Evanta 2025). You are not behind on ambition — you are behind on infrastructure.', highlight: true },
        ],
      },
      {
        n: 4,
        title: 'Name the CIO seat: capital allocator, foundation-builder, transformation leader',
        time: '≈5 min',
        blocks: [
          { label: 'What the seller does', body: 'Repositions the CIO from technology manager to strategic protagonist. This is not an IT decision. It is a capital allocation decision, a competitive strategy decision, and a vendor risk decision.' },
          { label: 'The reframe', body: 'Wesley\u2019s framing: \u201cThe CIO\u2019s role as capital allocator — this is the conversation AWS should be having.\u201d What business capabilities does this budget enable or foreclose?' },
          { label: 'Peer conversations — named by outcome', body: 'CapEx reallocation (CFO, Chief Procurement Officer — TCO over 3 and 5 years). AI enablement (CEO, CDO, Chief AI Officer — what becomes possible cloud-native). Risk and compliance (CISO, Chief Risk Officer — security posture, audit readiness). Business agility (COO, CMO — what the business can do when infrastructure no longer constrains it). Named C-suite peers are illustrative; seller customizes per customer.' },
          { label: 'What the customer should feel', body: '\u201cI am not managing IT. I am making the decisions that determine whether this company can compete in the next decade.\u201d', italic: true },
        ],
      },
      {
        n: 5,
        title: 'Surface the five blockers',
        time: '≈10 min',
        blocks: [
          { label: 'What the seller does', body: 'Presents five infrastructure blockers as the real constraints on modernization and AI readiness. Designed for ranking — the seller asks the CIO to name the one that hurts most. Whichever they name is what the rest of the call orbits.' },
          { label: 'Blocker 1 — The Hardware Refresh Trap', body: 'Only 10\u201315% of enterprise apps in the cloud. 60\u201370% of IT budgets consumed by maintaining existing infrastructure. Every refresh event is a compounding constraint. Signal: $103.5B cloud migration addressable market by 2030.' },
          { label: 'Blocker 2 — The Licensing Ambush', body: 'VMware/Broadcom 4\u20137x prior pricing. Oracle Exadata, SQL Server, major ISV contract compression. The CIO who waits for the renewal date cedes negotiating leverage entirely. AWS Fast Start: Oracle Exadata Migration through unified GTM with Oracle Alliance team.' },
          { label: 'Blocker 3 — The AI Readiness Ceiling', body: '73% of AI initiatives stall because of data silos and aging architecture. 52% of organizations rate their GenAI data foundation as inadequate. Agentic workloads require cloud-native architecture — on-premises latency is too high. GenAI is already shortening CPG product development cycles from 18 months to 6 months for CIOs who have made the investment.' },
          { label: 'Blocker 4 — The Security and Governance Debt', body: 'Cybersecurity: #1 CIO priority for four consecutive years (Evanta 2025). Ransomware threatens 70% of retail/hospitality CISOs (RH-ISAC 2025). Legacy hardware security patches thin out in years 4\u20135 of a cycle, precisely when cost pressure peaks.' },
          { label: 'Blocker 5 — The Application Sprawl and Technical Debt', body: 'Hundreds of unmapped applications. Legacy core systems (mainframe, ERP, CRM) that teams are most reluctant to touch. Agentic AI requires connected, clean data foundations — legacy systems hold that data in silos. AWS Transform uses AI to assess and migrate infrastructure.' },
          { label: 'What the customer should do', body: 'Pick one. Seller prompt: \u201cWhich of these is creating the most pressure right now?\u201d The named blocker becomes the organizing logic for Move 6.' },
        ],
      },
      {
        n: 6,
        title: 'Prove it: peer CIOs who broke the cycle',
        time: '≈10 min',
        blocks: [
          { label: 'What the seller does', body: 'Whatever blocker the CIO named in Move 5, this move shows a peer CIO who solved it — with the specific decision made, the vendor/platform used, and the outcome. Real people at real companies.' },
          { label: 'Blocker 1 & 3 — Marco Argenti, CIO, Goldman Sachs', body: '\u201cWe used to look at models as a chat that would provide questions and answers. Now a year later, we look at models as essentially entities or agents that can perform tasks on your behalf.\u201d Goldman embedded Anthropic engineers directly into technology teams to co-build autonomous agents for financial processes. Argenti\u2019s measured approach: choosing not to declare ROI prematurely. Cross-ref: CAO_CAIO_CIO_Real_World_Examples.docx §1.' },
          { label: 'Blocker 2 & 5 — Lori Beer, Global CIO, JPMorgan Chase', body: '\u201cAgent-to-agent interactions are very different than traditional system-to-system interactions.\u201d $18B technology budget. JPMC was one of only three firms to publicly disclose architecture details for agentic workflows. Foundation-first sequence is org-charted — Teresa Heitsenrether (CDAO, Operating Committee) owns data strategy and governance before agent rollout. Cross-ref: CAO_CAIO_CIO_Real_World_Examples.docx §2.' },
          { label: 'Blocker 4 — Suresh Kumar, Global CTO/CDO, Walmart', body: 'Chose to \u201cgo beyond individual tools and build a unified, company-wide framework.\u201d Four super-agents: Sparky (customer-facing), Marty (sellers/advertisers), developer agent, associate agent. One platform, four audiences — the deliberate anti-sprawl answer at Fortune 1 scale. Cross-ref: CAO_CAIO_CIO_Real_World_Examples.docx §5.' },
          { label: 'Canonical buying sequence — GoDaddy on Bedrock', body: 'Foundation: zero data retention, PII detection, single API proxy. Scaling: 2,000 developers on GoCode, 50% sprint reduction. Growth: Airo.ai launched as revenue-generating agentic product. 100+ models behind one API. Phase 1 \u2192 Phase 4 executed cleanly.' },
          { label: 'What the customer should feel', body: '\u201cMy peers have this problem. And they have solved it. And I can see the exact decisions they made.\u201d', italic: true },
        ],
      },
      {
        n: 7,
        title: 'Show the path and close with two questions',
        time: '≈5\u201310 min',
        blocks: [
          { label: 'What the seller does', body: 'Shows the AWS partner ecosystem and the four-phase roadmap as one coherent path — not a menu of options. Closes with two questions that force a concrete next step and expand the conversation beyond the CIO.' },
          { label: 'AWS CIO Elevate ecosystem', body: 'Migration and Modernization: Accenture, Deloitte, Infosys, TCS, Publicis Sapient. Funding: T2K Win Room, MAP Lite/MAP Large, Partner SCA Funding. AWS Transform as the first concrete deliverable. Note (April 2026 session): CTA is a meeting/conversation first, not an immediate assessment.' },
          { label: 'Option A — Hardware Refresh Avoidance Analysis', body: 'Free. For when the upcoming refresh event is the named constraint. CFO-ready TCO model: CapEx projected in next 24 months, timeline alignment, net avoided cost, TCO comparison over 3 and 5 years. Output the CIO brings to their next board conversation.' },
          { label: 'Option B — 90-Day Migration Sprint', body: 'One specific, bounded workload tied to an imminent refresh event. Goal: measurable TCO reduction, eliminate at least one refresh event from the planning calendar, establish the architectural foundation for AI phases.' },
          { label: 'Option C — EBC Working Session', body: 'Two-hour Executive Briefing Center session with AWS and partner SMEs. For CIOs who need to build internal buy-in first. Output: prioritized roadmap, named partner team, executive sponsor map.' },
          { label: 'The two questions', body: '1. Which next step? — A, B, or C. 2. Who else is in the next room? — the C-suite peer or LoB leader who owns the named blocker from Move 5. If the CIO brings the right peer, the deal expands.' },
          { label: 'What the customer should feel', body: '\u201cThere is a concrete next step on the calendar within seven days, with the right people in the room.\u201d', italic: true },
        ],
      },
    ],

    beliefs: {
      label: 'What the CIO should walk away believing',
      items: [
        { n: '01', name: 'Capital allocation role', stat: 'AWS understands the CIO seat as a capital allocation role, not a technology management role.' },
        { n: '02', name: 'Hardware refresh is the constraint', stat: 'The hardware refresh cycle is the strategic constraint. Breaking the cycle is the decisive move.' },
        { n: '03', name: 'Replacement is cheaper AND better', stat: 'Three forces have converged: hardware cost inflation, licensing ambiguity, agentic workload requirements. Replacement is now cheaper than refresh/renew AND the only path to AI.' },
        { n: '04', name: 'Five blockers are the diagnostic', stat: 'The five blockers are the right diagnostic to run their own modernization program against.' },
        { n: '05', name: 'Sequenced answer', stat: 'AWS has a four-phase answer — Migrate & Stabilize, Secure & Govern, Modernize & Enable, Innovate & Lead — and a partner ecosystem that covers every phase.' },
        { n: '06', name: 'Credible proof point', stat: 'GoDaddy executed Foundation → Scaling → Growth cleanly. The path from Phase 1 to Phase 4 is documented, not theoretical.' },
        { n: '07', name: 'Ecosystem, not alone', stat: 'AWS shows up with GSI partners, migration specialists, and AWS-native infrastructure. Not a single-vendor pitch.' },
        { n: '08', name: 'Concrete next step in 7 days', stat: 'There is a concrete next step on the calendar within seven days — starting with a Hardware Refresh Avoidance Analysis or a 90-day sprint.' },
      ],
      kicker: 'These are the exit criteria. The test for whether the CIO Elevate first call did its job.',
    },
  },
};

// ── Persona registry ──────────────────────────────────────────────────────
// Add new CXO personas here. The webapp reads this to auto-show built-in
// documents for any persona that has content — no code changes needed
// to add a new persona — just add it to PERSONA_REGISTRY.
const PERSONA_REGISTRY = {
  CAIO: { narrative: NARRATIVE, storyboard: STORYBOARD },
  CIO:  { narrative: CIO_NARRATIVE },
  // CMO:  { narrative: CMO_NARRATIVE, storyboard: CMO_STORYBOARD },
  // COO:  { narrative: COO_NARRATIVE, storyboard: COO_STORYBOARD },
  // CFO:  { narrative: CFO_NARRATIVE, storyboard: CFO_STORYBOARD },
  // CTO:  { narrative: CTO_NARRATIVE, storyboard: CTO_STORYBOARD },
};

window.NARRATIVE        = NARRATIVE;
window.STORYBOARD       = STORYBOARD;
window.PERSONA_REGISTRY = PERSONA_REGISTRY;
