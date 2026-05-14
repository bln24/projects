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
function FileCard({ file, onView, isViewing }) {
  const ext = (file.name || "").split(".").pop().toLowerCase();
  const viewable = ["docx","doc","pptx","ppt","xlsx","xls","pdf"].includes(ext);
  const extLabel = ext.toUpperCase();

  return (
    <div
      onClick={() => viewable && onView(isViewing ? null : file)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "12px 16px",
        border: `1px solid ${isViewing ? "var(--accent)" : "var(--line)"}`,
        borderRadius: "var(--r-sm)",
        background: isViewing ? "rgba(var(--accent-rgb, 244,183,63),.06)" : "var(--paper-elev)",
        cursor: viewable ? "pointer" : "default",
        transition: "border-color .15s, background .15s",
      }}
    >
      {/* File type badge */}
      <div style={{
        width: 40, height: 44, borderRadius: "var(--r-xs)",
        background: "var(--paper-elev-2)", border: "1px solid var(--line)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        flexShrink: 0, gap: 2,
      }}>
        <Icon name={fileIcon(file.name)} size={16} className="muted" />
        <span style={{ fontFamily: "var(--mono)", fontSize: 8, letterSpacing: ".08em", color: "var(--muted)", textTransform: "uppercase" }}>{extLabel}</span>
      </div>

      {/* Name + meta */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {file.name}
        </div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--muted)", marginTop: 2, letterSpacing: ".04em" }}>
          {formatSize(file.size)}{file.modified ? ` · ${formatDate(file.modified)}` : ""}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 6, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
        {viewable && (
          <button
            className={"btn btn-sm " + (isViewing ? "btn-ghost" : "btn-ghost")}
            style={isViewing ? { color: "var(--accent)", borderColor: "var(--accent)" } : {}}
            onClick={() => { onView(isViewing ? null : file); }}
          >
            <Icon name={isViewing ? "close" : "eye"} size={12} />
            {isViewing ? "Close" : "View"}
          </button>
        )}
        {file.webUrl && (
          <a href={file.webUrl} target="_blank" rel="noopener noreferrer" className="btn btn-quiet btn-sm">
            <Icon name="download" size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

// Detect iOS/iPadOS — Office Online iframes are blocked by Safari cross-origin restrictions
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function DocViewer({ file, onClose }) {
  const [mode, setMode] = React.useState("loading"); // loading | iframe | ios | error
  const [embedUrl, setEmbedUrl] = React.useState(null);
  const ios = React.useMemo(() => isIOS(), []);

  React.useEffect(() => {
    if (!file) return;
    setMode("loading");
    setEmbedUrl(null);

    // On iOS/iPadOS, Office Online iframes are blocked by Safari's cross-origin
    // restrictions. Skip the embed entirely and go straight to open-in-tab.
    if (ios) {
      setMode("ios");
      return;
    }

    (async () => {
      try {
        if (!window.spGetUserToken) throw new Error("auth not ready");
        const token = await spGetUserToken();
        const groupId = window.SP && SP.groupId;
        if (!groupId || !file.id) throw new Error("missing ids");

        // Try Graph download URL → Office Online viewer
        const res = await fetch(
          `https://graph.microsoft.com/v1.0/groups/${groupId}/drive/items/${file.id}?$select=id,@microsoft.graph.downloadUrl`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.ok) {
          const data = await res.json();
          const dlUrl = data["@microsoft.graph.downloadUrl"];
          if (dlUrl) {
            setEmbedUrl(`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(dlUrl)}`);
            setMode("iframe");
            return;
          }
        }

        // Fallback: SharePoint embed URL
        if (file.webUrl) {
          const spEmbedUrl = file.webUrl.replace(/action=default/, "action=embedview") + "&wdAllowInteractivity=False";
          setEmbedUrl(spEmbedUrl);
          setMode("iframe");
          return;
        }

        throw new Error("No preview URL available");
      } catch (e) {
        console.error("[DocViewer]", e.message);
        setMode("error");
      }
    })();
  }, [file?.id, ios]);

  if (!file) return (
    <div style={{
      height: "100%", minHeight: 480,
      border: "1px solid var(--line)", borderRadius: "var(--r-md)",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--paper-elev)", color: "var(--muted)", fontSize: 13,
      flexDirection: "column", gap: 8,
    }}>
      <Icon name="doc_text" size={24} />
      <span>Select a file to preview it here</span>
    </div>
  );

  return (
    <div className="ws-doc-viewer">
      <div className="ws-doc-viewer-header">
        <div className="ws-doc-viewer-title">
          <Icon name={fileIcon(file.name)} size={14} />
          <span>{file.name}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {file.webUrl && (
            <a href={file.webUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <Icon name="arrow_up_right" size={12} />Open in Word
            </a>
          )}
          {onClose && (
            <button className="btn btn-quiet btn-sm" onClick={onClose}>
              <Icon name="close" size={12} />Close
            </button>
          )}
        </div>
      </div>

      {mode === "loading" && (
        <div className="ws-doc-state">
          <span className="muted">Loading preview…</span>
        </div>
      )}

      {/* iOS/iPadOS — Safari blocks Office Online iframes. Open in new tab instead. */}
      {mode === "ios" && (
        <div className="ws-doc-state ws-doc-ios">
          <Icon name="doc_text" size={32} />
          <div className="ws-doc-ios-name">{file.name}</div>
          <div className="ws-doc-ios-hint">
            Inline document preview isn’t supported in Safari on iPad — tap below to open the full document.
          </div>
          {file.webUrl && (
            <a
              href={file.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
              style={{ marginTop: 8 }}
            >
              <Icon name="arrow_up_right" size={14} />Open in Word Online
            </a>
          )}
        </div>
      )}

      {mode === "error" && (
        <div className="ws-doc-state">
          <div className="muted" style={{ marginBottom: 12 }}>Inline preview unavailable.</div>
          {file.webUrl && (
            <a href={file.webUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-sm">
              <Icon name="arrow_up_right" size={12} />Open in Word Online
            </a>
          )}
        </div>
      )}

      {mode === "iframe" && embedUrl && (
        <iframe src={embedUrl} className="ws-doc-iframe" title={file.name} frameBorder="0" allowFullScreen />
      )}
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

function DocumentShelf({ playSlug, stageIdx, onFilesChange, viewingFile, setViewingFile }) {
  const stageFolders = STAGE_FOLDERS[stageIdx] || ["sources"];
  const [filesByFolder, setFilesByFolder] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [sourcesExpanded, setSourcesExpanded] = React.useState(false);
  const [refreshTick, setRefreshTick] = React.useState(0);

  React.useEffect(() => {
    if (!playSlug) return;
    setLoading(true);
    console.log("[DocumentShelf] loading files for slug:", playSlug, "stageIdx:", stageIdx);
    const foldersToLoad = [...new Set([...stageFolders, "sources"])];
    Promise.all(
      foldersToLoad.map(folder =>
        (window.spListFiles ? spListFiles(playSlug, folder) : Promise.resolve([]))
          .then(files => { console.log(`[DocumentShelf] ${folder}: ${files.length} files`); return { folder, files }; })
          .catch(e => { console.error(`[DocumentShelf] ${folder} error:`, e); return { folder, files: [] }; })
      )
    ).then(results => {
      const map = {};
      results.forEach(({ folder, files }) => { map[folder] = files; });
      setFilesByFolder(map);
      setLoading(false);
      if (onFilesChange) onFilesChange(map);
      // Auto-select first primary file so viewer shows immediately
      const pFolders = (STAGE_FOLDERS[stageIdx] || ["sources"]).filter(f => f !== "sources");
      const firstFile = pFolders.flatMap(k => map[k] || [])[0];
      if (firstFile && setViewingFile) setViewingFile(prev => prev || firstFile);

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
          {hasAnyPrimary ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {primaryFiles.map(f => <FileCard key={f.id || f.name} file={f} onView={setViewingFile} isViewing={viewingFile?.id === f.id || viewingFile?.name === f.name} />)}
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
      <div style={{ marginTop: 16, borderTop: "1px solid var(--line)", paddingTop: 12 }}>
        <button
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "4px 0", width: "100%", textAlign: "left" }}
          onClick={() => setSourcesExpanded(e => !e)}
        >
          <Icon name={sourcesExpanded ? "chevron_down" : "chevron_right"} size={12} className="muted" />
          <span className="eyebrow" style={{ fontSize: 10.5 }}>Sources ({sourceFiles.length})</span>
        </button>
        {sourcesExpanded && (
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            {sourceFiles.length > 0
              ? sourceFiles.map(f => <FileCard key={f.id || f.name} file={f} onView={setViewingFile} isViewing={viewingFile?.id === f.id || viewingFile?.name === f.name} />)
              : <UploadPanel playSlug={playSlug} stageKey="sources" onUploaded={handleUploaded} />
            }
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Left Rail File List ---- */
function LeftRailFiles({ playSlug, stageIdx, viewingFile, setViewingFile }) {
  const stageFolders = STAGE_FOLDERS[stageIdx] || ["sources"];
  const primaryFolders = stageFolders.filter(f => f !== "sources");
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    if (!playSlug) return;
    setLoading(true);
    Promise.all(
      primaryFolders.map(folder =>
        (window.spListFiles ? spListFiles(playSlug, folder) : Promise.resolve([]))
          .catch(() => [])
      )
    ).then(results => {
      const all = results.flat();
      setFiles(all);
      setLoading(false);
      // Auto-select first file
      if (all.length > 0) setViewingFile(prev => prev || all[0]);
    });
  }, [playSlug, stageIdx, tick]);

  if (loading) return <div className="lrf-loading muted">Loading…</div>;

  if (files.length === 0) return (
    <div className="lrf-empty">
      <UploadPanel playSlug={playSlug} stageKey={primaryFolders[0] || "sources"} onUploaded={() => setTick(t => t + 1)} compact />
    </div>
  );

  return (
    <div className="lrf-list">
      {files.map(f => {
        const ext = (f.name || "").split(".").pop().toLowerCase();
        const viewable = ["docx","doc","pptx","ppt","xlsx","xls","pdf"].includes(ext);
        const isActive = viewingFile?.id === f.id || viewingFile?.name === f.name;
        return (
          <button
            key={f.id || f.name}
            className={"lrf-file" + (isActive ? " active" : "") + (!viewable ? " disabled" : "")}
            onClick={() => viewable && setViewingFile(isActive ? null : f)}
            title={f.name}
          >
            <Icon name={fileIcon(f.name)} size={13} />
            <span className="lrf-name">{f.name}</span>
            {isActive && <span className="lrf-active-dot" />}
          </button>
        );
      })}
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
  const [viewingFile, setViewingFile] = React.useState(null);
  const [sendBackOpen, setSendBackOpen] = React.useState(false);
  const [fromRole, setFromRole] = React.useState('staff'); // 'staff' | 'client'
  const [feedbackText, setFeedbackText] = React.useState('');
  const [revisions, setRevisions] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(`revisions-${project?.id || ''}`) || '[]'); } catch { return []; }
  });
  const [historyOpen, setHistoryOpen] = React.useState(true);

  // Persist revisions locally as a fallback mirror of SharePoint
  const appendRevision = React.useCallback((entry) => {
    setRevisions(prev => {
      const next = [...prev, entry];
      try { localStorage.setItem(`revisions-${project?.id || ''}`, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [project?.id]);

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
        extraFields = { Status: "Sent to AWS · Awaiting Vidya", StatusKind: "review" };
      } else if (stageIdx === 3) {
        extraFields = { Done: true, Status: "Approved · Delivered", StatusKind: "approved" };
      }

      if (window.spAdvanceStage) {
        await spAdvanceStage(project.spItemId, newIdx, extraFields);
      }
      appendRevision({
        id: `rev-${Date.now()}`,
        at: new Date().toISOString(),
        action: stageIdx === 3 ? "approved_final" : "approve",
        fromStageIndex: stageIdx,
        toStageIndex: newIdx,
        stageName: STAGE_DEFS[stageIdx]?.name || "Unknown",
        status: extraFields.Status || "Approved",
        from: null,
        notes: null,
      });
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
    if (advancing) return;
    if (!sendBackOpen) { setSendBackOpen(true); return; }
    if (!feedbackText.trim()) return;
    setAdvancing(true);
    try {
      const sourceLabel = fromRole === 'client' ? 'Client' : 'BLN24 Staff';
      if (stageIdx > 0) {
        const newIdx = stageIdx - 1;
        if (window.spAdvanceStage) {
          await spAdvanceStage(project.spItemId, newIdx, {
            Status: "Returned for revision",
            FeedbackFrom: sourceLabel,
            FeedbackNotes: feedbackText.trim(),
          });
        }
        setStageIdx(newIdx);
        setToast(`Sent back · ${STAGE_DEFS[newIdx]?.name} · ${sourceLabel} feedback logged.`);
      } else {
        if (window.spAdvanceStage) {
          await spAdvanceStage(project.spItemId, 0, {
            Status: "Revisions requested",
            FeedbackFrom: sourceLabel,
            FeedbackNotes: feedbackText.trim(),
          });
        }
        setToast(`Revisions requested · ${sourceLabel} feedback logged.`);
      }
      const revEntry = {
        id: `rev-${Date.now()}`,
        at: new Date().toISOString(),
        action: stageIdx > 0 ? "send_back" : "revisions_requested",
        fromStageIndex: stageIdx,
        toStageIndex: stageIdx > 0 ? stageIdx - 1 : 0,
        stageName: STAGE_DEFS[stageIdx]?.name || "Unknown",
        status: stageIdx > 0 ? "Returned for revision" : "Revisions requested",
        from: sourceLabel,
        notes: feedbackText.trim(),
      };
      appendRevision(revEntry);
      setSendBackOpen(false);
      setFeedbackText('');
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

  const [rightRailOpen, setRightRailOpen] = React.useState(true);

  return (
    <div className="ws-page ws-3col">

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* Header */}
      <div className="ws-head ws-head-3col">
        <div className="ws-crumbs">
          <a onClick={onBack} style={{ cursor: "pointer" }}>Plays</a>
          <Icon name="chevron_right" size={11} />
          <span style={{ color: "var(--ink)" }}>{project.persona} · {project.title}</span>
        </div>
        <div className="ws-head-meta">
          <StatusPill statusKind={project.statusKind} label={project.status} />
          <TeamStrip team={project.team} />
          <button
            className={"btn btn-ghost btn-sm ws-rail-toggle" + (rightRailOpen ? " active" : "")}
            onClick={() => setRightRailOpen(v => !v)}
            title="Toggle feedback panel"
          >
            <Icon name="message" size={13} />
            {revisions.length > 0 && <span className="btn-pip">{revisions.length}</span>}
          </button>
        </div>
      </div>

      {/* Three-column body */}
      <div className="ws-3col-body">

        {/* LEFT RAIL — Stage nav + files */}
        <nav className="ws-left-rail">
          <div className="ws-left-rail-label">Pipeline</div>
          {STAGE_DEFS.map((s, i) => {
            const state = i < stageIdx ? "passed" : i === stageIdx ? "current" : "future";
            return (
              <button key={s.id} className={"ws-stage-btn " + state} onClick={() => setStageIdx(i)}>
                <span className="ws-stage-btn-num">{s.short}</span>
                <span className="ws-stage-btn-body">
                  <span className="ws-stage-btn-name">{s.name}</span>
                  <span className="ws-stage-btn-meta">
                    {state === "passed" ? "Done" : state === "current" ? "In progress" : "Pending"}
                    {" · "}{s.owner === "aws" ? "AWS" : (T24.people[s.owner]?.name || s.owner)}
                  </span>
                </span>
                <span className="ws-stage-btn-ico">
                  {state === "passed" ? <Icon name="check" size={11} /> :
                   state === "current" ? <Icon name="dot" size={11} /> :
                   <Icon name="lock" size={11} />}
                </span>
              </button>
            );
          })}

          {/* Files for active stage */}
          <div className="ws-left-rail-divider" />
          <div className="ws-left-rail-label">{stage.name} files</div>
          <LeftRailFiles
            playSlug={playSlug}
            stageIdx={stageIdx}
            viewingFile={viewingFile}
            setViewingFile={setViewingFile}
          />
        </nav>

        {/* CENTER — Pure document */}
        <main className="ws-center">
          {viewingFile ? (
            <DocViewer file={viewingFile} onClose={() => setViewingFile(null)} />
          ) : (
            <div className="ws-center-empty">
              <Icon name="doc_text" size={32} />
              <span>Select a file from the left panel to preview it</span>
            </div>
          )}
        </main>

        {/* RIGHT RAIL — Review + history */}
        {rightRailOpen && (
          <aside className="ws-right-rail">

            {/* Stage context */}
            <div className="ws-right-rail-label">
              <span>{stage.label} · {stage.name}</span>
              <span className="muted" style={{ fontSize: 11 }}>
                {stage.owner === "aws" ? "AWS" : (T24.people[stage.owner]?.name || stage.owner)}
              </span>
            </div>

            {/* Scrollable middle: history + send-back panel */}
            <div className="ws-right-scroll">
              <RevisionHistory
                revisions={revisions}
                open={historyOpen}
                onToggle={() => setHistoryOpen(v => !v)}
              />

              {sendBackOpen && (
                <div className="send-back-panel send-back-rail">
                  <div className="send-back-from-row" style={{ marginBottom: 8 }}>
                    <span className="lbl">From</span>
                    <button className={"from-pill" + (fromRole === "staff" ? " active" : "")} onClick={() => setFromRole("staff")}>BLN24 Staff</button>
                    <button className={"from-pill" + (fromRole === "client" ? " active" : "")} onClick={() => setFromRole("client")}>Client</button>
                  </div>
                  <textarea
                    className="send-back-input"
                    placeholder="Describe the changes needed…"
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value)}
                    rows={4}
                    autoFocus
                  />
                  <div className="send-back-footer">
                    <button className="btn btn-quiet btn-sm" onClick={() => { setSendBackOpen(false); setFeedbackText(""); }}>Cancel</button>
                    <button className="btn btn-send-back btn-sm" onClick={handleSendBack} disabled={advancing || !feedbackText.trim()}>
                      <Icon name="arrow_left" size={12} />{advancing ? "Working…" : "Send Back"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STICKY BOTTOM — actions always visible */}
            <div className="ws-right-sticky">
              <button
                className={"btn btn-ghost btn-sm ws-sendback-btn" + (sendBackOpen ? " active" : "")}
                onClick={() => setSendBackOpen(v => !v)}
                disabled={advancing}
              >
                <Icon name="arrow_left" size={12} />{sendBackLabel}
              </button>
              <button
                className="btn btn-accent ws-approve-btn"
                onClick={handleAdvance}
                disabled={advancing || stageIdx >= STAGE_DEFS.length}
              >
                {advancing ? "Working…" : advanceLabel}
                {!advancing && stageIdx < 3 && <Icon name="chevron_right" size={14} />}
                {!advancing && stageIdx === 3 && <Icon name="check" size={14} />}
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

/* ---- Revision History ---- */
function RevisionHistory({ revisions, open, onToggle }) {
  const count = revisions.length;
  const sendBacks = revisions.filter(r => r.action === "send_back" || r.action === "revisions_requested").length;

  function formatAt(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + " · " +
             d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    } catch { return iso; }
  }

  function actionLabel(r) {
    if (r.action === "approve") return `Approved ${r.stageName} → ${STAGE_DEFS[r.toStageIndex]?.name || "Next"}`;
    if (r.action === "approved_final") return "Approved · Delivered to AWS";
    if (r.action === "send_back") return `Sent back · ${STAGE_DEFS[r.fromStageIndex]?.name || r.stageName} → ${STAGE_DEFS[r.toStageIndex]?.name || "Previous"}`;
    if (r.action === "revisions_requested") return `Revisions requested · ${r.stageName}`;
    return r.action;
  }

  return (
    <div className="rev-history">
      <button className="rev-history-toggle" onClick={onToggle}>
        <Icon name="history" size={13} />
        <span>Revision history</span>
        {count > 0 && <span className="rev-badge">{count}</span>}
        {sendBacks > 0 && <span className="rev-badge rev-badge-warn">{sendBacks} send-back{sendBacks > 1 ? "s" : ""}</span>}
        <Icon name={open ? "chevron_up" : "chevron_down"} size={12} style={{ marginLeft: "auto" }} />
      </button>

      {open && (
        <div className="rev-list">
          {count === 0 ? (
            <div className="rev-empty">No revisions yet. Approvals and send-backs will appear here.</div>
          ) : (
            [...revisions].reverse().map((r, i) => (
              <div key={r.id || i} className={"rev-entry" + (r.action.includes("send_back") || r.action === "revisions_requested" ? " rev-entry-sendback" : " rev-entry-approve")}>
                <div className="rev-entry-header">
                  <span className="rev-action-label">{actionLabel(r)}</span>
                  {r.from && <span className="rev-from-pill">{r.from}</span>}
                  <span className="rev-at">{formatAt(r.at)}</span>
                </div>
                {r.notes && <div className="rev-notes">{r.notes}</div>}
              </div>
            ))
          )}
        </div>
      )}
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


/* inject ws-doc-viewer styles */
if (!document.getElementById('ws-doc-viewer-styles')) {
  const s = document.createElement('style');
  s.id = 'ws-doc-viewer-styles';
  s.textContent = `
    .ws-file-card--active { border-color: var(--accent) !important; }
    .ws-doc-viewer { margin-top: 16px; border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; background: var(--paper-elev); width: 100%; box-sizing: border-box; }
    .ws-doc-viewer-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid var(--line); background: var(--paper-elev-2); }
    .ws-doc-viewer-title { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: var(--ink); }
    .ws-doc-iframe { width: 100%; height: min(70vh, 700px); display: block; border: none; }
    .ws-doc-state { padding: 40px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; color: var(--muted); font-size: 13px; }
    .ws-doc-ios { padding: 48px 32px; gap: 16px; }
    .ws-doc-ios-name { font-size: 15px; font-weight: 600; color: var(--ink); max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .ws-doc-ios-hint { font-size: 13px; color: var(--muted); max-width: 300px; line-height: 1.55; }
    @media (max-width: 900px) { .ws-doc-iframe { height: 55vh; min-height: 320px; } }
  `;
  document.head.appendChild(s);
}

window.Workspace = Workspace;
