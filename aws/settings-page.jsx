/* global React, Icon, T24 */
/* SettingsPage — model choice per agent, API keys, SharePoint mapping. */

const AGENT_DEFAULTS = {
  scout:  { name: "Scout",  role: "Research & ingestion", model: "ollama/llama-3.1-70b", temp: 0.3, runtime: "Mac mini · local" },
  anvil:  { name: "Anvil",  role: "Drafting & narrative", model: "claude-sonnet-4.5",     temp: 0.7, runtime: "Anthropic API" },
  scribe: { name: "Scribe", role: "Deck assembly",        model: "gpt-4o",                temp: 0.4, runtime: "OpenAI API" },
};

const MODEL_OPTIONS = [
  { value: "claude-sonnet-4.5",   label: "Claude Sonnet 4.5",       provider: "anthropic" },
  { value: "claude-opus-4",       label: "Claude Opus 4",           provider: "anthropic" },
  { value: "claude-haiku-4.5",    label: "Claude Haiku 4.5",        provider: "anthropic" },
  { value: "gpt-4o",              label: "GPT-4o",                  provider: "openai" },
  { value: "gpt-4-turbo",         label: "GPT-4 Turbo",             provider: "openai" },
  { value: "ollama/llama-3.1-70b",label: "Llama 3.1 70B (local)",   provider: "ollama" },
  { value: "ollama/qwen2.5-72b",  label: "Qwen 2.5 72B (local)",    provider: "ollama" },
];

function SettingsPage() {
  const [section, setSection] = React.useState("agents");

  const sections = [
    { id: "agents",     label: "Agents & models",  icon: "spark" },
    { id: "keys",       label: "API keys",          icon: "lock" },
    { id: "sharepoint", label: "SharePoint sync",   icon: "folder" },
    { id: "people",     label: "Team",              icon: "user" },
    { id: "appearance", label: "Appearance",        icon: "sliders" },
    { id: "advanced",   label: "Advanced",          icon: "code" },
  ];

  return (
    <div className="settings-page">
      <aside className="settings-rail">
        <div className="settings-rail-head">
          <div className="eyebrow">Settings</div>
          <h2>Workspace</h2>
        </div>
        <nav className="settings-nav">
          {sections.map(s => (
            <button
              key={s.id}
              className={"settings-nav-item " + (section === s.id ? "active" : "")}
              onClick={() => setSection(s.id)}
            >
              <Icon name={s.icon} size={14} />
              <span>{s.label}</span>
            </button>
          ))}
        </nav>
        <div className="settings-rail-foot">
          <div className="muted mono" style={{ fontSize: 10 }}>BLN24 · v0.4.2</div>
          <div className="muted mono" style={{ fontSize: 10 }}>signed in as Angie</div>
        </div>
      </aside>

      <main className="settings-main">
        {section === "agents" && <AgentsPanel />}
        {section === "keys" && <KeysPanel />}
        {section === "sharepoint" && <SharepointPanel />}
        {section === "people" && <PeoplePanel />}
        {section === "appearance" && <AppearancePanel />}
        {section === "advanced" && <AdvancedPanel />}
      </main>
    </div>
  );
}

function SettingsHeader({ eyebrow, title, sub }) {
  return (
    <header className="settings-section-head">
      <div className="eyebrow">{eyebrow}</div>
      <h1 className="settings-h1">{title}</h1>
      {sub && <p className="settings-sub">{sub}</p>}
    </header>
  );
}

