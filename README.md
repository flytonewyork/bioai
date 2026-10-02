# Bio×AI VC Thesis Cockpit — Claude Code handoff bundle (as of 2 Oct 2026)

## Use
1. Create an empty private GitHub repo. Copy this folder's contents into its root, including
   the hidden `.claude/` folder.
2. Fill the three blanks at the top of KICKOFF.md (trip date, spend ceiling, parallel agents).
3. Start Claude Code in the repo root and paste KICKOFF.md from the line down.

## Contents
- KICKOFF.md — the session prompt.
- CLAUDE.md — standing rules every agent inherits (your seven rules, evidence standards).
- docs/SPEC.md — framework, signature metrics, data model, cockpit, present mode, workflow,
  budgets, definition of done.
- docs/NARRATIVES.md — 70 narratives with tiers and the provisional red-team top 10.
- docs/DECISIONS.md — the accepted answers plus your handoff overrides.
- seed/ — research so far: dossier, structured data from the explorer, investors and people,
  and the why-now trend lattice and business-model archetypes. Unverified until the verifier
  passes it.
- reference/bioai-explorer.html — the 48-well plate explorer, as the visual reference.
- .claude/agents/ — indexer (only writer to canonical data), researcher, populator, verifier,
  red-team, ui-builder, visual-qa.
- .claude/skills/ — /deepen, /redteam, /refresh, /people, /verify, /theorycraft, /trends,
  /ingest, /queue. The cockpit's buttons copy these commands.
