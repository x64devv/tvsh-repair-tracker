# TVSH Repair Tracker — clickable POC

A Next.js (App Router) port of the `design_handoff_repair_tracker` prototype: a branch web
portal where a consultant logs a repair, and a customer mobile portal + WhatsApp assistant
that read the same job record.

Demo data is fictional but realistic: Rudo Chikwanha's Samsung 55" QLED, logged at the
**Africa Unity Square** branch and repaired at the **Product Service Centre, 42 Kelvin Road,
Graniteside, Harare**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

## Deploy to Vercel

Import the repo, accept the **Next.js** framework preset, deploy. No env vars, no server
code, no database — the whole demo is client-side and stateless.

## Driving the demo

1. **Branch portal · Log a repair** — the intake form. "Log repair & notify customer".
2. **Repair logged** — job number, WhatsApp preview. "Switch to Rudo's phone" (or show the
   manual lookup screen instead).
3. **Customer status** — donut progress, timeline, technician note, collect/deliver switch.
4. **WhatsApp assistant** — five tappable prompts; two are stage-aware.

The **···** button top-right opens the **presenter panel** (for the presenter, not the
audience — it stays collapsed by default):

- **Log next PSU milestone** — advances one stage; every stage-dependent string updates.
- **Jump to "ready"** — green banner + rating card.
- **Restart at the branch** — full reset.

## Structure

```
app/
  layout.tsx              Organic stylesheet + Caprasimo/Figtree via next/font
  page.tsx                'use client' demo shell — owns ALL state, switches surfaces
  icon.svg                favicon
components/
  frames/ChromeWindow.tsx browser chrome   (from design/browser-window.jsx)
  frames/IOSDevice.tsx    iPhone bezel     (from design/ios-frame.jsx)
  branch/PortalShell.tsx  sidebar + main column shared by both portal screens
  branch/IntakeScreen.tsx
  branch/LoggedScreen.tsx
  customer/LookupScreen.tsx
  customer/StatusScreen.tsx
  customer/ChatScreen.tsx
  PresenterPanel.tsx
lib/
  repair.ts               STAGES, REPLIES, derived copy, frame dimensions
styles/
  organic.css             Organic design system, copied from the handoff
  globals.css             font-token wiring + body reset
```

`app/page.tsx` holds the whole state object and passes values + handlers down, mirroring the
prototype's logic class. Derived values (`stepNo`, `pct`, `daysLeft`, `isReady`, …) are
computed in render, never stored.

## Notes on the port

- **Design tokens** come from `styles/organic.css` verbatim. The one edit is the removed
  `@import` of the Google Fonts URL — the same two families (Caprasimo, Figtree 300–700) are
  loaded through `next/font/google` in `app/layout.tsx` and re-bound to `--font-heading` /
  `--font-body` in `styles/globals.css`, so every `var(--font-…)` in the design still resolves.
- **Device frames** are ported near-verbatim. `IOSDevice` keeps the bezel, dynamic island,
  status bar and home indicator; the starter's unused nav bar, grouped list and keyboard were
  left out.
- **Fit-to-viewport scaling** matches the prototype: `availW = vw - 72`, `availH = vh - 130`,
  `portalScale = min(1, availW/1180, availH/780)`, `phoneScale = min(1, availH/874)`. All
  viewport measurement happens inside `useEffect`, so `next build` is clean for SSR.
- **Icons** are `lucide-react` at `strokeWidth 2.75` (3.5 for the small timeline ticks).
- **Intake inputs** are pre-filled and editable but uncontrolled — nothing reads them, exactly
  as in the prototype.
- **Free-text WhatsApp** is intentionally not implemented; the composer is a static
  "Tap a question above" pill and the prompt chips stand in for the assistant.
- One small addition: the chat transcript auto-scrolls to the newest bubble (scoped to the
  transcript container, so the page behind the frame never scrolls).

## Verified

Built and clicked through headless Chromium at 1440×900 and 1280×800 — all nine acceptance
criteria from the handoff pass, with no console errors and no page scrolling in either frame.

## Open questions for TVSH (from the handoff, still open)

- Does the PSU emit a reliable per-stage ETA, or should the portal show a range only?
- Are technician notes safe to expose verbatim, or do they need a customer-facing rewrite?
- Out-of-warranty quote approval — in the portal, or keep it a branch conversation?
- Real product imagery for the grey placeholders?
- Free-text WhatsApp AI: which model/provider, and what is it allowed to say?
