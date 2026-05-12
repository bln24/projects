/* global React, Icon, T24, StatusPill */

function Dashboard({ onOpenProject, onNewProject }) {
  const [tab, setTab] = React.useState("active");
  const [view, setView] = React.useState("grid");

  const active = T24.projects.filter(p => !p.done);
  const done = T24.projects.filter(p => p.done);
  const review = T24.projects.filter(p => p.statusKind === "review" && !p.done);
  const filtered =
    tab === "active" ? active :
    tab === "review" ? review :
    tab === "done" ? done : T24.projects;

  const featured = active[0];
  const rest = filtered.filter(p => p.id !== (tab === "active" ? featured.id : "__none"));

  return (
    <div className="dash-page">
      <section className="dash-hero">
        <div className="eyebrow">Tuesday, 14 April 2026 · Quarterly cycle Q2</div>
        <h1 className="dash-greeting">
          Good morning, Brian.<br/>
          <span className="ink-soft">You have</span> <em>3 narratives</em> <span className="ink-soft">awaiting your review and</span> <em>1 deck</em> <span className="ink-soft">ready to ship to AWS.</span>
        </h1>

        <div className="dash-stats">
          <div className="dash-stat"><span className="num"><em>06</em></span><span className="lbl">Active Plays</span><span className="delta up">+2 this month</span></div>
          <div className="dash-stat"><span className="num"><em>03</em></span><span className="lbl">In Review</span><span className="delta">avg. turn 1.2d</span></div>
          <div className="dash-stat"><span className="num"><em>14</em></span><span className="lbl">Decks Delivered</span><span className="delta up">+4 vs Q1</span></div>
          <div className="dash-stat"><span className="num"><em>92</em>%</span><span className="lbl">AWS Approval Rate</span><span className="delta up">+11 vs Q1</span></div>
        </div>
      </section>

      <div className="dash-toolbar">
        <div className="dash-tabs">
          <button className={"dash-tab " + (tab === "active" ? "active" : "")} onClick={() => setTab("active")}>Active <span className="count">{active.length}</span></button>
          <button className={"dash-tab " + (tab === "review" ? "active" : "")} onClick={() => setTab("review")}>Awaiting Review <span className="count">{review.length}</span></button>
          <button className={"dash-tab " + (tab === "done" ? "active" : "")} onClick={() => setTab("done")}>Delivered <span className="count">{done.length}</span></button>
          <button className={"dash-tab " + (tab === "all" ? "active" : "")} onClick={() => setTab("all")}>All <span className="count">{T24.projects.length}</span></button>
        </div>
        <div className="dash-toolbar-right">
          <button className="btn btn-ghost btn-sm"><Icon name="filter" size={13} />Filter by persona</button>
          <div className="view-toggle">
            <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}><Icon name="grid" size={13} /></button>
            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}><Icon name="list" size={13} /></button>
          </div>
          <button className="btn btn-accent btn-sm" onClick={onNewProject}><Icon name="plus" size={13} />New play</button>
        </div>
      </div>

      {tab === "active" && <FeaturedPlay project={featured} onOpen={() => onOpenProject(featured.id)} />}

      {view === "grid" ? (
        <>
          <div className="section-head">
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <h3>{tab === "active" ? "In motion" : tab === "review" ? "Awaiting your review" : tab === "done" ? "Delivered" : "All plays"}</h3>
              <span className="count">{rest.length} {rest.length === 1 ? "play" : "plays"}</span>
            </div>
            <button className="btn-quiet">Sort: Updated <Icon name="chevron_down" size={11} /></button>
          </div>
          <div className="project-grid">
            {rest.map(p => <PlayCard key={p.id} project={p} onOpen={() => onOpenProject(p.id)} />)}
            <NewPlayCard onClick={onNewProject} />
          </div>
        </>
      ) : (
        <PlayListView projects={filtered} onOpen={onOpenProject} />
      )}

      <ActivityStrip />
    </div>
  );
}

function PersonaMark({ persona, size = 60, color }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: 14,
      background: color || "rgba(255,255,255,.12)",
      backdropFilter: "blur(20px)",
      border: "1.5px solid rgba(255,255,255,.18)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--display)", fontSize: size * 0.42,
      color: "white", letterSpacing: "-0.02em", fontWeight: 400,
      fontStyle: "italic",
    }}>{persona}</div>
  );
}

