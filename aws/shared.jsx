/* global React */
const T24 = {
  brand: { name: "T24", parent: "BLN24", client: "AWS" },

  people: {
    angie: { id: "angie", name: "Angie Paik", role: "Director, PM Lead", initials: "AP", color: "#f4b73f" },
    stephen: { id: "stephen", name: "Stephen Yi", role: "Consultant", initials: "SY", color: "#7aa7ff" },
    michael: { id: "michael", name: "Michael Dumlao", role: "CX Director", initials: "MD", color: "#c79bff" },
    you: { id: "you", name: "You", role: "Founder, BLN24", initials: "BL", color: "#6dd49a" },
    t24: { id: "t24", name: "T24", role: "AI", initials: "T24", color: "#ff9900", ai: true },
    scout: { id: "scout", name: "Scout", role: "Research agent", initials: "Sc", color: "#7aa7ff", ai: true },
    anvil: { id: "anvil", name: "Anvil", role: "Narrative agent", initials: "An", color: "#f4b73f", ai: true },
    scribe: { id: "scribe", name: "Scribe", role: "Voice agent", initials: "Sb", color: "#9bd17a", ai: true },
    aws: { id: "aws", name: "AWS Reviewer", role: "Client", initials: "AW", color: "#232f3e" },
  },

  stages: [
    { id: "narrative", name: "Narrative",   short: "I",   sub: "Long-form story", icon: "doc_text", outputType: ".docx" },
    { id: "arc",       name: "Narrative Arc", short: "II", sub: "Summarized structure", icon: "flow", outputType: ".docx" },
    { id: "storyboard",name: "Storyboard",  short: "III", sub: "Slide-by-slide blueprint", icon: "film", outputType: ".docx" },
    { id: "deck",      name: "Deck",        short: "IV",  sub: "Final presentation", icon: "presentation", outputType: ".pptx" },
  ],

  // Personas we target. Each is a "play" — a narrative shape designed for that role,
  // delivered to a cohort of Fortune 500 companies.
  projects: [
    {
      id: "caio-elevate-2026",
      slug: "CAIO Elevate",           // matches Teams folder name
      persona: "CAIO",
      personaFull: "Chief AI Officer",
      industry: "Cross-industry · Fortune 500",
      title: "From a single client meeting to a deck Fortune 500 buyers say yes to.",
      cohort: ["L'Oréal", "Delta", "Regions", "Deloitte", "Accenture"],
      cohortSize: 5,
      stage: "storyboard",
      stageIndex: 2,
      progress: 60,
      due: "TBD",
      dueIn: 0,
      status: "Storyboard in Review",
      statusKind: "review",
      lead: "stephen",               // Stephen owns storyboard+
      narrativeLead: "angie",        // Angie owns narrative/arc
      team: ["angie", "stephen"],
      live: ["stephen"],
      lastActivity: "CAO_Elevate_Storyboard_FINAL.docx uploaded",
      lastActivityAt: "May 1",
      cover: "linear-gradient(135deg,#3a2d5c 0%,#5c2d4a 50%,#3a2d5c 100%)",
      accent: "#c79bff",
      tags: ["CAIO", "CXO Elevate"],
      // Approval state per stage (0=Narrative, 1=Arc, 2=Storyboard, 3=Deck)
      // Angie approves 0+1, Stephen+Angie approve 2, AWS approves 3
      stageOwners: ["angie", "angie", "stephen", "aws"],
    },

    {
      id: "cmo-2026",
      persona: "CMO",
      personaFull: "Chief Marketing Officer",
      industry: "Cross-industry · Fortune 500",
      title: "From brand voice to brand intelligence — what CMOs do with AI in 2026",
      cohort: ["Deloitte", "CarMax", "Marriott", "Target", "Accenture", "Sephora", "L'Oréal", "Nike"],
      cohortSize: 24,
      stage: "storyboard",
      stageIndex: 2,
      progress: 64,
      due: "Apr 18",
      dueIn: 6,
      status: "In Storyboard Review",
      statusKind: "review",
      lead: "angie",
      team: ["angie", "stephen", "michael"],
      live: ["stephen"],
      lastActivity: "Stephen left 4 comments on Section 3",
      lastActivityAt: "12 min ago",
      cover: "linear-gradient(135deg, #1a3a5c 0%, #2d5a8c 50%, #1a3a5c 100%)",
      accent: "#7aa7ff",
      tags: ["Enterprise Profile", "Marketing"],
    },
    {
      id: "cto-bedrock",
      persona: "CTO",
      personaFull: "Chief Technology Officer",
      industry: "Industrial & Logistics · Fortune 100",
      title: "The CTO's playbook for production-grade GenAI on AWS Bedrock",
      cohort: ["John Deere", "Caterpillar", "FedEx", "UPS", "Boeing", "Ford", "GM", "Honeywell"],
      cohortSize: 18,
      stage: "narrative",
      stageIndex: 0,
      progress: 22,
      due: "Apr 24",
      dueIn: 12,
      status: "Drafting Narrative",
      statusKind: "live",
      lead: "stephen",
      team: ["stephen", "angie"],
      live: ["t24"],
      lastActivity: "T24 generated v3 of the narrative",
      lastActivityAt: "just now",
      cover: "linear-gradient(135deg, #2d4a1a 0%, #4a7a2d 50%, #2d4a1a 100%)",
      accent: "#a8e07a",
      tags: ["Engagement", "Engineering"],
    },
    {
      id: "cxo-personal",
      persona: "CXO",
      personaFull: "Chief Experience Officer",
      industry: "Hospitality & Retail · Fortune 500",
      title: "Personalization at scale — what CXOs unlock with first-party data and AWS",
      cohort: ["Marriott", "Hilton", "Hyatt", "Disney", "American Express", "Sephora", "Starbucks"],
      cohortSize: 16,
      stage: "deck",
      stageIndex: 3,
      progress: 91,
      due: "Apr 14",
      dueIn: 2,
      status: "Awaiting AWS Approval",
      statusKind: "review",
      lead: "angie",
      team: ["angie", "stephen", "michael"],
      live: ["michael", "angie"],
      lastActivity: "Michael uploaded final visuals",
      lastActivityAt: "1 hr ago",
      cover: "linear-gradient(135deg, #5c2d1a 0%, #8c4a2d 50%, #5c2d1a 100%)",
      accent: "#ff9d6e",
      tags: ["Engagement", "Customer Experience"],
    },
    {
      id: "cmio-trial",
      persona: "CMIO",
      personaFull: "Chief Medical Information Officer",
      industry: "Pharma & Health · Fortune 100",
      title: "Trial acceleration — the CMIO's case for generative AI",
      cohort: ["Pfizer", "Merck", "J&J", "Roche", "AstraZeneca", "Bristol-Myers Squibb"],
      cohortSize: 12,
      stage: "arc",
      stageIndex: 1,
      progress: 38,
      due: "Apr 22",
      dueIn: 10,
      status: "Arc in Review",
      statusKind: "review",
      lead: "stephen",
      team: ["stephen", "angie", "michael"],
      live: [],
      lastActivity: "Angie approved the narrative",
      lastActivityAt: "yesterday",
      cover: "linear-gradient(135deg, #3a1a4a 0%, #6a2d8c 50%, #3a1a4a 100%)",
      accent: "#d9a0ff",
      tags: ["Enterprise Profile", "Healthcare"],
    },
    {
      id: "cdo-retail",
      persona: "CDO",
      personaFull: "Chief Data Officer",
      industry: "Retail · Fortune 100",
      title: "From data lake to decision engine — the CDO's 12-month plan",
      cohort: ["Target", "Walmart", "Kroger", "Costco", "Home Depot", "Lowe's"],
      cohortSize: 14,
      stage: "narrative",
      stageIndex: 0,
      progress: 8,
      due: "May 02",
      dueIn: 20,
      status: "Sources Uploaded",
      statusKind: "idle",
      lead: "angie",
      team: ["angie", "stephen"],
      live: [],
      lastActivity: "You created the project",
      lastActivityAt: "2 days ago",
      cover: "linear-gradient(135deg, #5c1a1a 0%, #8c2d2d 50%, #5c1a1a 100%)",
      accent: "#ff6e6e",
      tags: ["Engagement", "Data"],
    },
    {
      id: "ciso-edge",
      persona: "CISO",
      personaFull: "Chief Information Security Officer",
      industry: "Logistics & Finance · Fortune 100",
      title: "Securing the AI edge — a CISO's AWS playbook",
      cohort: ["FedEx", "UPS", "Chase", "Capital One", "Visa", "Mastercard"],
      cohortSize: 11,
      stage: "deck",
      stageIndex: 3,
      progress: 100,
      due: "Apr 02",
      dueIn: -3,
      status: "Approved · Delivered",
      statusKind: "live",
      lead: "angie",
      team: ["angie", "stephen", "michael"],
      live: [],
      lastActivity: "AWS approved the final deck",
      lastActivityAt: "3 days ago",
      cover: "linear-gradient(135deg, #2d2d5c 0%, #4a4a8c 50%, #2d2d5c 100%)",
      accent: "#9eb7ff",
      tags: ["Enterprise Profile", "Security", "Delivered"],
      done: true,
    },
  ],

  // Personas catalog used by the create flow
  personaCatalog: [
    { id: "CAIO", name: "CAIO", full: "Chief AI Officer",                   count: 1 },
    { id: "CEO",  name: "CEO",  full: "Chief Executive Officer",              count: 0 },
    { id: "CMO",  name: "CMO",  full: "Chief Marketing Officer",              count: 1 },
    { id: "COO",  name: "COO",  full: "Chief Operating Officer",              count: 1 },
    { id: "CTO",  name: "CTO",  full: "Chief Technology Officer",             count: 0 },
    { id: "CFO",  name: "CFO",  full: "Chief Financial Officer",              count: 0 },
    { id: "CIO",  name: "CIO",  full: "Chief Information Officer",            count: 0 },
    { id: "CDO",  name: "CDO",  full: "Chief Data Officer",                   count: 0 },
    { id: "CISO", name: "CISO", full: "Chief Information Security Officer",   count: 0 },
    { id: "CXO",  name: "CXO",  full: "Chief Experience Officer",             count: 0 },
    { id: "CRO",  name: "CRO",  full: "Chief Revenue Officer",                count: 0 },
    { id: "CHRO", name: "CHRO", full: "Chief Human Resources Officer",        count: 0 },
  ],

  // Fortune 500 starter list for cohort building
  cohortCatalog: [
    { name: "Deloitte", industry: "Professional Services" },
    { name: "Accenture", industry: "Professional Services" },
    { name: "CarMax", industry: "Retail" },
    { name: "Target", industry: "Retail" },
    { name: "Walmart", industry: "Retail" },
    { name: "Sephora", industry: "Retail" },
    { name: "Marriott", industry: "Hospitality" },
    { name: "Hilton", industry: "Hospitality" },
    { name: "Disney", industry: "Media & Entertainment" },
    { name: "Pfizer", industry: "Pharma" },
    { name: "Merck", industry: "Pharma" },
    { name: "J&J", industry: "Pharma" },
    { name: "John Deere", industry: "Industrial" },
    { name: "Caterpillar", industry: "Industrial" },
    { name: "FedEx", industry: "Logistics" },
    { name: "UPS", industry: "Logistics" },
    { name: "Boeing", industry: "Aerospace" },
    { name: "Ford", industry: "Automotive" },
    { name: "GM", industry: "Automotive" },
    { name: "Chase", industry: "Finance" },
    { name: "Capital One", industry: "Finance" },
    { name: "Visa", industry: "Finance" },
    { name: "American Express", industry: "Finance" },
    { name: "Starbucks", industry: "Food & Beverage" },
    { name: "Nike", industry: "Apparel" },
    { name: "L'Oréal", industry: "Beauty" },
  ],
};

