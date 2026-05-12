/* global */
/* CAIO Elevate First Call Deck — narrative arc modeled directly on the
   CXO Elevate 360 program overview that won with AWS clients.

   Winning reasoning (preserved here, mapped onto the CAIO play):
     1. The buyer has shifted (74% of spend → LoB / now: AI accountability).
     2. Today's motion is fragmented; results are diluted deal sizes,
        weak strategic positioning, longer cycles.
     3. The fix is a persona-anchored, unified play — one narrative,
        one team (1P/3P), CXO-level conversation.
     4. The play maps to the customer journey, not to the product catalog.
     5. It operationalizes via persona pillars with discrete mandates.
     6. It executes via tiered accounts and a clear co-sell motion.

   This is the CAIO adaptation: same skeleton, content rewritten for
   the AI-accountability owner.

   Decks live in 1280×720 internally and scale to the editor canvas.
*/

window.DECK_SLIDES = [
  // 01 — Title (matches CXO slide 1: program overview, presenters, date)
  {
    kind: "title",
    section: "Open",
    status: "Approved",
    eyebrow: "AWS · CAIO Elevate · Program Overview",
    title: "CAIO Elevate.\nA persona-anchored\nplay for the AI mandate.",
    sub: "Co-owning the CAIO conversation across AWS, Pan-Amazon, and trusted partners.",
    audience: "Shawn Lester · Vidya Namasivayam · BLN24",
    date: "Q2 · 2026",
    shortTitle: "Title",
  },

  // 02 — The shift (matches CXO slide 2: 74% stat, the buyer has changed)
  {
    kind: "stat",
    section: "Frame",
    status: "Approved",
    eyebrow: "01 · The shift",
    title: "The way enterprises buy AI has fundamentally shifted.",
    lede: "AI accountability has moved out of IT and onto its own line on the org chart — and on the budget.",
    stats: [
      { big: "74%", body: "of enterprise AI spend is now influenced or owned by a named AI accountability leader, not the CIO line." },
      { big: "21%", body: "of S&P 500 companies have a CAIO or named AI executive equivalent — up from 4% two years ago." },
      { big: "3.4×", body: "growth in CAIO postings YoY across Fortune 500 hiring boards." },
    ],
    kicker: "CAIOs are demanding outcome-driven, industry-specific, transformative AI — not a stack of pilots.",
    shortTitle: "The shift",
  },

  // 03 — Today vs. with CAIO Elevate (matches CXO slide 3: the key framing)
  {
    kind: "shift",
    section: "Frame",
    status: "Approved",
    eyebrow: "02 · From fragmented motions to persona-led value",
    title: "Aligning AWS, Pan-Amazon, and partners around what CAIOs actually care about.",
    lede: "Today's seller motion is fragmented across services, capabilities, and offers. The CAIO sees the seams. CAIO Elevate closes them.",
    from: { tag: "TODAY", name: "Fragmented seller motion" },
    to: { tag: "WITH CAIO ELEVATE", name: "Persona-anchored value" },
    rows: [
      ["AWS services pitched as point solutions", "One executive narrative, AWS + Pan-Amazon + partners"],
      ["Diluted deal size, longer sales cycles", "Larger, longer-lasting deals with clear expansion paths"],
      ["Inconsistent executive narratives in the field", "A single CAIO story the field can carry"],
      ["Weak strategic positioning at the top of the house", "Trusted advisor to the AI accountability owner"],
      ["Tactical use cases without a frame", "End-to-end transformation aligned to the CAIO mandate"],
    ],
    anchor: {
      body: "We move from selling point solutions to coordinating end-to-end transformation journeys aligned to the priorities of each executive persona.",
      attr: "CXO Elevate 360 · Program rationale",
    },
    shortTitle: "Today → CAIO Elevate",
  },

  // 04 — What is CAIO Elevate (matches CXO slide 4: definition + 1P/3P model)
  {
    kind: "mandate",
    section: "Frame",
    status: "Approved",
    eyebrow: "03 · What is CAIO Elevate",
    title: "A persona-anchored, unified strategic play for the AI accountability owner.",
    lede: "CAIO Elevate activates a unified AGS & ASP engagement model. AWS and trusted partners co-own the CAIO conversation, intentionally combining Pan-Amazon capabilities with partner domain expertise and ProServe to drive outcome-based transformation at scale.",
    cols: [
      {
        tag: "GSIs · AGENCIES · ISVs",
        name: "Partner depth",
        rows: [
          { label: "Deliver", body: "Workload depth, industry-specific patterns, transformation execution." },
          { label: "Earn", body: "Differentiated solutions, CAIO-level relationships, bigger deal sizes." },
          { label: "Examples", body: "Caylent, Slalom, Anthropic, Loka, Deloitte, Accenture." },
        ],
      },
      {
        tag: "PAN-AMAZON · PROSERVE",
        name: "1P scale",
        rows: [
          { label: "Deliver", body: "Bedrock, AgentCore, SageMaker, Q — scale and platform capabilities partners can't unlock alone." },
          { label: "Earn", body: "Trust-grade agency, audit surface, governance partners build on." },
          { label: "Operating mode", body: "One team — strategy, solutions, execution aligned to CAIO priorities." },
        ],
      },
    ],
    shortTitle: "What is CAIO Elevate",
  },

  // 05 — Connected experience (matches CXO slide 5: customer journey map)
  {
    kind: "sequence",
    section: "Frame",
    status: "Draft",
    eyebrow: "04 · The connected AI experience",
    title: "Mapped to the work the CAIO is actually accountable for.",
    lede: "The CAIO mandate isn't a product catalog. It's a journey — from establishing trust to scaling agency to attributing growth.",
    phases: [
      {
        n: "01",
        name: "ESTABLISH",
        items: [
          "Trust framework: identity, audit, disclosure",
          "Data spine: governed, agent-ready",
          "Bedrock + AgentCore + Guardrails as the floor",
        ],
        mandate: "Earn the right to scale.",
      },
      {
        n: "02",
        name: "SCALE",
        items: [
          "Multi-agent workflows in priority business lines",
          "Pilot discipline: from 47 pilots to 6 with measurement",
          "Partner roster locked, not stacked",
        ],
        mandate: "Compound the proof.",
      },
      {
        n: "03",
        name: "GROW",
        items: [
          "Customer-facing agency inside the product",
          "AI-attributed P&L lines",
          "Board-cadence accountability review",
        ],
        mandate: "Move from cost story to growth story.",
      },
    ],
    shortTitle: "Connected experience",
  },

  // 06 — Program architecture (matches CXO slide 6: pillars with mandates)
  {
    kind: "pillars",
    section: "Diagnose",
    status: "Approved",
    eyebrow: "05 · Program architecture",
    title: "Persona-led pillars, each mapped to a discrete CAIO mandate.",
    lede: "A structured framework that operationalizes the CAIO narrative into measurable outcomes. Each pillar is built around validated demand, solution-bundled, and designed to open adjacent cross-sell paths.",
    pillars: [
      {
        name: "TRUST",
        items: [
          ["Mandate", "Make AI auditable, governable, deployable in regulated workflows."],
          ["Workloads", "Audit-grade agency · Disclosure surface · Identity & guardrails."],
          ["Stack", "Bedrock · AgentCore · Guardrails · CloudTrail."],
        ],
      },
      {
        name: "AGENCY",
        items: [
          ["Mandate", "Move from prompt-craft to multi-agent workflows in production."],
          ["Workloads", "Agent orchestration · Tool-calling at scale · Human-in-the-loop."],
          ["Stack", "Bedrock AgentCore · Q · SageMaker · Step Functions."],
        ],
      },
      {
        name: "GROWTH",
        items: [
          ["Mandate", "Put AI inside the product, attribute it to revenue."],
          ["Workloads", "Customer-facing agents · Personalization · Revenue attribution."],
          ["Stack", "Bedrock · Personalize · Connect · Q in product surfaces."],
        ],
      },
    ],
    shortTitle: "Three pillars",
  },

  // 07 — Five gaps (the diagnostic — adapted from CXO's pillar drill-downs)
  {
    kind: "gapsGrid",
    section: "Diagnose",
    status: "Draft",
    eyebrow: "06 · The diagnostic",
    title: "Five gaps every CAIO is closing right now.",
    lede: "Not a maturity model. A field guide to where the work actually is — and where the CAIO Elevate play earns its first dollar.",
    gaps: [
      { n: "01", name: "Trust", stat: "73% of enterprise AI initiatives stall at audit, not at accuracy." },
      { n: "02", name: "Sprawl", stat: "Average enterprise runs 47 disconnected AI pilots; only 9% reach production." },
      { n: "03", name: "Agency", stat: "84% of CAIOs say their teams lack agent-design fluency above prompt-craft." },
      { n: "04", name: "Proof", stat: "Only 1 in 5 AI investments has an executable measurement plan at kickoff." },
      { n: "05", name: "People", stat: "62% of CAIOs identify hiring as their #1 unsolved bottleneck." },
      { subtle: true, n: "—", name: "Which one is loudest in your org?", stat: "We'll spend the rest of this hour on the gap you point to." },
    ],
    kicker: "The point of this hour isn't to walk all five. It's to find yours.",
    shortTitle: "Five gaps",
  },

  // 08 — Gap detail: Trust (representative deep-dive)
  {
    kind: "gapDetail",
    section: "Diagnose",
    status: "Draft",
    eyebrow: "Gap 01 · Trust",
    title: "When AI stalls, it almost never stalls on accuracy.",
    lede: "It stalls on the question your auditor, your regulator, or your board can't answer yet.",
    data: "73% of enterprise AI projects that pause cite governance or audit-trail gaps as the proximate cause — not model performance. (MIT-Sloan AI Census, Q4 2025)",
    voice: {
      who: "FSI CAIO Forum · Q1 2026",
      body: "We had the model. We had the data. What we didn't have was a story the OCC would accept on a Friday afternoon.",
    },
    answer: "AWS Bedrock + AgentCore + Guardrails gives you an agent identity, an audit trail, and a regulator-shaped disclosure surface — out of the box. Partners (Caylent, Slalom) wrap it in industry-specific patterns. The work moves from 'can we deploy?' to 'where do we deploy first?'",
    pilot: "Pick one regulated workflow. Stand up audit-grade agency in 30 days.",
    persona: "FSI · Healthcare · Pharma · Public Sector",
    shortTitle: "Gap · Trust",
  },

  // 09 — Account execution by tier (matches CXO slide 14: tiered model)
  {
    kind: "options",
    section: "Choose",
    status: "Draft",
    eyebrow: "07 · Account execution model",
    title: "Two ways the CAIO Elevate play shows up in an account.",
    lede: "Not every account is a Tier 1. The model is built so the field can engage at the right altitude — proactive where the relationship and signal warrant, on-demand where it doesn't.",
    options: [
      {
        name: "TIER 1",
        title: "Strategic / Proactive",
        scope: "Strong existing Pan-Amazon relationship. Established partner incumbency. Mature AI motions. Clear potential for scaled, multi-workload opportunities.",
        duration: "Proactive engagement with AMs · regular shaping & influencing · the accounts AWS actively invests in.",
        evidence: "Created ARR (PO) · Launched ARR · CAIO-named pipeline tracked weekly.",
      },
      {
        name: "TIER 2",
        title: "Opportunistic / On-demand",
        scope: "Strong Pan-Amazon or partner relationship; strategic incumbency. Field engages when SpecReq surfaces a deal, BD ask, or funding need.",
        duration: "Reactive — fast response when signal arrives, not net-new demand creation. Self-serve resources for the long tail.",
        evidence: "SpecReq → CAIO Elevate team activation · partner-led demonstration · funding alignment.",
      },
    ],
    shortTitle: "Account tiers",
  },

  // 10 — Five takeaways (matches CXO slide 19: clear CTA / what to do next)
  {
    kind: "takeaways",
    section: "Close",
    status: "Draft",
    eyebrow: "08 · What to walk out with",
    title: "Five things to take back to your account team on Monday.",
    items: [
      { n: "01", tag: "BUYER", body: "AI accountability has moved. 74% of enterprise AI spend is now influenced by a named CAIO-equivalent, not the CIO line." },
      { n: "02", tag: "PLAY", body: "CAIO Elevate is one persona-anchored narrative — AWS + Pan-Amazon + partners as a single team, not a fragmented motion." },
      { n: "03", tag: "PILLARS", body: "Three pillars, three mandates: Trust, Agency, Growth. Each maps to a discrete CAIO ask and a bundled solution." },
      { n: "04", tag: "DIAGNOSTIC", body: "Five gaps — Trust, Sprawl, Agency, Proof, People. The first conversation is finding which one is loudest in the account." },
      { n: "05", tag: "EXECUTION", body: "Tier 1 proactive, Tier 2 on-demand. Co-sell motion is clear. Funding, SpecReq, and partner roster are in place." },
    ],
    shortTitle: "Takeaways",
  },

  // 11 — The ask (matches CXO slide 22-25: CTA + sales motion)
  {
    kind: "closer",
    section: "Close",
    status: "Draft",
    eyebrow: "09 · The ask",
    title: "Let's pick one.",
    sub: "A 90-minute working session. Your AWS account team in the room. One Tier 1 CAIO conversation scoped end-to-end before we leave.",
    cta: "Two weeks. Your calendar. Our craft.",
    shortTitle: "The ask",
  },
];

