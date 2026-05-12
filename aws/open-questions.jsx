/* global React, Icon, T24 */

/* Open Questions panel — reads play-kit/memory/INBOX.md, lets human resolve.
   In production this would POST resolutions back to the markdown file.
   In the prototype, resolutions are tracked in localStorage; an "Export"
   button surfaces the markdown a human would paste back to INBOX.md. */

const OQ_AGENT_META = {
  Scout:   { color: "#7aa7ff", glyph: "~", role: "research" },
  Anvil:   { color: "#f4b73f", glyph: "~", role: "narrative + storyboard" },
  Scribe:  { color: "#9bd17a", glyph: "~", role: "voice + polish" },
};

const OQ_HUMAN_META = {
  Angie:   { color: "#f4b73f", initials: "AP", role: "PM Lead" },
  Stephen: { color: "#7aa7ff", initials: "SY", role: "Pressure test" },
  Michael: { color: "#9bd17a", initials: "MK", role: "Visuals" },
};

/* Parse INBOX.md into structured items. Each item starts with "## " and ends
   at the next "---" separator or end-of-file. */
function parseInbox(md) {
  const items = [];
  // Split on horizontal rules but skip the front-matter/header block.
  const sections = md.split(/\n---\n/).map(s => s.trim()).filter(Boolean);
  for (const s of sections) {
    if (!s.startsWith("## ")) continue; // skip header / format blocks
    const item = parseInboxItem(s);
    if (item) items.push(item);
  }
  return items;
}

