# projects.bln24.com/aws — Quickstart

For Stephen and Angie. Bookmark this. ~5 min read.

---

## The flow, in one picture

```
Drop client material   →   T24 drafts Narrative   →   You review + approve
(decks, transcripts,        (15 min, automatic)        (anytime)
 meeting notes)
                                  ↓
                          Arc generated
                          Storyboard generated
                          Deck generated
                                  ↓
                            Brian approves
                                  ↓
                          Delivered to AWS
```

You never touch terminal, never paste console snippets, never ask Brian to debug. If something's stuck, the dashboard shows a red banner and there's a Re-run button in the workspace. Below is what each step looks like.

---

## Starting a new play

1. Open **[projects.bln24.com/aws](https://projects.bln24.com/aws/)** and sign in with your BLN24 Microsoft account.
2. Click **+ New Play** in the top-right.
3. **Step 01 · Persona** — pick CAIO / CIO / CMO / COO / CFO / CHRO / CTO. If the client title is something else (VP of Innovation, Chief Digital Officer, etc.), type it in the custom field — the system treats it as a new persona with the same structural shape.
4. **Step 02 · Brief** — give the play a working title (T24 will refine it later). The "Reference exemplars" panel reminds you that everything calibrates against the canonical CAIO Elevate FCD shape — 7 moves, 5 enablers, peer-conversation framing.
5. **Step 03 · Sources** — drop everything you have from the client:
   - Their existing decks (any version, even rough)
   - Meeting transcripts
   - Internal briefs
   - Industry research
   - Anything they wrote or said about their AI ambition
   The more T24 reads, the less generic the draft.
6. **Step 04 · Review** — sanity-check your inputs and click **Start the play**.
7. Wait ~15 minutes. T24 drafts the **Narrative working paper** from your sources, calibrated against the canonical CAIO Elevate exemplars. When it's ready, the play moves to **Awaiting review** and the file appears in the workspace left rail.

---

## Reviewing the Narrative

1. Click into the play from the dashboard.
2. Left rail shows the new `{PERSONA}_Elevate_Narrative_v1.docx`. Click to preview.
3. Read it cover to cover. The narrative should:
   - Match the **7-move structure** (open on dual mandate · install vocabulary · maturity map · diagnose gaps · welded answer · value chain · prove and close)
   - Include **verbatim quotes from your sources** with attribution (search for the "Sources used" appendix at the end)
   - Use **outcome-named peer conversations** (Revenue/Growth, Cost/Efficiency, Risk/Compliance, Product/Customer) — never fixed C-suite seats as column headers
   - Be **persona-specific** — CIO narratives talk about platform mandate, CMO about customer growth, etc.

### If it looks right
Click **Approve → Generate Arc** in the workspace. T24 spends another ~15 min generating the Arc Word doc from the approved Narrative. Same review loop applies through each stage.

### If it needs work
Click **Send back** in the right rail. Write specific feedback like "Move 4 missed the industry frontier concern Acme raised on the May 12 call." T24 picks up the feedback on the next cron tick and produces v2.

### If T24's draft references the wrong client / wrong industry / wrong personas
That's a calibration miss, not a system bug. Send back with the exact correction and T24 will respect it on v2.

---

## What each stage means

| # | Stage | What lives here | Who owns it |
|---|---|---|---|
| I | **Narrative** | Working paper · 7 moves with seller's notes | Angie (lead) |
| II | **Arc** | One card per move · the seller's mental map | Angie |
| III | **Storyboard** | Slide-by-slide spec · what each slide says + visual intent | Stephen |
| IV | **Deck** | Final PPTX · the artifact in front of the CAIO | AWS team approves |

Each Approve click fires the next stage's generation automatically.

---

## When something looks stuck

| Sign | What it means | What to do |
|---|---|---|
| Dashboard shows a **red alert banner** at the top | One or more plays are stuck | Click into the named play |
| Workspace status pill is **red** | Pipeline ran into trouble (agent timed out, missing source files, etc.) | Click **Recover · Re-run [stage]** in the header |
| Workspace status pill is **amber** ("Drafting...") | Pipeline is actively running | Just wait. Each stage takes 10–20 min |
| Workspace status pill is **green** ("Awaiting review") | Draft is ready | Open the file in the left rail and review |
| Workspace shows **"Awaiting first draft"** for >30 min | Initial dispatch never picked up | Click **Re-run Narrative** in the workspace header |

The **Re-run** button writes a fresh marker to SharePoint. The cron picks it up within 15 min. You don't have to refresh — the status pill flips automatically.

**You should never need to ask Brian to "fix the pipeline."** If you do, something I (Kobe) missed — tell Brian what error you saw and he'll loop me in.

---

## Things to know

- **15-minute cadence.** The cron poller runs every 15 min. So fresh markers can wait up to 15 min before the agent picks them up. If something feels stuck, give it 15 min before clicking Re-run.
- **One play, one active stage.** You can't run Narrative + Arc generation in parallel for the same play — the chain is sequential.
- **Sources should be CLIENT material.** Don't drop the canonical CAIO Elevate exemplars as "sources" — T24 already reads those automatically from the source-docs library. Drop ONLY what you got from the client.
- **Re-run keeps existing files.** Clicking Re-run on a stage with an existing draft will generate a v2 alongside v1. You can compare and pick which to send forward.
- **Send-back is preferred over Re-run** when you have specific feedback. Send-back creates a clear audit trail; Re-run is the "something broke, just try again" path.

---

## Glossary

| Term | Means |
|---|---|
| **Marker** | The `pipeline-request.json` file in a play's `01 - Source Materials/` folder. Written by the webapp; read by the cron. The thing that tells T24 to do work. |
| **Cron** | The 15-minute scheduled job on Brian's Mac mini that scans SharePoint for markers and dispatches the agent. |
| **Agent** | The Claude-powered worker that does the actual drafting. Runs once per marker. |
| **Exemplar** | The canonical CAIO Elevate documents in `source-docs/` that every persona's output gets calibrated against. |
| **Stuck** | A marker that's been pending >30 min without completing. Auto-flagged; surfaces in red. |

---

*If you find a step that's wrong or confusing, ping Brian — he'll have me update this doc.*