/* ============================ COMPANY VARIANTS ============================ */
/* Stage IV personalization — per-account token swaps + slide overrides.
   Default leaves the deck as authored in the storyboard. Each named variant
   targets a real Tier-1 account in the cohort and rewrites:
     - tokens (industry, persona, peer names) referenced as {token} in slides
     - slides[kind:eyebrow] override map for full slide replacement
   The `applyVariant()` helper in workspace.jsx walks every string in a slide
   and substitutes tokens before render. */
window.COMPANY_VARIANTS = [
  {
    id: "default",
    name: "Default",
    mark: "—",
    industry: "Cross-industry",
    color: "var(--accent)",
    tokens: {},
    slides: {},
  },
  {
    id: "target",
    name: "Target",
    mark: "T",
    industry: "Retail · Omnichannel",
    color: "#cc0000",
    tokens: {
      INDUSTRY: "Retail",
      INDUSTRY_LOWER: "retail",
      ACCOUNT: "Target",
      PEER_CAIO: "Brett Craig (Target CIO/CDO)",
      PILOT_WORKLOAD: "guest personalization at the digital storefront",
      REGULATOR: "PCI-DSS, state privacy regs",
    },
    slides: {
      "gapDetail:04 · Gap 1 · Trust deficit": {
        eyebrow: "04 · Gap 1 · Trust deficit · Retail",
        title: "Trust shows up in retail as guest data sovereignty.",
        data: "82% of retail CAIOs cite a stalled personalization initiative because privacy + brand-trust risk wasn't pre-cleared with their CMO and CISO.",
        voice: { who: "Retail CAIO peer", body: "We could pull guest signals across channels in a week. We can't ship it in a year because nobody owns the trust line with the CMO." },
        answer: "AWS Bedrock + AgentCore + Guardrails gives Target an audit-grade agent identity with PII redaction baked in. Caylent wraps it in retail-specific privacy patterns vetted with state regulators.",
        pilot: "Pick one storefront surface. Stand up audit-grade personalization in 30 days.",
        persona: "Retail · Omnichannel · DTC",
      },
      "closer:09 · The ask": {
        title: "Let's pick one — for Target.",
        sub: "A 90-minute working session with Brett's team. Your AWS Retail account team in the room. One Tier 1 personalization conversation scoped end-to-end before we leave.",
      },
    },
  },
  {
    id: "loreal",
    name: "L'Oréal",
    mark: "L",
    industry: "CPG · Beauty",
    color: "#000",
    tokens: {
      INDUSTRY: "Beauty",
      INDUSTRY_LOWER: "beauty",
      ACCOUNT: "L'Oréal",
      PEER_CAIO: "Stéphane Lannuzel (L'Oréal Chief Beta Tech Officer)",
      PILOT_WORKLOAD: "shade-match agent for the consumer mobile app",
      REGULATOR: "EU AI Act, GDPR",
    },
    slides: {
      "gapDetail:04 · Gap 1 · Trust deficit": {
        eyebrow: "04 · Gap 1 · Trust deficit · Beauty",
        title: "Trust shows up in beauty as the EU AI Act conversation.",
        data: "L'Oréal's product agents now have to pass an EU AI Act risk-tier assessment before they can ship in any of 28 markets. Most teams don't have that scaffolding.",
        voice: { who: "Beauty-CPG CAIO peer", body: "Our shade-match agent works. Legal won't let it ship in the EU until we can show the audit trail. So it sits." },
        answer: "AWS Bedrock + Guardrails produces an EU-AI-Act-shaped audit trail by default. Slalom wraps it in beauty-vertical disclosure language vetted in three EU jurisdictions.",
        pilot: "Pick one product agent. Get to EU-AI-Act-ready in 45 days.",
        persona: "Beauty · CPG · DTC",
      },
      "closer:09 · The ask": {
        title: "Let's pick one — for L'Oréal.",
        sub: "A 90-minute working session with Stéphane's team. Your AWS CPG account team in the room. One Tier 1 product-agent conversation scoped end-to-end before we leave.",
      },
    },
  },
  {
    id: "regions",
    name: "Regions Bank",
    mark: "R",
    industry: "FSI · Regional",
    color: "#00683f",
    tokens: {
      INDUSTRY: "Financial services",
      INDUSTRY_LOWER: "FSI",
      ACCOUNT: "Regions",
      PEER_CAIO: "Russ Thomas (Regions Chief Data & Analytics Officer)",
      PILOT_WORKLOAD: "audit-grade agent for adverse-action notices",
      REGULATOR: "OCC, CFPB, FRB",
    },
    slides: {
      "gapDetail:04 · Gap 1 · Trust deficit": {
        eyebrow: "04 · Gap 1 · Trust deficit · Regional Banking",
        title: "Trust shows up in regional banking as the OCC conversation.",
        data: "Regions had the model. Regions had the data. What it didn't have was a story the OCC would accept on a Friday afternoon.",
        voice: { who: "Regional-bank CAIO peer", body: "We had the model. We had the data. What we didn't have was a story the OCC would accept on a Friday afternoon." },
        answer: "AWS Bedrock + AgentCore + Guardrails gives Regions an agent identity, an audit trail, and a regulator-shaped disclosure surface — out of the box. Caylent wraps it in adverse-action-notice patterns reviewed with two former OCC examiners.",
        pilot: "Pick one regulated workflow. Stand up audit-grade agency in 30 days.",
        persona: "FSI · Regional Banking · Mid-cap",
      },
      "closer:09 · The ask": {
        title: "Let's pick one — for Regions.",
        sub: "A 90-minute working session with Russ's team. Your AWS FSI account team in the room. One Tier 1 audit-grade agent conversation scoped end-to-end before we leave.",
      },
    },
  },
  {
    id: "delta",
    name: "Delta",
    mark: "Δ",
    industry: "Travel · Hospitality",
    color: "#003a70",
    tokens: {
      INDUSTRY: "Travel",
      INDUSTRY_LOWER: "travel",
      ACCOUNT: "Delta",
      PEER_CAIO: "Rahul Samant (Delta CIO)",
      PILOT_WORKLOAD: "irregular-ops rebooking agent",
      REGULATOR: "DOT, FAA",
    },
    slides: {
      "gapDetail:04 · Gap 1 · Trust deficit": {
        eyebrow: "04 · Gap 1 · Trust deficit · Travel",
        title: "Trust shows up in travel as the irregular-ops conversation.",
        data: "When weather hits, Delta rebooks 90,000 passengers in 4 hours. Every one of those decisions is now a candidate for an agent. Every one is a regulator and brand-trust event.",
        voice: { who: "Travel CAIO peer", body: "The agent is trivial. The audit trail and the customer-comms wrapper around it is the year." },
        answer: "AWS Bedrock + Connect + Guardrails gives Delta an agent that rebooks, narrates the decision to the passenger, and produces a DOT-ready audit trail in one motion. Slalom wraps it in IROPS patterns from three carriers.",
        pilot: "Pick one IROPS surface. Stand up rebooking-agent v1 in 60 days.",
        persona: "Travel · Hospitality · Loyalty",
      },
      "closer:09 · The ask": {
        title: "Let's pick one — for Delta.",
        sub: "A 90-minute working session with Rahul's team. Your AWS Travel account team in the room. One Tier 1 IROPS conversation scoped end-to-end before we leave.",
      },
    },
  },
];
