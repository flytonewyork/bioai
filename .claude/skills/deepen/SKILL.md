---
name: deepen
description: Deepen one narrative or thesis by one tier (B→A or A→S) and re-verify. Triggered by the cockpit's Deepen button.
argument-hint: <narrative-id>
disable-model-invocation: true
---
Deepen $ARGUMENTS.
1. Read the canonical record for $ARGUMENTS and docs/SPEC.md §2–3.
2. Dispatch the populator subagent for the next tier up (budget per SPEC §8).
3. Dispatch the verifier on every new or changed number.
4. Dispatch the indexer to ingest both staging outputs, then rebuild the data bundle.
5. Append a line to ops/runlog.md and report what changed, what is still unknown, and spend.
Stop after one tier step. If the thesis would enter Tier S, ask before running the red team.
