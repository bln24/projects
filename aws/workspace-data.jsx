/* global React */
/*
  workspace-data.jsx — Live play loader from SharePoint T24 Plays list.
  Falls back to [] on any error.

  SharePoint:
    Site:    thebln24.sharepoint.com/sites/AWST24
    List ID: 621fcc09-a31a-458c-9d8d-2ddc5f305e98
*/

const SP_SITE_ID   = "thebln24.sharepoint.com,c5a784dc-1541-42e7-81de-ccf367b4f2e5,8addf76a-63d1-48ef-a0e3-ce14a52731e9";
const SP_LIST_ID   = "621fcc09-a31a-458c-9d8d-2ddc5f305e98";

async function spGetUserToken() {
  if (!window.msalInstance) throw new Error("MSAL not initialized");
  const acct = window.msalInstance.getAllAccounts()[0];
  if (!acct) throw new Error("Not signed in");
  try {
    const r = await window.msalInstance.acquireTokenSilent({
      scopes: ["https://graph.microsoft.com/Sites.ReadWrite.All"],
      account: acct,
    });
    return r.accessToken;
  } catch {
    const r = await window.msalInstance.acquireTokenPopup({
      scopes: ["https://graph.microsoft.com/Sites.ReadWrite.All"],
    });
    return r.accessToken;
  }
}

// Map a SharePoint list item → the play shape the app expects
function mapItem(item) {
  const f = item.fields;


  let team = [];
  try { team = JSON.parse(f.Team || "[]"); } catch {}

  const stageIndex = typeof f.StageIndex === "number" ? f.StageIndex : 0;
  const stages = ["narrative", "arc", "storyboard", "deck"];

  // Due date → "May 30" style + daysLeft
  let dueLabel = "TBD";
  let dueIn = 0;
  if (f.Due) {
    const d = new Date(f.Due);
    dueLabel = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    dueIn = Math.round((d - Date.now()) / 86400000);
  }

  const personaId = (f.Persona || "").toUpperCase();

  return {
    // identity
    id: String(item.id),
    spItemId: item.id,
    slug: f.Persona ? `${f.Persona.toLowerCase()}-elevate` : String(item.id),
    // display
    persona: f.Persona || "?",
    personaFull: f.PersonaFull || f.Persona || "Unknown",
    industry: f.Industry || "Enterprise",
    title: f.Title || `${f.PersonaFull || f.Persona} play`,
    // stage
    stage: stages[stageIndex] || "narrative",
    stageIndex,
    progress: [25, 50, 75, 100][stageIndex] || 25,
    // status
    status: f.Status || "In progress",
    statusKind: f.StatusKind || "live",
    // dates
    due: dueLabel,
    dueIn,
    // team
    lead: f.Lead || "angie",
    team: team.length ? team : [f.Lead || "angie"],
    live: stageIndex < 3 ? [f.Lead || "angie"] : [],
    // activity
    lastActivity: f.LastActivity || "",
    lastActivityAt: "",
    // visual
    cover: f.CoverGradient || "linear-gradient(135deg,#1a3a5c 0%,#2d5a8c 100%)",
    accent: f.AccentColor || "#7aa7ff",
    // meta
    tags: [f.Persona, "T24"].filter(Boolean),
    done: f.Done === true,
    stageOwners: ["angie", "angie", "stephen", "aws"],
    live_source: true,
  };
}

function useLivePlays() {
  const [state, setState] = React.useState({ loading: true, plays: [], error: null });

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const token = await spGetUserToken();
        const url = `https://graph.microsoft.com/v1.0/sites/${SP_SITE_ID}/lists/${SP_LIST_ID}/items?expand=fields&$top=100`;
        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error(`Graph ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const plays = (data.value || []).map(mapItem);
        setState({ loading: false, plays, error: null });
      } catch (e) {
        if (!cancelled) setState({ loading: false, plays: [], error: e.message });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return state;
}

// Write a new play to SharePoint
async function spCreatePlay(fields) {
  const token = await spGetUserToken();
  const body = {
    fields: {
      Title:          fields.title,
      Persona:        fields.persona,
      PersonaFull:    fields.personaFull,
      Industry:       fields.industry || "",
      Due:            fields.due ? new Date(fields.due).toISOString() : null,
      Team:           JSON.stringify(fields.team || []),
      Lead:           fields.lead || "",
      StageIndex:     0,
      Status:         "Awaiting first draft",
      StatusKind:     "idle",
      Done:           false,
      LastActivity:   "Play created",
      CoverGradient:  fields.cover || "linear-gradient(135deg,#1a3a5c 0%,#2d5a8c 100%)",
      AccentColor:    fields.accent || "#7aa7ff",
    }
  };
  const url = `https://graph.microsoft.com/v1.0/sites/${SP_SITE_ID}/lists/${SP_LIST_ID}/items`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Graph ${res.status}`);
  }
  const item = await res.json();
  return mapItem(item);
}

async function spAdvanceStage(spItemId, newStageIndex, extraFields = {}) {
  const token = await spGetUserToken();
  const fields = {
    StageIndex: newStageIndex,
    ...extraFields,
  };
  const url = `https://graph.microsoft.com/v1.0/sites/${SP_SITE_ID}/lists/${SP_LIST_ID}/items/${spItemId}/fields`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Graph ${res.status}`);
  }
  return await res.json();
}

async function spListStageFiles(playSlug, stage) {
  // Uses existing spListFiles from the inlined sp-upload block
  return window.spListFiles ? spListFiles(playSlug, stage) : [];
}

window.useLivePlays = useLivePlays;
window.spCreatePlay = spCreatePlay;
window.spAdvanceStage = spAdvanceStage;
window.spListStageFiles = spListStageFiles;
window.SP_SITE_ID = SP_SITE_ID;
window.SP_LIST_ID = SP_LIST_ID;