window.T24 = T24;

/* ============ Topbar ============ */
function Topbar({ activeProject, onNav, current = "dashboard", onOpenSearch, onOpenInbox, onOpenQuestions, theme, setTheme, onNewProject }) {
  return (
    <header className="t24-topbar">
      <div className="topbar-left">
        <button className="topbar-logo" onClick={() => onNav("dashboard")}>
          <span className="logo-glyph">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 21V3l9 18 9-18v18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="logo-word">
            Projects <span className="muted">by</span> <span className="amber">T24</span>
          </span>
          <span className="pill pill-amber" style={{ marginLeft: 8 }}>AWS</span>
        </button>

        <nav className="topbar-nav">
          <button className={"topbar-link " + (current === "dashboard" ? "active" : "")} onClick={() => onNav("dashboard")}>Plays</button>
          <button className={"topbar-link " + (current === "library" ? "active" : "")} onClick={() => onNav("library")}>Library</button>
          <button className={"topbar-link " + (current === "calendar" ? "active" : "")} onClick={() => onNav("calendar")}>Calendar</button>
          <button className={"topbar-link " + (current === "templates" ? "active" : "")} onClick={() => onNav("templates")}>Templates</button>
          <button className={"topbar-link " + (current === "runners" ? "active" : "")} onClick={() => onNav("runners")} title="Runners — wiring spec">Runners</button>
          <button className={"topbar-link " + (current === "settings" ? "active" : "")} onClick={() => onNav("settings")} title="Settings">Settings</button>
        </nav>
      </div>

      <button className="topbar-search" onClick={onOpenSearch}>
        <Icon name="search" size={14} />
        <span>Search plays, narratives, decks…</span>
        <span className="kbd-hint"><kbd>⌘</kbd><kbd>K</kbd></span>
      </button>

      <div className="topbar-right">
        <button className="btn btn-accent btn-sm" onClick={onNewProject}>
          <Icon name="plus" size={13} />New play
        </button>
        <button className="btn-icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Toggle theme">
          <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
        </button>
        <button className="btn-icon" onClick={onOpenInbox} title="Inbox" style={{ position: "relative" }}>
          <Icon name="bell" size={16} />
          <span className="bell-dot" />
        </button>
        <button className="btn-icon" onClick={onOpenQuestions} title="Open questions from agents" style={{ position: "relative" }}>
          <Icon name="alert" size={16} />
          <OQBadge />
        </button>
        <div className="presence-stack">
          {["angie","stephen","michael"].map(p => {
            const person = T24.people[p];
            return <span key={p} className="avatar avatar-sm" style={{ background: person.color, color: "#0c0b08" }}>{person.initials}</span>;
          })}
        </div>
        <span className="avatar avatar-sm" style={{ background: T24.people.you.color, color: "#0c0b08", marginLeft: 4 }}>{T24.people.you.initials}</span>
      </div>
    </header>
  );
}
window.Topbar = Topbar;

