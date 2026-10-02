# Decisions (accepted 2 Oct 2026)

Thomas accepted the proposed defaults, then added the overrides at the bottom. Where the two
conflict, the overrides win.

## Purpose and scope
1. Primary job: live screen-share in VC meetings; static export as the leave-behind.
2. Single source of truth. The investment-committee corpus currently lives in a claude.ai
   artifact; this repo's `data/canonical/` becomes the canonical corpus. Build an importer stub
   for a future export of the committee artifact. Do not maintain two corpora.
3. Deadline: v1 presentable 7 days before the SF trip (date in KICKOFF.md).
4. Thomas's hands-on time: ≤6 hours/week. Agents run unattended between gates.
5. Thesis count: overridden (see below).
6. One deck, plus a per-tribe "so what" slide variant (tech VC / biotech VC / pharma BD).
7. Optional "my angle" slide per thesis (off by default in present mode).

## Narratives
8. Keep all 70 in docs/NARRATIVES.md.
9. Adjacent clinical AI and consumer/longevity included, tagged `adjacent`.
10. Companies global; viewed through a US and Hong Kong lens.
11. Window 2020 → as-of date. Forward points only where a company or investor stated them.

## Framework
12. Ten-section thesis spine; present mode max 7 slides per thesis plus drill-downs.
13. Scores 1–5 with one-line notes; no composite score.
14. No returns modelling (IRR, ownership maths). Comparables and time to liquidity only. Capital
    pool ranges are in scope (override).
15. Every displayed number has ≥1 primary or tier-1 source; conflicts shown with both values;
    confidence High/Medium/Low; as-of date on every number.
16. No paid data assumed (no PitchBook, Endpoints, STAT+, Evaluate, Crunchbase Pro). Paywalled
    articles may be cited from visible snippets and flagged `paywalled`.

## Cockpit
17. Keep the 48-well plate (reference/bioai-explorer.html) as the signature visual.
18. v1 modules: spine, plate, money strip, deal timeline, company cards, comps, catalyst
    calendar, evidence ledger, plus the person orbit map (override). No full network graph.
19. Present mode offline, presenter notes, keyboard driven.
20. 16:9 laptop first (1920×1080 and 1440×900); phone read-only.
21. Side-by-side compare: v2.
22. Branding: presenter name (config), as-of date, "Confidential — draft".

## Technical
23. Vite + React + TypeScript + D3 + Zod, exact versions pinned, lockfile committed, `.nvmrc`.
24. Local + static export. Vercel with password later (not v1).
25. Private GitHub repo.
26. Spend ceiling: set in KICKOFF.md. If blank, stop after Phase 1 and ask.
27. Tools: web search/fetch, PubMed MCP if connected, Playwright for visual QA.

## Workflow
28. Research order: Asia/HK bridge, red team and base rates, public comps first; then the rest.
29. Three gates: after the thin slice, after the research waves, final.
30. Search budgets per agent (docs/SPEC.md §8); `unknown` is always allowed.
31. Verifier re-checks every number displayed in present mode.
32. One-off snapshot; `/refresh` command for later updates.
33. People: public names and professional roles only; no contact details; private warm-route
    overlay off in v1 (schema field exists, never rendered in present mode).
34. Optional "ask" slide per thesis.

## Overrides from the handoff message
- Coverage: deliver as many theses as possible. All 70 reach at least Tier B; 10 reach Tier S
  with a red team; as many Tier A as budget allows (target 20).
- Indexer agent owns all ingest and is the only writer to `data/canonical/`.
- Dynamic workflow: the orchestrator dispatches research, population, verification and red-team
  agents in waves and adapts the plan from measured results.
- Agent action buttons in the UI for later follow-ups (copy a slash command and add to a local
  queue; no backend).
- Visual elements and motion throughout presentation mode.
- Each thesis must get across: where the arbitrage is; how crowded it is; who to reach out to
  first if investable; how much money is up for grabs vs already in and waiting for exit; plus
  time to liquidity, consensus level and what breaks it.
- Added after handoff: napkin math, business models, and theorycrafting on a why-now lattice of
  trend clocks (AI and compute rollout, model maturity, wet lab to clinic, deal seasonality,
  regulatory, consumer, pharma, funding). The spine grows to twelve sections; "why now" becomes
  the lattice; present mode grows to eight core slides (Why now added; business model and napkin
  math sit in drill-downs). Overrides #12.