function AgentsPanel() {
  const [agents, setAgents] = React.useState(AGENT_DEFAULTS);

  const update = (id, field, value) => {
    setAgents(a => ({ ...a, [id]: { ...a[id], [field]: value } }));
  };

  return (
    <div className="settings-content">
      <SettingsHeader
        eyebrow="The crew"
        title="Agents & models"
        sub="Each agent runs against a different model based on what it's good at. Scout uses a local model for cost; Anvil and Scribe call hosted APIs for quality. Override per agent here."
      />

      <div className="agent-list">
        {Object.entries(agents).map(([id, a]) => (
          <div key={id} className="agent-card">
            <div className="agent-card-head">
              <div className="agent-avatar agent-avatar-lg" style={{ background: T24.agents?.[id]?.color || "var(--accent)" }}>
                {a.name[0]}
              </div>
              <div className="agent-meta">
                <div className="agent-name">{a.name}</div>
                <div className="agent-role">{a.role}</div>
                <div className="agent-runtime"><Icon name="dot" size={6}/> {a.runtime}</div>
              </div>
              <span className="pill pill-success">Active</span>
            </div>

            <div className="agent-card-body">
              <div className="settings-field">
                <label>Model</label>
                <select className="settings-select" value={a.model} onChange={e => update(id, "model", e.target.value)}>
                  {MODEL_OPTIONS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>

              <div className="settings-field">
                <label>Temperature <span className="muted mono">{a.temp.toFixed(2)}</span></label>
                <input type="range" min="0" max="1" step="0.05" value={a.temp} onChange={e => update(id, "temp", Number(e.target.value))} className="settings-slider"/>
                <div className="slider-ticks">
                  <span>Tight · 0.0</span>
                  <span>Balanced · 0.5</span>
                  <span>Loose · 1.0</span>
                </div>
              </div>

              <div className="settings-field-row">
                <button className="btn btn-ghost btn-sm">View prompt</button>
                <button className="btn btn-ghost btn-sm">Test run</button>
                <button className="btn btn-ghost btn-sm">Reset to default</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KeysPanel() {
  const keys = [
    { id: "anthropic", label: "Anthropic", env: "ANTHROPIC_API_KEY", set: true,  used: "Anvil, T24 chat" },
    { id: "openai",    label: "OpenAI",    env: "OPENAI_API_KEY",    set: true,  used: "Scribe, voice pass" },
    { id: "msft",      label: "Microsoft Graph (SharePoint)", env: "MSGRAPH_CLIENT_SECRET", set: true,  used: "Source ingestion, deck export" },
    { id: "ollama",    label: "Ollama (local)",   env: "OLLAMA_HOST", set: false, used: "Scout (when local)" },
  ];

  return (
    <div className="settings-content">
      <SettingsHeader
        eyebrow="Credentials"
        title="API keys"
        sub="Keys are stored in the runner's environment, not the browser. Setting a key here triggers a write to the orchestrator's .env and a hot-reload."
      />

      <div className="keys-list">
        {keys.map(k => (
          <div key={k.id} className={"key-row " + (k.set ? "key-set" : "key-unset")}>
            <div className="key-row-main">
              <div className="key-name">{k.label}</div>
              <div className="key-env"><code>{k.env}</code></div>
              <div className="key-used muted">used by: {k.used}</div>
            </div>
            <div className="key-row-actions">
              {k.set ? (
                <>
                  <span className="pill pill-success">Set</span>
                  <button className="btn btn-ghost btn-sm">Rotate</button>
                  <button className="btn btn-ghost btn-sm">Test</button>
                </>
              ) : (
                <>
                  <span className="pill pill-muted">Not set</span>
                  <button className="btn btn-accent btn-sm">Add key</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="settings-callout">
        <div className="eyebrow">Where these live</div>
        <p>Keys are written to <code>~/.t24/.env</code> on the runner host (the Mac mini). The browser never sees them — every API call goes through the local orchestrator first.</p>
      </div>
    </div>
  );
}

function SharepointPanel() {
  return (
    <div className="settings-content">
      <SettingsHeader
        eyebrow="Source of truth"
        title="SharePoint sync"
        sub="Plays read source materials from one SharePoint folder, write deck output to another. The kit folder structure mirrors what the agents see on disk."
      />

      <div className="sp-grid">
        <div className="sp-card">
          <div className="sp-card-head">
            <Icon name="folder" size={16}/>
            <h4>Source folder</h4>
            <span className="pill pill-success">Connected</span>
          </div>
          <div className="sp-path"><code>BLN24 / AWS / Plays / sources/</code></div>
          <div className="muted" style={{ fontSize: 12, lineHeight: 1.5 }}>
            Anything dropped here is auto-ingested by Scout into the active play's <code>00_brief.md</code> and <code>sources/</code> directory. Indexed every 5 minutes.
          </div>
          <div className="sp-stats">
            <div><span className="num">14</span><span className="lbl">files</span></div>
            <div><span className="num">2.4</span><span className="lbl">GB</span></div>
            <div><span className="num">3m</span><span className="lbl">since sync</span></div>
          </div>
          <button className="btn btn-ghost btn-sm">Change folder</button>
        </div>

        <div className="sp-card">
          <div className="sp-card-head">
            <Icon name="folder" size={16}/>
            <h4>Deck output folder</h4>
            <span className="pill pill-success">Connected</span>
          </div>
          <div className="sp-path"><code>BLN24 / AWS / Plays / decks/</code></div>
          <div className="muted" style={{ fontSize: 12, lineHeight: 1.5 }}>
            Approved decks land here as both <code>.pptx</code> and <code>.pdf</code>. AWS reviewers have read access to this folder only.
          </div>
          <div className="sp-stats">
            <div><span className="num">7</span><span className="lbl">decks</span></div>
            <div><span className="num">3</span><span className="lbl">approved</span></div>
            <div><span className="num">just now</span><span className="lbl">last write</span></div>
          </div>
          <button className="btn btn-ghost btn-sm">Change folder</button>
        </div>

        <div className="sp-card">
          <div className="sp-card-head">
            <Icon name="folder" size={16}/>
            <h4>Audit log folder</h4>
            <span className="pill pill-muted">Optional</span>
          </div>
          <div className="sp-path muted"><code>(not configured)</code></div>
          <div className="muted" style={{ fontSize: 12, lineHeight: 1.5 }}>
            For compliance: every prompt + completion logged here as JSONL. Recommended if AWS asks for traceability.
          </div>
          <button className="btn btn-accent btn-sm">Configure</button>
        </div>
      </div>

      <div className="settings-callout">
        <div className="eyebrow">Sync schedule</div>
        <div className="settings-field-row" style={{ alignItems: "center" }}>
          <label className="muted" style={{ fontSize: 12 }}>Pull every</label>
          <select className="settings-select" defaultValue="5" style={{ maxWidth: 120 }}>
            <option value="1">1 minute</option>
            <option value="5">5 minutes</option>
            <option value="15">15 minutes</option>
            <option value="60">1 hour</option>
            <option value="manual">Manual only</option>
          </select>
          <span className="muted mono" style={{ fontSize: 11 }}>· last pull 3m ago · 0 failures (24h)</span>
        </div>
      </div>
    </div>
  );
}

function PeoplePanel() {
  const people = T24.people || {};
  return (
    <div className="settings-content">
      <SettingsHeader
        eyebrow="The team"
        title="People & roles"
        sub="Who can do what. Roles control which review actions a person sees in the workspace."
      />
      <div className="people-list">
        {Object.entries(people).filter(([k]) => !["t24","aws"].includes(k)).map(([k, p]) => (
          <div key={k} className="people-row">
            <span className="avatar avatar-md" style={{ background: p.color, color: "#0c0b08" }}>{p.initials}</span>
            <div className="people-meta">
              <div className="people-name">{p.name}</div>
              <div className="muted" style={{ fontSize: 12 }}>{p.role || "Team member"}</div>
            </div>
            <select className="settings-select" defaultValue={p.role?.toLowerCase().includes("director") ? "owner" : "editor"}>
              <option value="owner">Owner</option>
              <option value="editor">Editor</option>
              <option value="reviewer">Reviewer</option>
              <option value="viewer">Viewer</option>
            </select>
            <button className="btn btn-ghost btn-sm"><Icon name="more" size={12}/></button>
          </div>
        ))}
      </div>
      <button className="btn btn-ghost"><Icon name="plus" size={13}/> Invite teammate</button>
    </div>
  );
}

function AppearancePanel() {
  return (
    <div className="settings-content">
      <SettingsHeader
        eyebrow="Look & feel"
        title="Appearance"
        sub="The same controls live in the floating Tweaks panel. Settings here persist as your default."
      />
      <p className="muted" style={{ maxWidth: 540, lineHeight: 1.5 }}>
        For the full set — accent color, density, AI-presence mode, grain — open the Tweaks panel from the toolbar (or press <kbd>⌘.</kbd>).
      </p>
    </div>
  );
}

function AdvancedPanel() {
  return (
    <div className="settings-content">
      <SettingsHeader
        eyebrow="For developers"
        title="Advanced"
        sub="Direct access to the runner config, kit folder location, and reset utilities."
      />
      <div className="adv-list">
        <div className="adv-row">
          <div>
            <div className="adv-name">Kit folder</div>
            <div className="muted" style={{ fontSize: 12 }}>Where plays live on disk</div>
          </div>
          <code className="adv-value">~/Plays</code>
          <button className="btn btn-ghost btn-sm">Change</button>
        </div>
        <div className="adv-row">
          <div>
            <div className="adv-name">Runner endpoint</div>
            <div className="muted" style={{ fontSize: 12 }}>Local orchestrator URL</div>
          </div>
          <code className="adv-value">http://mac-mini.local:8787</code>
          <button className="btn btn-ghost btn-sm">Test connection</button>
        </div>
        <div className="adv-row">
          <div>
            <div className="adv-name">Activity log retention</div>
            <div className="muted" style={{ fontSize: 12 }}>How long the per-play log keeps events</div>
          </div>
          <select className="settings-select" defaultValue="90"><option>30 days</option><option>90 days</option><option>365 days</option><option>Forever</option></select>
        </div>
        <div className="adv-row danger">
          <div>
            <div className="adv-name">Reset workspace</div>
            <div className="muted" style={{ fontSize: 12 }}>Clears local state — does not touch SharePoint</div>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ color: "var(--danger, #d96666)" }}>Reset</button>
        </div>
      </div>
    </div>
  );
}

window.SettingsPage = SettingsPage;
