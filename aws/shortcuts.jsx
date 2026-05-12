/* global React */
/* Keyboard shortcuts: ⌘K (palette), ⌘/ (cheatsheet), ⌘. (tweaks toggle),
   G-then-letter sequences for navigation: G P (plays), G L (library),
   G C (calendar), G T (templates), G R (runners), G S (settings).
*/

function useKeyboardShortcuts({ onPalette, onShortcuts, onInbox, onQuestions, onTweaks, onNav }) {
  const [pendingG, setPendingG] = React.useState(false);
  const [hint, setHint] = React.useState(null);
  const gTimerRef = React.useRef(null);

  React.useEffect(() => {
    const onKey = (e) => {
      // Don't intercept while typing in inputs (unless it's a meta/cmd combo)
      const tag = (e.target?.tagName || "").toUpperCase();
      const inField = tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable;
      const meta = e.metaKey || e.ctrlKey;

      // Cmd/Ctrl + K — palette
      if (meta && e.key.toLowerCase() === "k") { e.preventDefault(); onPalette(); return; }
      // Cmd/Ctrl + / — shortcuts cheatsheet
      if (meta && e.key === "/") { e.preventDefault(); onShortcuts(); return; }
      // Cmd/Ctrl + . — toggle tweaks
      if (meta && e.key === ".") { e.preventDefault(); onTweaks?.(); return; }
      // Cmd/Ctrl + I — inbox
      if (meta && e.key.toLowerCase() === "i") { e.preventDefault(); onInbox?.(); return; }
      // Cmd/Ctrl + Shift + Q — open questions
      if (meta && e.shiftKey && e.key.toLowerCase() === "q") { e.preventDefault(); onQuestions?.(); return; }

      if (inField || meta) return;

      // G-then-letter sequences
      if (pendingG) {
        const map = {
          "p": ["dashboard", "Plays"],
          "l": ["library", "Library"],
          "c": ["calendar", "Calendar"],
          "t": ["templates", "Templates"],
          "r": ["runners", "Runners"],
          "s": ["settings", "Settings"],
          "n": ["create", "New play"],
        };
        const target = map[e.key.toLowerCase()];
        if (target) {
          e.preventDefault();
          onNav(target[0]);
          setHint({ msg: `→ ${target[1]}`, kind: "ok" });
          setTimeout(() => setHint(null), 900);
        } else if (e.key !== "g") {
          setHint({ msg: `No shortcut for "g ${e.key}"`, kind: "miss" });
          setTimeout(() => setHint(null), 1100);
        }
        clearTimeout(gTimerRef.current);
        setPendingG(false);
        return;
      }

      if (e.key.toLowerCase() === "g") {
        e.preventDefault();
        setPendingG(true);
        setHint({ msg: "g…", kind: "pending" });
        clearTimeout(gTimerRef.current);
        gTimerRef.current = setTimeout(() => {
          setPendingG(false);
          setHint(null);
        }, 1200);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(gTimerRef.current);
    };
  }, [pendingG, onPalette, onShortcuts, onInbox, onQuestions, onTweaks, onNav]);

  return hint;
}

function KbdHintToast({ hint }) {
  if (!hint) return null;
  if (hint.kind === "pending") {
    return (
      <div className="kbd-hint-toast">
        <kbd>g</kbd>
        <span className="muted">then…</span>
        <span className="muted">P plays · L library · C calendar · T templates · R runners · S settings</span>
      </div>
    );
  }
  return (
    <div className="kbd-hint-toast">
      <span>{hint.msg}</span>
    </div>
  );
}

function ShortcutsSheet({ open, onClose }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const groups = [
    {
      label: "General",
      items: [
        { keys: [["⌘", "K"]], desc: "Open command palette" },
        { keys: [["⌘", "/"]], desc: "Show keyboard shortcuts" },
        { keys: [["⌘", "."]], desc: "Toggle Tweaks panel" },
        { keys: [["⌘", "I"]], desc: "Open inbox" },
        { keys: [["⌘", "⇧", "Q"]], desc: "Open questions panel" },
        { keys: [["Esc"]], desc: "Close any overlay" },
      ],
    },
    {
      label: "Navigation",
      items: [
        { keys: [["G"], ["P"]], desc: "Go to Plays (Dashboard)", sequence: true },
        { keys: [["G"], ["L"]], desc: "Go to Library", sequence: true },
        { keys: [["G"], ["C"]], desc: "Go to Calendar", sequence: true },
        { keys: [["G"], ["T"]], desc: "Go to Templates", sequence: true },
        { keys: [["G"], ["R"]], desc: "Go to Runners", sequence: true },
        { keys: [["G"], ["S"]], desc: "Go to Settings", sequence: true },
        { keys: [["G"], ["N"]], desc: "New play", sequence: true },
      ],
    },
    {
      label: "Workspace",
      items: [
        { keys: [["⌘", "⏎"]], desc: "Send to next stage" },
        { keys: [["⌘", "S"]], desc: "Save version" },
        { keys: [["⌘", "Z"]], desc: "Undo last edit" },
        { keys: [["⌘", "⇧", "C"]], desc: "Add inline comment" },
      ],
    },
  ];

  return (
    <div className="shortcut-overlay" onClick={onClose}>
      <div className="shortcut-sheet" onClick={e => e.stopPropagation()}>
        <header className="shortcut-head">
          <h3>Keyboard shortcuts</h3>
          <button className="btn-quiet btn-sm" onClick={onClose}>Esc</button>
        </header>
        <div className="shortcut-body">
          {groups.map(g => (
            <div key={g.label} className="shortcut-group">
              <h4>{g.label}</h4>
              {g.items.map((it, i) => (
                <div key={i} className="shortcut-row">
                  <span>{it.desc}</span>
                  <span className="shortcut-keys">
                    {it.keys.map((combo, ci) => (
                      <React.Fragment key={ci}>
                        {ci > 0 && <span className={it.sequence ? "then" : "plus"}>{it.sequence ? "then" : ""}</span>}
                        {combo.map((k, ki) => (
                          <React.Fragment key={ki}>
                            {ki > 0 && !it.sequence && <span className="plus">+</span>}
                            <kbd>{k}</kbd>
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.useKeyboardShortcuts = useKeyboardShortcuts;
window.KbdHintToast = KbdHintToast;
window.ShortcutsSheet = ShortcutsSheet;
