/* global React, Icon, NARRATIVE, STORYBOARD */
/* Document-quality NarrativePaper, Storyboard, and Arc — modeled exactly on the
   CAIO Elevate gold-standard storyboard format:
   number → section · subsection → brand tag → BIG TITLE → SELLER'S GOAL → VISUAL — [LABEL]
   → visual → kicker (bold caps eyebrow + italic body) → modular insert → italic source.
*/

/* ============================ NARRATIVE PAPER ============================
   Working-paper / specification voice. Same editorial chrome as the storyboard
   so all three artifacts (narrative, arc, storyboard) read like one document.
*/
function NarrativePaper({ data }) {
  // Render as storyboard-style cards so narrative · arc · storyboard share one document language.
  const cards = [];

  cards.push({
    n: "00",
    section: "Working paper · purpose",
    title: "What this document is for",
    goal: "Lock the purpose of the deck before the writing starts. Every later card pays a debt to this one.",
    visualLabel: "Visual — Purpose statement",
    proseBlocks: data.purpose.body,
  });

  cards.push({
    n: "P0",
    section: "Working paper · design principles",
    title: data.principles.label,
    goal: "Five rules the deck must obey. They govern voice, pacing, modularity, and what counts as a finished slide.",
    visualLabel: "Visual — Five principles",
    principles: data.principles.items,
  });

  data.arc.moves.forEach((m, i) => {
    cards.push({
      n: "M" + String(m.n).padStart(2, "0"),
      section: "Narrative arc · move " + String(m.n).padStart(2, "0"),
      title: m.title,
      goal: (m.blocks.find(b => /what the seller does/i.test(b.label)) || {}).body || "",
      visualLabel: "Visual — Move blocks · " + m.time,
      moveBlocks: m.blocks,
      time: m.time,
    });
  });

  cards.push({
    n: "L1",
    section: "Working paper · structure",
    title: data.slideList.label,
    goal: "The 12-card spine + the appendix that gets pulled forward live, not walked linearly.",
    visualLabel: "Visual — Spine + appendix",
    twoLists: { left: data.slideList, right: data.appendix },
  });

  cards.push({
    n: "T1",
    section: "Working paper · takeaways",
    title: data.takeaways.label,
    goal: "What the CAIO should hold in their head walking out — the test for whether the deck did its job.",
    visualLabel: "Visual — Eight takeaways",
    takeawayList: data.takeaways.items,
  });

  return (
    <div className="bln-doc storyboard-doc narrative-doc-cards">
      <header className="bln-cover storyboard-cover">
        <div className="bln-cover-tag">{data.eyebrow}</div>
        <h1 className="bln-cover-title">{data.title}</h1>
        <div className="bln-cover-rule" />
        <p className="bln-cover-sub">{data.subtitle}</p>
        <p className="bln-cover-attr">{data.attribution}</p>
      </header>

      <div className="sb-cards">
        {cards.map((c, i) => (
          <NarrativeCard key={i} card={c} index={i + 1} total={cards.length} />
        ))}
      </div>

      <div className="bln-foot">
        End of draft · approve to advance to <em>Stage III — Storyboard</em>
      </div>
    </div>
  );
}