function parseInboxItem(s) {
  const lines = s.split("\n");
  const head = lines[0].replace(/^##\s+/, "").trim();
  // "2026-05-06 14:22 | Scout"
  const m = head.match(/^(\S+)\s+(\S+)\s*\|\s*(\S+)\s*$/);
  if (!m) return null;
  const [, date, time, who] = m;
  const fields = { date, time, who, raw: s };
  // Pull each **Field:** ... up to the next **Field:** or end
  const fieldRe = /\*\*([A-Za-z ]+):\*\*\s*([\s\S]*?)(?=\n\*\*[A-Za-z ]+:\*\*|$)/g;
  let match;
  while ((match = fieldRe.exec(s)) !== null) {
    const key = match[1].trim().toLowerCase().replace(/\s+/g, "_");
    fields[key] = match[2].trim();
  }
  return fields;
}

/* Read overrides from localStorage so demo resolutions feel real */
function loadOverrides() {
  try { return JSON.parse(localStorage.getItem("t24-inbox-overrides") || "{}"); }
  catch { return {}; }
}
function saveOverrides(o) {
  localStorage.setItem("t24-inbox-overrides", JSON.stringify(o));
}

/* User-asked questions live in localStorage (separate from the seeded INBOX.md) */
function loadUserAsks() {
  try { return JSON.parse(localStorage.getItem("t24-inbox-user-asks") || "[]"); }
  catch { return []; }
}
function saveUserAsks(arr) {
  localStorage.setItem("t24-inbox-user-asks", JSON.stringify(arr));
}

/* Generate a stub agent reply — in production this calls Claude. For the
   prototype, it fabricates a plausible reply so the loop feels real. */
async function generateAgentReply({ agent, question, context }) {
  // Try a real model call first; fall back to a canned reply if unavailable
  if (window.claude && window.claude.complete) {
    const role = OQ_AGENT_META[agent]?.role || "agent";
    const prompt = `You are ${agent}, the ${role} agent in the BLN24 play kit. A human just asked you a question. Respond in 2-3 sentences as the agent would: direct, no fluff, no AI tells. If you need a source, mention you'll add it as S-NNN. If you need to escalate, say so.

Question: ${question}
${context ? `Context: ${context}` : ""}`;
    try {
      const text = await window.claude.complete(prompt);
      return text.trim();
    } catch {}
  }
  // Fallback canned replies per agent
  const canned = {
    Scout: `On it — pulling primary sources now. Will add to memory/sources.md as S-019 once located, and surface anything load-bearing in handoffs.md so Anvil sees it on next pickup.`,
    Anvil: `Working it into the storyboard. I'll mark the affected moves and post a partial handoff back to you if the structure shifts more than one card.`,
    Scribe: `Will run the voice pass with that direction noted. Flagging anything the rule doesn't cover for your call before final.`,
  };
  return canned[agent] || "Noted. Picking it up now.";
}

function applyOverrides(items, overrides) {
  return items.map(it => {
    const key = `${it.date}T${it.time}|${it.who}`;
    const o = overrides[key];
    if (!o) return it;
    return { ...it, status: `resolved ${o.date} by ${o.by}`, resolution: o.text };
  });
}

function OpenQuestions({ open, onClose }) {
  const [items, setItems] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [overrides, setOverrides] = React.useState(loadOverrides);
  const [userAsks, setUserAsks] = React.useState(loadUserAsks);
  const [resolving, setResolving] = React.useState(null); // item key
  const [draft, setDraft] = React.useState("");
  const [filter, setFilter] = React.useState("all"); // all | mine | open
  const [me] = React.useState("Angie"); // simulated current user
  const [composing, setComposing] = React.useState(false);
  const [askForm, setAskForm] = React.useState({ question: "", context: "", to: "Scout" });

  React.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("play-kit/memory/INBOX.md");
        if (!res.ok) throw new Error("fetch " + res.status);
        const md = await res.text();
        if (cancelled) return;
        setItems(parseInbox(md));
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    })();
    return () => { cancelled = true; };
  }, [open]);

  if (!open) return null;

  /* Convert user-asked items into the same shape parseInbox returns. They
     start with status "working" (agent processing) and flip to "resolved"
     when the agent's reply lands. */
  const userItemsAsInbox = userAsks.map(a => ({
    date: a.date, time: a.time, who: a.from,                 // who asked = human
    question: a.question,
    context: a.context,
    why_it_matters: a.why_it_matters || "",
    to: a.to,                                                 // routed to agent
    status: a.reply ? `resolved ${a.replyDate} by ${a.to}` : "open",
    resolution: a.reply || null,
    isFromHuman: true,                                        // flag for renderer
    pending: !a.reply,
  }));

  const merged = items
    ? [...userItemsAsInbox, ...applyOverrides(items, overrides)]
    : userItemsAsInbox;
  const isOpen = it => (it.status || "").startsWith("open");
  const isMine = it => (it.to || "").trim() === me;

  const visible = merged.filter(it => {
    if (filter === "open") return isOpen(it);
    if (filter === "mine") return isOpen(it) && isMine(it);
    return true;
  });

  const openCount = merged.filter(isOpen).length;
  const mineCount = merged.filter(it => isOpen(it) && isMine(it)).length;

  const startResolve = (key) => {
    setResolving(key);
    setDraft("");
  };

  const submitResolve = (it) => {
    const key = `${it.date}T${it.time}|${it.who}`;
    if (!draft.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    const next = { ...overrides, [key]: { text: draft.trim(), date: today, by: me } };
    setOverrides(next);
    saveOverrides(next);
    setResolving(null);
    setDraft("");
    // Fire the "agent picked back up" event for the workspace toast
    window.dispatchEvent(new CustomEvent("oq:resolved", { detail: { agent: it.who, question: it.question } }));
  };

  const submitAsk = async () => {
    const q = askForm.question.trim();
    if (!q) return;
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 5);
    const ask = {
      id: `ask-${Date.now()}`,
      from: me,
      to: askForm.to,
      question: q,
      context: askForm.context.trim(),
      date, time,
      reply: null,
      replyDate: null,
    };
    const nextAsks = [ask, ...userAsks];
    setUserAsks(nextAsks);
    saveUserAsks(nextAsks);
    setAskForm({ question: "", context: "", to: "Scout" });
    setComposing(false);

    // Fire "agent working" toast — different event, different phase set
    window.dispatchEvent(new CustomEvent("oq:asked", {
      detail: { agent: ask.to, question: q, from: me }
    }));

    // Simulate agent processing + reply
    const reply = await generateAgentReply({ agent: ask.to, question: q, context: ask.context });
    const replyDate = new Date().toISOString().slice(0, 10);
    const updated = loadUserAsks().map(a =>
      a.id === ask.id ? { ...a, reply, replyDate } : a
    );
    setUserAsks(updated);
    saveUserAsks(updated);

    // Fire the "agent answered" event for the toast
    window.dispatchEvent(new CustomEvent("oq:answered", {
      detail: { agent: ask.to, question: q, reply }
    }));
  };

  const exportMd = () => {
    // Generate the markdown a human would paste back to INBOX.md for resolutions
    const blocks = Object.entries(overrides).map(([key, o]) => {
      const [stamp, who] = key.split("|");
      return `## ${stamp.replace("T", " ")} | ${who}\n\n**Resolution:** ${o.text}\n\n**Status:** resolved ${o.date} by ${o.by}\n`;
    });
    const md = blocks.join("\n---\n\n");
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "inbox-resolutions.md";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div onClick={onClose} className="oq-scrim" />
      <aside className="oq-panel" role="dialog" aria-label="Open questions">
        <header className="oq-head">
          <div className="oq-head-top">
            <div>
              <div className="oq-eyebrow">PLAY KIT · ESCALATIONS</div>
              <h2 className="oq-title">Open questions</h2>
            </div>
            <div className="oq-head-actions">
              <button className="btn btn-accent btn-sm" onClick={() => setComposing(c => !c)} title="Ask the crew">
                <Icon name="plus" size={12} /> Ask the crew
              </button>
              <button className="btn-icon" onClick={onClose} title="Close" aria-label="Close">
                <Icon name="close" size={16} />
              </button>
            </div>
          </div>
          <p className="oq-sub">
            An agent stopped and asked. Until you resolve, that thread of work is paused.
            Sourced from <code>play-kit/memory/INBOX.md</code>.
          </p>

          {composing && (
            <div className="oq-ask-form">
              <div className="oq-ask-form-head">
                <div className="oq-block-label">Ask the crew</div>
                <button className="btn-quiet btn-sm" onClick={() => setComposing(false)}>
                  <Icon name="close" size={12} />
                </button>
              </div>
              <div className="oq-ask-form-row">
                <label className="oq-block-label oq-ask-label">Route to</label>
                <div className="oq-ask-routing">
                  {["Scout", "Anvil", "Scribe"].map(a => {
                    const meta = OQ_AGENT_META[a];
                    return (
                      <button
                        key={a}
                        type="button"
                        className={"oq-ask-agent " + (askForm.to === a ? "selected" : "")}
                        onClick={() => setAskForm(f => ({ ...f, to: a }))}
                        style={askForm.to === a ? { borderColor: meta.color } : {}}
                      >
                        <span className="oq-agent-glyph" style={{ color: meta.color }}>{meta.glyph}</span>
                        <span><strong>{a}</strong> <span className="muted">— {meta.role}</span></span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <textarea
                autoFocus
                rows={3}
                placeholder="Your question. Be specific — what do you need from this agent, and by when?"
                value={askForm.question}
                onChange={e => setAskForm(f => ({ ...f, question: e.target.value }))}
              />
              <textarea
                rows={2}
                placeholder="Context (optional). Move number, source ID, anything that helps."
                value={askForm.context}
                onChange={e => setAskForm(f => ({ ...f, context: e.target.value }))}
              />
              <div className="oq-resolve-actions">
                <button className="btn-quiet btn-sm" onClick={() => setComposing(false)}>Cancel</button>
                <button
                  className="btn btn-accent btn-sm"
                  onClick={submitAsk}
                  disabled={!askForm.question.trim()}
                >
                  Send to {askForm.to}
                </button>
              </div>
            </div>
          )}
          <div className="oq-tabs" role="tablist">
            <button role="tab" aria-selected={filter === "mine"} className={"oq-tab " + (filter === "mine" ? "active" : "")} onClick={() => setFilter("mine")}>
              For you <span className="oq-tab-count">{mineCount}</span>
            </button>
            <button role="tab" aria-selected={filter === "open"} className={"oq-tab " + (filter === "open" ? "active" : "")} onClick={() => setFilter("open")}>
              All open <span className="oq-tab-count">{openCount}</span>
            </button>
            <button role="tab" aria-selected={filter === "all"} className={"oq-tab " + (filter === "all" ? "active" : "")} onClick={() => setFilter("all")}>
              History <span className="oq-tab-count">{merged.length}</span>
            </button>
            <div className="oq-tabs-spacer" />
            {Object.keys(overrides).length > 0 && (
              <button className="btn-quiet btn-sm" onClick={exportMd} title="Export resolutions as markdown">
                <Icon name="download" size={12} /> Export
              </button>
            )}
          </div>
        </header>

        <div className="oq-list">
          {error && (
            <div className="oq-state oq-state-err">
              Couldn't load INBOX.md ({error}).<br/>
              <span className="muted">In production, this fetches from your play-kit on Mac mini.</span>
            </div>
          )}
          {!error && !items && <div className="oq-state">Loading…</div>}
          {!error && items && visible.length === 0 && (
            <div className="oq-state">
              <div style={{ fontFamily: "var(--display)", fontSize: 22, marginBottom: 6 }}>Nothing pending.</div>
              <div className="muted" style={{ fontSize: 13 }}>The agents are working. They'll surface here if they hit a wall.</div>
            </div>
          )}
          {!error && items && visible.map((it, i) => {
            const isAsk = it.isFromHuman === true;
            const key = isAsk
              ? `ask-${it.date}T${it.time}|${it.who}`
              : `${it.date}T${it.time}|${it.who}`;
            const open = isOpen(it);
            const mine = isMine(it);
            // Asks: who = human asker, target = agent. Escalations: who = agent, target = human.
            const askerMeta = isAsk
              ? (OQ_HUMAN_META[it.who] || { color: "#888", initials: (it.who || "?").slice(0, 2), role: "human" })
              : (OQ_AGENT_META[it.who] || { color: "#888", glyph: "?", role: "agent" });
            const target = (it.to || "").trim();
            const targetMeta = isAsk
              ? (OQ_AGENT_META[target] || { color: "#888", glyph: "?", role: "agent" })
              : (OQ_HUMAN_META[target] || null);
            const railColor = isAsk ? targetMeta.color : askerMeta.color;
            return (
              <article key={key} className={"oq-item " + (open ? "is-open " : "is-resolved ") + (mine ? "is-mine " : "") + (isAsk ? "is-ask" : "is-escalation")}>
                <div className="oq-item-rail" style={{ background: railColor }} />
                <div className="oq-item-body">
                  <div className="oq-item-head">
                    <div className="oq-from">
                      {isAsk ? (
                        <span className="avatar avatar-sm" style={{ background: askerMeta.color, color: "#0c0b08" }}>{askerMeta.initials}</span>
                      ) : (
                        <span className="oq-agent-glyph" style={{ color: askerMeta.color }}>{askerMeta.glyph}</span>
                      )}
                      <span className="oq-from-name">{it.who}</span>
                      <span className="oq-from-role">— {askerMeta.role}</span>
                      {isAsk && <span className="oq-direction-badge">→ asked the crew</span>}
                    </div>
                    <div className="oq-meta">
                      <time>{it.date} · {it.time}</time>
                      {open
                        ? <span className="oq-pill oq-pill-open">{isAsk ? "working" : "open"}</span>
                        : <span className="oq-pill oq-pill-resolved">{isAsk ? "answered" : "resolved"}</span>}
                    </div>
                  </div>

                  <h3 className="oq-q">{it.question}</h3>

                  {it.context && (
                    <div className="oq-block">
                      <div className="oq-block-label">Context</div>
                      <p>{it.context}</p>
                    </div>
                  )}
                  {it.why_it_matters && (
                    <div className="oq-block">
                      <div className="oq-block-label">Why it matters</div>
                      <p>{it.why_it_matters}</p>
                    </div>
                  )}

                  <div className="oq-routing">
                    <span className="oq-routing-label">{isAsk ? "Routed to agent" : "Routed to"}</span>
                    {isAsk ? (
                      <span className="oq-routing-target">
                        <span className="oq-agent-glyph" style={{ color: targetMeta.color }}>{targetMeta.glyph}</span>
                        <span><strong>{target}</strong> · {targetMeta.role}</span>
                      </span>
                    ) : targetMeta ? (
                      <span className="oq-routing-target">
                        <span className="avatar avatar-sm" style={{ background: targetMeta.color, color: "#0c0b08" }}>{targetMeta.initials}</span>
                        <span><strong>{target}</strong> · {targetMeta.role}</span>
                      </span>
                    ) : (
                      <span className="oq-routing-target"><strong>{target}</strong></span>
                    )}
                  </div>

                  {isAsk && it.pending && (
                    <div className="oq-pending">
                      <span className="oq-pending-dot" />
                      <span>{target} is working on it…</span>
                    </div>
                  )}

                  {it.resolution && (
                    <div className="oq-resolution">
                      <div className="oq-block-label">{isAsk ? `${target}'s reply` : "Resolution"}</div>
                      <p>{it.resolution}</p>
                      <div className="oq-resolution-foot">{it.status}</div>
                    </div>
                  )}

                  {open && !isAsk && resolving !== key && mine && (
                    <div className="oq-actions">
                      <button className="btn btn-accent btn-sm" onClick={() => startResolve(key)}>
                        Resolve
                      </button>
                      <button className="btn-quiet btn-sm">Re-route</button>
                      <button className="btn-quiet btn-sm">Comment back</button>
                    </div>
                  )}
                  {open && !isAsk && resolving !== key && !mine && (
                    <div className="oq-actions">
                      <button className="btn-quiet btn-sm" onClick={() => startResolve(key)}>
                        Resolve as {me}
                      </button>
                    </div>
                  )}

                  {resolving === key && (
                    <div className="oq-resolve-form">
                      <div className="oq-block-label">Your resolution</div>
                      <textarea
                        autoFocus
                        rows={4}
                        placeholder="2–3 sentences. What's the answer, and what should the agent do with it?"
                        value={draft}
                        onChange={e => setDraft(e.target.value)}
                      />
                      <div className="oq-resolve-actions">
                        <button className="btn-quiet btn-sm" onClick={() => setResolving(null)}>Cancel</button>
                        <button className="btn btn-accent btn-sm" onClick={() => submitResolve(it)} disabled={!draft.trim()}>
                          Send to {it.who}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <footer className="oq-foot">
          <div className="oq-foot-rule">
            <strong>The rule:</strong> when an agent stops and asks, that's the system working. Resolve here; the agent picks up from where it stopped.
          </div>
        </footer>
      </aside>
    </>
  );
}

window.OpenQuestions = OpenQuestions;

/* Toast that fires when an open question gets resolved — shows the agent
   picking back up. Mounted once at the App root. */
function OpenQuestionsToast() {
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => {
    const onResolved = (e) => {
      const { agent } = e.detail || {};
      const meta = OQ_AGENT_META[agent] || { color: "#888", role: "agent" };
      setToast({ agent, role: meta.role, color: meta.color, phase: "stopped", mode: "resume" });
      // Animate through phases: stopped → working → done
      const t1 = setTimeout(() => setToast(t => t && { ...t, phase: "working" }), 900);
      const t2 = setTimeout(() => setToast(t => t && { ...t, phase: "done" }), 2400);
      const t3 = setTimeout(() => setToast(null), 5400);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    };
    const onAsked = (e) => {
      const { agent } = e.detail || {};
      const meta = OQ_AGENT_META[agent] || { color: "#888", role: "agent" };
      setToast({ agent, role: meta.role, color: meta.color, phase: "working", mode: "ask" });
    };
    const onAnswered = (e) => {
      const { agent } = e.detail || {};
      const meta = OQ_AGENT_META[agent] || { color: "#888", role: "agent" };
      setToast({ agent, role: meta.role, color: meta.color, phase: "done", mode: "ask" });
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    };
    window.addEventListener("oq:resolved", onResolved);
    window.addEventListener("oq:asked", onAsked);
    window.addEventListener("oq:answered", onAnswered);
    return () => {
      window.removeEventListener("oq:resolved", onResolved);
      window.removeEventListener("oq:asked", onAsked);
      window.removeEventListener("oq:answered", onAnswered);
    };
  }, []);

  if (!toast) return null;
  let phaseLabel;
  let eyebrow;
  if (toast.mode === "ask") {
    eyebrow = toast.phase === "done" ? "PLAY KIT · AGENT REPLIED" : "PLAY KIT · AGENT WORKING";
    phaseLabel = toast.phase === "working"
      ? `${toast.agent} is working on your question`
      : `${toast.agent} replied — check Open Questions`;
  } else {
    eyebrow = "PLAY KIT · AGENT RESUMED";
    phaseLabel = toast.phase === "stopped"
      ? `${toast.agent} received the resolution`
      : toast.phase === "working"
      ? `${toast.agent} is picking back up where it stopped`
      : `${toast.agent} resumed — see Activity`;
  }
  return (
    <div className="oq-toast" role="status" aria-live="polite">
      <div className="oq-toast-rail" style={{ background: toast.color }} />
      <div className="oq-toast-body">
        <div className="oq-toast-eyebrow">{eyebrow}</div>
        <div className="oq-toast-title">
          <span className="oq-toast-glyph" style={{ color: toast.color }}>~</span>
          <strong>{toast.agent}</strong>
          <span className="oq-toast-role">— {toast.role}</span>
        </div>
        <div className="oq-toast-status">
          <span className={"oq-toast-dot phase-" + toast.phase} />
          <span>{phaseLabel}</span>
        </div>
      </div>
    </div>
  );
}
window.OpenQuestionsToast = OpenQuestionsToast;
function useOpenQuestionCount() {
  const [count, setCount] = React.useState(null);
  const refresh = React.useCallback(async () => {
    try {
      const res = await fetch("play-kit/memory/INBOX.md");
      const md = res.ok ? await res.text() : "";
      const overrides = loadOverrides();
      const items = applyOverrides(parseInbox(md), overrides);
      const escalations = items.filter(it => (it.status || "").startsWith("open")).length;
      const pendingAsks = loadUserAsks().filter(a => !a.reply).length;
      setCount(escalations + pendingAsks);
    } catch {}
  }, []);
  React.useEffect(() => {
    refresh();
    const onChange = () => refresh();
    window.addEventListener("oq:resolved", onChange);
    window.addEventListener("oq:asked", onChange);
    window.addEventListener("oq:answered", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("oq:resolved", onChange);
      window.removeEventListener("oq:asked", onChange);
      window.removeEventListener("oq:answered", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refresh]);
  return count;
}
window.useOpenQuestionCount = useOpenQuestionCount;
