/* global React, Icon, T24, StatusPill */

function Library({ onOpenProject }) {
  const blocks = [
    { id: 1, title: "The 40M-car opener", kind: "Hook", project: "CarMax", uses: 3, tags: ["Retail", "Scale"], excerpt: "Across the United States, more than 40 million used vehicles change hands every year — and yet the experience of buying one remains stubbornly opaque." },
    { id: 2, title: "Why this is your decade", kind: "Positioning", project: "Re-usable", uses: 12, tags: ["Bedrock", "Pivot moment"], excerpt: "What you have not had — until now — is a way to personalize the journey at the scale of every customer, in real time." },
    { id: 3, title: "90-day pilot framing", kind: "Close", project: "FedEx, CarMax, Pfizer", uses: 8, tags: ["Pilot", "Risk reduction"], excerpt: "We'll prove this isn't a moonshot — it's a 90-day pilot." },
    { id: 4, title: "Cost-of-inaction stat", kind: "Stat", project: "Marriott", uses: 5, tags: ["Personalization", "Hospitality"], excerpt: "Every percentage point of personalization lift compounds across 8,000 properties — every quarter you wait, you leave $X on the table." },
    { id: 5, title: "Trust + data + scale flywheel", kind: "Diagram cue", project: "Re-usable", uses: 7, tags: ["Visual"], excerpt: "Trust earns data. Data earns scale. Scale earns more trust. The flywheel only spins once you start it." },
    { id: 6, title: "AWS Bedrock × your data", kind: "Technical bridge", project: "All", uses: 19, tags: ["Bedrock", "Architecture"], excerpt: "Bedrock lets us pair the model you choose with the data only you have — without it ever leaving your VPC." },
  ];

  return (
    <div className="dash-page">
      <section className="dash-hero">
        <div className="eyebrow">A library of approved narrative DNA</div>
        <h1 className="dash-greeting"><em>Building blocks</em><br/><span className="ink-soft">that already worked. Remix them into the next narrative.</span></h1>
        <div className="dash-stats">
          <div className="dash-stat"><span className="num"><em>54</em></span><span className="lbl">Approved blocks</span></div>
          <div className="dash-stat"><span className="num"><em>12</em></span><span className="lbl">Past projects</span></div>
          <div className="dash-stat"><span className="num"><em>92</em>%</span><span className="lbl">Reuse rate</span></div>
          <div className="dash-stat"><span className="num"><em>1.4</em>×</span><span className="lbl">Faster drafts</span></div>
        </div>
      </section>

      <div className="dash-toolbar">
        <div className="dash-tabs">
          <button className="dash-tab active">Blocks <span className="count">54</span></button>
          <button className="dash-tab">Past decks <span className="count">12</span></button>
          <button className="dash-tab">Pull-quotes <span className="count">38</span></button>
          <button className="dash-tab">Visuals <span className="count">120</span></button>
        </div>
        <div className="dash-toolbar-right">
          <button className="btn btn-ghost btn-sm"><Icon name="filter" size={13} />Filter</button>
          <button className="btn btn-accent btn-sm"><Icon name="plus" size={13} />Save block</button>
        </div>
      </div>

      <div className="project-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))" }}>
        {blocks.map(b => (
          <div key={b.id} className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, cursor: "pointer", transition: "border-color .15s" }}
               onMouseEnter={e => e.currentTarget.style.borderColor = "var(--line-strong)"}
               onMouseLeave={e => e.currentTarget.style.borderColor = "var(--line)"}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="pill pill-amber">{b.kind}</span>
              <span className="muted mono" style={{ fontSize: 10.5 }}>used {b.uses}×</span>
            </div>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 400, letterSpacing: "-0.01em" }}>{b.title}</h3>
            <p style={{ fontFamily: "var(--display)", fontStyle: "italic", fontSize: 16, lineHeight: 1.5, color: "var(--ink-soft)", borderLeft: "2px solid var(--accent)", paddingLeft: 14 }}>"{b.excerpt}"</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--line)" }}>
              <span className="muted" style={{ fontSize: 11 }}>From {b.project} ·</span>
              {b.tags.map(t => <span key={t} className="pill pill-muted" style={{ fontSize: 9 }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Calendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const today = now.getDate();
  const monthName = now.toLocaleDateString("en-US", { month: "long" });
  const quarterNum = Math.ceil((month + 1) / 3);

  // Build calendar grid for current month
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Shift so Monday is first
  const startOffset = (firstDay + 6) % 7;
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // Events come from live plays with due dates — empty for now until data is wired
  const events = {};

  return (
    <div className="dash-page">
      <section className="dash-hero">
        <div className="eyebrow">{monthName} · Q{quarterNum} {year}</div>
        <h1 className="dash-greeting">
          {Object.keys(events).length > 0
            ? <><em>{Object.keys(events).length}</em> <span className="ink-soft">due dates this month.</span></>
            : <><span className="ink-soft">No deadlines scheduled yet.</span><br/><span className="ink-soft" style={{fontSize:"0.6em"}}>Due dates will appear here as plays are created.</span></>
          }
        </h1>
      </section>

      <div className="card" style={{ marginTop: 24, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid var(--line)" }}>
          {days.map(d => <div key={d} style={{ padding: "14px 18px", fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--muted)", borderRight: "1px solid var(--line)" }}>{d}</div>)}
        </div>
        {weeks.map((w,i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: i < weeks.length-1 ? "1px solid var(--line)" : "none" }}>
            {w.map((d,j) => (
              <div key={j} style={{ minHeight: 110, padding: 12, borderRight: j < 6 ? "1px solid var(--line)" : "none", background: d === today ? "var(--paper-elev-2)" : "transparent" }}>
                {d && (
                  <>
                    <div style={{ fontFamily: "var(--display)", fontSize: 22, color: d === today ? "var(--accent)" : "var(--ink)", fontWeight: d === today ? 700 : 400 }}>
                      {String(d).padStart(2,"0")}
                      {d === today && <span className="muted" style={{ fontSize: 10, marginLeft: 4, fontFamily: "var(--mono)", letterSpacing: "0.1em" }}>TODAY</span>}
                    </div>
                    {(events[d] || []).map((e,k) => (
                      <div key={k} style={{ marginTop: 6, padding: "5px 8px", borderLeft: "2px solid " + e.c, background: "var(--paper-elev)", fontSize: 11, color: "var(--ink-soft)", borderRadius: "0 4px 4px 0" }}>
                        <div style={{ color: "var(--ink)", fontWeight: 500 }}>{e.p}</div>
                        <div className="muted" style={{ fontSize: 10 }}>{e.k}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Templates() {
  const tpls = [
    { id: 1, name: "Enterprise Profile", desc: "A definitive portrait of a Fortune 500 — who they are, where AI fits, and why now.", duration: "2 weeks", uses: 23, cover: "linear-gradient(135deg, #1a3a5c, #2d5a8c)" },
    { id: 2, name: "Engagement Pitch", desc: "A scoped engagement deck — pilot, success metrics, asks. The most common play.", duration: "10 days", uses: 41, cover: "linear-gradient(135deg, #2d4a1a, #4a7a2d)" },
    { id: 3, name: "Industry Vertical", desc: "A point-of-view across an industry — for AWS field teams to lead with.", duration: "3 weeks", uses: 7, cover: "linear-gradient(135deg, #5c2d1a, #8c4a2d)" },
    { id: 4, name: "Executive Briefing", desc: "A one-meeting, one-narrative briefing for C-suite. Tight, declarative, high-stakes.", duration: "5 days", uses: 18, cover: "linear-gradient(135deg, #3a1a4a, #6a2d8c)" },
  ];
  return (
    <div className="dash-page">
      <section className="dash-hero">
        <div className="eyebrow">Pre-built scaffolds — start here, not blank</div>
        <h1 className="dash-greeting">Pick a <em>shape</em>.<br/><span className="ink-soft">T24 fills it from your sources.</span></h1>
      </section>
      <div className="project-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", marginTop: 24 }}>
        {tpls.map(t => (
          <div key={t.id} className="project-card">
            <div className="pcard-cover" style={{ background: t.cover, height: 160 }}>
              <span className="pcard-cover-mark"><span className="pill pill-amber">Template</span></span>
              <span className="pcard-cover-client" style={{ fontSize: 32 }}>{t.name}</span>
            </div>
            <div className="pcard-body">
              <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>{t.desc}</p>
              <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--muted)", paddingTop: 12, borderTop: "1px solid var(--line)" }}>
                <span><Icon name="clock" size={11} style={{ verticalAlign: "-2px", marginRight: 4 }}/>{t.duration}</span>
                <span style={{ marginLeft: "auto" }}>Used {t.uses}× by BLN24</span>
              </div>
              <button className="btn btn-accent" style={{ marginTop: 10 }}><Icon name="plus" size={13} />Start project</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Inbox({ open, onClose, onNav }) {
  if (!open) return null;
  const items = [];
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 70 }} />
      <div className="inbox-overlay">
        <div className="inbox-head">
          <div>
            <div style={{ fontFamily: "var(--display)", fontSize: 20 }}>Inbox</div>
            <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>{items.filter(i => i.unread).length > 0 ? items.filter(i => i.unread).length + " new" : "Up to date"}</div>
          </div>
          <button className="btn-quiet btn-sm">Mark all read</button>
        </div>
        <div className="inbox-list">
          {items.length === 0 ? (
            <div style={{ padding: "40px 24px", textAlign: "center", color: "var(--muted)" }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 20, marginBottom: 8 }}>All clear.</div>
              <div style={{ fontSize: 13 }}>No notifications yet.</div>
            </div>
          ) : items.map((it, i) => {
            const person = T24.people[it.who];
            return (
              <div key={i} className={"inbox-item " + (it.unread ? "unread" : "")}>
                <span className="avatar avatar-sm" style={{ background: person.color, color: "#0c0b08" }}>{person.initials}</span>
                <div className="inbox-item-body">
                  <div className="txt">
                    <strong>{person.name}</strong> {it.text} on <span className="amber">{it.target}</span>
                  </div>
                  <div className="meta">{it.time} ago</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

window.Library = Library;
window.CalendarPage = Calendar;
window.Templates = Templates;
window.Inbox = Inbox;
