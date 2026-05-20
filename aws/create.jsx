/* global React, Icon, T24, PersonaMark */

function CreatePlay({ onCancel, onCreated }) {
  const [step, setStep] = React.useState(0);
  const [persona, setPersona] = React.useState(null);
  const [customPersona, setCustomPersona] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [sources, setSources] = React.useState([]);   // { name, size, _file }
  const [draggingOver, setDraggingOver] = React.useState(false);
  const [generating, setGenerating] = React.useState(false);
  const [genStep, setGenStep] = React.useState(0);
  const [genError, setGenError] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState({});
  const [createdPlayId, setCreatedPlayId] = React.useState(null);

  const steps = ["Persona", "Brief", "Sources", "Review"];

  const submit = async () => {
    setGenerating(true);
    setGenError(null);
    const personaId = persona === "__custom" ? customPersona.toUpperCase().slice(0, 6) : persona;
    const playSlug = (window.SP?.playFolderName?.[personaId]) || `${personaId} Elevate`;
    const personaFull = persona === "__custom" ? customPersona : (T24.personaCatalog.find(p => p.id === personaId)?.full || personaId);

    try {
      // Phase 1: Ensure SharePoint folders
      setGenStep(1);
      if (window.spEnsureFolders) {
        await spEnsureFolders(playSlug).catch(e => console.warn("Folder create:", e));
      }

      // Phase 2: Upload source files to 01 - Source Materials
      setGenStep(2);
      const realFiles = sources.filter(s => s._file);
      const uploadedNames = [];
      for (const s of realFiles) {
        try {
          await spUpload(s._file, playSlug, "sources", (pct) => {
            setUploadProgress(prev => ({ ...prev, [s.name]: pct }));
          });
          uploadedNames.push(s.name);
        } catch (e) { console.warn("Upload", s.name, e); }
      }

      // Phase 3: Register play in T24-Plays.json
      setGenStep(3);
      let newPlay = null;
      if (window.spCreatePlay) {
        newPlay = await spCreatePlay({
          persona: personaId,
          personaFull,
          title: title || `${personaFull} play`,
        }).catch(e => { console.error("spCreatePlay:", e); throw e; });
      }

      // Phase 4: Drop generate-narrative marker so the cron picks it up
      setGenStep(4);
      const marker = JSON.stringify({
        persona: personaId,
        playSlug,
        action: "generate-narrative",
        title: title || `${personaFull} play`,
        requestedAt: new Date().toISOString(),
        status: "pending",
        sources: uploadedNames,
        note: "Auto-dispatched by Create flow. Draft Narrative working paper from these client sources; calibrate against source-docs exemplars (CAIO_Elevate_FCD_Narrative.docx, CAO_Elevate_Storyboard_FINAL.docx, CAO_CAIO_CIO_Real_World_Examples.docx, Deck_Strategy.md, instructions.md). Forward direction.",
      }, null, 2);
      const markerBlob = new File([marker], "pipeline-request.json", { type: "application/json" });
      if (window.spUpload) {
        await spUpload(markerBlob, playSlug, "sources").catch(e => console.warn("Marker drop:", e));
      }

      setGenStep(5);
      setTimeout(() => { if (onCreated) onCreated(newPlay); }, 600);
    } catch (e) {
      setGenError(e.message);
      setGenerating(false);
    }
  };

  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const canNext =
    step === 0 ? !!persona :
    step === 1 ? title.trim().length > 4 :
    true;

  if (generating) {
    const fileCount = sources.filter(s => s._file).length;
    const totalUploadPct = fileCount === 0 ? 100 : Math.round(
      Object.values(uploadProgress).reduce((a, b) => a + b, 0) / (fileCount * 100) * 100
    );
    const phases = [
      { label: "Setting up SharePoint folders…", done: genStep > 1 },
      { label: fileCount > 0 ? `Uploading ${fileCount} source file${fileCount === 1 ? "" : "s"}… ${genStep === 2 ? totalUploadPct + "%" : ""}` : "No files to upload", done: genStep > 2 },
      { label: "Registering play in T24-Plays.json…", done: genStep > 3 },
      { label: "Queuing narrative draft (T24 will read your sources)…", done: genStep > 4 },
      { label: "Done — opening your play.", done: genStep >= 5 },
    ];
    return (
      <div className="create-stage" style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ maxWidth: 540, textAlign: "center" }}>
          <div className="eyebrow amber">Creating your play</div>
          <h1 className="display" style={{ fontSize: 48, marginTop: 18, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Setting up the<br/><em style={{ fontStyle: "italic" }}>CAIO Elevate</em> play.
          </h1>
          <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 10, textAlign: "left" }}>
            {phases.map((p, i) => (
              <div key={i} className={"gen-step " + (p.done ? "done" : i + 1 === genStep ? "active" : "")} style={{opacity: i + 1 > genStep ? 0.35 : 1}}>
                <span className="dot" />
                <span style={{ flex: 1 }}>{p.label}</span>
                {p.done && <Icon name="check" size={14} className="amber" />}
              </div>
            ))}
          </div>
          {genStep >= 5 && (
            <div style={{ marginTop: 24, padding: 16, background: "var(--paper-elev)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", fontSize: 13 }}>
              <span className="muted">If the page doesn't redirect automatically — </span>
              <button className="btn btn-accent btn-sm" style={{ marginLeft: 8 }} onClick={() => {
                if (onCancel) onCancel();
              }}>
                Open play <Icon name="arrow_right" size={12} />
              </button>
            </div>
          )}
          <style>{`
            .gen-step { display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: var(--paper-elev); border: 1px solid var(--line); border-radius: var(--r-sm); font-size: 13.5px; color: var(--muted); opacity: 0.4; transition: all .3s; }
            .gen-step.active, .gen-step.done { opacity: 1; color: var(--ink-soft); }
            .gen-step .dot { width: 8px; height: 8px; border-radius: 99px; background: var(--accent); }
            .gen-step.active .dot { animation: pulse-soft 1s infinite; }
            .gen-step > span:nth-child(2) { flex: 1; }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="create-page">
      <div className="create-head">
        <button className="btn btn-quiet btn-sm" onClick={onCancel}><Icon name="close" size={13} />Cancel</button>
        <div className="create-stepper">
          {steps.map((s, i) => (
            <div key={s} className={"step " + (i === step ? "active" : i < step ? "done" : "")}>
              <span className="step-num mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="step-name">{s}</span>
            </div>
          ))}
        </div>
        <div style={{ width: 100 }} />
      </div>

      <div className="create-body">
        {step === 0 && (
          <div className="create-step">
            <div className="eyebrow">Step 01 · Persona</div>
            <h1 className="create-title">Who is this play <em>aimed at?</em></h1>
            <p className="create-sub">Plays target a role across many companies. Pick the C-suite persona this narrative is meant to resonate with.</p>
            <div className="persona-grid">
              {T24.personaCatalog.map(p => (
                <button key={p.id} className={"persona-card " + (persona === p.id ? "selected" : "")} onClick={() => setPersona(p.id)}>
                  <PersonaMark persona={p.name} size={44} color="rgba(244,183,63,.18)" />
                  <div className="persona-card-body">
                    <div className="persona-card-name">{p.full}</div>
                    <div className="persona-card-meta">
                      {p.count > 0 ? <span className="muted">{p.count} active play{p.count === 1 ? "" : "s"}</span> : <span className="muted">No prior plays</span>}
                    </div>
                  </div>
                  {persona === p.id && <Icon name="check" size={16} className="amber" />}
                </button>
              ))}
              <button className="persona-card persona-card-custom">
                <div style={{ width: 44, height: 44, borderRadius: 12, border: "1.5px dashed var(--line-strong)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="plus" size={18} className="muted" />
                </div>
                <input className="persona-card-name" style={{ background: "transparent", border: "none", outline: "none", flex: 1, color: "var(--ink)" }}
                       placeholder="Custom persona — e.g. VP of Innovation"
                       value={customPersona} onChange={e => { setCustomPersona(e.target.value); if (e.target.value) setPersona("__custom"); }} />
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="create-step">
            <div className="eyebrow">Step 02 · Brief</div>
            <h1 className="create-title">What's the <em>working title?</em></h1>
            <p className="create-sub">A one-line provocation that will headline the narrative. T24 will refine it after reading your sources.</p>
            <input className="big-input" placeholder={`Working title for the ${persona || ""} play…`} value={title} onChange={e => setTitle(e.target.value)} autoFocus />

            <div className="template-row">
              <span className="eyebrow" style={{ marginBottom: 12, display: "block" }}>Reference exemplars · forward chain</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { n: "01", name: "Narrative working paper", file: "CAIO_Elevate_FCD_Narrative.docx", desc: "Drafted first from your client sources. Sets purpose, design principles, 7-move arc, exit beliefs.", primary: true },
                  { n: "02", name: "Narrative arc",            file: "Derived from approved Narrative",   desc: "One card per move — seller goal, branch points, tactical notes, what the customer should feel." },
                  { n: "03", name: "Storyboard",               file: "CAO_Elevate_Storyboard_FINAL.docx", desc: "Slide-by-slide cards: title, message, visual intent, stats, sources. Generated from the approved Arc." },
                  { n: "04", name: "Final First Call Deck",    file: "PPTX, built last",                  desc: "The artifact a seller walks through in 45–60 min. Calibrated against the chain above, never written first." },
                ].map(ex => (
                  <div key={ex.n} style={{
                    display: "flex", gap: 14, padding: "12px 16px",
                    background: ex.primary ? "rgba(244,183,63,.04)" : "var(--paper-elev)",
                    border: `1px solid ${ex.primary ? "var(--accent)" : "var(--line)"}`,
                    borderRadius: "var(--r-sm)",
                    alignItems: "flex-start",
                  }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: ex.primary ? 700 : 500, color: ex.primary ? "var(--accent)" : "var(--muted)", letterSpacing: ".08em", marginTop: 1, flexShrink: 0, minWidth: 22 }}>{ex.n}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13.5 }}>{ex.name}{ex.primary && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: "var(--accent)", textTransform: "uppercase" }}>First · drafted from sources</span>}</div>
                      <div className="muted" style={{ fontSize: 11, marginTop: 3, fontFamily: "var(--mono)" }}>{ex.file}</div>
                      <div className="muted" style={{ fontSize: 12, marginTop: 4, lineHeight: 1.45 }}>{ex.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="muted" style={{ fontSize: 11.5, marginTop: 12, lineHeight: 1.5 }}>
                Forward direction: your sources → Narrative → Arc → Storyboard → Deck. Never the reverse. The exemplars hold the shape (7 moves, 5 enablers, peer-conversation framing); your client material drives the substance.
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="create-step">
            <div className="eyebrow">Step 03 · Sources</div>
            <h1 className="create-title">Feed T24 the <em>raw material.</em></h1>
            <p className="create-sub">Drop the meeting transcript, internal decks, briefs — anything from the client. The more T24 reads, the less it sounds like AI.</p>
            <div className={"big-dropzone " + (draggingOver ? "active" : "")}
                 onDragOver={e => { e.preventDefault(); setDraggingOver(true); }}
                 onDragLeave={() => setDraggingOver(false)}
                 onDrop={e => {
                   e.preventDefault(); setDraggingOver(false);
                   const newFiles = Array.from(e.dataTransfer.files).map(f => ({ name: f.name, size: f.size, _file: f }));
                   setSources(s => [...s, ...newFiles]);
                 }}
                 onClick={() => {
                   const input = document.createElement("input");
                   input.type = "file";
                   input.multiple = true;
                   input.accept = ".docx,.pdf,.pptx,.txt,.vtt,.mp4,.xlsx";
                   input.onchange = e => {
                     const newFiles = Array.from(e.target.files).map(f => ({ name: f.name, size: f.size, _file: f }));
                     setSources(s => [...s, ...newFiles]);
                   };
                   input.click();
                 }}>
              <Icon name="upload" size={32} />
              <div className="big" style={{ fontFamily: "var(--display)", fontSize: 32, marginTop: 12 }}>Drop transcripts, decks, notes, PDFs</div>
              <div className="muted" style={{ marginTop: 8 }}>or click to browse · .docx, .pdf, .pptx, .txt, .vtt</div>
              {sources.length === 0 && (
                <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                  <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); setSources([{ name: "CMO Roundtable Kickoff.docx", size: 48000, type: "transcript" }, { name: "AWS Marketing Vertical Brief.pdf", size: 1200000, type: "brief" }]); }}>
                    <Icon name="sparkles" size={12} />Use demo sources
                  </button>
                </div>
              )}
            </div>
            {sources.length > 0 && (
              <div className="source-list">
                {sources.map((s, i) => (
                  <div key={i} className="source-item">
                    <Icon name="doc" size={14} className="amber" />
                    <span style={{ flex: 1 }}>{s.name}</span>
                    <span className="muted mono" style={{ fontSize: 11 }}>{(s.size / 1024).toFixed(0)} KB</span>
                    <button className="btn-icon btn-sm" onClick={() => setSources(sources.filter((_, j) => j !== i))}><Icon name="close" size={12} /></button>
                  </div>
                ))}
                <div className="muted mono" style={{ fontSize: 11, padding: 12, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.15em" }}>{sources.length} source{sources.length === 1 ? "" : "s"} · ready</div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="create-step">
            <div className="eyebrow">Step 04 · Review</div>
            <h1 className="create-title">Ready to <em>start the play?</em></h1>
            <p className="create-sub">T24 will draft Narrative v1, create your SharePoint folders, and notify the team. You can change anything later.</p>

            <div className="review-card">
              <div className="review-row">
                <span className="lbl">Persona</span>
                <span className="val">
                  <PersonaMark persona={persona === "__custom" ? customPersona.slice(0,3).toUpperCase() : persona} size={28} color="rgba(244,183,63,.2)" />
                  {persona === "__custom" ? customPersona : T24.personaCatalog.find(p => p.id === persona)?.full}
                </span>
              </div>
              <div className="review-row"><span className="lbl">Working title</span><span className="val" style={{ fontFamily: "var(--display)", fontSize: 18, fontStyle: "italic" }}>"{title}"</span></div>
              <div className="review-row"><span className="lbl">Reference</span><span className="val">CXO Elevate FCD · 7-move arc · 5 enablers</span></div>
              <div className="review-row"><span className="lbl">Sources</span><span className="val">{sources.length} file{sources.length === 1 ? "" : "s"} ready for T24</span></div>
              <div className="review-row"><span className="lbl">Team</span><span className="val">
                <div className="avatar-stack avatar-stack-sm">
                  {["angie","stephen","michael"].map(p => { const person = T24.people[p]; return <span key={p} className="avatar avatar-sm" style={{ background: person.color, color: "#0c0b08" }}>{person.initials}</span>; })}
                </div>
                <span className="muted" style={{ marginLeft: 8 }}>Angie (lead), Stephen, Michael</span>
              </span></div>
              <div className="review-row"><span className="lbl">SharePoint</span><span className="val muted mono" style={{ fontSize: 12 }}>/BLN24/AWS/Plays/{(persona === "__custom" ? customPersona.slice(0,3).toUpperCase() : persona) || "—"}-{new Date().getFullYear()}/</span></div>
            </div>
          </div>
        )}
      </div>

      <div className="create-foot">
        <div className="create-foot-meta muted">
          {step + 1} of {steps.length} · {steps[step]}
        </div>
        <div className="create-foot-actions">
          {step > 0 && <button className="btn btn-ghost" onClick={back}><Icon name="arrow_left" size={13} />Back</button>}
          {step < steps.length - 1 && <button className="btn btn-accent" onClick={next} disabled={!canNext} style={{ opacity: canNext ? 1 : 0.4, pointerEvents: canNext ? "auto" : "none" }}>Continue <Icon name="arrow_right" size={13} /></button>}
          {step === steps.length - 1 && <button className="btn btn-accent" onClick={submit}><Icon name="sparkles" size={13} />Start the play</button>}
        </div>
      </div>
    </div>
  );
}

window.CreatePlay = CreatePlay;
