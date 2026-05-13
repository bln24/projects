/* global React, Icon, T24, StatusPill */

/* ============================================================
   Workspace — live play data, document shelf, stage progression
   No placeholders. No hardcoded content. Real SharePoint data.
   ============================================================ */

const STAGE_DEFS = [
  { id: "narrative",  name: "Narrative",  short: "I",   owner: "angie",   label: "Stage 1" },
  { id: "arc",        name: "Arc",        short: "II",  owner: "angie",   label: "Stage 2" },
  { id: "storyboard", name: "Storyboard", short: "III", owner: "stephen", label: "Stage 3" },
  { id: "deck",       name: "Deck",       short: "IV",  owner: "aws",     label: "Stage 4" },
];

const STAGE_FOLDERS = {
  0: ["sources", "narrative"],
  1: ["arc"],
  2: ["storyboard"],
  3: ["deck"],
};

function fileIcon(name) {
  if (!name) return "doc";
  const ext = name.split(".").pop().toLowerCase();
  if (ext === "pptx" || ext === "ppt") return "presentation";
  if (ext === "pdf") return "doc_text";
  if (ext === "docx" || ext === "doc" || ext === "md") return "doc_text";
  return "doc";
}

function formatSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ---- Document Shelf ---- */
function FileCard({ file }) {
  const sharePointBase = "https://thebln24.sharepoint.com/sites/AWST24/_layouts/15/WopiFrame.aspx";
  const openUrl = file.id
    ? `${sharePointBase}?sourcedoc=${encodeURIComponent(file.id)}&action=view`
    : file.webUrl;

  return (
    <div className="ws-file-card">
      <div className="ws-file-icon">
        <Icon name={fileIcon(file.name)} size={20} />
      </div>
      <div className="ws-file-info">
        <div className="ws-file-name">{file.name}</div>
        <div className="ws-file-meta">
          {formatSize(file.size)}{file.modified ? ` · ${formatDate(file.modified)}` : ""}
        </div>
      </div>
      <div className="ws-file-actions">
        {openUrl && (
          <a href={openUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
            <Icon name="eye" size={12} />Open
          </a>
        )}
        {file.webUrl && (
          <a href={file.webUrl} target="_blank" rel="noopener noreferrer" className="btn btn-quiet btn-sm">
            <Icon name="download" size={12} />Download
          </a>
        )}
      </div>
    </div>
  );
}

function UploadPanel({ playSlug, stageKey, onUploaded }) {
  const [dragging, setDragging] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [context, setContext] = React.useState("");
  const [savingCtx, setSavingCtx] = React.useState(false);
  const inputRef = React.useRef();

  const handleFiles = async (files) => {
    if (!files || !files.length) return;
    setUploading(true);
    try {
      for (const f of Array.from(files)) {
        if (window.spUpload) await spUpload(f, playSlug, stageKey);
      }
      if (onUploaded) onUploaded();
    } catch (e) {
      console.error("Upload failed:", e);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSaveContext = async () => {
    if (!context.trim()) return;
    setSavingCtx(true);
    try {
      const blob = new Blob([context], { type: "text/plain" });
      const file = new File([blob], "context.md", { type: "text/markdown" });
      if (window.spUpload) await spUpload(file, playSlug, "sources");
      setContext("");
      if (onUploaded) onUploaded();
    } catch (e) {
      console.error("Context save failed:", e);
    } finally {
      setSavingCtx(false);
    }
  };

  return (
    <div className="ws-upload-panel">
      <div className="ws-upload-label">Upload files for this stage</div>
      <div
        className={"ws-dropzone" + (dragging ? " dragging" : "")}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <span>Uploading…</span>
        ) : (
          <>
            <Icon name="upload" size={20} />
            <span>Drop files here or <strong>browse</strong></span>
          </>
        )}
      </div>
      <textarea
        className="ws-context-input"
        placeholder="Add context or notes (optional)"
        value={context}
        onChange={(e) => setContext(e.target.value)}
        rows={3}
      />
      <button
        className="btn btn-ghost btn-sm"
        onClick={handleSaveContext}
        disabled={savingCtx || !context.trim()}
      >
        {savingCtx ? "Saving…" : "Save context"}
      </button>
      <div className="ws-upload-hint muted">
        Files uploaded here will be available to agents when they run.
      </div>
    </div>
  );
}

function DocumentShelf({ playSlug, stageIdx, onFilesChange }) {
  const stageFolders = STAGE_FOLDERS[stageIdx] || ["sources"];
  const [filesByFolder, setFilesByFolder] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [sourcesExpanded, setSourcesExpanded] = React.useState(false);
  const [refreshTick, setRefreshTick] = React.useState(0);

  React.useEffect(() => {
    if (!playSlug) return;
    setLoading(true);
    const foldersToLoad = [...new Set([...stageFolders, "sources"])];
    Promise.all(
      foldersToLoad.map(folder =>
        (window.spListFiles ? spListFiles(playSlug, folder) : Promise.resolve([]))
          .then(files => ({ folder, files }))
          .catch(() => ({ folder, files: [] }))
      )
    ).then(results => {
      const map = {};
      results.forEach(({ folder, files }) => { map[folder] = files; });
      setFilesByFolder(map);
      setLoading(false);
      if (onFilesChange) onFilesChange(map);
    });
  }, [playSlug, stageIdx, refreshTick]);

  const handleUploaded = () => setRefreshTick(t => t + 1);

  if (loading) {
    return <div className="ws-shelf-loading muted">Loading files…</div>;
  }

  // Primary folders for this stage (excluding sources which goes to the bottom)
  const primaryFolders = stageFolders.filter(f => f !== "sources");
  const primaryFiles = primaryFolders.flatMap(f => filesByFolder[f] || []);
  const sourceFiles = filesByFolder["sources"] || [];

  const hasAnyPrimary = primaryFiles.length > 0;

  return (
    <div className="ws-shelf">
      {/* Main stage files */}
      {primaryFolders.length > 0 && (
        <div className="ws-shelf-section">
          <div className="ws-shelf-section-label">
            {primaryFolders.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(" + ")} files
          </div>
          {hasAnyPrimary ? (
            <div className="ws-file-list">
              {primaryFiles.map(f => <FileCard key={f.id || f.name} file={f} />)}
            </div>
          ) : (
            <UploadPanel
              playSlug={playSlug}
              stageKey={primaryFolders[0]}
              onUploaded={handleUploaded}
            />
          )}
        </div>
      )}

      {/* Stage 0: also show upload panel for narrative if no narrative files */}
      {stageIdx === 0 && (filesByFolder["narrative"] || []).length === 0 && (filesByFolder["sources"] || []).length === 0 && !hasAnyPrimary && (
        <UploadPanel
          playSlug={playSlug}
          stageKey="sources"
          onUploaded={handleUploaded}
        />
      )}

      {/* Sources collapsible */}
      <div className="ws-shelf-section ws-shelf-sources">
        <button
          className="ws-shelf-section-label ws-shelf-toggle"
          onClick={() => setSourcesExpanded(e => !e)}
        >
          <Icon name={sourcesExpanded ? "chevron_down" : "chevron_right"} size={12} />
          Source materials ({sourceFiles.length})
        </button>
        {sourcesExpanded && (
          sourceFiles.length > 0 ? (
            <div className="ws-file-list">
              {sourceFiles.map(f => <FileCard key={f.id || f.name} file={f} />)}
            </div>
          ) : (
            <UploadPanel
              playSlug={playSlug}
              stageKey="sources"
              onUploaded={handleUploaded}
            />
          )
        )}
      </div>
    </div>
  );
}

/* ---- Toast ---- */
function Toast({ message, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="ws-toast">
      <Icon name="check" size={13} />{message}
    </div>
  );
}

/* ---- Main Workspace ---- */
function Workspace({ project, onBack, onNav }) {
  const [stageIdx, setStageIdx] = React.useState(project ? (project.stageIndex || 0) : 0);
  const [advancing, setAdvancing] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  // Sync stageIdx if project changes
  React.useEffect(() => {
    if (project) setStageIdx(project.stageIndex || 0);
  }, [project?.id]);

  if (!project) {
    return (
      <div className="ws-page ws-empty">
        <div className="ws-empty-inner">
          <div className="muted">No play selected.</div>
          <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to Plays</button>
        </div>
      </div>
    );
  }

  const stage = STAGE_DEFS[stageIdx] || STAGE_DEFS[0];
  const playSlug = project.slug || project.id || "";

  const handleAdvance = async () => {
    if (advancing) return;
    setAdvancing(true);
    try {
      const newIdx = stageIdx + 1;
      let extraFields = {};

      if (stageIdx === 2) {
        // Stage 2 → 3: send to AWS / Vidya
        extraFields = { Status: "Sent to AWS · Awaiting Vidya", StatusKind: "review" };
      } else if (stageIdx === 3) {
        // Stage 3 done: mark approved
        extraFields = { Done: true, Status: "Approved · Delivered", StatusKind: "approved" };
      }

      if (window.spAdvanceStage) {
        await spAdvanceStage(project.spItemId, newIdx, extraFields);
      }
      setStageIdx(newIdx);
      setToast(stageIdx === 3 ? "Marked as approved by AWS." : `Advanced to ${STAGE_DEFS[newIdx]?.name || "next stage"}.`);
    } catch (e) {
      console.error("Advance failed:", e);
      setToast("Error: " + (e.message || "Could not advance stage."));
    } finally {
      setAdvancing(false);
    }
  };

  const handleSendBack = async () => {
    if (advancing || stageIdx === 0) return;
    setAdvancing(true);
    try {
      const newIdx = stageIdx - 1;
      if (window.spAdvanceStage) {
        await spAdvanceStage(project.spItemId, newIdx, { Status: "Returned for revision" });
      }
      setStageIdx(newIdx);
      setToast(`Sent back to ${STAGE_DEFS[newIdx]?.name || "previous stage"}.`);
    } catch (e) {
      console.error("Send back failed:", e);
      setToast("Error: " + (e.message || "Could not send back."));
    } finally {
      setAdvancing(false);
    }
  };

  const advanceLabel = (() => {
    if (stageIdx === 2) return "Send to Vidya";
    if (stageIdx === 3) return "Mark as Approved by AWS";
    const next = STAGE_DEFS[stageIdx + 1];
    return next ? `Approve · Advance to ${next.name}` : "Approve";
  })();

  const sendBackLabel = (() => {
    const prev = STAGE_DEFS[stageIdx - 1];
    return prev ? `Send back to ${prev.name}` : "Send back";
  })();

  return (
    <div className="ws-page">
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* Header */}
      <div className="ws-head">
        <div className="ws-crumbs">
          <a onClick={onBack} style={{ cursor: "pointer" }}>Plays</a>
          <Icon name="chevron_right" size={11} />
          <span style={{ color: "var(--ink)" }}>{project.persona} · {project.title}</span>
        </div>

        <div className="ws-title-row">
          <div className="ws-title-block">
            <div className="ws-persona-mark" style={{ background: project.accent || "var(--accent)" }}>
              {project.persona || "?"}
            </div>
            <div>
              <span className="eyebrow">{project.industry}</span>
              <span className="subtitle">{project.title}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <StatusPill statusKind={project.statusKind} label={project.status} />
                <span className="pill pill-ghost pill-sm">{stage.label} · {stage.name}</span>
              </div>
            </div>
          </div>
          <div className="ws-title-actions">
            <TeamStrip team={project.team} />
          </div>
        </div>
      </div>

      {/* Stage Rail */}
      <div className="pipeline">
        {STAGE_DEFS.map((s, i) => {
          const state = i < stageIdx ? "passed" : i === stageIdx ? "current" : "future";
          return (
            <button
              key={s.id}
              className={"pl-stage " + state}
              onClick={() => setStageIdx(i)}
            >
              <span className="pl-stage-num">{s.short} · {s.label}</span>
              <span className="pl-stage-name">
                {state === "current" ? <em>{s.name}</em> : s.name}
              </span>
              <span className="pl-stage-status">
                <span className="ico">
                  {state === "passed" ? <Icon name="check" size={10} /> :
                   state === "current" ? <Icon name="dot" size={10} /> :
                   <Icon name="lock" size={10} />}
                </span>
                {state === "passed" ? "Completed" :
                 state === "current" ? "In progress" :
                 "Pending"}
              </span>
              <div className="pl-stage-meta">
                <span className="muted" style={{ fontSize: 11 }}>
                  Owner: {s.owner === "aws" ? "AWS" : (T24.people[s.owner]?.name || s.owner)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Body */}
      <div className="ws-body ws-body-shelf">
        {/* Document Shelf — main content */}
        <main className="ws-editor ws-shelf-main">
          <div className="ws-shelf-header">
            <h3 className="ws-shelf-title">
              {stage.name} · Files
            </h3>
            <span className="muted" style={{ fontSize: 12 }}>
              Owner: <strong>{stage.owner === "aws" ? "AWS" : (T24.people[stage.owner]?.name || stage.owner)}</strong>
            </span>
          </div>

          <DocumentShelf
            playSlug={playSlug}
            stageIdx={stageIdx}
          />

          {/* Stage Progression */}
          <div className="ws-stage-actions">
            <button
              className="btn btn-ghost"
              onClick={handleSendBack}
              disabled={advancing || stageIdx === 0}
              style={{ opacity: stageIdx === 0 ? 0.3 : 1 }}
            >
              <Icon name="chevron_left" size={13} />
              {sendBackLabel}
            </button>
            <button
              className="btn btn-accent"
              onClick={handleAdvance}
              disabled={advancing || stageIdx >= STAGE_DEFS.length}
            >
              {advancing ? "Working…" : advanceLabel}
              {stageIdx < 3 && <Icon name="chevron_right" size={13} />}
              {stageIdx === 2 && <Icon name="send" size={13} />}
              {stageIdx === 3 && <Icon name="check" size={13} />}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---- Team Strip ---- */
function TeamStrip({ team }) {
  if (!team || !team.length) return null;
  return (
    <div className="ws-team-strip">
      <span className="muted" style={{ fontSize: 12 }}>Team</span>
      <div className="avatar-stack avatar-stack-sm">
        {team.map(p => {
          const person = T24.people[p];
          if (!person) return null;
          return (
            <span
              key={p}
              className="avatar avatar-sm"
              title={person.name}
              style={{ background: person.color, color: "#0c0b08" }}
            >
              {person.initials}
            </span>
          );
        })}
      </div>
    </div>
  );
}

window.Workspace = Workspace;
