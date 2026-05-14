/* global React */
/*
  workspace-data.jsx — Play data via SharePoint file (T24-Plays.json).
  Uses Files.ReadWrite.All (delegated) — no Sites permissions needed.

  Drive: AWST24 site Documents library
  File:  /T24-Plays.json  (root of drive)
*/

// AWS Elevate Program SharePoint drive (Teams: AWS T24 group 21a55d48)
const SP_DRIVE_ID = "b!W-Fy9of3xUKBUCYYvYtORFxqX_Ml4-FNl7UVlPIFfxTXAi6pHB34S7n0EoXtUpeJ";
const SP_PLAYS_PATH = "AWS T24/T24-Plays.json";

async function spGetUserToken(scope) {
  const scopes = scope
    ? [scope]
    : ["https://graph.microsoft.com/Files.ReadWrite.All"];
  if (!window.msalInstance) throw new Error("MSAL not initialized");
  const acct = window.msalInstance.getAllAccounts()[0];
  if (!acct) throw new Error("Not signed in");
  try {
    const r = await window.msalInstance.acquireTokenSilent({ scopes, account: acct });
    return r.accessToken;
  } catch {
    const r = await window.msalInstance.acquireTokenPopup({ scopes });
    return r.accessToken;
  }
}

async function readPlaysFile() {
  const token = await spGetUserToken();
  const url = `https://graph.microsoft.com/v1.0/drives/${SP_DRIVE_ID}/root:/${SP_PLAYS_PATH}:/content`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 404) return { plays: [], version: 1 };
  if (!res.ok) throw new Error(`Graph ${res.status}`);
  return await res.json();
}

async function writePlaysFile(data) {
  const token = await spGetUserToken();
  const url = `https://graph.microsoft.com/v1.0/drives/${SP_DRIVE_ID}/root:/${SP_PLAYS_PATH}:/content`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(data, null, 2),
  });
  if (!res.ok) throw new Error(`Graph ${res.status}`);
  return await res.json();
}

function enrichPlay(raw) {
  // Parse stored JSON fields, derive display values
  let team = [];
  try { team = JSON.parse(raw.team || "[]"); } catch {}

  const stageIndex = typeof raw.stageIndex === "number" ? raw.stageIndex : 0;
  const stages = ["narrative", "arc", "storyboard", "deck"];

  let dueLabel = "TBD";
  let dueIn = 0;
  if (raw.due) {
    const d = new Date(raw.due);
    if (!isNaN(d)) {
      dueLabel = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dueIn = Math.round((d - Date.now()) / 86400000);
    }
  }

  return {
    id: String(raw.id),
    spItemId: raw.id,
    slug: raw.persona ? `${raw.persona} Elevate` : String(raw.id),
    persona: raw.persona || "?",
    personaFull: raw.personaFull || raw.persona || "Unknown",
    industry: raw.industry || "Enterprise",
    title: raw.title || `${raw.personaFull || raw.persona} play`,
    stage: stages[stageIndex] || "narrative",
    stageIndex,
    progress: [25, 50, 75, 100][stageIndex] || 25,
    status: raw.status || "In progress",
    statusKind: raw.statusKind || "live",
    due: dueLabel,
    dueIn,
    lead: raw.lead || "angie",
    team: team.length ? team : [raw.lead || "angie"],
    live: stageIndex < 3 ? [raw.lead || "angie"] : [],
    lastActivity: raw.lastActivity || "",
    lastActivityAt: "",
    cover: raw.cover || "linear-gradient(135deg,#1a3a5c 0%,#2d5a8c 100%)",
    accent: raw.accent || "#7aa7ff",
    tags: [raw.persona, "T24"].filter(Boolean),
    done: raw.done === true,
    stageOwners: ["angie", "angie", "stephen", "aws"],
    live_source: true,
    _raw: raw,
  };
}

function useLivePlays() {
  const [state, setState] = React.useState({ loading: true, plays: [], error: null });

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await readPlaysFile();
        if (cancelled) return;
        const plays = (data.plays || []).map(enrichPlay);
        setState({ loading: false, plays, error: null });
      } catch (e) {
        if (!cancelled) setState({ loading: false, plays: [], error: e.message });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return state;
}

async function spCreatePlay(fields) {
  const data = await readPlaysFile();
  const plays = data.plays || [];
  const newId = String(Date.now());
  const newRaw = {
    id: newId,
    title: fields.title || `${fields.personaFull || fields.persona} play`,
    persona: fields.persona || "",
    personaFull: fields.personaFull || fields.persona || "",
    industry: fields.industry || "Cross-industry · Fortune 500",
    due: fields.due || "",
    team: JSON.stringify(fields.team || ["angie", "stephen"]),
    lead: fields.lead || "angie",
    stageIndex: 0,
    status: "Awaiting first draft",
    statusKind: "idle",
    done: false,
    lastActivity: "Play created",
    cover: fields.cover || "linear-gradient(135deg,#1a3a5c 0%,#2d5a8c 100%)",
    accent: fields.accent || "#7aa7ff",
  };
  plays.push(newRaw);
  await writePlaysFile({ ...data, plays });
  return enrichPlay(newRaw);
}

async function spAdvanceStage(playId, newStageIndex, extraFields = {}) {
  const data = await readPlaysFile();
  const plays = data.plays || [];
  const idx = plays.findIndex(p => String(p.id) === String(playId));
  if (idx === -1) throw new Error(`Play ${playId} not found`);

  // Build revision entry — always append, never overwrite history
  const { FeedbackFrom, FeedbackNotes, Status, ...otherFields } = extraFields;
  const revisionEntry = {
    id: `rev-${Date.now()}`,
    at: new Date().toISOString(),
    action: FeedbackNotes ? "send_back" : "approve",
    fromStageIndex: plays[idx].stageIndex,
    toStageIndex: newStageIndex,
    stageName: (["Narrative","Arc","Storyboard","Deck"][plays[idx].stageIndex] || "Unknown"),
    status: Status || (FeedbackNotes ? "Returned for revision" : "Approved"),
    from: FeedbackFrom || null,
    notes: FeedbackNotes || null,
  };

  const existingRevisions = Array.isArray(plays[idx].revisions) ? plays[idx].revisions : [];
  plays[idx] = {
    ...plays[idx],
    stageIndex: newStageIndex,
    revisions: [...existingRevisions, revisionEntry],
    // Keep last-feedback fields for quick surface reads
    lastFeedbackFrom: FeedbackFrom || plays[idx].lastFeedbackFrom || null,
    lastFeedbackNotes: FeedbackNotes || plays[idx].lastFeedbackNotes || null,
    lastStatus: Status || plays[idx].lastStatus || null,
    ...otherFields,
  };

  await writePlaysFile({ ...data, plays });
  return enrichPlay(plays[idx]);
}

async function spListStageFiles(playSlug, stage) {
  return window.spListFiles ? spListFiles(playSlug, stage) : [];
}

window.useLivePlays = useLivePlays;
window.spGetUserToken = spGetUserToken;
window.spCreatePlay = spCreatePlay;
window.spAdvanceStage = spAdvanceStage;
window.spListStageFiles = spListStageFiles;
window.SP_DRIVE_ID = SP_DRIVE_ID;
