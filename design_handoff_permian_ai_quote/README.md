# Handoff: Permian AI Quote — Working Tester (v1)

## Overview
**Permian AI Quote** is an AI-powered industrial quotation platform for the oil & gas industry. Customers (operators and EPCs) upload RFQs, specifications, drawings, datasheets, and bid packages. AI extracts equipment information, presents a structured summary for review, and generates budgetary pricing estimates from historical project data.

This package is the input for building a **working local tester** in a real codebase using Claude Code. The goal of v1 is a clickable, runnable app that walks the core flow end to end:

> **Upload → AI Processing → Equipment Review → Historical Pricing**

…plus a Landing page and a Dashboard home as the shell around it.

---

## About the Design Files
The files in this bundle are **design references created in HTML** — low-fidelity wireframe prototypes showing intended layout, structure, and behavior. **They are NOT production code to copy.** The wireframes are deliberately rough: hand-drawn-style boxes, a single blue accent on paper-white, placeholder hatched boxes for imagery, and yellow sticky notes annotating intended interactions/animations.

Your task is to **recreate these layouts in a new React app**, applying the **production visual system** described under *Design Tokens* (the dark-navy enterprise theme from the original spec) — **not** the paper-white wireframe styling. Think of the wireframes as the blueprint for *where things go and how they behave*, and the Design Tokens section as *what they should look like*.

If a detail isn't specified here, choose the option most consistent with the enterprise references the product is benchmarked against (Stripe Dashboard, Palantir Foundry, Autodesk Construction Cloud, Bloomberg Terminal, industrial SCADA).

## Fidelity
**Low-fidelity (lofi).** Use the wireframes as the guide for layout, hierarchy, and flow. Apply the production dark-navy design system (below) for all styling. Several screens in the wireframes show **multiple competing directions** (A/B/C) — the *Recommended direction* under each screen tells you which one to build for v1. The others are documented as alternatives but should not be built yet.

---

## Recommended Stack (for the local tester)
No codebase exists yet, so choose a fast, modern, widely-supported stack:

- **React 18 + Vite + TypeScript** — instant local dev server (`npm create vite@latest`)
- **Tailwind CSS** — for the design tokens below (configure them as theme extensions)
- **React Router** — for screen navigation
- **lucide-react** — icon set (clean, technical, matches the aesthetic)
- **Recharts** — for the pricing breakdown charts (stacked bars, comparison bars)
- **Mock data only** — no backend in v1. Stub the AI extraction/pricing with local JSON and `setTimeout` to simulate processing. Wire real APIs later.

Suggested route map:
```
/                       Landing
/app                    Dashboard home
/app/rfq/new            New RFQ · Upload
/app/rfq/:id/processing AI Processing
/app/rfq/:id/review     Equipment Review   ← the heart
/app/rfq/:id/pricing    Historical Pricing Analysis
```

---

## Design Tokens (PRODUCTION theme — use these, not the wireframe paper styling)

### Colors
| Token | Hex | Use |
|---|---|---|
| `bg/primary` | `#0B1220` | App background (deep navy) |
| `bg/secondary` | `#111827` | Panels, secondary surfaces (dark slate) |
| `bg/card` | `#1F2937` | Cards, raised surfaces (medium slate) |
| `border` | `#2A3441` | Hairline borders / dividers (derive ~1 step lighter than card) |
| `accent/blue` | `#3B82F6` | Primary accent, links, active nav, primary buttons |
| `success/green` | `#10B981` | High confidence, completed, success |
| `warning/amber` | `#F59E0B` | Low-confidence fields, "needs review", missing info |
| `error/red` | `#EF4444` | Errors, failed validation |
| `text/primary` | `#FFFFFF` | Headings, primary text |
| `text/secondary` | `#9CA3AF` | Labels, secondary text, captions |

### Typography
- **Headings:** Inter, weights 600/700
- **Body:** Inter, weight 400/500
- **Engineering data & numeric values:** JetBrains Mono (dimensions, pressures, prices, IDs, confidence %, log feeds)
- Large dashboard numbers should be prominent and mono (e.g. metric values, the price range).

> Note: the wireframes were switched to *IBM Plex Sans* per a review request, but the production spec calls for **Inter**. Use Inter for the real build unless the team says otherwise.