function OQBadge() {
  const count = window.useOpenQuestionCount ? window.useOpenQuestionCount() : null;
  if (!count) return null;
  return <span className="oq-bell-count">{count}</span>;
}
window.OQBadge = OQBadge;

function PagePlaceholder({ title, subtitle, eyebrow }) {
  return (
    <div className="page-placeholder">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="display" style={{ fontSize: 56, marginTop: 12 }}>{title}</h2>
      {subtitle && <p className="muted" style={{ marginTop: 12, maxWidth: 520, textAlign: "center" }}>{subtitle}</p>}
    </div>
  );
}
window.PagePlaceholder = PagePlaceholder;

function StatusPill({ statusKind, label }) {
  const kindClass = statusKind === "live" ? "pill-success" : statusKind === "review" ? "pill-amber" : statusKind === "idle" ? "pill-muted" : "";
  return <span className={"pill pill-dot " + kindClass}>{label}</span>;
}
window.StatusPill = StatusPill;

function CommandPalette({ open, onClose, onNav }) {
  if (!open) return null;
  const [query, setQuery] = React.useState("");
  const items = [
    ...T24.projects.map(p => ({ kind: "Play", title: p.persona + " — " + p.title, action: () => onNav("workspace", p.id) })),
    { kind: "Page", title: "Plays (Dashboard)", action: () => onNav("dashboard") },
    { kind: "Page", title: "Library", action: () => onNav("library") },
    { kind: "Page", title: "Calendar", action: () => onNav("calendar") },
    { kind: "Page", title: "Templates", action: () => onNav("templates") },
    { kind: "Action", title: "New play from template", action: () => onNav("create") },
    { kind: "Action", title: "Talk to T24", action: () => {} },
  ];
  const filtered = items.filter(i => i.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="cmd-overlay" onClick={onClose}>
      <div className="cmd-palette" onClick={e => e.stopPropagation()}>
        <div className="cmd-input-wrap">
          <Icon name="search" size={16} />
          <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search or jump to…" className="cmd-input" />
          <span className="kbd-hint"><kbd>esc</kbd></span>
        </div>
        <div className="cmd-results">
          {filtered.slice(0, 8).map((item, i) => (
            <button key={i} className="cmd-row" onClick={() => { item.action(); onClose(); }}>
              <span className="pill pill-muted" style={{ minWidth: 60, justifyContent: "center" }}>{item.kind}</span>
              <span className="flex-1">{item.title}</span>
              <Icon name="return" size={12} className="muted" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
window.CommandPalette = CommandPalette;
