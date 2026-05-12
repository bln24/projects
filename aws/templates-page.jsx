/* global React, Icon, T24 */
/* TemplatesPage — gallery of narrative/arc/storyboard templates with previews. */

const TEMPLATE_CATEGORIES = [
  { id: "all", label: "All", count: 12 },
  { id: "narrative", label: "Narrative", count: 4 },
  { id: "arc", label: "Arc", count: 3 },
  { id: "storyboard", label: "Storyboard", count: 3 },
  { id: "deck", label: "Deck", count: 2 },
];

const TEMPLATES = [
  {
    id: "tpl-narrative-pivot",
    kind: "narrative",
    name: "The Pivot Moment",
    blurb: "A narrative shape for executives who know they need to move but haven't picked their ground. 5 moves, ~1,800 words.",
    moves: ["The world has changed", "Your category is bifurcating", "What you have that no one else does", "What's stopping you", "The 90-day proof"],
    duration: "8–10 days",
    uses: 41,
    tone: "Declarative, urgent, generous",
    bestFor: "Persona narratives where the buyer is sophisticated but stalled",
    accent: "amber",
  },
  {
    id: "tpl-narrative-flywheel",
    kind: "narrative",
    name: "The Flywheel",
    blurb: "A causal-loop narrative: trust earns data, data earns scale, scale earns more trust. 4 moves, diagram-led.",
    moves: ["The loop you're already in", "Where it stalls today", "What unlocks the next turn", "What 4 turns from now looks like"],
    duration: "6–8 days",
    uses: 19,
    tone: "Patient, systems-minded",
    bestFor: "Mature enterprises with operational complexity",
    accent: "lime",
  },
  {
    id: "tpl-narrative-foundation",
    kind: "narrative",
    name: "Build the Foundation",
    blurb: "For buyers who've been burned by AI hype. Frames AWS Bedrock as the boring infrastructure layer that makes everything else stop being scary.",
    moves: ["Why this isn't another AI conversation", "The four things you can't outsource", "Bedrock × your data × your VPC", "What you control, what we operate", "The pilot path"],
    duration: "8 days",
    uses: 27,
    tone: "Calm, technical, reassuring",
    bestFor: "Risk-averse CTOs and CISOs",
    accent: "blue",
  },
  {
    id: "tpl-narrative-decade",
    kind: "narrative",
    name: "Your Decade",
    blurb: "A long-horizon narrative for boards and CEO-level audiences. Frames the next 10 years, not the next quarter.",
    moves: ["What 2034 looks like for your category", "The compounding bet", "Why now, not in three years", "The ten-year asset you're building", "What's required of you in year one"],
    duration: "10–12 days",
    uses: 8,
    tone: "Patient, capital-allocator",
    bestFor: "CEO and board-level stakeholders",
    accent: "coral",
  },
  // Arc templates
  {
    id: "tpl-arc-3act",
    kind: "arc",
    name: "Three-Act Build",
    blurb: "Classic dramatic arc adapted to a 30-minute room. Setup → confrontation → resolution, mapped to before/now/next.",
    moves: ["Setup — the room they're in", "Confrontation — the thing they can't keep doing", "Resolution — what changes Monday"],
    duration: "5 days",
    uses: 52,
    tone: "Tight, dramatic",
    bestFor: "Most pitch contexts; safe default",
    accent: "amber",
  },
  {
    id: "tpl-arc-detective",
    kind: "arc",
    name: "The Detective",
    blurb: "Open with a mystery. Each move adds evidence. Land on the only conclusion the data supports.",
    moves: ["The anomaly", "What the data says", "What it doesn't say", "The reframe", "The verdict"],
    duration: "7 days",
    uses: 14,
    tone: "Forensic, evidence-led",
    bestFor: "Skeptical analyst-heavy rooms",
    accent: "blue",
  },
  {
    id: "tpl-arc-tour",
    kind: "arc",
    name: "The Tour",
    blurb: "Walk the audience through a real customer's journey. Built around a single hero artifact.",
    moves: ["Meet the customer", "The first call", "The first thirty days", "The inflection", "Where they are now"],
    duration: "4 days",
    uses: 23,
    tone: "Warm, narrative-led",
    bestFor: "Industry-vertical proof",
    accent: "coral",
  },
  // Storyboard templates
  {
    id: "tpl-sb-18",
    kind: "storyboard",
    name: "18-Card Standard",
    blurb: "The default storyboard: 6 sections × 3 cards each. Hook, premise, proof, choice, ask, close.",
    moves: ["Hook (3)", "Premise (3)", "Proof (3)", "Choice (3)", "Ask (3)", "Close (3)"],
    duration: "3 days",
    uses: 89,
    tone: "Versatile",
    bestFor: "30-minute keynotes, 24–28 slide decks",
    accent: "amber",
  },
  {
    id: "tpl-sb-12",
    kind: "storyboard",
    name: "12-Card Compact",
    blurb: "For 15-minute briefings. 4 sections × 3 cards. No padding, no recap slides.",
    moves: ["Setup (3)", "Insight (3)", "Choice (3)", "Close (3)"],
    duration: "2 days",
    uses: 34,
    tone: "Direct",
    bestFor: "Executive briefings, internal reviews",
    accent: "lime",
  },
  {
    id: "tpl-sb-24",
    kind: "storyboard",
    name: "24-Card Workshop",
    blurb: "For half-day workshops with build-along moments. Includes prompt cards and breakout slots.",
    moves: ["Frame (4)", "Show (6)", "Break (2)", "Build (6)", "Synthesize (4)", "Commit (2)"],
    duration: "5 days",
    uses: 7,
    tone: "Interactive",
    bestFor: "Design sessions, advisory days",
    accent: "blue",
  },
  // Deck
  {
    id: "tpl-deck-keynote",
    kind: "deck",
    name: "Keynote — Editorial",
    blurb: "Full-bleed imagery, oversized serif type, generous whitespace. Built for screen-first delivery.",
    moves: ["Title", "Section dividers (×4)", "Stat slides (×3)", "Pull-quote slides (×3)", "Diagram slides (×3)", "Close"],
    duration: "5 days",
    uses: 18,
    tone: "Cinematic",
    bestFor: "Keynote stages, conference talks",
    accent: "coral",
  },
  {
    id: "tpl-deck-briefing",
    kind: "deck",
    name: "Briefing — Document",
    blurb: "Dense, leave-behind-ready. Optimized for printed PDF and async forwarding.",
    moves: ["Cover", "TL;DR", "Context (×3)", "Recommendation (×3)", "Risks (×2)", "Next steps", "Appendix (×4)"],
    duration: "3 days",
    uses: 26,
    tone: "Document-mode",
    bestFor: "Pre-reads, board memos, async stakeholders",
    accent: "amber",
  },
];

