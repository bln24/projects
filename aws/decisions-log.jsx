/* global React */

/* Parse decisions.md — entries are split on '## D-NNN — ' headers */
function parseDecisions(md) {
  const out = [];
  // Split on headers like "## D-007 — Title" or "## D-007 - Title"
  const re = /^##\s+(D-\d+)\s*[—-]\s*(.+?)\s*$/gm;
  const matches = [];
  let m;
  while ((m = re.exec(md)) !== null) {
    matches.push({ id: m[1], title: m[2], start: m.index, headEnd: re.lastIndex });
  }
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const next = matches[i + 1];
    const body = md.slice(cur.headEnd, next ? next.start : md.length).trim();
    // Pull bold-prefixed fields: **When:**, **By:**, **Move(s) affected:**, etc.
    const get = (label) => {
      const r = new RegExp(`\\*\\*${label}\\*\\*\\s*([^\\n]+)`, "i");
      const match = body.match(r);
      return match ? match[1].trim() : "";
    };
    const when = get("When:");
    const by = get("By:");
    const moves = get("Move\\(s\\) affected:") || get("Moves affected:");
    const why = get("Why:");
    const tradeoff = get("Trade-off accepted:") || get("Tradeoff:");
    const reversible = get("Reversible\\?");

    // Strip the field lines from body to get any extra prose (rare)
    out.push({
      id: cur.id,
      title: cur.title,
      when, by, moves, why, tradeoff, reversible,
    });
  }
  return out;
}

/* Map move references like "Move 4", "Moves 1, 3" to highlight chips */
function parseMoves(str) {
  if (!str) return [];
  const nums = (str.match(/\b(\d+)\b/g) || []).map(n => parseInt(n, 10));
  // dedupe + sort
  return [...new Set(nums)].sort((a, b) => a - b);
}

/* Map by field to person glyph/color */
const DECIDER_META = {
  Angie:   { color: "#f4b73f", initials: "AP", role: "PM Lead" },
  Stephen: { color: "#7aa7ff", initials: "SY", role: "Consultant" },
  Michael: { color: "#9bd17a", initials: "MK", role: "Visual Lead" },
  Mira:    { color: "#d6786a", initials: "MR", role: "Strategist" },
  Scout:   { color: "#7aa7ff", role: "research agent", glyph: "*" },
  Anvil:   { color: "#f4b73f", role: "structure agent", glyph: "+" },
  Scribe:  { color: "#9bd17a", role: "voice agent", glyph: "~" },
};

function decoderForBy(by) {
  // "Stephen (with Angie's sign-off)" → primary = Stephen
  // "Stephen + Anvil" → primary = Stephen, secondary = Anvil
  // "Stephen + Angie (joint call)" → primary = Stephen, secondary = Angie
  if (!by) return { names: [] };
  const names = [];
  for (const key of Object.keys(DECIDER_META)) {
    if (by.includes(key)) names.push(key);
  }
  return { names };
}

function DecisionsLog({ filterMove }) {
  const [items, setItems] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [expanded, setExpanded] = React.useState({});

  React.useEffect(() => {
    let cancelled = false;
    fetch("play-kit/memory/decisions.md")
      .then(r => r.ok ? r.text() : Promise.reject(r.status))
      .then(md => { if (!cancelled) setItems(parseDecisions(md)); })
      .catch(err => { if (!cancelled) setError(String(err)); });
    return () => { cancelled = true; };
  }, []);

  if (error) {
    return (
      <div className="dec-state dec-state-err">
        Couldn't load decisions.md ({error}).<br/>
        <span className="muted">In production, this fetches from your play-kit on Mac mini.</span>
      </div>
    );
  }
  if (!items) return <div className="dec-state">Loading…</div>;

  const visible = filterMove
    ? items.filter(d => parseMoves(d.moves).includes(filterMove))
    : items;

  if (visible.length === 0) {
    return (
      <div className="dec-state">
        <div style={{ fontFamily: "var(--display)", fontSize: 20, marginBottom: 6 }}>No decisions yet.</div>
        <div className="muted" style={{ fontSize: 13 }}>
          When the team makes a non-obvious choice, it lands here.
          {filterMove && <> No decisions touch Move {filterMove}.</>}
        </div>
      </div>
    );
  }

  return (
    <div className="dec-list">
      <div className="dec-head">
        <div className="dec-eyebrow">PLAY KIT · DECISION LOG</div>
        <p className="dec-sub">
          Why moves ended up the way they did. Sourced from <code>memory/decisions.md</code>.
          {filterMove && <> Filtered to Move {filterMove}.</>}
        </p>
      </div>

      {visible.map(d => {
        const moves = parseMoves(d.moves);
        const deciders = decoderForBy(d.by).names;
        const isReversible = (d.reversible || "").toLowerCase().startsWith("y");
        const isPartial = (d.reversible || "").toLowerCase().startsWith("p");
        const isOpen = expanded[d.id];
        return (
          <article key={d.id} className={"dec-item " + (isOpen ? "is-open" : "")}>
            <header className="dec-item-head" onClick={() => setExpanded(s => ({ ...s, [d.id]: !s[d.id] }))}>
              <div className="dec-item-id-block">
                <code className="dec-item-id">{d.id}</code>
                <h4 className="dec-item-title">{d.title}</h4>
              </div>
              <div className="dec-item-meta">
                {moves.length > 0 && (
                  <div className="dec-moves">
                    {moves.map(n => <span key={n} className="dec-move-chip">M{n}</span>)}
                  </div>
                )}
                <span className={"dec-rev " + (isReversible ? "rev-y" : isPartial ? "rev-p" : "rev-n")}>
                  {isReversible ? "reversible" : isPartial ? "partial" : "locked"}
                </span>
              </div>
            </header>

            <div className="dec-item-row dec-deciders">
              {deciders.length > 0 ? deciders.map(name => {
                const meta = DECIDER_META[name];
                const isAgent = !!meta.glyph;
                return (
                  <span key={name} className="dec-decider">
                    {isAgent ? (
                      <span className="dec-glyph" style={{ color: meta.color }}>{meta.glyph}</span>
                    ) : (
                      <span className="avatar avatar-sm" style={{ background: meta.color, color: "#0c0b08" }}>{meta.initials}</span>
                    )}
                    <span><strong>{name}</strong> <span className="muted">— {meta.role}</span></span>
                  </span>
                );
              }) : <span className="muted">{d.by}</span>}
              <span className="dec-when">{d.when}</span>
            </div>

            <div className="dec-why">{d.why}</div>

            {isOpen && (
              <div className="dec-detail">
                {d.tradeoff && (
                  <div className="dec-block">
                    <div className="dec-block-label">Trade-off accepted</div>
                    <p>{d.tradeoff}</p>
                  </div>
                )}
                {d.moves && (
                  <div className="dec-block">
                    <div className="dec-block-label">Moves affected</div>
                    <p>{d.moves}</p>
                  </div>
                )}
                {d.reversible && (
                  <div className="dec-block">
                    <div className="dec-block-label">Reversible?</div>
                    <p>{d.reversible}</p>
                  </div>
                )}
              </div>
            )}

            <button className="dec-expand-toggle" onClick={() => setExpanded(s => ({ ...s, [d.id]: !s[d.id] }))}>
              {isOpen ? "Less" : "More"}
            </button>
          </article>
        );
      })}
    </div>
  );
}

window.DecisionsLog = DecisionsLog;
