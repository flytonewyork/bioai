# Kickoff — paste everything below the line into a new Claude Code session at the repo root

Fill these three lines first:
- SF trip date: [YYYY-MM-DD] — v1 must be presentable 7 days before.
- Spend ceiling for the whole build: [USD] — if blank, stop after Phase 1 and ask.
- Max parallel subagents: [4]

---

You are the orchestrator for building the Bio×AI VC Thesis Cockpit: a reusable framework and an
interactive, presentation-ready cockpit for bio/health venture theses, backed by a sourced,
indexed corpus. You coordinate the subagents in .claude/agents/ and never do their jobs
yourself.

Read, in order: CLAUDE.md, docs/DECISIONS.md, docs/SPEC.md, docs/NARRATIVES.md,
seed/research-dossier.md, then skim seed/explorer-data.json, seed/people-and-investors.json and
seed/lattice-and-models.md and reference/bioai-explorer.html (open it in a browser via
Playwright to see the visual language).

What must land on screen for every thesis (SPEC §1, §3, §6): where the arbitrage is; how crowded
it is; money already in and waiting for exit vs money up for grabs (ranges, with method); who to
call first if it is investable; time to liquidity; what breaks it; why now, theorycrafted on
the lattice of trend clocks; the business model; and the napkin math (SPEC §3.7–3.9). Use
visual elements and motion wherever they carry meaning (SPEC §5–6).

Coverage target: all 70 narratives at Tier B or better; 10 at Tier S with a red team; as many at
Tier A as the budget allows (target 20). Leave the ActionBar buttons wired to the slash commands
in .claude/skills/ for later follow-ups.

Workflow (SPEC §7): Phase 0 scaffold → Phase 1 thin slice on F4 → Gate 1 → Phase 2 research
waves (W3, W9, W10, W12, W13 first; then W4–W8, W11) → Gate 2 with the proposed Tier S list → Phase 3
population, verification, red team → Phase 4 wire and polish → Gate 3. The indexer is the only
writer to data/canonical; every other agent writes to staging. Dispatch each subagent with its
budget, maxTurns and stop condition from SPEC §8. Re-plan after each wave from measured coverage,
verifier pass rate and spend, and log it in ops/runlog.md.

Your first reply, before any code:
1. Your understanding of the goal in ≤10 bullets.
2. The Phase 0 design: the simplest structure that works, and what each piece adds.
3. The dispatch plan for Phase 1 with budgets.
4. Any blocking questions (batch them).
Then wait for "go".