function FeaturedPlay({ project, onOpen }) {
  return (
    <div className="featured-card" onClick={onOpen} style={{ cursor: "pointer", marginTop: 8 }}>
      <div className="featured-cover" style={{ background: project.cover }}>
        <div className="featured-cover-content">
          <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,.85)" }}>
            <span className="eyebrow" style={{ color: "rgba(255,255,255,.7)" }}>{project.industry}</span>
            <StatusPill statusKind={project.statusKind} label={project.status} />
          </div>
          <div>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,.7)" }}>Featured · Most active</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 20, marginTop: 16 }}>
              <PersonaMark persona={project.persona} size={88} />
              <div>
                <div style={{ fontFamily: "var(--display)", fontSize: 56, lineHeight: 0.95, color: "white", fontWeight: 400, letterSpacing: "-0.02em" }}>
                  Targeting<br/><em style={{ fontStyle: "italic" }}>{project.personaFull}s</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="featured-body">
        <div className="eyebrow">Stage {project.stageIndex + 1} of 4 · {T24.stages[project.stageIndex].name}</div>
        <h2>{project.title}</h2>
        <CohortStrip cohort={project.cohort} total={project.cohortSize} />
        <div className="pcard-stages">
          {T24.stages.map((s, i) => (
            <div key={s.id} className={"pcard-stage " + (i < project.stageIndex ? "passed" : i === project.stageIndex ? "active" : "")} />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <div className="row gap-2">
              <Icon name="calendar" size={14} className="muted" />
              <span style={{ fontSize: 13 }}>Due <strong>{project.due}</strong></span>
              <span className="pill pill-amber pill-dot">{project.dueIn}d left</span>
            </div>
            <div className="avatar-stack">
              {project.team.map(p => {
                const person = T24.people[p];
                return <span key={p} className="avatar avatar-sm" style={{ background: person.color, color: "#0c0b08" }}>{person.initials}</span>;
              })}
            </div>
          </div>
          <button className="btn btn-accent">Open workspace <Icon name="arrow_right" size={13} /></button>
        </div>
      </div>
    </div>
  );
}

function CohortStrip({ cohort, total }) {
  const shown = cohort.slice(0, 5);
  const remainder = total - shown.length;
  return (
    <div className="cohort-strip">
      <span className="eyebrow" style={{ marginRight: 4 }}>Cohort</span>
      {shown.map((c, i) => (
        <span key={i} className="cohort-chip">{c}</span>
      ))}
      {remainder > 0 && <span className="cohort-chip cohort-chip-more">+{remainder} more</span>}
    </div>
  );
}

function PlayCard({ project, onOpen }) {
  const dueClass = project.done ? "overdue" : project.dueIn <= 3 ? "urgent" : "";
  return (
    <div className="project-card" onClick={onOpen}>
      <div className="pcard-cover" style={{ background: project.cover, height: 160 }}>
        <span className="pcard-cover-mark"><StatusPill statusKind={project.statusKind} label={project.status} /></span>
        <div style={{ position: "absolute", bottom: 16, left: 18, right: 18, zIndex: 2, display: "flex", alignItems: "center", gap: 14 }}>
          <PersonaMark persona={project.persona} size={48} />
          <div>
            <div style={{ fontFamily: "var(--display)", fontSize: 22, color: "white", lineHeight: 1, fontStyle: "italic", fontWeight: 400 }}>{project.personaFull}s</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "rgba(255,255,255,.65)", textTransform: "uppercase", letterSpacing: "0.14em", marginTop: 4 }}>{project.cohortSize} targets · {project.industry.split(" · ")[0]}</div>
          </div>
        </div>
      </div>
      <div className="pcard-body">
        <div className="pcard-title">{project.title}</div>

        <CohortStrip cohort={project.cohort} total={project.cohortSize} />

        <div>
          <div className="pcard-stages">
            {T24.stages.map((s, i) => (
              <div key={s.id} className={"pcard-stage " + (project.done || i < project.stageIndex ? "passed" : i === project.stageIndex && !project.done ? "active" : "")} />
            ))}
          </div>
          <div className="pcard-stage-labels" style={{ marginTop: 6 }}>
            {T24.stages.map((s, i) => (
              <span key={s.id} className={project.done || i < project.stageIndex ? "passed" : i === project.stageIndex && !project.done ? "active" : ""}>
                {s.short} · {s.name}
              </span>
            ))}
          </div>
        </div>

        <div className="pcard-meta">
          <span className={"pcard-due " + dueClass}><Icon name="calendar" size={12} />{project.done ? "Delivered" : "Due " + project.due}</span>
          <div className="avatar-stack avatar-stack-sm">
            {project.team.slice(0, 3).map(p => {
              const person = T24.people[p];
              return <span key={p} className="avatar avatar-sm" style={{ background: person.color, color: "#0c0b08" }}>{person.initials}</span>;
            })}
          </div>
        </div>

        {project.lastActivity && (
          <div className="pcard-activity">
            {project.live.length > 0 && <span className="live-dot" />}
            <span>{project.lastActivity}</span>
            <span className="muted">· {project.lastActivityAt}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function NewPlayCard({ onClick }) {
  return (
    <button className="new-project-card" onClick={onClick}>
      <div className="row gap-2"><Icon name="plus" size={18} className="amber" /><span className="eyebrow">Start a new play</span></div>
      <div className="big">
        Pick a <em className="amber" style={{ fontStyle: "italic" }}>persona.</em><br/>
        Build a <em className="amber" style={{ fontStyle: "italic" }}>cohort.</em><br/>
        Drop the meeting.
      </div>
      <div className="row gap-2 muted" style={{ fontSize: 12 }}>
        <Icon name="arrow_right" size={12} />T24 takes it from there.
      </div>
    </button>
  );
}

function PlayListView({ projects, onOpen }) {
  return (
    <div className="proj-list">
      <div className="proj-list-head">
        <span style={{ flex: 2 }}>Play</span>
        <span style={{ flex: 1 }}>Cohort</span>
        <span style={{ flex: 1 }}>Stage</span>
        <span style={{ width: 110 }}>Due</span>
        <span style={{ width: 110 }}>Team</span>
      </div>
      {projects.map(p => (
        <button key={p.id} className="proj-list-row" onClick={() => onOpen(p.id)}>
          <span style={{ flex: 2, display: "flex", alignItems: "center", gap: 14 }}>
            <PersonaMark persona={p.persona} size={36} color={p.cover} />
            <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
              <span style={{ fontFamily: "var(--display)", fontSize: 17, fontStyle: "italic" }}>{p.personaFull}s</span>
              <span className="muted" style={{ fontSize: 12, textAlign: "left" }}>{p.title}</span>
            </span>
          </span>
          <span style={{ flex: 1 }} className="muted mono" title={p.cohort.join(", ")}>{p.cohortSize} targets</span>
          <span style={{ flex: 1 }}>
            <span className={"stage-chip " + (!p.done ? "stage-active" : "")}>
              <span className="stage-num mono">{T24.stages[p.stageIndex].short}</span>
              <span>{T24.stages[p.stageIndex].name}</span>
            </span>
          </span>
          <span style={{ width: 110 }} className="muted mono">{p.done ? "delivered" : p.due}</span>
          <span style={{ width: 110 }} className="avatar-stack avatar-stack-sm">
            {p.team.slice(0,3).map(t => {
              const person = T24.people[t];
              return <span key={t} className="avatar avatar-sm" style={{ background: person.color, color: "#0c0b08" }}>{person.initials}</span>;
            })}
          </span>
        </button>
      ))}
      <style>{`
        .proj-list { display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; background: var(--paper-elev); }
        .proj-list-head { display: flex; padding: 12px 22px; gap: 16px; background: var(--paper-elev-2); border-bottom: 1px solid var(--line); font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.18em; color: var(--muted); }
        .proj-list-row { display: flex; align-items: center; gap: 16px; padding: 16px 22px; border-bottom: 1px solid var(--line); text-align: left; transition: background .15s; }
        .proj-list-row:hover { background: var(--paper-elev-2); }
        .proj-list-row:last-child { border-bottom: none; }
      `}</style>
    </div>
  );
}

function ActivityStrip() {
  const items = [
    { who: "stephen", what: "approved", target: "CTO play · Narrative v3", time: "12m" },
    { who: "michael", what: "uploaded 4 visuals to", target: "CXO play · Deck", time: "1h" },
    { who: "t24", what: "generated v3 of", target: "CTO play · Narrative", time: "1h" },
    { who: "angie", what: "left feedback on", target: "CMIO play · Arc", time: "3h" },
    { who: "aws", what: "approved", target: "CISO play · Deck", time: "yesterday" },
  ];
  return (
    <section style={{ marginTop: 56 }}>
      <div className="section-head">
        <h3>Activity</h3>
        <button className="btn-quiet">View all <Icon name="arrow_right" size={11} /></button>
      </div>
      <div className="activity-list">
        {items.map((a, i) => {
          const person = T24.people[a.who];
          return (
            <div key={i} className="activity-row">
              <span className="avatar avatar-sm" style={{ background: person.color, color: "#0c0b08" }}>{person.initials}</span>
              <span className="flex-1"><strong>{person.name}</strong> <span className="muted">{a.what}</span> <span className="amber">{a.target}</span></span>
              <span className="mono muted" style={{ fontSize: 11 }}>{a.time}</span>
            </div>
          );
        })}
      </div>
      <style>{`
        .activity-list { display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; }
        .activity-row { display: flex; align-items: center; gap: 12px; padding: 14px 20px; border-bottom: 1px solid var(--line); font-size: 13px; }
        .activity-row:last-child { border-bottom: none; }
      `}</style>
    </section>
  );
}

window.Dashboard = Dashboard;
window.PersonaMark = PersonaMark;
window.CohortStrip = CohortStrip;