### Spacing / Radius / Elevation
- Spacing scale: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 px
- Card radius: 10–12px (clean, slightly rounded — the wireframe's organic wobble is a sketch artifact, **don't** reproduce it)
- Elevation: soft, low-spread shadows; cards may carry a subtle blue glow on hover (`box-shadow: 0 0 0 1px rgba(59,130,246,.25), 0 4px 20px rgba(0,0,0,.4)`)
- Status pills: token color text on a ~14% alpha tint of the same color, 1px solid border at full color, radius 6px

---

## Screens / Views

### 1. Landing Page
**Purpose:** Establish credibility; convert a procurement/engineering visitor to "Start New RFQ".
**Recommended direction:** **B · Split hero (product-forward)** — headline + sub + dual CTA on the left, a product-preview panel (the Equipment Review screen) on the right, a thin trust strip of customer wordmarks above the fold, and a "four steps" section below. Product-forward reads as a serious tool, not a marketing splash.
**Alternatives (don't build yet):** A · full-bleed blueprint hero; C · data-forward hero with live extraction demo + metrics ticker.

- **Top trust strip:** small uppercase "TRUSTED BY" + customer wordmarks (Chevron, ConocoPhillips, ExxonMobil, Occidental, EOG, Diamondback) rendered as **plain grayscale text wordmarks**, not logos (see Assets).
- **Header:** logo left, nav (Platform / How it works / Security / Pricing), "Sign in" + "Start New RFQ" right.
- **Hero left:** chip ("AI scope + budgetary pricing"), H1 **"Upload Your RFQ. Let AI Build the Scope."**, sub **"Transform specifications, datasheets, drawings, and bid packages into structured equipment summaries and budgetary pricing estimates in minutes."**, primary "Start New RFQ" + secondary "▷ Watch Demo", and three inline stats (1,248 projects / 94.6% avg accuracy / < 5 min to scope).
- **Hero right:** large preview image/panel of the Equipment Review screen.
- **How it works:** four steps — (01) Upload Documents, (02) AI Extraction, (03) Review Scope, (04) Estimate Pricing — each with a short description (see wireframe `wf-landing.jsx` `Steps`).

### 2. App Shell + Dashboard Home
**Purpose:** Landing pad after login; overview metrics + recent work.
**Recommended direction:** **A · Left sidebar** (the spec default). Logo top; primary "+ New RFQ" button; nav items: Dashboard, My RFQs, Projects, Pricing Analysis, Historical Projects, Reports, Admin, Settings, Help; user profile card pinned at the bottom (name "Jose Martinez", company "Permian Tank", role "Sr. Estimator", avatar). Active item uses blue text on a blue tint.
**Alternatives:** B · top nav full-width (more horizontal room for dense tables); C · icon rail + ⌘K command bar (power-user/terminal feel). Keep C's ⌘K idea on the roadmap.

- **Header row:** greeting **"Good Morning, Jose"** + subtext **"3 RFQs awaiting review"**; search field; notifications icon.
- **Metric cards (4, equal grid):**
  - Active RFQs — **42** — trend "▲ 6 this week" (info)
  - Pending Review — **8** — "3 urgent" (amber)
  - Historical Projects — **1,248** — "▲ 24 added" (green)
  - Average Accuracy — **94.6%** — "▲ 1.2 pts" (green)
  - Each: mono value, uppercase mono label, status pill, subtle blue glow on hover, optional sparkline/trend.
- **Recent RFQs table:** columns RFQ # / Project / Items / Status. Rows link to the Review screen. Sample rows in `wf-app.jsx` `RFQTable`.

### 3. New RFQ · Upload
**Purpose:** Entry point of the workflow.
**Recommended direction:** **A · Big centered dropzone** for v1 (simplest to build and demo). Large dashed drop area in blue tint with an upload icon, "Drag & drop files here / or browse", supported-type chips (PDF, DWG, XLSX, DOCX, ZIP). Below: uploaded files list, each a card with filename, file-type badge, size, a progress bar, and a status pill (Uploaded / Uploading…). Primary "Build Scope →" advances to Processing.
**Alternative:** B · guided multi-source (SharePoint / email / link import) + a queue table. Build later.
**Behavior:** drag-and-drop and click-to-browse both add file cards; progress animates from 0→100; once all complete, "Build Scope →" enables and routes to Processing.

### 4. AI Processing
**Purpose:** Make the wait legible — show work happening.
**Recommended direction:** **A · Centered engine + live feed.** A circular "AI engine" animation (concentric rings — one rotating, nodes pulsing around the perimeter, "AI" core), headline "Building your scope…", doc/page count, prominent **estimated time remaining**, and a live activity feed that checks items off in sequence:
`Reading RFQ… → Extracting dimensions… → Identifying pressure requirements… → Analyzing specifications… → Comparing historical projects… → Determining confidence levels…`
**Alternative:** B · split layout with the engine on one side and per-document progress bars + feed on the other (better when many docs). Build later.
**Behavior:** simulate with timers; advance feed items every ~1.5–2.5s; auto-route to Review when complete.

### 5. Equipment Review ★ (the heart)
**Purpose:** Verify and edit AI-extracted scope against the source document before pricing. This is the most important screen — invest here.
**Recommended direction:** **C · True 50/50 + source traceability.** Three columns: **(left)** document viewer with highlightable regions; **(center)** extracted equipment as expandable cards; **(right)** sticky "Information Needed" panel. Clicking a field in a card highlights its source region in the document, and vice-versa (bidirectional link). This source-traceability is the product's trust differentiator.
**Alternatives:** A · document-leads (wider doc, narrow scope) — good when users distrust extraction; B · scope-leads (big cards, doc collapses to a reference rail) — good when extraction is trusted. Consider making the split adjustable later.

- **Header:** "Review Scope · {Customer} — {Project}", RFQ #, item count, "{n} need review"; actions "Edit" + "Accept & Price →".
- **Document viewer (left):** filename, page nav (◂ 3 / 38 ▸), zoom; body text rendered as placeholder bars with **highlight zones** that activate (blue outline + blue tint) when the linked field is selected. v1 can use a real PDF render (pdf.js) or a styled placeholder page — placeholder is fine for the tester.
- **Equipment cards (center):** expandable. Header = "Equipment #n · {Type}" + confidence pill. Body = a 3-column grid of fields. Example fields for an API 650 tank: Type = API 650 Storage Tank, Quantity = 3, Diameter = 12 ft, Height = 20 ft, Capacity = 16,900 gal, Material = Carbon Steel, Pressure = Atmospheric, Coating = Internal Epoxy, Code = API 650, Confidence = 94%.
  - **Low-confidence handling:** fields with low confidence render in **amber** with the value highlighted and the card border amber; the card header shows "Needs review · {conf}%". Example: Pressure = Unknown, Confidence = 47%, Status = Needs Review. Low-confidence cards expose an **"Ask AI to clarify"** button.
  - **Source link:** fields tied to a document location carry a small "↪" affordance; clicking selects them and highlights the source region.
- **Information Needed panel (right, sticky):** title "⚠ Information Needed", items: Roof Type, Corrosion Allowance, Internal Coating, Nozzle Schedule, Wind Design Criteria, Seismic Requirements. Each item has a "request →" affordance that (in v1) opens a stub "draft a clarification" action.

### 6. Historical Pricing Analysis
**Purpose:** Show the budgetary estimate and the historical evidence behind it.
**Recommended direction:** **A · Estimate hero** for v1 (clearest story for a demo). Big centered **Estimated Price Range** ($890,000 – $1,120,000) in mono blue, a confidence pill (87%), midpoint + "based on 14 similar projects" chips. Below: a **cost breakdown** stacked bar (Material, Labor, Coating, Freight, Engineering, Contingency, Margin) with a legend, a "Range drivers" list (each tagged tightens/widens/uncertain), and a row of **Similar historical projects** cards (Project #, Customer, Year, Equipment, Sold Price, Similarity %).
**Alternative:** B · analyst dashboard (price hero + breakdown + this-vs-median comparison bars on the left, a sortable similar-projects table on the right). Build for power users later.
- Sample similar projects in `wf-pricing.jsx` `SIMS` (e.g. #4582 Chevron 2024, 12'×20' API 650, $302,000, 94% match).

---

## Interactions & Behavior (v1)
- **Navigation:** sidebar items route between screens; "Start New RFQ" / "+ New RFQ" → Upload; table rows → Review; flow CTAs advance the stepper (Upload → Processing → Review → Pricing).
- **Upload:** drag-and-drop + browse; animated per-file progress; gate the advance button until uploads finish.
- **Processing:** timed simulation; sequential feed; rotating ring + pulsing nodes (CSS/transform animation); auto-advance on complete.
- **Equipment Review:** expand/collapse cards; click field ↔ highlight source region (shared selected-field state); low-confidence amber states; "Ask AI to clarify" opens a stub modal/drawer.
- **Pricing:** animated count-up on the price range; charts render from mock data; hover tooltips on bars.
- **Global polish:** soft card hover (lift + faint blue glow), skeleton loaders while mock fetches resolve, live status dots, smooth route transitions. **Keep animation subtle and professional — no flashy startup-style motion.**

## State Management (v1, mock)
- `rfqs[]` — id, customer, project, status, items[]
- `currentRfq` — selected RFQ for the flow
- `equipmentItems[]` — fields[], confidence, needsReview, sourceRef
- `selectedFieldId` — drives the doc-highlight ↔ card link (shared between viewer and cards)
- `uploadQueue[]` — file, progress, status
- `processingStep` — index into the activity feed; drives auto-advance
- `pricing` — range, confidence, breakdown[], similarProjects[]
- React Context or a light store (Zustand) is plenty; no Redux needed for v1.

## Responsive Behavior
Primary target is **desktop / large monitors** (estimators, engineers, procurement, PMs, executives). Build desktop-first. Sidebar can collapse to an icon rail under ~1100px; the three-column Review can stack (doc → scope → panel) on narrow widths. Mobile is a later concern.

## Assets
- **No real customer logos.** Render Chevron / ConocoPhillips / ExxonMobil / Occidental / EOG Resources / Diamondback Energy as **plain grayscale text wordmarks** (uppercase, letter-spaced). Do not recreate trademarked logos.
- **Icons:** use `lucide-react` (upload, file types, chevrons, search, alerts, etc.).
- **Hero / product imagery:** the wireframes use hatched placeholders. For the tester, screenshot the built Review screen for the landing hero, or keep a styled placeholder.
- **PDF viewer:** `pdf.js` (react-pdf) for real docs, or a styled placeholder page with highlight regions for the tester.
- **No proprietary fonts** beyond Google Fonts (Inter, JetBrains Mono).

## Files (design references in this bundle)
HTML/JSX wireframe sources — open these to see exact layout, sample copy, and the annotated interactions:
- `Permian AI Quote — Wireframes.html` — entry point; assembles all screens on a pannable canvas (open in a browser to view).
- `wf-kit.jsx` — shared primitives + token-ish helpers (Box, Field, Status, Btn, Ph, etc.).
- `wf-landing.jsx` — Landing directions A/B/C + `Steps`, `LogoWall`.
- `wf-app.jsx` — Dashboard directions A/B/C + `Metrics`, `RFQTable`, sample data.
- `wf-flow.jsx` — Upload (A/B) + AI Processing (A/B) + the `Engine` animation + `FEED` strings + `Stepper`.
- `wf-review.jsx` — Equipment Review A/B/C + `EquipCard`, `DocPage` (highlight zones), `MissingPanel`.
- `wf-pricing.jsx` — Pricing A/B + `StackedBar`, `SimilarCard`, `COST`/`SIMS` sample data.
- `design-canvas.jsx` — the wireframe presentation harness only; **not** part of the product, ignore for the build.

### How to view the wireframes locally
The wireframes load React/Babel from a CDN, so just open `Permian AI Quote — Wireframes.html` in a browser **served over http** (some browsers block local `file://` module loads). Quickest:
```
cd <this folder>
python3 -m http.server 8000
# then open http://localhost:8000/Permian%20AI%20Quote%20—%20Wireframes.html
```
Pan/zoom the canvas; click any frame's expand icon to view it fullscreen.

---

## Suggested first prompt for Claude Code
> "Scaffold a React 18 + Vite + TypeScript + Tailwind app for an enterprise tool called Permian AI Quote. Configure the dark-navy design tokens from `design_handoff_permian_ai_quote/README.md`. Build the six screens described there using the *Recommended direction* for each, with React Router, mock data, and the simulated AI processing flow. Use Inter + JetBrains Mono, lucide-react icons, and Recharts for the pricing charts. Start with the app shell + Dashboard, then the Upload → Processing → Review → Pricing flow."
