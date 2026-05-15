/* global React, Icon, NARRATIVE, STORYBOARD */
/* Narrative · Arc · Storyboard rendering views.
   Restored May 15, 2026 — calibrated to v3 deck standard. */

/* ─── Shared primitives ─── */
function SbRail({ n, section, brand, page, total }) {
  return (
    <header className="sb-card-rail">
      <div className="sb-card-num">{n}</div>
      <div className="sb-card-section">{section}</div>
      <div className="sb-card-brand">{brand}</div>
      <div className="sb-card-pageof">{String(page).padStart(2,"0")} / {String(total).padStart(2,"0")}</div>
    </header>
  );
}

/* ─── Card visual primitives ─── */
function CardVisual({ card }) {
  switch (card.kind) {
    case "intro":
      return (
        <div className="sb-vis sb-vis-intro">
          {(card.sequence || []).map((s, i) => (
            <div key={i} className="sb-intro-row">
              <div className="sb-intro-row-left">
                <div className="sb-intro-row-n">{s.n}</div>
                <div className="sb-intro-row-name">{s.label}</div>
              </div>
              <p className="sb-intro-row-body">{s.body}</p>
            </div>
          ))}
        </div>
      );
    case "stats":
      return (
        <div className="sb-vis sb-vis-stats">
          {(card.stats || []).map((s, i) => (
            <div key={i} className="sb-stat">
              <div className="sb-stat-big">{s.big}</div>
              <div className="sb-stat-body">{s.body}</div>
            </div>
          ))}
        </div>
      );
    case "twoCol":
      return (
        <div className="sb-vis sb-vis-twocol">
          {(card.cols || []).map((col, i) => (
            <div key={i} className="sb-twocol-col">
              <div className="sb-twocol-tag">{col.tag}</div>
              <div className="sb-twocol-name">{col.name}</div>
              <div className="sb-twocol-rows">
                {(col.rows || []).map((r, j) => (
                  <div key={j} className="sb-twocol-row">
                    <div className="sb-twocol-row-label">{r.label}</div>
                    <div className="sb-twocol-row-body">{r.body}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "maturity":
      return (
        <div className="sb-vis sb-vis-maturity">
          <div className="sb-mat-axis">
            <span>LOW AUTONOMY</span><span className="sb-mat-axis-line" /><span>HIGH AUTONOMY</span>
          </div>
          <div className="sb-mat-stages">
            {(card.stages || []).map((s, i) => (
              <div key={i} className="sb-mat-stage">
                <div className="sb-mat-stage-head">
                  <span className="sb-mat-stage-n">Stage {s.n}</span>
                  <div className="sb-mat-stage-name">{s.name}</div>
                  <div className="sb-mat-stage-sub">{s.sub}</div>
                </div>
                <div className="sb-mat-row"><div className="sb-mat-row-tag">INTERNAL</div><p>{s.internal}</p></div>
                <div className="sb-mat-row"><div className="sb-mat-row-tag">EXTERNAL</div><p>{s.external}</p></div>
                <div className="sb-mat-gov"><span className="sb-mat-gov-tag">GOVERNANCE</span><span>{s.gov}</span></div>
              </div>
            ))}
          </div>
          {card.reframe && (
            <div className="sb-block sb-block--kicker">
              <div className="sb-block-label">The reframe</div>
              <p className="sb-block-body sb-block-body--italic">{card.reframe}</p>
            </div>
          )}
        </div>
      );
    case "gapsGrid":
      return (
        <div className="sb-vis sb-vis-gaps">
          {(card.gaps || []).map((g, i) => (
            <div key={i} className={"sb-gap" + (g.subtle ? " is-subtle" : "")}>
              <div className="sb-gap-n">{g.n}</div>
              <div className="sb-gap-name">{g.name}</div>
              <p className="sb-gap-stat">{g.stat}</p>
            </div>
          ))}
        </div>
      );
    case "gapDetail":
      return (
        <div className="sb-vis sb-vis-gapdetail">
          <div className="sb-gd-row"><div className="sb-gd-label">Data</div><p>{card.data}</p></div>
          <div className="sb-gd-row"><div className="sb-gd-label">The objection</div><p><strong>{card.voice && card.voice.who}</strong> — {card.voice && card.voice.body}</p></div>
          <div className="sb-gd-row sb-gd-answer"><div className="sb-gd-label">AWS answer</div><p>{card.answer}</p></div>
          <div className="sb-gd-meta">
            <div className="sb-gd-meta-row"><span className="sb-gd-meta-label">Persona</span><span>{card.persona}</span></div>
            <div className="sb-gd-meta-row"><span className="sb-gd-meta-label">{card.pilotLabel || "Enabler status"}</span><span>{card.pilot}</span></div>
          </div>
        </div>
      );
    case "proof":
      return (
        <div className="sb-vis sb-vis-proof">
          {(card.steps || []).map((s, i) => (
            <React.Fragment key={i}>
              <div className="sb-proof-step">
                <div className="sb-proof-n">{s.n}</div>
                <div className="sb-proof-name">{s.name}</div>
                <p className="sb-proof-body">{s.body}</p>
                <div className="sb-proof-result"><span className="sb-proof-result-label">Result</span><span>{s.result}</span></div>
                <div className="sb-proof-closes">{s.closes}</div>
              </div>
              {i < card.steps.length - 1 && <div className="sb-proof-arrow">→</div>}
            </React.Fragment>
          ))}
        </div>
      );
    case "sequence":
      return (
        <div className="sb-vis sb-vis-seq">
          {(card.phases || []).map((p, i) => (
            <div key={i} className="sb-seq-phase">
              <div className="sb-seq-phase-head">
                <span className="sb-seq-phase-n">{p.n}</span>
                <div className="sb-seq-phase-name">{p.name}</div>
              </div>
              <ul>{(p.items || []).map((it, j) => <li key={j}>{it}</li>)}</ul>
              <div className="sb-seq-meta">
                <div><span>Closes</span>{p.closes}</div>
                <div><span>Mandate</span>{p.mandate}</div>
              </div>
            </div>
          ))}
        </div>
      );
    case "options":
      return (
        <div className="sb-vis sb-vis-options">
          {(card.options || []).map((o, i) => (
            <div key={i} className="sb-option">
              <div className="sb-option-tag">{o.name}</div>
              <div className="sb-option-title">{o.title}</div>
              <div className="sb-option-row"><span>Scope</span><p>{o.scope}</p></div>
              <div className="sb-option-row"><span>Duration</span><p>{o.duration}</p></div>
              <div className="sb-option-row"><span>Evidence produced</span><p>{o.evidence}</p></div>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

/* ─── StoryCard ─── */
function StoryCard({ card, index, total }) {
  return (
    <article className={"sb-card sb-card--" + card.kind}>
      <SbRail n={card.n} section={card.section} brand="CAIO ELEVATE · STORYBOARD" page={index} total={total} />
      <h2 className="sb-card-title">{card.title}</h2>
      {card.tagline && <p className="sb-card-tagline">{card.tagline}</p>}
      {card.lead && <p className="sb-card-lead">{card.lead}</p>}
      {card.goal && <div className="sb-block"><div className="sb-block-label">Seller's goal</div><p className="sb-block-body">{card.goal}</p></div>}
      {card.visualLabel && <div className="sb-block"><div className="sb-block-label sb-block-label--visual">{card.visualLabel}</div><CardVisual card={card} /></div>}
      {!card.visualLabel && <CardVisual card={card} />}
      {card.kicker && <div className="sb-block sb-block--kicker"><div className="sb-block-label">{card.kickerLabel || "The line"}</div><p className="sb-block-body sb-block-body--italic">{card.kicker}</p></div>}
      {card.ask && <div className="sb-block sb-block--ask"><div className="sb-block-label">Ask the room</div><p className="sb-block-body sb-block-body--italic">"{card.ask}"</p></div>}
      {card.footnote && <p className="sb-card-footnote"><span className="sb-footnote-tag">Note</span>{card.footnote}</p>}
      {card.source && <p className="sb-card-source">{card.source}</p>}
    </article>
  );
}

/* ─── Storyboard ─── */
function Storyboard({ data }) {
  const d = data || window.STORYBOARD;
  if (!d) return <div className="sb-loading">Storyboard loading…</div>;
  return (
    <div className="bln-doc storyboard-doc">
      <header className="bln-cover storyboard-cover">
        <div className="bln-cover-tag">{d.header}</div>
        <h1 className="bln-cover-title">{d.subhead}</h1>
        <div className="bln-cover-rule" />
        <p className="bln-cover-sub">{d.intro}</p>
        <p className="bln-cover-attr">v3 · {d.cards.length} cards · approved standard</p>
      </header>
      <div className="sb-cards">
        {d.cards.map((c, i) => <StoryCard key={i} card={c} index={i + 1} total={d.cards.length} />)}
      </div>
      <div className="bln-foot">End of storyboard · Stage III approved</div>
    </div>
  );
}

/* ─── NarrativePaper ─── */
function NarrativePaper({ data }) {
  const d = data || window.NARRATIVE;
  if (!d) return <div className="sb-loading">Narrative loading…</div>;
  return (
    <div className="bln-doc storyboard-doc narrative-doc-cards">
      <header className="bln-cover storyboard-cover">
        <div className="bln-cover-tag">{d.eyebrow}</div>
        <h1 className="bln-cover-title">{d.title}</h1>
        <div className="bln-cover-rule" />
        <p className="bln-cover-sub">{d.subtitle}</p>
        <p className="bln-cover-attr">{d.attribution}</p>
      </header>
      <div className="sb-cards">
        {/* Purpose */}
        <article className="sb-card sb-card--narrative">
          <SbRail n="P0" section="Working paper · purpose" brand="CAIO ELEVATE · NARRATIVE" page={1} total={d.arc.moves.length + 4} />
          <h2 className="sb-card-title">Purpose</h2>
          <div className="sb-block"><div className="sb-block-label sb-block-label--visual">What this document is for</div>
            <div className="sb-vis sb-vis-prose">{d.purpose.body.map((p, i) => <p key={i} className="sb-prose-p">{p}</p>)}</div>
          </div>
        </article>
        {/* Principles */}
        <article className="sb-card sb-card--narrative">
          <SbRail n="P1" section="Working paper · design principles" brand="CAIO ELEVATE · NARRATIVE" page={2} total={d.arc.moves.length + 4} />
          <h2 className="sb-card-title">{d.principles.label}</h2>
          <div className="sb-block"><div className="sb-block-label sb-block-label--visual">Five rules</div>
            <div className="sb-vis sb-vis-principles">
              {d.principles.items.map((it, i) => (
                <div key={i} className="sb-principle">
                  <div className="sb-principle-n">P{String(i+1).padStart(2,"0")}</div>
                  <div className="sb-principle-name">{it.name}</div>
                  <p className="sb-principle-body">{it.body}</p>
                  {it.attribution && <p className="sb-principle-attr">— {it.attribution}</p>}
                </div>
              ))}
            </div>
          </div>
        </article>
        {/* Moves */}
        {d.arc.moves.map((m, i) => (
          <article key={i} className="sb-card sb-card--narrative">
            <SbRail n={"M" + String(m.n).padStart(2,"0")} section={"Narrative arc · move " + String(m.n).padStart(2,"0") + " · " + m.time} brand="CAIO ELEVATE · NARRATIVE" page={i + 3} total={d.arc.moves.length + 4} />
            <h2 className="sb-card-title">{m.title}</h2>
            <div className="sb-block"><div className="sb-block-label sb-block-label--visual">Move blocks · {m.time}</div>
              <div className="sb-vis sb-vis-moveblocks">
                {m.blocks.map((b, j) => (
                  <div key={j} className={"sb-moveblock" + (b.highlight ? " is-highlight" : "")}>
                    <div className="sb-moveblock-label">{b.label}{b.commentRef && <span className="nd-comment-ref">{b.commentRef}</span>}</div>
                    <p className={"sb-moveblock-body" + (b.italic ? " is-italic" : "")}>{b.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
        {/* Slide list + Takeaways */}
        <article className="sb-card sb-card--narrative">
          <SbRail n="L1" section="Working paper · structure" brand="CAIO ELEVATE · NARRATIVE" page={d.arc.moves.length + 3} total={d.arc.moves.length + 4} />
          <h2 className="sb-card-title">{d.slideList.label}</h2>
          <div className="sb-block"><div className="sb-block-label sb-block-label--visual">{d.slideList.sublabel}</div>
            <div className="sb-vis sb-vis-twolists">
              <div className="sb-twolists-col">
                <div className="sb-twolists-tag">{d.slideList.sublabel}</div>
                <ol className="sb-twolists-num">{d.slideList.items.map((it, i) => <li key={i}><span className="sb-twolists-n">{String(i+1).padStart(2,"0")}</span><span>{it}</span></li>)}</ol>
              </div>
              <div className="sb-twolists-col">
                <div className="sb-twolists-tag">{d.appendix.label} · {d.appendix.sublabel}</div>
                <ul className="sb-twolists-bullets">{d.appendix.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
              </div>
            </div>
          </div>
        </article>
        <article className="sb-card sb-card--narrative">
          <SbRail n="T1" section="Working paper · takeaways" brand="CAIO ELEVATE · NARRATIVE" page={d.arc.moves.length + 4} total={d.arc.moves.length + 4} />
          <h2 className="sb-card-title">{d.takeaways.label}</h2>
          <div className="sb-block"><div className="sb-block-label sb-block-label--visual">Exit criteria — eight beliefs</div>
            <div className="sb-vis sb-vis-takeaways">{d.takeaways.items.map((t, i) => <div key={i} className="sb-take"><div className="sb-take-n">{String(i+1).padStart(2,"0")}</div><p>{t}</p></div>)}</div>
          </div>
        </article>
      </div>
      <div className="bln-foot">End of narrative · Stage I approved</div>
    </div>
  );
}

/* ─── NarrativeArc ─── */
function NarrativeArc({ data }) {
  const d = data || window.NARRATIVE;
  if (!d) return <div className="sb-loading">Arc loading…</div>;
  return (
    <div className="bln-doc storyboard-doc arc-doc-cards">
      <header className="bln-cover storyboard-cover">
        <div className="bln-cover-tag">Narrative arc · v3</div>
        <h1 className="bln-cover-title">{d.title}</h1>
        <div className="bln-cover-rule" />
        <p className="bln-cover-sub">{d.arc.intro}</p>
        <p className="bln-cover-attr">{d.attribution}</p>
      </header>
      <article className="sb-card sb-card--arc-meta">
        <SbRail n="00" section="Narrative arc · meta" brand="CAIO ELEVATE · ARC" page={1} total={d.arc.moves.length + 1} />
        <h2 className="sb-card-title">A 45–60 minute walk in seven moves</h2>
        <div className="sb-block"><div className="sb-block-label">Intro</div><p className="sb-block-body">{d.arc.intro}</p></div>
        <div className="sb-block"><div className="sb-block-label sb-block-label--visual">Arc summary</div>
          <div className="sb-vis sb-vis-arcmeta">
            <div className="sb-arcmeta"><span>Total runway</span><strong>45–60 min</strong></div>
            <div className="sb-arcmeta"><span>Moves</span><strong>{d.arc.moves.length}</strong></div>
            <div className="sb-arcmeta"><span>Branch point</span><strong>Move 05</strong></div>
            <div className="sb-arcmeta"><span>Welded answer</span><strong>Move 05 → 06</strong></div>
          </div>
        </div>
      </article>
      <div className="sb-cards">
        {d.arc.moves.map((m, i) => {
          const what   = m.blocks.find(b => /what the seller does/i.test(b.label));
          const why    = m.blocks.find(b => /why|fulcrum|critical/i.test(b.label));
          const branch = m.blocks.find(b => /branch|reads the room/i.test(b.label));
          const rest   = m.blocks.filter(b => b !== what && b !== why && b !== branch);
          return (
            <article key={i} className="sb-card sb-card--arc-move">
              <SbRail n={String(m.n).padStart(2,"0")} section={"Narrative arc · move " + String(m.n).padStart(2,"0") + " · " + m.time} brand="CAIO ELEVATE · ARC" page={i + 2} total={d.arc.moves.length + 1} />
              <h2 className="sb-card-title">{m.title}</h2>
              {what && <div className="sb-block"><div className="sb-block-label">Seller's goal</div><p className="sb-block-body">{what.body}</p></div>}
              <div className="sb-block"><div className="sb-block-label sb-block-label--visual">Move blocks</div>
                <div className="sb-vis sb-vis-moveblocks">
                  {[why, branch, ...rest].filter(Boolean).map((b, j) => (
                    <div key={j} className={"sb-moveblock" + (b.highlight ? " is-highlight" : "") + (b === branch ? " is-branch" : "")}>
                      <div className="sb-moveblock-label">{b === branch ? "Branch point" : b.label}{b.commentRef && <span className="nd-comment-ref">{b.commentRef}</span>}</div>
                      <p className={"sb-moveblock-body" + (b.italic ? " is-italic" : "")}>{b.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="bln-foot">End of arc · Stage II approved</div>
    </div>
  );
}

window.NarrativePaper = NarrativePaper;
window.NarrativeArc   = NarrativeArc;
window.Storyboard     = Storyboard;
