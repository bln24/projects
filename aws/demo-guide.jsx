/* global React, Icon */
/* DemoGuide — floating click-through helper for stakeholder demos.
   Sequential beats, each with a target route + a one-line presenter prompt.
   Toggle with Tweaks: "Demo mode" → on/off. Press D to toggle, → to advance. */

const DEMO_BEATS = [
  {
    n: "01",
    title: "The pitch",
    prompt: "BLN24 turns one client meeting into a Fortune 500-ready deck. Start at the front door.",
    route: "login",
    cue: "Click 'Continue with Microsoft' — SSO is wired but mocked. Three seconds.",
  },
  {
    n: "02",
    title: "The portfolio",
    prompt: "The dashboard. Three CXO plays in flight, each at a different stage. Stephen is reviewing the CMO play right now.",
    route: "dashboard",
    cue: "Hover the CMO row — Open Questions show inline. Click in.",
  },
  {
    n: "03",
    title: "Stage I · Narrative",
    prompt: "The narrative is the document Angie signs. Document-quality typography, source pins on the left, refinements on the right.",
    route: "workspace",
    projectId: "cmo-2026",
    cue: "Show the source pins. Open one — quotes appear inline. Show the refinements stream.",
    stage: 0,
  },
  {
    n: "04",
    title: "Stage II · Arc",
    prompt: "The arc is one page — the story shape Stephen will draw against. Seven moves, one branch point, one welded answer.",
    route: "workspace",
    projectId: "cmo-2026",
    cue: "Click the Arc stage in the pipeline. The same paper, smaller surface — moves stack as cards.",
    stage: 1,
  },
  {
    n: "05",
    title: "Stage III · Storyboard",
    prompt: "The storyboard is the deck before it's a deck. 18 cards. Each one names the slide kind, the goal, the line.",
    route: "workspace",
    projectId: "cmo-2026",
    cue: "Scroll a couple of cards. Show 'modular insert' — the swap-in tag.",
    stage: 2,
  },
  {
    n: "06",
    title: "Stage IV · Deck (default)",
    prompt: "Each card becomes a slide. Layouts are storyboard-modeled, not template-modeled. This is the version everyone reviews.",
    route: "workspace",
    projectId: "cmo-2026",
    cue: "Walk through 3 slides. Stop on the 5 Gaps grid.",
    stage: 3,
  },
  {
    n: "07",
    title: "Stage IV · Per-account variants",
    prompt: "Now the magic. Same deck, swapped for Target. Industry tokens, peer voice, pilot framing — all rewritten in place.",
    route: "workspace",
    projectId: "cmo-2026",
    cue: "Click the 'Target' chip in the variant row. Watch the gap-detail slide rewrite.",
    stage: 3,
    variant: "target",
  },
  {
    n: "08",
    title: "T24, the conversational layer",
    prompt: "T24 is the only agent the user talks to. Dock, panel, or invisible — the seller picks the level of presence.",
    route: "workspace",
    projectId: "cmo-2026",
    cue: "Open Tweaks → AI presence → Side panel. Show the Trail tab — every change tied to a source.",
    stage: 3,
  },
  {
    n: "09",
    title: "Publish to SharePoint",
    prompt: "When the play is approved, it goes to SharePoint. Same folder structure as the play kit. AWS reads from there.",
    route: "workspace",
    projectId: "cmo-2026",
    cue: "Click 'Publish to SharePoint'. Walk the three states: review → pushing → done.",
    stage: 3,
    openPublish: true,
  },
  {
    n: "10",
    title: "The play kit on disk",
    prompt: "Everything you saw is just Markdown. The agents read these files. Engineers can fork the kit for a new persona in an hour.",
    route: "templates",
    cue: "Pick the Templates tab. Show the file tree on the left.",
  },
];

function DemoGuide({ open, onClose, onJump }) {
  const [idx, setIdx] = React.useState(0);
  const [collapsed, setCollapsed] = React.useState(false);
  const beat = DEMO_BEATS[idx];

  const advance = React.useCallback((delta) => {
    const next = Math.max(0, Math.min(DEMO_BEATS.length - 1, idx + delta));
    setIdx(next);
    const b = DEMO_BEATS[next];
    onJump && onJump(b);
  }, [idx, onJump]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") { e.preventDefault(); advance(1); }
      else if (e.key === "ArrowLeft")  { e.preventDefault(); advance(-1); }
      else if (e.key === "Escape" && !collapsed) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, advance, collapsed, onClose]);

  if (!open) return null;

  return (
    <div className={"demo-guide " + (collapsed ? "is-collapsed" : "")}>
      <div className="demo-guide-head">
        <div className="demo-guide-id">
          <span className="demo-guide-glyph">D</span>
          <div>
            <div className="demo-guide-title">Demo mode</div>
            <div className="demo-guide-step muted mono">Beat {beat.n} of {String(DEMO_BEATS.length).padStart(2, "0")}</div>
          </div>
        </div>
        <div className="demo-guide-actions">
          <button className="btn-icon btn-sm" title="Collapse" onClick={() => setCollapsed(c => !c)}>
            <Icon name={collapsed ? "chevron_up" : "chevron_down"} size={13} />
          </button>
          <button className="btn-icon btn-sm" title="Exit demo" onClick={onClose}>
            <Icon name="close" size={13} />
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          <div className="demo-guide-body">
            <div className="demo-guide-beat">
              <div className="demo-guide-beat-h">{beat.title}</div>
              <p className="demo-guide-beat-prompt">{beat.prompt}</p>
              <div className="demo-guide-beat-cue">
                <span className="lbl">On screen</span>
                <span className="val">{beat.cue}</span>
              </div>
            </div>

            <div className="demo-guide-rail">
              {DEMO_BEATS.map((b, i) => (
                <button
                  key={i}
                  className={"demo-guide-tick " + (i === idx ? "active " : "") + (i < idx ? "passed" : "")}
                  onClick={() => { setIdx(i); onJump && onJump(b); }}
                  title={b.title}
                >
                  <span className="n">{b.n}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="demo-guide-foot">
            <button className="btn btn-quiet btn-sm" disabled={idx === 0} onClick={() => advance(-1)}>
              <Icon name="arrow_left" size={11} />Back
            </button>
            <span className="muted mono" style={{ fontSize: 10.5 }}>← →  to step</span>
            <button className="btn btn-accent btn-sm" disabled={idx === DEMO_BEATS.length - 1} onClick={() => advance(1)}>
              Next<Icon name="arrow_right" size={11} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

window.DemoGuide = DemoGuide;
window.DEMO_BEATS = DEMO_BEATS;
