/* global React, Icon, T24, StatusPill, useLivePlays */

/* Error boundary — catches any async/render error in a subtree and shows
   a plain fallback instead of crashing the whole app. */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, msg: "" };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, msg: err && err.message ? err.message : String(err) };
  }
  componentDidCatch(err, info) {
    console.warn("[ErrorBoundary] caught:", err.message, info.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ padding: "16px 20px", background: "var(--paper-elev)", borderRadius: "var(--r-sm)", border: "1px solid var(--line)", color: "var(--muted)", fontSize: 12 }}>
          {this.props.label || "Section unavailable"}
        </div>
      );
    }
    return this.props.children;
  }
}
window.ErrorBoundary = ErrorBoundary;

// Global notification toast — listens for t24:notification and shows a
// dismissible banner at the top of the screen for 8 seconds.
function NotificationToast() {
  const [notif, setNotif] = React.useState(null);
  React.useEffect(() => {
    const handler = (e) => {
      setNotif(e.detail);
      setTimeout(() => setNotif(null), 8000);
    };
    window.addEventListener("t24:notification", handler);
    return () => window.removeEventListener("t24:notification", handler);
  }, []);
  if (!notif) return null;
  return (
    <div style={{
      position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
      zIndex: 999, display: "flex", alignItems: "center", gap: 12,
      background: "var(--paper-elev-2)", border: "1px solid var(--accent)",
      borderRadius: "var(--r-sm)", padding: "12px 16px", boxShadow: "0 8px 32px rgba(0,0,0,.25)",
      maxWidth: 400, minWidth: 280,
      animation: "slide-in-top .2s ease",
    }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(var(--accent-rgb,244,183,63),.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon name="check" size={16} style={{ color: "var(--accent)" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{notif.title}</div>
        <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>{notif.body}</div>
      </div>
      <button className="btn-icon" onClick={() => setNotif(null)} style={{ flexShrink: 0, color: "var(--muted)" }}>
        <Icon name="close" size={14} />
      </button>
    </div>
  );
}
window.NotificationToast = NotificationToast;

function Dashboard({ onOpenProject, onNewProject, onPlaysLoaded }) {
  const [tab, setTab] = React.useState("active");
  const [view, setView] = React.useState("grid");
  const { loading, plays, error } = useLivePlays();

  // Watch for pipeline generating → done transitions and fire notifications
  if (window.usePipelineNotifications) window.usePipelineNotifications(plays);

  React.useEffect(() => {
    if (!loading && plays.length > 0 && onPlaysLoaded) onPlaysLoaded(plays);
  }, [loading, plays]);

  // Derive stats from live data
  const allPlays = plays.length > 0 ? plays : [];
  const active = allPlays.filter(p => !p.done);
  const done = allPlays.filter(p => p.done);
  const review = allPlays.filter(p => p.statusKind === "review" && !p.done);
  const filtered =
    tab === "active" ? active :
    tab === "review" ? review :
    tab === "done" ? done : allPlays;

  const featured = active[0] || null;
  const rest = filtered.filter(p => !featured || p.id !== (tab === "active" ? featured.id : "__none"));

  // Live greeting
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const reviewCount = review.length;
  const deckReady = allPlays.filter(p => p.stageIndex === 3 && p.statusKind === "review").length;
  const stuckPlays = allPlays.filter(p => (p.statusKind === "stuck" || p.statusKind === "error") && !p.done);

  if (loading) return (
    <div className="dash-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
      <div style={{ textAlign: "center", color: "var(--muted)" }}>
        <div style={{ fontFamily: "var(--display)", fontSize: 28, marginBottom: 12 }}>Loading plays…</div>
        <div style={{ fontSize: 13 }}>Fetching from SharePoint</div>
      </div>
    </div>
  );

  return (
    <div className="dash-page">
      {stuckPlays.length > 0 && (
        <div role="alert" style={{
          background: "rgba(255,107,94,.08)",
          border: "1px solid rgba(255,107,94,.32)",
          borderRadius: "var(--r-sm)",
          padding: "14px 18px",
          margin: "0 0 18px 0",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}>
          <Icon name="alert" size={18} style={{ color: "var(--danger)", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "var(--danger)" }}>
              {stuckPlays.length} {stuckPlays.length === 1 ? "play needs" : "plays need"} attention
            </div>
            <div className="muted" style={{ fontSize: 12.5, marginTop: 3 }}>
              {stuckPlays.map((p, i) => (
                <React.Fragment key={p.id}>
                  {i > 0 && " · "}
                  <a
                    onClick={() => onOpenProject && onOpenProject(p.id)}
                    style={{ cursor: "pointer", color: "var(--ink-soft)", borderBottom: "1px dotted var(--muted)" }}
                  >
                    {p.persona} {p.title} — {p.status || "stuck"}
                  </a>
                </React.Fragment>
              ))}
            </div>
            <div className="muted" style={{ fontSize: 11.5, marginTop: 6 }}>
              Click into the play and use the <strong>Re-run</strong> button in the header to re-queue the draft.
            </div>
          </div>
        </div>
      )}
      <section className="dash-hero">
        <div className="eyebrow">{dayName}, {dateStr}</div>
        <h1 className="dash-greeting">
          {greeting}, Brian.<br/>
          {error ? (
            <span className="ink-soft" style={{ fontSize: "0.6em", color: "var(--muted)" }}>Couldn't load SharePoint data — {error}</span>
          ) : reviewCount > 0 || deckReady > 0 ? (
            <><span className="ink-soft">You have</span>{reviewCount > 0 && <> <em>{reviewCount} {reviewCount === 1 ? "play" : "plays"}</em> <span className="ink-soft">awaiting review</span></>}{reviewCount > 0 && deckReady > 0 && <span className="ink-soft"> and</span>}{deckReady > 0 && <> <em>{deckReady} {deckReady === 1 ? "deck" : "decks"}</em> <span className="ink-soft">ready to ship.</span></>}</>
          ) : active.length > 0 ? (
            <><span className="ink-soft">You have</span> <em>{active.length} active {active.length === 1 ? "play" : "plays"}</em> <span className="ink-soft">in progress.</span></>
          ) : (
            <span className="ink-soft">No active plays. Start one.</span>
          )}
        </h1>

        <div className="dash-stats">
          <div className="dash-stat"><span className="num"><em>{String(active.length).padStart(2,"0")}</em></span><span className="lbl">Active Plays</span></div>
          <div className="dash-stat"><span className="num"><em>{String(reviewCount).padStart(2,"0")}</em></span><span className="lbl">In Review</span></div>
          <div className="dash-stat"><span className="num"><em>{String(done.length).padStart(2,"0")}</em></span><span className="lbl">Delivered</span></div>
          <div className="dash-stat"><span className="num"><em>{allPlays.length}</em></span><span className="lbl">Total Plays</span></div>
        </div>
      </section>

      <div className="dash-toolbar">
        <div className="dash-tabs">
          <button className={"dash-tab " + (tab === "active" ? "active" : "")} onClick={() => setTab("active")}>Active <span className="count">{active.length}</span></button>
          <button className={"dash-tab " + (tab === "review" ? "active" : "")} onClick={() => setTab("review")}>Awaiting Review <span className="count">{review.length}</span></button>
          <button className={"dash-tab " + (tab === "done" ? "active" : "")} onClick={() => setTab("done")}>Delivered <span className="count">{done.length}</span></button>
          <button className={"dash-tab " + (tab === "all" ? "active" : "")} onClick={() => setTab("all")}>All <span className="count">{allPlays.length}</span></button>
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

      {tab === "active" && featured && (
        <ErrorBoundary label="Featured play unavailable">
          <FeaturedPlay project={featured} onOpen={() => onOpenProject(featured.id)} />
        </ErrorBoundary>
      )}
      {tab === "active" && !featured && active.length === 0 && (
        <div style={{ textAlign: "center", padding: "64px 24px", color: "var(--muted)" }}>
          <div style={{ fontFamily: "var(--display)", fontSize: 32, marginBottom: 8 }}>No active plays</div>
          <div style={{ fontSize: 14, marginBottom: 24 }}>Create your first play to get started.</div>
          <button className="btn btn-accent" onClick={onNewProject}><Icon name="plus" size={13} />New play</button>
        </div>
      )}

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

      <ActivityStrip plays={allPlays} />
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
        {(() => { const si = Math.min(project.stageIndex || 0, T24.stages.length - 1); return <div className="eyebrow">Stage {si + 1} of 4 · {T24.stages[si].name}</div>; })()}
        <h2>{project.title}</h2>
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
                if (!person) return null;
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
            <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "rgba(255,255,255,.65)", textTransform: "uppercase", letterSpacing: "0.14em", marginTop: 4 }}>{project.industry.split(" · ")[0]}</div>
          </div>
        </div>
      </div>
      <div className="pcard-body">
        <div className="pcard-title">{project.title}</div>


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
              if (!person) return null;
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
          <span style={{ flex: 1 }}>
            <span className={"stage-chip " + (!p.done ? "stage-active" : "")}>
              <span className="stage-num mono">{(T24.stages[p.stageIndex] || T24.stages[0]).short}</span>
              <span>{(T24.stages[p.stageIndex] || T24.stages[0]).name}</span>
            </span>
          </span>
          <span style={{ width: 110 }} className="muted mono">{p.done ? "delivered" : p.due}</span>
          <span style={{ width: 110 }} className="avatar-stack avatar-stack-sm">
            {p.team.slice(0,3).map(t => {
              const person = T24.people[t];
              if (!person) return null;
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

function ActivityStrip({ plays = [] }) {
  // Derive activity from real plays — show last activity per play, most recent first
  const items = plays
    .filter(p => p.lastActivity)
    .sort((a, b) => (b.lastActivityAt || "").localeCompare(a.lastActivityAt || ""))
    .slice(0, 5)
    .map(p => ({
      persona: p.persona,
      target: `${p.persona} play`,
      what: p.lastActivity,
      statusKind: p.statusKind,
    }));

  return (
    <section style={{ marginTop: 56 }}>
      <div className="section-head">
        <h3>Activity</h3>
      </div>
      <div className="activity-list">
        {items.length === 0 ? (
          <div style={{ padding: "32px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>No activity yet.</div>
        ) : items.map((a, i) => (
          <div key={i} className="activity-row">
            <span className="avatar avatar-sm" style={{ background: "var(--accent)", color: "#0c0b08", fontSize: 11 }}>{a.persona.slice(0,2)}</span>
            <span className="flex-1"><span className="amber">{a.target}</span> <span className="muted">—</span> <span>{a.what}</span></span>
            <StatusPill statusKind={a.statusKind} label={a.statusKind} />
          </div>
        ))}
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
