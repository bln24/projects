/* sp-upload.jsx — SharePoint / Teams upload utility
   Uploads files to the "AWS T24" Teams channel (SharePoint behind it).
   Uses the signed-in user's MSAL delegated token (Files.ReadWrite.All scope).

   Teams channel: AWS T24
   SharePoint site: thebln24.sharepoint.com/sites/AWSElevateProgram
   Group: 21a55d48-2f31-4923-a082-a4d6510dd501
*/

const SP = {
  driveId: "b!W-Fy9of3xUKBUCYYvYtORFxqX_Ml4-FNl7UVlPIFfxTXAi6pHB34S7n0EoXtUpeJ",
  channelRoot: "AWS T24",
  // Map stage keys → folder names (matches what's in Teams)
  stageFolders: {
    sources:   "01 - Source Materials",
    narrative: "02 - Narrative Arcs",
    arc:       "02 - Narrative Arcs",
    storyboard:"03 - Storyboards",
    deck:      "04 - Decks",
    archive:   "05 - Archive",
  },
  // Map persona IDs → folder names in Teams
  playFolderName: {
    CAIO: "CAIO Elevate",
    CMO:  "CMO Elevate",
    COO:  "COO Elevate",
    CTO:  "CTO Elevate",
    CFO:  "CFO Elevate",
    CIO:  "CIO Elevate",
    CDO:  "CDO Elevate",
    CISO: "CISO Elevate",
    CXO:  "CXO Elevate",
    CRO:  "CRO Elevate",
    CEO:  "CEO Elevate",
    COO:  "COO Elevate",
  }
};

async function spGetToken() {
  if (!window.msalInstance) throw new Error("MSAL not initialized");
  const acct = window.msalInstance.getAllAccounts()[0];
  if (!acct) throw new Error("Not signed in");
  try {
    const r = await window.msalInstance.acquireTokenSilent({
      scopes: ["https://graph.microsoft.com/Files.ReadWrite.All"],
      account: acct,
    });
    return r.accessToken;
  } catch (e) {
    // Fallback: interactive
    const r = await window.msalInstance.acquireTokenPopup({
      scopes: ["https://graph.microsoft.com/Files.ReadWrite.All"],
    });
    return r.accessToken;
  }
}

function spEncodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function spFolderPath(playSlug, stage) {
  const folder = SP.stageFolders[stage] || SP.stageFolders.sources;
  return `${SP.channelRoot}/${playSlug}/${folder}`;
}

// Simple PUT upload (files < 4 MB)
async function _simpleUpload(token, filePath, file) {
  const url = `https://graph.microsoft.com/v1.0/drives/${SP.driveId}/root:/${spEncodePath(filePath)}:/content`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e?.error?.message || `Upload failed (${res.status})`);
  }
  return await res.json();
}

// Upload session for large files (>= 4 MB)
async function _sessionUpload(token, filePath, file, onProgress) {
  const sessionUrl = `https://graph.microsoft.com/v1.0/drives/${SP.driveId}/root:/${spEncodePath(filePath)}:/createUploadSession`;
  const sessRes = await fetch(sessionUrl, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ item: { "@microsoft.graph.conflictBehavior": "rename" } }),
  });
  if (!sessRes.ok) throw new Error(`Session create failed (${sessRes.status})`);
  const { uploadUrl } = await sessRes.json();

  const CHUNK = 5 * 1024 * 1024; // 5 MB per chunk
  let offset = 0;
  let result = null;

  while (offset < file.size) {
    const end = Math.min(offset + CHUNK, file.size);
    const chunk = file.slice(offset, end);
    const res = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Length": `${chunk.size}`,
        "Content-Range": `bytes ${offset}-${end - 1}/${file.size}`,
      },
      body: chunk,
    });
    offset = end;
    if (onProgress) onProgress(Math.round((offset / file.size) * 100));
    if (res.status === 200 || res.status === 201) {
      result = await res.json();
    } else if (res.status !== 202) {
      throw new Error(`Chunk failed (${res.status})`);
    }
  }
  return result;
}

// PUBLIC: Upload one File object to a play's stage folder in Teams
// playSlug = "CAIO Elevate" | "CMO Elevate" | etc.
// stage    = "sources" | "narrative" | "arc" | "storyboard" | "deck"
async function spUpload(file, playSlug, stage = "sources", onProgress) {
  const token = await spGetToken();
  const path = `${spFolderPath(playSlug, stage)}/${file.name}`;
  if (file.size < 4 * 1024 * 1024) {
    return _simpleUpload(token, path, file);
  }
  return _sessionUpload(token, path, file, onProgress);
}

// PUBLIC: Create the 5 stage folders for a new play (idempotent — ignores "already exists")
async function spEnsureFolders(playSlug) {
  const token = await spGetToken();
  const playPath = `${SP.channelRoot}/${playSlug}`;
  const url = `https://graph.microsoft.com/v1.0/drives/${SP.driveId}/root:/${spEncodePath(playPath)}:/children`;

  const seen = new Set();
  for (const name of Object.values(SP.stageFolders)) {
    if (seen.has(name)) continue;
    seen.add(name);
    await fetch(url, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ name, folder: {}, "@microsoft.graph.conflictBehavior": "fail" }),
    }).catch(() => {}); // silently ignore "already exists"
  }
}

// PUBLIC: List files in a play's stage folder
async function spListFiles(playSlug, stage = "sources") {
  const token = await spGetToken();
  const path = spFolderPath(playSlug, stage);
  const url = `https://graph.microsoft.com/v1.0/drives/${SP.driveId}/root:/${spEncodePath(path)}:/children`;
  const res = await fetch(url, { headers: { "Authorization": `Bearer ${token}` } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.value || []).map(i => ({
    id: i.id,
    name: i.name,
    size: i.size,
    modified: i.lastModifiedDateTime,
    webUrl: i.webUrl,
    mimeType: i.file?.mimeType,
  }));
}

// Approval state — stored in localStorage keyed per play + stage
// (Upgrade path: swap for a SharePoint JSON write later)
const APPROVAL_KEY = (playSlug, stageIdx) => `cxo-approval:${playSlug}:${stageIdx}`;

function spGetApproval(playSlug, stageIdx) {
  try {
    const raw = localStorage.getItem(APPROVAL_KEY(playSlug, stageIdx));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function spSetApproval(playSlug, stageIdx, by) {
  const data = { approved: true, by, at: new Date().toISOString() };
  localStorage.setItem(APPROVAL_KEY(playSlug, stageIdx), JSON.stringify(data));
  return data;
}

function spClearApproval(playSlug, stageIdx) {
  localStorage.removeItem(APPROVAL_KEY(playSlug, stageIdx));
}

window.SP = SP;
window.spUpload = spUpload;
window.spEnsureFolders = spEnsureFolders;
window.spListFiles = spListFiles;
window.spGetApproval = spGetApproval;
window.spSetApproval = spSetApproval;
window.spClearApproval = spClearApproval;