function NarrativeCard({ card, index, total }) {
  return (
    <article className="sb-card sb-card--narrative">
      <header className="sb-card-rail">
        <div className="sb-card-num">{card.n}</div>
        <div className="sb-card-section">{card.section}</div>
        <div className="sb-card-brand">CAIO ELEVATE · NARRATIVE</div>
        <div className="sb-card-pageof">{String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
      </header>

      <h2 className="sb-card-title">{card.title}</h2>

      {card.goal && (
        <div className="sb-block">
          <div className="sb-block-label">Seller's goal</div>
          <p className="sb-block-body">{card.goal}</p>
        </div>
      )}

      {card.visualLabel && (
        <div className="sb-block">
          <div className="sb-block-label sb-block-label--visual">{card.visualLabel}</div>
          <NarrativeVisual card={card} />
        </div>
      )}
    </article>
  );
}

function NarrativeVisual({ card }) {
  if (card.proseBlocks) {
    return (
      <div className="sb-vis sb-vis-prose">
        {card.proseBlocks.map((p, i) => <p key={i} className="sb-prose-p">{p}</p>)}
      </div>
    );
  }
  if (card.principles) {
    return (
      <div className="sb-vis sb-vis-principles">
        {card.principles.map((it, i) => (
          <div key={i} className="sb-principle">
            <div className="sb-principle-n">P{String(i + 1).padStart(2, "0")}</div>
            <div className="sb-principle-name">
              {it.name}
              {it.commentRef && <span className="nd-comment-ref">{it.commentRef}</span>}
            </div>
            <p className="sb-principle-body">{it.body}</p>
            {it.attribution && <p className="sb-principle-attr">— {it.attribution}</p>}
          </div>
        ))}
      </div>
    );
  }
  if (card.moveBlocks) {
    return (
      <div className="sb-vis sb-vis-moveblocks">
        {card.moveBlocks.map((b, j) => (
          <div key={j} className={"sb-moveblock" + (b.highlight ? " is-highlight" : "")}>
            <div className="sb-moveblock-label">
              {b.label}
              {b.commentRef && <span className="nd-comment-ref">{b.commentRef}</span>}
            </div>
            <p className={"sb-moveblock-body" + (b.italic ? " is-italic" : "")}>{b.body}</p>
          </div>
        ))}
      </div>
    );
  }
  if (card.twoLists) {
    return (
      <div className="sb-vis sb-vis-twolists">
        <div className="sb-twolists-col">
          <div className="sb-twolists-tag">{card.twoLists.left.sublabel}</div>
          <ol className="sb-twolists-num">
            {card.twoLists.left.items.map((it, i) => (
              <li key={i}><span className="sb-twolists-n">{String(i + 1).padStart(2, "0")}</span><span>{it}</span></li>
            ))}
          </ol>
        </div>
        <div className="sb-twolists-col">
          <div className="sb-twolists-tag">{card.twoLists.right.label} · {card.twoLists.right.sublabel}</div>
          <ul className="sb-twolists-bullets">
            {card.twoLists.right.items.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </div>
      </div>
    );
  }
  if (card.takeawayList) {
    return (
      <div className="sb-vis sb-vis-takeaways">
        {card.takeawayList.map((t, i) => (
          <div key={i} className="sb-take">
            <div className="sb-take-n">{String(i + 1).padStart(2, "0")}</div>
            <p>{t}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

/* ============================ ARC VIEW ============================
   The narrative reduced to a single-page flow chart, before the cards
   are written. Same paper, same chrome — rows are the moves, with
   pacing, branch points, and the gap each move closes.
*/
function NarrativeArc({ data }) {
  // One card per move, in the same storyboard chrome.
  return (
    <div className="bln-doc storyboard-doc arc-doc-cards">
      <header className="bln-cover storyboard-cover">
        <div className="bln-cover-tag">Narrative arc · v3</div>
        <h1 className="bln-cover-title">{data.title}</h1>
        <div className="bln-cover-rule" />
        <p className="bln-cover-sub">{data.arc.intro}</p>
        <p className="bln-cover-attr">{data.attribution}</p>
      </header>

      <article className="sb-card sb-card--arc-meta">
        <header className="sb-card-rail">
          <div className="sb-card-num">00</div>
          <div className="sb-card-section">Narrative arc · meta</div>
          <div className="sb-card-brand">CAIO ELEVATE · ARC</div>
          <div className="sb-card-pageof">00 / {String(data.arc.moves.length + 1).padStart(2, "0")}</div>
        </header>
        <h2 className="sb-card-title">A 45–60 minute walk in seven moves</h2>
        <div className="sb-block">
          <div className="sb-block-label">Seller's goal</div>
          <p className="sb-block-body">{data.arc.intro}</p>
        </div>
        <div className="sb-block">
          <div className="sb-block-label sb-block-label--visual">Visual — Arc summary</div>
          <div className="sb-vis sb-vis-arcmeta">
            <div className="sb-arcmeta"><span>Total runway</span><strong>45–60 min</strong></div>
            <div className="sb-arcmeta"><span>Moves</span><strong>{data.arc.moves.length}</strong></div>
            <div className="sb-arcmeta"><span>Branch point</span><strong>Move 02</strong></div>
            <div className="sb-arcmeta"><span>Welded answer</span><strong>Move 04 → 05</strong></div>
          </div>
        </div>
      </article>

      <div className="sb-cards">
        {data.arc.moves.map((m, i) => {
          const what = m.blocks.find(b => /what the seller does/i.test(b.label));
          const why = m.blocks.find(b => /why|fulcrum|critical|note/i.test(b.label));
          const branch = m.blocks.find(b => /branch|reads the room|pacing/i.test(b.label));
          const rest = m.blocks.filter(b => b !== what && b !== why && b !== branch);
          return (
            <article key={i} className="sb-card sb-card--arc-move">
              <header className="sb-card-rail">
                <div className="sb-card-num">{String(m.n).padStart(2, "0")}</div>
                <div className="sb-card-section">Narrative arc · move {String(m.n).padStart(2, "0")} · {m.time}</div>
                <div className="sb-card-brand">CAIO ELEVATE · ARC</div>
                <div className="sb-card-pageof">{String(i + 2).padStart(2, "0")} / {String(data.arc.moves.length + 1).padStart(2, "0")}</div>
              </header>
              <h2 className="sb-card-title">{m.title}</h2>
              {what && (
                <div className="sb-block">
                  <div className="sb-block-label">Seller's goal</div>
                  <p className="sb-block-body">{what.body}</p>
                </div>
              )}
              <div className="sb-block">
                <div className="sb-block-label sb-block-label--visual">Visual — Move blocks</div>
                <div className="sb-vis sb-vis-moveblocks">
                  {(why ? [why] : []).concat(branch ? [branch] : []).concat(rest).map((b, j) => (
                    <div key={j} className={"sb-moveblock" + (b.highlight ? " is-highlight" : "") + (b === branch ? " is-branch" : "")}>
                      <div className="sb-moveblock-label">
                        {b === branch ? "Branch point" : b.label}
                        {b.commentRef && <span className="nd-comment-ref">{b.commentRef}</span>}
                      </div>
                      <p className={"sb-moveblock-body" + (b.italic ? " is-italic" : "")}>{b.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="bln-foot">
        End of arc · approve to advance to <em>Stage III — Storyboard</em>
      </div>
    </div>
  );
}

/* ============================ STORYBOARD ============================ */

function Storyboard({ data }) {
  return (
    <div className="bln-doc storyboard-doc">
      <header className="bln-cover storyboard-cover">
        <div className="bln-cover-tag">{data.header}</div>
        <h1 className="bln-cover-title">{data.subhead}</h1>
        <div className="bln-cover-rule" />
        <p className="bln-cover-sub">{data.intro}</p>
        <p className="bln-cover-attr">v3 · {data.cards.length} cards · approved structure</p>
      </header>

      <div className="sb-cards">
        {data.cards.map((c, i) => (
          <StoryCard key={i} card={c} index={i + 1} total={data.cards.length} />
        ))}
      </div>

      <div className="bln-foot">
        End of storyboard · approve to advance to <em>Stage IV — Deck</em>
      </div>
    </div>
  );
}

function StoryCard({ card, index, total }) {
  return (
    <article className={"sb-card sb-card--" + card.kind}>
      <header className="sb-card-rail">
        <div className="sb-card-num">{card.n}</div>
        <div className="sb-card-section">{card.section}</div>
        <div className="sb-card-brand">CAIO ELEVATE · STORYBOARD</div>
        <div className="sb-card-pageof">{String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
      </header>

      <h2 className="sb-card-title">
        {card.title}
        {card.titleNote && <span className="sb-card-titlenote">{card.titleNote}</span>}
        {card.commentRef && <span className="nd-comment-ref">{card.commentRef}</span>}
      </h2>

      {card.tagline && <p className="sb-card-tagline">{card.tagline}</p>}
      {card.lead && <p className="sb-card-lead">{card.lead}</p>}

      {card.goal && (
        <div className="sb-block">
          <div className="sb-block-label">Seller's goal</div>
          <p className="sb-block-body">{card.goal}</p>
        </div>
      )}

      {card.visualLabel && (
        <div className="sb-block">
          <div className="sb-block-label sb-block-label--visual">{card.visualLabel}</div>
          <CardVisual card={card} />
        </div>
      )}
      {!card.visualLabel && <CardVisual card={card} />}

      {card.kicker && (
        <div className="sb-block sb-block--kicker">
          <div className="sb-block-label">{card.kickerLabel || "The line"}</div>
          <p className="sb-block-body sb-block-body--italic">{card.kicker}</p>
        </div>
      )}
      {card.ask && (
        <div className="sb-block sb-block--ask">
          <div className="sb-block-label">Ask the room</div>
          <p className="sb-block-body sb-block-body--italic">"{card.ask}"</p>
        </div>
      )}
      {card.footnote && (
        <p className="sb-card-footnote">
          <span className="sb-footnote-tag">Modular insert</span>
          {card.footnote}
        </p>
      )}
      {card.source && <p className="sb-card-source">{card.source}</p>}
    </article>
  );
}

/* ============================ Visual primitives ============================ */

function DocSection({ label, className, children }) {
  return (
    <section className={"bln-section " + (className || "")}>
      <h2 className="bln-h2">{label}</h2>
      {children}
    </section>
  );
}

function KeyedLine({ label, body, italic, highlight, commentRef }) {
  return (
    <div className={"bln-keyed" + (highlight ? " is-highlight" : "")}>
      <div className="bln-keyed-label">
        {label}
        {commentRef && <span className="nd-comment-ref">{commentRef}</span>}
      </div>
      <p className={"bln-keyed-body" + (italic ? " is-italic" : "")}>{body}</p>
    </div>
  );
}

/* ============================ Card visuals ============================ */

function CardVisual({ card }) {
  switch (card.kind) {
    case "intro":
      return (
        <div className="sb-vis sb-vis-intro">
          {card.sequence.map((s, i) => (
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
          {card.stats.map((s, i) => (
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
          {card.cols.map((col, i) => (
            <div key={i} className="sb-twocol-col">
              <div className="sb-twocol-tag">{col.tag}</div>
              <div className="sb-twocol-name">{col.name}</div>
              <div className="sb-twocol-rows">
                {col.rows.map((r, j) => (
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

    case "shiftTable":
      return (
        <div className="sb-vis sb-vis-shift">
          <div className="sb-shift-head">
            <div className="sb-shift-side">
              <div className="sb-shift-tag sb-shift-tag-from">{card.colA.tag}</div>
              <div className="sb-shift-name">{card.colA.name}</div>
            </div>
            <div className="sb-shift-arrow"><Icon name="arrow_right" size={18} /></div>
            <div className="sb-shift-side">
              <div className="sb-shift-tag sb-shift-tag-to">{card.colB.tag}</div>
              <div className="sb-shift-name">{card.colB.name}</div>
            </div>
          </div>
          <div className="sb-shift-rows">
            {card.rows.map((r, i) => (
              <div key={i} className="sb-shift-row">
                <div className="sb-shift-from">{r[0]}</div>
                <div className="sb-shift-arrow-mini">→</div>
                <div className="sb-shift-to">{r[1]}</div>
              </div>
            ))}
          </div>
          {card.anchor && (
            <div className="sb-block sb-block--anchor">
              <div className="sb-block-label">Anchor quote</div>
              <blockquote>{card.anchor.body}</blockquote>
              <div className="sb-anchor-attr">— {card.anchor.attr}</div>
              <div className="sb-anchor-kicker">{card.anchor.kicker}</div>
            </div>
          )}
        </div>
      );

    case "definitions":
      return (
        <div className="sb-vis sb-vis-defs">
          {card.defs.map((d, i) => (
            <div key={i} className="sb-def">
              <div className="sb-def-tag">{d.tag}</div>
              <div className="sb-def-name">{d.name}</div>
              <p className="sb-def-body">{d.body}</p>
              <div className="sb-def-not">{d.notIs}</div>
            </div>
          ))}
        </div>
      );

    case "maturity":
      return (
        <div className="sb-vis sb-vis-maturity">
          <div className="sb-mat-axis">
            <span>LOW AUTONOMY</span>
            <span className="sb-mat-axis-line" />
            <span>HIGH AUTONOMY</span>
          </div>
          <div className="sb-mat-stages">
            {card.stages.map((s, i) => (
              <div key={i} className="sb-mat-stage">
                <div className="sb-mat-stage-head">
                  <span className="sb-mat-stage-n">Stage {s.n}</span>
                  <div className="sb-mat-stage-name">{s.name}</div>
                  <div className="sb-mat-stage-sub">{s.sub}</div>
                </div>
                <div className="sb-mat-row">
                  <div className="sb-mat-row-tag">INTERNAL</div>
                  <p>{s.internal}</p>
                </div>
                <div className="sb-mat-row">
                  <div className="sb-mat-row-tag">EXTERNAL</div>
                  <p>{s.external}</p>
                </div>
                <div className="sb-mat-gov">
                  <span className="sb-mat-gov-tag">GOVERNANCE</span>
                  <span>{s.gov}</span>
                </div>
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
          {card.gaps.map((g, i) => (
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
          <div className="sb-gd-row">
            <div className="sb-gd-label">Data</div>
            <p>{card.data}</p>
          </div>
          <div className="sb-gd-row">
            <div className="sb-gd-label">Peer voice</div>
            <p><strong>{card.voice.who}</strong> — {card.voice.body}</p>
          </div>
          <div className="sb-gd-row sb-gd-answer">
            <div className="sb-gd-label">AWS answer</div>
            <p>{card.answer}</p>
          </div>
          <div className="sb-gd-meta">
            <div className="sb-gd-meta-row">
              <span className="sb-gd-meta-label">Persona this hits hardest</span>
              <span>{card.persona}</span>
            </div>
            <div className="sb-gd-meta-row">
              <span className="sb-gd-meta-label">{card.pilotLabel || "Pilot move"}</span>
              <span>{card.pilot}</span>
            </div>
          </div>
        </div>
      );

    case "pillars":
      return (
        <div className="sb-vis sb-vis-pillars">
          {card.pillars.map((p, i) => (
            <div key={i} className="sb-pillar">
              <div className="sb-pillar-head">{p.name}</div>
              <ul>
                {p.items.map(([n, b], j) => (
                  <li key={j}>
                    <strong>{n}</strong>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "sequence":
      return (
        <div className="sb-vis sb-vis-seq">
          {card.phases.map((p, i) => (
            <div key={i} className="sb-seq-phase">
              <div className="sb-seq-phase-head">
                <span className="sb-seq-phase-n">{p.n}</span>
                <div className="sb-seq-phase-name">{p.name}</div>
              </div>
              <ul>
                {p.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
              <div className="sb-seq-meta">
                <div><span>Closes</span>{p.closes}</div>
                <div><span>Mandate</span>{p.mandate}</div>
              </div>
            </div>
          ))}
        </div>
      );

    case "partnerTable":
      return (
        <div className="sb-vis sb-vis-partners">
          <div className="sb-pt-head">
            <div>#</div><div>Gap</div><div>Partner play</div><div>Named partners</div>
          </div>
          {card.rows.map((r, i) => (
            <div key={i} className="sb-pt-row">
              <div className="sb-pt-n">{r[0]}</div>
              <div className="sb-pt-gap">{r[1]}</div>
              <div className="sb-pt-play">{r[2]}</div>
              <div className="sb-pt-names">{r[3]}</div>
            </div>
          ))}
        </div>
      );

    case "proof":
      return (
        <div className="sb-vis sb-vis-proof">
          {card.steps.map((s, i) => (
            <React.Fragment key={i}>
              <div className="sb-proof-step">
                <div className="sb-proof-n">{s.n}</div>
                <div className="sb-proof-name">{s.name}</div>
                <p className="sb-proof-body">{s.body}</p>
                <div className="sb-proof-result">
                  <span className="sb-proof-result-label">Result</span>
                  <span>{s.result}</span>
                </div>
                <div className="sb-proof-closes">{s.closes}</div>
              </div>
              {i < card.steps.length - 1 && <div className="sb-proof-arrow">→</div>}
            </React.Fragment>
          ))}
        </div>
      );

    case "options":
      return (
        <div className="sb-vis sb-vis-options">
          {card.options.map((o, i) => (
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

    case "takeaways":
      return (
        <div className="sb-vis sb-vis-takeaways">
          {card.items.map((t, i) => (
            <div key={i} className="sb-take">
              <div className="sb-take-n">{t.n}</div>
              <div className="sb-take-tag">{t.tag}</div>
              <p>{t.body}</p>
            </div>
          ))}
        </div>
      );

    case "appendixDivider":
      return (
        <div className="sb-vis sb-vis-appdiv">
          {card.groups.map((g, i) => (
            <div key={i} className="sb-appdiv-row">
              <div className="sb-appdiv-letter">{g.letter}</div>
              <div className="sb-appdiv-name">{g.name}</div>
              <div className="sb-appdiv-count">{g.count}</div>
            </div>
          ))}
        </div>
      );

    case "peerProfile":
      return (
        <div className="sb-vis sb-vis-peer">
          <div className="sb-peer-head">
            <div>
              <div className="sb-peer-name">{card.person.name}</div>
              <div className="sb-peer-title">{card.person.title}</div>
            </div>
            <div className="sb-peer-tags">
              <div><span>Best matched to</span><strong>{card.person.match}</strong></div>
              <div><span>When to reach for this peer</span><strong>{card.person.when}</strong></div>
            </div>
          </div>
          <div className="sb-peer-sections">
            {card.sections.map((s, i) => (
              <div key={i} className="sb-peer-section">
                <div className="sb-peer-section-label">{s.label}</div>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

window.NarrativePaper = NarrativePaper;
window.NarrativeArc = NarrativeArc;
window.Storyboard = Storyboard;