function TemplatesPage({ onNav }) {
  const [filter, setFilter] = React.useState("all");
  const [previewId, setPreviewId] = React.useState(null);

  const visible = filter === "all" ? TEMPLATES : TEMPLATES.filter(t => t.kind === filter);
  const preview = previewId ? TEMPLATES.find(t => t.id === previewId) : null;

  return (
    <div className="dash-page templates-page">
      <section className="dash-hero">
        <div className="eyebrow">12 templates · curated by BLN24, refined by use</div>
        <h1 className="dash-greeting">
          Pick a <em>shape</em>.
          <br/>
          <span className="ink-soft">T24 fills it from your sources, decisions, and prior plays.</span>
        </h1>
        <p className="dash-sub" style={{ maxWidth: 720 }}>
          Templates aren't blanks. Each one ships with a tonal commitment, a move sequence, and a recommended audience.
          Anvil drafts into the shape; you reshape from there.
        </p>
      </section>

      <div className="tpl-toolbar">
        <div className="tpl-tabs">
          {TEMPLATE_CATEGORIES.map(c => (
            <button
              key={c.id}
              className={"tpl-tab " + (filter === c.id ? "active" : "")}
              onClick={() => setFilter(c.id)}
            >
              {c.label}
              <span className="count">{c.id === "all" ? TEMPLATES.length : TEMPLATES.filter(t => t.kind === c.id).length}</span>
            </button>
          ))}
        </div>
        <div className="tpl-toolbar-right">
          <button className="btn btn-ghost btn-sm"><Icon name="filter" size={13} />Sort</button>
          <button className="btn btn-accent btn-sm" onClick={() => onNav("create")}><Icon name="plus" size={13} />Start blank</button>
        </div>
      </div>

      <div className="tpl-grid">
        {visible.map(t => (
          <article key={t.id} className={"tpl-card tpl-accent-" + t.accent} onClick={() => setPreviewId(t.id)}>
            <div className="tpl-card-head">
              <span className="pill pill-muted">{t.kind}</span>
              <span className="muted mono tpl-uses">{t.uses}× used</span>
            </div>
            <h3 className="tpl-name">{t.name}</h3>
            <p className="tpl-blurb">{t.blurb}</p>
            <div className="tpl-moves">
              {t.moves.slice(0, 4).map((m, i) => (
                <div key={i} className="tpl-move">
                  <span className="tpl-move-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="tpl-move-label">{m}</span>
                </div>
              ))}
              {t.moves.length > 4 && <div className="tpl-move tpl-move-more">+{t.moves.length - 4} more</div>}
            </div>
            <div className="tpl-card-foot">
              <span><Icon name="clock" size={11}/> {t.duration}</span>
              <span className="tpl-tone">{t.tone}</span>
            </div>
          </article>
        ))}
      </div>

      {preview && <TemplatePreview tpl={preview} onClose={() => setPreviewId(null)} onUse={() => onNav("create")} />}
    </div>
  );
}

function TemplatePreview({ tpl, onClose, onUse }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="tpl-preview-overlay" onClick={onClose}>
      <div className={"tpl-preview tpl-accent-" + tpl.accent} onClick={e => e.stopPropagation()}>
        <header className="tpl-preview-head">
          <div>
            <div className="eyebrow">{tpl.kind} template</div>
            <h2 className="tpl-preview-name">{tpl.name}</h2>
          </div>
          <button className="btn-quiet btn-sm" onClick={onClose}><Icon name="x" size={14}/></button>
        </header>

        <div className="tpl-preview-body">
          <div className="tpl-preview-main">
            <p className="tpl-preview-blurb">{tpl.blurb}</p>

            <div className="tpl-preview-section">
              <h4>Move sequence</h4>
              <ol className="tpl-preview-moves">
                {tpl.moves.map((m, i) => (
                  <li key={i}>
                    <span className="tpl-move-num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="tpl-preview-side">
            <div className="tpl-preview-meta">
              <div className="tpl-meta-row"><span className="muted">Tone</span><span>{tpl.tone}</span></div>
              <div className="tpl-meta-row"><span className="muted">Best for</span><span>{tpl.bestFor}</span></div>
              <div className="tpl-meta-row"><span className="muted">Typical duration</span><span>{tpl.duration}</span></div>
              <div className="tpl-meta-row"><span className="muted">Used by BLN24</span><span>{tpl.uses}×</span></div>
            </div>
            <button className="btn btn-accent" style={{ width: "100%" }} onClick={onUse}>
              <Icon name="plus" size={13}/> Start play from this template
            </button>
            <button className="btn btn-ghost" style={{ width: "100%" }} onClick={onClose}>
              Keep browsing
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

window.TemplatesPage = TemplatesPage;
