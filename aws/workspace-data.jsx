/* global React */
/* Live play loader. Reads the OpenClaw play folder over Cloudflare Tunnel
   (https://workspace.bln24.com) and exposes a useLivePlays() hook.
   Falls back to T24.projects (seeded mocks) on any error. */

const WORKSPACE_URL = (window.BLN24_CONFIG && window.BLN24_CONFIG.workspaceUrl) || "https://workspace.bln24.com";

/* The plays we expect to see in the workspace. Add new slugs here as Anvil
   produces new plays — or wire to an index.json once OpenClaw writes one. */
const KNOWN_PLAYS = [
  { slug: "cxo-elevate-caio-2026", persona: "CAIO", personaFull: "Chief AI Officer" },
];

async function readPlayFile(slug, filename) {
  try {
    const r = await fetch(`${WORKSPACE_URL}/${slug}/${filename}`, { cache: "no-store" });
    if (!r.ok) return null;
    return await r.text();
  } catch (e) { return null; }
}

function parseBrief(text) {
  if (!text) return null;
  const title = (text.match(/^#\s+(.+)$/m) || [])[1];
  const cohort = (text.match(/(?:cohort|targets?)\s*:\s*([^\n]+)/i) || [])[1];
  return {
    title: title ? title.trim() : null,
    summary: text.split("\n").slice(0, 8).join(" ").slice(0, 280),
    cohortNote: cohort ? cohort.trim() : null,
  };
}

function detectStage(files) {
  if (files.deck) return { idx: 3, name: "Deck",       status: "Deck rendered" };
  if (files.story) return { idx: 2, name: "Storyboard", status: "Storyboard ready" };
  if (files.arc) return { idx: 1, name: "Narrative Arc", status: "Arc approved" };
  if (files.narrative) return { idx: 0, name: "Narrative", status: "Narrative drafted" };
  return { idx: 0, name: "Narrative", status: "Awaiting first draft" };
}

async function loadOnePlay(meta) {
  const [brief, narrative, arc, story, deck] = await Promise.all([
    readPlayFile(meta.slug, "00_brief.md"),
    readPlayFile(meta.slug, "02_narrative.md"),
    readPlayFile(meta.slug, "03_arc.md"),
    readPlayFile(meta.slug, "04_storyboard.md"),
    readPlayFile(meta.slug, "05_deck.pptx"),
  ]);
  if (!brief) return null;
  const parsed = parseBrief(brief);
  const stage = detectStage({ narrative, arc, story, deck });
  return {
    id: meta.slug,
    slug: meta.slug,
    persona: meta.persona,
    personaFull: meta.personaFull,
    title: parsed.title || `${meta.personaFull} play`,
    cohort: parsed.cohortNote ? [parsed.cohortNote] : [],
    cohortSize: 1,
    stage: stage.name.toLowerCase(),
    stageIndex: stage.idx,
    status: stage.status,
    statusKind: deck ? "approved" : "live",
    progress: [25, 50, 75, 100][stage.idx],
    due: "—",
    dueIn: 0,
    lead: "anvil",
    team: ["anvil", "stephen", "scout"],
    live: stage.idx < 3 ? ["anvil"] : [],
    lastActivity: `Anvil last touched ${stage.name.toLowerCase()}`,
    lastActivityAt: "live",
    cover: "linear-gradient(135deg,#3a2d5c 0%,#5c2d4a 50%,#3a2d5c 100%)",
    accent: "#c79bff",
    tags: [meta.persona, "OpenClaw"],
    industry: "Cross-industry · Fortune 500",
    live_source: true,
    files: { brief: !!brief, narrative: !!narrative, arc: !!arc, story: !!story, deck: !!deck },
  };
}

function useLivePlays() {
  const [state, setState] = React.useState({ loading: true, plays: null, error: null });
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const loaded = await Promise.all(KNOWN_PLAYS.map(loadOnePlay));
        if (cancelled) return;
        const valid = loaded.filter(Boolean);
        setState({ loading: false, plays: valid, error: null });
      } catch (e) {
        if (!cancelled) setState({ loading: false, plays: null, error: e.message });
      }
    })();
    return () => { cancelled = true; };
  }, []);
  return state;
}

window.useLivePlays = useLivePlays;
window.WORKSPACE_URL = WORKSPACE_URL;
