/* global React, Icon, T24, StatusPill, NARRATIVE, STORYBOARD, NarrativePaper, NarrativeArc, Storyboard */

function Workspace({ projectId, onBack, onNav, aiMode = "dock" }) {
  const project = T24.projects.find(p => p.id === projectId) || T24.projects[0];
  const [stageIdx, setStageIdx] = React.useState(project.stageIndex);
  const [editorTab, setEditorTab] = React.useState("draft");
  const [railTab, setRailTab] = React.useState(aiMode === "panel" ? "chat" : "refinements");
  const [version, setVersion] = React.useState(3);
  const [activeSource, setActiveSource] = React.useState("src-1");
  const [t24Expanded, setT24Expanded] = React.useState(false);
  const [publishOpen, setPublishOpen] = React.useState(false);
  const [companyVariant, setCompanyVariant] = React.useState("default");
  const stage = T24.stages[stageIdx];

  return (
    <div className="ws-page">
      {/* Header */}
      <div className="ws-head">
        <div className="ws-crumbs">
          <a onClick={onBack}>Plays</a>
          <Icon name="chevron_right" size={11} />
          <a>Active</a>
          <Icon name="chevron_right" size={11} />
          <span style={{ color: "var(--ink)" }}>{project.persona} play</span>
        </div>
        <div className="ws-title-row">
          <div className="ws-title-block">
            <span className="eyebrow">{project.industry}</span>
            <span className="client">
              Targeting <em>{project.personaFull}s</em>
            </span>
            <span className="subtitle">{project.title}</span>
            <div style={{ marginTop: 12 }}>
              <CohortStrip cohort={project.cohort} total={project.cohortSize} />
            </div>
          </div>
          <div className="ws-title-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => setPublishOpen(true)}><Icon name="folder_open" size={13} />Publish to SharePoint</button>
            <button className="btn btn-ghost btn-sm"><Icon name="users" size={13} />Share</button>
            <button className="btn btn-ghost btn-sm"><Icon name="more" size={13} /></button>
          </div>
        </div>
        <div className="ws-meta-row">
          <div className="ws-meta-item">
            <span className="live-dot" />
            <span><strong>{stageIdx <= 1 ? "Angie" : stageIdx === 2 ? "Stephen" : "AWS"}</strong> {stageIdx === 3 ? "approves" : "is reviewing now"}</span>
          </div>
          <div className="ws-meta-item">
            <Icon name="users" size={13} />
            <span>Lead: <strong>{stageIdx <= 1 ? "Angie Paik" : "Stephen Yi"}</strong></span>
            <div className="avatar-stack avatar-stack-sm" style={{ marginLeft: 4 }}>
              {project.team.map(p => {
                const person = T24.people[p];
                return <span key={p} className="avatar avatar-sm" style={{ background: person.color, color: "#0c0b08" }}>{person.initials}</span>;
              })}
            </div>
          </div>
          <div className="ws-meta-item">
            <Icon name="calendar" size={13} />
            <span>Due <strong>{project.due}</strong></span>
            <span className="pill pill-amber pill-dot" style={{ marginLeft: 4 }}>{project.dueIn}d left</span>
          </div>
          <div className="ws-meta-item">
            <Icon name="history" size={13} />
            <span>Created Mar 28 · v{version} of 5</span>
          </div>
          <div className="ws-meta-item">
            <Icon name="users" size={13} />
            <span><strong>{project.cohortSize}</strong> targets in cohort</span>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <StatusPill statusKind={project.statusKind} label={project.status} />
          </div>
        </div>
      </div>

      {/* Cinematic Pipeline */}
      <div className="pipeline">
        {T24.stages.map((s, i) => {
          const state = i < stageIdx ? "passed" : i === stageIdx ? "current" : "future";
          return (
            <button key={s.id} className={"pl-stage " + state} onClick={() => setStageIdx(i)}>
              <span className="pl-stage-num">{s.short} · Stage {i + 1}</span>
              <span className="pl-stage-name">
                {state === "current" ? <em>{s.name}</em> : s.name}
              </span>
              <span className="pl-stage-status">
                <span className="ico">
                  {state === "passed" ? <Icon name="check" size={10} /> :
                   state === "current" ? <Icon name="dot" size={10} /> :
                   <Icon name="lock" size={10} />}
                </span>
                {state === "passed" ? "Approved · v3" :
                 state === "current" ? "In review" :
                 "Locked until prior stage approved"}
              </span>
              <div className="pl-stage-meta">
                <span><Icon name="doc" size={11} style={{ marginRight: 4, verticalAlign: "-2px" }} />{s.outputType}</span>
                {state !== "future" && <span><Icon name="message" size={11} style={{ marginRight: 4, verticalAlign: "-2px" }} />{i === 0 ? 7 : i === 1 ? 4 : i === 2 ? 12 : 0}</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Body: rails + editor */}
      <div className="ws-body">
        {/* Left rail */}
        <aside className="ws-rail-left">
          <div className="rail-section">
            <h4>Sources <span style={{ background: "var(--paper-elev)", padding: "2px 6px", borderRadius: 99, color: "var(--muted)" }}>5</span></h4>
            <div className="rail-list">
              <Source
                id="src-1" active={activeSource === "src-1"} onClick={() => setActiveSource(activeSource === "src-1" ? null : "src-1")}
                name="AWS sync — Apr 24" type="transcript" size="2h 14m · 18k words"
                fresh badge="3 conflicts"
                pins={[
                  { who: "Vidya", text: "Sellers should walk the same deck they'd present to customers. No separate enablement version.", anchor: "§1" },
                  { who: "Brad", text: "The CAIO is a foundation-builder for their C-suite peers — that's the LoB reframe.", anchor: "§3" },
                ]}
              />
              <Source
                id="src-2" active={activeSource === "src-2"} onClick={() => setActiveSource(activeSource === "src-2" ? null : "src-2")}
                name="CXO Elevate 360 — Program Overview.pptx" type="deck" size="38 slides · v.Feb 4"
              />
              <Source
                id="src-3" active={activeSource === "src-3"} onClick={() => setActiveSource(activeSource === "src-3" ? null : "src-3")}
                name="CAIO Profile (Enterprise).pptx" type="brief" size="22 slides · seller enablement"
              />
              <Source
                id="src-4" active={activeSource === "src-4"} onClick={() => setActiveSource(activeSource === "src-4" ? null : "src-4")}
                name="CAO_CAIO_CIO Real-World Examples.docx" type="notes" size="14 profiles"
              />
              <Source
                id="src-5" active={activeSource === "src-5"} onClick={() => setActiveSource(activeSource === "src-5" ? null : "src-5")}
                name="Cohort signal — CAIO LinkedIn pulse.csv" type="notes" size="32 rows"
              />
              <button className="rail-source dropzone">
                <Icon name="upload" size={14} style={{ marginRight: 6, verticalAlign: "-2px" }} />
                Drop a transcript or doc — T24 will diagnose
              </button>
            </div>
          </div>

          <div className="rail-section">
            <h4>Outline</h4>
            <div className="rail-list">
              <button className="rail-item active"><span className="ico"><Icon name="dot" size={12}/></span>The moment we're in</button>
              <button className="rail-item"><span className="ico"><Icon name="dot" size={12}/></span>Why this is the CMO's decade</button>
              <button className="rail-item"><span className="ico"><Icon name="dot" size={12}/></span>The narrative we'll tell</button>
              <button className="rail-item"><span className="ico"><Icon name="dot" size={12}/></span>What success looks like</button>
              <button className="rail-item muted"><span className="ico"><Icon name="plus" size={12}/></span>Add section</button>
            </div>
          </div>

          <div className="rail-section">
            <h4>Versions</h4>
            <div className="version-list">
              <button className="version-row active">
                <span className="vnum">v3</span>
                <span>Latest</span>
                <span className="who">T24 · 1h</span>
              </button>
              <button className="version-row">
                <span className="vnum">v2</span>
                <span>After Stephen's comments</span>
                <span className="who">T24 · yesterday</span>
              </button>
              <button className="version-row">
                <span className="vnum">v1</span>
                <span>From kickoff</span>
                <span className="who">T24 · Mar 30</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Editor */}
        <main className="ws-editor">
          <div className="editor-toolbar">
            <div className="left">
              <div className="editor-tabs">
                <button className={"editor-tab " + (editorTab === "draft" ? "active" : "")} onClick={() => setEditorTab("draft")}>Draft</button>
                <button className={"editor-tab " + (editorTab === "preview" ? "active" : "")} onClick={() => setEditorTab("preview")}>Preview</button>
                <button className={"editor-tab " + (editorTab === "diff" ? "active" : "")} onClick={() => setEditorTab("diff")}>Diff vs v2</button>
              </div>
              <span className="muted mono" style={{ fontSize: 11 }}>· {stage.outputType} · 1,847 words</span>
            </div>
            <div className="right">
              <button className="btn btn-quiet btn-sm"><Icon name="eye" size={12} />Read mode</button>
              <button className="btn btn-quiet btn-sm"><Icon name="download" size={12} />Export</button>
              <span className="divider" style={{ width: 1, height: 20, background: "var(--line)", margin: "0 4px" }} />
              <div className="avatar-stack avatar-stack-sm">
                <span className="avatar avatar-sm" style={{ background: T24.people.stephen.color, color: "#0c0b08" }}>SY</span>
              </div>
              <span className="muted" style={{ fontSize: 11 }}>watching</span>
            </div>
          </div>

          <div className="editor-canvas">
            {stageIdx === 0 ? (
              <NarrativePaper data={NARRATIVE} />
            ) : stageIdx === 1 ? (
              <NarrativeArc data={NARRATIVE} />
            ) : stageIdx === 2 ? (
              <Storyboard data={STORYBOARD} />
            ) : (
              <DeckView companyVariant={companyVariant} setCompanyVariant={setCompanyVariant} />
            )}
          </div>

          <ApprovalBar stage={stage} version={version} stageIdx={stageIdx} project={project} />
        </main>

        {/* Right rail */}
        <aside className="ws-rail-right">
          <div className="rail-tabs">
            <button className={"rail-tab " + (railTab === "refinements" ? "active" : "")} onClick={() => setRailTab("refinements")}>
              Refinements <span className="rail-tab-count">7</span>
            </button>
            <button className={"rail-tab " + (railTab === "comments" ? "active" : "")} onClick={() => setRailTab("comments")}>Comments</button>
            <button className={"rail-tab " + (railTab === "chat" ? "active" : "")} onClick={() => setRailTab("chat")}>Chat</button>
            <button className={"rail-tab " + (railTab === "decisions" ? "active" : "")} onClick={() => setRailTab("decisions")}>Decisions</button>
            <button className={"rail-tab " + (railTab === "activity" ? "active" : "")} onClick={() => setRailTab("activity")}>Log</button>
          </div>
          <div className="rail-content">
            {railTab === "refinements" && <RefinementsStream />}
            {railTab === "comments" && <CommentsThread />}
            {railTab === "chat" && <ChatThread />}
            {railTab === "decisions" && <DecisionsLog />}
            {railTab === "activity" && <StageActivity />}
          </div>
          {railTab !== "activity" && railTab !== "refinements" && railTab !== "decisions" && (
            <div className="composer">
              <textarea className="composer-input" placeholder={railTab === "comments" ? "Reply or @mention…" : "Message the team. Type @T24 to talk to AI."} />
              <div className="composer-actions">
                <div className="composer-tools">
                  <button className="btn-icon btn-sm"><Icon name="paperclip" size={13} /></button>
                  <button className="btn-icon btn-sm"><Icon name="users" size={13} /></button>
                  <button className="btn-icon btn-sm"><Icon name="sparkles" size={13} /></button>
                </div>
                <button className="btn btn-accent btn-sm"><Icon name="send" size={12} />Send</button>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* T24 presence — dock | panel | invisible — driven by Tweaks */}
      {aiMode === "dock" && <T24Dock expanded={t24Expanded} setExpanded={setT24Expanded} stage={stage} />}
      {aiMode === "panel" && <T24SidePanel stage={stage} />}

      {publishOpen && <PublishModal project={project} onClose={() => setPublishOpen(false)} />}
    </div>
  );
}

/* ============================ T24 SIDE PANEL ============================ */
/* Larger, persistent companion — used when aiMode === "panel". Slides in from
   the right edge as a docked column. Built for users who want T24 always
   visible, not tucked into a floating dock. */
function T24SidePanel({ stage }) {
  const [tab, setTab] = React.useState("ask");
  const suggestions = [
    "Make the opener punchier",
    "Tighten section 2 to 100 words",
    "Generate v4 from Stephen's comments",
    "Pull a peer quote from the AWS sync",
  ];
  return (
    <aside className="t24-side">
      <div className="t24-side-head">
        <div className="t24-side-id">
          <span className="t24-side-glyph">T24</span>
          <div>
            <div className="t24-side-name">T24</div>
            <div className="t24-side-context muted mono">on {stage.name}</div>
          </div>
        </div>
        <button className="btn-icon btn-sm" title="Collapse"><Icon name="chevron_right" size={13} /></button>
      </div>
      <div className="t24-side-tabs">
        <button className={"t24-side-tab " + (tab === "ask" ? "active" : "")} onClick={() => setTab("ask")}>Ask</button>
        <button className={"t24-side-tab " + (tab === "trail" ? "active" : "")} onClick={() => setTab("trail")}>Trail</button>
        <button className={"t24-side-tab " + (tab === "voice" ? "active" : "")} onClick={() => setTab("voice")}>Voice</button>
      </div>
      <div className="t24-side-body">
        {tab === "ask" && (
          <>
            <div className="t24-side-hello">
              <div className="t24-side-hello-tag">Reading right now</div>
              <div className="t24-side-hello-text">"{stage.outputType} · v3 — open at §3 (5 Gaps)."</div>
            </div>
            <div className="t24-side-chips">
              {suggestions.map((s, i) => (
                <button key={i} className="t24-side-chip"><Icon name="sparkles" size={11} />{s}</button>
              ))}
            </div>
          </>
        )}
        {tab === "trail" && (
          <div className="t24-side-trail">
            <div className="t24-side-trail-item">
              <span className="t24-side-trail-tag">Applied · 1h</span>
              <div>Removed the separate seller-enablement narrative.</div>
              <div className="muted mono" style={{ fontSize: 10.5, marginTop: 2 }}>Source: Vidya · AWS sync · 0:14:32</div>
            </div>
            <div className="t24-side-trail-item">
              <span className="t24-side-trail-tag">Applied · 1h</span>
              <div>Welded §3 (5 Gaps) to §4 (AWS response).</div>
              <div className="muted mono" style={{ fontSize: 10.5, marginTop: 2 }}>Source: Brad · AWS sync · 0:38:11</div>
            </div>
            <div className="t24-side-trail-item proposed">
              <span className="t24-side-trail-tag">Proposed · 32m</span>
              <div>Lead §1 with the dual mandate, not stats.</div>
            </div>
          </div>
        )}
        {tab === "voice" && (
          <div className="t24-side-voice">
            <div className="t24-side-voice-h">3 AI-tells flagged in the current draft.</div>
            <div className="t24-side-voice-row">
              <div className="phrase">"running on instinct for a generation"</div>
              <div className="muted" style={{ fontSize: 11 }}>Cliché. Tighter, more declarative.</div>
            </div>
            <div className="t24-side-voice-row">
              <div className="phrase">"remarkably good"</div>
              <div className="muted" style={{ fontSize: 11 }}>Soft hedge.</div>
            </div>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 10 }}><Icon name="sparkles" size={12} />Open full voice scan</button>
          </div>
        )}
      </div>
      <div className="t24-side-composer">
        <textarea className="composer-input" placeholder={`Ask T24 about the ${stage.name.toLowerCase()}…`} rows={2} />
        <div className="composer-actions">
          <div className="composer-tools">
            <button className="btn-icon btn-sm"><Icon name="paperclip" size={13} /></button>
            <button className="btn-icon btn-sm"><Icon name="sparkles" size={13} /></button>
          </div>
          <button className="btn btn-accent btn-sm"><Icon name="send" size={12} />Send</button>
        </div>
      </div>
    </aside>
  );
}

/* ============================ PUBLISH MODAL ============================ */
function PublishModal({ project, onClose }) {
  const [step, setStep] = React.useState("review"); // review | pushing | done
  const slug = (project.persona || "play").toLowerCase().replace(/\s+/g, "-");
  const folder = `/BLN24/AWS/Plays/${project.industry || "Cross-industry"}/${slug}-2026`;
  const files = [
    { name: `01_Brief.md`, kind: "Brief", from: "Stage 0 · Inputs", size: "4 kb" },
    { name: `02_Narrative_v3.md`, kind: "Narrative", from: "Stage I · Approved", size: "21 kb" },
    { name: `03_Arc_v3.md`, kind: "Arc",       from: "Stage II · Approved", size: "9 kb" },
    { name: `04_Storyboard_v3.md`, kind: "Storyboard", from: "Stage III · In review", size: "32 kb" },
    { name: `05_Deck_v3.pptx`, kind: "Deck", from: "Stage IV · Draft", size: "4.8 mb" },
    { name: `06_Voice_pass.md`, kind: "Notes", from: "Voice scan", size: "3 kb" },
    { name: `07_Decisions_log.md`, kind: "Notes", from: "Decisions", size: "7 kb" },
  ];

  const startPublish = () => {
    setStep("pushing");
    setTimeout(() => setStep("done"), 2200);
  };

  return (
    <div className="pub-overlay" onClick={onClose}>
      <div className="pub-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pub-close" onClick={onClose}><Icon name="close" size={14} /></button>

        <header className="pub-head">
          <div className="eyebrow">Stage handoff</div>
          <h1 className="pub-title">
            {step === "done" ? <>Published to <em>SharePoint</em>.</> : <>Publish this play to <em>SharePoint</em>.</>}
          </h1>
          <p className="pub-sub">
            {step === "review" && "Mirrors the play-kit folder structure. Anyone with access reads exactly what the agents read."}
            {step === "pushing" && "Pushing files now. Don't close — this takes about 8 seconds."}
            {step === "done" && "All artifacts are now in SharePoint. Stephen and the AWS team have been notified."}
          </p>
        </header>

        {step !== "done" && (
          <div className="pub-folder-row">
            <div className="pub-folder">
              <span className="pub-folder-tag">Destination</span>
              <code className="pub-folder-path">{folder}</code>
            </div>
            <button className="btn btn-quiet btn-sm" disabled={step !== "review"}><Icon name="folder_open" size={12} />Change</button>
          </div>
        )}

        <div className="pub-files">
          {files.map((f, i) => {
            const status = step === "done" ? "ok" : step === "pushing" ? (i < 4 ? "ok" : i === 4 ? "pushing" : "queued") : "ready";
            return (
              <div key={i} className={"pub-file pub-file-" + status}>
                <span className="pub-file-pip" />
                <span className="pub-file-name">
                  <Icon name={f.kind === "Deck" ? "presentation" : f.kind === "Notes" ? "doc" : "doc_text"} size={13} />
                  <span className="mono">{f.name}</span>
                </span>
                <span className="pub-file-from muted">{f.from}</span>
                <span className="pub-file-size mono muted">{f.size}</span>
                <span className="pub-file-status">
                  {status === "ok" && <><Icon name="check" size={11} /> Synced</>}
                  {status === "pushing" && <>Pushing…</>}
                  {status === "queued" && <>Queued</>}
                  {status === "ready" && <>Ready</>}
                </span>
              </div>
            );
          })}
        </div>

        {step === "review" && (
          <>
            <div className="pub-options">
              <label className="pub-opt">
                <input type="checkbox" defaultChecked />
                <span>Notify Stephen, Michael, and the AWS reviewers</span>
              </label>
              <label className="pub-opt">
                <input type="checkbox" defaultChecked />
                <span>Lock current versions on publish (v3 across the board)</span>
              </label>
              <label className="pub-opt">
                <input type="checkbox" />
                <span>Generate a public read-only review link (expires in 14 days)</span>
              </label>
            </div>

            <footer className="pub-foot">
              <div className="pub-foot-meta muted mono">7 files · 4.9 mb · MS Graph · ms-bln24.sharepoint.com</div>
              <div className="pub-foot-actions">
                <button className="btn btn-quiet" onClick={onClose}>Cancel</button>
                <button className="btn btn-accent" onClick={startPublish}><Icon name="upload" size={12} />Publish all</button>
              </div>
            </footer>
          </>
        )}

        {step === "pushing" && (
          <div className="pub-pushing">
            <div className="pub-pushing-bar"><div className="pub-pushing-fill" /></div>
            <div className="muted mono" style={{ fontSize: 11 }}>Authenticating with Microsoft Graph · uploading via /me/drive/special/approot</div>
          </div>
        )}

        {step === "done" && (
          <footer className="pub-foot">
            <div className="pub-foot-meta">
              <Icon name="check" size={12} /> All 7 files synced. <span className="muted">Stephen and the AWS reviewers were notified.</span>
            </div>
            <div className="pub-foot-actions">
              <button className="btn btn-quiet" onClick={onClose}>Close</button>
              <button className="btn btn-accent"><Icon name="folder_open" size={12} />Open in SharePoint</button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function Source({ id, name, type, size, fresh, badge, pins, active, onClick }) {
  const ico = type === "transcript" ? "doc_text" : type === "deck" ? "presentation" : type === "notes" ? "doc" : "doc";
  return (
    <div className={"rail-source clickable " + (active ? "active " : "") + (fresh ? "fresh " : "")} onClick={onClick}>
      <span className="src-name">
        <Icon name={ico} size={13} />
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
        {fresh && <span className="src-fresh-dot" title="New — diagnosing" />}
      </span>
      <span className="src-meta">
        <span>{type}</span><span>·</span><span>{size}</span>
        {badge && <span className="src-badge">{badge}</span>}
      </span>
      {active && pins && pins.length > 0 && (
        <div className="src-pins">
          {pins.map((p, i) => (
            <div key={i} className="src-pin">
              <div className="src-pin-head">
                <span className="src-pin-who">{p.who}</span>
                <span className="src-pin-anchor">{p.anchor}</span>
              </div>
              <div className="src-pin-text">"{p.text}"</div>
            </div>
          ))}
          <button className="src-pin-add">
            <Icon name="plus" size={11} /> Pin a new quote
          </button>
        </div>
      )}
    </div>
  );
}

function DeckView({ companyVariant = "default", setCompanyVariant }) {
  const [active, setActive] = React.useState(0);
  const slides = window.DECK_SLIDES || [];
  if (!slides.length) return <div className="muted">No slides</div>;

  const variants = window.COMPANY_VARIANTS || [];
  const variant = variants.find(v => v.id === companyVariant) || variants[0];
  const slide = applyVariant(slides[active], variant);

  return (
    <div className="deck-preview">
      {variants.length > 0 && (
        <div className="deck-variant-row">
          <div className="deck-variant-eyebrow">
            <span className="lbl">Personalize for</span>
            <span className="muted mono">Stage IV swaps industry tokens, peer quotes, and pilot framing per account.</span>
          </div>
          <div className="deck-variant-chips">
            {variants.map(v => (
              <button
                key={v.id}
                className={"deck-variant-chip " + (companyVariant === v.id ? "active" : "")}
                onClick={() => setCompanyVariant && setCompanyVariant(v.id)}
              >
                <span className="dvc-mark" style={{ background: v.color }}>{v.mark}</span>
                <span className="dvc-name">{v.name}</span>
                <span className="dvc-industry muted mono">{v.industry}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="deck-stage-row">
        <button className="deck-nav-edge deck-nav-edge-prev" disabled={active === 0} onClick={() => setActive(Math.max(0, active - 1))} aria-label="Previous slide">
          <Icon name="chevron_left" size={18} />
        </button>
        <div className="deck-stage-wrap">
          <div className="deck-slide" key={active + "-" + companyVariant}>
            <DeckSlide slide={slide} idx={active} total={slides.length} variant={variant} />
          </div>
        </div>
        <button className="deck-nav-edge deck-nav-edge-next" disabled={active === slides.length - 1} onClick={() => setActive(Math.min(slides.length - 1, active + 1))} aria-label="Next slide">
          <Icon name="chevron_right" size={18} />
        </button>
      </div>
      <div className="deck-strip">
        {slides.map((s, i) => (
          <button key={i} className={"deck-strip-tile " + (i === active ? "active" : "")} onClick={() => setActive(i)}>
            <span className="deck-strip-num">{String(i + 1).padStart(2, "0")}</span>
            <div className="deck-strip-mini">
              <DeckSlide slide={applyVariant(s, variant)} idx={i} total={slides.length} variant={variant} mini />
            </div>
            <span className="deck-strip-label">{s.shortTitle || s.title?.split("\n")[0]}</span>
          </button>
        ))}
      </div>
      <div className="deck-meta-row">
        <div className="deck-meta-line">
          <span className="deck-meta-pair"><span className="lbl">Slide</span><span className="val">{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span></span>
          <span className="deck-meta-pair"><span className="lbl">Variant</span><span className="val">{variant ? variant.name : "Default"}</span></span>
          <span className="deck-meta-pair"><span className="lbl">Status</span><span className="val">{slide.status || "Draft"}</span></span>
          <span className="deck-meta-pair"><span className="lbl">Layout</span><span className="val">{slide.kind}</span></span>
        </div>
        <div className="deck-meta-actions">
          <button className="btn btn-quiet btn-sm"><Icon name="presentation" size={12} />Present</button>
          <button className="btn btn-accent btn-sm"><Icon name="download" size={12} />.pptx — {variant ? variant.name : "default"}</button>
        </div>
      </div>
    </div>
  );
}

/* Apply a company variant to a slide — token swap + override map. */
function applyVariant(slide, variant) {
  if (!variant || variant.id === "default") return slide;
  const tokens = variant.tokens || {};
  const swap = (s) => {
    if (typeof s !== "string") return s;
    let out = s;
    for (const [k, v] of Object.entries(tokens)) {
      out = out.split("{" + k + "}").join(v);
    }
    return out;
  };
  const override = (variant.slides || {})[slide.kind + ":" + (slide.eyebrow || "")] || {};
  const recur = (val) => {
    if (val == null) return val;
    if (typeof val === "string") return swap(val);
    if (Array.isArray(val)) return val.map(recur);
    if (typeof val === "object") {
      const out = {};
      for (const k of Object.keys(val)) out[k] = recur(val[k]);
      return out;
    }
    return val;
  };
  return { ...recur(slide), ...override };
}

/* ============================ DECK SLIDE LAYOUTS ============================ */
/* Each slide is 1280x720 internally, scaled by parent. Layouts modeled on
   storyboard cards: title, sectionDivider, mandate, shift, gapsGrid, gapDetail,
   pillars, sequence, options, takeaways, closer. */

function DeckSlide({ slide, idx, total, mini = false, variant }) {
  const Comp = DECK_LAYOUTS[slide.kind] || DECK_LAYOUTS.title;
  const brand = variant && variant.id !== "default"
    ? `CAIO ELEVATE · FIRST CALL · ${variant.name.toUpperCase()}`
    : "CAIO ELEVATE · FIRST CALL DECK";
  return (
    <div className={"ds-frame ds-frame--" + slide.kind + (mini ? " is-mini" : "")} style={variant && variant.color ? { "--variant-accent": variant.color } : undefined}>
      <div className="ds-canvas">
        {!mini && (
          <header className="ds-chrome">
            <span className="ds-chrome-brand">{brand}</span>
            <span className="ds-chrome-num">{String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          </header>
        )}
        <Comp slide={slide} mini={mini} />
        {!mini && <div className="ds-rule" />}
      </div>
    </div>
  );
}

const DECK_LAYOUTS = {
  title: ({ slide }) => (
    <div className="ds-title">
      <div className="ds-title-eyebrow">{slide.eyebrow}</div>
      <h1 className="ds-title-h">{slide.title}</h1>
      <div className="ds-title-rule" />
      <div className="ds-title-sub">{slide.sub}</div>
      <div className="ds-title-foot">
        <span>{slide.audience}</span>
        <span>{slide.date}</span>
      </div>
    </div>
  ),

  sectionDivider: ({ slide }) => (
    <div className="ds-section">
      <div className="ds-section-num">{slide.num}</div>
      <div className="ds-section-body">
        <div className="ds-section-eyebrow">{slide.eyebrow}</div>
        <h1 className="ds-section-h">{slide.title}</h1>
        <p className="ds-section-sub">{slide.sub}</p>
      </div>
    </div>
  ),

  mandate: ({ slide }) => (
    <div className="ds-content">
      <SlideHead slide={slide} />
      <div className="ds-mandate">
        {slide.cols.map((c, i) => (
          <div key={i} className="ds-mandate-col">
            <div className="ds-mandate-tag">{c.tag}</div>
            <div className="ds-mandate-name">{c.name}</div>
            <div className="ds-mandate-rows">
              {c.rows.map((r, j) => (
                <div key={j} className="ds-mandate-row">
                  <div className="lbl">{r.label}</div>
                  <div className="val">{r.body}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  shift: ({ slide }) => (
    <div className="ds-content">
      <SlideHead slide={slide} />
      <div className="ds-shift">
        <div className="ds-shift-head">
          <div className="ds-shift-from-h">
            <div className="tag">{slide.from.tag}</div>
            <div className="name">{slide.from.name}</div>
          </div>
          <div className="ds-shift-arrow">→</div>
          <div className="ds-shift-to-h">
            <div className="tag">{slide.to.tag}</div>
            <div className="name">{slide.to.name}</div>
          </div>
        </div>
        <div className="ds-shift-rows">
          {slide.rows.map((r, i) => (
            <div key={i} className="ds-shift-row">
              <div className="from">{r[0]}</div>
              <div className="arrow">→</div>
              <div className="to">{r[1]}</div>
            </div>
          ))}
        </div>
        {slide.anchor && (
          <div className="ds-shift-anchor">
            <blockquote>"{slide.anchor.body}"</blockquote>
            <div className="attr">— {slide.anchor.attr}</div>
          </div>
        )}
      </div>
    </div>
  ),

  gapsGrid: ({ slide }) => (
    <div className="ds-content">
      <SlideHead slide={slide} />
      <div className="ds-gaps">
        {slide.gaps.map((g, i) => (
          <div key={i} className={"ds-gap" + (g.subtle ? " is-subtle" : "")}>
            <div className="ds-gap-n">{g.n}</div>
            <div className="ds-gap-name">{g.name}</div>
            <div className="ds-gap-stat">{g.stat}</div>
          </div>
        ))}
      </div>
      {slide.kicker && <div className="ds-kicker">{slide.kicker}</div>}
    </div>
  ),

  gapDetail: ({ slide }) => (
    <div className="ds-content">
      <SlideHead slide={slide} />
      <div className="ds-gd">
        <div className="ds-gd-row">
          <div className="lbl">Data</div>
          <div className="body">{slide.data}</div>
        </div>
        <div className="ds-gd-row">
          <div className="lbl">Peer voice</div>
          <div className="body"><strong>{slide.voice.who}</strong> — "{slide.voice.body}"</div>
        </div>
        <div className="ds-gd-row is-answer">
          <div className="lbl">AWS answer</div>
          <div className="body">{slide.answer}</div>
        </div>
      </div>
      <div className="ds-gd-foot">
        <div><span className="lbl">Pilot move</span><span>{slide.pilot}</span></div>
        <div><span className="lbl">Persona</span><span>{slide.persona}</span></div>
      </div>
    </div>
  ),

  pillars: ({ slide }) => (
    <div className="ds-content">
      <SlideHead slide={slide} />
      <div className="ds-pillars">
        {slide.pillars.map((p, i) => (
          <div key={i} className="ds-pillar">
            <div className="ds-pillar-head">{p.name}</div>
            <ul>
              {p.items.map(([n, b], j) => (
                <li key={j}><strong>{n}</strong><span>{b}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  ),

  sequence: ({ slide }) => (
    <div className="ds-content">
      <SlideHead slide={slide} />
      <div className="ds-seq">
        {slide.phases.map((p, i) => (
          <div key={i} className="ds-seq-phase">
            <div className="ds-seq-head">
              <div className="n">Phase {p.n}</div>
              <div className="name">{p.name}</div>
            </div>
            <ul>
              {p.items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
            <div className="ds-seq-foot">
              <span className="lbl">Mandate</span>
              <span>{p.mandate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  options: ({ slide }) => (
    <div className="ds-content">
      <SlideHead slide={slide} />
      <div className="ds-options">
        {slide.options.map((o, i) => (
          <div key={i} className="ds-option">
            <div className="ds-option-tag">{o.name}</div>
            <div className="ds-option-title">{o.title}</div>
            <div className="ds-option-rows">
              <div><span className="lbl">Scope</span><span>{o.scope}</span></div>
              <div><span className="lbl">Duration</span><span>{o.duration}</span></div>
              <div><span className="lbl">Evidence</span><span>{o.evidence}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  takeaways: ({ slide }) => (
    <div className="ds-content">
      <SlideHead slide={slide} />
      <div className="ds-takeaways">
        {slide.items.map((t, i) => (
          <div key={i} className="ds-take">
            <div className="ds-take-n">{t.n}</div>
            <div className="ds-take-tag">{t.tag}</div>
            <p>{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  ),

  closer: ({ slide }) => (
    <div className="ds-closer">
      <div className="ds-closer-eyebrow">{slide.eyebrow}</div>
      <h1 className="ds-closer-h">{slide.title}</h1>
      <div className="ds-closer-rule" />
      <p className="ds-closer-sub">{slide.sub}</p>
      <div className="ds-closer-cta">{slide.cta}</div>
    </div>
  ),

  stat: ({ slide }) => (
    <div className="ds-content ds-content--stat">
      <SlideHead slide={slide} />
      <div className="ds-stats">
        {slide.stats.map((s, i) => (
          <div key={i} className="ds-stat">
            <div className="ds-stat-big">{s.big}</div>
            <div className="ds-stat-body">{s.body}</div>
          </div>
        ))}
      </div>
      {slide.kicker && <div className="ds-kicker">{slide.kicker}</div>}
    </div>
  ),
};

function SlideHead({ slide }) {
  return (
    <header className="ds-h">
      <div className="ds-h-eyebrow">{slide.eyebrow}</div>
      <h2 className="ds-h-title">{slide.title}</h2>
      {slide.lede && <p className="ds-h-lede">{slide.lede}</p>}
    </header>
  );
}

// Stage owner labels — who approves each stage
const STAGE_OWNER_LABELS = [
  { approver: "Angie",         hint: "Angie reviews and approves the narrative before it moves to Arc." },
  { approver: "Angie",         hint: "Angie approves the Arc before Stephen builds the storyboard." },
  { approver: "Angie + Stephen", hint: "Both Angie and Stephen sign off on the storyboard before the deck is built." },
  { approver: "AWS",           hint: "Client (AWS) approves the final deck. Mark approved once confirmed via email or Zoom." },
];

function ApprovalBar({ stage, version, stageIdx, project }) {
  const [voiceOpen, setVoiceOpen] = React.useState(false);
  const playSlug = project?.slug || project?.id || "";
  const [approval, setApproval] = React.useState(() =>
    window.spGetApproval ? spGetApproval(playSlug, stageIdx) : null
  );
  const ownerInfo = STAGE_OWNER_LABELS[stageIdx] || STAGE_OWNER_LABELS[0];

  const handleApprove = () => {
    if (!window.spSetApproval) return;
    const user = window.msalInstance?.getAllAccounts?.()?.[0]?.name || ownerInfo.approver;
    const data = spSetApproval(playSlug, stageIdx, user);
    setApproval(data);
  };

  const handleUnapprove = () => {
    if (!window.spClearApproval) return;
    spClearApproval(playSlug, stageIdx);
    setApproval(null);
  };
  const tells = [
    { phrase: "running on instinct for a generation", note: "Cliché. Angie's spec calls for tighter, more declarative openings.", suggest: "running on instinct" },
    { phrase: "remarkably good", note: "Soft hedge. AWS reviewers consistently flag these.", suggest: "good" },
    { phrase: "the next great brand isn't…", note: "Inverted-cliché construction T24 over-uses. Stephen flagged in v2.", suggest: "Strong brands compound — every campaign, every customer, every channel." },
    { phrase: "operate the brand the way Engineering operates a product", note: "Good metaphor. Keep.", suggest: null, keep: true },
  ];
  return (
    <>
      {voiceOpen && (
        <div className="voice-pass">
          <div className="voice-pass-head">
            <div>
              <div className="voice-pass-title"><Icon name="sparkles" size={14} />Voice scan — does this sound like BLN24?</div>
              <div className="voice-pass-sub">T24 flags AI-tells in its own draft. Apply, ignore, or rewrite per item before approving.</div>
            </div>
            <button className="btn btn-quiet btn-sm" onClick={() => setVoiceOpen(false)}><Icon name="close" size={12} />Close</button>
          </div>
          <div className="voice-pass-list">
            {tells.map((t, i) => (
              <div key={i} className={"voice-tell " + (t.keep ? "keep" : "")}>
                <div className="voice-tell-flag">{t.keep ? <Icon name="check" size={11} /> : <Icon name="sparkles" size={11} />}</div>
                <div className="voice-tell-body">
                  <div className="voice-tell-phrase">"{t.phrase}"</div>
                  <div className="voice-tell-note">{t.note}</div>
                </div>
                <div className="voice-tell-suggest-col">
                  {t.suggest && !t.keep ? (
                    <div className="voice-tell-suggest">
                      <span className="lbl">Rewrite as</span>
                      <span className="quoted">"{t.suggest}"</span>
                    </div>
                  ) : t.keep ? (
                    <div className="voice-tell-keep">
                      <span className="lbl">Keep as is</span>
                    </div>
                  ) : null}
                </div>
                {!t.keep ? (
                  <div className="voice-tell-actions">
                    <button className="btn btn-accent btn-xs">Apply</button>
                    <button className="btn btn-quiet btn-xs">Ignore</button>
                  </div>
                ) : <div />}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="approval-bar">
        <div className="approval-bar-info">
          {approval ? (
            <>
              <span className="lbl" style={{color:"var(--success,#22c55e)"}}>✓ Approved</span>
              <span className="val">{stage.name} approved by <strong>{approval.by}</strong> · {new Date(approval.at).toLocaleDateString()}</span>
            </>
          ) : (
            <>
              <span className="lbl">Awaiting approval</span>
              <span className="val">
                <strong>{ownerInfo.approver}</strong> approves. {ownerInfo.hint}
              </span>
            </>
          )}
        </div>
        <div className="approval-bar-actions">
          <button className={"btn btn-ghost " + (voiceOpen ? "active" : "")} onClick={() => setVoiceOpen(!voiceOpen)}>
            <Icon name="sparkles" size={13} />
            <span>Voice scan</span>
            <span className="btn-pip">3</span>
          </button>
          <button className="btn btn-ghost"><Icon name="message" size={13} />Request changes</button>
          <button className="btn btn-ghost"><Icon name="sparkles" size={13} />Ask T24 for v{version + 1}</button>
          {approval ? (
            <button className="btn btn-ghost" style={{color:"var(--muted)"}} onClick={handleUnapprove}>
              <Icon name="close" size={13} />Unapprove
            </button>
          ) : (
            <button className="btn btn-accent" onClick={handleApprove}>
              <Icon name="check" size={13} />Mark {stage.name} Approved
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function CommentsThread() {
  const comments = [
    { who: "stephen", at: "12 min ago", anchor: 1, text: "Love this opener — but is the “instinct” framing too soft for AWS? Maybe sharper." },
    { who: "angie", at: "32 min ago", anchor: 2, text: "@Stephen this is the line that will land with a CMO. Make sure we don’t lose it in the Arc." },
    { who: "michael", at: "1 hr ago", text: "When this gets to me for the deck, I want to mock the opener as a full-bleed slide. Let's hold space for it." },
    { who: "t24", at: "1 hr ago", anchor: 3, text: "Pull-quote candidate. I made this slightly more declarative than v2 per Angie's note about \"saying yes faster.\" Want me to soften it?", ai: true },
  ];
  return (
    <div>
      {comments.map((c, i) => {
        const person = T24.people[c.who];
        return (
          <div key={i} className={"chat-msg " + (c.ai ? "ai" : "")}>
            <span className="avatar avatar-sm" style={{ background: person.color, color: "#0c0b08" }}>{person.initials}</span>
            <div className="chat-msg-body">
              <div className="chat-msg-head">
                <span className="name">{person.name}</span>
                {c.ai && <span className="role amber">AI</span>}
                {c.anchor && <span className="pill pill-amber" style={{ fontSize: 9 }}>§{c.anchor}</span>}
                <span className="time">{c.at}</span>
              </div>
              <div className="chat-msg-text">{c.text.split(/(@\w+)/).map((p, j) => p.startsWith("@") ? <span key={j} className="mention">{p}</span> : p)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ChatThread() {
  const messages = [
    { who: "angie", at: "2:14 PM", text: "Going into the AWS sync at 4. What angle should we lean on for the close?" },
    { who: "stephen", at: "2:18 PM", text: "I'd push the \"90-day pilot, not multi-year\" framing. AWS Retail keeps asking for proof you can move fast." },
    { who: "t24", at: "2:19 PM", ai: true, text: "Looking across the cohort, three of the eight CMOs (Target, L'Oréal, Sephora) shipped a 60-day AI pilot last year. Want me to add that as a precedent in §3?" },
    { who: "angie", at: "2:21 PM", text: "@T24 yes, do it. Subtle, not showy." },
  ];
  return (
    <div>
      {messages.map((m, i) => {
        const person = T24.people[m.who];
        return (
          <div key={i} className={"chat-msg " + (m.ai ? "ai" : "")}>
            <span className="avatar avatar-sm" style={{ background: person.color, color: "#0c0b08" }}>{person.initials}</span>
            <div className="chat-msg-body">
              <div className="chat-msg-head">
                <span className="name">{person.name}</span>
                {m.ai && <span className="role amber">AI</span>}
                <span className="time">{m.at}</span>
              </div>
              <div className="chat-msg-text">{m.text.split(/(@\w+)/).map((p, j) => p.startsWith("@") ? <span key={j} className="mention">{p}</span> : p)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StageActivity() {
  const [overrides, setOverrides] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem("t24-inbox-overrides") || "{}"); }
    catch { return {}; }
  });
  React.useEffect(() => {
    const onStorage = () => {
      try { setOverrides(JSON.parse(localStorage.getItem("t24-inbox-overrides") || "{}")); }
      catch {}
    };
    const tick = setInterval(onStorage, 800);
    window.addEventListener("storage", onStorage);
    return () => { clearInterval(tick); window.removeEventListener("storage", onStorage); };
  }, []);

  const resolutionEvents = Object.entries(overrides).flatMap(([key, o]) => {
    const [stamp, who] = key.split("|");
    const agent = who.toLowerCase();
    const agentName = who;
    return [
      { who: agent, t: `picked back up — ${o.text.slice(0, 70)}${o.text.length > 70 ? "…" : ""}`, at: "just now", isResume: true },
      { who: "angie", t: `resolved ${agentName}'s open question`, at: "just now" },
    ];
  });

  const baseItems = [
    { who: "t24", t: "generated v3", at: "1 hr ago" },
    { who: "stephen", t: "added 4 comments on §1", at: "12 min ago" },
    { who: "angie", t: "updated outline", at: "2 hr ago" },
    { who: "scout", t: "ingested 'AWS Marketing Vertical Brief.pdf' — added S-014 through S-018", at: "yesterday" },
    { who: "angie", t: "approved Narrative v2 → advanced to Arc", at: "yesterday" },
    { who: "stephen", t: "left feedback on v2", at: "2 days ago" },
    { who: "anvil", t: "drafted v2 — 7 moves", at: "2 days ago" },
    { who: "you", t: "uploaded 4 source files", at: "Mar 30" },
    { who: "anvil", t: "drafted v1 from CMO Roundtable transcript", at: "Mar 30" },
    { who: "you", t: "created CMO play · cohort of 24", at: "Mar 28" },
  ];
  const items = [...resolutionEvents, ...baseItems];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {items.map((a, i) => {
        const person = T24.people[a.who] || T24.people.t24;
        return (
          <div key={i} style={{ display: "flex", gap: 10, padding: "12px 0", borderBottom: "1px solid var(--line)", fontSize: 12.5, background: a.isResume ? "rgba(155,209,122,0.08)" : "transparent" }}>
            <span className="avatar avatar-sm" style={{ background: person.color, color: "#0c0b08" }}>{person.initials}</span>
            <div style={{ flex: 1 }}>
              <div><strong>{person.name}</strong> <span className="muted">{a.t}</span></div>
              <div className="muted mono" style={{ fontSize: 10.5, marginTop: 2 }}>{a.at}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RefinementsStream() {
  const items = [
    {
      n: 1, status: "applied", type: "transcript-conflict",
      title: "One deck, not two",
      sourceWho: "Vidya", sourceAnchor: "AWS sync · 0:14:32",
      sourceQuote: "Sellers should walk the same deck they'd present to customers. No separate enablement version.",
      change: "Removed the separate seller-enablement narrative. Stage I now produces one unified arc.",
      who: "t24", at: "1 hr ago",
    },
    {
      n: 2, status: "applied", type: "transcript-conflict",
      title: "Weld diagnostic to answer",
      sourceWho: "Brad", sourceAnchor: "AWS sync · 0:38:11",
      sourceQuote: "The 5 Gaps slide should connect immediately to AWS's response — not separated by an act break.",
      change: "Merged §3 (5 Gaps) and §4 (AWS response) into a single welded section.",
      who: "t24", at: "1 hr ago",
    },
    {
      n: 3, status: "applied", type: "missing-beat",
      title: "Add the LoB reframe",
      sourceWho: "Brad", sourceAnchor: "AWS sync · 0:52:06",
      sourceQuote: "The CAIO is a foundation-builder for their C-suite peers.",
      change: "Added §5 — peer conversations framed by outcome (Revenue, Cost, Risk, Product) rather than C-suite title.",
      who: "angie", at: "2 hr ago",
    },
    {
      n: 4, status: "applied", type: "pushback",
      title: "Peers by outcome, not title",
      sourceWho: "Angie", sourceAnchor: "Comment on §5 draft",
      sourceQuote: "CMO/CFO/COO artificially limits the conversation. CAIOs work with CROs, CISOs, Chief Product Officers depending on industry.",
      change: "Restructured §5 columns by outcome. C-suite titles are now illustrative tags the seller customizes per customer.",
      who: "angie", at: "2 hr ago",
    },
    {
      n: 5, status: "proposed", type: "voice",
      title: "Open on the dual mandate, not stats",
      sourceWho: "T24", sourceAnchor: "Voice scan · §1",
      sourceQuote: "The original opener leaned on role-prevalence stats. The dual-mandate framing is what differentiates the CAIO seat from CMO and COO.",
      change: "Suggest: rewrite §1 to lead with the dual mandate (internal labor + external product, simultaneously, no playbook).",
      who: "t24", at: "32 min ago",
    },
    {
      n: 6, status: "proposed", type: "structure",
      title: "Treat the mental-model slide as a branch",
      sourceWho: "T24", sourceAnchor: "Pattern in 3 prior calls",
      sourceQuote: "In the Apr 17 and Apr 24 transcripts, sellers diverged here based on whether the CAIO leaned LLM or agentic. A branch keeps the pace.",
      change: "Suggest: add fast-path / slow-path branching on §2.",
      who: "t24", at: "12 min ago",
    },
    {
      n: 7, status: "open", type: "open-question",
      title: "5 Gaps — design for ranking, not equal weight",
      sourceWho: "Stephen", sourceAnchor: "Comment on §3",
      sourceQuote: "Sellers won't get through all 5 in 45 min. The CAIO will tell us which 2 matter — design for that.",
      change: "Open question for dry run: should §3 ship with a ranking interaction, or sample-of-5?",
      who: "stephen", at: "8 min ago",
    },
  ];
  return (
    <div className="ref-stream">
      <div className="ref-stream-head">
        <div>
          <div className="ref-stream-title">Reasoning trail</div>
          <div className="ref-stream-sub">Every change tied back to a source moment. Pushbacks live here, not in comments.</div>
        </div>
        <div className="ref-stream-counts">
          <span className="ref-pip applied" /> <span>4 applied</span>
          <span className="ref-pip proposed" /> <span>2 proposed</span>
          <span className="ref-pip open" /> <span>1 open</span>
        </div>
      </div>
      {items.map(r => <Refinement key={r.n} r={r} />)}
    </div>
  );
}

function Refinement({ r }) {
  const person = T24.people[r.who];
  const statusLabel = r.status === "applied" ? "Applied" : r.status === "proposed" ? "Proposed by T24" : "Open question";
  const typeLabel = ({
    "transcript-conflict": "Transcript conflict",
    "missing-beat": "Missing beat",
    "pushback": "Pushback",
    "voice": "Voice",
    "structure": "Structure",
    "open-question": "Open question",
  })[r.type];
  return (
    <div className={"refinement " + r.status}>
      <div className="ref-num-rail">
        <span className="ref-num">{String(r.n).padStart(2, "0")}</span>
        <span className={"ref-status-pip " + r.status} />
      </div>
      <div className="ref-body">
        <div className="ref-head">
          <span className={"ref-type-tag " + r.type}>{typeLabel}</span>
          <span className="ref-status-text">{statusLabel}</span>
          <span className="ref-time">{r.at}</span>
        </div>
        <div className="ref-title">{r.title}</div>
        <div className="ref-source">
          <div className="ref-source-line">
            <span className="ref-source-who">{r.sourceWho}</span>
            <span className="ref-source-anchor">{r.sourceAnchor}</span>
          </div>
          <div className="ref-source-quote">"{r.sourceQuote}"</div>
        </div>
        <div className="ref-change">
          <span className="ref-change-arrow">→</span>
          <span>{r.change}</span>
        </div>
        {r.status === "proposed" && (
          <div className="ref-actions">
            <button className="btn btn-accent btn-sm"><Icon name="check" size={11} />Apply</button>
            <button className="btn btn-quiet btn-sm">Dismiss</button>
            <button className="btn btn-quiet btn-sm">Discuss</button>
          </div>
        )}
        {r.status === "open" && (
          <div className="ref-actions">
            <button className="btn btn-ghost btn-sm">Bring to dry run</button>
            <button className="btn btn-quiet btn-sm">Resolve</button>
          </div>
        )}
        {r.status === "applied" && (
          <div className="ref-byline">
            by <span className="avatar avatar-xs" style={{ background: person.color, color: "#0c0b08" }}>{person.initials}</span>
            <span style={{ color: "var(--ink)" }}>{person.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function T24Dock({ expanded, setExpanded, stage }) {
  const suggestions = [
    "Make the opener punchier",
    "Cite the 40M source inline",
    "Tighten section 2 to 100 words",
    "Generate v4 from Stephen's comments",
  ];
  return (
    <div className={"t24-dock " + (expanded ? "expanded" : "")}>
      <div className="t24-dock-head">
        <span className="t24-dock-glyph">T24</span>
        <input
          className="t24-dock-input"
          placeholder={expanded ? `Talk to T24 about the ${stage.name}…` : `Ask T24 anything about this ${stage.name.toLowerCase()}`}
          onFocus={() => setExpanded(true)}
        />
        {!expanded && <span className="t24-dock-hint"><kbd>⌘</kbd><kbd>I</kbd></span>}
        <button className="btn-icon" onClick={() => setExpanded(!expanded)}><Icon name={expanded ? "chevron_down" : "chevron_up"} size={14} /></button>
      </div>
      {expanded && (
        <div className="t24-suggestions">
          {suggestions.map((s, i) => (
            <button key={i} className="t24-chip"><Icon name="sparkles" size={11} />{s}</button>
          ))}
        </div>
      )}
    </div>
  );
}

window.Workspace = Workspace;
